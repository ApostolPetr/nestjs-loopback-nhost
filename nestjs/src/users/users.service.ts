import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserEntity, UserTokensEntity } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByName(username: string): Promise<UserEntity | undefined> {
    return (
      await this.prisma.userEntity.findMany({
        where: { username },
        include: { userTokensEntity: true },
      })
    )[0];
  }

  async findByUserId(userId: number): Promise<UserEntity | undefined> {
    return this.prisma.userEntity.findUnique({
      where: { userId },
      include: { userTokensEntity: true },
    });
  }

  async addUser(
    user: Omit<UserEntity, 'userId' | 'tokensId'>,
    tokensData?: UserTokensEntity,
  ) {
    const userTokends = await this.prisma.userTokensEntity.create({
      data: tokensData ?? {
        accessToken: null,
        refreshToken: null,
      },
    });

    await this.prisma.userEntity.create({
      data: {
        ...user,
        tokensId: userTokends.id,
      },
    });
  }

  async removeUser(userId: number) {
    await this.prisma.userEntity.delete({
      where: { userId },
    });
  }

  async update(userId: number, userData?: Partial<UserEntity>) {
    await this.prisma.userEntity.update({
      where: { userId },
      data: userData,
    });
  }

  async updateTokens(tokensId: number, tokensData: Partial<UserTokensEntity>) {
    await this.prisma.userTokensEntity.update({
      where: { id: tokensId },
      data: tokensData,
    });
  }
}
