interface FetchOptions extends RequestInit {
  body?: string;
}

const API_BASE_URL = process.env.CONSUMET_API_BASE_URL;

interface FetchParams {
  endpoint: string;
  method?: string;
  body?: { [key: string]: any } | null | undefined;
  next?: NextFetchRequestConfig
}

interface FetchApiResponse<ApiResponse> {
  isSuccess: boolean;
  isError: boolean;
  data: ApiResponse | null;
  error: string | null;
  statusCode: number | null;
}

/**
 * Fetches data from the API and returns the response.
 *
 * @param {FetchParams} options - The options object containing the endpoint, method, body, and next configuration.
 * @param {string} options.endpoint - The API endpoint to fetch data from.
 * @param {string} [options.method='GET'] - The HTTP method to use for the request. Defaults to 'GET'.
 * @param {object | null} [options.body=null] - The request body to send with the request. Defaults to null.
 * @param {object} [options.next={ revalidate: 0 }] - The next configuration object. Defaults to { revalidate: 0 }.
 * @returns {Promise<FetchApiResponse<ApiResponse>>} A promise that resolves to the fetch API response containing the data, error, and status code.
 */
async function fetchApi<ApiResponse>({
  endpoint,
  method = 'GET',
  body = null,
  next = {
    revalidate: 0,
  },
}: FetchParams): Promise<FetchApiResponse<ApiResponse>> {
  const url                   = `${API_BASE_URL}/${endpoint}`;
  const options: FetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    next,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response   = await fetch(url, options);
    const statusCode = response.status;
    const isSuccess  = response.ok;
    const data       = isSuccess ? (await response.json()) as ApiResponse : null;
    const error      = isSuccess ? null : response.statusText;

    return {
      isSuccess,
      isError: !isSuccess,
      data,
      error,
      statusCode,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess  : false,
        isError    : true,
        data       : null,
        error      : error.message,
        statusCode : null,
      };
    }
    return {
      isSuccess  : false,
      isError    : true,
      data       : null,
      error      : "An unknown error occurred",
      statusCode : null,
    };
  }
}

export { fetchApi, type FetchApiResponse };
