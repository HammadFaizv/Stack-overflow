import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home/Home.jsx';
import Auth from './Pages/Auth/Auth.jsx';
import Questions from './Pages/Questions/Questions.jsx';
import AskQuestion from './Pages/AskQuestion/AskQuestion.jsx';
import DisplayQuestion from './Pages/Questions/DisplayQuestion.jsx';
import Tags from './Pages/Tags/Tags.jsx';
import Users from './Pages/Users/Users.jsx'
import UserProfile from './Pages/UserProfile/UserProfile.jsx';
import Subscription from './Pages/SubscriptionTier/Subscription.jsx';
import ChatAI from "./Pages/ChatAI/ChatAi";
import Community from './Pages/Community/Community.jsx';
import CommunityPost from './Pages/CommunityPost/CommunityPost.jsx';

const AllRoutes = () => {
  return (
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/Auth' element={<Auth />} />
        <Route path='/Questions' element={<Questions />} />
        <Route path='/AskQuestion' element={<AskQuestion />} />
        <Route path='/Questions/:id' element={<DisplayQuestion />} />
        <Route path='/Tags' element={<Tags />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/Users/:id' element={<UserProfile />} />
        <Route path='/Subscription' element={<Subscription />} />
        <Route path='/ChatAi' element={<ChatAI />} />
        <Route path='/Community' element={<Community />} />
        <Route path='/Community/:id' element={<CommunityPost />} />
      </Routes>
  )
}

export default AllRoutes;
