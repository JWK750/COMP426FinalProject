import {getAxiosInstance} from "../../config/Axios.js";

const userRoot = getAxiosInstance('/user/restaurants');
const privateRoot = getAxiosInstance('/private/restaurants');
const publicRoot = getAxiosInstance('/public/restaurants');

export const handleLogout = function(){
    localStorage.setItem('token','');
    localStorage.setItem('name','');
    window.location.reload();
}

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

export const postLike = async function(restaurant){
    let result = [];
    try {
        result = await privateRoot.get('/');
        result = result.data.result;
    } catch(error){

    }
    try {
        if (result.includes(restaurant.id)){
            console.log('true');
            let privResult = await privateRoot.post(`${restaurant.id}/likes`, {
                'data': [localStorage.getItem('name')],
                'type': 'merge'
            });
            let pubResult = await publicRoot.post(`${restaurant.id}/likes`, {
                'data': [localStorage.getItem('name')],
                'type': 'merge'
            });
        } else {
            let privResult = await privateRoot.post(`${restaurant.id}`, {
                'data': {
                "restaurant": restaurant,
                "likes": [localStorage.getItem('name')]
                }
            });
            let pubResult = await publicRoot.post(`${restaurant.id}`, {
                'data': {
                "restaurant": restaurant,
                "likes": [localStorage.getItem('name')]
                }
            });
            console.log(privResult);
            console.log(pubResult);
        }
    } catch(error){
        console.log(error);
    }
}

export const getTopLiked = async function() {
    try {
        const result = await publicRoot.get('');
        return(result.data.result);
    } catch (error){
        alert(error);
    }
}