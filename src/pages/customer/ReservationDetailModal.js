import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './ReservationDetailModal.module.scss';
import modalStyle from '../common/Modal.module.scss';

const ReservationDetailModal = () => {
    return (
        <>
            <div id={styles['reservation-modal']} class={modalStyle.modal}>
                <div class="modal-content">
                    <span class="close"><FontAwesomeIcon icon={faTimes} /></span>
                    <div>
                        <div id="modal-details"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReservationDetailModal;