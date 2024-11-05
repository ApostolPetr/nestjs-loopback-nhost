import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto, SaveAccountDto } from './auth.dto';
import { UserRole } from 'src/roles/constants';
import { getPublicUserData } from 'src/utils/user';
import { UserEntity } from '@prisma/client';
import { SALT_ROUNDS } from 'src/constants/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateTokensPair(user: UserEntity, refreshToken?: string) {
    let foundUser: UserEntity = user;
    // @FIXME if (!user || (refreshToken && user.refreshToken !== refreshToken)) {
    //    if (!user) {
    //      throw new UnauthorizedException('Invalid user or refresh token.');
    //    }

    if (!user && refreshToken) {
      try {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
          secret: process.env.JWT_REFRESH_SECRET,
        });

        foundUser = await this.usersService.findByUserId(payload?.sub);
      } catch {
        throw new UnauthorizedException('Invalid user or refresh token.');
      }
    }

    if (!foundUser) {
      throw new UnauthorizedException('Invalid user or refresh token.');
    }

    const payload = { sub: foundUser.userId, username: foundUser.username };

    const tokens = {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '30d',
      }),
    };

    this.usersService.updateTokens(foundUser.tokensId, tokens);

    return tokens;
  }

  async signIn(
    authDto: AuthDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!authDto) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const user = await this.usersService.findByName(authDto.username);

    if (!(await bcrypt.compare(authDto.password, user?.password ?? ''))) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const tokens = await this.generateTokensPair(user);

    this.usersService.updateTokens(user.tokensId, tokens);

    return tokens;
  }

  async signUp(authDto: AuthDto) {
    const existsUser = await this.usersService.findByName(authDto.username);

    if (existsUser) {
      throw new UnauthorizedException(`User ${authDto.username} exists`);
    }

    const salt = await bcrypt.genSalt(
      Number(process.env.SALT_ROUNDS || SALT_ROUNDS),
    );

    const password = await bcrypt.hash(authDto.password, salt);

    await this.usersService.addUser({
      username: authDto.username,
      email: authDto.email,
      password,
      role: UserRole.User,
    });

    const user = await this.usersService.findByName(authDto.username);
    const tokens = await this.generateTokensPair(user);

    await this.usersService.updateTokens(user.userId, tokens);

    return tokens;
  }

  async save(userId: number, saveDto: SaveAccountDto) {
    const currentUser = await this.usersService.findByUserId(userId);

    if (!currentUser) {
      throw new UnauthorizedException(`User ${saveDto.username} not exists`);
    }

    if (
      !(await bcrypt.compare(saveDto.password, currentUser?.password ?? ''))
    ) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const salt = await bcrypt.genSalt(
      Number(process.env.SALT_ROUNDS || SALT_ROUNDS),
    );

    const password = saveDto.newPassword
      ? await bcrypt.hash(saveDto.newPassword, salt)
      : currentUser.password;

    await this.usersService.update(userId, {
      password,
      email: saveDto.email,
      role: currentUser.role,
      username: saveDto.username,
    });

    return getPublicUserData(await this.usersService.findByUserId(userId));
  }

  async logout(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      const currentUser = await this.usersService.findByUserId(payload?.sub);

      await this.usersService.updateTokens(currentUser.userId, {
        accessToken: null,
        refreshToken: null,
      });

      return {
        accessToken: '',
        refreshToken: '',
      };
    } catch {
      throw new UnauthorizedException('Invalid user or refresh token.');
    }
  }

  //  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  //  async clearExpiredRefreshTokens() {
  //    await this.authRefreshTokenRepository.delete({
  //      expiresAt: LessThanOrEqual(new Date()),
  //    });
  //  }
}
