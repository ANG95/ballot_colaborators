import { format } from 'date-fns';

export const currentDate = (date?: string | Date, dateFormat = 'dd-MM-yyyy') => {
  const parsedDate = date ? new Date(date) : new Date();
  return format(parsedDate, dateFormat);
};