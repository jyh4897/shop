// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./view/Main";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// 김민호(임시)-----------------
import LoginPage from "./Components/Logins/Login";
import Modify from "./Components/Logins/Modify";
import Regester from "./Components/Logins/Regester";
import RegesterPersonal from "./Components/Logins/RegesterPersonal";
import RegesterGroup from "./Components/Logins/RegisterGroup";
import RegesterCorporate from "./Components/Logins/RegisterCorporate";
// ---------------------------
// 이기현 ------------------
import Cart from "./view/Cart"; // 이기현_장바구니 컴포넌트
import Ordersheet from "./view/Ordersheet"; // 이기현_오더시트 컴포넌트
import CompleteOrder from "./Components/Shop/CompleteOrder"; // 이기현_주문완료 컴포넌트
import MyOrderList from "./Components/Shop/MyOrderList"; // 이기현_주문내역 조회 컴포넌트

//-------------------------
import Higherlist from './view/Higherlist';
import Latestlist from "./view/Latestlist";
import Lowerlist from "./view/Lowerlist";
import Product from "./view/Product";
import Productregister from './view/Productregister'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Main Page */}
          <Route exact path="/" element={<Main />} />
          {/* 이기현 */}
          <Route exact path="/cart" element={<Cart />} />
          {/* "/" 로컬 장바구니 페이지 라우팅 */}
          <Route exact path="/ordersheet" element={<Ordersheet />} />
          {/* "/" 주문서 작성 페이지 라우팅 */}
          <Route exact path="/completeOrder" element={<CompleteOrder />} />
          {/* "/" 주문 완료 페이지 라우팅 */}
          <Route exact path="/myOrderList" element={<MyOrderList />} />
          {/* "/" 주문 내역 조회 페이지 라우팅 */}
          {/* 이주호 */}
          {/* 김민호 */}
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/Modify" element={<Modify/>}></Route>
          <Route path="/Regester" element={<Regester />}></Route>
          <Route path="/Regester/personal" element={<RegesterPersonal/>}></Route>
          <Route path="/Regester/corporate" element={<RegesterCorporate/>}></Route>
          <Route path="/Regester/group" element={<RegesterGroup/>}></Route>














          {/* 전윤호 */}
          {/* <Route path="/shop" element={<Shop />} /> */}
          <Route path="/shop/:categoryid/1/:page" element={<Latestlist />} />
          <Route path="/shop/:categoryid/2/:page" element={<Higherlist />} />
          <Route path="/shop/:categoryid/3/:page" element={<Lowerlist />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/register" element={<Productregister />} />









        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
