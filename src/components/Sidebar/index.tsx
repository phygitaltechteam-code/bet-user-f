import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {
  MdHome,
  MdPlayArrow,
  MdHowToVote,
  MdEmojiEvents,
  MdSportsCricket,
  MdCasino,
  MdSupportAgent,
  MdHelp,
  MdExpandMore,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import {FaFutbol, FaHorseHead, FaDog} from 'react-icons/fa';
import {GiCricketBat, GiTennisRacket} from 'react-icons/gi';
import {useNavigate, useLocation} from '@tanstack/react-router';

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
  headerHeight?: number;
}

interface MenuItem {
  label: string;
  id: string;
  icon?: React.ReactNode;
  isLive?: boolean;
  path?: string;
  subroutes?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  id: string;
  icon?: React.ReactNode;
  path?: string;
  subroutes?: SubMenuItem[];
}

const Sidebar = ({
  onCollapseChange,
  isMobile: isMobileProp,
  sidebarOpen,
  setSidebarOpen,
  headerHeight = 96,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(
    new Set(['Sports']),
  );
  const [activeItemId, setActiveItemId] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const mobile = width < 1024;
      setIsMobile(mobile);
      if (width < 1024 && !isCollapsed) {
        setIsCollapsed(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isCollapsed]);

  useEffect(() => {
    if (onCollapseChange) onCollapseChange(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const toggleSubmenu = (label: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isCollapsed && !isMobile) return;
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) newSet.delete(label);
      else newSet.add(label);
      return newSet;
    });
  };

  const handleNavigation = (path: string, id: string) => {
    setActiveItemId(id);
    if (isMobile && setSidebarOpen) {
      setSidebarOpen(false);
    }
    if (path) navigate({to: path});
  };

  const menuItems: MenuItem[] = [
    {
      label: 'Home',
      id: 'home',
      icon: <MdHome size={22} className="text-orange-500" />,
      path: '/',
    },
    {
      label: 'In-Play',
      id: 'in-play',
      isLive: true,
      icon: <MdPlayArrow size={22} className="text-red-500" />,
      path: '/play/play',
    },
    {
      label: 'Sports',
      id: 'sports',
      path: '/sports',
      icon: <MdSportsCricket size={22} className="text-green-600" />,
      subroutes: [
        {
          label: 'Cricket',
          id: 'cricket',
          icon: <GiCricketBat size={18} className="text-red-600" />,
          path: '/cricket/indian',
        },
        {
          label: 'Soccer',
          id: 'soccer',
          icon: <FaFutbol size={18} className="text-black" />,
          path: '/soccer',
        },
        {
          label: 'Tennis',
          id: 'tennis',
          icon: <GiTennisRacket size={18} className="text-lime-600" />,
          path: '/tennis',
        },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const hasSubroutes = item.subroutes && item.subroutes.length > 0;
    const isExpanded = expandedMenus.has(item.label);
    const isActive = activeItemId === item.id || item.path === currentPath;
    const isActuallyCollapsed = isCollapsed && !isMobile;
    const isHovered = hoveredItem === item.id;

    return (
      <motion.li
        key={item.id}
        initial={{opacity: 0, x: -20}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.3}}
        className="w-full px-2"
      >
        <motion.div
          whileHover={{x: isMobile ? 0 : 4}}
          whileTap={{scale: 0.98}}
          onHoverStart={() => setHoveredItem(item.id)}
          onHoverEnd={() => setHoveredItem(null)}
          onClick={() => {
            if (hasSubroutes) {
              toggleSubmenu(item.label);
            } else if (item.path) {
              handleNavigation(item.path, item.id);
            }
          }}
          className={`group relative flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-3 transition-all duration-200 ${
            isActive
              ? 'border-r-4 border-orange-600 bg-gradient-to-r from-orange-500/10 to-orange-500/5 text-orange-600'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {isHovered && !isActive && (
            <motion.div
              initial={{opacity: 0, scale: 0.8}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.8}}
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/5 to-transparent"
            />
          )}

          <div className="relative z-10 flex items-center gap-3">
            <motion.span
              className="relative inline-flex h-6 w-6 items-center justify-center"
              animate={{
                scale: isActive ? [1, 1.1, 1] : 1,
                rotate: isHovered ? [0, -5, 5, 0] : 0,
              }}
              transition={{duration: 0.3}}
            >
              {item.icon}
              {item.isLive && (
                <span className="absolute -right-1 -top-1 flex h-2 w-2">
                  <motion.span
                    animate={{scale: [1, 1.2, 1]}}
                    transition={{duration: 1, repeat: Infinity}}
                    className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
              )}
            </motion.span>
            {(!isActuallyCollapsed || isMobile) && (
              <motion.span
                className="text-sm font-bold tracking-tight"
                animate={{
                  color: isActive
                    ? '#ea580c'
                    : isHovered
                      ? '#f97316'
                      : '#374151',
                }}
              >
                {item.label}
              </motion.span>
            )}
          </div>

          {hasSubroutes && (!isActuallyCollapsed || isMobile) && (
            <motion.div
              animate={{rotate: isExpanded ? 180 : 0}}
              transition={{duration: 0.3}}
            >
              <MdExpandMore className="text-gray-400 text-lg" />
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {hasSubroutes && isExpanded && (!isActuallyCollapsed || isMobile) && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: 'auto', opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.2}}
              className="overflow-hidden"
            >
              <motion.ul
                className="mt-1 space-y-0.5 pl-4"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.1}}
              >
                {item.subroutes?.map((sub, idx) => {
                  const isSubActive =
                    activeItemId === sub.id || currentPath === sub.path;
                  return (
                    <motion.li
                      key={sub.id}
                      initial={{opacity: 0, x: -10}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: idx * 0.05}}
                    >
                      <motion.div
                        whileHover={{x: 4}}
                        whileTap={{scale: 0.98}}
                        onClick={() =>
                          sub.path && handleNavigation(sub.path, sub.id)
                        }
                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                          isSubActive
                            ? 'bg-orange-50/80 text-orange-600'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <motion.span
                          className="flex-shrink-0"
                          animate={{
                            scale: isSubActive ? [1, 1.1, 1] : 1,
                          }}
                          transition={{duration: 0.3}}
                        >
                          {sub.icon}
                        </motion.span>
                        <span className="flex-1 whitespace-nowrap">
                          {sub.label}
                        </span>

                        {isSubActive && (
                          <motion.div
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"
                          />
                        )}
                      </motion.div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
    );
  };

  return (
    <>
      {/* Mobile overlay - with blur effect when sidebar is open */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen && setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Different styles for mobile vs desktop */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile ? (sidebarOpen ? 0 : -320) : 0,
          width: isMobile ? 280 : isCollapsed ? 80 : 260,
        }}
        transition={{duration: 0.3, ease: 'easeInOut'}}
        className={`fixed left-0 flex flex-col overflow-y-auto bg-white shadow-2xl ${
          isMobile
            ? 'z-50 w-[280px]'
            : isCollapsed
              ? 'z-10 w-20'
              : 'z-10 w-[260px]'
        }`}
        style={{
          // Mobile: full screen from top, Desktop: below header
          top: isMobile ? 0 : `${headerHeight}px`,
          height: isMobile ? '100vh' : `calc(100vh - ${headerHeight}px)`,
        }}
      >
        {/* Header Gradient Line */}
        <motion.div
          initial={{scaleX: 0}}
          animate={{scaleX: 1}}
          transition={{duration: 0.5}}
          className="h-1 w-full origin-left bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"
        />

        {/* Close button for mobile */}
        {isMobile && sidebarOpen && (
          <div className="flex justify-end p-3">
            <motion.button
              whileTap={{scale: 0.9}}
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>
        )}

        {/* Menu Items - Directly after gradient line */}
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5, delay: 0.1}}
          className="scrollbar-hide flex-1 overflow-y-auto py-3"
        >
          <ul className="space-y-1">{menuItems.map(renderMenuItem)}</ul>
        </motion.div>

        {/* Footer Section - User Info */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.4, delay: 0.2}}
          className="border-gray-200 mt-auto flex-shrink-0 border-t p-3"
        >
          <motion.div
            whileHover={{x: 4}}
            whileTap={{scale: 0.98}}
            className="hover:bg-gray-100 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all"
          >
            <motion.div
              whileHover={{scale: 1.1}}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-sm font-bold text-white shadow-md"
            >
              GU
            </motion.div>
            {(!isCollapsed || isMobile) && (
              <div className="flex min-w-0 flex-col">
                <span className="text-gray-700 truncate text-sm font-semibold">
                  Guest User
                </span>
                <span className="text-gray-400 text-xs">Login to bet</span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Collapse toggle (Desktop only) */}
        {!isMobile && (
          <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="border-gray-300 absolute -right-3 z-20 rounded-full border bg-white p-1.5 shadow-md transition-all duration-200 hover:border-orange-300 hover:shadow-lg"
            style={{top: '20px'}}
          >
            <motion.div
              animate={{rotate: isCollapsed ? 0 : 180}}
              transition={{duration: 0.3}}
            >
              {isCollapsed ? (
                <MdChevronRight className="text-gray-600 text-sm" />
              ) : (
                <MdChevronLeft className="text-gray-600 text-sm" />
              )}
            </motion.div>
          </motion.button>
        )}
      </motion.aside>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
