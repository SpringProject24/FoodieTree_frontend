// TODO nginx의 static page로 대체 하기

const Main = () => {
    window.location.href = `http://${window.location.hostname}:8083`;
    return null;
};

export default Main;