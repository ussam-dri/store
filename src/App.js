import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Home2 from './components/Home2';
import Login from './components/user/login';
import Register from './components/user/Register';
import Cart from './components/cart';
import ProductPage from './components/ProductPage';
import AddProd from './components/AddProd';
import Example from './components/products/ProdPage';
import  AuthProvider  from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import Error from './components/Layouts/Error';
import Count from './components/Count'
import { ThemeProvider } from "@material-tailwind/react";

import CheckOutPage from './components/products/CheckOutPage';
import Contact from './components/Layouts/contact';
import Profile from './components/user/profile';
import  Dashboard  from './components/Admin/Dashboard';
import AddMember from './components/Admin/addMember';
import EditMember from './components/Admin/editMember';
import AdminProfile from './components/Admin/adminProfile';
import LoginPortail from './components/Seller/login';
import RegisterPortail from './components/Seller/register';
import SellerDashboard from './components/Seller/dashboard';
import ManagerDashboard from './components/Manager/dashboard';
import ManagerProfile from './components/Manager/profile';

import AddSeller from './components/Manager/addMember';
import EditSeller from './components/Manager/editMember';
import ResetPassword from './components/utils/ResetPassword';
import EnterEmail from './components/utils/EnterEmail';
import ProfileSeller from './components/Seller/profile';
import NewsLetter from './components/utils/NewsLetter';
import CatPage from './components/Layouts/CategoryPage';
import './fonts.css'; // Import the custom fonts

function App() {

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
  SameSite:'None',


});

  return (
    <div className="App font-adihausdin">
      <ThemeProvider>

     
      <AuthProvider store={store}>

    <BrowserRouter>
    <Routes>
         {/* Visitor routes */}
         <Route path="/" element={<Home2></Home2>}/>
      <Route path="/home" element={<Home2></Home2>}/>
      <Route path="/product/:id" element={<ProductPage></ProductPage>}/>
      <Route path="/contact" element={<Contact></Contact>}/>
      <Route path="/login" element={<Login></Login>}/>
      <Route path="/register" element={<Register></Register>}/>
      <Route path="/portail" element={<NewsLetter></NewsLetter>}/>
      <Route path="/category/:cat" element={<CatPage></CatPage>}/>


      {/* PORTAIL routes */}
      <Route path="/reward-program/login" element={<LoginPortail></LoginPortail>}/>
      <Route path="/reward-program/register" element={<RegisterPortail></RegisterPortail>}/>


      {/* client routes */}
      <Route path="/checkout" element={<CheckOutPage></CheckOutPage>}/>
      <Route path="/profile" element={<Profile></Profile>}/>
      <Route path="/cart" element={<Cart></Cart>}/>
      <Route path="/resetPassword" element={<EnterEmail/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword/>}/>


   

      {/* Seller routes */}
      <Route path="/seller/dashboard" element={<SellerDashboard/>}/>
      <Route path="/seller/addprod" element={<AddProd></AddProd>}/>
      <Route path="/seller/profile" element={<ProfileSeller/>}/> 

      {/* Manager routes */}
      <Route path="/manager/dashboard" element={<ManagerDashboard></ManagerDashboard>}/>
      <Route path="/manager/addSeller" element={<AddSeller/>}/>
      <Route path="/manager/editSeller/:type/:id" element={<EditSeller/>}/> 
     <Route path="/manager/profile" element={<ManagerProfile/>}/>  


      {/* Admin routes */}
            {/* use something like auth.role==admin */}

      <Route path="/admin/dashboard" element={<Dashboard/>}/>
      <Route path="/admin/addMember" element={<AddMember/>}/>
      <Route path="/admin/editMember/:type/:id" element={<EditMember/>}/>
      <Route path="/admin/profile" element={<AdminProfile/>}/>


      {/* Other routes */}
      <Route path="/*" element={<Error></Error>}/>
      {/* <Route path="/count" element={<Count></Count>}/> */}
  
      
     

    </Routes>
  
    </BrowserRouter>

    </AuthProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
