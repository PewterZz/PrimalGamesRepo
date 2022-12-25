import {
    ForbiddenException,
    Get,
    Injectable,
  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { friendDto } from '../dto/friend.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { create } from 'domain';

  @Injectable()
  export class friendService {
    constructor(
      private prisma: PrismaService,
      private config: ConfigService,
    ) {}
  
    async addFriend(dto: friendDto) {
      try{
        const friend = await this.prisma.friend_list.create({
            data: {
              a_id: Number(dto.a_id),
              b_id: Number(dto.b_id),
              accepted: Boolean(Number(dto.accepted)),
            },
        });
    }
      catch (error) {
          if (
            error instanceof
            PrismaClientKnownRequestError
          ) 
        throw error;
      }
  }

    async deleteFriend(id : number) {
      console.log(Number(id));
      try {
        const friend = await this.prisma.friend_list.deleteMany({
          where: {
            id: Number(id),
          },
        });
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        throw error;
      }
    }

    async updateFriend(dto: friendDto, id : number) {
      try {
        const friend = await this.prisma.friend_list.update({
          where: {
            id: id,
          },
          data: {
            a_id: dto.a_id,
            b_id: dto.b_id,
            accepted: Boolean(Number(dto.accepted))
          },
        });
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        throw error;
      }
    }

    async getFriendState(a_id : number, b_id : number) {
      try {
        const friend = await this.prisma.friend_list.findFirst({
          where: {
            a_id: a_id,
            b_id: b_id,
          }
        });

        return friend.accepted;
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        throw error;
      }
    }

    async getFriendList(id : number) {
      try {
        const friend = await this.prisma.friend_list.findMany({
          where: {
            a_id: id,
            accepted: true
          },
        });

  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        throw error;
      }
    }
}