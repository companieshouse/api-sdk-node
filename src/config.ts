export const API_URL = process.env.API_URL || "https://api.companieshouse.gov.uk";
export const ACCOUNT_URL = process.env.ACCOUNT_URL || "https://account.companieshouse.gov.uk";

// Header used to correlate logs between services.
// This will be used as the context key for logging.
export const REQUEST_ID_HEADER = "X-Request-Id";
