import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Checkbox, Label, TextInput, Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const clearError = () => {
    setError(null);
  };

  const signin = async (e) => {
    e.preventDefault();
    const email = e.target.email1.value;
    const password = e.target.password1.value;
    try {
      await axios.post('/api/auth/login', {
        email,
        password,
      });
      navigate('/');
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
          SignIn to start your journey
        </p>

        <div className="flex-1">
          <form className="flex max-w-md flex-col gap-4" onSubmit={signin}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput id="email1" type="email" placeholder="name@flowbite.com" required onChange={handleInputChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" type="password" required onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
             
              <Label htmlFor="remember"></Label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
          {error && (
            <Alert className='p-2 m-3' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">{error}</span>
            </Alert>
          )}
          <div className="mt-3">
            <p>Don't have an account yet?  <Link to="/signup" className="text-indigo-500">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
