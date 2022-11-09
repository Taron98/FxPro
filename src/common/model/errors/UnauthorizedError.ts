/** @format */

import { StatusCodes } from 'http-status-codes';
import { StatusError } from './StatusError';

export class UnauthorizedError extends StatusError {
  constructor(msg: string) {
    super(StatusCodes.UNAUTHORIZED, 'Unauthorized', msg);
  }
}
