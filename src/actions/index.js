//import dotenv from 'dotenv';
//dotenv.config({ path: path.resolve(__dirname, '../../.env') });
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import path from 'path';
import moment from 'moment';
export const FETCH_RIDES = 'fetch_rides';
export const CREATE_RIDE = 'create_ride';
export const FETCH_RIDE = 'fetch_ride';
export const DELETE_RIDE = 'delete_ride';
export const FB_USER_STATE = 'facebook_user_info';
export const FETCH_RIDE_BY_UID = 'fetch_rides_by_uid';
export const LOGIN = 'login';

const LOCAL_ROOT_URL = process.env.LOCAL_ROOT_URL;

export function fb_user_state(userInfo, callback) {
  //if (userInfo.loggedIn === false) {
    callback();
  //}
  return {
    type: FB_USER_STATE,
    payload: userInfo
  };
}

export function loginTriggered(callback) {
  return {
    type: LOGIN,
    payload: {login_pressed:true}
  };
}

export function fetchRides() {
  const request = axios.get(`${LOCAL_ROOT_URL}/rides`);

  return {
    type: FETCH_RIDES,
    payload: request
  };
}

export function createRide(values, uid, link, profile_picture, callback) {
  values.date = moment.utc(values.date);
  values["uid"] = uid;
  values["link"] = link;
  values["profile_picture"] = profile_picture;
  //Callback redirects user to home page
  const request = axios.post(`${LOCAL_ROOT_URL}/rides`, values)
    .then(() => callback());

  return {
    type: CREATE_RIDE,
    payload: request
  };
}

export function updateRide(values, uid, link, rideID, profile_picture, callback) {
  values["uid"] = uid;
  values["link"] = link;
  values["rideID"] = rideID;
  values["profile_picture"] = profile_picture;
  //Callback redirects user to home page
  const request = axios.post(`${LOCAL_ROOT_URL}/rides/update`, values)
    .then(() => callback());

  return {
    type: CREATE_RIDE,
    payload: request
  };
}

export function fetchRide(id) {
  const request = axios.get(`${LOCAL_ROOT_URL}/rides/${id}`);
  return {
    type: FETCH_RIDE,
    payload: request
  };
}

export function fetchRidesBy_UID(id) {
  const request = axios.get(`${LOCAL_ROOT_URL}/rides/user/${id}`);
  return {
    type: FETCH_RIDE_BY_UID,
    payload: request
  };
}

export function deleteRide(id, callback) {
  const request = axios.delete(`${LOCAL_ROOT_URL}/rides/${id}`)
    .then(() => callback());

  return {
    type: DELETE_RIDE,
    payload: id
  };
}
