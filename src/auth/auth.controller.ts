/** @format */

import { Controller, Get, Route, SuccessResponse } from 'tsoa';

@Route("api/auth")
export class AuthController extends Controller {
  @SuccessResponse("200", "Success")
  @Get("")
  public async auth():
  Promise<string | null> {
    return 'success';
  }
}
