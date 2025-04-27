export function addCourseToList(listName, courses) {
    return {
        type: "CREATE_LIST",
        payload: {
            listName,
            courses
        }
    }
}