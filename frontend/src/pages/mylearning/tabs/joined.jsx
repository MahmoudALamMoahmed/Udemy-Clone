/* eslint-disable no-prototype-builtins */
/* import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addCourseToList } from "../../../redux/actions/addToListAction";
import MyCoursesCard from "../../../components/myCoursesCard";
import { Btn } from "../../../components/btn";

export default function JoinedTab() {

    const joinedCourses = useSelector((state) => state.joined.mylearning);
    const coursesLists = useSelector((state) => state.lists.lists);

    const dispatch = useDispatch();
    console.log(joinedCourses)
    const [courseToAdd, setCourseToAdd] = useState("");
    const [listName, setListName] = useState("");
    const [listOptions, setListOptions] = useState([]);
    const [showInput, setShowInput] = useState(true); // 🔸 دي اللي هنستخدمها لإخفاء وإظهار الـ input

    useEffect(() => {
        setListOptions(Object.keys(coursesLists)); // Update list options whenever the list changes
    }, [coursesLists]);

    // Loop over the object keys
    Object.keys(coursesLists).forEach((key) => {
        // Loop over each array inside the key
        coursesLists[key].forEach((course) => {
            console.log(`Key: ${key}, ID: ${course.id}`);
        });
    });


    function handleAddToList() {
        if (coursesLists.hasOwnProperty(listName)) {
            dispatch(addCourseToList(listName, [...coursesLists[listName], courseToAdd]));
            console.log(coursesLists)
            return;
        }
        dispatch(addCourseToList(listName, [courseToAdd]));
        console.log(coursesLists)
    }

    function handleCourseToAdd(course) {
        setCourseToAdd(course)
    }
    function handleOptionSelect(e) {
        const selected = e.target.value;
        setListName(selected);
        setShowInput(false); // 🔸 نخفي الـ input لما يختار
    }
    return (
        <div className="row row-gap-4 my-3">
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Create new list</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-3">
    {showInput && (
        <input
            type="text"
            className="w-100 p-2 mb-2"
            onChange={(e) => setListName(e.target.value)}
            placeholder="Name your list e.g HTML skills"
            value={listName}
        />
    )}

<select
    className="form-select"
    value="" // نخلي القيمة دايمًا فاضية علشان onChange يشتغل دايمًا
    onChange={handleOptionSelect}
>
    <option value="">Select existing list</option>
    {listOptions.map((option, index) => (
        <option key={index} value={option}>
            {option}
        </option>
    ))}
</select>
</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
    type="button"
    className="btn btn-primary"
    data-bs-dismiss="modal"
    onClick={() => {
        handleAddToList();
        setShowInput(true); // ✨ نرجّع الـ input يبان تاني بعد الضغط
        setListName("");    // ✨ نفضي الـ input
    }}
>
    Create List
</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                joinedCourses.length > 0 ?
                    joinedCourses.map((course) =>
                        <MyCoursesCard key={course.id} handleCourseToAdd={handleCourseToAdd} course={course} />
                    ) : <Btn href="/" content="Browse Courses Now!" />
            }

        </div >
    )
} */
    // joined.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToList } from "../../../redux/actions/addToListAction";
import MyCoursesCard from "../../../components/myCoursesCard";
import { Btn } from "../../../components/btn";
import Swal from "sweetalert2";

export default function JoinedTab() {
    const joinedCourses = useSelector((state) => state.joined.mylearning);
    const coursesLists = useSelector((state) => state.lists.lists);

    const dispatch = useDispatch();

    const [courseToAdd, setCourseToAdd] = useState("");
    const [listName, setListName] = useState("");
    const [showInput, setShowInput] = useState(true);
    const [listOptions, setListOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        setListOptions(Object.keys(coursesLists));
    }, [coursesLists]);

    function handleAddToList() {
        if (!courseToAdd || (!listName && !selectedOption)) {
            Swal.fire({
                icon: "warning",
                title: "Missing Input",
                text: "You must either enter a new list name or select an existing one.",
            });
            return;
        }

        const targetList = listName;

        if (coursesLists.hasOwnProperty(targetList)) {
            const isCourseExists = coursesLists[targetList].some(
                (course) => course.id === courseToAdd.id
            );

            if (isCourseExists) {
                Swal.fire({
                    icon: "info",
                    title: "Duplicate Course",
                    text: "This course is already in the list!",
                });
                return;
            }

            dispatch(addCourseToList(targetList, [...coursesLists[targetList], courseToAdd]));
        } else {
            dispatch(addCourseToList(targetList, [courseToAdd]));
        }

        setShowInput(true);
        setListName("");
        setSelectedOption("");
    }

    function handleCourseToAdd(course) {
        setCourseToAdd(course);
        setShowInput(true);
        setListName("");
        setSelectedOption("");
    }

    function handleSelectChange(e) {
        const value = e.target.value;
        setSelectedOption(value);
        setListName(value);

        if (value !== "") {
            setShowInput(false);
        } else {
            setShowInput(true);
        }
    }

    return (
        <div className="row row-gap-4 my-3 justify-content-center ">
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Create new list</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-3">
                            {showInput && (
                                <input
                                    type="text"
                                    className="w-100 p-2 mb-2"
                                    onChange={(e) => setListName(e.target.value)}
                                    value={listName}
                                    placeholder="Write a new list to add the item to."
                                />
                            )}
                            <p id="staticBackdropLabel" style={{margin:"10px 2px 10px 5px"}}>Choose from existing lists.</p>
                            <select className="form-select" value={selectedOption} onChange={handleSelectChange}>
                                <option value="">Select existing list</option>
                                {listOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleAddToList} data-bs-dismiss="modal" className="btn btn-primary">Create List</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                joinedCourses.length > 0 ?
                    joinedCourses.map((course) =>
                        <MyCoursesCard key={course.id} handleCourseToAdd={handleCourseToAdd} course={course} />
                    ) : <Btn href="/" content="Browse Courses Now!" />
            }
        </div>
    );
}

    