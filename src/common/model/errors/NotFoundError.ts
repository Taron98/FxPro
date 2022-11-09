/** @format */

import { StatusCodes } from 'http-status-codes';
import { StatusError } from './StatusError';

export class NotFoundError extends StatusError {
  constructor(msg: string) {
    super(StatusCodes.NOT_FOUND, 'NotFound', msg);
  }
}
