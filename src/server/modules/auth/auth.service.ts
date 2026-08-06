import mongoose from 'mongoose';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { UserCredentialsDto } from './dto/user.credentials-dto.js';
import { IUser } from '../../database/interfaces/users.interface.js';
import { UsersModelServices } from '../../database/services/index.js';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersModelServices: UsersModelServices,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async checkCredectials(
    userData: UserCredentialsDto,
    userFromDb: IUser,
  ): Promise<boolean> {
    if (userData.login !== userFromDb.login) {
      return false;
    }

    return await argon2.verify(userFromDb.passwd, userData.passwd);
  }

  async singIn(
    userData: UserCredentialsDto,
  ): Promise<{ token: string; userId: string }> {
    var userFromDb: IUser | null = await this.usersModelServices.getUserByLogin(
      userData.login,
    );

    if (!userFromDb) {
      throw new NotFoundException();
    }

    var credentialsIsValid = await this.checkCredectials(userData, userFromDb);

    if (!credentialsIsValid) {
      throw new UnauthorizedException();
    }

    var userId = userFromDb.userId;
    var adminName = this.configService.get<string>('adminName');
    var secret = this.configService.get<string>('SECRET_KEY');
    var role = userData.login === adminName ? 'admin' : 'user';

    var payload = { role, userId };
    var token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '1day',
    });

    return { userId, token };
  }
}
