import {
    FetchArgs,
    createApi,
    fetchBaseQuery,
   FetchBaseQueryError, FetchBaseQueryMeta, BaseQueryFn
  
  } from "@reduxjs/toolkit/query/react";
  
  interface CustomFetchBaseQueryArgs extends FetchArgs {
    customRedirect?: boolean;
  }
  
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://15.206.125.185:3000/',
      prepareHeaders: (headers, { getState }:any) => {
        return headers;
      },
    })
  
  //used for token handle and common response and error
  
  const customFetchBaseQuery: BaseQueryFn<string | CustomFetchBaseQueryArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    console.log('result', result);
    return result;
  };
  
  
  export const baseApi = createApi({
    reducerPath: "baseApiReducer",
    baseQuery: customFetchBaseQuery,
    endpoints: () => ({}),
    tagTypes: []
  });
  