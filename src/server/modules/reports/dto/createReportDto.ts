import { Expose, Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

@Exclude()
export class CreateReportDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  dateFrom: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  dateTo: string;

  @Expose()
  @IsBoolean()
  needToLoadAllReports: boolean;

  @Expose()
  @IsBoolean()
  isPeriodWithinSameWeek: boolean;
}
