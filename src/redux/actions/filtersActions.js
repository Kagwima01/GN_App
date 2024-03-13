import axios from 'axios';
import {
  setBrands,
  setCategories,
  setError,
  setLoading,
  setProducts,
} from '../slices/filters';
import {ipAddress} from '../../constants';

export const getCategories = () => async dispatch => {
  dispatch(setLoading());
  try {
    const {data} = await axios.get(`${ipAddress}/api/filters/categories`);
    const categories = data;
    dispatch(setCategories(categories));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An expected error has occured. Please try again later.',
      ),
    );
  }
};

export const getBrands = () => async dispatch => {
  dispatch(setLoading());
  try {
    const {data} = await axios.get(`${ipAddress}/api/filters/brands`);
    const brands = data;
    dispatch(setBrands(brands));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An expected error has occured. Please try again later.',
      ),
    );
  }
};

export const getProductsByCategory = category => async dispatch => {
  dispatch(setLoading());
  try {
    const {data} = await axios.get(
      `${ipAddress}/api/products/category/${category}`,
    );

    dispatch(setProducts(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An expected error has occured. Please try again later.',
      ),
    );
  }
};
export const getProductsByBrand = brand => async dispatch => {
  dispatch(setLoading());
  try {
    const {data} = await axios.get(`${ipAddress}/api/products/brand/${brand}`);

    dispatch(setProducts(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An expected error has occured. Please try again later.',
      ),
    );
  }
};
