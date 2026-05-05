import React, {useState} from 'react';
import {ChevronDown, Info, X, Minus, Plus} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';

interface OddsValue {
  price: string;
  size: string;
}

interface TennisOdds {
  id: string;
  name: string;
  back: [OddsValue, OddsValue, OddsValue];
  lay: [OddsValue, OddsValue, OddsValue];
}

interface BetSelection {
  selectionId: string;
  selectionName: string;
  type: 'back' | 'lay';
  price: string;
  size: string;
  index: number;
  uniqueId: string;
  marketName: string;
}

const MATCH_ODDS_DATA: TennisOdds[] = [
  {
    id: 'match-1',
    name: 'Katherine Sebov',
    back: [
      {price: '1.29', size: '276.83'},
      {price: '1.30', size: '279.83'},
      {price: '1.31', size: '5.95'},
    ],
    lay: [
      {price: '1.46', size: '10.85'},
      {price: '1.47', size: '76.74'},
      {price: '1.48', size: '28.49'},
    ],
  },
  {
    id: 'match-2',
    name: 'Dalila Jakupovic',
    back: [
      {price: '3.10', size: '13.60'},
      {price: '3.15', size: '35.81'},
      {price: '3.20', size: '4.95'},
    ],
    lay: [
      {price: '4.30', size: '1.81'},
      {price: '4.40', size: '82.68'},
      {price: '4.50', size: '79.36'},
    ],
  },
];

const SET_BETTING_DATA: TennisOdds[] = [
  {
    id: 'set-1',
    name: 'Katherine Sebov to win 1st Set',
    back: [
      {price: '1.85', size: '124.50'},
      {price: '1.86', size: '98.30'},
      {price: '1.87', size: '45.20'},
    ],
    lay: [
      {price: '1.88', size: '67.80'},
      {price: '1.89', size: '112.40'},
      {price: '1.90', size: '89.30'},
    ],
  },
  {
    id: 'set-2',
    name: 'Dalila Jakupovic to win 1st Set',
    back: [
      {price: '2.10', size: '87.60'},
      {price: '2.11', size: '54.20'},
      {price: '2.12', size: '32.10'},
    ],
    lay: [
      {price: '2.13', size: '45.80'},
      {price: '2.14', size: '78.90'},
      {price: '2.15', size: '92.40'},
    ],
  },
];

// Inline Betting Slip Component (same as IndianPremium)
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
              {selection.selectionName}
            </span>
            <span className="text-gray-600 text-[10px] sm:text-xs">
              @ {selection.price}
            </span>
          </div>
          <div className="text-gray-600 flex flex-wrap items-center gap-1 text-[8px] uppercase tracking-tight sm:gap-2 sm:text-[10px]">
            <span className="hidden sm:inline">{selection.marketName}</span>
            <span className="hidden sm:inline">&gt;</span>
            <span className="text-gray-900 line-clamp-1 font-extrabold">
              {selection.selectionName}
            </span>
            <span className="whitespace-nowrap rounded bg-white/50 px-1 text-[8px] sm:text-[10px]">
              Min 100 | Max 10000
            </span>
          </div>
        </div>

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

