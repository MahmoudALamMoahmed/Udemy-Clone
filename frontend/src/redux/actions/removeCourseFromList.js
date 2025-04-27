
export default function RemoveCourseFromList(listName, id) {
    return {
        type: "REMOVE_COURSE",
        payload: {
            listName,
            id
        }
    }
}
