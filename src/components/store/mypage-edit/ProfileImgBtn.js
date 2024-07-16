import React, {useEffect, useRef, useState} from 'react';
import styles from "./ProfileImgBtn.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const ProfileImgBtn = () => {
    const inputRef = useRef();
    const [img, setImg] = useState('/assets/img/defaultImage.jpg');

    const openFileHandler = () => {
        inputRef.current.click();
    }

    const onChangeHandler = () => {
        console.log(inputRef.current.files[0]);
        const target = URL.createObjectURL(inputRef.current.files[0]);
        setImg(target);
    }

    const onClickHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(inputRef)
        formData.append('storeImg', inputRef.current.files[0]);
        const response = await fetch('/store/mypage/edit/update/img', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result) {
            alert("가게 이미지가 성공적으로 업데이트 되었습니다.");
            return;
        }
    }

    return (
        <div id="store-mypage-image-edit" className={styles["image-wrapper"]}>
            <input
                ref={inputRef}
                type="file"
                name="profileImage"
                id="profileImage"
                accept="image/*"
                style={{display: "none"}}
                onChange={onChangeHandler}
            />
            <a onClick={openFileHandler} className={styles.avatar}>
                <FontAwesomeIcon className={styles.i} icon={faPenToSquare}/>
                <img
                    src={img}
                    alt="Customer profile image"/>
            </a>
            <button onClick={onClickHandler}>이미지 변경</button>
        </div>
    );
};

export default ProfileImgBtn;