/** @format */

import { StatusCodes } from 'http-status-codes';

export type HttpCodes =
  | StatusCodes.ACCEPTED
  | StatusCodes.CREATED
  | StatusCodes.UNAUTHORIZED
  | StatusCodes.OK
  | StatusCodes.BAD_REQUEST
  | StatusCodes.NOT_FOUND
  | StatusCodes.FORBIDDEN
  | StatusCodes.INTERNAL_SERVER_ERROR;

export class StatusError extends Error {
  constructor(public status: HttpCodes, name: string, msg: string) {
    super(msg);
    this.name = name;
  }
}
