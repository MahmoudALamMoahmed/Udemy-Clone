/* eslint-disable no-case-declarations */
const INIT_STATE = {
    cartItems: []
}

export function CartReducer(state = INIT_STATE, action) {

    switch (action.type) {

        case "ADD_TO_CART":
            const isFound = state.cartItems.find(
                (item) => item.id === action.payload.id
            );
            if (isFound) {
                return state;
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                }
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: [...state.cartItems.filter((item) => item.id !== action.payload)]
            }
        default:
            return state

    }

}