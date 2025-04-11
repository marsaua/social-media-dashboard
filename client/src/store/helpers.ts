export const formatAmount = (amount: number) => {
  return Math.abs(amount).toLocaleString("en-US", {});
};

export const fetchData = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: any,
  headers: Record<string, string> = {},
  credentials = true,
): Promise<T> => {
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const finalHeaders: Record<string, string> = isFormData
    ? headers // don't override Content-Type for FormData
    : {
        "Content-Type": "application/json",
        ...headers,
      };

  const options: RequestInit = {
    method,
    headers: finalHeaders,
  };

  if (method !== "GET" && body !== undefined) {
    options.body = isFormData ? body : JSON.stringify(body);
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
    throw {
      status: response.status,
      error: responseData || "Request failed",
      errors: responseData?.errors,
    };
  }

  return responseData;
};
