const requiredEnv = ["REACT_APP_API_BASE_URL"];

requiredEnv.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
});

const envConfigs = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL
};

export default envConfigs;
