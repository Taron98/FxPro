/** @format */
import { format } from "util";
import axios from "axios";
import qs from "qs";
import { ATSConfig } from "../model/config/ats.config";
import dayjs from "dayjs";
import { StatusError } from "../model/errors";

let accessToken: string | null = null;
let accessTokenExpiry: number | null = null;

export const getAccessToken = async (): Promise<string> => {
  if (
    accessToken &&
    accessTokenExpiry &&
    accessTokenExpiry > dayjs().unix() // timestamp in seconds
  ) {
    return accessToken;
  }

  const form = qs.stringify({
    grant_type: ATSConfig.grantType,
    username: ATSConfig.credentials!.user,
    password: ATSConfig.credentials!.password,
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(
      ATSConfig.credentials!.apiKey + ":" + ATSConfig.credentials!.apiSecret
    ).toString("base64")}`,
  };

  const config: any = {
    method: "post",
    url: ATSConfig.oAuthUrl,
    headers,
    data: form,
  };

  const { data, status, statusText } = await axios(config);

  if (status != 200) {
    console.log("Failed to authorise - ATSApiService", statusText);
    throw new Error("ATSApiService - token generation error");
  }

  accessToken = data.access_token;
  accessTokenExpiry = dayjs().unix() + data.expires_in;

  return accessToken!;
};

const handleHttpError = (error) => {
  if (error.response) {
    throw new StatusError(
      error.response.status,
      "ATSError",
      error.response.data?.error?.message?.value
    );
  } else {
    throw new StatusError(500, "InternalServerError", error.message);
  }
};

// Wrapper for GET operations to ATS Core Banking
export const getData = async <R>(
  path: string,
  options: any = {}
): Promise<R> => {
  const accessToken = await getAccessToken();

  const url = format("%s%s", ATSConfig.baseUrl, path);
  const defaultOptions = {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  };

  return axios
    .get(url, { ...defaultOptions, ...options })
    .then((res) => res.data.d as R)
    .catch((error) => handleHttpError(error));
};

// Wrapper for POST operations to ATS Core Banking
export const postData = async <T, R>(
  path: string,
  data: T,
  options: any = {}
): Promise<R> => {
  const accessToken = await getAccessToken();

  const url = format("%s%s", ATSConfig.baseUrl, path);
  const defaultOptions = {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  };

  return axios
    .post(url, { d: data }, { ...defaultOptions, ...options })
    .then((res) => res.data.d as R)
    .catch((error) => handleHttpError(error));
};
