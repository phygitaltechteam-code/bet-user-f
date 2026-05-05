import React, {useState, useEffect} from 'react';
import {
  Zap,
  Trophy,
  Vote,
  Activity,
  Plane,
  Bird,
  Dices,
  Coins,
  Gamepad2,
  Search,
  Menu,
  X,
  Eye,
  EyeOff,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Megaphone,
  Sparkles,
  Flame,
  TrendingUp,
  Crown,
  Target,
} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate, useLocation} from '@tanstack/react-router';
import {GiCricketBat, GiTennisRacket} from 'react-icons/gi';
import {FaFutbol} from 'react-icons/fa';
import Marquee from 'react-fast-marquee';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isLive?: boolean;
  color?: string;
  path?: string;
  onClick?: () => void;
}

const NavItem = (props: NavItemProps) => {
  const {icon, label, isLive, color = 'bg-gray-800', onClick} = props;
  const [isHovered, setIsHovered] = useState(false);

  const particles = [
    {x: -10, y: -10, delay: 0},
    {x: 10, y: -10, delay: 0.1},
    {x: -5, y: -15, delay: 0.2},
    {x: 5, y: -15, delay: 0.3},
    {x: 0, y: -18, delay: 0.15},
  ];

  return (
    <motion.div
      whileHover={{y: -5}}
      whileTap={{scale: 0.95}}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex min-w-[70px] cursor-pointer flex-col items-center justify-center"
    >
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{duration: 0.3}}
        className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-r from-orange-500/30 to-red-500/30 blur-xl"
      />

      <AnimatePresence>
        {isHovered &&
          particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0, y: 0, x: particle.x}}
              animate={{
                opacity: [0, 1, 0],
                y: [0, particle.y],
                x: [particle.x, particle.x + (i % 2 === 0 ? 5 : -5)],
              }}
              exit={{opacity: 0}}
              transition={{
                duration: 0.8,
                delay: particle.delay,
                repeat: Infinity,
              }}
              className="absolute h-1 w-1 rounded-full bg-orange-400"
              style={{left: '50%', top: '50%'}}
            />
          ))}
      </AnimatePresence>

      <div className="relative">
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.3, 1] : 1,
            opacity: isHovered ? [0.5, 0, 0.5] : 0,
          }}
          transition={{duration: 1, repeat: isHovered ? Infinity : 0}}
          className="absolute inset-0 rounded-full border-2 border-orange-500"
        />

        <div
          className={`relative h-11 w-11 sm:h-12 sm:w-12 ${color} mb-1.5 flex items-center justify-center overflow-hidden rounded-full shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-500/50 group-hover:ring-2 group-hover:ring-orange-500`}
        >
          <motion.div
            animate={{
              background: isHovered
                ? [
                    'linear-gradient(135deg, #ff6b35, #ff4757)',
                    'linear-gradient(135deg, #ff4757, #ff6b35)',
                    'linear-gradient(135deg, #ff6b35, #ff4757)',
                  ]
                : 'linear-gradient(135deg, #1e293b, #0f172a)',
            }}
            transition={{duration: 0.5, repeat: isHovered ? Infinity : 0}}
            className="absolute inset-0"
          />

          {isHovered && (
            <motion.div
              animate={{rotate: 360}}
              transition={{duration: 2, repeat: Infinity, ease: 'linear'}}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles size={30} className="text-white/20" />
            </motion.div>
          )}

          {isLive && (
            <motion.div
              initial={{opacity: 0, scale: 0}}
              animate={{opacity: 1, scale: 1}}
              transition={{type: 'spring'}}
              className="absolute -right-1 -top-1 z-10 rounded-bl-md border-b border-l border-white/20 bg-gradient-to-r from-red-600 to-red-500 px-1 text-[6px] font-bold shadow-lg sm:text-[8px]"
            >
              <motion.span
                animate={{opacity: [1, 0.5, 1]}}
                transition={{duration: 1, repeat: Infinity}}
                className="mr-1 inline-block h-1 w-1 rounded-full bg-white"
              />
              LIVE
            </motion.div>
          )}

          <motion.div
            className="relative z-10 text-white"
            animate={{
              scale: isHovered ? 1.3 : 1,
              rotate: isHovered ? [0, -8, 8, -8, 0] : 0,
            }}
            transition={{duration: 0.4}}
          >
            {icon}
          </motion.div>

          <motion.div
            animate={{opacity: isHovered ? 0.5 : 0}}
            className="absolute inset-0 rounded-full bg-white/20 blur-md"
          />
        </div>
      </div>

      <div className="relative">
        <motion.span
          className="whitespace-nowrap text-center text-[10px] font-bold uppercase leading-tight tracking-tight transition-all duration-300 sm:text-[11px]"
          animate={{
            color: isHovered ? '#ff8c42' : '#ffffff',
            letterSpacing: isHovered ? '0.5px' : '0px',
          }}
        >
          {label}
        </motion.span>

        <motion.div
          initial={{width: 0, opacity: 0}}
          animate={{width: isHovered ? '100%' : 0, opacity: isHovered ? 1 : 0}}
          transition={{duration: 0.3}}
          className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
        />
      </div>

      <motion.div
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.3, 0, 0.3] : 0,
        }}
        transition={{duration: 1.5, repeat: isHovered ? Infinity : 0}}
        className="absolute inset-0 -z-20 rounded-full bg-orange-500/20"
      />
    </motion.div>
  );
};

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

