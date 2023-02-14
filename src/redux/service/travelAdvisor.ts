import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const travelAdvisor: any = createApi({
  reducerPath: "travelAdvisorApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://travel-advisor.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "3ffa0c33a8msh67f6dbdf63cca39p12bcf6jsn86f0664c5c5b"
      );

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTravelPoints: builder.query({
      query: ({ type = "restaurants", ne, sw }) => {
        if (type === "hotels") {
          return `hotels/list-in-boundary?bl_latitude=${sw.lat}&bl_longitude=${sw.lng}&tr_longitude=${ne.lng}&tr_latitude=${ne.lat}&limit=30&currency=USD&subcategory=hotel%2Cbb%2Cspecialty&adults=1`;
        } else {
          return `${type}/list-in-boundary?tr_longitude=${ne.lng}&tr_latitude=${ne.lat}&bl_longitude=${sw.lng}&bl_latitude=${sw.lat}&currency=USD&lunit=km&lang=en_US`;
        }
      },
    }),

    getTravelByCoords: builder.query({
      query: ({ type = "restaurants", lat, lng }) => {
        return `/${type}/list-by-latlng?latitude=${lat}&longitude=${lng}&lang=en_US&hotel_class=1%2C2%2C3&limit=30&adults=1&rooms=1&currency=USD&subcategory=hotel%2Cbb%2Cspecialty`;
      },
    }),
  }),
});

export const { useGetTravelPointsQuery, useGetTravelByCoordsQuery } =
  travelAdvisor;
