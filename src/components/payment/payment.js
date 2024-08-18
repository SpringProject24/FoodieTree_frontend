import {authFetch} from "../../utils/authUtil";
import * as PortOne from "@portone/browser-sdk/v2";
import {RESERVATION_URL} from "../../config/host-config";

export const createReservationFetch = (storeId, cnt, paymentId) => authFetch(RESERVATION_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({storeId, cnt, paymentId}),
});

export const updateReservationFetch = (paymentId) => authFetch(RESERVATION_URL, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({paymentId}),
});


export const requestPayment = (productDetail, cnt, paymentId) => PortOne.requestPayment({
    storeId: process.env.REACT_APP_PAYMENT_STORE_ID,
    channelKey: process.env.REACT_APP_KAKAOPAY_CHANNEL_KEY,
    paymentId: paymentId,
    orderName: `${productDetail.storeInfo.storeName}의 스페셜팩!`,
    totalAmount: `${productDetail.storeInfo.price * cnt || 3900}`,
    currency: "CURRENCY_KRW",
    payMethod: "EASY_PAY",
    redirectUrl: `http://${window.location.hostname}:3000/main`,
    bypass: {
        kakaopay: {
            custom_message: "지구를 지키는 'FoodieTree'입니다"
        }
    }
});
