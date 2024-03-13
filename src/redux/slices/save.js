import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialState = {
  loading: false,
  error: null,
  favorites: [],
};

const updateAsyncStorage = async save => {
  await AsyncStorage.setItem('favorites', JSON.stringify(save));
};

export const savedSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    saveItemAdd: (state, {payload}) => {
      const existingItem = state.favorites.find(item => item.id === payload.id);

      if (existingItem) {
        state.favorites = state.favorites.map(item =>
          item.id === existingItem.id ? payload : item,
        );
      } else {
        state.favorites = [...state.favorites, payload];
      }
      state.loading = false;
      state.error = null;
      updateAsyncStorage(state.favorites);
    },
    saveItemRemoval: (state, {payload}) => {
      state.favorites = [...state.favorites].filter(
        item => item.id !== payload,
      );
      updateAsyncStorage(state.favorites);
      state.loading = false;
      state.error = null;
    },
    clearSave: state => {
      AsyncStorage.removeItem('favorites');
      state.favorites = [];
      state.loading = false;
      state.error = null;
    },
    setError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const {setLoading, setError, clearSave, saveItemAdd, saveItemRemoval} =
  savedSlice.actions;
export default savedSlice.reducer;

export const savedSelector = state => state.save;
