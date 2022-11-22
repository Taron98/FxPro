/** @format */

import * as userManager from './user.manager';
import {
  CountryType,
  CreateUserRequest,
  StatisticsType,
  UserStatistics,
  UserType,
} from './user.models';

export const getUsers = async (): Promise<UserType[]> => {
  return (await userManager.readFile(process.env.USER_PATH as string)) as UserType[];
};

export const createUser = async (req: CreateUserRequest): Promise<UserType> => {
  const createdUser = await userManager.updateFile(req, process.env.USER_PATH as string);
  //I am calculating statistics
  // each time for each country,
  // because I don't have initial
  // statistics-collection.json file
  await writeStatistics();

  return createdUser as UserType;
};

export const getCountries = async (): Promise<CountryType[]> => {
  const countriesObject = await userManager.usersPerCountry();
  return countriesObject.map(item => {
    return { name: item.country, count: item.count };
  });
};
export const writeStatistics = async (): Promise<UserStatistics[]> => {
  let stats: UserStatistics[] = [];
  const countriesPerUser = await userManager.usersPerCountry();
  countriesPerUser.map(countryPerUser => {
    const users = countryPerUser.users
      .sort((a, b) =>
        +a.earnings.replace('$', '') < +b.earnings.replace('$', '')
          ? 1
          : +a.earnings.replace('$', '') > +b.earnings.replace('$', '')
          ? -1
          : 0,
      )
      .slice(0, 10);
    stats = [
      ...stats,
      {
        country: countryPerUser.country,
        averageEarnings:
          users.reduce((accumulator, object) => {
            return accumulator + +object.earnings.replace('$', '');
          }, 0) / users.length,
      },
    ];
  });
  await userManager.writeFile(process.env.STATISTICS_PATH, stats);
  return stats;
};

export const getStatistic = async (): Promise<StatisticsType[]> => {
  return (await userManager.readFile(process.env.STATISTICS_PATH as string)) as StatisticsType[];
};
