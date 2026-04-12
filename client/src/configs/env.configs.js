const requiredEnv = ["REACT_APP_API_BASE_URL"];

requiredEnv.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
});

const normalizeApiBaseUrl = (value) => {
  const trimmedValue = value.trim();
  const withoutKeyPrefix = trimmedValue.replace(/^REACT_APP_API_BASE_URL=/, "");
  const normalizedProtocol = withoutKeyPrefix.replace(/^(https?):\/(?!\/)/, "$1://");
  const normalizedBaseUrl = normalizedProtocol.replace(/\/+$/, "");

  if (!/^https?:\/\//.test(normalizedBaseUrl)) {
    throw new Error(`Invalid REACT_APP_API_BASE_URL: ${value}`);
  }

  return normalizedBaseUrl;
};

const envConfigs = {
  apiBaseUrl: normalizeApiBaseUrl(process.env.REACT_APP_API_BASE_URL)
};

export default envConfigs;
