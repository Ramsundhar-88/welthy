import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen pt-4 bg-gray-100">
      {children}
    </div>
  );
};

export default AuthLayout;
