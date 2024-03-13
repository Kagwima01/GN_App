import axios from 'axios';
import {
  setError,
  setLoading,
  saveItemAdd,
  saveItemRemoval,
  clearSave,
} from '../slices/save';
import {ipAddress} from '../../constants';

export const addSaveItem = id => async dispatch => {
  dispatch(setLoading(true));
  try {
    const {data} = await axios.get(`${ipAddress}/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      brand: data.brand,
      category: data.category,
      sellingPrice: data.sellingPrice,
      productIsNew: data.productIsNew,
      description: data.description,
      stock: data.stock,
      image: data.images[0],
    };

    dispatch(saveItemAdd(itemToAdd));
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
export const removeSaveItem = id => async dispatch => {
  dispatch(setLoading(true));
  dispatch(saveItemRemoval(id));
};
export const resetSave = () => dispatch => {
  dispatch(clearSave);
};
