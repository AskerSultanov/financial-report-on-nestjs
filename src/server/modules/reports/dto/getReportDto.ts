import { IsString, IsNotEmpty } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class GetReportDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  reportId: number;
}
