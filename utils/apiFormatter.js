// Data Formatter
export function formatData(data) {
  return JSON.stringify(data, null, 3);
}

export function sendStatus(res, statusCode) {
  var currentCode = statusCodes[statusCode]
    ? statusCodes[statusCode]
    : { code: 200, msg: statusCode, status: 'other' };

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

export const statusCodes = {
  Unauthorized: {
    code: 401,
    msg: 'Please login to access this route.',
    status: 'error',
  },
  InvalidCookie: {
    code: 400,
    msg: 'The provided cookie is invalid.',
    status: 'error',
  },
  OutdatedCookie: {
    code: 400,
    msg: 'The provided cookie is outdated.',
    status: 'error',
  },
  InvalidParams: {
    code: 400,
    msg: 'The paramters provided are invalid.',
    status: 'error',
  },
  Generic: {
    code: 500,
    msg: 'A generic error occured.',
    status: 'error',
  },
  CannotMETHOD: {
    code: 405,
    msg: 'The method being requested is not available at this route.',
    status: 'error',
  },
  Success: {
    code: 200,
    msg: 'Success',
    status: 'success',
  },
};
