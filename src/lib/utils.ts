/**
 * Formats a date object or string into a localized, human-readable string (e.g., "Oct 27, 2023").
 * @param date The date object or string to format.
 * @param locale The locale to use for formatting (defaults to 'en-US').
 * @param options Intl.DateTimeFormatOptions (defaults to { month: 'short', day: 'numeric', year: 'numeric' }).
 * @returns The formatted date string.
 */
export const formatDate = (
  date: Date | string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Formats a number of seconds into a standard duration string (e.g., "HH:MM:SS").
 * @param totalSeconds The total number of seconds.
 * @returns The formatted duration string.
 */
export const formatDuration = (totalSeconds: number): string => {
  if (totalSeconds < 0 || isNaN(totalSeconds)) {
    return '00:00';
  }

  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor(totalSeconds / 3600);

  const pad = (num: number) => num.toString().padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
};

/**
 * Generates a standard CSS class string from an array or arguments of class names.
 * Filters out falsy values.
 * @param classes Array or spread arguments of class names (strings or falsy).
 * @returns A single string of concatenated class names.
 */
export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Debounces a function call, ensuring it's only executed after a specified delay since the last call.
 * @param func The function to debounce.
 * @param delay The delay in milliseconds.
 * @returns The debounced function.
 */
export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  } as T;
};

/**
 * Throttles a function call, ensuring it's executed at most once per a specified time period.
 * @param func The function to throttle.
 * @param limit The time limit in milliseconds.
 * @returns The throttled function.
 */
export const throttle = <T extends (...args: any[]) => void>(func: T, limit: number) => {
  let inThrottle: boolean;
  let lastResult: any;

  return function(this: any, ...args: Parameters<T>) {
    const context = this;

    if (!inThrottle) {
      inThrottle = true;
      // Execute the function immediately
      lastResult = func.apply(context, args);

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }

    return lastResult;
  } as T;
};


/**
 * Converts a large number into a concise, human-readable format (e.g., 1200000 -> 1.2M).
 * @param num The number to format.
 * @returns The formatted string.
 */
export const formatLargeNumber = (num: number): string => {
  if (num === null || num === undefined) {
    return '0';
  }

  if (num < 1000) {
    return num.toString();
  }

  const units = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  for (let i = 0; i < units.length; i++) {
    if (num >= units[i].value) {
      return (num / units[i].value).toFixed(1).replace(/\.0$/, '') + units[i].symbol;
    }
  }

  return num.toString();
};

/**
 * Safely parses JSON strings.
 * @param jsonString The JSON string to parse.
 * @param fallbackValue The value to return if parsing fails.
 * @returns The parsed object or the fallback value.
 */
export function safeJsonParse<T>(jsonString: string | null | undefined, fallbackValue: T): T {
  if (!jsonString) return fallbackValue;
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('JSON parsing failed:', error);
    return fallbackValue;
  }
}