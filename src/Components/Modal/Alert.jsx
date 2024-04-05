import React from 'react'
import { useGlobalState } from '../../Hooks/Context'
import { deleteRestaurant } from '../../Services/ListManage'
import toast from 'react-hot-toast'

const Alert = () => {

    const { deleteRecord, setDeleteRecord, restaurantList, setRestaurantList } = useGlobalState()

    return (
        <div className={`fixed bg-white shadow p-3 text-center shadow-gray-500 z-[9] transition-all ease-linear duration-300 ${deleteRecord ? `top-20` : `top-[-20rem]`} rounded-xl w-4/12 h-auto left-1/2 translate-x-[-50%]`}>
            <div className='absolute'>
            </div>
            <p>Are you sure to delete { deleteRecord?.RESTAURANT_NAME }</p>
            <div className='mt-5 flex gap-2 justify-center text-white'>
                <button className='bg-green-700 p-1 px-2 rounded-xl' onClick={async () => {
                    const response = await deleteRestaurant(deleteRecord?.id)
                    setDeleteRecord(null)
                    if (response) {
                        setRestaurantList(restaurantList?.filter(items=>items.id!==deleteRecord?.id))
                    } else {
                        return toast.error("Delete failed!")
                    }
                }}>Confirm</button>
                <button className='bg-red-500 p-1 px-2 rounded-xl' onClick={()=>setDeleteRecord(null)}>Cancel</button>
            </div>
        </div>
    )
}

export default Alert
