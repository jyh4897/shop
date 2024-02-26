import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './Review.module.css';
import { Rate } from 'antd';
import Paging from '../Components/Paging';





const Review = ({ id }) => {

    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState(0);
    const postPerPage = 5;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const [point, setPoint] = useState(1);
    const [reviews, setReviews] = useState([{
        id: '',
        userid: '',
        oderid: '',
        prodid: '',
        title: '',
        content: '',        
        rate: '',
        date: '',
        img1: '',
        img2: '',
        img3: '',
        img4: ''
    }]);
    const [image, setImage] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function readReview () {
            try {
                const responses = await axios.get('http://localhost:8000/review', {});
                const reviewData = responses.data.filter((it) => it.prodid === id);
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false, // 24-hour time format
                    timeZone: 'Asia/Seoul', // 날짜가 이미 UTC로 표시되어 있으므로 UTC로 설정
                };
                const rawData = reviewData.map((it) => ({
                    id: it.reviewid,
                    userid: it.userid,
                    oderid: it.oderid,
                    prodid: it.prodid,
                    title: it.title,
                    content: it.content,
                    rate: it.rate,
                    date: new Intl.DateTimeFormat('en-US', options).format(new Date(it.date)).replace(/(\d+)\/(\d+)\/(\d+),/, '$3/$1/$2'),
                    img1: it.img1,
                    img2: it.img2,
                    img3: it.img3,
                    img4: it.img4,
                }));
                setReviews(rawData);
                const [{ img1, img2, img3, img4 }] = rawData;
                setImage([img1, img2, img3, img4]);
                setCount(rawData.length);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        }
        readReview();
        
    }, [id])

    
    useEffect (() => {
        const reviewPoint = () => {
            var sum = 0;
            for (var i = 0; i < reviews.length; i++) {
                sum += reviews[i].rate
            }
            setPoint(sum/(reviews.length))
        }
        reviewPoint();
    }, [reviews])

    useEffect(() => {
        setCurrentPosts(getSearchResult().slice(indexOfFirstPost, indexOfLastPost));
    },[search, reviews, currentPage, indexOfFirstPost, indexOfLastPost])
    
    
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }

    const getSearchResult = () => {
        return search === "" ? reviews : reviews.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <div>
            <div>
                <input value={search} onChange={onChangeSearch} className={styles.searchbar} placeholder="검색어를 입력하세요" /> 
            </div>
            <div>
                구매만족도
                <div>
                    <p>{Number(point).toFixed(1)}/5</p>
                </div>
            </div>
            {currentPosts && currentPosts.length > 0 ? currentPosts.map((it) => (
                <div key={it.id} className={styles.reviewitem}>
                    <div className={styles.userinfo}>
                        <p>{it.userid}님</p>
                        <Rate disabled defaultValue={Number(it.rate)} />
                    </div>
                    <div className={styles.reviewcontent} key={it.id}>                        
                        <div className={styles.reviewimgcontainer} key={it.id}>
                            {it.img1 ? 
                                <img src={it.img1} className={styles.reviewimg} alt='이미지' />
                            : ''}
                            {it.img2 ? 
                                <img src={it.img2} className={styles.reviewimg} alt='이미지' />
                            : ''}
                            {it.img3 ? 
                                <img src={it.img3} className={styles.reviewimg} alt='이미지' />
                            : ''}
                            {it.img4 ? 
                                <img src={it.img4} className={styles.reviewimg} alt='이미지' />
                            : ''}
                        </div>
                        <div className={styles.items}>
                            <p className={styles.itemtitle}>{it.title}</p>
                            <p className={styles.itemcontent}>{it.content}</p>
                            <p className={styles.itemdate}>{it.date}</p>
                        </div>
                    </div>
                </div>
            )) : (
                <div>
                    <p>표시할 리뷰가 없습니다</p>
                </div>
            )}
            <Paging page={currentPage} count={count} handleChangePage={handleChangePage} postPerPage={postPerPage} />
        </div>
    )
}

export default Review;