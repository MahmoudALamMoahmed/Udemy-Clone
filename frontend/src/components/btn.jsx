import { Link } from "react-router-dom";

export function Btn(params) {
    return <Link className={`btn px-5 py-3 btn-udemy ${params.width} text-decoration-none text-white text-capitalize`} to={params.href}>{params.content}</Link>

}