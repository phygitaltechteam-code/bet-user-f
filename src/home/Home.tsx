import React, {useState} from 'react';
import {Play, Tv, MonitorPlay, ChevronDown} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';

// Types
interface Odds {
  back: string;
  lay: string;
}

interface MarketOdds {
  one: Odds;
  x: Odds;
  two: Odds;
}

interface Match {
  id: string;
  isLive: boolean;
  time?: string;
  teams: string;
  league?: string;
  streamingAvailable: boolean;
  tvAvailable: boolean;
  odds: MarketOdds;
}

interface Category {
  title: string;
  matches: Match[];
}

// Mock Data
const MOCK_DATA: Category[] = [
  {
    title: 'Cricket',
    matches: [
      {
        id: 'c1',
        isLive: true,
        teams: 'Indian Premier League',
        streamingAvailable: true,
        tvAvailable: false,
        odds: {
          one: {back: '2500', lay: '0'},
          x: {back: '240', lay: '270'},
          two: {back: '320', lay: '360'},
        },
      },
      {
        id: 'c2',
        isLive: true,
        teams: 'Leicestershire v Nottinghamshire',
        streamingAvailable: true,
        tvAvailable: true,
        odds: {
          one: {back: '6.2', lay: '10.5'},
          x: {back: '', lay: ''},
          two: {back: '1.11', lay: '1.19'},
        },
      },
      {
        id: 'c3',
        isLive: true,
        teams: 'Middlesex v Durham',
        streamingAvailable: true,
        tvAvailable: true,
        odds: {
          one: {back: '1.54', lay: '3'},
          x: {back: '', lay: ''},
          two: {back: '1.5', lay: '2.86'},
        },
      },
      {
        id: 'c4',
        isLive: true,
        teams: 'Surrey v Sussex',
        streamingAvailable: true,
        tvAvailable: true,
        odds: {
          one: {back: '1.1', lay: '1.12'},
          x: {back: '', lay: ''},
          two: {back: '9.2', lay: '11'},
        },
      },
      {
        id: 'c5',
        isLive: false,
        time: '01 May 19:30',
        teams: 'Islamabad United v Hyderabad Kingsmen',
        streamingAvailable: true,
        tvAvailable: true,
        odds: {
          one: {back: '1.98', lay: '2.02'},
          x: {back: '', lay: ''},
          two: {back: '1.98', lay: '2.02'},
        },
      },
    ],
  },
  {
    title: 'Soccer',
    matches: [
      {
        id: 's1',
        isLive: false,
        time: '01 May 19:30',
        teams: 'Rizespor v Konyaspor',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: {back: '1.94', lay: '1.95'},
          x: {back: '4', lay: '4.1'},
          two: {back: '4.2', lay: '4.3'},
        },
      },
      {
        id: 's2',
        isLive: false,
        time: '01 May 19:45',
        teams: 'FC Andorra v Albacete',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: {back: '1.63', lay: '1.65'},
          x: {back: '4.4', lay: '4.7'},
          two: {back: '5.7', lay: '6'},
        },
      },
      {
        id: 's3',
        isLive: false,
        time: '01 May 22:00',
        teams: 'Deportivo v Leganes',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: {back: '1.58', lay: '1.6'},
          x: {back: '4.4', lay: '4.5'},
          two: {back: '6.6', lay: '7'},
        },
      },
      {
        id: 's4',
        isLive: false,
        time: '01 May 22:30',
        teams: 'Brondby v FC Nordsjaelland',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: {back: '2.22', lay: '2.26'},
          x: {back: '4.1', lay: '4.3'},
          two: {back: '3.15', lay: '3.2'},
        },
      },
      {
        id: 's5',
        isLive: false,
        time: '01 May 22:30',
        teams: 'Gaziantep FK v Besiktas',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: {back: '3.45', lay: '3.55'},
          x: {back: '4', lay: '4.1'},
          two: {back: '2.14', lay: '2.16'},
        },
      },
    ],
  },
  {
    title: 'Tennis',
    matches: [
      {
        id: 't1',
        isLive: true,
        teams: 'Arnaldi v Borges',
        streamingAvailable: true,
        tvAvailable: false,
        odds: {
          one: {back: '6.4', lay: '7'},
          x: {back: '', lay: ''},
          two: {back: '1.17', lay: '1.18'},
        },
      },
      {
        id: 't2',
        isLive: true,
        teams: 'Sorribes Tormo v Ele Pridankina',
        streamingAvailable: true,
        tvAvailable: false,
        odds: {
          one: {back: '1.98', lay: '2.06'},
          x: {back: '', lay: ''},
          two: {back: '1.95', lay: '2.04'},
        },
      },
      {
        id: 't3',
        isLive: true,
        teams: 'Martin Tiffon v Coppejans',
        streamingAvailable: true,
        tvAvailable: false,
        odds: {
          one: {back: '1.94', lay: '1.95'},
          x: {back: '', lay: ''},
          two: {back: '2.04', lay: '2.08'},
        },
      },
    ],
  },
];

