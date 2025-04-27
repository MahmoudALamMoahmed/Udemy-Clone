/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  addToCart
} from "../redux/actions/AddToCartAction";
import {
  addToWishlist
} from "../redux/actions/addToWishList";
import {
  removeFromWishlist
} from "../redux/actions/removeFromWishlistAction";

// MUI Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ({ course }) {
  const isLoggedin = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const joinedCourses = useSelector((state) => state.joined.mylearning);
  const wishCourses = useSelector((state) => state.wishlist.wishItems);

  useEffect(() => {
    if (isLoggedin === "false") {
      clearCartAndWishlist();  // Clear cart and wishlist if user is logged out
    }
  }, [isLoggedin]);

  // Clear cart and wishlist from localStorage and redux store
  const clearCartAndWishlist = () => {
    // Clear localStorage
    localStorage.removeItem("cartItems");
    localStorage.removeItem("wishItems");

    // Clear redux store
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "CLEAR_WISHLIST" });

    // No alert when logging out
  };

  const handleCart = (product) => {
    if (isLoggedin !== "true") {
      Swal.fire({
        icon: "warning",
        title: "You need to log in first to add to cart",
        confirmButtonColor: "#6610F2",
      });
      return;
    }

    dispatch(addToCart(product));
    Swal.fire({
      title: "Course Added To The Cart!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#6610F2",
      cancelButtonColor: "#0B5ED7",
      cancelButtonText: "Continue Shopping",
      confirmButtonText: "Go To Cart"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/cart');
      }
    });
  };

  const handleWishList = (product) => {
    if (isLoggedin !== "true") {
      Swal.fire({
        icon: "warning",
        title: "You need to log in first to add to wishlist",
        confirmButtonColor: "#6610F2",
      });
      return;
    }

    if (isInCart) {
      Swal.fire({
        icon: "info",
        title: "This course is already in the cart",
        text: "You can't add it to wishlist",
        confirmButtonColor: "#6610F2",
      });
      return;
    }

    // Add to wishlist and show success alert
    dispatch(addToWishlist(product));
    Swal.fire({
      title: "Course Added to Wishlist!",
      icon: "success",
      confirmButtonColor: "#6610F2",
    });
  };

  const isInCart = cartItems.find((item) => item.id === course.id);
  const isInJoined = joinedCourses.find((item) => item.id === course.id);
  const isInWishlist = wishCourses.find((item) => item.id === course.id);

  return (
    <>
      <Card
        className="product-Card"
        style={{ height: "fit-content" }}
        sx={{
          Width: "370px",
          overflow: "visible",
          height: "300px",
          backgroundColor: "#fff",
          color: "#333",
          position: "relative",
          boxShadow:
            " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
        }}
      >
        <span
          style={{ right: "-10px", top: "-10px", zIndex: "11" }}
          className=" bg-warning text-dark p-1 rounded border border-1 border-secondary fw-bold position-absolute "
        >
          ${course.price}
        </span>

        <Link to={`/details/${course.id}`} className="text-decoration-none">
          <CardMedia sx={{ height: 150 }} image={course.url} title={course.title} />
        </Link>

        <CardContent className="pb-2">
          <Typography gutterBottom variant="h9" component="div">
            {course.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {
              isInCart ? (
                <Link to="/cart" className="btn w-100 btn-success me-2">
                  Go to Cart
                </Link>
              ) : isInJoined ? (
                <Link to="/learning/joined" className="btn w-100 text-white btn-udemy me-2">
                  Go to My Learning
                </Link>
              ) : (
                <Fragment>
                  <button
                    className="btn w-100 btn-primary me-2"
                    onClick={() => {
                      handleCart(course);
                      dispatch(removeFromWishlist(course.id));
                    }}
                  >
                    Add to Cart
                  </button>
                </Fragment>
              )
            }

            <div className="d-flex justify-content-end">
              {
                isInWishlist ? (
                  <button
                    style={{ width: "35px", height: "35px", backgroundColor: "transparent" }}
                    className="d-flex justify-content-center align-items-center rounded-circle ms-auto my-2 border-danger-subtle"
                    onClick={() => dispatch(removeFromWishlist(course.id))}
                  >
                    <FaHeart className="fs-3 text-danger" />
                  </button>
                ) : (
                  <button
                    style={{ width: "35px", height: "35px", backgroundColor: "transparent" }}
                    className="d-flex justify-content-center align-items-center rounded-circle ms-auto my-2"
                    onClick={() => handleWishList(course)}
                  >
                    <FaRegHeart className="fs-3" />
                  </button>
                )
              }
            </div>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
