import React from 'react';
import './Banner.css'

const Banner = () => {
    return (
        <div className="row  banner w-100 ">
            {/* <div className="mx-5 mx-auto cover ">
                <h1 className="text-7xl font-bold text-white">Aahar</h1>
                <h3 className="text-4xl font-bold text-white">Food Delivery</h3>
            </div> */}

            <div className="d-flex justify-content-center align-items-center ">
                <div className="w-50">
                    <div className="input-group mb-3 ">
                        <input type="text" className="form-control p-2" placeholder="Resturant" aria-label="Search your favourite" aria-describedby="button-addon2" />
                        <button className="btn font-bolder btn-outline-secondary btn-warning" type="button" id="button-addon2">Search</button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Banner;