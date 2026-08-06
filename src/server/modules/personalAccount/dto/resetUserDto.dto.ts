import { IsString, IsNotEmpty } from 'class-validator';

export class ResetUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
