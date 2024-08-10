import React from 'react';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import style from "./AddFavFoodBtn.module.scss";
import {useModal} from "../../../../pages/common/ModalProvider";

const AddFavFoodBtn = () => {

    useModal()

    return (
        <div className={style.box}>
            <FontAwesomeIcon className={style["plus-mark"]} icon={faPlus} />
        </div>
    );
};

export default AddFavFoodBtn;