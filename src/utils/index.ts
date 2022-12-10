import { useEffect } from "react";
import dayjs from "dayjs";
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
export const getNowTime = (format: string): string => {
  return dayjs().format(format);
};
