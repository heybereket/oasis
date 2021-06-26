import Notification from '@entities/Notification';
import User from '@entities/User';
import { NotificationType } from '@enums/Notifications';

// Generate a random number (digits customizable)
export const generatedNumber = (n = 10) => {
  const multiplier = 10 ** (n - 1);
  return Math.floor(1 * multiplier + Math.random() * 9 * multiplier);
};

// Search a JSON Object
export const searchJSON = (json: any[], key: string | symbol, value: any) => {
  // If index is -1 (not found), return false, else return true
  return json.findIndex((data) => data[key] === value) !== -1;
};

// Generate a short name of current month (ex. April > Apr)
export const getShortMonth = () => {
  const shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const today = new Date();
  const year = today.getFullYear();
  const day = today.getDate();

  return shortMonths[today.getMonth()] + ` ${day}, ${year}`;
};

export const createNotification = async ({ userId, performerId, type }) => {
  const oneTimeNotifications = [NotificationType.Follow];

  const user = await User.findOne(userId);
  const performer = await User.findOne(performerId);
  const prevNotifs = (
    await Notification.find({
      where: {
        user,
        performer,
        type,
      },
    })
  ).length;
  if (prevNotifs >= 1 && oneTimeNotifications.includes(type)) {
    return;
  }
  const notification = Notification.create();
  notification.user = Promise.resolve(user);
  notification.performer = Promise.resolve(performer);
  notification.type = type;
  notification.read = false;
  notification.createdAt = String(Date.now());
  notification.save();
};
