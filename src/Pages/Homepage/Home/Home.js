import React from 'react';
import FoodBlog from '../../FoodBlog/FoodBlog';
import ProcessOfService from '../../ProcessOfService/ProcessOfService';
import Banner from '../Banner/Banner';
import Fooditems from '../Fooditems/Fooditems';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProcessOfService></ProcessOfService>
            <Fooditems></Fooditems>
            <FoodBlog></FoodBlog>
        </div>
    );
};

export default Home;