import { IsNotEmpty, IsNumber, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActivityUseDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  timeStart: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  timeEnd?: Date;

  @IsNumber()
  @IsOptional()
  timePaused?: number;

  @IsNumber()
  @IsOptional()
  totalDuration?: number;

  @IsNumber()
  @IsNotEmpty()
  activityId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
