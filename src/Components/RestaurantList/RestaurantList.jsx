import { Fragment, useEffect } from "react"
import { useGlobalState } from "../../Hooks/Context"
import { getRestaurant } from "../../Services/ListManage"
import { addInitialForm } from "../../constants"
import toast from "react-hot-toast"

const RestaurantList = () => {

    const { setDetailedView, setFormData, setRestaurantList, restaurantList, setDeleteRecord } = useGlobalState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRestaurant()
            if (response?.result) {
                setRestaurantList(response.result)
            } else {
                return toast.error(response?.message)
            }
        }
        fetchData()
    }, [])

    return (
        <Fragment>
            <div className="flex fixed bottom-4 z-10 right-4 justify-center">
                <button className='p-2 px-3 bg-violet-900 rounded-full text-white' onClick={() => setFormData(addInitialForm)}><i className='fa fa-plus'></i></button>
            </div>
            <div className='px-2 mt-28 my-5 flex-wrap flex gap-2 md:px-10 justify-center'>

                {
                    restaurantList && restaurantList?.length > 0 && restaurantList.map(item => {
                        return (
                            <div key={item?.id} className='group bg-white w-[300px] overflow-hidden relative shadow shadow-gray-400 hover:shadow-gray-800 duration-200 transition-all ease-linear rounded-xl cursor-pointer p-2 '>
                                <div className=' overflow-hidden relative rounded-xl'>
                                    <p onClick={() => setDetailedView(item)} className=" absolute z-[1] opacity-0 left-1/2 translate-x-[-50%] top-1/2 text-white translate-y-[-50%] bg-black p-1 px-2 rounded-xl bg-opacity-80 font-medium group-hover:opacity-100 duration-200 transition-all"><i className="fa fa-eye"></i> Click to view</p>
                                    <img src={item?.RESTAURANT_IMAGE} className='w-[300px] duration-200 transition-all ease-linear group-hover:scale-[1.1] rounded-xl h-[150px]' />
                                    <div onClick={() => {
                                        const { createdAt, updatedAt, ...rest } = item;
                                        setFormData(rest)
                                    }} className=' absolute flex p-4 justify-center items-center bg-white bg-opacity-40 bottom-[-5rem] left-2 group-hover:bottom-2 rounded-full w-7 h-7 transition-all duration-150 ease-linear'>
                                        <i className='fa fa-pen text-gray-700'></i>
                                    </div>
                                    <div onClick={() => {
                                        setDeleteRecord(item)
                                    }} className=' absolute flex p-4 justify-center items-center bg-white bg-opacity-40 bottom-[-5rem] right-2 group-hover:bottom-2 rounded-full w-7 h-7 transition-all duration-150 ease-linear'>
                                        <i className='fa fa-trash text-red-800 opacity-70'></i>
                                    </div>
                                </div>
                                <div className=' text-center'>
                                    <h2 className=" mt-3 font-medium"><i className='fa fa-hotel whitespace-pre-wrap'></i> {item?.RESTAURANT_NAME}</h2>
                                    <p className="mt-2 italic">{item?.RESTAURANT_DESCRIPTION.length > 30 ? item?.RESTAURANT_DESCRIPTION.slice(0, 30) + "..." : item?.RESTAURANT_DESCRIPTION}</p>
                                    <p className="mt-2 font-medium"><i className='fa fa-phone'></i>+91 {item?.RESTAURANT_NUMBER}</p>
                                    <p className="mt-2 italic text-sm"><i className='fa fa-location-dot whitespace-pre-wrap'></i> {item?.RESTAURANT_ADDRESS}</p>
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
