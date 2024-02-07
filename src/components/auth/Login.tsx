import axios from 'axios';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser, fetchUserBasket } from '../../reducer'; // Import both action creators

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [{ currentUser }, dispatch] = useStateValue();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
     
      dispatch(fetchUserBasket(currentUser.id));
 
  }, [currentUser, dispatch]); // Include dispatch as a dependency

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Await the response from the axios.post request
      const response = await axios.post('http://localhost:5002/login', { username, password });
      console.log(response);

      if (response.data) {
        // navigate('/products');
        const { userId, username } = response.data;

        // Call the setCurrentUser action creator to update the user information in the global state
        dispatch(setCurrentUser({ id: userId, username: username }));

        console.log('Logged in as:', username);
      } else {
        console.error('Invalid response:', response.data);
        setErrorMessage('Error logging in. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-gray-600 mr-100 text-left">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 border rounded-md"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Log in
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          <Link to="/register" className="mt-4 text-sm text-blue-500">
            Don't have an account? Register here.
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
