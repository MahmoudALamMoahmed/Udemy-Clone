/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { removeFromCart } from "../../redux/actions/RemoveFromCart";
import { joinCourse } from "../../redux/actions/joinCourseAction";
import { Link } from "react-router-dom";

export default function CartCard({ course }) {

    const dispatch = useDispatch();
    const isLoggedin = localStorage.getItem("isLoggedIn");
    console.log(isLoggedin)


    function handleRemoveCourse(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You will remove this course from the cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeFromCart(id))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your course has been removed from the cart.",
                    icon: "success"
                });
            }
        });
    }

    const handleJoinCourse = (course) => {
        dispatch(joinCourse(course))
        dispatch(removeFromCart(course.id));
        Swal.fire({
            title: "Good job!",
            text: "You Joined The Course!",
            icon: "success",
            timer: 1000
        });
    }

    return (
        <div className="mb-3 border-0 border-top pt-4 rounded-0" >
            <div className="row g-2">
                <div className="col-md-4 m-0 text-center">
                    <Link to={`/details/${course.id}`}>
                        <img src={course.url} className="img-fluid rounded-start" alt="course image" />
                    </Link>
                </div>
                <div className="col-md-8 d-flex justify-content-between gap-4">
                    <div className="card-body p-0">
                        <Link className="text-dark text-decoration-none" to={`/details/${course.id}`}>
                            <h5 className="card-title mb-1">{course.title}</h5>
                        </Link>

                        <p className="card-title text-muted">{course.category}</p>
                    </div>

                    <div className="links text-capitalize d-flex flex-column gap-2">
                        <a onClick={() => handleRemoveCourse(course.id)} className="text-decoration-none text-udemy">remove</a>
                        {
                            isLoggedin == "true" && <a onClick={() => handleJoinCourse(course)} className="text-decoration-none text-udemy">Join course</a>
                        }

                    </div>

                    <div className="prices text-muted d-flex flex-column">
                        <h4 className="text-udemy fw-bold">{course.price}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
