import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
// import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import Pollaction from './components/Poll/Pollaction'
import Pollresult from './components/Poll/Pollresult'
import Login from './pages/login/Login'
import EventSchedule from './pages/Event/EventSchedule'
import Createcommunity from './components/Communities/Createcommunity'
import Signup from './pages/signup/Signup'
import HomePage from './components/Post/Posts'
import Communities from './components/Communities/Communities'
import Message from './components/Message/Message'
import SemesterContent from './components/Semester/SemesterContent'
import Createpost from './components/Post/Createpost'
import Communitydesc from './components/Communities/Communitydesc'
import CommentsSection from './components/Post/Comments'
import PollForm from './components/Poll/Createpoll'
import Polls from './components/Poll/Polls'
import Theme from './components/Theme/Theme'
import Cponc from './components/Communities/Communitiescreatepost'
import Communitiesposts from './components/Communities/Communitiesposts'
function App() {
  return (
    <>
    <BrowserRouter>
      {/* <Header /> */}
          <Theme />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/login' element={<Login/>}/>
            <Route path="/event-schedule" element={<EventSchedule />} />
            <Route path="/messages" element={<Message />} />
            <Route path='/createcommunity' element={<Createcommunity/>}/>
            <Route path="/communities" element={<Communities />} />
            <Route path="/semester" element={<SemesterContent />} />
            <Route path="/createpost" element={<Createpost />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/comments" element={<CommentsSection />} />
            <Route path='/polls' element={<Polls/>}/>
            <Route path="/createpoll" element={<PollForm />} />
            <Route path="/cponc" element={<Cponc communityid={undefined} popup={false} name={undefined} />} />
            <Route path="/vponc" element={<Communitiesposts id={undefined} name={undefined} />} />
            <Route path='/communities/:name/:id' element={<Communitydesc />} />
            <Route path="/poll/action/:id" element={<Pollaction />} />
            <Route path="/poll/result/:id" element={<Pollresult />} />
          </Routes>
    </BrowserRouter></>
  )
}

export default App