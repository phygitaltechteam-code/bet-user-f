import {motion} from 'framer-motion';
import {Monitor, Info, MonitorPlay, Tv} from 'lucide-react';
import {useState} from 'react';

interface EventData {
  id: string;
  name: string;
  isLive: boolean;
  hasVideo?: boolean;
  hasBM?: boolean;
  oddsX: {back: string; lay: string};
  odds1: {back: string; lay: string};
  odds2: {back: string; lay: string};
}

const LiveBadge = () => (
  <span className="flex items-center gap-1 rounded bg-[#BD2130] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
    Live
  </span>
);

const OddsButton = ({value, type}: {value: string; type: 'back' | 'lay'}) => {
  const bgColor = type === 'back' ? 'bg-[#72BBDB]' : 'bg-[#F4A79D]';
  const hasValue = value && value !== '';
  return (
    <button
      id={`odds-${value}-${type}`}
      className={`${bgColor} text-gray-900 flex h-8 flex-1 cursor-pointer items-center justify-center rounded-sm border border-white/20 text-xs font-bold shadow-sm transition-all hover:brightness-95 sm:h-9 sm:text-sm ${
        !hasValue ? 'cursor-not-allowed opacity-40' : ''
      }`}
      aria-label={`${type} odds ${value}`}
      disabled={!hasValue}
    >
      {value || '-'}
    </button>
  );
};

// Desktop Event Row Component (Horizontal Layout)
const DesktopEventRow = ({event}: {event: EventData}) => (
  <motion.div
    initial={{opacity: 0, y: 5}}
    animate={{opacity: 1, y: 0}}
    layout
    className="border-gray-200 hover:bg-gray-50 hidden items-center border-b bg-white px-4 py-2 transition-colors sm:flex"
    id={`event-${event.id}`}
  >
    {/* Left Info Column */}
    <div className="flex-1">
      <div className="flex flex-wrap items-center gap-2">
        {event.isLive && <LiveBadge />}
        <span className="text-gray-900 text-sm font-bold">{event.name}</span>
      </div>
    </div>

    {/* Middle Icons Column */}
    <div className="mr-4 flex min-w-[100px] items-center gap-1.5">
      {event.hasVideo && (
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-black text-green-500">
          <MonitorPlay size={14} fill="currentColor" />
        </div>
      )}
      {event.hasBM && (
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-cyan-800 text-[8px] font-bold text-white">
          BM
        </div>
      )}
    </div>

    {/* Odds Row */}
    <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:w-auto">
      <div className="w-full sm:w-36 lg:w-44">
        <div className="flex gap-[2px]">
          <OddsButton value={event.odds1.back} type="back" />
          <OddsButton value={event.odds1.lay} type="lay" />
        </div>
      </div>
      <div className="w-full sm:w-36 lg:w-44">
        <div className="flex gap-[2px]">
          <OddsButton value={event.oddsX.back} type="back" />
          <OddsButton value={event.oddsX.lay} type="lay" />
        </div>
      </div>
      <div className="w-full sm:w-36 lg:w-44">
        <div className="flex gap-[2px]">
          <OddsButton value={event.odds2.back} type="back" />
          <OddsButton value={event.odds2.lay} type="lay" />
        </div>
      </div>
    </div>
  </motion.div>
);

// Mobile Event Row Component (Vertical Layout)
const MobileEventRow = ({event}: {event: EventData}) => (
  <motion.div
    initial={{opacity: 0, y: 10}}
    animate={{opacity: 1, y: 0}}
    className="border-gray-200 hover:bg-gray-50 flex flex-col border-b bg-white p-3 transition-colors sm:hidden"
  >
    {/* Top Section - Event Info and Icons */}
    <div className="mb-3 flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {event.isLive && <LiveBadge />}
        <span className="text-gray-900 flex-1 text-sm font-bold">
          {event.name}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {event.hasVideo && (
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-black text-green-500">
            <MonitorPlay size={16} fill="currentColor" />
          </div>
        )}
        {event.hasBM && (
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-cyan-800 text-[9px] font-bold text-white">
            BM
          </div>
        )}
      </div>
    </div>

    {/* Bottom Section - Odds Grid */}
    <div className="grid grid-cols-3 gap-2">
      {/* Odds 1 */}
      <div className="space-y-1">
        <div className="flex items-center justify-center">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[9px] font-bold text-white">
            1
          </div>
        </div>
        <div className="flex gap-[2px]">
          <OddsButton value={event.odds1.back} type="back" />
          <OddsButton value={event.odds1.lay} type="lay" />
        </div>
      </div>
      {/* Odds X */}
      <div className="space-y-1">
        <div className="flex items-center justify-center">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[9px] font-bold text-white">
            X
          </div>
        </div>
        <div className="flex gap-[2px]">
          <OddsButton value={event.oddsX.back} type="back" />
          <OddsButton value={event.oddsX.lay} type="lay" />
        </div>
      </div>
      {/* Odds 2 */}
      <div className="space-y-1">
        <div className="flex items-center justify-center">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[9px] font-bold text-white">
            2
          </div>
        </div>
        <div className="flex gap-[2px]">
          <OddsButton value={event.odds2.back} type="back" />
          <OddsButton value={event.odds2.lay} type="lay" />
        </div>
      </div>
    </div>
  </motion.div>
);

