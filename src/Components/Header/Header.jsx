
const Header = () => {
    return (
        <div className='w-screen h-20 fixed z-10 bg-white top-0 items-center shadow shadow-gray-400 flex justify-between px-2 md:px-10'>
            <div>
                <img alt='logo' src='./logo.png' className='w-28'/>
            </div>
            <div>
                <button className='p-2 px-4 bg-orange-500 text-white md:rounded-full rounded-xl text-lg font-medium'>
                    <span className='hidden md:block'><i className='fa fa-phone'></i> Contact Us</span>
                    <span className='md:hidden'><i className='fa fa-phone'></i></span>
                </button>
            </div>
        </div>
    )
}

export default Header
