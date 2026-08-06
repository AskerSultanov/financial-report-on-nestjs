import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserCredentialsDto {
  @Expose()
  @IsString()
  readonly login!: string;

  @Expose()
  @IsString()
  readonly passwd!: string;
}
