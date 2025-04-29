import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import CardMoveComponent from "./coursesCard";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress"; // لودر احترافي من MUI

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Courses() {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [catsFilter, setCatsFilter] = useState([]);
    const [catName, setCatName] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchOr, setSearch] = useState(true);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(88888888888);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [down, setDown] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios
            .get(`${BASE_URL}/products`)
            .then((res) => {
                const subcategoryTitles = res.data.map((item) => item.category);
                const uniqueTitles = Array.from(new Set(subcategoryTitles));
                setCatsFilter(uniqueTitles);

                const filtered = res.data.filter((item) => {
                    const amount = Number(item.price);
                    return amount > min && amount < max;
                });

                const searched = filtered.filter((item) =>
                    item.title.toLowerCase().includes(searchValue.toLowerCase())
                );

                const categoryFiltered = filtered.filter((item) => item.category === catName);

                setFilteredData(searchOr ? searched : categoryFiltered);
                setList(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [catName, searchValue, searchOr, min, max]);

    const handlePageChange = (_, p) => setPage(p);

    const handleClick = useCallback((category) => {
        setPage(1);
        setCatName(category);
        setSearch(false);
    }, []);

    const handleSearch = useCallback((e) => {
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
        setMax(e.target.value ? Number(e.target.value) : 888888888);
    };

    const paginatedData = useMemo(() => {
        const start = (page - 1) * 10;
        return filteredData.slice(start, start + 10);
    }, [filteredData, page]);

    return (
        <div className="row text-center mx-auto">
            <h1 className="m-3">Our Courses</h1>

            <div className="input-group m-4 mx-auto">
                <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                <input
                    type="text"
                    className="form-control"
                    aria-label="Search input"
                    aria-describedby="inputGroup-sizing-default"
                    onKeyUp={handleSearch}
                />
            </div>

            <div className="row w-100 my-4 mx-auto">
                <div className="col-lg-3 col-md-12 text-start">
                    <h3 style={{ textShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" }}>
                        Price
                    </h3>
                    <div className="d-flex mb-3">
                        <input
                            type="number"
                            placeholder="Min"
                            className="form-control me-2"
                            style={{ width: "100px" }}
                            onKeyUp={handleMin}
                            min="0"
                        />
                        <span className="align-self-center">:</span>
                        <input
                            type="number"
                            placeholder="Max"
                            className="form-control ms-2"
                            style={{ width: "100px" }}
                            onKeyUp={handleMax}
                        />
                    </div>

                    <h1 className="fs-3">
                        Categories{" "}
                        <i
                            className={`fa-solid fa-caret-${down ? "down" : "right"}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setDown(!down)}
                        ></i>
                    </h1>

                    <button
                        className={`btn d-block m-2 ${down ? "" : "d-none"}`}
                        style={{
                            width: "13rem",
                            minHeight: "3rem",
                            borderBottom: "1px solid #d1d7dc",
                            backgroundColor: "white",
                            textAlign: "start",
                        }}
                        onClick={() => {
                            setCatName("");
                            setSearch(true);
                        }}
                    >
                        All
                    </button>

                    {catsFilter.map((item, index) => (
                        <button
                            key={index}
                            className={`btn d-block m-2 ${down ? "" : "d-none"} ${catName === item ? "text-info" : ""}`}
                            style={{
                                width: "13rem",
                                minHeight: "3rem",
                                borderBottom: "1px solid #d1d7dc",
                                backgroundColor: "white",
                                textAlign: "start",
                            }}
                            onClick={() => handleClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="col-lg-9 row mx-auto">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                            <CircularProgress />
                        </div>
                    ) : error ? (
                        <div className="text-center w-100">
                            <h3 className="text-danger">No courses found</h3>
                        </div>
                    ) : (
                        <>
                            {filteredData.length > 0 ? (
                                paginatedData.map((course) => (
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3" key={course.id}>
                                        <CardMoveComponent course={course} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center w-100">
                                    <h4>No matching courses</h4>
                                </div>
                            )}
                             <h1> </h1>
                            <Pagination
                                sx={{
                                    width: "auto",
                                    margin: "50px auto",
                                    display: "block",
                                }}
                                count={Math.ceil(filteredData.length / 10)}
                                color="standard"
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
