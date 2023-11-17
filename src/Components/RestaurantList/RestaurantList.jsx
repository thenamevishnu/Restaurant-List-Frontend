import { Fragment, useEffect, useState } from "react"
import { useGlobalState } from "../../Hooks/Context"
import { deleteRestaurant, getRestaurant } from "../../Services/ListManage"
import { addInitialForm } from "../../constants"

const RestaurantList = () => {

    const { setDetailedView, setFormData, setRestaurantList, restaurantList } = useGlobalState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRestaurant()
            setRestaurantList(response)
        }
        fetchData()
    }, [])
    
    return (
        <Fragment>
            <div className="flex fixed bottom-4 right-4 justify-center">
                <button className='p-2 px-3 bg-violet-900 rounded-full text-white' onClick={()=>setFormData(addInitialForm)}><i className='fa fa-plus'></i></button>
            </div>
            <div className='px-2 mt-28 my-5 flex-wrap flex gap-2 md:px-10 justify-center'>   
            
                {
                    restaurantList && restaurantList.map(item => {
                        return (
                            <div key={item.id} className='group w-[250px] overflow-hidden relative shadow shadow-gray-400 hover:shadow-gray-800 duration-200 transition-all ease-linear rounded-xl cursor-pointer p-2 '>
                                <div className=' overflow-hidden rounded-xl'>
                                    <img src={item.RESTAURANT_IMAGE} onClick={()=>setDetailedView(item.RESTAURANT_NAME)} className='w-[250px] duration-200 transition-all ease-linear group-hover:scale-[1.1] rounded-xl h-[150px]'/>
                                </div>
                                <div className=' text-center font-medium'>
                                    <h2 className=" mt-3"><i className='fa fa-hotel whitespace-pre-wrap'></i> {item.RESTAURANT_NAME}</h2>
                                    <p className="mt-2"><i className='fa fa-phone'></i> {item.RESTAURANT_NUMBER}</p>
                                    <p className="mt-2"><i className='fa fa-location-dot whitespace-pre-wrap'></i> {item.RESTAURANT_ADDRESS}</p>
                                </div>
                                <div onClick={() => {
                                    const { createdAt, updatedAt, ...rest } = item;
                                    setFormData(rest)
                                }} className=' absolute flex p-4 justify-center items-center bg-black bg-opacity-20 bottom-[-5rem] left-2 group-hover:bottom-2 rounded-full w-7 h-7 transition-all duration-150 ease-linear'>
                                    <i className='fa fa-pen text-gray-800'></i>
                                </div>
                                <div onClick={async () => {
                                    await deleteRestaurant(item.id)
                                    setRestaurantList(restaurantList.filter(items=>items.id!==item.id))
                                }} className=' absolute flex p-4 justify-center items-center bg-black bg-opacity-20 bottom-[-5rem] right-2 group-hover:bottom-2 rounded-full w-7 h-7 transition-all duration-150 ease-linear'>
                                    <i className='fa fa-trash text-red-800 opacity-70'></i>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </Fragment>
    )

}

export default RestaurantList
