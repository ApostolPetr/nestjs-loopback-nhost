import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserRole } from 'src/roles/constants';
import { UserRoles } from 'src/roles/roles.decorator';
import { Throttle } from '@nestjs/throttler';
import type { FastifyReply } from 'fastify';
import { AuthDto, SaveAccountDto } from './auth.dto';
import { createErrorPayload, createSuccessPayload } from 'src/utils/payload';
import { getPublicUserData } from 'src/utils/user';

const setTokensAndPayload = (
  response: FastifyReply,
  tokens: { refreshToken: string; accessToken: string } | undefined,
) => {
  if (!!tokens) {
    response.setCookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 3600,
      sameSite: 'lax',
      secure: process.env.NODE_ENV !== 'dev',
      path: '/',
    });
    response.setCookie('access_token', tokens.accessToken, {
      maxAge: 3600,
      sameSite: 'lax',
      secure: process.env.NODE_ENV !== 'dev',
      path: '/',
    });
  }

  return createSuccessPayload('');
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('login')
  async signIn(
    @Body() signInDto: AuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    try {
      const tokens = await this.authService.signIn(signInDto);
      return setTokensAndPayload(response, tokens);
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        return createErrorPayload('Auth error');
      }
    }
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('register')
  async signUp(
    @Body() signUpDto: AuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    try {
      const tokens = await this.authService.signUp(signUpDto);
      return setTokensAndPayload(response, tokens);
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        return createErrorPayload('Register error');
      }
    }
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseGuards(AuthGuard, RolesGuard)
  @UserRoles(UserRole.Admin, UserRole.User)
  @Post('account_save')
  async save(@Body() saveDto: SaveAccountDto, @Req() req) {
    const { user } = req;

    if (!user) {
      return createErrorPayload('Save error');
    }

    try {
      return createSuccessPayload(
        await this.authService.save(user.userId, saveDto),
      );
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        return createErrorPayload('Save error');
      }
    }
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Get('logout')
  async logout(@Req() req, @Res({ passthrough: true }) response: FastifyReply) {
    const { access_token } = req.cookies;

    await this.authService.logout(access_token);

    response.setCookie('refresh_token', '', {
      httpOnly: true,
      maxAge: 30 * 24 * 3600,
      sameSite: 'lax',
      secure: process.env.NODE_ENV !== 'dev',
      path: '/',
    });
    response.setCookie('access_token', '', {
      maxAge: 3600,
      sameSite: 'lax',
      secure: process.env.NODE_ENV !== 'dev',
      path: '/',
    });

    return createSuccessPayload('OK');
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Get('refresh-tokens')
  async refreshTokens(
    @Req() req,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { refresh_token } = req.cookies;

    try {
      const tokens = await this.authService.generateTokensPair(
        undefined,
        refresh_token,
      );

      return setTokensAndPayload(response, tokens);
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        return createErrorPayload('Refresh tokens error');
      }
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @UserRoles(UserRole.Admin, UserRole.User)
  @Get('profile')
  getProfile(@Req() req) {
    const { user } = req;

    if (!user) {
      throw new UnauthorizedException('Cannot find user');
    }

    return getPublicUserData(user);
  }
}
