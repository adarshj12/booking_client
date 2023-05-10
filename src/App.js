import './App.css';
import React, { lazy, Suspense} from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/user/Home/Home';
import ClientHome from './pages/client/Home/ClientHome';
import AdminDashboard from './pages/admin/AdminDashboard';
import AuthorizeClient from './middlewares/clientPath/ClientAuth';
import PublicRouteClient from './middlewares/clientPath/ClientPublic';
import AuthorizeAdmin from './middlewares/adminPath/AdminAuth';
import PublicRouteAdmin from './middlewares/adminPath/AdmnPublic';
import AuthorizeUser from './middlewares/userPath/UserAuth';
import PublicRouteUser from './middlewares/userPath/PublicPath';

import LoaderSpinner from './pages/LoaderSpinner';
import HomeSpinner from './pages/HomeSpinner';

import Messenger from './pages/Messenger/Messenger'
import PersistRefresh from './middlewares/userPath/searchPath';

// ****************************************************** USER PAGES  ****************************************************** //

const Register = lazy(() => import('./pages/user/Register'))

const Login = lazy(() => import('./pages/user/Login'))

const Mobile = lazy(() => import('./pages/user/Mobile'))

const ClientLogin = lazy(() => import('./pages/client/ClientLogin'))

const ClientRegister = lazy(() => import('./pages/client/ClientRegister'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))

const List = lazy(() => import('./pages/user/List/List'))

const Hotel = lazy(() => import('./pages/user/Hotel/Hotel'))

const Profile = lazy(() => import('./pages/user/Profile/ProfileHome'))

const Booking = lazy(() => import('./pages/user/Booking/Booking'))

const MyBooking = lazy(() => import('./pages/user/Profile/MyBookings'))

const MyBookingDetail = lazy(() => import('./pages/user/Booking/MyBooking'))

const PaymentSuccess = lazy(() => import('./pages/user/PaymentSuccess'))

const PaymentCancel = lazy(() => import('./pages/user/PaymentCancel'))

const UserChat = lazy(() => import('./pages/user/Profile/Chat'))

// ****************************************************** CLIENT PAGES  ****************************************************** //

const Properties = lazy(() => import('./pages/client/Properties/Properties'))

const BookingsList = lazy(() => import('./pages/client/BookingsList/BookingsList'))

const UserBooking = lazy(() => import('./pages/client/BookingsList/UserBooking'))

const AddProperty = lazy(() => import('./pages/client/Properties/AddProperty'))

const ViewProperty = lazy(() => import('./pages/client/Properties/ViewProperty'))

const UpdateProperty = lazy(() => import('./pages/client/Properties/UpdateHotel'))

const Finance = lazy(() => import('./pages/client/Analytics/Finance'))

const AddRoom = lazy(() => import('./pages/client/Properties/AddRoom'))

const ClientChat = lazy(() => import('./pages/client/Chat/Chat'))

const Cancellation = lazy(()=>import('./pages/client/Cancel/Cancel'))

// ****************************************************** ADMIN PAGES  ****************************************************** //

const AdminViewUsers = lazy(() => import('./pages/admin/Users/Users'))

const AdminViewClients = lazy(() => import('./pages/admin/Clients/Clients'))

const AdminViewProperties = lazy(() => import('./pages/admin/Properties/Properties'))

const ViewUserDetails = lazy(() => import('./pages/admin/Users/UserDetail'))

const AdminViewProperty = lazy(() => import('./pages/admin/Properties/SingleProperty'))

const AdminViewBookings = lazy(() => import('./pages/admin/Bookings/Bookings'))

const Payments = lazy(() => import('./pages/admin/Payments/Payments'))

const PaymentReceipt = lazy(() => import('./pages/admin/Payments/PaymentSuccess'))

const Banner = lazy(()=>import('./pages/admin/Static/Banner'))

const Images = lazy(()=>import('./pages/admin/Static/Cities'))

const ErrorPage = lazy(() => import('./pages/PageNotFound'))

const Error = lazy(()=>import('./pages/ServerError'))