const SocialIcon: React.FC<{icon: React.ReactNode}> = ({icon}) => (
  <motion.button
    whileHover={{scale: 1.15, y: -3}}
    whileTap={{scale: 0.95}}
    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 transition-all duration-300 hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 sm:h-10 sm:w-10"
  >
    <motion.div whileHover={{rotate: 360}} transition={{duration: 0.5}}>
      {icon}
    </motion.div>
  </motion.button>
);

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({isOpen, onClose}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('ak91');
  const [password, setPassword] = useState('password');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{opacity: 0, scale: 0.8, y: 50}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.8, y: 50}}
              transition={{type: 'spring', damping: 20, stiffness: 300}}
              className="to-gray-50 relative w-full max-w-[90%] overflow-hidden rounded-2xl border-2 border-[#ff4d00] bg-gradient-to-br from-white shadow-2xl sm:max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{duration: 3, repeat: Infinity, repeatDelay: 2}}
                className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#ff4d00] via-[#ff8c42] to-[#ff4d00]"
              />

              <motion.div
                animate={{scale: [1, 1.1, 1], rotate: [0, 90, 0]}}
                transition={{duration: 10, repeat: Infinity}}
                className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl"
              />
              <motion.div
                animate={{scale: [1, 1.2, 1], rotate: [0, -90, 0]}}
                transition={{duration: 12, repeat: Infinity}}
                className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-red-500/10 blur-3xl"
              />

              <motion.button
                whileHover={{scale: 1.1, rotate: 90}}
                whileTap={{scale: 0.9}}
                onClick={onClose}
                className="text-gray-500 hover:bg-gray-100 absolute right-3 top-3 z-20 rounded-full p-2 transition-all duration-200 hover:text-black sm:right-4 sm:top-4"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>

              <div className="pb-3 pt-6 text-center sm:pt-8">
                <motion.div
                  initial={{scale: 0}}
                  animate={{scale: 1}}
                  transition={{type: 'spring', delay: 0.1}}
                  className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg"
                >
                  <Crown className="h-8 w-8 text-white" />
                </motion.div>
                <motion.h1
                  initial={{y: -20, opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{delay: 0.2}}
                  className="bg-gradient-to-r from-[#ff4d00] to-[#ff8c42] bg-clip-text text-xl font-bold text-transparent sm:text-2xl"
                >
                  Welcome Back
                </motion.h1>
                <motion.p
                  initial={{y: -10, opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{delay: 0.3}}
                  className="text-gray-500 mt-1 text-xs"
                >
                  Login to your account
                </motion.p>
              </div>

              <div className="space-y-4 p-4 sm:space-y-5 sm:p-6 md:p-8">
                <div className="space-y-1">
                  <label className="text-gray-500 ml-1 text-xs font-medium">
                    User ID
                  </label>
                  <motion.input
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: '0 0 0 2px rgba(255,77,0,0.2)',
                    }}
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-[#eef2ff] px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4d00]"
                    placeholder="Enter User ID"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500 ml-1 text-xs font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: '0 0 0 2px rgba(255,77,0,0.2)',
                      }}
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-[#eef2ff] px-3 py-2.5 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4d00]"
                      placeholder="Enter Password"
                    />
                    <motion.button
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.9}}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 transition-colors hover:text-black"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.input
                    whileTap={{scale: 0.9}}
                    type="checkbox"
                    id="remember"
                    className="h-3 w-3 cursor-pointer rounded border-2 border-slate-800 accent-[#ff4d00] transition-all checked:bg-[#ff4d00] sm:h-4 sm:w-4"
                  />
                  <label
                    htmlFor="remember"
                    className="cursor-pointer text-xs font-medium text-slate-800"
                  >
                    Remember me
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow: '0 0 25px rgba(255,77,0,0.5)',
                    }}
                    whileTap={{scale: 0.97}}
                    onClick={() => {
                      console.log('Login clicked', {userId, password});
                      onClose();
                    }}
                    className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ff4d00] to-[#ff6b35] py-2.5 text-sm font-bold text-white shadow-lg transition-all"
                  >
                    <motion.div
                      animate={{x: ['-100%', '100%']}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="absolute inset-0 skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow: '0 0 25px rgba(255,77,0,0.5)',
                    }}
                    whileTap={{scale: 0.97}}
                    onClick={() => {
                      setUserId('demo123');
                      setPassword('demo123');
                    }}
                    className="rounded-lg bg-gradient-to-r from-[#0f172a] to-[#1e293b] py-2.5 text-sm font-bold text-white shadow-lg transition-all"
                  >
                    Demo ID
                  </motion.button>
                </div>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dotted border-[#ff4d00]"></div>
                  </div>
                </div>

                <div className="space-y-3 text-center">
                  <p className="text-xs font-semibold text-slate-700">
                    Connect with us
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    <SocialIcon
                      icon={
                        <MessageCircle className="h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
                      }
                    />
                    <SocialIcon
                      icon={
                        <Send className="h-4 w-4 text-sky-500 sm:h-5 sm:w-5" />
                      }
                    />
                    <SocialIcon
                      icon={
                        <Facebook className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                      }
                    />
                    <SocialIcon
                      icon={
                        <Instagram className="h-4 w-4 text-pink-600 sm:h-5 sm:w-5" />
                      }
                    />
                    <SocialIcon
                      icon={
                        <Twitter className="h-4 w-4 text-black sm:h-5 sm:w-5" />
                      }
                    />
                    <SocialIcon
                      icon={
                        <Youtube className="h-4 w-4 text-red-600 sm:h-5 sm:w-5" />
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const AnnouncementTicker = () => {
  const announcementText =
    '1️⃣ Welcome To Our New Version Exchange... 2️⃣🎾 We are running Tennis Bookmaker place your bets now and enjoy game... 3️⃣ West Bengal Assembly Election 2026 Bets Started In Our Exchange 💫💫💫';

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-orange-500/30 bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-orange-600/20">
      <div className="flex items-center">
        <div className="flex shrink-0 items-center gap-1 border-r border-orange-500/30 bg-gradient-to-r from-orange-600/40 to-orange-600/20 px-2 py-1.5 sm:gap-2 sm:px-4 sm:py-2">
          <motion.div
            animate={{rotate: [0, 10, -10, 0], scale: [1, 1.2, 1]}}
            transition={{duration: 2, repeat: Infinity}}
          >
            <Megaphone className="h-3 w-3 text-orange-400 sm:h-4 sm:w-4" />
          </motion.div>
          <motion.span
            animate={{opacity: [1, 0.7, 1]}}
            transition={{duration: 1.5, repeat: Infinity}}
            className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-[10px] font-bold text-transparent sm:inline sm:text-xs"
          >
            ANNOUNCEMENT
          </motion.span>
        </div>

        <div className="min-w-0 flex-1">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            pauseOnClick={false}
            delay={0}
            play={true}
            direction="left"
            className="py-1 sm:py-2"
          >
            <div className="flex items-center gap-4 whitespace-nowrap sm:gap-8">
              <motion.span
                animate={{scale: [1, 1.3, 1], rotate: [0, 15, 0]}}
                transition={{duration: 1, repeat: Infinity}}
                className="mx-1 text-xs font-medium text-yellow-300 sm:mx-2 sm:text-sm"
              >
                🔴
              </motion.span>
              <span className="text-xs font-medium text-white sm:text-sm">
                {announcementText}
              </span>
              <motion.span
                animate={{scale: [1, 1.3, 1]}}
                transition={{duration: 1.5, repeat: Infinity}}
                className="mx-1 text-xs font-medium text-yellow-300 sm:mx-2 sm:text-sm"
              >
                ⚡
              </motion.span>
              <span className="text-xs font-medium text-white sm:text-sm">
                {announcementText}
              </span>
              <motion.span
                animate={{scale: [1, 1.3, 1], rotate: [0, -15, 0]}}
                transition={{duration: 1.2, repeat: Infinity}}
                className="mx-1 text-xs font-medium text-yellow-300 sm:mx-2 sm:text-sm"
              >
                🎯
              </motion.span>
              <span className="text-xs font-medium text-white sm:text-sm">
                {announcementText}
              </span>
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

const Header = ({sidebarOpen, setSidebarOpen}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      icon: <GiCricketBat size={18} className="text-red-400 sm:text-red-500" />,
      label: 'Cricket',
      color: 'bg-gradient-to-br from-slate-800 to-slate-900',
      path: '/cricket/indian',
    },
    {
      icon: <FaFutbol size={18} className="text-white" />,
      label: 'Soccer',
      color: 'bg-gradient-to-br from-slate-800 to-slate-900',
      path: '/soccer',
    },
    {
      icon: (
        <GiTennisRacket size={18} className="text-lime-400 sm:text-lime-500" />
      ),
      label: 'Tennis',
      color: 'bg-gradient-to-br from-slate-800 to-slate-900',
      path: '/tennis',
    },
  ];

  const handleNavigation = (path: string) => {
    navigate({to: path});
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <header
        className={`border-gray-800 sticky top-0 z-50 w-full border-b bg-gradient-to-b from-[#000000] to-[#0a0a0a] transition-all duration-300 ${isScrolled ? 'shadow-2xl shadow-orange-500/10' : ''}`}
      >
        <div className="mx-auto flex h-auto max-w-screen-2xl flex-col items-center justify-between px-2 sm:h-24 sm:px-4">
          {/* Top Row - Logo and Actions */}
          <div className="flex w-full items-center justify-between gap-2 py-2 sm:gap-4 sm:py-3">
            {/* Left Section - Menu Button (Mobile) + Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Menu Button - Now on LEFT side for mobile */}
              <motion.button
                whileTap={{scale: 0.9}}
                className="text-white lg:hidden"
                onClick={() => setSidebarOpen && setSidebarOpen(true)}
              >
                <Menu size={24} className="sm:h-7 sm:w-7" />
              </motion.button>

              {/* Logo with Animation */}
              <motion.div
                className="flex shrink-0 cursor-pointer items-center gap-1 sm:gap-2"
                onHoverStart={() => setIsLogoHovered(true)}
                onHoverEnd={() => setIsLogoHovered(false)}
                whileHover={{scale: 1.02}}
                onClick={() => handleNavigation('/')}
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: isLogoHovered ? [0, -5, 5, -5, 0] : 0,
                      scale: isLogoHovered ? 1.05 : 1,
                    }}
                    transition={{duration: 0.5}}
                    className="relative"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 40 40"
                      fill="none"
                      className="h-8 w-8 sm:h-11 sm:w-11"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 5V35M20 5H10V15M20 35H30V25M5 20H35M5 20V10H15M35 20V30H25"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="10" cy="10" r="2" fill="white" />
                      <circle cx="30" cy="30" r="2" fill="white" />
                      <circle cx="10" cy="30" r="2" fill="white" />
                      <circle cx="30" cy="10" r="2" fill="white" />
                    </svg>
                  </motion.div>

                  {isLogoHovered && (
                    <motion.div
                      initial={{scale: 0.8, opacity: 0}}
                      animate={{scale: 1.3, opacity: 0.5}}
                      transition={{duration: 1, repeat: Infinity}}
                      className="absolute inset-0 rounded-full border-2 border-red-500"
                    />
                  )}
                </div>
                <div className="flex flex-col leading-none">
                  <motion.h1
                    className="text-base font-black italic tracking-tighter sm:text-xl"
                    animate={{
                      color: isLogoHovered ? '#ff8c42' : '#ffffff',
                      letterSpacing: isLogoHovered ? '0px' : '-1px',
                    }}
                  >
                    SWASTIK
                  </motion.h1>
                  <motion.span
                    className="text-gray-400 text-[8px] font-bold uppercase tracking-[0.15em] sm:text-[10px] sm:tracking-[0.2em]"
                    animate={{opacity: isLogoHovered ? 1 : 0.7}}
                  >
                    Online Book
                  </motion.span>
                </div>
              </motion.div>
            </div>

            {/* Center Section - Navigation Items (Centered) - Desktop Only */}
            <div className="hidden flex-1 justify-center lg:flex">
              <div className="no-scrollbar flex items-center gap-3 overflow-x-auto xl:gap-5">
                {navItems.map((item, index) => (
                  <NavItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    isLive={item.isLive}
                    color={item.color}
                    onClick={() => handleNavigation(item.path)}
                  />
                ))}
              </div>
            </div>

            {/* Right Section - Search + Login */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <motion.div
                className="hidden sm:block"
                whileHover={{scale: 1.15, rotate: 15}}
                whileTap={{scale: 0.9}}
              >
                <Search
                  size={18}
                  className="text-gray-400 cursor-pointer transition-colors hover:text-orange-500 sm:h-5 sm:w-5"
                />
              </motion.div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(249,115,22,0.6)',
                }}
                whileTap={{scale: 0.95}}
                onClick={handleLogin}
                className="relative overflow-hidden rounded-full border-2 border-orange-500 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.8)] sm:px-6 sm:py-1.5 sm:text-xs"
              >
                <motion.div
                  animate={{x: ['-100%', '100%']}}
                  transition={{duration: 2, repeat: Infinity, repeatDelay: 3}}
                  className="absolute inset-0 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <span className="relative z-10">Login</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Horizontal Nav for Mobile/Tablet - CENTERED */}
        <div className="border-gray-900 w-full border-t bg-gradient-to-r from-[#050505] to-[#0a0a0a] lg:hidden">
          <div className="flex items-center justify-center overflow-x-auto scroll-smooth px-2 py-2 sm:py-3">
            <div className="no-scrollbar flex items-center gap-4 sm:gap-6">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  isLive={item.isLive}
                  color={item.color}
                  onClick={() => handleNavigation(item.path)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Announcement Ticker */}
        <div className="relative z-[55]">
          <AnnouncementTicker />
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
