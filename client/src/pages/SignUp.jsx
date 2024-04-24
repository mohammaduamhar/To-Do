import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const clearError = () => {
    setError(null);
  };

  const signup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });
      navigate('/signin');
    } catch (err) {
      setError(err.response.data.message); 
    }
  };

  const handleInputChange = () => {
    clearError();
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <Link to="/" className="font-bold dark:text-white text-4xl">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-600 rounded-lg text-white">
            To-Do
          </span>
          List
        </Link>
        <p className="text-sm mt-5">
          Welcome to To-Do ♥ List <br />
          Sign Up to start your journey
        </p>

        <div className="flex-1">
          <form className="flex max-w-md flex-col gap-4" onSubmit={signup}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput id="name" type="text" placeholder="John Doe" required onChange={handleInputChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your Email" />
              </div>
              <TextInput id="email" type="email" placeholder="name@example.com" required onChange={handleInputChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your Password" />
              </div>
              <TextInput id="password" type="password" required onChange={handleInputChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirmPassword" value="Confirm Password" />
              </div>
              <TextInput id="confirmPassword" type="password" required onChange={handleInputChange} />
            </div>
            <Button type="submit">Submit</Button>
          </form>
          {error && (
            <Alert className='p-2 m-3' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">{error}</span>
            </Alert>
          )}
          <div className="mt-3">
            <p>Already have an account? <Link to="/signin" className="text-indigo-500">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
