import { baseApi } from "./baseQuery";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getReports: build.query({
      query: () => ({
        url: `api/report/view_report_chartdata?id=6752dfd0dc65436814c6e94f&query_id=67515b4dd846514814d3d934`,
        method: "GET"
      }),
    }),


  }),
});

export const {
  useLazyGetReportsQuery,
} = reportsApi;
