/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux"
import { Link, Outlet, useLocation } from "react-router-dom";

export default function MylearningPage() {
    const joinCourses = useSelector((state) => state.joined.mylearning);
    const location = useLocation();

    // Get the current path
    const currentPath = location.pathname;

    return (
        <Fragment>
            <div className="bg-dark text-white pt-4">
                <div className="container">
                    <h2 className="text-capitalize display-4 fw-bold mb-5">My Learning</h2>
                    <nav className="navbar navbar-expand-lg pb-0" data-bs-theme="dark">
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item">
                                <Link className={`nav-link text-capitalize fw-bold fs-4 link-offset-2 ${currentPath === "/learning/joined" ? "active text-decoration-underline" : ""}`} aria-current="page" to="joined">Joined</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link text-capitalize fw-bold fs-4 link-offset-2 ${currentPath === "/learning/wishlist" ? "active text-decoration-underline" : ""}`} to="wishlist">wishList</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link text-capitalize fw-bold fs-4 link-offset-2 ${currentPath === "/learning/list" ? "active text-decoration-underline" : ""}`} to="list">Lists</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="container mt-4">
                <Outlet />
            </div>


        </Fragment>
    )
}
