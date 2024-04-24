import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navbar, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const theme = useSelector(state => state.theme.theme);

  const getUser = async () => {
    try {
      const { data } = await axios.get('/api/users/me');
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUser(null);
      navigate('/signin');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm  sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-600 rounded-lg text-white ">
          To-Do
        </span>
        List
      </Link>

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        {user ? (
          <Button gradientDuoTone="purpleToPink" outline onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link onClick={getUser()} to="/signin">
            <Button gradientDuoTone="purpleToPink" outline>
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}
