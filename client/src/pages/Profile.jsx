import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [error, setError] = useState('');
  console.log(selectedDepartment)
  
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/server/department');
        setDepartments(response.data);
        if (currentUser?.department) {
          setSelectedDepartment(currentUser.department);
        }
      } catch (error) {
        setError('Error fetching departments');
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, [currentUser?.department]);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Profile
        </h2>
        <img
          src={currentUser?.avatar || 'https://via.placeholder.com/256'}
          alt="Profile"
          className="mx-auto mt-5 mb-2 h-12 w-12 rounded-full"
        />
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">Department</label>
            <div className="mt-2">
              <select
                id="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select a department</option>
                {departments.length > 0 ? (
                  departments.map(department => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No departments available</option>
                )}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                defaultValue={currentUser.email}
                readOnly
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                defaultValue={currentUser.username}
                placeholder="e.g., John Smith"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                readOnly
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Update Password</label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
        {error && <p className="text-red-600 mt-3">{error}</p>}
        <div className='text-red-600 cursor-pointer mt-3'>
          <span>Delete Account</span>
        </div>
      </div>
    </div>
  );
}
