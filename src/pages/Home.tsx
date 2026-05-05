import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {
  ChevronDown,
  Info,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Bell,
  Menu,
  Clock,
  Tv,
  Monitor,
  FlaskConical,
  Home as HomeIcon,
  Gamepad2,
  Trophy,
  Activity,
  MessageCircle,
} from 'lucide-react';
import Marquee from 'react-fast-marquee';

// Types
export type SportType = 'CRICKET' | 'SOCCER' | 'TENNIS' | 'ELECTION';

export interface BettingOdds {
  one: number;
  draw?: number;
  two: number;
  oneLay?: number;
  drawLay?: number;
  twoLay?: number;
}

export interface Match {
  id: string;
  time: string;
  teams: string;
  league?: string;
  isLive?: boolean;
  isSuspended?: boolean;
  odds: BettingOdds;
  hasTV?: boolean;
  hasFancy?: boolean;
  hasBM?: boolean;
}

// Match Data
export const MATCH_DATA: Record<SportType, Match[]> = {
  CRICKET: [
    {
      id: 'c1',
      time: 'Live',
      teams: 'Indian Premier League',
      isLive: true,
      hasBM: true,
      odds: {
        one: 3000,
        draw: 250,
        two: 280,
        oneLay: 0,
        drawLay: 280,
        twoLay: 320,
      },
    },
    {
      id: 'c2',
      time: 'Live',
      teams: 'England W v New Zealand W',
      isLive: true,
      isSuspended: true,
      hasBM: true,
      hasFancy: true,
      hasTV: true,
      odds: {
        one: 0,
        draw: 0,
        two: 0,
        oneLay: 0,
        drawLay: 0,
        twoLay: 0,
      },
    },
    {
      id: 'c3',
      time: '05 May 19:30',
      teams: 'Delhi Capitals v Chennai Super Kings',
      hasBM: true,
      hasFancy: true,
      hasTV: true,
      odds: {
        one: 1.81,
        draw: 0,
        two: 2.2,
        oneLay: 1.82,
        drawLay: 0,
        twoLay: 2.22,
      },
    },
    {
      id: 'c4',
      time: '06 May 19:30',
      teams: 'Sunrisers Hyderabad v Punjab Kings',
      hasBM: true,
      hasFancy: true,
      hasTV: true,
      odds: {
        one: 2,
        draw: 0,
        two: 1.9,
        oneLay: 2.12,
        drawLay: 0,
        twoLay: 2,
      },
    },
    {
      id: 'c5',
      time: '08 May 09:30',
      teams: 'Bangladesh v Pakistan',
      hasBM: true,
      hasFancy: true,
      hasTV: true,
      odds: {
        one: 3.15,
        draw: 8.2,
        two: 1.74,
        oneLay: 3.3,
        drawLay: 9.8,
        twoLay: 1.77,
      },
    },
  ],
  SOCCER: [
    {
      id: 's1',
      time: '06 May 00:30',
      teams: 'Arsenal v Atletico Madrid',
      odds: {
        one: 1.62,
        draw: 4.4,
        two: 6.2,
        oneLay: 1.63,
        drawLay: 4.5,
        twoLay: 6.4,
      },
    },
  ],
  TENNIS: [
    {
      id: 't1',
      time: '05 May 13:30',
      teams: 'A Potapova v Nikol Bartunkova',
      hasTV: true,
      odds: {
        one: 1.41,
        draw: 0,
        two: 3.4,
        oneLay: 1.42,
        drawLay: 0,
        twoLay: 3.45,
      },
    },
    {
      id: 't2',
      time: '05 May 13:30',
      teams: 'A Tomljanovic v Leol Jeanjean',
      hasTV: true,
      odds: {
        one: 1.73,
        draw: 0,
        two: 2.32,
        oneLay: 1.76,
        drawLay: 0,
        twoLay: 2.38,
      },
    },
    {
      id: 't3',
      time: '05 May 13:30',
      teams: 'Al Kovacevic v Fearnley',
      hasTV: true,
      odds: {
        one: 2.5,
        draw: 0,
        two: 1.64,
        oneLay: 2.58,
        drawLay: 0,
        twoLay: 1.66,
      },
    },
    {
      id: 't4',
      time: '05 May 13:30',
      teams: 'Carreno Busta v Wawrinka',
      hasTV: true,
      odds: {
        one: 1.47,
        draw: 0,
        two: 3.05,
        oneLay: 1.48,
        drawLay: 0,
        twoLay: 3.15,
      },
    },
    {
      id: 't5',
      time: '05 May 13:30',
      teams: 'Comesana v Riedi',
      hasTV: true,
      odds: {
        one: 1.51,
        draw: 0,
        two: 2.92,
        oneLay: 1.53,
        drawLay: 0,
        twoLay: 2.96,
      },
    },
  ],
};

