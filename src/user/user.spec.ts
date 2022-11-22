/** @format */

import * as userService from './user.service';
import * as fs from 'fs';
describe('user flow', () => {
  test('Should fetch all users from file', async () => {
    const users = await userService.getUsers();
    const fileData = JSON.parse(await fs.readFileSync(process.env.USER_PATH as string, 'utf-8'));
    expect(users).toEqual(fileData);
  });
  test('Should create new user', async () => {
    const testUser = {
      name: 'Test',
      earnings: '$100',
      country: 'Armenia',
    };
    const { id, ...rest } = await userService.createUser(testUser);
    expect(rest).toEqual(testUser);
  });
  test('Sum of the users by countries should be equal to users number ', async () => {
    const countries = await userService.getCountries();
    const sum = countries.reduce((accumulator, object) => {
      return accumulator + object.count;
    }, 0);
    const users = await userService.getUsers();
    expect(sum).toBe(users.length);
  });
  test('Sum of the users by countries should be equal to users number ', async () => {
    const countries = await userService.getCountries();
    const sum = countries.reduce((accumulator, object) => {
      return accumulator + object.count;
    }, 0);
    const users = await userService.getUsers();
    expect(sum).toBe(users.length);
  });
  test(`Creating user with earning in top 10 in should recalculate the average`, async () => {
    const country = (await userService.getStatistic())[0];
    await userService.createUser({
      country: country.country,
      name: 'HigherThanAverage',
      earnings: `$${+country.averageEarnings + 10}`,
    });
    const updatedCountryStatistics = (await userService.getStatistic())[0];
    expect(updatedCountryStatistics.averageEarnings).not.toEqual(country.averageEarnings);
  });
});
