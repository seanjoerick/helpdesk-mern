// src/components/FilterDropdown.js
import React, { useState } from 'react';

const FilterDropdown = ({ selectedRole, onRoleSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleRoleSelect = (role) => {
    onRoleSelect(role);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {selectedRole}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
            {['All', 'Admin', 'User'].map(role => (
              <li key={role}>
                <button
                  onClick={() => handleRoleSelect(role)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {role}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
