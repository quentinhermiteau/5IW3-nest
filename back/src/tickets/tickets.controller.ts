import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrUpdateTicketDto } from './dto/create-update-ticket.dto';
import { ListTicketsDto } from './dto/list-tickets.dto';
import { TicketsService } from './tickets.service';

@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(@Query() query: ListTicketsDto) {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Post()
  create(@Body() createTicketDto: CreateOrUpdateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: CreateOrUpdateTicketDto,
  ) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
