import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  products: [],
  categories: [],
  brands: [],
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    setProducts: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    setCategories: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.categories = payload;
    },
    setBrands: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.brands = payload;
    },
    setError: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  setLoading,
  setError,

  setCategories,
  setBrands,
  setProducts,
} = filtersSlice.actions;

export default filtersSlice.reducer;
export const filtersSelector = state => state.filters;
