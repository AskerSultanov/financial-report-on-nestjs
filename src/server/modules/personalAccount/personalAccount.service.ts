import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { ResetUserDto } from './dto/resetUserDto.dto.js';

import { UsersModelServices } from '../../database/services/index.js';

@Injectable()
export class PersonalAccountService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersModelServices: UsersModelServices,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async resetUser(data: ResetUserDto) {
    return await this.usersModelServices.resetUser(data.userId);
  }
}
