import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 

    export const shazamCoreApi = createApi({
         reducerPath: 'shazamCoreApi',
         baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-api6.p.rapidapi.com',
            prepareHeaders: (headers) => {
                headers.set('x-rapidapi-key', '84ee0f49c6msh9371c7c4efa6dc9p161378jsnf187f3924881');

                return headers;
            },
         }),
         endpoints: (builder) => ({
            getTopCharts: builder.query({query: () => '/shazam/top_tracks_country?limit=50'}),
              // Adding error handling for debugging
              transformResponse: (response) => {
                if (!response || !response.status) {
                    throw new Error('No response from API');
                }
                return response.result;
            },
           
         })
    });

    export const {
        useGetTopChartsQuery,
    } = shazamCoreApi;