// Taken from Chris's video

export const baseURL = 'http://localhost:3000';

export const getAxiosInstance = function (middlePath = '') {
  return axios.create({
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    baseURL: `${baseURL}${middlePath}`
  });
};