const OddsButton = ({back, lay}: {back: string; lay: string}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex h-full w-full max-w-[200px] gap-[2px] sm:h-9">
      <motion.button
        whileHover={{scale: 1.02, y: -1}}
        whileTap={{scale: 0.98}}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`font-mono relative flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md text-sm font-semibold transition-all duration-200 ${
          back
            ? 'bg-gradient-to-r from-[#72c1e8] to-[#5dafd6] text-black hover:shadow-md'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!back}
      >
        {isHovered && back && (
          <motion.div
            initial={{x: '-100%'}}
            animate={{x: '100%'}}
            transition={{duration: 0.6, repeat: Infinity}}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        )}
        <span className="relative z-10">{back || '-'}</span>
      </motion.button>
      <motion.button
        whileHover={{scale: 1.02, y: -1}}
        whileTap={{scale: 0.98}}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`font-mono relative flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md text-sm font-semibold transition-all duration-200 ${
          lay
            ? 'bg-gradient-to-r from-[#f48fb1] to-[#f06292] text-black hover:shadow-md'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!lay}
      >
        {isHovered && lay && (
          <motion.div
            initial={{x: '-100%'}}
            animate={{x: '100%'}}
            transition={{duration: 0.6, repeat: Infinity}}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        )}
        <span className="relative z-10">{lay || '-'}</span>
      </motion.button>
    </div>
  );
};

