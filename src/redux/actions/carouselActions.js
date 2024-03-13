import axios from 'axios';
import {setImages, setError, setLoading} from '../slices/carousel';
import {ipAddress} from '../../constants';

export const getImages = () => async dispatch => {
  dispatch(setLoading());
  try {
    const {data} = await axios.get(`${ipAddress}/api/images`);
    const images = data;
    dispatch(setImages(images));
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
