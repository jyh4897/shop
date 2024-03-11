import { useState, useEffect }  from 'react';
import axios from 'axios';
import styles from './Question.module.css'
import Paging from '../Components/Paging';
import Answerview from './Answerview';

const Question = ({ id }) => {

    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState(0);
    const postPerPage = 10;
    const indexOfLastPost = currentPage * postPerPage;
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
            setQuestion(rawData.sort((a,b) => b.questionid -a.questionid));
            setCount(rawData.length);
        }
        readQuestion();
    }, [])

    useEffect(() => {
        setCurrentPosts(question.slice(indexOfFirstPost, indexOfLastPost));
    }, [question, indexOfFirstPost, indexOfLastPost])

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }


    return(
        <div className={styles.container}>           
            <div>
                {currentPosts && currentPosts.length > 0 ? currentPosts && currentPosts.map((it) => (
                    <div key={it.questionid}>
                        <div key={it.questionid} className={styles.questionitems}>
                            <div className={styles.contentbox}>
                                <p className={styles.questionmark}>질문</p>
                                <p dangerouslySetInnerHTML={{ __html : it.content }} />
                            </div>
                            <p className={styles.questiondate}>{it.date}</p>
                        </div>
                        <Answerview questionid={it.questionid} />
                    </div>                
                )) : 
                <div>
                    표시할 문의가 없습니다
                </div>
                }
            </div>
            {currentPosts && currentPosts.length > 0 ? 
            <Paging page={currentPage} count={count} handleChangePage={handleChangePage} postPerPage={postPerPage} /> 
            : ''}
        </div>
    )
}

export default Question;