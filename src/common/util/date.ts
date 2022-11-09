/** @format */
import dayjsRaw from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjsRaw.extend(utc);

export const dayjs = (date, format) => dayjsRaw.utc(date, format);

export const convertATSDate = (atsDate: string): number | null => {
  if (atsDate?.trim().length > 0) {
    return dayjs(atsDate, 'YYYYMMDD').valueOf();
  }
  return null;
};

export const convertATSTimestamp = (atsTimestamp: string): number | null => {
  if (atsTimestamp?.trim().length > 0) {
    return Number(atsTimestamp.match(/\d+/g)!.join());
  }
  return null;
};

export const convertToATSTimestamp = (timestamp: number | null): string | null => {
  if (timestamp) {
    return `/Date(${timestamp})/`;
  }
  return null;
};
