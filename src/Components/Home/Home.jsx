import { Fragment } from 'react'
import Header from '../Header/Header'
import RestaurantList from '../RestaurantList/RestaurantList'
import DetailedView from '../Modal/DetailedView'
import FormView from '../Modal/FormView'

const Home = () => {

    return (
        <Fragment>
            <Header />
            <RestaurantList />
            <DetailedView />
            <FormView/>
        </Fragment>
    )
}

export default Home
