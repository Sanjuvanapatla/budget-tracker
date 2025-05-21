import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', formData);
      localStorage.setItem('token', response.data.token); // Save token
      navigate('/'); // Navigate to Home page on success
    } catch (error) {
      setMessage(error.response?.data?.error || 'Signin failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Sign In</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignIn;
