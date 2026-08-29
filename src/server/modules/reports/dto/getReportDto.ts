import { Expose, Exclude } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

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
