import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


//creates a new instance for reducer and url endpoints
export const api = createApi({
    reducerPath: "api",    //api name
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API,
        credentials: "include",     //for cookies
    }),   //base api url
    //usable endpoints
    endpoints: (builder) => ({
        getRandomSongs: builder.query({ query: () => "/audios/random" }),  //can pass a value in arrow fn and return a dynamic string
        getSongById: builder.query({
            query: (songid) => `audios/find/${songid}`
        }),
        getArtistById: builder.query({
            query: (artistid) => `users/find/${artistid}`
        }),
        getArtistSongs: builder.query({
            query: (artistid) => `audios/artist/${artistid}`
        }),
    })
});

//the endpoints are returned by createApi() from redox as a hook which is exported as seen below
export const {
    useGetRandomSongsQuery,  //use + endpoint + Query
    useGetSongByIdQuery,
    useGetArtistByIdQuery,
    useGetArtistSongsQuery,

} = api;