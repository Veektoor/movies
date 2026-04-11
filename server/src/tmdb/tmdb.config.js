const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
  if (!baseUrl || !key) {
    throw new Error("TMDB configuration is missing. Set TMDB_BASE_URL and TMDB_KEY.");
  }

  const qs = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };
