import React from 'react';
import style from "./AddFavFoodModal.module.scss";

import kFood from "../../../assets/images/userMain/kFood.png";
import cFood from "../../../assets/images/userMain/cFood.png";
import uFood from "../../../assets/images/userMain/uFood.png";
import jFood from "../../../assets/images/userMain/jFood.png";
import dessert from "../../../assets/images/userMain/dessert.png";
import cafe from "../../../assets/images/userMain/cafe.png";
import etc from "../../../assets/images/userMain/salad.png";
import {useModal} from "../../common/ModalProvider";

const categoriesInfo = [
    {name: '한식', image: kFood},
    {name: '중식', image: cFood},
    {name: '양식', image: uFood},
    {name: '일식', image: jFood},
    {name: '디저트', image: dessert},
    {name: '카페', image: cafe},
    {name: '기타', image: etc},
];

const AddFavFoodModal = ({ favList }) => {
    const { closeModal } = useModal();

    const closeHandler = (e) => {
        e.preventDefault();
        closeModal();
    }
    return (
        <div>
            <ul className={style["fav-list"]}>
                {
                    categoriesInfo.map(({ name, image}) =>
                        <li key={name} className={(favList.length > 0 && favList.includes(name)) ? style.border : undefined }>
                            <div className={style["img-box"]}>
                                <img src={image} alt=""/>
                            </div>
                            <span>{name}</span>
                        </li>
                    )
                }
            </ul>
            <button onClick={closeHandler}>추가하기</button>
        </div>
    );
};

export default AddFavFoodModal;