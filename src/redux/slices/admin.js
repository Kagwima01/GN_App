import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  error: null,
  loading: false,
  userList: null,
  userRemoval: false,
  sales: null,
  salesRemoval: false,
  confirmedFlag: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    setError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
    getUsers: (state, {payload}) => {
      state.userList = payload;
      state.error = null;
      state.loading = false;
    },
    getSales: (state, {payload}) => {
      state.sales = payload;
      state.error = null;
      state.loading = false;
    },
    userDelete: state => {
      state.error = null;
      state.loading = false;
      state.userRemoval = true;
    },

    salesDelete: state => {
      state.error = null;
      state.loading = false;
      state.salesRemoval = true;
    },

    resetError: state => {
      state.error = null;
      state.loading = false;
      state.userRemoval = false;
    },
    setConfirmedFlag: state => {
      state.confirmedFlag = true;
      state.loading = false;
    },
  },
});

export const {
  setError,
  setLoading,
  resetError,
  getUsers,
  userDelete,
  getSales,
  setConfirmedFlag,
  salesDelete,
} = adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = state => state.admin;
