// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Compornents/Main";
import Header from "./Compornents/Header";
import Footer from "./Compornents/Footer";
// 김민호(임시)-----------------
import LoginPage from "./Compornents/Logins/Login";
import Modify from "./Compornents/Logins/Modify";
import Regester from "./Compornents/Logins/Regester";
import RegesterPersonal from "./Compornents/Logins/RegesterPersonal";
import RegesterGroup from "./Compornents/Logins/RegisterGroup";
import RegesterCorporate from "./Compornents/Logins/RegisterCorporate";
// ---------------------------
// 이기현 ------------------
import Cart from "./view/Cart"; // 이기현_장바구니 컴포넌트
import Ordersheet from "./view/Ordersheet"; // 이기현_오더시트 컴포넌트
import CompleteOrder from "./Compornents/Shop/CompleteOrder"; // 이기현_주문완료 컴포넌트
//-------------------------

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
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
