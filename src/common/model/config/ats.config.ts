/** @format */

import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export type ATSApiCredentials = {
  user: string;
  password: string;
  apiSecret: string;
  apiKey: string;
};

export type ATSApiConfig = {
  baseUrl: string;
  oAuthUrl: string;
  grantType: string;
  credentials?: ATSApiCredentials;
};

export const ATSConfig = {
  local: {
    baseUrl: process.env.ATS_BASE_URL,
    oAuthUrl: `${process.env.ATS_BASE_URL}/oauth2/token`,
    grantType: 'password',
    credentials: {
      user: process.env.ATS_USER,
      password: process.env.ATS_PASSWORD,
      apiSecret: process.env.ATS_API_SECRET,
      apiKey: process.env.ATS_API_KEY,
    },
  },
  dev: {
    baseUrl: process.env.ATS_BASE_URL,
    oAuthUrl: `${process.env.ATS_BASE_URL}/oauth2/token`,
    grantType: 'password',
    credentials: {
      user: process.env.ATS_USER,
      password: process.env.ATS_PASSWORD,
      apiSecret: process.env.ATS_API_SECRET,
      apiKey: process.env.ATS_API_KEY,
    },
  },
}[process.env.STAGE || 'local']! as ATSApiConfig;
