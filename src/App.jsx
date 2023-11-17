import { Fragment } from "react"
import Home from "./Components/Home/Home"
import { Toaster } from "react-hot-toast"

const App = () => {
    return (
        <Fragment>
            <Home />
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </Fragment> 
    )
}

export default App