import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/users/Login'
import SignUp from './components/users/SignUp'
import EmailVerify from './components/users/EmailVerify'
import Resetpassword from './components/users/ResetPassword'
import LayOut from './pages/LayOut'
import Items from './pages/Items'
import Myitems from './pages/Myitems'
import Inbox from './pages/Inbox'
import Deals from './pages/Deals'
import LostFound from './pages/LostFound'
import Wanted from './pages/Wanted'
import Notification from './pages/Notification'
import Profile from './components/users/Profile'
import AddItem from './pages/AddItem'
import ItemDetails from './components/ItemDetails'
import ReportItem from './components/lostfound/ReportItem'
import ClaimItem from './components/lostfound/ClaimItem'
import ReportPhotos from './components/lostfound/ReportPhotos'
import VerifyItem from './components/lostfound/VerifyItem'
import ContactDetails from './components/lostfound/ContactDetails'
import PostRequest from './components/wanted/PostRequest'
import ReportCard from './components/lostfound/ReportCard'
import ReportCardDetails from './components/lostfound/ReportCardDetails'
import ReqCardDetails from './components/wanted/ReqCardDetails'
import ForgotPassword from './components/users/ForgotPassword'
import ChatWindow from './components/chat/ChatWindow'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<LayOut />}>
          <Route path="/items" element={<Items />} />
          <Route path="/myitems" element={<Myitems />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/lostfound" element={<LostFound />} />
          <Route path="/wanted" element={<Wanted />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/item-details/:id" element={<ItemDetails />} /> 
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/report-item" element={<ReportItem />} />
          <Route path="/claim-item" element={<ClaimItem />} />
          <Route path="/report-photos" element={<ReportPhotos />} />
          <Route path="/verify-item" element={<VerifyItem />} />
          <Route path="/post-request" element={<PostRequest />} />
          <Route path="/contact-info" element={<ContactDetails />} />
          <Route path="/report-card" element={<ReportCard />} />
          <Route path="/reports-card-details/:id" element={<ReportCardDetails />} />
          <Route path="/wanted-details/:id" element={<ReqCardDetails />} />
          <Route path="/chat/:receiverId" element={<ChatWindow />} />
        </Route> 
      </Routes>
    </div>
  )
}

export default App
