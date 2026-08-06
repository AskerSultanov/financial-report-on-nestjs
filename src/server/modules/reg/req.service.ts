import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/newUser.dto.js';
import { createUser } from './services/createUser.js';
import { checkLogin } from './services/checkLogin.js';
import { checkPasswd } from './services/checkPasswd.js';
import { UsersModelServices } from '../../database/services/index.js';

@Injectable()
export class RegistrationServices {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersModelServices: UsersModelServices,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  createUser: (user: CreateUserDto) => Promise<{
    errText: string;
    userId: string;
    token: string;
    statusCode: number;
  }> = createUser;

  checkLogin: (login: string) => { errText: string; loginIsValid: boolean } =
    checkLogin;

  checkPasswd: (passwd: string) => { errText: string; pwdIsValid: boolean } =
    checkPasswd;
}
