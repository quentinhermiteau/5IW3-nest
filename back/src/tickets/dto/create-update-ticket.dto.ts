import { ApiProperty } from '@nestjs/swagger';
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
}
