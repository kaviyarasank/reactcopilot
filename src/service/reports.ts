import { baseApi } from "./baseQuery";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getReports: build.query({
      query: () => ({
        url: `api/report/view_report_chartdata?id=675ff9f45bff99d1dfbf4ec1&query_id=675ff98b5bff99d1dfbf4eaf&connection_id=675fe1835bff99d1dfbf4e59`,
        method: "GET"
      }),
    }),


  }),
});

export const {
  useLazyGetReportsQuery,
} = reportsApi;
