import React from 'react';
import { Button, Checkbox, Modal, TextInput } from 'flowbite-react';
import TaskList from '../components/TaskList.jsx';
import useAuth from '../auth/useAuth.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
  const { auth } = useAuth();

  return (
    <div className="">
      <div className=" p-8 rounded-lg shadow-lg">
        {auth ? (
          <TaskList/>
        ) : (
          <div className="">
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
            <p className="text-lg mb-4">Please sign in to access your tasks.</p>
            <Link  to="/signin">
            <Button gradientDuoTone="purpleToPink" outline>
              Sign In
            </Button>
          </Link>
          </div>
        )}
      </div>
    </div>
  );
}
