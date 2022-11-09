/** @format */

import { StatusCodes } from 'http-status-codes';
import { StatusError } from './StatusError';

export class InternalServerError extends StatusError {
  constructor(msg: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, 'Forbidden', msg);
  }
}
