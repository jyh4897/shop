import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Paging from '../Components/Paging'
import styles from './Latestlist.module.css'

const Latestlist = () => {

    const { categoryid, page } = useParams();
    const [products, setProducts] = useState([{
        id: '',
        name: '',
        price: '',
        thumbnail: '',
        date: ''
    }])

    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState(0);
    const postPerPage = 10;
    const indexOfLastPost = page * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     async function fetchData() {
    //         const rawData = await axios.get("http://localhost:8000/shop", {});
    //         const categoryData = rawData.data.filter((it) => it.category === categoryid)
    //         const prodData = categoryData.map((it) => ({
    //             id : it.prodid,
    //             name: it.title,
    //             price: it.price,
    //             thumbnail: it.thumbnail,
    //             date: it.date
    //         }));
    //         const sortedProd = [...prodData].sort((a,b) => a.date - b.date);
    //         setProducts(sortedProd);
    //         console.log(sortedProd)
            
    //     }
    //     fetchData();
    // }), [categoryid]

    useEffect(() => {
        async function fetchData() {
            try {
                const rawData = await axios.get("http://localhost:8000/shop", {});
                const categoryData = rawData.data.filter((it) => it.category.toString() === categoryid.toString());
                const prodData = categoryData.map((it) => ({
                    id: it.prodid,
                    name: it.title,
                    price: it.price,
                    thumbnail: it.thumbnail,
                    date: it.date
                }));
                const sortedProd = [...prodData].sort((a, b) => Number(b.id) - Number(a.id));
                setProducts(sortedProd);
                setCount(sortedProd.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    
        fetchData();
    }, [categoryid]); 

    useEffect(() => {
        setCurrentPosts(getSearchResult().slice(indexOfFirstPost, indexOfLastPost));
    },[page, search, products])

    const handleChangePage = (page) => {
        const newUrl = `/shop/${categoryid}/1/${page}`;
        navigate(newUrl);
        setCurrentPage(page)
    }

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getSearchResult = () => {
        return search === "" ? products : products.filter((it) => it.name.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <div>
            <div>
                <input value={search} onChange={onChangeSearch} className={styles.searchbar} placeholder="검색어를 입력하세요" /> 
            </div>\
            <div>
                {currentPosts && currentPosts.map((product) => (
                    <div key={product.id} className={styles.proditem}>
                        <ul>
                            <Link to={`/product/${product.id}`} target="_blank">
                                <img src={product.thumbnail} className={styles.itemimg} alt="이미지"/>
                            </Link>
                            <li>{product.name}</li>
                            <li>{product.price}</li>
                        </ul>
                    </div>
                ))}
            </div>
            <Paging page={currentPage} count={count} handleChangePage={handleChangePage} postPerPage={postPerPage} />
        </div>
    )
}

export default Latestlist;