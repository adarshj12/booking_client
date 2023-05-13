export const baseUrl = "https://api.booknstay.site/api/v1";
export const adminBaseUrl = "https://api.booknstay.site/api/v1/admin";


//USER SIDE URLS==>


export const registerUser='/users/register'
export const loginUser='/users/login'
export const otpLogin ='/users/otp'
export const GOOGLE_AUTH ='/users/googleAuth'
export const UPDATE_MOBILE='/users/mobileupdate'
export const GETLIST ='/hotels/getAll'
export const BANNER='/users/banner'
export const CITIES='/users/cities'
export const DESTINATIONS='/hotels/places'
export const COUNT_BY_CITY='/hotels/getbyCity'
export const COUNT_BY_TYPE='/hotels/getbyType'
export const GET_DETAIL_USER ='/users/getuser'
export const BOOK = '/users/booking'
export const STRIPE_BOOK = '/users/stripe_booking'
export const GET_BOOKING = 'hotels/booking'
export const GET_MY_BOOKINGS='/users/bookings'
export const GET_MY_BOOKING='/users/booking'
export const TOP_DESTINATIONS ='/hotels/top'
export const RATE_HOTEL='/hotels/rate'
export const REVIEWS ='/hotels/ratings'
export const HOTEL_RATING='/hotels/hotelRating'

//CLIENT SIDE URLS==>

export const registerClient = '/client/register'
export const loginClient = '/client/login'

export const CLIENT_VERIFICATION_STATUS = '/client/checkStatus'
export const getAllProperties ='/client/getProperties'
export const addHotel = '/client/createHotel'
export const deltehotel ='/client/deleteproperty'
export const ADD_ROOM ='/rooms/addroom'


export const gethotel ='/hotels/getProperty'
export const UPDATE_HOTEL='/client/update'
export const GET_HOTEL_ROOMS='/hotels/rooms'
export const GET_MY_HOTEL_BOOKINGS='/client/getBookings'   
export const GET_ALL_MY_BOOKINGS='/client/getmybookings'
export const GET_USER_BOOKING='/client/getUserBookingDetail'
export const GET_EARNINGS ='/client/earnings'
export const GET_CLIENT_DETAIL='/client/detail'
export const CHANGE_STATUS ='/client/bookingstatus' 
export const CANCELLATIONS ='/client/cancellations'

//ADMIN SIDE URLS==>

export const adminLogin='/login'
export const verifyAdmin = '/verify'
export const getAllUsers ='/getUsers'
export const getAllClients ='/getClients'

export const blockClient ='/blockClient'
export const verifyClient ='/verifyClient'

export const blockUser ='/blockUser'
export const GET_ALL_PROPERTIES='/getProperties'
export const GET_USER ='/getUser'
export const DELETE_USER='/deleteuser'
export const UPDATE_USER='/updateuser'
export const DELETE_CLIENT='/deleteclient'
export const GET_ALL_BOOKINGS='/getAllBookings'
export const SHOW_PAYMENT_STATUS='/payments'
export const PAY_CLIENT='/payclient'
export const DASHBOARD ='/dashboard'
export const ADMIN_GET_BOOKINGS='/getBookings'
export const ADMIN_BANNER='/banner'
export const CHANGE_BANNER='/updatebanner'
export const CITY_IMAGE='/city'
export const ADMIN_CITIES='/cities'

// CHAT

export const START_CONVERSATION ='/chat/startconverse'
export const GET_CONVERSATIONS = '/chat/conversations'
export const NEW_MESSAGE = '/chat/message'
export const GET_MESSAGES='/chat/messages'