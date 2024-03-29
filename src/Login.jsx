import React, { useEffect, useState } from 'react'
import "./style.css"
import axios from 'axios';

function Login() {

  const [token, setToken] = useState(localStorage.getItem('authToken') || null);


  const [loginDetails, setLoginDetails] = useState({
    adminEmail: "",
    adminPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login Details', loginDetails);

    axios.post('http://localhost:7002/auth/login-admin', loginDetails)
      .then(response => {
        // Handle the response
        console.log(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  };


  useEffect(() => {

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:7002/admin/current-admin', { headers });
        const userData = await response.json();
        console.log('User data:', userData);
        localStorage.setItem('currentUser', userData);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Only fetch user data if a valid token is present
    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="adminEmail"
            value={loginDetails.adminEmail}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={loginDetails.adminPassword}
            name='adminPassword'
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login