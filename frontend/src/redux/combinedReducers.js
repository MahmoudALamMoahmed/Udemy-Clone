import { combineReducers } from "redux";
import { CartReducer } from "./reducers/cartReducer";
import { joinCourseReducer } from "./reducers/joinCourseReducer";
import { CoureListsReducer } from "./reducers/courseListsReducer";
import { WishlistReducer } from "./reducers/wishListReducer";

export const rootReducer = combineReducers({
    cart: CartReducer,
    wishlist: WishlistReducer,
    joined: joinCourseReducer,
    lists: CoureListsReducer
}) 