import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const travelAdvisor: any = createApi({
  reducerPath: "travelAdvisorApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://travel-advisor.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "4b5dae2f18msh20b900154ed84afp1ced00jsn434cfb9566ec"
      );

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTravelPoints: builder.query({
      query: ({ type = "restaurants", ne, sw }) =>
        `${type}/list-in-boundary?tr_longitude=${ne.lng}&tr_latitude=${ne.lat}&bl_longitude=${sw.lng}&bl_latitude=${sw.lat}&currency=USD&lunit=km&lang=en_US`,
    }),

    getTravelByCoords: builder.query({
      query: ({ type = "restaurants", lat, lng }) =>{
        console.log(lat)
        return `/${type}/list-by-latlng?longitude=${lng}&latitude=${lat}&lunit=km&currency=USD&lang=en_US`
      },
    }),
  }),
});

export const { useGetTravelPointsQuery, useGetTravelByCoordsQuery } = travelAdvisor;
