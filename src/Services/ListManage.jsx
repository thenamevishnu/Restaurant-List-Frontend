import axios from "axios"
import toast from "react-hot-toast"
import { api } from "../axios"

const upload = async (file) => {
    try {
        const form = new FormData()
        form.append('file', file)
        form.append('api_key', import.meta.env.VITE_CLOUD_APIKEY)
        form.append('api_secret', import.meta.env.VITE_CLOUD_SECRET)
        form.append('cloud_name', import.meta.env.VITE_CLOUD)
        form.append('upload_preset', import.meta.env.VITE_CLOUD_PRESETS)
        const { data } = await axios.post(import.meta.env.VITE_CLOUD_URL, form)
        return data.url
    } catch (err) {
        console.log(err);
        toast.error(err)
        return
    }
}

export const addRestaurant = async (obj) => {
    try {
        for (let key in obj) {
            if (obj[key] == "") {
                console.log(key);
                return key.replace(key[0], key[0].toUpperCase()) + " is empty!"
            }
        }
        console.log("hey");
        const url = await upload(obj.RESTAURANT_IMAGE)
        obj.RESTAURANT_IMAGE = url
        const response = await api.post("/add-restaurant", obj)
        return {status: "OK", message: response.data.message}
    } catch (err) {
        toast.error(err)
        return
    }
}

export const updateRestaurant = async (obj) => {
    try {
        for (let key in obj) {
            if (obj[key] == "") {
                return key.replace(key[0], key[0].toUpperCase()) + " is empty!"
            }
        }
        if (obj.RESTAURANT_IMAGE?.name) {
            const url = await upload(obj.RESTAURANT_IMAGE)
            obj.RESTAURANT_IMAGE = url
        }
        const response = await api.patch("/update-restaurant", obj)
        return {message: response.data?.message}
    } catch (err) {
        toast.error(err)
        return
    }
}

export const getRestaurant = async () => {
    try {
        const response = await api.get("/get-restaurant")
        console.log(response.data);
        return response.data.result
    } catch (err) {
        toast.error(err)
        return
    }
}

export const deleteRestaurant = async (id) => {
    try {
        const response = await api.delete(`/delete-restaurant/${id}`)
        console.log(response);
    } catch (err) {
        console.log(err);
        toast.error(err)
        return
    }
}
