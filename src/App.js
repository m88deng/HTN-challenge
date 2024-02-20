import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.js';
import Events from './pages/Events.js';
import Login from './pages/Login.js';
import AccessDenied from './pages/AccessDenied.js';
import EventDetails from './components/EventDetails.js';
import { useQuery, gql } from '@apollo/client';

const GET_EVENT_IDS_QUERY = gql`
  {
    sampleEvents {
      id
    }
  }
`;


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const { data, loading, error } = useQuery(GET_EVENT_IDS_QUERY);
  if (loading) return "Loading";
  if (error) return <pre>{error.message}</pre>
  // console.log(data.sampleEvents)

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route index element={<Events isLoggedIn={isLoggedIn} />} />
        <Route path="/home" element={<Events isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/access-denied" element={<AccessDenied/>}/>
        {data.sampleEvents.map((event) => (
          <Route key={event.id}
            path={`/event${Number(event.id)}`} element={<EventDetails eventId={Number(event.id)} isLoggedIn={isLoggedIn}/>} />
        ))}
        {/* <Route path={`/event${Number(1)}`} element={<EventDetails eventId={Number(1)} />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
