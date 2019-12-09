import {getAxiosInstance} from "../../config/Axios.js";

const userRoot = getAxiosInstance('/user/restaurants');
const privateRoot = getAxiosInstance('/private/restaurants');
const publicRoot = getAxiosInstance('/public/restaurants');

export const postUser = async function(restaurant){
    try {
        const result = await userRoot.post(`${restaurant.id}`, {
            'data': {
               restaurant
            }
        });
    } catch (error){
        alert(error);
    }
}

export const getUser = async function(){
    try {
        const result = await userRoot.get('');
        return(result.data.result);
    } catch (error){
        alert(error);
    }
}
