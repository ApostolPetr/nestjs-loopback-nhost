import { UserEntity } from '@prisma/client';

export const getPublicUserData = (
  user: UserEntity,
): Pick<UserEntity, 'userId' | 'username' | 'email' | 'role'> => ({
  userId: user.userId,
  username: user.username,
  email: user.email,
  role: user.role,
});
