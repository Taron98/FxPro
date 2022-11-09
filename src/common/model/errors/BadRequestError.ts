/** @format */

import { StatusCodes } from 'http-status-codes';
import { StatusError } from './StatusError';

export class BadRequestError extends StatusError {
  constructor(msg: string) {
    super(StatusCodes.BAD_REQUEST, 'BadRequestError', msg);
  }
}
