import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  images: [],
};

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },

    setImages: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.images = payload;
    },
    setError: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {setError, setLoading, setImages} = carouselSlice.actions;
export default carouselSlice.reducer;
export const carouselSelector = state => state.carousel;
