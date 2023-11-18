import { Fragment } from 'react'
import Header from '../Header/Header'
import RestaurantList from '../RestaurantList/RestaurantList'
import DetailedView from '../Modal/DetailedView'
import FormView from '../Modal/FormView'
import Alert from '../Modal/Alert'

const Home = () => {

    return (
        <Fragment>
            <Header />
            <RestaurantList />
            <DetailedView />
            <FormView />
            <Alert/>
        </Fragment>
    )
}

export default Home
