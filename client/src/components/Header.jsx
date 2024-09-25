import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
  });

  return (
    <header className="bg-gray-900 shadow p-4 mb-4 flex items-center justify-between text-gray-100">
      <div className="flex items-center">
        {/* Display user's avatar if available, otherwise show a placeholder */}
        {currentUser?.avatar ? (
          <img 
            src={currentUser.avatar} 
            alt={`${currentUser.username}'s avatar`} 
            className="h-8 w-8 rounded-full mr-4 object-cover" 
          />
        ) : (
          <div className="h-8 w-8 rounded-full mr-4 bg-gray-800" />
        )}

        <h1 className="text-xl font-semibold">
          Hi {currentUser?.username || "User"}, Welcome Back
        </h1>
      </div>

      {/* Real-time Date and Time */}
      <div className="text-right">
        <p>{formattedDate}</p>
        <p className="font-semibold">{formattedTime}</p>
      </div>
    </header>
  );
};

export default Header;
