/** @format */

export type CreateUserRequest = {
  earnings: string;
  country: string;
  name: string;
};

export type UserType = {
  id: number;
  earnings: string;
  country: string;
  name: string;
};

export type CountryType = {
  name: string;
  count: number;
};

export type UserStatistics = {
  country: string;
  averageEarnings: number;
};

export type UsersPerCountry = {
  country: string;
  count: number;
  users: UserType[];
};

export type CreateStatisticsRequest = {
  country: string;
  averageEarnings: number;
};

export type StatisticsType = {
  id: number;
  country: string;
  averageEarnings: number;
};
