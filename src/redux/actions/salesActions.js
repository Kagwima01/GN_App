import axios from 'axios';
import {
  setError,
  setLoading,
  salesItemAdd,
  salesItemRemoval,
  clearSales,
} from '../slices/sale';
import {ipAddress} from '../../constants';

export const addSalesItem = (id, qty) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const {data} = await axios.get(`${ipAddress}/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      image: data.images[0],
      price: data.sellingPrice,
      stock: data.stock,
      brand: data.brand,
      category: data.category,
      qty,
    };
    dispatch(salesItemAdd(itemToAdd));
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

export const confirmSale = () => async (dispatch, getState) => {
  const {
    sales: {salesItems, subtotal},
    user: {userInfo},
  } = getState();

  const newSale = {salesItems, subtotal, userInfo};
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.post(
      `${ipAddress}/api/sales/confirm-sales`,
      newSale,
      config,
    );
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

export const removeSalesItem = id => async dispatch => {
  dispatch(setLoading(true));
  dispatch(salesItemRemoval(id));
};
export const resetSales = () => dispatch => {
  dispatch(clearSales());
};
