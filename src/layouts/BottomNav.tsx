import React from 'react';
import {motion} from 'framer-motion';
import {useNavigate, useLocation} from '@tanstack/react-router';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    // {
    //   label: 'Casino',
    //   id: 'casino',
    //   icon: "https://images.rajabet.fun/newtheme/common/casino-icon.png",
    //   path: '/casino'
    // },
    {
      label: 'Sports',
      id: 'sports',
      icon: 'https://images.rajabet.fun/newtheme/common/sports-icon.png',
      path: '/sports',
    },
    {
      label: 'Home',
      id: 'home',
      icon: null,
      isMain: true,
      path: '/',
    },
    {
      label: 'Inplay',
      id: 'inplay',
      icon: 'https://images.rajabet.fun/newtheme/common/inplay-icon.png',
      path: '/play/play',
    },
    // {
    //   label: 'Support',
    //   id: 'support',
    //   icon: "https://images.rajabet.fun/newtheme/common/whatsapp-icon.png",
    //   path: '/support'
    // }
  ];

  const handleNavigation = (path) => {
    navigate({to: path});
  };

  const isActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Line Indicator - Full Width */}
      <div className="fixed bottom-16 left-0 z-50 w-full lg:hidden">
        <div className="relative h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent">
          <motion.div
            className="absolute h-full bg-orange-500"
            initial={{width: '0%'}}
            animate={{width: '100%'}}
            transition={{duration: 0.5}}
          />
        </div>
      </div>

      {/* Bottom Navigation Bar - Full Width */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-gradient-to-t from-[#0f0f1a] to-[#1a1a2e] pb-3 pt-2 shadow-2xl lg:hidden">
        <div className="flex w-full items-center justify-around px-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-1 flex-col items-center justify-center"
            >
              {item.isMain ? (
                <div className="relative -top-6">
                  {/* Outer Ring Animation */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="absolute inset-0 rounded-full bg-orange-500/30 blur-xl"
                  />
                  <motion.button
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.95}}
                    onClick={() => handleNavigation(item.path)}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#1a1a2e] bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_8px_25px_rgba(249,115,22,0.5)] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(249,115,22,0.7)]"
                  >
                    <svg
                      viewBox="0 0 45 44"
                      className="h-7 w-7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_419_29155)">
                        <g clipPath="url(#clip1_419_29155)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.12891 24.5692V37.8356C6.12891 38.6972 6.90745 39.4654 7.75866 39.4654H18.378V29.0225H25.2189V39.4654H35.8382C36.3054 39.4654 36.6583 39.237 36.9282 39.0086C37.1462 38.8322 37.4576 38.365 37.4576 38.0017V24.5692C37.4576 24.3304 36.9697 24.0605 36.5857 23.7284C36.2431 23.4377 35.9628 23.1989 35.6099 22.9187L29.6929 18.0398C28.0632 16.5865 25.5095 14.6661 23.7863 13.1609L21.7933 11.5519C21.4507 11.7906 21.1808 12.0501 20.8486 12.32L17.8902 14.7491C17.2154 15.32 16.603 15.8183 15.9178 16.3789C15.5649 16.6591 15.2639 16.8979 14.9317 17.1886C13.1773 18.7249 10.6964 20.5726 9.0251 22.0675L6.3469 24.2681C6.20157 24.4031 6.12891 24.3097 6.12891 24.5692Z"
                            fill="white"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-0.121094 22.0882C-0.121094 22.5864 -0.0899519 22.711 0.294131 23.1366C0.522505 23.3858 0.657453 23.5622 0.885827 23.8217C1.99655 25.0051 2.0277 25.8356 3.75088 24.3304C4.22839 23.9255 4.65399 23.5518 5.15226 23.1574L7.90313 20.8633C8.37026 20.448 8.83738 20.0847 9.31489 19.7006L21.0761 9.89095C21.3772 9.66257 21.481 9.53801 21.7924 9.33039L30.0761 16.2024C30.5536 16.6072 31.0208 16.9498 31.4879 17.3546C31.955 17.7698 32.391 18.1332 32.8893 18.5276L35.6402 20.8217C36.8651 21.9117 38.5467 23.1781 39.7509 24.2473C39.9793 24.455 40.2076 24.6418 40.4464 24.839C41.5571 25.7629 42.1903 24.3512 43.2595 23.1781C43.5191 22.8875 43.6644 22.6384 43.7059 22.41V22.0259C43.5813 21.4342 42.8339 21.0294 42.3149 20.5622C42.0554 20.3339 41.8062 20.1262 41.526 19.9082L39.9274 18.5899C39.6056 18.32 37.7682 16.6903 37.4568 16.6072V7.10894C37.4568 6.0605 37.7267 4.62797 36.6886 4.62797H31.1246C30.7613 4.62797 30.481 5.0951 30.4395 5.56223V10.7006L24.5225 5.75946C23.4222 4.79406 23.0381 4.53455 21.5433 4.53455C20.1211 4.53455 18.8962 5.93593 17.7647 6.83904C15.0554 8.97745 11.7647 11.801 9.06576 14.064L0.387557 21.2992C0.148802 21.4861 -0.121094 21.7041 -0.121094 22.0882Z"
                            fill="white"
                          ></path>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_419_29155">
                          <rect width="45" height="44" fill="white"></rect>
                        </clipPath>
                        <clipPath id="clip1_419_29155">
                          <rect
                            width="45"
                            height="45"
                            fill="white"
                            transform="translate(-0.703125 -0.5)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>

                    {/* Active Pulse Ring for Home */}
                    {isActive(item.path) && (
                      <motion.div
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1.2, opacity: 0}}
                        transition={{duration: 1, repeat: Infinity}}
                        className="absolute inset-0 rounded-full border-2 border-orange-500"
                      />
                    )}
                  </motion.button>

                  {/* Active Indicator for Home */}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeHomeIndicator"
                      className="absolute -bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
                      initial={{scale: 0, width: 0}}
                      animate={{scale: 1, width: 40}}
                      transition={{type: 'spring', stiffness: 300, damping: 30}}
                    />
                  )}
                </div>
              ) : (
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  onClick={() => handleNavigation(item.path)}
                  className="group flex w-full flex-col items-center gap-1 py-1 transition-all duration-200"
                >
                  <div className="relative">
                    <div
                      className={`transition-all duration-200 ${isActive(item.path) ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className={`h-6 w-6 object-contain transition-all duration-200 ${
                          isActive(item.path)
                            ? 'opacity-100 brightness-0 invert'
                            : 'opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert'
                        }`}
                      />
                    </div>

                    {/* Active Glow Effect */}
                    {isActive(item.path) && (
                      <motion.div
                        initial={{scale: 0, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        className="absolute -inset-3 -z-10 rounded-full bg-orange-500/30 blur-md"
                      />
                    )}

                    {/* Hover Glow Effect */}
                    {!isActive(item.path) && (
                      <div className="absolute -inset-3 -z-10 rounded-full bg-orange-500/0 transition-all duration-300 group-hover:bg-orange-500/10" />
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-medium capitalize transition-all duration-200 ${
                      isActive(item.path)
                        ? 'font-bold text-orange-500'
                        : 'text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active Indicator for regular items */}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
                      initial={{scale: 0, width: 0}}
                      animate={{scale: 1, width: 32}}
                      transition={{type: 'spring', stiffness: 300, damping: 30}}
                    />
                  )}
                </motion.button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Safe Area for Notch Devices */}
        <div className="h-1 w-full" />
      </div>
    </>
  );
};

export default BottomNav;
