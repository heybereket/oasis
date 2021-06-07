import User from '@entities/User';
import { Role } from '@modules/user/Roles';
import { getConnection } from 'typeorm';

export const seedDatabase = async () => {
  // Clear Database
  const connection = getConnection();
  await connection.synchronize(true);

  // Create User
  const user = User.create();
  user.avatar = '';
  user.name = 'testing user';
  user.username = 'testing';
  user.verified = false;
  user.createdAt = String(Date.now());

  user.save();

  // Create a second user
  const user2 = User.create();
  user2.avatar = '';
  user2.id = 'secondaryUserId';
  user2.name = 'testing user 2';
  user2.username = 'testing2';
  user2.verified = false;
  user2.createdAt = String(Date.now());

  user2.save();

  // Create Admin User
  const adminUser = User.create();
  adminUser.avatar = '';
  adminUser.name = 'admin testing user';
  adminUser.username = 'adminTesting';
  adminUser.verified = false;
  adminUser.roles = [Role.Admin];
  adminUser.createdAt = String(Date.now());

  adminUser.save();
};
