import React, {useRef, useState} from 'react';
import styles from "./Edit.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import {STORE_URL} from "../../../config/host-config";

const ProductCount = () => {
    const [err, setErr] = useState(false);
    const inputRef = useRef();

    const clickHandler = async () => {
        const res = await fetch(STORE_URL + '/mypage/edit/update/productCnt', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputRef.current.value),
        });
        if (res.ok) {
            alert("상품 기본 수량이 업데이트 되었습니다.");
            setErr(false);
        } else {
            const errMsg = await res.text();
            setErr(true);
        }
    }
    return (
        <>
            <div className={styles["input-wrapper"]}>
                <div className={styles.icon}><FontAwesomeIcon icon={faUser}/></div>
                <div>
                    <span>기본 수량 값</span>
                    <input type={"number"} min={1} ref={inputRef}/>
                    <FontAwesomeIcon onClick={clickHandler} icon={faSquareCheck}/>
                </div>
            </div>
            { err &&
                <b style={{color: "red"}}>입력한 상품 수량을 확인해주세요.</b>
            }
        </>
    );
};

export default ProductCount;