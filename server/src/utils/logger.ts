const error = (message: string) => {
  console.error(`[${new Date().toISOString()}] ${message}`);
};

const warn = (message: string) => {
  console.warn(`[${new Date().toISOString()}] ${message}`);
};

const info = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

const debug = (message: string) => {
  console.debug(`[${new Date().toISOString()}] ${message}`);
};

const Logger = {
  error,
  warn,
  info,
  debug,
};

export default Logger;