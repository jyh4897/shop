import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import styles from './Questionmodal.module.css';
import axios from 'axios';



const QuestionModal = ({ products }) => {
    const { name, prodid } = products
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('')
    const [userid, setUserid] = useState('')
    const handleOpen = ()=> {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }

    // useEffect(() => {
    //     const baskets = JSON.parse(sessionStorage.getItem('userData'));
    //     const data = baskets[0]
    //     setUserid(data)
    //     console.log(data)
    // }, [])

    async function handleSubmit () {
        const pushData = [prodid, userid, content]
        await axios.post('http://localhost:8000/question', pushData)
        .then((result) => {
            console.log('요청성공')
            console.log(result)
        })
        .catch((error) => {
            console.log('error')
            console.log(error)
        })
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
                        <p>{name}</p>
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

export default QuestionModal;