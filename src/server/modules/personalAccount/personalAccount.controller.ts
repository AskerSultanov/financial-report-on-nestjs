import type { Response } from 'express';
import { ResetUserDto } from './dto/resetUserDto.dto.js';
import { Res, Post, Body, Controller } from '@nestjs/common';
import { PersonalAccountService } from './personalAccount.service.js';

@Controller('personal-account')
export class PersonalAccountController {
  constructor(
    private readonly personalAccountService: PersonalAccountService,
  ) {}

  @Post()
  async resetUser(@Body() body: ResetUserDto, @Res() res: Response) {
    return await this.personalAccountService.resetUser(body);
  }
}
