import { useSelector } from 'react-redux'
import MyCoursesCard from '../../../components/myCoursesCard'
import { Btn } from '../../../components/btn'

export default function WishListTab() {

    const wish = useSelector((state) => state.wishlist.wishItems)

    console.log(wish)

    return (

        <div className='row justify-content-center'>
            {
                wish.length > 0 ?
                    wish.map((course) => <MyCoursesCard key={course.id} course={course} wishlist={wish} />)
                    : <div className='d-flex mt-5 flex-column justify-content-center align-items-center'>
                        <Btn href="/" content="Browse Courses Now!" />
                    </div>
            }

        </div>
    )
}
