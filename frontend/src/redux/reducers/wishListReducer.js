/* eslint-disable no-case-declarations */
const INIT_STATE = {
    wishItems: []
}

export function WishlistReducer(state = INIT_STATE, action) {

    switch (action.type) {

        case "ADD_TO_WISHLIST":
            const isFound = state.wishItems.find(
                (item) => item.id === action.payload.id
            );
            if (isFound) {
                return state;
            } else {
                return {
                    ...state,
                    wishItems: [...state.wishItems, action.payload],
                }
            }
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishItems: [...state.wishItems.filter((item) => item.id !== action.payload)]
            }
        default:
            return state
    }

}