import { Link, useLocation, useNavigate } from "react-router-dom";

import "./CompleteOrder.css";

const CompleteOrder = () => {
  const location = useLocation(); // useNavigate 훅스를 통해 가져온 데이터를 다루기 위한 기능
  const navigate = useNavigate();

  // 메인 || 샵 이동 핸들러
  const onClickShopNavigateHandler = () => {
    navigate("/shop");
  };

  if (!location.state) {
    // 올바른 접근 방법이 아닐 경우
    return (
      <div>
        <h1>요청한 페이지를 찾을 수 없습니다.</h1>
        <h3>! 올바른 접근이 아니거나 요청 데이터를 찾을 수 없습니다.</h3>
        <h3>
          메인으로 돌아가려면 <Link to={"/"}>이곳</Link>을 클릭해주세요.
        </h3>
      </div>
    );
  } else {
    // 정상적으로 이 경로에 접근한 경우
    const { orderData } = location.state;

    const {
      orderNumber,
      deliveryDestName,
      deliveryDestPhone,
      deliveryDestAddress,
      deliveryDestMessage,
      paymentType,
      payTotalAmount,
      orderProduct,
    } = orderData;

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>
          <b style={{ color: "green" }}>주문이 정상적으로 완료</b>되었습니다.
        </h1>
        <div className="complete_order_container">
          <div className="order_detail_box_1">
            <h2>주문 번호</h2>
            <h2>{orderNumber}</h2>
            <h1>배송지 정보</h1>
            <hr></hr>
            주소 : {deliveryDestAddress}
            <p></p>
            수령인 성명 : {deliveryDestName}
            <p></p>
            수령인 연락처 : {deliveryDestPhone}
            <p></p>
            배송 메시지 : {deliveryDestMessage}
          </div>
          <div className="order_detail_box_2">
            <h1>결제 상세</h1>
            <hr></hr>
            <b>{paymentType}</b>
            {`${payTotalAmount.toLocaleString()} 원`}
            <hr></hr>
            <h1>결제 상품</h1>
            <hr></hr>
            {orderProduct.map((product) => (
              <div key={product.id}>
                <div className="order_complete_itemBox">
                  <div className="order_complete_item">
                    <img src={product.imageURL} width={150} height={150} />
                  </div>
                  <div className="order_complete_item">
                    <p>{product.productName}</p>
                    <p>주문 수량 : {product.count} 개</p>
                    <p>{(product.price * product.count).toLocaleString()} 원</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <center>
          <input
            type="button"
            onClick={onClickShopNavigateHandler}
            value={"쇼핑 홈 가기"}
          />
        </center>
      </div>
    );
  }
};

export default CompleteOrder;
