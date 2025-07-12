import { ApiResponse } from "./types.ts";

type KEY = "api_key" | "api_response";
type StoredApiResponse = ApiResponse & { timestamp: number };

function getItem(key: KEY) {
  return localStorage.getItem(key);
}

function setItem(key: KEY, item: string) {
  localStorage.setItem(key, item);
}

export function getApikey() {
  return getItem("api_key");
}

export function setApiKey(apiKey: string) {
  setItem("api_key", apiKey);
}

export function setApiResponse(apiResponse: ApiResponse) {
  const storedApiResponse: StoredApiResponse = {
    ...apiResponse,
    timestamp: Date.now(),
  };
  setItem("api_response", JSON.stringify(storedApiResponse));
}

function getStoredApiResponse() {
  const storedApiResponseString = getItem("api_response");
  if (!storedApiResponseString) {
    return undefined;
  }

  return JSON.parse(
    storedApiResponseString,
  ) as StoredApiResponse;
}

export function getApiResponse() {
  return getStoredApiResponse() as ApiResponse | undefined;
}

export function getApiResponseTimestamp() {
  return getStoredApiResponse()?.timestamp;
}
