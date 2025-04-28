import "./App.css";
import NavBar from "./components/navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/home.jsx";
import { CartPage } from "./pages/cart/cart.jsx";
import MylearningPage from "./pages/mylearning/mylearning.jsx";
import JoinedTab from "./pages/mylearning/tabs/joined.jsx";
import WishListTab from "./pages/mylearning/tabs/wishList.jsx";
import MyList from "./pages/mylearning/tabs/myList.jsx";
import RegisterUser from "./pages/register/RegisterUser.jsx";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin.jsx";
import Productlist from "./pages/Admin/Products/Productlist.jsx";
import CreateProduct from "./pages/Admin/Products/CreateProduct.jsx";
import EditProduct from "./pages/Admin/Products/EditProduct.jsx";
import Course from "./pages/courses/course.jsx";
import { useEffect, useState } from "react";
import CouresDetalis from "./pages/details/details.jsx";
import Footer from "./components/footer.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole"); // Remove userRole on logout
  };

  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="courses" element={<Course />} />
        <Route path="/details/:id" element={<CouresDetalis />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="learning" element={<MylearningPage />}>
          <Route path="joined" element={<JoinedTab />} />
          <Route path="wishlist" element={<WishListTab />} />
          <Route path="list" element={<MyList />} />
        </Route>
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route
          path="/Login"
          element={<LoginAdmin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/Admin/Products" element={<Productlist />} />
        <Route path="/Admin/Products/Create" element={<CreateProduct />} />
        <Route path="/Admin/Products/Edit/:id" element={<EditProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
