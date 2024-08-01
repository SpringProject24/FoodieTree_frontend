import React, {useEffect, useRef, useState} from 'react';
import styles from "./ProfileImgBtn.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {STORE_URL} from "../../../config/host-config";
import {imgErrorHandler} from "../../../utils/error";

const ProfileImgBtn = ({value}) => {
    const inputRef = useRef();
    const [img, setImg] = useState( null);

    const openFileHandler = () => {
        inputRef.current.click();
    }

    const onChangeHandler = () => {
        const target = URL.createObjectURL(inputRef.current.files[0]);
        setImg(target);
    }

    const onClickHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('storeImg', inputRef.current.files[0]);
        const response = await fetch(STORE_URL + '/edit/img', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert("가게 이미지가 성공적으로 업데이트 되었습니다.");
        } else {
            const errMsg = await response.text();
            alert(errMsg);
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
                    src={img || value}
                    alt="Customer profile image"
                    onError={imgErrorHandler}
                />
            </a>
            <button onClick={onClickHandler}>이미지 변경</button>
        </div>
    );
};

export default ProfileImgBtn;