import ReactDOM from "react-dom";
import styles from "./SubModalPortal.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import React  from "react";

const SubModalPortal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.close}>
                    <span><FontAwesomeIcon className={styles.closeBtn} onClick={onClose} icon={faTimes}/></span>
                </div>
                <div className={styles.modalInnerContent}>
                    { children }
                </div>
            </div>
        </div>
        , document.getElementById('sub-modal-root'));
};

export default SubModalPortal;