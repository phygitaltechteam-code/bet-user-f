import React, {useState, useEffect} from 'react';
import {Outlet} from '@tanstack/react-router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import BottomNav from './BottomNav';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMarginLeft = () => {
    if (isMobile) return 'ml-0';
    return isCollapsed ? 'ml-20' : 'ml-[260px]';
  };

  const getPaddingBottom = () => {
    return isMobile ? 'pb-[72px]' : 'pb-0';
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F5F5F5] selection:bg-orange-500 selection:text-white">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex h-[calc(100vh-7.5rem)] lg:h-[calc(100vh-6rem)]">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onCollapseChange={setIsCollapsed}
          isMobile={isMobile}
          headerHeight={120} // h-24 = 96px
        />

        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${getMarginLeft()} ${getPaddingBottom()}`}
        >
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation - Only visible on mobile */}
      {isMobile && <BottomNav />}
    </div>
  );
}
