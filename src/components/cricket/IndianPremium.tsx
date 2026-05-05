import React, {useState} from 'react';
import {ChevronDown, Info, X, Minus, Plus} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';

interface OddsValue {
  price: string;
  size: string;
}

interface TeamOdds {
  id: string;
  name: string;
  back: [OddsValue, OddsValue, OddsValue];
  lay: [OddsValue, OddsValue, OddsValue];
}

interface BetSelection {
  teamId: string;
  teamName: string;
  type: 'back' | 'lay';
  price: string;
  size: string;
  index: number;
  uniqueId: string;
}

const TEAMS_DATA: TeamOdds[] = [
  {
    id: '1',
    name: 'Mumbai Indians',
    back: [
      {price: '2998', size: ''},
      {price: '2999', size: ''},
      {price: '3000', size: ''},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
  {
    id: '2',
    name: 'Royal Challengers Bengaluru',
    back: [
      {price: '278', size: ''},
      {price: '279', size: ''},
      {price: '280', size: ''},
    ],
    lay: [
      {price: '320', size: ''},
      {price: '321', size: ''},
      {price: '322', size: ''},
    ],
  },
  {
    id: '3',
    name: 'Punjab Kings',
    back: [
      {price: '248', size: ''},
      {price: '249', size: ''},
      {price: '250', size: ''},
    ],
    lay: [
      {price: '280', size: ''},
      {price: '281', size: ''},
      {price: '282', size: ''},
    ],
  },
  {
    id: '4',
    name: 'Gujarat Titans',
    back: [
      {price: '698', size: ''},
      {price: '699', size: ''},
      {price: '700', size: ''},
    ],
    lay: [
      {price: '800', size: ''},
      {price: '801', size: ''},
      {price: '802', size: ''},
    ],
  },
  {
    id: '5',
    name: 'Sunrisers Hyderabad',
    back: [
      {price: '523', size: ''},
      {price: '524', size: ''},
      {price: '525', size: ''},
    ],
    lay: [
      {price: '600', size: ''},
      {price: '601', size: ''},
      {price: '602', size: ''},
    ],
  },
  {
    id: '6',
    name: 'Lucknow Super Giants',
    back: [
      {price: '9998', size: ''},
      {price: '9999', size: ''},
      {price: '10000', size: ''},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
  {
    id: '7',
    name: 'Delhi Capitals',
    back: [
      {price: '2498', size: ''},
      {price: '2499', size: ''},
      {price: '2500', size: ''},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
  {
    id: '8',
    name: 'Kolkata Knight Riders',
    back: [
      {price: '7498', size: ''},
      {price: '7499', size: ''},
      {price: '7500', size: ''},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
  {
    id: '9',
    name: 'Chennai Super Kings',
    back: [
      {price: '1798', size: ''},
      {price: '1799', size: ''},
      {price: '1800', size: ''},
    ],
    lay: [
      {price: '2300', size: ''},
      {price: '2301', size: ''},
      {price: '2302', size: ''},
    ],
  },
  {
    id: '10',
    name: 'Rajasthan Royals',
    back: [
      {price: '598', size: ''},
      {price: '599', size: ''},
      {price: '600', size: ''},
    ],
    lay: [
      {price: '700', size: ''},
      {price: '701', size: ''},
      {price: '702', size: ''},
    ],
  },
];

const WINNER_DATA: TeamOdds[] = [
  {
    id: 'w1',
    name: 'Punjab Kings',
    back: [
      {price: '3.6', size: '1.5K'},
      {price: '3.55', size: '1.2K'},
      {price: '3.5', size: '1.1K'},
    ],
    lay: [
      {price: '3.65', size: '793.92'},
      {price: '3.7', size: '1.2K'},
      {price: '3.75', size: '193.94'},
    ],
  },
  {
    id: 'w2',
    name: 'Royal Challengers Bengaluru',
    back: [
      {price: '3.95', size: '275.51'},
      {price: '3.9', size: '588.63'},
      {price: '3.85', size: '106.52'},
    ],
    lay: [
      {price: '4', size: '304.03'},
      {price: '4.1', size: '360.03'},
      {price: '4.2', size: '209.60'},
    ],
  },
  {
    id: 'w3',
    name: 'Sunrisers Hyderabad',
    back: [
      {price: '6.4', size: '34.86'},
      {price: '6.2', size: '1.2K'},
      {price: '6', size: '1.4K'},
    ],
    lay: [
      {price: '6.6', size: '431.09'},
      {price: '6.8', size: '438.85'},
      {price: '7', size: '1.5K'},
    ],
  },
  {
    id: 'w4',
    name: 'Rajasthan Royals',
    back: [
      {price: '7.4', size: '449.12'},
      {price: '7.2', size: '1.5K'},
      {price: '7', size: '150.00'},
    ],
    lay: [
      {price: '7.6', size: '254.41'},
      {price: '7.8', size: '111.93'},
      {price: '8', size: '160.00'},
    ],
  },
  {
    id: 'w5',
    name: 'Gujarat Titans',
    back: [
      {price: '9', size: '342.59'},
      {price: '8.8', size: '222.13'},
      {price: '8.6', size: '42.03'},
    ],
    lay: [
      {price: '9.2', size: '9.32'},
      {price: '9.4', size: '902.92'},
      {price: '9.6', size: '23.00'},
    ],
  },
  {
    id: 'w6',
    name: 'Chennai Super Kings',
    back: [
      {price: '23', size: '54.46'},
      {price: '22', size: '369.02'},
      {price: '21', size: '8.00'},
    ],
    lay: [
      {price: '24', size: '52.63'},
      {price: '25', size: '83.02'},
      {price: '26', size: '60.39'},
    ],
  },
  {
    id: 'w7',
    name: 'Mumbai Indians',
    back: [
      {price: '85', size: '1.06'},
      {price: '80', size: '47.72'},
      {price: '75', size: '21.59'},
    ],
    lay: [
      {price: '110', size: '2.00'},
      {price: '120', size: '2.55'},
      {price: '130', size: '7.66'},
    ],
  },
  {
    id: 'w8',
    name: 'Delhi Capitals',
    back: [
      {price: '55', size: '109.09'},
      {price: '50', size: '140.98'},
      {price: '40', size: '5.10'},
    ],
    lay: [
      {price: '75', size: '4.52'},
      {price: '80', size: '2.24'},
      {price: '85', size: '161.66'},
    ],
  },
  {
    id: 'w9',
    name: 'Kolkata Knight Riders',
    back: [
      {price: '190', size: '7.03'},
      {price: '180', size: '28.68'},
      {price: '170', size: '2.00'},
    ],
    lay: [
      {price: '240', size: '6.11'},
      {price: '250', size: '20.00'},
      {price: '290', size: '8.86'},
    ],
  },
  {
    id: 'w10',
    name: 'Lucknow Super Giants',
    back: [
      {price: '1000', size: '28.93'},
      {price: '800', size: '8.23'},
      {price: '360', size: '9.00'},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
];

// Inline Betting Slip Component
const InlineBettingSlip = ({
  selection,
  onCancel,
  onPlaceBet,
}: {
  selection: BetSelection;
  onCancel: () => void;
  onPlaceBet: (stake: number) => void;
}) => {
  const stakes = [100, 500, 1000, 5000, 10000, 50000];
  const [stakeValue, setStakeValue] = useState('600');
  const stake = parseFloat(stakeValue) || 0;
  const profit = stake * (parseFloat(selection.price) - 1);

  return (
    <motion.div
      initial={{height: 0, opacity: 0}}
      animate={{height: 'auto', opacity: 1}}
      exit={{height: 0, opacity: 0}}
      transition={{duration: 0.2}}
      className="border-gray-200 overflow-hidden border-t bg-gradient-to-r from-blue-50 to-pink-50"
    >
      <div className="space-y-2 p-2 sm:p-3">
        {/* Top Section - Bet Type & Team Info */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-sm px-2 py-0.5 text-[10px] font-bold text-white ${
                selection.type === 'back' ? 'bg-[#72BBF4]' : 'bg-[#FAA9BA]'
              }`}
            >
              {selection.type.toUpperCase()}
            </span>
            <span className="text-gray-800 text-xs font-bold sm:text-sm">
              {selection.teamName}
            </span>
            <span className="text-gray-600 text-[10px] sm:text-xs">
              @ {selection.price}
            </span>
          </div>
          <div className="text-gray-600 flex flex-wrap items-center gap-1 text-[8px] uppercase tracking-tight sm:gap-2 sm:text-[10px]">
            <span className="hidden sm:inline">IPL Winner Cup Bookmaker</span>
            <span className="hidden sm:inline">&gt;</span>
            <span className="text-gray-900 line-clamp-1 font-extrabold">
              {selection.teamName}
            </span>
            <span className="whitespace-nowrap rounded bg-white/50 px-1 text-[8px] sm:text-[10px]">
              Min 100 | Max 25000
            </span>
          </div>
        </div>

        {/* Middle Section - Stake Controls */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 hidden text-[10px] font-bold sm:inline sm:text-[11px]">
              Stake:
            </span>
            <div className="flex items-center overflow-hidden rounded bg-[#333] text-white">
              <button
                onClick={() => {
                  const newVal = stake - 100;
                  if (newVal >= 0) setStakeValue(newVal.toString());
                }}
                className="hover:bg-gray-700 border-gray-600 border-r p-1 px-2 sm:px-3"
              >
                <Minus size={10} />
              </button>
              <input
                value={stakeValue}
                onChange={(e) => setStakeValue(e.target.value)}
                className="w-12 bg-transparent text-center text-xs focus:outline-none sm:w-14"
                type="number"
              />
              <button
                onClick={() => setStakeValue((stake + 100).toString())}
                className="hover:bg-gray-700 border-gray-600 border-l p-1 px-2 sm:px-3"
              >
                <Plus size={10} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded bg-[#333] px-2 py-1 text-white sm:gap-2">
              <span className="text-gray-400 text-[9px] sm:text-[10px]">
                Stake
              </span>
              <span className="text-[9px] text-white sm:text-[10px]">|</span>
              <span className="text-xs sm:text-sm">{stakeValue}</span>
            </div>
            <div className="flex items-center gap-1 rounded bg-[#333] px-2 py-1 text-white sm:gap-2">
              <span className="text-gray-400 text-[9px] sm:text-[10px]">
                Profit
              </span>
              <span className="text-[9px] text-white sm:text-[10px]">|</span>
              <span className="text-xs text-green-400 sm:text-sm">
                {profit.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section - Quick Stakes & Actions */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-wrap gap-1">
            {stakes.map((s) => (
              <button
                key={s}
                onClick={() => setStakeValue(s.toString())}
                className="text-gray-800 flex-1 whitespace-nowrap rounded bg-[#86BEE8] px-2 py-1.5 text-[10px] font-bold shadow-sm transition-colors hover:bg-[#6FAEE0] sm:flex-none sm:px-4 sm:text-xs"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 transform rounded bg-[#FF4747] px-4 py-1.5 text-[10px] font-bold text-white shadow-sm transition-all hover:bg-[#E03E3E] active:scale-95 sm:flex-none sm:px-6 sm:text-xs"
            >
              Cancel
            </button>
            <button
              onClick={() => onPlaceBet(stake)}
              className="flex-1 transform rounded bg-[#008000] px-4 py-1.5 text-[10px] font-bold text-white shadow-sm transition-all hover:bg-[#006400] active:scale-95 sm:flex-none sm:px-6 sm:text-xs"
            >
              Place Bet
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function IndianPremium() {
  const [isBookmakerOpen, setIsBookmakerOpen] = useState(true);
  const [isWinnerOpen, setIsWinnerOpen] = useState(true);
  const [bets, setBets] = useState<BetSelection[]>([]);
  const [activeBetSlip, setActiveBetSlip] = useState<string | null>(null);

  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleOddsClick = (
    teamId: string,
    teamName: string,
    type: 'back' | 'lay',
    price: string,
    size: string,
    index: number,
  ) => {
    // Don't add if price is 0 or empty
    if (price === '0' || price === '') return;

    const uniqueId = generateUniqueId();
    const newBet: BetSelection = {
      teamId,
      teamName,
      type,
      price,
      size,
      index,
      uniqueId,
    };

    // Set active bet slip for this specific selection
    setActiveBetSlip(uniqueId);
  };

  const handleCancelBet = (uniqueId: string) => {
    setActiveBetSlip(null);
  };

  const handlePlaceBet = (selection: BetSelection, stake: number) => {
    // Add the bet to the matched bets list
    setBets((prev) => [...prev, selection]);
    // Close the inline slip
    setActiveBetSlip(null);
    // Optional: Show success message
    console.log('Bet placed:', {selection, stake});
  };

  const removeBet = (index: number) => {
    setBets((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllBets = () => {
    setBets([]);
  };

  const getBetTypeColor = (type: 'back' | 'lay') => {
    return type === 'back' ? 'bg-[#72BBF4]' : 'bg-[#FAA9BA]';
  };

  // Render team row with inline betting slip
  const renderTeamRow = (team: TeamOdds, isWinnerSection: boolean = false) => {
    const activeSlipForTeam =
      bets.find((b) => b.teamId === team.id && activeBetSlip === b.uniqueId) ||
      (activeBetSlip?.startsWith(team.id)
        ? ({
            uniqueId: activeBetSlip,
            teamId: team.id,
            teamName: team.name,
          } as BetSelection)
        : null);

    return (
      <div key={team.id}>
        <div className="hover:bg-gray-50 flex flex-col items-stretch transition-colors sm:flex-row">
          <div className="flex flex-1 items-center px-3 py-2 text-xs font-bold sm:px-4 sm:py-3 sm:text-sm">
            <span className="break-words">{team.name}</span>
          </div>
          <div className="flex justify-end">
            <div className="flex w-[280px] sm:w-[360px] md:w-[480px]">
              {/* Back Column */}
              <div className="flex flex-1 gap-[2px] p-[2px]">
                {team.back.map((odds, idx) => (
                  <button
                    key={`back-${idx}`}
                    onClick={() =>
                      handleOddsClick(
                        team.id,
                        team.name,
                        'back',
                        odds.price,
                        odds.size,
                        idx,
                      )
                    }
                    className={`flex min-h-[44px] flex-1 flex-col items-center justify-center transition-all hover:brightness-95 ${
                      idx === 2
                        ? 'bg-[#72BBF4]'
                        : idx === 1
                          ? 'bg-[#8ACCF5]'
                          : 'bg-[#A3D9F7]'
                    } ${odds.price === '0' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    disabled={odds.price === '0'}
                  >
                    <span className="text-xs font-bold md:text-sm">
                      {odds.price}
                    </span>
                    <span className="text-gray-700 text-[8px] leading-tight md:text-[9px]">
                      {odds.size}
                    </span>
                  </button>
                ))}
              </div>
              {/* Lay Column */}
              <div className="flex flex-1 gap-[2px] p-[2px]">
                {team.lay.map((odds, idx) => (
                  <button
                    key={`lay-${idx}`}
                    onClick={() =>
                      handleOddsClick(
                        team.id,
                        team.name,
                        'lay',
                        odds.price,
                        odds.size,
                        idx,
                      )
                    }
                    className={`flex min-h-[44px] flex-1 flex-col items-center justify-center transition-all hover:brightness-95 ${
                      idx === 0
                        ? 'bg-[#FAA9BA]'
                        : idx === 1
                          ? 'bg-[#FBC4D0]'
                          : 'bg-[#FDDDE6]'
                    } ${odds.price === '0' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    disabled={odds.price === '0'}
                  >
                    <span className="text-xs font-bold md:text-sm">
                      {odds.price}
                    </span>
                    <span className="text-gray-700 text-[8px] leading-tight md:text-[9px]">
                      {odds.size}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inline Betting Slip */}
        <AnimatePresence>
          {activeBetSlip && activeBetSlip.startsWith(team.id) && (
            <InlineBettingSlip
              selection={
                bets.find((b) => b.uniqueId === activeBetSlip) ||
                ({
                  teamId: team.id,
                  teamName: team.name,
                  type: 'back',
                  price: team.back[0].price,
                  size: team.back[0].size,
                  index: 0,
                  uniqueId: activeBetSlip,
                } as BetSelection)
              }
              onCancel={() => handleCancelBet(activeBetSlip)}
              onPlaceBet={(stake) => {
                const selection = bets.find(
                  (b) => b.uniqueId === activeBetSlip,
                );
                if (selection) {
                  handlePlaceBet(selection, stake);
                }
              }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333]">
      {/* Top Banner Header */}
      <header className="top-0 z-50 flex flex-wrap items-center justify-between bg-[#2C110C] px-3 py-2 text-xs font-semibold text-white md:px-4 md:py-2 md:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm">
            Indian Premier League - Indian Premier League
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-xs md:text-sm">28/03/2026 19:30</span>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-2 md:p-4 lg:flex-row">
        {/* Main Content Area */}
        <main className="flex-1 space-y-4">
          {/* Market Section: IPL Winner Cup Bookmaker */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-3 py-2 text-white md:px-4"
              onClick={() => setIsBookmakerOpen(!isBookmakerOpen)}
            >
              <h2 className="text-sm font-bold uppercase tracking-tight md:text-base">
                IPL Winner Cup Bookmaker
              </h2>
              <motion.div
                animate={{rotate: isBookmakerOpen ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={18} className="md:h-5 md:w-5" />
              </motion.div>
            </header>

            <AnimatePresence>
              {isBookmakerOpen && (
                <motion.div
                  initial={{height: 0}}
                  animate={{height: 'auto'}}
                  exit={{height: 0}}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between border-b bg-[#F8F9FA] px-3 py-1 text-[9px] font-medium md:px-4 md:text-[10px]">
                    <div className="text-xs md:text-sm">
                      Min 100.00 | Max: 25000.00
                    </div>
                    <div className="flex gap-1">
                      <div className="flex w-[140px] md:w-[240px]">
                        <div className="flex-1 rounded-bl rounded-tl bg-[#72BBF4] py-1 text-center text-white">
                          Back
                        </div>
                        <div className="ml-[2px] flex-1 rounded-br rounded-tr bg-[#FAA9BA] py-1 text-center text-white">
                          Lay
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divide-gray-100 divide-y">
                    {TEAMS_DATA.map((team) => renderTeamRow(team, false))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Market Section: Winner */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-3 py-2 text-white md:px-4"
              onClick={() => setIsWinnerOpen(!isWinnerOpen)}
            >
              <h2 className="text-sm font-bold uppercase tracking-tight md:text-base">
                Winner
              </h2>
              <motion.div
                animate={{rotate: isWinnerOpen ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={18} className="md:h-5 md:w-5" />
              </motion.div>
            </header>

            <AnimatePresence>
              {isWinnerOpen && (
                <motion.div
                  initial={{height: 0}}
                  animate={{height: 'auto'}}
                  exit={{height: 0}}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between border-b bg-[#F8F9FA] px-3 py-1 text-[9px] font-medium md:px-4 md:text-[10px]">
                    <div className="text-xs md:text-sm">
                      Min 0.00 | Max: 0.00
                    </div>
                    <div className="flex gap-1">
                      <div className="flex w-[140px] md:w-[240px]">
                        <div className="flex-1 rounded-bl rounded-tl bg-[#72BBF4] py-1 text-center text-white">
                          Back
                        </div>
                        <div className="ml-[2px] flex-1 rounded-br rounded-tr bg-[#FAA9BA] py-1 text-center text-white">
                          Lay
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divide-gray-100 divide-y">
                    {WINNER_DATA.map((team) => renderTeamRow(team, true))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </main>

        {/* Sidebar - Matched Bet */}
        <aside className="w-full space-y-4 lg:w-[320px]">
          <div className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header className="flex items-center justify-between bg-[#ED6B31] px-3 py-2 text-white md:px-4">
              <h2 className="text-sm font-bold uppercase tracking-tight md:text-base">
                Matched Bet
              </h2>
              {bets.length > 0 && (
                <button
                  onClick={clearAllBets}
                  className="text-xs text-white underline hover:no-underline md:text-sm"
                >
                  Clear All
                </button>
              )}
            </header>
            <div className="max-h-[400px] overflow-y-auto">
              {bets.length === 0 ? (
                <div className="text-gray-500 p-8 text-center text-sm md:p-12 md:text-base">
                  No open bets
                </div>
              ) : (
                <div className="divide-gray-100 divide-y">
                  {bets.map((bet, idx) => (
                    <div
                      key={bet.uniqueId || idx}
                      className="hover:bg-gray-50 flex items-center justify-between p-3 md:p-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${getBetTypeColor(
                              bet.type,
                            )}`}
                          ></span>
                          <span className="text-sm font-semibold md:text-base">
                            {bet.teamName}
                          </span>
                        </div>
                        <div className="text-gray-600 mt-1 flex flex-wrap gap-2 text-xs md:gap-3">
                          <span className="capitalize">
                            {bet.type}: {bet.price}
                          </span>
                          <span>|</span>
                          <span>Size: {bet.size || '—'}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeBet(idx)}
                        className="text-gray-400 hover:bg-gray-100 rounded-full p-1 transition-colors hover:text-red-500"
                      >
                        <X size={16} className="md:h-5 md:w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Help/Info card */}
          <div className="border-gray-200 rounded border bg-white p-3 shadow-sm md:p-4">
            <div className="mb-2 flex items-center gap-2 text-[#ED6B31]">
              <Info size={16} className="md:h-5 md:w-5" />
              <h3 className="text-sm font-bold md:text-base">Rules & Info</h3>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed md:text-sm">
              Click on any odds cell to open the betting slip. Enter stake
              amount and click Place Bet to confirm. Back (Blue) means you think
              it will happen. Lay (Pink) means you think it won't.
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-16 lg:hidden"></div>
    </div>
  );
}