function App() {

  return (
    <Router>
      <Routes>

        <Route path='*' element={
          <PublicRouteUser>

            <ErrorPage />
          </PublicRouteUser>
        } />

        <Route path='/error' element={
          <PublicRouteUser>

            <Error/>
          </PublicRouteUser>
        }/>

        {/* USER */}

        <Route path='/messenger' element={<Messenger/>}/>

        <Route path='/register'
          element={
            <Suspense fallback={<LoaderSpinner />}>

              <Register />
            </Suspense>
          } />
        <Route path='/login'
          element={
            <Suspense fallback={<LoaderSpinner />}>

              <Login />
            </Suspense>
          } />
        <Route path='/mobile'
          element={
            <Suspense fallback={<LoaderSpinner />}>

              <Mobile />
            </Suspense>
          } />
        <Route path='/'
          element={
            <PublicRouteUser>
                <Suspense fallback={<HomeSpinner />}>
               <Home />

                </Suspense>
            </PublicRouteUser>
          } />
        <Route path='/search'
          element={
            <PublicRouteUser>
              {/* <PersistRefresh> */}

            <Suspense fallback={<LoaderSpinner />}>
              <List />
            </Suspense>
              {/* </PersistRefresh> */}
            </PublicRouteUser>
          } />
        <Route path='/hotel/:id'
          element={
            <PublicRouteUser>
              <PersistRefresh>

            <Suspense fallback={<LoaderSpinner />}>
              <Hotel />

            </Suspense>
              </PersistRefresh>
            </PublicRouteUser>
          } />

        <Route path='/profile'
          element={
            <AuthorizeUser>
              <Suspense fallback={<LoaderSpinner />}>

                <Profile />
              </Suspense>
            </AuthorizeUser>

          } />

        <Route path='/booking'
          element={
            <AuthorizeUser>
              <Suspense fallback={<LoaderSpinner />}>

                <Booking />
              </Suspense>
            </AuthorizeUser>

          } />

        <Route path='/paymentsuccess'
          element={
            <AuthorizeUser>
              <Suspense fallback={<LoaderSpinner />}>

                <PaymentSuccess />
              </Suspense>
            </AuthorizeUser>

          } />

        <Route path='/paymentcancel'
          element={
            <AuthorizeUser>
              <Suspense fallback={<LoaderSpinner />}>

                <PaymentCancel />
              </Suspense>
            </AuthorizeUser>

          } />

        <Route path='/profile/bookings'
          element={
            <AuthorizeUser>
              <Suspense fallback={<LoaderSpinner />}>

                <MyBooking />
              </Suspense>
            </AuthorizeUser>

          } />

        <Route path='/profile/booking'
          element={
            <AuthorizeUser>
              <Suspense fallback={<LoaderSpinner />}>

                <MyBookingDetail />
              </Suspense>
            </AuthorizeUser>

          } />

        <Route path='/profile/chat'
          element={
            <AuthorizeUser>
              <Suspense fallback={<LoaderSpinner />}>

                <UserChat />
              </Suspense>
            </AuthorizeUser>

          } />


        {/* CLIENT */}

        <Route path='/client'
          element={
            <AuthorizeClient>
              <ClientHome />
            </AuthorizeClient>

          } />
        <Route path='/clientregister'
          element={
            <PublicRouteClient>
              <Suspense fallback={<LoaderSpinner />}>

                <ClientRegister />
              </Suspense>
            </PublicRouteClient>

          } />
        <Route path='/clientlogin'
          element={
            <PublicRouteClient>
              <Suspense fallback={<LoaderSpinner />}>

                <ClientLogin />
              </Suspense>
            </PublicRouteClient>

          } />

        <Route path='/client/property'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>

                <Properties />
              </Suspense>
            </AuthorizeClient>

          } />

        <Route path='/client/add'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>

                <AddProperty />
              </Suspense>
            </AuthorizeClient>

          } />

        <Route path='/client/addroom'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>

                <AddRoom />
              </Suspense>
            </AuthorizeClient>

          } />

        <Route path='/client/view'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>

                <ViewProperty />
              </Suspense>
            </AuthorizeClient>

          } />

        <Route path='/client/update'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>

                <UpdateProperty />
              </Suspense>
            </AuthorizeClient>

          } />



        <Route path='/client/bookings'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>
                <BookingsList />

              </Suspense>
            </AuthorizeClient>

          } />

        <Route path='/client/userbooking'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>

                <UserBooking />
              </Suspense>
            </AuthorizeClient>

          } />

        <Route path='/client/fianace'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>

                <Finance />
              </Suspense>
            </AuthorizeClient>

          } />
        <Route path='/client/chat'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>

                <ClientChat />
              </Suspense>
            </AuthorizeClient>

          } />        
          <Route path='/client/cancel'
          element={
            <AuthorizeClient>
              <Suspense fallback={<LoaderSpinner />}>

                <Cancellation />
              </Suspense>
            </AuthorizeClient>

          } />    

        {/* ADMIN */}


        <Route path='/admin'
          element={
            <PublicRouteAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <AdminLogin />
              </Suspense>
            </PublicRouteAdmin>

          } />
        <Route path='/admin/adminDashboard'
          element={
            <AuthorizeAdmin>
              <AdminDashboard />
            </AuthorizeAdmin>

          } />

        <Route path='/admin/users'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <AdminViewUsers />
              </Suspense>
            </AuthorizeAdmin>

          } />

        <Route path='/admin/clients'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <AdminViewClients />
              </Suspense>
            </AuthorizeAdmin>

          } />

        <Route path='/admin/properties'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <AdminViewProperties />
              </Suspense>
            </AuthorizeAdmin>

          } />

        <Route path='/admin/propertydetail'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <AdminViewProperty />
              </Suspense>
            </AuthorizeAdmin>

          } />

        <Route path='/admin/userdetail'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <ViewUserDetails />
              </Suspense>
            </AuthorizeAdmin>

          } />


        <Route path='/admin/getBookings'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <AdminViewBookings />
              </Suspense>
            </AuthorizeAdmin>

          } />

        <Route path='/admin/payments'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <Payments />
              </Suspense>
            </AuthorizeAdmin>

          } />
          <Route path='/admin/paymentsuccess'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <PaymentReceipt />
              </Suspense>
            </AuthorizeAdmin>

          } />

          <Route path='/admin/banner'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <Banner />
              </Suspense>
            </AuthorizeAdmin>

          } />

          <Route path='/admin/images'
          element={
            <AuthorizeAdmin>
              <Suspense fallback={<LoaderSpinner />}>

                <Images />
              </Suspense>
            </AuthorizeAdmin>

          } />


      </Routes>
    </Router>

  );
}

export default App;