export default function Tennis() {
  const [isMatchOddsOpen, setIsMatchOddsOpen] = useState(true);
  const [isSetBettingOpen, setIsSetBettingOpen] = useState(true);
  const [bets, setBets] = useState<BetSelection[]>([]);
  const [activeBetSlip, setActiveBetSlip] = useState<string | null>(null);

  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleOddsClick = (
    selectionId: string,
    selectionName: string,
    type: 'back' | 'lay',
    price: string,
    size: string,
    index: number,
    marketName: string,
  ) => {
    if (!price || price === '') return;

    const uniqueId = generateUniqueId();
    const newBet: BetSelection = {
      selectionId,
      selectionName,
      type,
      price,
      size,
      index,
      uniqueId,
      marketName,
    };

    setActiveBetSlip(uniqueId);
  };

  const handleCancelBet = (uniqueId: string) => {
    setActiveBetSlip(null);
  };

  const handlePlaceBet = (selection: BetSelection, stake: number) => {
    setBets((prev) => [...prev, selection]);
    setActiveBetSlip(null);
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

  // Render team row with inline betting slip (same as IndianPremium)
  const renderTennisRow = (item: TennisOdds, marketName: string) => {
    return (
      <div key={item.id}>
        <div className="hover:bg-gray-50 flex flex-col items-stretch transition-colors sm:flex-row">
          <div className="flex flex-1 items-center px-3 py-2 text-xs font-bold sm:px-4 sm:py-3 sm:text-sm">
            <span className="break-words">{item.name}</span>
          </div>
          <div className="flex justify-end">
            <div className="flex w-[280px] sm:w-[360px] md:w-[480px]">
              {/* Back Column */}
              <div className="flex flex-1 gap-[2px] p-[2px]">
                {item.back.map((odds, idx) => (
                  <button
                    key={`back-${idx}`}
                    onClick={() =>
                      handleOddsClick(
                        item.id,
                        item.name,
                        'back',
                        odds.price,
                        odds.size,
                        idx,
                        marketName,
                      )
                    }
                    className={`flex min-h-[44px] flex-1 flex-col items-center justify-center transition-all hover:brightness-95 ${
                      idx === 2
                        ? 'bg-[#72BBF4]'
                        : idx === 1
                          ? 'bg-[#8ACCF5]'
                          : 'bg-[#A3D9F7]'
                    }`}
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
                {item.lay.map((odds, idx) => (
                  <button
                    key={`lay-${idx}`}
                    onClick={() =>
                      handleOddsClick(
                        item.id,
                        item.name,
                        'lay',
                        odds.price,
                        odds.size,
                        idx,
                        marketName,
                      )
                    }
                    className={`flex min-h-[44px] flex-1 flex-col items-center justify-center transition-all hover:brightness-95 ${
                      idx === 0
                        ? 'bg-[#FAA9BA]'
                        : idx === 1
                          ? 'bg-[#FBC4D0]'
                          : 'bg-[#FDDDE6]'
                    }`}
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
          {activeBetSlip && activeBetSlip.startsWith(item.id) && (
            <InlineBettingSlip
              selection={{
                selectionId: item.id,
                selectionName: item.name,
                type: 'back',
                price: item.back[0].price,
                size: item.back[0].size,
                index: 0,
                uniqueId: activeBetSlip,
                marketName: marketName,
              }}
              onCancel={() => handleCancelBet(activeBetSlip)}
              onPlaceBet={(stake) => {
                const selection = {
                  selectionId: item.id,
                  selectionName: item.name,
                  type: 'back' as const,
                  price: item.back[0].price,
                  size: item.back[0].size,
                  index: 0,
                  uniqueId: activeBetSlip,
                  marketName: marketName,
                };
                handlePlaceBet(selection, stake);
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
            Kat Sebov v Jakupovic - WTA Istanbul 2026
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-xs md:text-sm">04/05/2026 12:30</span>
          <button className="hover:bg-gray-800 rounded bg-black px-2 py-0.5 text-[9px] font-bold text-green-400 transition-colors md:px-3 md:text-[10px]">
            Cash Out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-2 md:p-4 lg:flex-row">
        {/* Main Content Area */}
        <main className="flex-1 space-y-4">
          {/* Market Section: Match Odds */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-3 py-2 text-white md:px-4"
              onClick={() => setIsMatchOddsOpen(!isMatchOddsOpen)}
            >
              <h2 className="text-sm font-bold uppercase tracking-tight md:text-base">
                Match Odds
              </h2>
              <motion.div
                animate={{rotate: isMatchOddsOpen ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={18} className="md:h-5 md:w-5" />
              </motion.div>
            </header>

            <AnimatePresence>
              {isMatchOddsOpen && (
                <motion.div
                  initial={{height: 0}}
                  animate={{height: 'auto'}}
                  exit={{height: 0}}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between border-b bg-[#F8F9FA] px-3 py-1 text-[9px] font-medium md:px-4 md:text-[10px]">
                    <div className="text-xs md:text-sm">
                      Min 100.00 | Max: 10000.00
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
                    {MATCH_ODDS_DATA.map((player) =>
                      renderTennisRow(player, 'Match Odds'),
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Market Section: Set Betting */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-3 py-2 text-white md:px-4"
              onClick={() => setIsSetBettingOpen(!isSetBettingOpen)}
            >
              <h2 className="text-sm font-bold uppercase tracking-tight md:text-base">
                Set Betting
              </h2>
              <motion.div
                animate={{rotate: isSetBettingOpen ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={18} className="md:h-5 md:w-5" />
              </motion.div>
            </header>

            <AnimatePresence>
              {isSetBettingOpen && (
                <motion.div
                  initial={{height: 0}}
                  animate={{height: 'auto'}}
                  exit={{height: 0}}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between border-b bg-[#F8F9FA] px-3 py-1 text-[9px] font-medium md:px-4 md:text-[10px]">
                    <div className="text-xs md:text-sm">
                      Min 100.00 | Max: 10000.00
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
                    {SET_BETTING_DATA.map((market) =>
                      renderTennisRow(market, 'Set Betting'),
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Info Message */}
          <div className="border-gray-200 rounded border bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 text-[10px] font-bold text-red-600 md:text-xs">
              <Info size={14} />
              <span>WRONG TRADE BETS ONLY PROFIT BETS VOID HOGI</span>
            </div>
          </div>
        </main>

        {/* Sidebar - Matched Bet (same as IndianPremium) */}
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
                            {bet.selectionName}
                          </span>
                        </div>
                        <div className="text-gray-600 mt-1 flex flex-wrap gap-2 text-xs md:gap-3">
                          <span>{bet.marketName}</span>
                          <span>|</span>
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
