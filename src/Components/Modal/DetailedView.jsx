import { useGlobalState } from "../../Hooks/Context"


const DetailedView = () => {

    const { detailedView, setDetailedView } = useGlobalState()

    return (
        <div className={`w-screen px-2 md:px-10 h-screen pointer-events-none transition-all duration-500 opacity-0 ${detailedView && `pointer-events-auto opacity-100`} fixed flex justify-center items-center top-0 z-10 bg-black bg-opacity-50`}>
            <div className='w-[30rem] text-center h-auto p-2 bg-white shadow shadow-gray-500 rounded-xl relative'>
                <div onClick={()=>setDetailedView(null)} className='w-7 h-7 absolute cursor-pointer text-red-700 flex justify-center items-center rounded-full font-semibold bg-opacity-80 top-3 right-3 bg-black'><i className='fa fa-close'></i></div>
                <div>
                    <img alt="restaurant image" src={ detailedView?.RESTAURANT_IMAGE } className="rounded-xl w-[30rem] h-[15rem]"/>
                </div>
                <div>
                    <h2 className="text-xl font-medium">{detailedView?.RESTAURANT_NAME}</h2>
                    <p className="mt-3 italic"><i className="fa fa-arrow-right"></i> {detailedView?.RESTAURANT_DESCRIPTION}</p>
                    <p className="mt-3"><i className="fa fa-phone"></i>+91 { detailedView?.RESTAURANT_NUMBER }</p>
                    <p className="mt-3 font-semibold"><i className="fa fa-location-dot"></i> { detailedView?.RESTAURANT_ADDRESS }</p>
                </div>
            </div>
        </div>
    )
}

export default DetailedView
