import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {Events, Login} from './pages';
import Events from './pages/Events';
import Login from './pages/Login';
// import Login from './pages/Login';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Events />} />
          <Route path="/home" element={<Events />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
    // <Router>
    //   <Switch>
    //     <Route path="/" exact component={Events} />
    //     <Route path="/login" component={Login} />
    //   </Switch>
    // </Router>



  );
};
