import User from '@entities/User';
import { Role } from '@enums/Roles';
import { getConnection } from 'typeorm';

export const reporteeUserId = 'reporteeId';

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

  // Create a reportee user
  const reportee = User.create();
  reportee.id = reporteeUserId;
  reportee.avatar = '';
  reportee.name = 'reportee';
  reportee.username = 'reportee';
  reportee.verified = false;
  reportee.createdAt = String(Date.now());

  reportee.save();

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
