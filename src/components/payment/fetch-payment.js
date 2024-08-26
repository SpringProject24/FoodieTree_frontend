import {authFetch} from "../../utils/authUtil";
import * as PortOne from "@portone/browser-sdk/v2";
import {RESERVATION_URL} from "../../config/host-config";

export const createReservationFetch = (storeId, cnt, paymentId, storeName) => authFetch(RESERVATION_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({storeId, cnt, paymentId, storeName}),
});

export const patchReservationFetch = (paymentId, reservationId) => authFetch(RESERVATION_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({cnt:1, paymentId, reservationId}),
})

export const updateReservationFetch = (paymentId) => authFetch(RESERVATION_URL, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({paymentId}),
});


export const requestPayment = async (storeName, price, paymentId, redirect) => {
    try {
        const data = await PortOne.requestPayment({
            storeId: process.env.REACT_APP_PAYMENT_STORE_ID,
            channelKey: process.env.REACT_APP_KAKAOPAY_CHANNEL_KEY,
            paymentId: paymentId,
            orderName: `${storeName}의 스페셜팩!`,
            totalAmount: `${price}`,
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",
            redirectUrl: redirect,
            bypass: {
                kakaopay: {
                    custom_message: "지구를 지키는 'FoodieTree'입니다"
                }
            }
        });
        document.body.style.overflow = 'hidden';
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const redirectPaymentRequest = async (paymentId, keyword) => {
    const updateRes = await updateReservationFetch(paymentId);
    const data = await updateRes.text();
    if (updateRes.ok) {
        alert("결제가 완료되었습니다!");
        let url = window.location.origin + window.location.pathname;
        if (keyword)
            url += `?q=` + keyword;
        window.location.href = url;
    } else {
        alert("잠시 후 다시 이용해주세요");
        console.log(data)
    }
}
