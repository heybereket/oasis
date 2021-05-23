import { Field } from 'type-graphql';
import { BCField } from './RegisterEntity';

export const PublicField =
  process.env.BOT_CLIENT_MODE === 'true'
    ? (...args: any): PropertyDecorator => {
        const F = Field(...args);
        const BCF = BCField(...args);
        return (...a) => {
          BCF(...a);
          return F(...a);
        };
      }
    : Field;
