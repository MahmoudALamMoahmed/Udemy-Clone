const INIT_STATE = {
    mylearning: []
}

export function joinCourseReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case "JOIN_COURSE":
            return {
                ...state,
                mylearning: [...state.mylearning, action.payload]
            }
        case "UNJOIN_COURSE":
            return {
                ...state,
                mylearning: [...state.mylearning.filter((course) => course.id !== action.payload)]
            }
        default:
            return state;
    }
}