import { BrowserRouter as Router} from 'react-router-dom';
import AllRoutes from './AllRoutes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import { fetchAllQuestions, askedQuestions } from './actions/question'
import { fetchAllUsers } from './actions/users';
import { checkSubscription } from './actions/subscription';
import { SidebarProvider } from "./components/LeftSidebar/LeftSidebarContext";
import { ChatAiProvider } from "./components/ChatAI/ChatAiContext";
import { fetchChat } from "./actions/chat";
import { fetchPosts } from './actions/posts';

function App() {

  const dispatch = useDispatch()
  const User = useSelector((state) => (state.currentUserReducer));

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(fetchPosts())
    if(User !== null) {
      dispatch(fetchChat(User?.result._id));
      dispatch(askedQuestions(User?.result._id));
      dispatch(checkSubscription(User?.result._id));
    }
  }, [dispatch, User])
  
  return (
    <div className="App">
      <Router>
        <SidebarProvider>
          <Navbar />
          <ChatAiProvider>
            <AllRoutes />
          </ChatAiProvider>
        </SidebarProvider>
      </Router>
    </div>
  );
}

export default App;
