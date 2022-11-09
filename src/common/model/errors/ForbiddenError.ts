/** @format */

import { StatusCodes } from 'http-status-codes';
import { StatusError } from './StatusError';

export class ForbiddenError extends StatusError {
  constructor(msg: string) {
    super(StatusCodes.FORBIDDEN, 'Forbidden', msg);
  }
}
