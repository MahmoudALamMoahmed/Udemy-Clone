/* eslint-disable no-case-declarations */
const INIT_STATE = {
    lists: {}
}


export function CoureListsReducer(state = INIT_STATE, action) {

    switch (action.type) {
        case "CREATE_LIST":
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.payload.listName]: action.payload.courses
                }
            }

        case "REMOVE_COURSE":
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.payload.listName]: [...state.lists[action.payload.listName].filter((course) => course.id !== action.payload.id)]
                }
            }
        case "REMOVE_LIST":
            // taking copy and mutate it
            const updatedLists = Object.assign({}, state.lists)
            delete updatedLists[action.payload]

            return {
                ...state,
                lists: updatedLists // return the copy
            };
        default:
            return state
    }
}