import React, {useState} from 'react';
import styles from "./Edit.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {CUSTOMER_URL} from "../../../config/host-config";

const FavStore = ({ favList, set}) => {
    const clickHandler = async (type, value) => {
        const payload = {
            type,
            value
        }
        const res = await fetch(CUSTOMER_URL + `/edit`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            alert("삭제되었습니다");
            console.log('Delete successful');
            set(prev => prev.filter((item) => item.text !== value));
        } else {
            const errorText = await res.text();
            console.error('Delete failed:', errorText);
        }
    }
    return (
        <div className={styles['edit-box']}>
            <div className={styles.title}>
                <h3 className={styles["title-text"]}>
                    <span> 최애가게 </span>
                </h3>
            </div>
            <div className={styles['edit-wrapper']}>
                <ul className={styles.preferred} id="preferred-area">
                    {
                        favList.map(({text, img}, idx) => (
                                <li id={idx} key={idx}>
                                    <div className={styles["img-box"]}>
                                        <img src={img} alt="선호음식이미지"/>
                                    </div>
                                    <span>{text}</span>
                                    <FontAwesomeIcon
                                        className={styles.xmark} icon={faCircleXmark}
                                        onClick={() => clickHandler("favStore", text)}
                                    />
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default FavStore;