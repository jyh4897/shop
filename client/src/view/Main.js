import React from 'react'
import Banner from '../Components/Banner'
import styles from './Main.module.css'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Main() {

  const [best, setBest] = useState({
    prodid: '',
    name: '',
    price: '',
    thumbnail: '',
    count: ''
})

useEffect(() => {
    async function fetchData() {
      try {
        const responses = await axios.get("http://localhost:8000/ordercount", {});
        const rawData = await responses.data.map((it) => ({
            prodid: it.prodid,
            name: it.title,
            price: it.price.toLocaleString(),
            thumbnail: it.thumbnail,
            count: it.ordered
        }))
        const sortedData = [...rawData].sort((a,b) => Number(b.count) - Number(a.count)).slice(0,9)
        
        setBest(sortedData)
        console.log(best)
      }
      catch (error) {
        console.error("에러!!")
      }
    }
    fetchData()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    arrows: false,
    appendDots: dots => (
        <div
          style={{

          }}
        >
          <ul style={{ margin: "0px", height: "20px" }}> {dots} </ul>
        </div>
      ),
};


  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.bestitems}>
                <div className={styles.besttitle}>
                    <p>BEST</p>
                </div>
                <Slider {...settings} className={styles.bestslidercontainer}>
                    {best && best.length > 0 ? best.map((it) => (
                        <div className={styles.bestcontainer}>
                            <Link to={`/product/${it.prodid}`}>
                                <div className={styles.bestimgcontainer}><img src={it.thumbnail} className={styles.bestimg}/></div>
                                <div className={styles.bestname}>{it.name}</div>
                                <div className={styles.bestprice}>{it.price}원</div>
                            </Link>
                        </div>
                    )) : ''}
                </Slider>
            </div>
    </div>
  )
}

export default Main