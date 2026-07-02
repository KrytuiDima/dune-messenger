import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-void">
      {children}
    </div>
  );
};

export default Layout;
