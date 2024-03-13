import {createSlice} from '@reduxjs/toolkit';
export const initialState = {
  loading: false,
  error: null,
  search: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    setSearchProducts: (state, {payload}) => {
      state.search = payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});
export const {setLoading, setError, setSearchProducts} = searchSlice.actions;
export default searchSlice.reducer;
export const searchSelector = state => state.search;
