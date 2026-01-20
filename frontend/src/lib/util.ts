export const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number = 1000,
) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeoutTimer);
    timeoutTimer = setTimeout(()=>{
      callback(...args);
    }, delay);
  }
}