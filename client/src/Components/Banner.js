import Slider from 'react-slick'; 
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Banner.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Banner = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [banner, setBanner] = useState({
        bannerid: '',
        bannerurl: ''
    })


    useEffect(() => {
        async function fetchData() {
            const responses = await axios.get("http://localhost:8000/banner", {})
            const rawData = await responses.data.map((it) => ({
                bannerid : it.bannerid,
                bannerurl: it.bannerurl
            }))
            setBanner(rawData);
        }
        fetchData();
    }, [])

    return (
        <div>
            <Slider {...settings} className={styles.slidercontainer}>
            {banner && banner.length > 0 ? 
                banner.map((it) => (
                    <div>
                        <img src={it.bannerurl} className={styles.bannerimg}/>
                    </div>
                )) : ''}
            </Slider>
        </div>
    )
}

export default Banner;