const SportSection = ({
  title,
  events,
  showIndicators = true,
}: {
  title: string;
  events: EventData[];
  showIndicators?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6 w-full overflow-hidden rounded-lg shadow-sm">
      {/* Section Header with Collapse */}
      <div
        className="flex min-h-[44px] cursor-pointer items-center justify-between bg-[#F15A24] px-4 py-2 text-white"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-sm font-bold tracking-wide">{title}</h2>
        <div className="flex items-center gap-4">
          {/* Desktop indicators */}
          {showIndicators && (
            <div className="hidden gap-6 sm:flex">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[10px] font-bold text-white">
                1
              </div>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[10px] font-bold text-white">
                X
              </div>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[10px] font-bold text-white">
                2
              </div>
            </div>
          )}
          <motion.div
            animate={{rotate: isExpanded ? 180 : 0}}
            transition={{duration: 0.3}}
            className="text-lg text-white"
          >
            ▼
          </motion.div>
        </div>
      </div>

      {/* Desktop Header Row - Hidden on mobile */}
      {showIndicators && events.length > 0 && (
        <div className="border-gray-100 hidden border-b bg-white px-4 py-2 sm:grid sm:grid-cols-[1fr_100px_1fr]">
          <div className="flex-1"></div>
          <div className="mr-4 min-w-[100px]"></div>
          <div className="grid w-full grid-cols-3 gap-2 sm:gap-4">
            <div className="flex justify-center">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[10px] font-bold text-white">
                1
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[10px] font-bold text-white">
                X
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[10px] font-bold text-white">
                2
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="bg-white">
        {events.length > 0 ? (
          <div className="flex flex-col">
            {events.map((event) => (
              <div key={event.id}>
                <DesktopEventRow event={event} />
                <MobileEventRow event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-900 flex items-center justify-center bg-white py-12 text-sm font-medium">
            No Active Events Found
          </div>
        )}
      </div>
    </div>
  );
};

export default function Play() {
  const cricketEvents: EventData[] = [
    {
      id: 'cricket-1',
      name: 'Indian Premier League',
      isLive: true,
      hasBM: true,
      odds1: {back: '6500', lay: '0'},
      oddsX: {back: '250', lay: '280'},
      odds2: {back: '280', lay: '310'},
    },
    {
      id: 'cricket-2',
      name: 'Big Bash League - Sydney Sixers v Perth Scorchers',
      isLive: true,
      hasVideo: true,
      odds1: {back: '2.50', lay: '2.60'},
      oddsX: {back: '3.20', lay: '3.30'},
      odds2: {back: '2.80', lay: '2.90'},
    },
    {
      id: 'cricket-3',
      name: 'The Hundred - London Spirit v Manchester Originals',
      isLive: false,
      hasVideo: true,
      hasBM: true,
      odds1: {back: '1.85', lay: '1.90'},
      oddsX: {back: '4.50', lay: '4.60'},
      odds2: {back: '3.40', lay: '3.45'},
    },
  ];

  const soccerEvents: EventData[] = [
    {
      id: 'soccer-1',
      name: 'Manchester United v Liverpool',
      isLive: false,
      hasVideo: true,
      odds1: {back: '2.10', lay: '2.15'},
      oddsX: {back: '3.40', lay: '3.45'},
      odds2: {back: '3.80', lay: '3.85'},
    },
    {
      id: 'soccer-2',
      name: 'Real Madrid v Barcelona',
      isLive: true,
      hasVideo: true,
      hasBM: true,
      odds1: {back: '1.85', lay: '1.87'},
      oddsX: {back: '3.60', lay: '3.65'},
      odds2: {back: '4.20', lay: '4.25'},
    },
  ];

  const tennisEvents: EventData[] = [
    {
      id: 'tennis-1',
      name: 'Kat Sebov v Jakupovic',
      isLive: true,
      hasVideo: true,
      odds1: {back: '1.19', lay: '1.41'},
      oddsX: {back: '', lay: ''},
      odds2: {back: '3.45', lay: '6.60'},
    },
    {
      id: 'tennis-2',
      name: 'Novak Djokovic v Carlos Alcaraz - Wimbledon Final',
      isLive: false,
      hasVideo: true,
      odds1: {back: '1.55', lay: '1.57'},
      oddsX: {back: '', lay: ''},
      odds2: {back: '2.50', lay: '2.55'},
    },
    {
      id: 'tennis-3',
      name: 'Iga Swiatek v Aryna Sabalenka',
      isLive: true,
      hasVideo: true,
      hasBM: true,
      odds1: {back: '1.65', lay: '1.68'},
      oddsX: {back: '', lay: ''},
      odds2: {back: '2.20', lay: '2.25'},
    },
  ];

  const boxingEvents: EventData[] = [];

  return (
    <div className="min-h-screen bg-[#f4f4f4] selection:bg-orange-100">
      <main className="px-3 py-4 sm:px-4 md:px-6">
        <div className="">
          <SportSection title="Cricket" events={cricketEvents} />
          <SportSection title="Soccer" events={soccerEvents} />
          <SportSection title="Tennis" events={tennisEvents} />
          <SportSection
            title="Boxing"
            events={boxingEvents}
            showIndicators={false}
          />
        </div>
      </main>

      {/* Mobile info note */}
      <div className="text-gray-400 flex items-center justify-center gap-1 pb-6 text-center text-xs sm:hidden">
        <Info size={12} className="inline" />
        <span>Tap on any odds to place bet</span>
      </div>

      {/* Desktop info note */}
      <div className="text-gray-400 hidden p-8 text-center text-xs sm:block">
        <div className="mx-auto max-w-md">
          <p>
            This dashboard displays the latest odds and live markets. Click on a
            selection to add it to your betslip.
          </p>
        </div>
      </div>
    </div>
  );
}
