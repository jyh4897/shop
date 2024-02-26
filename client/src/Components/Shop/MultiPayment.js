import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const MultiPayment = ({ userCart, submitOrdersheet, paymentData }) => {
  const { paymentType, channelKey, payMethod, paymentName } = paymentData;

  let payResponse;

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.portone.io/v2/browser-sdk.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  // 총 상품 금액을 구하는 메소드
  const totalProductAmount = () => {
    let sumAmount = 0;
    userCart.map((item) => (sumAmount += item.price * item.count));
    return sumAmount;
  };

  const onClickPayment = async () => {
    const thisPaymentType = paymentType;
    const { PortOne } = window;

    if (paymentType == "카카오 페이") {
      payResponse = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-7c9eb5a3-48bb-42c5-8886-6ae0a8a85ec8",
        // 채널 키 설정
        channelKey: channelKey,
        paymentId: `payment-${uuidv4()}`,
        orderName: `${userCart[0].productName} 외 ${userCart.length - 1} 건`,
        // totalAmount: totalProductAmount(),
        totalAmount: 1000,
        currency: "CURRENCY_KRW",
        payMethod: payMethod,
        productType: "PRODUCT_TYPE_REAL",
        easyPay: { easyPayProvider: "KAKAOPAY" },
      });
    } else {
      payResponse = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-7c9eb5a3-48bb-42c5-8886-6ae0a8a85ec8",
        // 채널 키 설정
        channelKey: channelKey,
        paymentId: `payment-${uuidv4()}`,
        orderName: `${userCart[0].productName} 외 ${userCart.length - 1} 건`,
        // totalAmount: totalProductAmount(),
        totalAmount: 1000,
        currency: "CURRENCY_KRW",
        payMethod: payMethod,
        productType: "PRODUCT_TYPE_REAL",
      });
    }

    if (payResponse.code != null) {
      // 오류 발생
      return alert(payResponse.message);
    }

    if (payResponse.transactionType == "PAYMENT") {
      submitOrdersheet(thisPaymentType);
    }
  };

  return (
    <>
      <input type="button" onClick={onClickPayment} value={paymentName} />
    </>
  );
};
export default MultiPayment;