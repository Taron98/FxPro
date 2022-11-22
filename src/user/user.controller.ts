/** @format */

import { Body, Controller, Get, Post, Route, SuccessResponse } from 'tsoa';
import * as userService from './user.service';
import { CountryType, CreateUserRequest, UserStatistics, UserType } from './user.models';
import { validate } from '../common';
import { createUserJoi } from './user.validate';

@Route('api/user')
export class UserController extends Controller {
  @SuccessResponse('200', 'Success')
  @Get('')
  public async getUsers(): Promise<UserType[]> {
    return userService.getUsers();
  }

  @SuccessResponse('200', 'Success')
  @Post('')
  public async create(@Body() reqBody: CreateUserRequest): Promise<UserType> {
    validate(reqBody, createUserJoi);
    return userService.createUser(reqBody);
  }

  @SuccessResponse('200', 'Success')
  @Get('countries')
  public async countries(): Promise<CountryType[]> {
    return userService.getCountries();
  }

  @SuccessResponse('200', 'Success')
  @Get('statistics')
  public async statistics(): Promise<UserStatistics[]> {
    return userService.getStatistic();
  }
}
