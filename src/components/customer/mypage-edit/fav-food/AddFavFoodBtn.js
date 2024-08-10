import React from 'react';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import style from "./AddFavFoodBtn.module.scss";
import {useModal} from "../../../../pages/common/ModalProvider";

const AddFavFoodBtn = ({ favList, set }) => {

    const { openModal } = useModal();

    const openModalHandler = () => {
        openModal("addFavFood", {favList : ['한식']});
    }

    return (
        <div className={style.box} onClick={openModalHandler}>
            <FontAwesomeIcon className={style["plus-mark"]} icon={faPlus} />
        </div>
    );
};

export default AddFavFoodBtn;