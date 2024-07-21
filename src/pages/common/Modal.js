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

    const { modalState, closeModal } = useModal();
    const { isOpen, type, props } = modalState;

    if (!isOpen)return null;


    let ModalComponent;
    let customStyle = {};

    switch (type) {
        case 'emailVerification': // 이메일 인증
            ModalComponent = EmailVerificationModal;
            break;
        case 'passwordReset': // 비밀번호 재설정
            ModalComponent = PasswordResetModal;
            break;
        case 'productDetail': // 상품 메인페이지 상품 상세조회
            ModalComponent = ProductDetailModal;
            customStyle = { width: '80%', margin: '140px auto'}; // 원하는 스타일 지정
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

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return ReactDOM.createPortal (
            <div className={styles.modal} onClick={handleClose}>
                <div className={styles.modalContent} style={customStyle} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.close} onClick={closeModal}>
                        <span><FontAwesomeIcon icon={faTimes}/></span>
                    </div>
                    <div className={styles.modalInnerContent}>
                        {ModalComponent && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <ModalComponent {...props}/>
                            </Suspense>
                        )}
                    </div>
                    <div className={styles.modalFooter}>footer</div>
                </div>
            </div>
        ,
        document.getElementById('modal-root')
    );
};

export default Modal;