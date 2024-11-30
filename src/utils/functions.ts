import { format } from 'date-fns';

export const currentDate = (dateFormat = 'dd-MM-yyyy') => {
  const currentDate = new Date();
  return format(currentDate, dateFormat)
}

export const formatDate = (date?: string | Date, dateFormat = 'dd-MM-yyyy') => {
  const parsedDate = date ? new Date(date) : new Date();
  return format(parsedDate, dateFormat);
};

export function debounce(func: (this: any, ...args: any[]) => void, wait: number, immediate: boolean = false) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) { 
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;

      if (!immediate) {
        func.apply(this, args);  
      }
    }, wait);
    if (callNow) func.apply(this, args); 
  };
};


export function removePrefix(filename: string): string {
  return filename.replace(/^([^\-]*-){4}/, '');
};