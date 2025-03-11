import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, PrismaService],
})
export class TicketsModule {}
