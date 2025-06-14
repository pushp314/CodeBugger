import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isPlaygroundOpen = location.pathname.includes('/playground');

  if (isPlaygroundOpen) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-64 fixed left-0 top-0 h-screen border-r border-neutral-200 dark:border-neutral-800">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
      
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-50">
        <Sidebar mobile />
      </div>
    </div>
  );
};

export default Layout;