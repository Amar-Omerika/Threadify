import { useEffect, useState } from 'react';
import {
  getUserInfo,
  updateUserInfo,
  changeUserPassword,
  deleteUserAccount,
} from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextStore';
import { UserInfo } from '../interfaces/UserInterface';
import { validateEmail } from '../helpers/validators';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const { removeToken } = useStateContext();
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo();
      setUserInfo(data);
    } catch (error) {
      setError('Failed to fetch user info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUpdateUserInfo = async () => {
    if (!userInfo?.email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(userInfo.email)) {
      setEmailError('Invalid email format');
      return;
    }

    setEmailError(null);

    try {
      await updateUserInfo(userInfo);
      toast.success('User details updated successfully');
    } catch (error) {
      toast.error('Failed to update user details');
    }
  };

  const handleChangePassword = async () => {
    try {
      await changeUserPassword(newPassword);
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      toast.success('Account deleted successfully');
      removeToken();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-md lg:min-w-[350px] mx-auto my-10 bg-white p-4 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">User Settings</h2>
      {userInfo && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={userInfo.firstName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstName: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={userInfo.lastName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastName: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <button
            onClick={handleUpdateUserInfo}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Details
          </button>
        </div>
      )}
      <div className="mt-6">
        <h3 className="text-lg font-medium">Change Password</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium">Delete Account</h3>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
