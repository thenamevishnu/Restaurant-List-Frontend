import toast from "react-hot-toast"
import { useGlobalState } from "../../Hooks/Context"
import { addRestaurant, updateRestaurant } from "../../Services/ListManage"


const FormView = () => {

    const {formData, setFormData, setRestaurantList} = useGlobalState()

    const submitForm = async (event) => {
        event.preventDefault()
        try {
            if (formData?.TYPE == "ADD") {
                const { TYPE, ...rest } = formData
                const response = await addRestaurant(rest)
                if (response?.status == "OK") {
                    setFormData(null)
                    setRestaurantList((prev) => [...prev, response.newRecord])
                    toast.success(response.message)
                } else {
                    toast.error(response)
                    return
                }
            } else {
                const response = await updateRestaurant(formData)
                if (response?.message == "Updated") {
                    toast.success(response.message)
                    setFormData(null)
                    setRestaurantList(response.newList)
                } else {
                    toast.error(response)
                    return
                }
            }
        } catch (err) {
            toast.error(err)
            return
        }
    }

    return (
        <form onSubmit={submitForm} className={`w-screen h-screen pointer-events-none transition-all duration-500 opacity-0 ${formData && `pointer-events-auto opacity-100`} fixed flex justify-center items-center top-0 z-10 bg-black bg-opacity-50`}>
            <div className='bg-white shadow shadow-gray-500 flex rounded-xl flex-col justify-center w-1/3 px-2 md:px-10 py-5'>
                <div className='mb-3 text-xl flex justify-center font-medium'>
                    <h2>{formData?.TYPE == "ADD" ? "List a restaurant" : "Update a restaurant"}</h2>
                </div>
                <label className=' block'>
                    <input className='p-2 shadow shadow-gray-700 mb-3 rounded-lg outline-none w-full' type='text' name='RESTAURANT_NAME' value={formData?.RESTAURANT_NAME || ""} onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} placeholder='Restaurant Name'/>
                </label>
                <label className=' block'>
                    <input className='p-2 shadow shadow-gray-700 mb-3 rounded-lg outline-none w-full' type='text' name='RESTAURANT_DESCRIPTION' value={formData?.RESTAURANT_DESCRIPTION || ""} onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} placeholder='Restaurant Description'/>
                </label>
                <label className=' block'>
                    <input className='p-2 shadow shadow-gray-700 mb-3 rounded-lg outline-none w-full' type='text' name='RESTAURANT_NUMBER' value={formData?.RESTAURANT_NUMBER || ""} onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} placeholder='Contact Number'/>
                </label>
                <label className=' block'>
                    <input className='p-2 shadow shadow-gray-700 mb-3 rounded-lg outline-none w-full' type='text' name='RESTAURANT_ADDRESS' value={formData?.RESTAURANT_ADDRESS || ""} onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} placeholder='Location'/>
                </label>
                {
                    formData?.RESTAURANT_IMAGE && <div className="flex justify-center mb-3">
                        <img className="w-40 h-24 rounded-xl" alt="preview" src={ formData.RESTAURANT_IMAGE?.name ? URL.createObjectURL(formData.RESTAURANT_IMAGE) : formData?.RESTAURANT_IMAGE } />
                    </div>
                }
                <label className='p-2 shadow shadow-gray-700 flex justify-center items-center mb-3 rounded-lg outline-none w-full bg-white h-24 cursor-pointer'>
                    <span><i className='fa fa-upload'></i> Upload</span>
                    <input type='file' onChange={(e)=>setFormData({...formData, RESTAURANT_IMAGE: e.target.files[0]})} name='file' className=' hidden'/>
                </label>
                <div className='flex w-full gap-3'>
                    {
                        formData?.TYPE == "ADD" ? <button type="submit" className='bg-violet-700 w-1/2 rounded-xl p-2 text-white'><i className="fa fa-plus"></i> Add</button> : 
                        <button type="submit" className='bg-violet-700 w-1/2 rounded-xl p-2 text-white'><i className="fa fa-pen"></i> Update</button>
                    }
                    <button type="button" className='bg-red-600 w-1/2 rounded-xl p-2 text-white' onClick={()=>setFormData(null)}><i className="fa fa-close"></i> Cancel</button> 
                </div>
            </div>
        </form>
    )
}

export default FormView
