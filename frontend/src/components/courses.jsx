import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/AddToCartAction";
import { Fragment, useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import CardMoveComponent from "./coursesCard";
import { Link, useNavigate } from "react-router-dom";
import { addToWishlist } from "../redux/actions/addToWishList";
import Pagination from "@mui/material/Pagination";
import Swal from "sweetalert2";

export default function Courses() {
    // const [products, setProducst] = useState([]);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [catsFilter, setCatsFilter] = useState([]);
    const [catName, setCatName] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchOr, setSearch] = useState(true);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(88888888888);

    useEffect(() => {
        axios
            .get("http://localhost:4000/products")
            .then((res) => {

                console.log(res.data);
                const subcategoryTitles = res.data.map((item) => item.category);
                const uniqueTitles = Array.from(new Set(subcategoryTitles));
                setCatsFilter(uniqueTitles);
                console.log(uniqueTitles);
                const searched = res.data
                    .filter((item) =>
                        item.title
                            .toLocaleLowerCase()
                            .includes(searchValue.toLocaleLowerCase())
                    )
                    .filter((item) => {
                        const amount = Number(item.price);
                        return amount > min && amount < max;
                    });

                const data = res.data
                    .filter((item) => item.category === catName)
                    .filter((item) => {
                        const amount = Number(item.price);

                        return amount > min && amount < max;
                    });

                searchOr ? setFilteredData(searched) : setFilteredData(data);

                console.log(searched, 999999, data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [catName, searchValue, searchOr, min, max]);

    //   useEffect(() => {
    //     axios.get("../dataset_udemy-courses.json").then((res) => {
    //       setProducst(res.data);
    //     });
    //   }, []);

    // functions
    const handlePageChange = (v, p) => {
        setPage(p);
    };

    const handleClick = useCallback((e) => {
        setPage(1);
        setCatName(e);
        setSearch(false);
        // setDown(false);
    }, []);

    const search = useCallback((e) => {
        setSearch(true);
        setPage(1);
        setSearchValue(e.target.value);
    }, []);

    const handleMin = (e) => {
        setPage(1);
        setMin(Number(e.target.value));
    };
    const handleMax = (e) => {
        setPage(1);
        e.target.value.length == 0
            ? setMax(888888888)
            : setMax(Number(e.target.value));
    };

    const paginatedData = useMemo(() => {
        const start = (page - 1) * 10;
        return filteredData.slice(start, start + 10);
    }, [filteredData, page]);

    const [down, setDown] = useState(false);
    // functions


    return (
        <div className="row  text-center mx-auto">
            <h1 className="m-3">Our Courses</h1>
            <div>
                {
                    <div className="input-group m-4 mx-auto">
                        <span className="input-group-text" id="inputGroup-sizing-default">
                            Search
                        </span>
                        <input
                            min="0"
                            type="text"
                            className="form-control"
                            aria-label="Search input"
                            aria-describedby="inputGroup-sizing-default"
                            onKeyUp={search}
                        />
                    </div>
                }
            </div>

            <div>
                {/* ALL  */}

                {/* border border-1 border-danger */}
            </div>

            <div style={{ width: "100vw" }} className="main  my-4 mx-auto row">
                <div className="left-side col-lg-3 col-md-12  ">
                    {
                        <div>
                            <h3
                                className="text-start"
                                style={{
                                    textShadow:
                                        " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
                                }}
                            >
                                Price{" "}
                            </h3>
                            <div className="d-flex">
                                <div
                                    className="input-group mb-3  me-2"
                                    style={{ width: "100px" }}
                                >
                                    <input
                                        style={{ MozAppearance: "none" }}
                                        type="number"
                                        placeholder="Min"
                                        className="form-control "
                                        aria-label="Search input"
                                        aria-describedby="inputGroup-sizing-default"
                                        onKeyUp={handleMin}
                                        min="0"
                                    />
                                </div>
                                <h1 className="d-inline ">:</h1>
                                <div className="input-group mb-3" style={{ width: "100px" }}>
                                    <input
                                        placeholder="Max"
                                        type="number"
                                        className="form-control"
                                        aria-label=" input"
                                        aria-describedby="inputGroup-sizing-default"
                                        onKeyUp={handleMax}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    <div className="row text-start ">
                        <h1 className=" fs-3">
                            Categories{" "}
                            <i
                                style={{ cursor: "pointer" }}
                                className={`fa-solid fa-caret-${down ? "down" : "right"} `}
                                onClick={() => setDown(!down)}
                            ></i>
                        </h1>
                        <button
                            style={{
                                width: "13rem",
                                minHeight: "3rem",
                                // padding: ".8rem 1.6rem",
                                borderBottom: "1px solid #d1d7dc",
                                color: "#2d2f31",
                                textAlign: "start",
                                // fontWeight: "700",
                                lineHeight: "1.2",
                                letterSpacing: "0",
                                // fontSize: "1.6rem",
                                backgroundColor: "white !important",
                            }}
                            type="button"
                            className={`btn d-block  m-2 ${down ? "" : "d-none "}`}
                            onClick={() => (setCatName(""), setSearch(true))}
                        >
                            All
                        </button>
                        {catsFilter.map((item, index) => (
                            <button
                                style={{
                                    width: "13rem",
                                    minHeight: "3rem",
                                    // padding: ".8rem 1.6rem",
                                    borderBottom: "1px solid #d1d7dc",
                                    color: "#2d2f31",
                                    textAlign: "start",
                                    // fontWeight: "700",
                                    lineHeight: "1.2",
                                    letterSpacing: "0",
                                    // fontSize: "1.6rem",
                                    backgroundColor: "white !important",
                                }}
                                key={index}
                                type="button"
                                className={`btn ${down ? "" : "d-none "
                                    }   m-2 col-lg-2 col-md-4  d-inline-block ${catName === item ? "text-info" : ""
                                    }`}
                                onClick={() => handleClick(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <di className="row  mx-auto col-lg-9  ">
                    {filteredData.length > 0 || searchValue.length >= 0 ? (
                        <>
                            {paginatedData.map((courese) => (
                                <div
                                    className="col-lg-3 col-md-4 col-sm-6 col-xsm-12 mt-3"
                                    key={courese.id}
                                >
                                    <CardMoveComponent
                                        course={courese}
                                    />
                                </div>
                            ))}
                            <h1></h1>
                            <Pagination
                                sx={{
                                    // marginInline: "auto",
                                    width: "auto",
                                    margin: "10px auto",
                                    // "& .MuiPaginationItem-root": {
                                    //   color: "white",
                                    //   borderColor: "white",
                                    // },
                                    // "& .MuiPaginationItem-root.Mui-selected": {
                                    //   backgroundColor: "white",
                                    //   color: "blue",
                                    // },
                                    display: "block",
                                }}
                                count={Math.ceil(filteredData.length / 10)}
                                color="standard"
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                            />
                        </>
                    ) : (
                        <>
                            {list.map((courese) => (
                                <div className="col-3 mt-3" key={courese.id}>
                                    <CardMoveComponent
                                        img={courese.image}
                                        title={courese.title}
                                        url={`/details/${courese.id}`}
                                    // movie={courese}
                                    />
                                </div>
                            ))}
                            <h1></h1>
                            <Pagination
                                sx={{
                                    marginInline: "auto",
                                    width: "auto",
                                    "& .MuiPaginationItem-root": {
                                        color: "white",
                                        borderColor: "white",
                                    },
                                    "& .MuiPaginationItem-root.Mui-selected": {
                                        backgroundColor: "white",
                                        color: "blue",
                                    },
                                    display: "block",
                                }}
                                count={10}
                                color="standard"
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                            />
                        </>
                    )}
                </di>
            </div>
        </div>
    );
}

// {
//   <Fragment>
//     <button className="btn btn-primary me-2" onClick={() => handleCart(prod)}>
//       Add to Cart
//     </button>

//     <button
//       className="btn btn-primary me-2"
//       onClick={() => handleWishList(prod)}
//     >
//       Add to WishList
//     </button>
//   </Fragment>;
// }

// {
//     <div>
//     {cartItems.find((item) => item.id == prod.id) ? (
//       <Link to="/cart" className="btn btn-success me-2">
//         Go to Cart
//       </Link>
//     ) : joinedCourses.find((item) => item.id == prod.id) ? (
//       <Link
//         to="/learning"
//         className="btn text-white btn-udemy me-2"
//       >
//         Go to My Learning
//       </Link>
//     ) : (
//       <Fragment>
//         <button
//           className="btn btn-primary me-2"
//           onClick={() => handleCart(prod)}
//         >
//           Add to Cart
//         </button>

//         <button
//           className="btn btn-primary me-2"
//           onClick={() => handleWishList(prod)}
//         >
//           Add to WishList
//         </button>
//       </Fragment>
//     )}
//   </div>
// }
