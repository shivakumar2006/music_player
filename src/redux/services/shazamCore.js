import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://youtube-v31.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', '84ee0f49c6msh9371c7c4efa6dc9p161378jsnf187f3924881'); // Replace with your actual RapidAPI key
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: (limit = 50) => ({
                url: '/search',
                params: {
                    q: 'top+charts',    // Query to search for top charts
                    type: 'video',      // Specify the type of content (video)
                    maxResults: limit,  // Limit the number of results returned
                },
            }),
            transformResponse: (response) => {
                // Error handling for API response
                if (!response || !response.items) {
                    throw new Error('No results found or invalid response');
                }

                // Safely map the response, checking for missing properties
                return response.items.map(item => {
                    const snippet = item.snippet || {}; // Fallback to an empty object if snippet is missing
                    const id = item.id || {}; // Fallback to an empty object if id is missing

                    return {
                        videoId: id.videoId,  // Extract video ID, this may not exist on all items
                        title: snippet.title || 'Untitled',  // Fallback title if missing
                        thumbnail: snippet.thumbnails?.default?.url || 'fallback_image_url.jpg',  // Fallback image URL if missing
                        videoUrl: id.videoId ? `https://www.youtube.com/watch?v=${id.videoId}` : '', // Video URL with fallback
                    };
                });
            },
        }),
    }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
