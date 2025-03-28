export const formatAmount = (amount: number) => {
  return Math.abs(amount).toLocaleString("en-US", {});
};

export const fetchData = async <T>(
  endpoint: string,
  method = "GET",
  body?: any,
  headers: Record<string, string> = {},
  credentials = false,
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  if (credentials) {
    options.credentials = "include";
  }

  const response = await fetch(`http://localhost:8080/api${endpoint}`, options);
  let responseData;

  try {
    responseData = await response.json();
  } catch (parseError) {
    console.error("Failed to parse response:", parseError);
    throw {
      status: response.status,
      message: `Unexpected server response (${response.status})`,
    };
  }

  if (!response.ok) {
    throw responseData;
  }

  return responseData;
};
