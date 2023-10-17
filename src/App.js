import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage';
import AuthContext from './components/store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate(); // Use the useNavigate hook to handle navigation

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/auth'
          element={
            authCtx.isLoggedIn ? (
              // If logged in, redirect to /profile
              <Outlet />
            ) : (
              // If not logged in, show the AuthPage
              <AuthPage />
            )
          }
        />
        <Route
          path='/profile'
          element={
            authCtx.isLoggedIn ? (
              <UserProfile />
            ) : (
              // If not logged in, use the navigate function to redirect to /auth
              () => {
                navigate('/auth');
              }
            )
          }
        />
        <Route
          path='*'
          element={
            // Use the navigate function to redirect to the homepage for any other route
            () => {
              navigate('/');
            }
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
