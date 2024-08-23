const STORE = '/store';
const CUSTOMER = '/customer';
const STORELISTS = '/storeLists';
const EMAIL = '/email';
const ADMIN = '/admin';
const FAVORITESTORE = '/api/favorites';
const RESERVATION = '/reservation';
const SEARCH = '/search';
const ISSUE = '/issue';
const USER = '/user';
// const COMMUNITYREVIEW = '/communityReview';

const LOCAL_PORT = 8083; // 백엔드 로컬 서버 포트번호
export const BACK_HOST = `${process.env.REACT_APP_HOST_URL}`;

export const STORE_URL = BACK_HOST + STORE;
export const CUSTOMER_URL = BACK_HOST + CUSTOMER;
export const STORELISTS_URL = BACK_HOST +STORELISTS;
export const EMAIL_URL = BACK_HOST +EMAIL;
export const ADMIN_URL = BACK_HOST +ADMIN;
export const FAVORITESTORE_URL = BACK_HOST + FAVORITESTORE;
export const SEARCH_URL = BACK_HOST + SEARCH;
export const RESERVATION_URL = BACK_HOST + RESERVATION;
export const ISSUE_URL = BACK_HOST + ISSUE;
export const USER_URL = BACK_HOST + USER;
// export const COMMUNITYREVIEW_URL = COMMUNITYREVIEW;