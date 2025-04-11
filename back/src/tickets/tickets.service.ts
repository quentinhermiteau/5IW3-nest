import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

interface CreateTicket {
  title: string;
  content: string;
  status?: Status;
}

interface UpdateTicket {
  title?: string;
  content?: string;
  status?: Status;
  participants?: number[];
  reviewers?: number[];
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
    return this.prisma.ticket.findFirst({
      where: { id },
      include: { participants: true, reviewers: true },
    });
  }

  async create(data: CreateTicket, file: Express.Multer.File) {
    let key: string | undefined;
    if (file) {
      const client = new S3Client({
        endpoint: 'http://localhost:9000',
        region: 'eu-west-1',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
      });

      key = file.originalname;
      await client.send(
        new PutObjectCommand({
          Bucket: 'media',
          Key: key,
          Body: file.buffer,
        }),
      );
    }

    return this.prisma.ticket.create({
      data: { ...data, filePath: key ?? null },
    });
  }

  update(id: number, data: UpdateTicket) {
    console.log(data);

    return this.prisma.ticket.update({
      where: { id },
      data: {
        ...data,
        participants: {
          set: data.participants?.map((id) => ({ id: +id })),
        },
        reviewers: {
          set: data.reviewers?.map((id) => ({ id: +id })),
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
