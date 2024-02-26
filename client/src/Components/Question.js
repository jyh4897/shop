import { useState, useEffect }  from 'react';
import axios from 'axios';
import styles from './Question.module.css'
import Paging from '../Components/Paging';

const Question = ({ id }) => {

    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState(0);
    const postPerPage = 10;
    const indexOfLastPost = count * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const [question, setQuestion] = useState([{
        questionid: '',
        userid: '',
        prodid: '',
        content: '',
        date: ''
    }])

    useEffect(() => {
        async function readQuestion () {
            const responses = await axios.get("http://localhost:8000/question", {});
            const filteredData = await responses.data.filter((it) => it.prodid == id)
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Asia/Seoul'
            };
            const rawData = await filteredData.map((it) => ({
                questionid : it.qid,
                userid: it.userid,
                prodid: it.prodid,
                content: it.content,
                date : new Intl.DateTimeFormat('en-US', options).format(new Date(it.date)).replace(/(\d+)\/(\d+)\/(\d+),/, '$3/$1/$2')
            }));
            setQuestion(rawData);
            setCount(rawData.length);
        }
        readQuestion();
    }, [])

    useEffect(() => {
        setCurrentPosts(question.slice(indexOfFirstPost, indexOfLastPost));
    }, [question])

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }


    return(
        <div>
            <div>
                {currentPosts && currentPosts.map((it) => (
                    <div key={it.questionid}>
                        <div className={styles.questionitems}>
                            <p>{it.userid}</p>
                            <p>{it.content}</p>
                            <p>{it.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Paging page={currentPage} count={count} handleChangePage={handleChangePage} postPerPage={postPerPage} />
        </div>

    )
}

export default Question;