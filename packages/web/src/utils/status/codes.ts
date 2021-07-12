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
  InvalidRepoName: {
    code: 400,
    msg: 'The repository name provided is invalid.',
    status: 'error',
  },
  InvalidUserName: {
    code: 400,
    msg: 'The username provided is invalid.',
    status: 'error',
  },
  Generic: {
    code: 500,
    msg: 'A generic error occured.',
    status: 'error',
  },
  CannotMethod: {
    code: 405,
    msg: 'The method being requested is not available at this route.',
    status: 'error',
  },
  Success: {
    code: 200,
    msg: 'Success',
    status: 'success',
  },

  RepoIsFork: {
    code: 400,
    msg: 'The repo provided is a fork.',
    status: 'error',
  },
  RepoIsArchived: {
    code: 400,
    msg: 'The repo provided is archived.',
    status: 'error',
  },
  RepoIsUnder5Issues: {
    code: 400,
    msg: 'The repo provided has under 5 issues.',
    status: 'error',
  },
  RepoExists: {
    code: 400,
    msg: 'The repo provided already exists.',
    status: 'error',
  },
} as any;
