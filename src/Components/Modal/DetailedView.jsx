import { useGlobalState } from "../../Hooks/Context"


const DetailedView = () => {

    const { detailedView, setDetailedView } = useGlobalState()

    return (
        <div className={`w-screen h-screen pointer-events-none transition-all duration-500 opacity-0 ${detailedView && `pointer-events-auto opacity-100`} fixed flex justify-center items-center top-0 z-10 bg-black bg-opacity-50`}>
            <div className='w-1/2 h-96 bg-white shadow shadow-gray-500 rounded-xl relative'>
                <div onClick={()=>setDetailedView(null)} className='w-7 h-7 absolute cursor-pointer text-red-700 flex justify-center items-center rounded-full font-semibold bg-opacity-20 top-2 right-2 bg-black'><i className='fa fa-close'></i></div>
                {detailedView}
            </div>
        </div>
    )
}

export default DetailedView
