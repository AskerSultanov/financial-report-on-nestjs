import * as jose from 'jose';
import { randomBytes } from 'crypto';
import { CreateUserDto } from '../dto/newUser.dto.js';

var alg = 'RS256';
var defaultErrText = 'Произошла ошибки при попытке создать пользователя';

export async function createUser(
  this: any,
  newUserData: CreateUserDto,
): Promise<{
  errText: string;
  userId: string;
  token: string;
  statusCode: number;
}> {
  var { login, passwd } = newUserData;
  var { errText, loginIsValid } = this.checkLogin(login);
  if (!loginIsValid) {
    return { errText, userId: '', token: '', statusCode: 400 };
  }

  var { errText, pwdIsValid } = this.checkPasswd(passwd);
  if (!pwdIsValid) {
    return { errText, userId: '', token: '', statusCode: 400 };
  }

  var session = await this.connection.startSession();

  try {
    session.startTransaction();

    var existUser = await this.usersModelServices.getUserByLogin(
      login,
      session,
    );

    if (existUser) {
      errText = 'Пользователь с таким именем уже существует';
      return { errText, userId: '', token: '', statusCode: 409 };
    }

    var userId = randomBytes(10).toString('hex');
    var role = login === process.env.adminName ? 'admin' : 'user';

    await this.usersModelServices.createUserToDb(
      { login, passwd, role, userId },
      session,
    );
    await session.commitTransaction();

    var pkcs8 = this.configService.get('pkcs8');
    var payload = { userId, role };
    var privateKey = await jose.importPKCS8(pkcs8, alg);
    var token = await new jose.SignJWT(payload)
      .setExpirationTime('1 day')
      .setProtectedHeader({ alg })
      .sign(privateKey);

    return { userId, errText, token, statusCode: 200 };
  } catch (e) {
    console.log({ e });
    await session.abortTransaction();
    return { errText: defaultErrText, userId: '', token: '', statusCode: 500 };
  } finally {
    if (session.inTransaction()) {
      await session.endSession();
    }
  }
}
