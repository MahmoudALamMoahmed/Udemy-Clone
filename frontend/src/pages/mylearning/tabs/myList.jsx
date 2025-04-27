import { useDispatch, useSelector } from "react-redux"
import MyCoursesCard from "../../../components/myCoursesCard";
import RemoveList from "../../../redux/actions/removeListAction";
import { Link } from "react-router-dom";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";

export default function MyList() {

    const MyLists = useSelector((state) => state.lists.lists);
    const dispatch = useDispatch();

    const getListsName = (lists) => {
        let arrOfKeys = [];
        for (let list in lists) {
            arrOfKeys.push(list);

            // check if the list is empty remove it
            if (lists[list].length == 0) {
                dispatch(RemoveList(list));
            };
        }
        return arrOfKeys;
    }

    function handleRemoveList(listName) {

        Swal.fire({
            title: "Are you sure you want to remove this list?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(RemoveList(listName));
                Swal.fire({
                    title: "Removed!",
                    text: "Your List has been removed.",
                    icon: "success"
                });
            }
        });
    }



    return (
        <div>
            {
                getListsName(MyLists).length > 0 ?
                    getListsName(MyLists).map((list) =>
                        <div key={list}>
                            <h2 className="mt-4">
                                <span className="me-3" style={{ cursor: "pointer" }} onClick={() => handleRemoveList(list)}>
                                    <MdDeleteSweep />
                                </span>
                                {list}</h2>
                            <hr />
                            <div className="row ">
                                {
                                    MyLists[list].map((course) => <MyCoursesCard key={course.id} course={course} myLists={MyLists} listName={list} />)
                                }
                            </div>
                        </div>
                    )
                    : <div className="mt-5 d-flex flex-column gap-2 align-items-center justify-content-center">
                        <h3 className="fw-bold text-capitalize">Organize and access your courses faster!</h3>
                        <p><Link className="text-udemy fs-5 fw-bold" to="/learning/joined">Go to the Joined Courses tab</Link> to create a list.</p>
                    </div>
            }
        </div>
    )
}