// Odds Button Component for Desktop
const DesktopOddButton = ({
  value,
  type,
  idx,
}: {
  value?: number;
  type: 'back' | 'lay';
  idx?: number;
}) => {
  const getButtonStyle = () => {
    if (type === 'back') {
      if (idx === 2) {
        return 'bg-[#72BBF4] hover:bg-[#5aaae6] text-white';
      }
      return 'bg-[#E0F0FE] hover:bg-[#cbe3f7] text-gray-800';
    } else {
      if (idx === 0) {
        return 'bg-[#FAA9BA] hover:bg-[#f386a1] text-white';
      }
      return 'bg-[#FEEBF0] hover:bg-[#fcdde6] text-gray-800';
    }
  };

  if (value === undefined || value === 0) {
    return (
      <div className="bg-gray-100 border-gray-200 h-8 w-12 rounded border" />
    );
  }

  return (
    <motion.button
      whileTap={{scale: 0.95}}
      className={`h-8 w-12 rounded ${getButtonStyle()} flex flex-col items-center justify-center text-xs font-bold shadow-sm transition-all duration-150`}
    >
      {value}
    </motion.button>
  );
};

// Desktop Sport Section Component
const DesktopSportSection = ({
  title,
  data,
  isOpen,
  onToggle,
}: {
  title: string;
  data: Match[];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const getSportIcon = () => {
    switch (title) {
      case 'CRICKET':
        return '🏏';
      case 'SOCCER':
        return '⚽';
      case 'TENNIS':
        return '🎾';

      default:
        return '🏆';
    }
  };

  if (data.length === 0) {
    return (
      <section className="border-gray-200 overflow-hidden rounded-lg border bg-white shadow-md">
        <header className="flex items-center justify-between bg-[#ED6B31] px-4 py-2.5 text-white">
          <div className="flex items-center gap-3">
            <span className="text-xl">{getSportIcon()}</span>
            <h2 className="text-base font-bold uppercase tracking-tight">
              {title}
            </h2>
          </div>
        </header>
        <div className="text-gray-500 py-8 text-center">
          No Active Events Found
        </div>
      </section>
    );
  }

  return (
    <section className="border-gray-200 w-full overflow-hidden rounded-lg border bg-white shadow-md">
      <header
        className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2.5 text-white"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{getSportIcon()}</span>
          <h2 className="text-base font-bold uppercase tracking-tight">
            {title}
          </h2>
        </div>
        <motion.div
          animate={{rotate: isOpen ? 0 : 180}}
          transition={{duration: 0.2}}
        >
          <ChevronDown size={20} />
        </motion.div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{height: 0}}
            animate={{height: 'auto'}}
            exit={{height: 0}}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 text-gray-500 flex items-center justify-between border-b px-4 py-1.5 text-[10px] font-medium">
              <div>Min 100.00 | Max: 10000.00</div>
              <div className="flex">
                <div className="flex w-[160px] sm:w-[200px] md:w-[240px]">
                  <div className="flex-1 rounded-l bg-[#72BBF4] py-1 text-center text-[10px] font-bold text-white sm:text-xs">
                    Back
                  </div>
                  <div className="ml-[2px] flex-1 rounded-r bg-[#FAA9BA] py-1 text-center text-[10px] font-bold text-white sm:text-xs">
                    Lay
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[500px] sm:min-w-[600px] md:min-w-full">
                {data.map((match) => (
                  <div
                    key={match.id}
                    className="hover:bg-gray-50 border-gray-100 flex items-stretch border-b transition-colors"
                  >
                    <div className="flex flex-1 items-center px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex w-full flex-col gap-0.5 sm:gap-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          {match.isLive && (
                            <span className="flex animate-pulse items-center gap-1 whitespace-nowrap rounded bg-red-600 px-1.5 py-0.5 text-[8px] font-bold text-white sm:text-[9px]">
                              <PlayCircle className="h-2.5 w-2.5" />
                              LIVE
                            </span>
                          )}
                          <span
                            className={`whitespace-nowrap text-[9px] font-bold sm:text-[10px] md:text-xs ${
                              match.isLive ? 'text-red-600' : 'text-gray-500'
                            }`}
                          >
                            {match.time}
                          </span>
                          <span className="text-gray-300 hidden sm:inline">
                            |
                          </span>
                          <span className="text-gray-800 flex-1 break-words text-[11px] font-bold sm:text-xs md:text-sm">
                            {match.teams}
                          </span>
                          <div className="ml-auto flex items-center gap-1 sm:ml-0">
                            {match.hasBM && (
                              <img
                                src="https://images.rajabet.fun/newtheme/baz/user/bm-icon1.svg"
                                alt="BM"
                                className="h-4 w-4"
                              />
                            )}
                            {match.hasFancy && (
                              <img
                                src="https://images.rajabet.fun/newtheme/baz/user/fancy-icon1.svg"
                                alt="Fancy"
                                className="h-4 w-4"
                              />
                            )}
                            {match.hasTV && (
                              <img
                                src="https://images.rajabet.fun/newtheme/baz/user/tv-icon1.svg"
                                alt="TV"
                                className="h-4 w-4"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      {match.isSuspended ? (
                        <div className="bg-gray-100 flex w-[160px] items-center justify-center py-2 sm:w-[200px] md:w-[240px]">
                          <span className="text-xs font-bold text-red-600">
                            SUSPENDED
                          </span>
                        </div>
                      ) : (
                        <div className="flex w-[160px] sm:w-[200px] md:w-[240px]">
                          <div className="flex flex-1 gap-[1px] p-[1px] sm:gap-[2px] sm:p-[2px]">
                            <DesktopOddButton
                              value={match.odds.one}
                              type="back"
                              idx={0}
                            />
                            <DesktopOddButton
                              value={match.odds.oneLay}
                              type="lay"
                              idx={0}
                            />
                          </div>

                          {match.odds.draw !== undefined &&
                            match.odds.draw !== 0 && (
                              <div className="flex flex-1 gap-[1px] p-[1px] sm:gap-[2px] sm:p-[2px]">
                                <DesktopOddButton
                                  value={match.odds.draw}
                                  type="back"
                                  idx={1}
                                />
                                <DesktopOddButton
                                  value={match.odds.drawLay}
                                  type="lay"
                                  idx={1}
                                />
                              </div>
                            )}

                          <div className="flex flex-1 gap-[1px] p-[1px] sm:gap-[2px] sm:p-[2px]">
                            <DesktopOddButton
                              value={match.odds.two}
                              type="back"
                              idx={2}
                            />
                            <DesktopOddButton
                              value={match.odds.twoLay}
                              type="lay"
                              idx={2}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-gray-100 flex items-center gap-1 border-t bg-white p-2 text-[9px] font-medium text-red-600 sm:text-[10px]">
              <Info size={11} />
              <span>Stop Watching, Start Winning — Place Your Bet Now.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Mobile Match Row Component
const MobileMatchRow = ({
  match,
  category,
}: {
  match: Match;
  category: string;
}) => {
  return (
    <div className="border-gray-100 relative border-b bg-white p-3">
      <div className="mb-1 flex items-start justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {match.isLive && (
            <span className="flex items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
              <PlayCircle className="h-2.5 w-2.5" />
              LIVE
            </span>
          )}
          <h3 className="text-gray-900 text-sm font-bold">{match.teams}</h3>
        </div>
        <div className="flex gap-1.5">
          {match.hasBM && (
            <div className="rounded bg-sky-100 p-0.5">
              <img
                src="https://images.rajabet.fun/newtheme/baz/user/bm-icon1.svg"
                alt="BM"
                className="h-3.5 w-3.5"
              />
            </div>
          )}
          {match.hasFancy && (
            <div className="rounded bg-purple-100 p-0.5">
              <img
                src="https://images.rajabet.fun/newtheme/baz/user/fancy-icon1.svg"
                alt="Fancy"
                className="h-3.5 w-3.5"
              />
            </div>
          )}
          {match.hasTV && (
            <div className="rounded bg-green-100 p-0.5">
              <img
                src="https://images.rajabet.fun/newtheme/baz/user/tv-icon1.svg"
                alt="TV"
                className="h-3.5 w-3.5"
              />
            </div>
          )}
        </div>
      </div>

      <div className="text-gray-500 mb-2 flex items-center gap-1.5 text-[11px] font-medium">
        <Clock size={12} />
        <span>
          {match.time} | {category}
        </span>
      </div>

      {match.isSuspended ? (
        <div className="relative">
          <div className="grid grid-cols-6 gap-1">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <button
                key={idx}
                className="bg-gray-100 text-gray-400 rounded py-2 text-xs font-bold shadow-sm"
              >
                -
              </button>
            ))}
          </div>
          <div className="bg-gray-600/80 absolute inset-0 flex items-center justify-center rounded">
            <span className="text-xs font-black uppercase tracking-widest text-red-400">
              SUSPENDED
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-1">
          <button className="text-gray-900 rounded bg-sky-300 py-2 text-xs font-bold shadow-sm transition-all hover:bg-sky-400 active:scale-95">
            {match.odds.one || '-'}
          </button>
          <button className="text-gray-900 rounded bg-red-200 py-2 text-xs font-bold shadow-sm transition-all hover:bg-red-300 active:scale-95">
            {match.odds.oneLay || '-'}
          </button>
          <button className="text-gray-900 rounded bg-sky-300 py-2 text-xs font-bold shadow-sm transition-all hover:bg-sky-400 active:scale-95">
            {match.odds.draw || '-'}
          </button>
          <button className="text-gray-900 rounded bg-red-200 py-2 text-xs font-bold shadow-sm transition-all hover:bg-red-300 active:scale-95">
            {match.odds.drawLay || '-'}
          </button>
          <button className="text-gray-900 rounded bg-sky-300 py-2 text-xs font-bold shadow-sm transition-all hover:bg-sky-400 active:scale-95">
            {match.odds.two || '-'}
          </button>
          <button className="text-gray-900 rounded bg-red-200 py-2 text-xs font-bold shadow-sm transition-all hover:bg-red-300 active:scale-95">
            {match.odds.twoLay || '-'}
          </button>
        </div>
      )}
    </div>
  );
};

// Mobile Category Section Component
const MobileCategorySection = ({
  title,
  data,
  isOpen,
  onToggle,
}: {
  title: string;
  data: Match[];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  if (data.length === 0) {
    return (
      <div>
        <div
          className="flex cursor-pointer items-center justify-between bg-orange-500 px-3 py-2 text-sm font-bold tracking-wide text-white"
          onClick={onToggle}
        >
          <span>{title}</span>
          <motion.div
            animate={{rotate: isOpen ? 180 : 0}}
            transition={{duration: 0.2}}
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{height: 0}}
              animate={{height: 'auto'}}
              exit={{height: 0}}
              className="overflow-hidden"
            >
              <div className="text-gray-500 bg-white p-8 text-center">
                No Active Events Found
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between bg-orange-500 px-3 py-2 text-sm font-bold tracking-wide text-white"
        onClick={onToggle}
      >
        <span>{title}</span>
        <motion.div
          animate={{rotate: isOpen ? 180 : 0}}
          transition={{duration: 0.2}}
        >
          <ChevronDown size={16} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{height: 0}}
            animate={{height: 'auto'}}
            exit={{height: 0}}
            className="overflow-hidden"
          >
            {data.map((match) => (
              <MobileMatchRow key={match.id} match={match} category={title} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Hero Banner Component
const HeroBanner = () => {
  const banners = [
    'https://images.rajabet.fun/banners/desktop_banner_3.jpeg?1_20260505',
    'https://images.rajabet.fun/banners/desktop_banner_16.jpg?1_20260505',
    'https://images.rajabet.fun/banners/desktop_banner_17.jpg?1_20260505',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="bg-gray-900 relative h-48 overflow-hidden">
      <img
        src={banners[currentIndex]}
        alt="Banner"
        className="h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

      <div className="absolute inset-0 flex flex-col justify-center px-6">
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 shadow-lg shadow-blue-500/30">
              <span className="text-2xl">🏏</span>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-white">
              IPL
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl font-black italic tracking-tighter text-yellow-400 drop-shadow-md">
              VS
            </span>
            <span className="text-[10px] font-medium text-white opacity-80">
              2026
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 shadow-lg shadow-yellow-500/30">
              <span className="text-2xl">🏆</span>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-white">
              WINNER
            </span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-sm font-black uppercase leading-tight tracking-tight text-white drop-shadow-lg">
            INDIAN PREMIER LEAGUE <br /> 2026 SEASON
          </h2>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-yellow-400">
            LIVE MATCHES & UPDATES
          </p>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-4 bg-orange-500' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Main Component
const Home = () => {
  const [openSections, setOpenSections] = useState({
    CRICKET: true,
    SOCCER: true,
    TENNIS: true,
  });

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen select-none flex-col pb-16 font-sans lg:pb-0">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Content - Desktop View */}
      <div className="mx-auto hidden max-w-[1600px] px-4 py-4 lg:block">
        <DesktopSportSection
          title="CRICKET"
          data={MATCH_DATA.CRICKET}
          isOpen={openSections.CRICKET}
          onToggle={() =>
            setOpenSections((prev) => ({...prev, CRICKET: !prev.CRICKET}))
          }
        />

        <div className="mt-4">
          <DesktopSportSection
            title="SOCCER"
            data={MATCH_DATA.SOCCER}
            isOpen={openSections.SOCCER}
            onToggle={() =>
              setOpenSections((prev) => ({...prev, SOCCER: !prev.SOCCER}))
            }
          />
        </div>

        <div className="mt-4">
          <DesktopSportSection
            title="TENNIS"
            data={MATCH_DATA.TENNIS}
            isOpen={openSections.TENNIS}
            onToggle={() =>
              setOpenSections((prev) => ({...prev, TENNIS: !prev.TENNIS}))
            }
          />
        </div>

        <div className="mt-4">
          <section className="border-gray-200 overflow-hidden rounded-lg border bg-white shadow-md">
            <header className="flex items-center justify-between bg-[#ED6B31] px-4 py-2.5 text-white">
              <div className="flex items-center gap-3">
                <span className="text-xl">🐎</span>
                <h2 className="text-base font-bold uppercase tracking-tight">
                  HORSE RACING
                </h2>
              </div>
            </header>
            <div className="text-gray-500 py-8 text-center">
              No Active Events Found
            </div>
          </section>
        </div>

        <div className="mt-4">
          <section className="border-gray-200 overflow-hidden rounded-lg border bg-white shadow-md">
            <header className="flex items-center justify-between bg-[#ED6B31] px-4 py-2.5 text-white">
              <div className="flex items-center gap-3">
                <span className="text-xl">🐕</span>
                <h2 className="text-base font-bold uppercase tracking-tight">
                  GREY HOUND
                </h2>
              </div>
            </header>
            <div className="text-gray-500 py-8 text-center">
              No Active Events Found
            </div>
          </section>
        </div>
      </div>

      {/* Main Content - Mobile View */}
      <div className="flex-1 lg:hidden">
        <MobileCategorySection
          title="CRICKET"
          data={MATCH_DATA.CRICKET}
          isOpen={openSections.CRICKET}
          onToggle={() =>
            setOpenSections((prev) => ({...prev, CRICKET: !prev.CRICKET}))
          }
        />

        <MobileCategorySection
          title="SOCCER"
          data={MATCH_DATA.SOCCER}
          isOpen={openSections.SOCCER}
          onToggle={() =>
            setOpenSections((prev) => ({...prev, SOCCER: !prev.SOCCER}))
          }
        />

        <MobileCategorySection
          title="TENNIS"
          data={MATCH_DATA.TENNIS}
          isOpen={openSections.TENNIS}
          onToggle={() =>
            setOpenSections((prev) => ({...prev, TENNIS: !prev.TENNIS}))
          }
        />
      </div>
    </div>
  );
};

export default Home;
