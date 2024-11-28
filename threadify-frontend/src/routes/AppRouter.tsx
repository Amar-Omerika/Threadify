import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Layout from '../components/Layout';
import MyTopics from '../pages/MyTopics';
/**
 * @description Here we define the routes of our application, and basic layout of the app.
 */
const AppRouter = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-lightGrey">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/my-topics"
            element={
              <Layout>
                <MyTopics />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
