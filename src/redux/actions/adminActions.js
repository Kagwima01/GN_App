import axios from 'axios';
import {ipAddress} from '../../constants';
import {setProducts, setProductUpdateFlag, setProduct} from '../slices/product';
import {
  setError,
  setLoading,
  resetError,
  getUsers,
  userDelete,
  getSales,
  setConfirmedFlag,
  salesDelete,
} from '../slices/admin';

export const getAllUsers = () => async (dispatch, getState) => {
  setLoading();
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
    const {data} = await axios.get(`${ipAddress}/api/users`, config);
    dispatch(getUsers(data));
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An expected error has occured. Please try again later.',
    );
  }
};

export const deleteUser = id => async (dispatch, getState) => {
  setLoading();
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
    const {data} = await axios.delete(`${ipAddress}/api/users/${id}`, config);
    dispatch(userDelete(data));
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An expected error has occured. Please try again later.',
    );
  }
};

export const getAllSales = () => async (dispatch, getState) => {
  setLoading();
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
    const {data} = await axios.get(`${ipAddress}/api/sales`, config);
    dispatch(getSales(data));
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An expected error has occured. Please try again later.',
    );
  }
};

export const setConfirmed = id => async (dispatch, getState) => {
  setLoading();
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
    await axios.put(`${ipAddress}/api/sales/confirm-sale/${id}`, {}, config);
    dispatch(setConfirmedFlag());
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An expected error has occured. Please try again later.',
    );
  }
};

export const deleteSale = id => async (dispatch, getState) => {
  setLoading();
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
    const {data} = await axios.delete(`${ipAddress}/api/sales/${id}`, config);
    dispatch(salesDelete(data));
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An expected error has occured. Please try again later.',
    );
  }
};

export const resetErrorAndRemoval = () => async dispatch => {
  dispatch(resetError());
};

export const updateProduct =
  (
    id,
    name,
    imageOne,
    imageTwo,
    brand,
    category,
    description,
    buyingPrice,
    sellingPrice,
    stock,
    productIsNew,
  ) =>
  async (dispatch, getState) => {
    setLoading();

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
      await axios.put(
        `${ipAddress}/api/products`,
        {
          id,
          name,
          imageOne,
          imageTwo,
          brand,
          category,
          description,
          sellingPrice,
          buyingPrice,
          stock,
          productIsNew,
        },
        config,
      );
      dispatch(setProductUpdateFlag());
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An expected error has occured. Please try again later.',
      );
    }
  };

export const updateStock = (id, stock) => async (dispatch, getState) => {
  setLoading();

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
    const {data} = await axios.put(
      `${ipAddress}/api/stock/update/${id}`,
      {
        stock: stock,
      },
      config,
    );
    dispatch(setProduct(data));
    dispatch(setProductUpdateFlag());
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An expected error has occured. Please try again later.',
    );
  }
};

export const deleteProduct = id => async (dispatch, getState) => {
  setLoading();
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
    const {data} = await axios.delete(
      `${ipAddress}/api/products/${id}`,
      config,
    );
    dispatch(setProducts(data));
    dispatch(setProductUpdateFlag());
    dispatch(resetError());
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An expected error has occured. Please try again later.',
    );
  }
};

export const uploadProduct = newProduct => async (dispatch, getState) => {
  setLoading();

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
    const {data} = await axios.post(
      `${ipAddress}/api/products`,
      newProduct,
      config,
    );
    dispatch(setProducts(data));
    dispatch(setProductUpdateFlag());
  } catch (error) {
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An expected error has occured. Please try again later.',
    );
  }
};
