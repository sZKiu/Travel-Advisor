import { createSlice } from "@reduxjs/toolkit";

const coordsSlice = createSlice({
  name: "coords",

  initialState: {
    lat: 0,
    lng: 0,
  },

  reducers: {
    setCoords: (state, { payload }) => {
      state.lat = payload.lat;
      state.lng = payload.lng;
    },
  },
});

export default coordsSlice.reducer;

export const { setCoords } = coordsSlice.actions;