import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateOrUpdateTicketDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  title: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  content: string;

  @ApiProperty({ enum: Status })
  @IsString()
  @Type(() => String)
  status?: Status = Status.TODO;
}