const MatchRow: React.FC<{match: Match; index: number}> = ({match, index}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: index * 0.05}}
      layout
      whileHover={{backgroundColor: 'rgba(0,0,0,0.02)'}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="border-gray-100 hover:bg-gray-50/80 relative flex flex-col items-start overflow-hidden border-b bg-white px-3 py-3 transition-all duration-200 sm:flex-row sm:items-center sm:px-4 sm:py-2"
      id={`match-${match.id}`}
    >
      {/* Animated hover gradient */}
      {isHovered && (
        <motion.div
          initial={{x: '-100%'}}
          animate={{x: '100%'}}
          transition={{duration: 0.8, repeat: Infinity}}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-orange-100/20 to-transparent"
        />
      )}

      {/* Left Info Column */}
      <div className="mb-3 w-full flex-1 sm:mb-0 sm:w-auto">
        <div className="flex flex-wrap items-center gap-2">
          {match.isLive && (
            <motion.span
              initial={{scale: 0}}
              animate={{scale: 1}}
              className="flex items-center gap-1 rounded bg-gradient-to-r from-red-600 to-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white shadow-md"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              Live
            </motion.span>
          )}
          {!match.isLive && match.time && (
            <span className="text-gray-500 font-mono whitespace-nowrap text-[11px] font-medium">
              {match.time}
            </span>
          )}
          <span className="text-gray-800 max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
            {match.teams}
          </span>
        </div>
      </div>

      {/* Middle Icons Column */}
      <div className="mb-3 mr-4 flex min-w-[100px] items-center gap-1.5 sm:mb-0">
        {match.streamingAvailable && (
          <motion.div
            whileHover={{scale: 1.1, rotate: 360}}
            transition={{duration: 0.3}}
            className="flex cursor-pointer items-center justify-center rounded-md bg-[#2e7d32] p-1 text-white shadow-sm"
          >
            <MonitorPlay size={14} fill="currentColor" />
          </motion.div>
        )}
        {match.tvAvailable && (
          <motion.div
            whileHover={{scale: 1.1, rotate: 360}}
            transition={{duration: 0.3}}
            className="flex cursor-pointer items-center justify-center rounded-md bg-[#4a148c] p-1 text-white shadow-sm"
          >
            <Tv size={14} fill="currentColor" />
          </motion.div>
        )}
        <div className="flex h-6 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-800 to-cyan-700 p-1 text-[8px] font-bold text-white shadow-sm">
          8M
        </div>
        <div className="flex h-6 w-7 items-center justify-center rounded-md bg-gradient-to-br from-purple-800 to-purple-700 p-1 text-[8px] font-bold text-white shadow-sm">
          F
        </div>
      </div>

      {/* Odds Grid */}
      <div className="grid w-full grid-cols-3 gap-2 sm:gap-4 lg:w-auto">
        <div className="w-full sm:w-36 lg:w-44">
          <OddsButton {...match.odds.one} />
        </div>
        <div className="w-full sm:w-36 lg:w-44">
          <OddsButton {...match.odds.x} />
        </div>
        <div className="w-full sm:w-36 lg:w-44">
          <OddsButton {...match.odds.two} />
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection: React.FC<{category: Category}> = ({category}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3}}
      className="mb-6 w-full overflow-hidden rounded-xl shadow-md"
      id={`category-${category.title.toLowerCase()}`}
    >
      {/* Category Header with Collapse */}
      <motion.div
        whileHover={{backgroundColor: '#f05a28'}}
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-center justify-between bg-gradient-to-r from-[#f05a28] to-[#f07828] px-4 py-2.5"
      >
        <h2 className="text-sm font-bold tracking-wide text-white">
          {category.title}
        </h2>
        <motion.div
          animate={{rotate: isExpanded ? 180 : 0}}
          transition={{duration: 0.3}}
          className="text-white"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* Desktop Header Labels */}
      <div className="border-gray-100 bg-gray-50/50 hidden grid-cols-[1fr_100px_488px] border-b px-4 py-2 sm:grid sm:grid-cols-[1fr_100px_540px] lg:grid-cols-[1fr_100px_576px]">
        <div className="flex-1"></div>
        <div className="mr-4 min-w-[100px]"></div>
        <div className="grid w-full grid-cols-3 gap-3 sm:gap-6">
          {['1', 'X', '2'].map((label, idx) => (
            <div key={label} className="flex justify-center">
              <div className="from-gray-500 to-gray-600 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r text-[10px] font-bold text-white shadow-sm">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{height: 0, opacity: 0}}
            animate={{height: 'auto', opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{duration: 0.3}}
            className="flex flex-col"
          >
            {category.matches.map((match, idx) => (
              <MatchRow key={match.id} match={match} index={idx} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function Home() {
  return (
    <div
      className="from-gray-100 to-gray-200 min-h-screen bg-gradient-to-b"
      id="home-container"
    >
      <main className="px-3 py-4 sm:px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {MOCK_DATA.map((category) => (
            <CategorySection key={category.title} category={category} />
          ))}
        </div>
      </main>

      {/* Responsive Info Note */}
      <div className="text-gray-500 p-6 text-center text-xs">
        <div className="mx-auto max-w-md">
          <p className="flex items-center justify-center gap-1">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>
            This dashboard displays the latest odds and live markets. Click on a
            selection to add it to your betslip.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
