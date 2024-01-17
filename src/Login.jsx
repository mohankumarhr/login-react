import React, { useEffect, useState } from 'react'
import "./style.css"

function Login() {

    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  

    const [loginDetails, setLoginDetails] = useState({
      adminEmail:"",
      adminPassword:""
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
      try {
        const response = await fetch('https://habitual-home-production.up.railway.app/auth/login-admin', {
          method: 'POST',
          body: JSON.stringify(loginDetails)
        });
  
        // const data = await response.json();
        // localStorage.setItem('authToken', data['jwkToken']);
        // setToken(data.token);
        console.log(response)
      } catch (error) {
        console.error('Authentication failed:', error);
      }
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