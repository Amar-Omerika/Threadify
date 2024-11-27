import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';

/**
 * @description Here we define the routes of our application, and basic layout of the app.
 * @author Amar Omerika
 */
const AppRouter = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-lightGrey">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
