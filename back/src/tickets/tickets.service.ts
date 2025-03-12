import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

interface CreateOrUpdateTicket {
  title: string;
  content: string;
  status?: Status;
}

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.ticket.findMany({
      include: {
        participants: true,
        reviewers: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.ticket.findFirst({ where: { id } });
  }

  create(data: CreateOrUpdateTicket) {
    return this.prisma.ticket.create({
      data,
    });
  }

  update(id: number, data: CreateOrUpdateTicket) {
    return this.prisma.ticket.update({
      data,
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
