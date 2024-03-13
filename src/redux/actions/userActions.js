import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  setUserOrders,
  setError,
  setLoading,
  setServerResponseStatus,
  setServerResponseMsg,
  userLogin,
  userLogout,
  verificationEmail,
  stateReset,
  userDeleteAccount,
} from '../slices/user';
import {ipAddress} from '../../constants';

import {clearCart} from '../slices/cart';

export const login = (email, password) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.post(
      `${ipAddress}/api/users/login`,
      {email, password},
      config,
    );
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));

    dispatch(userLogin(data));
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

export const logout = () => dispatch => {
  AsyncStorage.removeItem('userInfo');
  AsyncStorage.removeItem('cartItems');
  //dispatch(clearCart());
  dispatch(userLogout());
};

export const register = (name, email, password) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.post(
      `${ipAddress}/api/users/register`,
      {name, email, password},
      config,
    );
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));

    dispatch(userLogin(data));
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

export const verifyEmail = token => async dispatch => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    await axios.get(`${ipAddress}/api/users/verify-email`, config);

    dispatch(verificationEmail());
    const userInfo = JSON.parse(AsyncStorage.getItem('userInfo'));
    if (userInfo) {
      userInfo.active = true;
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
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

export const sendResetEmail = email => async dispatch => {
  dispatch(setLoading(true));
  try {
    const config = {headers: {'Content-Type': 'application/json'}};

    const {data, status} = await axios.post(
      `${ipAddress}/api/users/password-reset-request`,
      {email},
      config,
    );

    dispatch(setServerResponseMsg(data));
    dispatch(setServerResponseStatus(status));
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

export const resetPassword = (password, token) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const {data, status} = await axios.post(
      `${ipAddress}/api/users/password-reset`,
      {password},
      config,
    );
    console.log(data, status);
    dispatch(setServerResponseMsg(data, status));
    dispatch(setServerResponseStatus(status));
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

export const deleteAccount = id => async (dispatch, getState) => {
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
    await axios.delete(`${ipAddress}/api/users/delete-account/${id}`, config);
    dispatch(userDeleteAccount());
    AsyncStorage.removeItem('userInfo');
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

export const resetState = () => async dispatch => {
  dispatch(stateReset());
};

export const googleLogin =
  (googleId, email, name, googleImage) => async dispatch => {
    dispatch(setLoading(true));
    try {
      const config = {headers: {'Content-Type': 'application/json'}};

      const {data} = await axios.post(
        `${ipAddress}/api/users/google-login`,
        {googleId, email, name, googleImage},
        config,
      );
      dispatch(userLogin(data));
      AsyncStorage.setItem('userInfo', JSON.stringify(data));
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

export const getUserOrders = () => async (dispatch, getState) => {
  dispatch(setLoading(true));

  const {
    user: {userInfo},
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.get(
      `${ipAddress}/api/users/${userInfo._id}`,
      config,
    );
    dispatch(setUserOrders(data));
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
