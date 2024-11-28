import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Layout from '../components/Layout';
import MyTopics from '../pages/MyTopics';
import { useStateContext } from '../context/ContextStore';

/**
 * @description Here we define the routes of our application, and basic layout of the app.
 */
const AppRouter = () => {
  const { token } = useStateContext();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-lightGrey">
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Layout>
                  <Home />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-topics"
            element={
              token ? (
                <Layout>
                  <MyTopics />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
