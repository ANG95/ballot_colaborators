import { format } from 'date-fns';

export const currentDate = (dateFormat = 'dd-MM-yyyy') => {
  const currentDate = new Date();
  return format(currentDate, dateFormat)
}

export const formatDate = (date?: string | Date, dateFormat = 'dd-MM-yyyy') => {
  const parsedDate = date ? new Date(date) : new Date();
  return format(parsedDate, dateFormat);
};


export function debounce(func: Function, wait: number, immediate: boolean=false) {
  let timeout: NodeJS.Timeout;
  return function () {
    const context = this;
    const args = arguments;
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (callNow) func.apply(context, args);
  };
}
