import { Fragment, useState, useEffect, useCallback } from "react";
import Courses from "../../components/courses";
import Carousel from "../../components/carousel/carousel";
import Topics from "../../components/topics";
import { Btn } from "../../components/btn";
import CardCourseComponent from "../../components/coursesCard";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  // Adding error state

  useEffect(() => {
    setLoading(true);
    setError(false); // Reset error state on new fetch
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => {
        const limitedProducts = res.data.slice(0, 8); // استخدم slice بدل تغيير length مباشرة
        setProducts(limitedProducts);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(true); // Set error if there's a problem
      })
      .finally(() => {
        setLoading(false); // Stop loading regardless of success or error
      });
  }, []);

  const user = localStorage.getItem("user");
  const isLoggedin = localStorage.getItem("isLoggedIn");
  const userData = user ? JSON.parse(user) : null;

  return (
    <Fragment>
      {isLoggedin === "true" && userData && (
        <div className="container my-2">
          <h2 className="fw-bold py-3">Welcome Back, {userData.name}</h2>
        </div>
      )}

      <Carousel />

      <div className="bg-white my-4 p-5">
        <div className="container text-center text-muted">
          <h3>
            Trusted by over 15,000 companies and millions of learners around the world
          </h3>
          <div className="d-flex justify-content-between align-items-center gap-5 mt-5 flex-wrap">
            <img
              src="https://cms-images.udemycdn.com/content/tqevknj7om/svg/volkswagen_logo.svg?position=c&amp;quality=80&amp;x.app=portals"
              alt="Volkswagen logo gray and white logo"
              loading="lazy"
            />

            <img
              src="https://cms-images.udemycdn.com/content/2gevcc0kxt/svg/samsung_logo.svg?position=c&amp;quality=80&amp;x.app=portals"
              alt="Samsung logo gray and white logo"
              loading="lazy"
            />

            <img
              src="https://cms-images.udemycdn.com/content/mueb2ve09x/svg/cisco_logo.svg?position=c&amp;quality=80&amp;x.app=portals"
              alt="Cisco logo gray and white logo"
              loading="lazy"
            />

            <img
              src="https://cms-images.udemycdn.com/content/ryaowrcjb2/svg/vimeo_logo_resized-2.svg?position=c&amp;quality=80&amp;x.app=portals"
              alt="Vimeo logo gray and white logo"
              loading="lazy"
            />

            <img
              src="https://cms-images.udemycdn.com/content/bthyo156te/svg/procter_gamble_logo.svg?position=c&amp;quality=80&amp;x.app=portals"
              alt="Procter &amp; Gamble logo gray and white logo"
              loading="lazy"
            />

            <img
              src="https://cms-images.udemycdn.com/content/luqe0d6mx2/svg/hewlett_packard_enterprise_logo.svg?position=c&amp;quality=80&amp;x.app=portals"
              alt="Hewlett Packard logo gray and white logo"
              loading="lazy"
            />

            <img
              src="https://cms-images.udemycdn.com/content/siaewwmkch/svg/citi_logo.svg?position=c&amp;quality=80&amp;x.app=portals"
              alt="Citi logo gray and white logo"
              loading="lazy"
            />

            <img
              src="https://cms-images.udemycdn.com/content/swmv0okrlh/svg/ericsson_logo.svg?position=c&amp;quality=80&amp;x.app=portals"
              alt="Ericsson logo gray and white logo"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="bg-white d-flex justify-content-center align-items-center gap-5 py-5 flex-wrap">
        <img style={{ maxWidth: "300px" }} src="instructor.jpg" alt="Instructor" />
        <div className="col-12 col-md-4 text-center text-md-start p-3">
          <h3 className="fs-1 fw-bold">Become an instructor</h3>
          <p className="fs-4">
            Instructors from around the world teach millions of learners on Udemy.
            We provide the tools and skills to teach what you love.
          </p>
          <Btn content="Start Teaching Today" />
        </div>
      </div>

      <div className="container my-5">
        <h3 className="text-capitalize fw-bold my-2">Our popular topics</h3>
        <Topics />
      </div>

      <div className="container mx-auto row my-2">
        <hr />
        <h3 className="text-capitalize fw-bold my-2">Our popular Courses</h3>

        {loading ? (
          <div className="w-100 text-center my-5">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="w-100 text-center my-5">
            <h4 className="text-danger">Failed to load products. Please try again later.</h4>
          </div>
        ) : (
          products.map((course) => (
            <div className="col-lg-3 mb-4 col-md-4 col-sm-6 col-xsm-12 mt-3" key={course.id}>
              <CardCourseComponent course={course} />
            </div>
          ))
        )}
      </div>
    </Fragment>
  );
}
