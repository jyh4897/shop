import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import styles from './Questionmodal.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Questionmodal = ({products}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('')
    const [userid, setUserid] = useState('')
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedLoggedIn = sessionStorage.getItem("loggedIn");
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (storedLoggedIn) {
        setLoggedIn(true);
        setUserid(userData.userid)
        }
        console.log(products)
    }, [setLoggedIn, userid]);
    
    const handleOpen = ()=> {
        if (loggedIn) {
        setIsOpen(true);}
        else {
            navigate('/login')
        }
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }

    

    async function handleSubmit () {
        const pushData = [products[0].id, userid, content]
        console.log(pushData)
        await axios.post('http://localhost:8000/question', pushData)
        .then((result) => {
            console.log('요청성공')
            console.log(result)
        })
        .catch((error) => {
            console.log('error')
            console.log(error)
        })
        setIsOpen(false);
        window.location.reload();
    }

    return (
        <div>
            <button onClick={handleOpen}>문의하기</button>
            <Modal
                open={isOpen}
                onClose={handleClose}
            >
                <div className={styles.modal}>
                    <div className={styles.closebox}>
                        <button onClick={handleClose} className={styles.closebutton}>x</button>
                    </div>
                    <div>
                        <p>상품명</p>
                        <img src={products[0].thumbnail} className={styles.modalprodimg}/>
                        <span>{products[0].name}</span>
                    </div>
                    <div>
                        <p>문의사항</p>
                        <input type='text' className={styles.textbox} onChange={(e) => handleChangeContent(e)} />
                    </div>
                    <div>
                        <button onClick={handleSubmit}>완료</button>
                        <button onClick={handleClose}>취소하기</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}


export default Questionmodal;