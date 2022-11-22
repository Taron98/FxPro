/** @format */

import fs from 'fs';
import { config } from 'dotenv';
config();
import { CreateUserRequest, StatisticsType, UsersPerCountry, UserType } from './user.models';
import { StatusError } from '../common';

export const readFile = async (path: string): Promise<UserType[] | StatisticsType[]> => {
  if (!(await fs.existsSync(path))) {
    throw new StatusError(404, 'FILE_NOT_EXIST', 'File dose not exist');
  }
  return JSON.parse(fs.readFileSync(path, 'utf8'));
};

export const updateFile = async (req: CreateUserRequest, pathToRead: string): Promise<UserType> => {
  let data = await readFile(pathToRead);
  let newId = 1;
  if (data) {
    data = data.sort((a, b) => a.id - b.id);
    newId = data[data.length - 1].id + 1;
  }

  const newRecord = { id: newId, ...req };
  const parsedData = [...data, newRecord];
  await writeFile(pathToRead, parsedData);
  return await getById(newId, pathToRead);
};

export const getById = async (id: number, pathToRead): Promise<UserType> => {
  const users = (await readFile(pathToRead)) as UserType[];
  const user = users.find(user => user.id === id);
  if (!user) {
    throw new StatusError(404, 'USER_NOT_FOUND', 'User not found');
  }
  return user;
};

export const writeFile = async (pathToRead, data) => {
  await fs.promises.writeFile(pathToRead, JSON.stringify(data, null, 2));
};

export const usersPerCountry = async (): Promise<UsersPerCountry[]> => {
  const countriesObject = {};
  const users = (await readFile(process.env.USER_PATH as string)) as UserType[];
  users.map(user => {
    if (countriesObject[user.country]) {
      countriesObject[user.country].count++;
    } else {
      countriesObject[user.country] = {
        country: user.country,
        count: 1,
      };
    }
    if (countriesObject[user.country].users) {
      countriesObject[user.country].users.push(user);
    } else {
      countriesObject[user.country].users = [user];
    }
  });
  return Object.values(countriesObject);
};
