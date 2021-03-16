import React from 'react';
import "./Home.css";
import Product from './Product';
function Home() {
    return (
        <div className="home">
            
            <div className="home_container">
                <img alt=""
                className="home_image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_jpg"/>
                <div className='home_row'>
                    <Product
                    id='12375698' 
                    title='the lean start up' price = {29.99}
                    image = 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' 
                     rating={5}/>
                    <Product
                    id='13458952' 
                    title='Natrol Kids Sleep+ Calm, Melatonin and L-Theanine, Gummies, (60 Count)' price = {250.99}
                    image = 'https://images-na.ssl-images-amazon.com/images/I/81h5%2Buu3ndL._AC_SX679_.jpg' 
                     rating={4} />
                    
                </div>
                <div className='home_row'>
                    <Product id='16549849' 
                    title='HP 24mh FHD Monitor - Computer Monitor with 23.8-Inch IPS Display (1080p) - Built-In Speakers and VESA Mounting - Height/Tilt Adjustment for Ergonomic Viewing - HDMI and DisplayPort - (1D0J9AA#ABA)' price = {300.99}
                    image = 'https://images-na.ssl-images-amazon.com/images/I/91fAU6mxFsL._AC_SL1500_.jpg' 
                     rating={3}/>
                    <Product id='11654896' 
                    title='kproduct 4' price = {205.99}
                    image = 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' 
                     rating={4}/>
                    <Product id='1125654654' 
                    title='product 5' price = {800.99}
                    image = 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' 
                     rating={4}/>
                    
                    
                </div>
                <div className='home_row'>
                    <Product id='15649856' 
                    title='Dreaming Wapiti Duvet Cover King,100% Washed Microfiber 3pcs Bedding Duvet Cover Set,Solid Color - Soft and Breathable with Zipper Closure & Corner Ties (Light Gray, King)' price = {600.99}
                    image = 'https://images-na.ssl-images-amazon.com/images/I/61JRrtXVAvL._AC_SL1000_.jpg' 
                     rating={4}/>

                </div>
            </div> 
        </div>
    )
}

export default Home
