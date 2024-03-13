import axios from 'axios';
import {
  setProducts,
  setError,
  setLoading,
  setProduct,
  setPagination,
  resetError,
  setNewProducts,
} from '../slices/product';
import {ipAddress} from '../../constants';

export const getProducts = (page, favouriteToggle) => async dispatch => {
  dispatch(setLoading());
  try {
    const {data} = await axios.get(`${ipAddress}/api/products/${page}/${24}`);
    const {products, pagination} = data;
    dispatch(setProducts(products));
    dispatch(setPagination(pagination));
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
export const getNewProducts = () => async dispatch => {
  dispatch(setLoading());
  try {
    const {data} = await axios.get(`${ipAddress}/api/products/new-products`);
    const products = data;
    dispatch(setNewProducts(products));
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

export const getOutOfStock = stock => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: {userInfo},
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const {data} = await axios.get(
      `${ipAddress}/api/products/out/${stock}`,
      config,
    );
    const products = data;
    dispatch(setProducts(products));
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

export const getProduct = id => async dispatch => {
  dispatch(setLoading(true));
  try {
    const {data} = await axios.get(`${ipAddress}/api/products/${id}`);
    dispatch(setProduct(data));
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

export const resetProductError = () => async dispatch => {
  dispatch(resetError());
};
