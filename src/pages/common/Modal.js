import React, {lazy, Suspense} from 'react';
import styles from './Modal.module.scss';
import {useModal} from "./ModalProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faTimes} from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";

// 동적 import => 필요한 시점에만 로드 가능 (성능 개선)
const EmailVerificationModal = lazy(() => import("./EmailVerificationModal"));
const PasswordResetModal = lazy(() => import("./PasswordResetModal"));
const ProductDetailModal = lazy(() => import('../product/ProductDetailModal'));
const CustomerReservationDetailModal = lazy(() => import("../customer/CustomerReservationDetailModal"));
const CancelReservationDetailModal = lazy(() => import("../customer/CancelReservationDetailModal"));
const StoreReservationDetailModal = lazy(() => import("../store/StoreReservationDetailModal"));
const AddProductAmountModal = lazy(() => import("../store/AddProductAmountModal"));
const ScheduleDetailModal = lazy(() => import("../store/ScheduleDetailModal"));

const Modal = () => {

    const {modalState, closeModal} = useModal();
    const {type, props} = modalState;

    let ModalComponent;

    switch (type) {
        case 'emailVerification': // 이메일 인증
            ModalComponent = EmailVerificationModal;
            break;
        case 'passwordReset': // 비밀번호 재설정
            ModalComponent = PasswordResetModal;
            break;
        case 'productDetail': // 상품 메인페이지 상품 상세조회
            ModalComponent = ProductDetailModal;
            break;
        case 'customerReservationDetail': // 소비자페에지 예약 상세조회
            ModalComponent = CustomerReservationDetailModal;
            break;
        case 'cancelReservationDetail': // 소비자페이지 예약 취소
            ModalComponent = CancelReservationDetailModal;
            break;
        case 'storeReservationDetail': // 가게페이지 예약 상세조회
            ModalComponent = StoreReservationDetailModal;
            break;
        case 'addProductAmount': // 가게페이지 상품 수량 추가
            ModalComponent = AddProductAmountModal;
            break;
        case 'scheduleDetail': // 가게페이지 스케줄 상세조회 및 수정
            ModalComponent = ScheduleDetailModal;
            break;
        default:
            ModalComponent = null;
    }

    return ReactDOM.createPortal (
        <>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={closeModal}><FontAwesomeIcon icon={faTimes}/></span>
                    <div className={styles.modalInnerContent}>
                        {ModalComponent && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <ModalComponent {...props}/>
                            </Suspense>
                        )}
                    </div>
                </div>
            </div>
        </>
        ,
        document.getElementById('modal-root')
    );
};

export default Modal;