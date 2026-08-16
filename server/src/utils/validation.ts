import Logger from "./logger";

const isValidDate = (date: string | number): boolean => {
  return !isNaN(Number(date));
};

const parseArray = (value: string | string[] | undefined): string[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const parseDate = (date: string | undefined): number | undefined => {
  if(!date) {
    return;
  }
  if (!isValidDate(date)) {
    Logger.warn(`Invalid filter date: ${date}`);
    return;
  }
  return new Date(date).getTime();
};

export { isValidDate, parseArray, parseDate };