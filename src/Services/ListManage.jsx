import axios from "axios"
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
        if (data?.secure_url) {
            return data
        }
        return { message: "Something error happend!" }
    } catch (err) {
        return { message: err?.response?.data?.message || err?.message }
    }
}

export const addRestaurant = async (obj) => {
    try {
        for (let key in obj) {
            if (obj[key] == "") {
                return { message: key.replace(key[0], key[0].toUpperCase()) + " is empty!" }
            }
            if (key == "RESTAURANT_NUMBER" && isNaN(obj[key])) {
                return { message: "RESTAURANT_NUMBER Should be numeric" }
            }
        }
        const { secure_url } = await upload(obj.RESTAURANT_IMAGE)
        if (secure_url) {
            obj.RESTAURANT_IMAGE = secure_url
            const { data } = await api.post("/add-restaurant", obj)
            if (data.status === "OK") {
                return data
            }
        }
        return { message: "Something error happend!" }
    } catch (err) {
        return { message: err?.response?.data?.message || err?.message }
    }
}

export const updateRestaurant = async (obj) => {
    try {
        for (let key in obj) {
            if (obj[key] == "") {
                return { message: key.replace(key[0], key[0].toUpperCase()) + " is empty!" }
            }
            if (key == "RESTAURANT_NUMBER" && isNaN(obj[key])) {
                return { message: "RESTAURANT_NUMBER Should be numeric" }
            }
        }
        if (obj.RESTAURANT_IMAGE?.name) {
            const { secure_url } = await upload(obj.RESTAURANT_IMAGE)
            if (secure_url) {
                obj.RESTAURANT_IMAGE = secure_url
            } else {
                return { message: "Upload failed!" }
            }
        }
        const { data } = await api.patch("/update-restaurant", obj)
        if (data.status === "OK") {
            return data
        }
        return { message: "Something error happend!" }
    } catch (err) {
        return { message: err?.response?.data?.message || err?.message }
    }
}

export const getRestaurant = async () => {
    try {
        const { data } = await api.get("/get-restaurant")
        if (data.result) {
            return data
        }
        return { message: "Something error happend!" }
    } catch (err) {
        return { message: err?.response?.data?.message || err?.message }
    }
}

export const deleteRestaurant = async (id) => {
    try {
        const { data } = await api.delete(`/delete-restaurant/${id}`)
        if (data?.message === "Deleted") {
            return true
        }
        return false
    } catch (err) {
        return { message: err?.response?.data?.message || err?.message }
    }
}
