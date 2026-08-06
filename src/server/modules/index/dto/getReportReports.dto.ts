import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetRestReportsDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Expose()
  @IsArray()
  @IsNotEmpty()
  reportIds: number[];
}
