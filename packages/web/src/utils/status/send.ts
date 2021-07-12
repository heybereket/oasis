import { statusCodes } from './codes';

export function sendStatus(res: any, statusCode: number) {
  const currentCode = statusCodes[statusCode];

  switch (currentCode.status) {
    case 'error':
      res
        .status(currentCode.code)
        .send(JSON.stringify({ status: 'error', error: currentCode.msg }, null, 3));
      break;
    case 'success':
      res.status(currentCode.code).send(JSON.stringify({ status: 'success' }, null, 3));
      break;
    case 'other':
      res
        .status(currentCode.code)
        .send(JSON.stringify({ status: 'other', code: currentCode.msg }, null, 3));
  }
}
