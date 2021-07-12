import { Role } from '@enums/Roles';

const order = [Role.SuperAdmin, Role.Admin, Role.Moderator];

export const hasPermission = (roles: Role[], targetRole: Role) => {
  const targetOrder = order.indexOf(targetRole);

  for (const role of roles) {
    const level = order.indexOf(role);

    if (level >= targetOrder) return true;
  }

  return false;
};
