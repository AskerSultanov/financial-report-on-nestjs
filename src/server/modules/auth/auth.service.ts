import { Injectable } from '@nestjs/common';
import { UserCredentials } from './dto/user.credentials-dto.js';

var userName = 'asker';
var userPasswd = '1111';

@Injectable()
export class AuthService {
  async checkCredectials(userData: UserCredentials): Promise<boolean> {
    if (userData.login !== userName) {
      return false;
    }

    if (userData.passwd !== userPasswd) {
      return false;
    }

    return true;
  }
}
