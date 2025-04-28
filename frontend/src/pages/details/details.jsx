import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { htmlToText } from "html-to-text";
import { useDispatch, useSelector } from "react-redux";
import { joinCourse } from "../../redux/actions/joinCourseAction";
import { removeFromCart } from "../../redux/actions/RemoveFromCart";
import Swal from "sweetalert2";
import { addToCart } from "../../redux/actions/AddToCartAction";
import { removeFromWishlist } from "../../redux/actions/removeFromWishlistAction";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function CourseDetails() {
  const [details, setDetails] = useState({});
  const [ins, setIns] = useState({});
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/${params.id}`)
      .then((res) => {
        console.log(res.data); // Fixed console.log
        setDetails(res.data);
        setIns(res.data.visible_instructors?.[0] || {}); // Set instructor data
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const htmlContent = details.description || "";
  const textContent = htmlToText(htmlContent, { wordwrap: false });


  const dispatch = useDispatch();
  const joined = useSelector((state) => state.joined.mylearning);
  const cart = useSelector((state) => state.cart.cartItems);

  const handleJoinCourse = (course) => {
    dispatch(joinCourse(course))
    dispatch(removeFromCart(course.id));
    dispatch(removeFromWishlist(course.id));
    Swal.fire({
      title: "Good job!",
      text: "You Joined The Course!",
      icon: "success",
      timer: 1000
    });
  }

  function handleCart(product) {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
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
        Navigate('/cart');
      }
    });
  }

  return (
    <>
      <div
        className=" "
        style={{
          backgroundColor: "#2d2f31",
          width: "100%",
          height: "90vh",
          color: "white",
          alignContent: "center",
          overflow: "hidden",
        }}
      >
        <div className="container row mx-auto justify-content-between " style={{textAlign:"center"}}>
         {/*  <div className="mt-3 col-lg-6 col-md-12"> */}
            <h1 className="mb-4">{details.title || "Title not available"}</h1>
           {/*  <h6 className="my-3">
              {details.what_you_will_learn_data?.[0] ||
                "Information not available"}
            </h6>
            <span className="my-3 me-1 text-warning fw-bold">
              Rate: {details.rating || "Rating not available"}
            </span>
            <span>({details.num_reviews || "No reviews"} rating)</span>
            <p className="my-3">
              Created by{" "}
              <span className="text-info">
                {ins.display_name || "Instructor not available"}
              </span>
            </p>
            <p>{details.description}</p>
          </div> */}
          <div className=" col-lg-6 mx-auto col-lg-12   " style={{ width: "400px" }}>
            <div >
              <img
                className=" img-fluid"
                src={ details.url}
                //   {details.`${"http://localhost:4000/images/" + movie.url}` || "default-image-url.jpg"}
                alt="Course"
                width= "400px" 
              />
            </div>
            <div className="bg-white text-center pb-3" >
              <h1 className="text-dark p-3">
                $ {details.price || "Price not available"}
              </h1>

              {
                joined.find((course) => course.id == details.id) ? <button
                  className="btn disabled text-dark border border-1 border-dark fw-bold my-2 btn-lg w-75 ms-2 "
                  style={{ backgroundColor: "white", borderRadius: "0" }}

                >
                  Already Joined
                </button> :
                  <Fragment>
                    {

                      cart.find((course) => course.id == details.id) ? <button
                        className="btn text-white fw-bold btn-lg w-75 ms-2 disabled"
                        style={{ backgroundColor: "#a435f0 ", borderRadius: "0" }}
                      >
                        Already added !
                      </button> : <button
                        className="btn text-white fw-bold btn-lg w-75 ms-2 "
                        style={{ backgroundColor: "#a435f0 ", borderRadius: "0" }}
                        onClick={() => handleCart(details)}
                      >
                        Add To Cart
                      </button>
                    }

                    <button
                      className="btn text-dark border border-1 border-dark fw-bold my-2 btn-lg w-75 ms-2 "
                      style={{ backgroundColor: "white", borderRadius: "0" }}
                      onClick={() => handleJoinCourse(details)}
                    >
                      Join Now
                    </button>
                  </Fragment>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
