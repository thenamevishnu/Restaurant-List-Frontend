import { createContext, useContext, useState } from "react";

const MyContext = createContext()

export const MyProvider = ({ children }) => {
    const [detailedView, setDetailedView] = useState(null)
    const [formData, setFormData] = useState(null)
    const [restaurantList, setRestaurantList] = useState([])
    const [deleteRecord, setDeleteRecord] = useState(null)

    return (
        <MyContext.Provider value={{ detailedView, deleteRecord, setDeleteRecord, setDetailedView, formData, setFormData, setRestaurantList, restaurantList }}>
            {children}
        </MyContext.Provider>
    )
}

export const useGlobalState = () => {
    return useContext(MyContext)
}