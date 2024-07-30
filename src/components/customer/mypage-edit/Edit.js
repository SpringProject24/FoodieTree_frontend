import React, {useEffect, useState} from 'react';
import styles from './Edit.module.scss'
import ProfileImgBtn from "./ProfileImgBtn";
import PhoneNumber from "./PhoneNumber";
import NickName from "./NickName";
import FavArea from "./FavArea";
import FavFood from "./FavFood";
import FavStore from "./FavStore";
import {CUSTOMER_URL} from "../../../config/host-config";

const Edit = () => {
    const [data, setData] = useState({});
    const [favArea, setFavArea] = useState([]);
    const [favFood, setFavFood] = useState([]);
    const [favStore, setFavStore] = useState([]);

    useEffect( () => {
        (async () => {
            const res = await fetch(CUSTOMER_URL+'/info', {
                headers: {
                    // 'Authorization' : 'Bearer ' +
                }
            });
            const data = await res.json();
            setData(data);
            setFavArea(data.preferredArea);
            setFavFood(data.preferredFood);
            setFavStore(data.favStore);
            console.log(data);
        })();
    }, []);
    return (
        <div className={styles.edit}>
            <div className={styles['edit-box']}>
                <div className={styles.title}>
                    <h3 className={styles["title-text"]}>
                        <span> 내 프로필 </span>
                    </h3>
                </div>
                <div className={styles['edit-wrapper']}>
                    <div className={styles["input-area"]}>
                        <NickName name={data.nickname}/>
                        <PhoneNumber phone={data.customerPhoneNumber}/>
                    </div>
                    <ProfileImgBtn profileImg={data.profileImage}/>
                </div>
            </div>
            <FavArea favList={favArea} set={setFavArea}/>
            <FavFood favList={favFood} set={setFavFood}/>
            <FavStore favList={favStore} set={setFavStore}/>
        </div>
    );
};

export default Edit;