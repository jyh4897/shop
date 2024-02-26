import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import aixos from 'axios';
import styles from './Product.module.css';
import Question from "../Components/Question";
import Review from "../Components/Review";
import Questionmodal from "../Components/Questionmodal";


const Product = ()  => {
    const { id } = useParams();
    const [image, setImage] = useState([]);
    const [clickedImage, setClickedImage] = useState('');
    const [selectedImageIndex, setSelectedImageIndex ] = useState(0);
    const [products, setProducts] = useState([{
        id: '',
        name: '',
        description: '',
        price: '',
        thumbnail: '',
        img1: '',
        img2: '',
        img3: '',
        img4: ''
    }])

    useEffect(() => {
        async function resData() {
            const responses = await aixos.get("http://localhost:8000/shop", {});
            const inputData = await responses.data.filter((it) => it.prodid == id);
            const product = await inputData.map((it) => ({
                id: it.prodid,
                name: it.title,
                description: it.description,
                price: it.price,
                thumbnail: it.thumbnail,
                img1: it.img1,
                img2: it.img2,
                img3: it.img3,
                img4: it.img4
            }))
            setProducts(product);
            const [{thumbnail, img1, img2, img3, img4}] = product;
            setImage([thumbnail, img1, img2, img3, img4]);
            setClickedImage(thumbnail);
        }
        resData()
    }, [id])

    useEffect(() => {
        if( products.length > 0) {
            setTotal(parseInt(products[0].price));
        }
        else {
            setTotal(0);
        }
    }, [products])

    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    const handleClickCounter = (num) => {
        setQuantity(quantity + num);
        setTotal(total + parseInt(products[0].price)*num)
    };

    const handleChangeInput = (e) => {
        let newValue = parseInt(e.target.value);
        if (!isNaN(newValue) && newValue >= 1) {
            setQuantity(newValue)
            setTotal(parseInt(products[0].price)*newValue)
        }
    }

    const onClickBasket = (products) => {
        if (localStorage.baskets === undefined) {
            localStorage.setItem('baskets', JSON.stringify([]));
        }

        const baskets = JSON.parse(localStorage.getItem('baskets'));

        let isExist = false;
        baskets.forEach((item) => {
            if(products[0].id === item.id) {
                isExist = true;
            };
        });
        if (isExist) {
            alert("이미 장바구니에 담으셨습니다.");
            return
        }
        const data = {...products[0], 'quantity' : quantity}
        baskets.push(data);
        localStorage.setItem('baskets', JSON.stringify(baskets));
    }

    const handleChangeImage = (index) => {
        setClickedImage(image[index]);
        setSelectedImageIndex(index);
    }


    return (
        <div className={styles.container}>
            <p>{id} 상세페이지</p>
            {products && products.map((it) => (
                <div>
                    <div className={styles.productinfo}>
                        <div className={styles.imagecontainer}>
                            <div className={styles.bigimage}>
                                <img src={clickedImage} className={styles.bigimagedetail} alt='이미지' />
                            </div>
                            <div className={styles.smallimages}>
                                {image.length ?
                                image.map((it, index) =>
                                it && <img src={it} key={index} className={`${styles.detailimage} ${selectedImageIndex === index ? styles.selectedImage : ''}`} onClick={() => handleChangeImage(index)} alt='이미지' />) : ''}
                            </div>
                        </div>
                        <div key={it.id} className={styles.procutcontainer}>
                            <p>{it.name}</p>
                            <p>{it.price}</p>
                            <div className={styles.counter}>
                                <button type="button" onClick={() => handleClickCounter(-1)} disabled={quantity === 1}>-</button>
                                <input
                                type="number"
                                min={1}
                                value={quantity}
                                className={styles.inputnumber}
                                onBlur={handleChangeInput}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                />
                                <button type="button" onClick={() => handleClickCounter(+1)}>+</button>
                            </div>
                            <div className={styles.price}>
                                <strong>{total.toLocaleString()} 원</strong>
                            </div>
                            <div>
                                <button onClick={() => onClickBasket(products)}>장바구니 추가</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.productnav}>
                        <ul className={styles.nav_container}>
                            <li>상품 상세</li>
                            <li>상품평</li>
                            <li>상품 문의</li>
                            <li>배송/교환/반품 안내</li>
                        </ul>
                    </div>
                    <div className={styles.productdetail}>
                        <div dangerouslySetInnerHTML={{ __html : it.description }} />
                    </div>                    
                    <div className={styles.productnav}>
                        <ul className={styles.nav_container}>
                            <li>상품 상세</li>
                            <li>상품평</li>
                            <li>상품 문의</li>
                            <li>배송/교환/반품 안내</li>
                        </ul>
                    </div>
                    <Review id={id} />
                    <div className={styles.productnav}>
                        <ul className={styles.nav_container}>
                            <li>상품 상세</li>
                            <li>상품평</li>
                            <li>상품 문의</li>
                            <li>배송/교환/반품 안내</li>
                        </ul>
                    </div>
                    <Questionmodal products={products} />
                    <Question id={id} />
                    <div className={styles.productnav}>
                        <ul className={styles.nav_container}>
                            <li>상품 상세</li>
                            <li>상품평</li>
                            <li>상품 문의</li>
                            <li>배송/교환/반품 안내</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Product;