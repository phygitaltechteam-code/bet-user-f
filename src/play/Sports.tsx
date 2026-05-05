import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Monitor, Tv, Flame, Trophy, Info, X, Minus, Plus} from 'lucide-react';

interface MatchOdds {
  one: [number | null, number | null];
  x: [number | null, number | null];
  two: [number | null, number | null];
}

interface Match {
  id: string;
  date: string;
  teamA: string;
  teamB: string;
  isLive?: boolean;
  hasBM?: boolean;
  hasF?: boolean;
  hasTV?: boolean;
  odds: MatchOdds;
}

interface BetSelection {
  matchId: string;
  matchName: string;
  selectionName: string;
  type: 'back' | 'lay';
  price: string;
  oddType: 'one' | 'x' | 'two';
  index: number;
  uniqueId: string;
  marketName: string;
}

const matches: Match[] = [
  {
    id: '1',
    date: '01 May 15:30',
    teamA: 'Leicestershire',
    teamB: 'Nottinghamshire',
    hasF: true,
    hasTV: true,
    odds: {
      one: [50, 400],
      x: [null, null],
      two: [1.01, 1.02],
    },
  },
  {
    id: '2',
    date: '01 May 15:30',
    teamA: 'Middlesex',
    teamB: 'Durham',
    hasF: true,
    hasTV: true,
    odds: {
      one: [2.82, 6],
      x: [null, null],
      two: [1.2, 1.55],
    },
  },
  {
    id: '3',
    date: '01 May 15:30',
    teamA: 'Surrey',
    teamB: 'Sussex',
    hasF: true,
    hasTV: true,
    odds: {
      one: [null, 1.02],
      x: [null, null],
      two: [100, null],
    },
  },
  {
    id: '4',
    date: '04 May 16:00',
    teamA: 'Pakistan W',
    teamB: 'Zimbabwe W',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [1.05, 1.06],
      x: [null, null],
      two: [17.5, 18.5],
    },
  },
  {
    id: '5',
    date: '04 May 19:30',
    teamA: 'Mumbai Indians',
    teamB: 'Lucknow Super Giants',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [1.67, 1.68],
      x: [null, null],
      two: [2.48, 2.5],
    },
  },
  {
    id: '6',
    date: '05 May 19:30',
    teamA: 'Delhi Capitals',
    teamB: 'Chennai Super Kings',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [1.9, 1.96],
      x: [null, null],
      two: [2.04, 2.12],
    },
  },
  {
    id: '7',
    date: '06 May 19:30',
    teamA: 'Sunrisers Hyderabad',
    teamB: 'Punjab Kings',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [2, 2.1],
      x: [null, null],
      two: [1.91, 2],
    },
  },
  {
    id: '8',
    date: '08 May 09:30',
    teamA: 'Bangladesh',
    teamB: 'Pakistan',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [3, 3.5],
      x: [7.8, 10.5],
      two: [1.67, 1.8],
    },
  },
  {
    id: '9',
    date: '09 May 19:30',
    teamA: 'Rajasthan Royals',
    teamB: 'Gujarat Titans',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [1.86, 1.88],
      x: [null, null],
      two: [2.14, 2.18],
    },
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
      <div className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-sm px-2 py-0.5 text-[10px] font-bold text-white ${
                selection.type === 'back' ? 'bg-[#72BBF4]' : 'bg-[#FAA9BA]'
              }`}
            >
              {selection.type.toUpperCase()}
            </span>
            <span className="text-gray-800 text-sm font-bold">
              {selection.selectionName}
            </span>
            <span className="text-gray-600 text-xs">@{selection.price}</span>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-red-500"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-xs font-bold">
              Stake Amount
            </span>
            <div className="flex items-center overflow-hidden rounded bg-[#333] text-white">
              <button
                onClick={() => {
                  const newVal = stake - 100;
                  if (newVal >= 0) setStakeValue(newVal.toString());
                }}
                className="hover:bg-gray-700 px-3 py-1"
              >
                <Minus size={12} />
              </button>
              <input
                value={stakeValue}
                onChange={(e) => setStakeValue(e.target.value)}
                className="w-16 bg-transparent py-1 text-center text-sm focus:outline-none"
                type="number"
              />
              <button
                onClick={() => setStakeValue((stake + 100).toString())}
                className="hover:bg-gray-700 px-3 py-1"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {stakes.slice(0, 6).map((s) => (
              <button
                key={s}
                onClick={() => setStakeValue(s.toString())}
                className="text-gray-800 rounded bg-[#86BEE8] px-2 py-1.5 text-xs font-bold shadow-sm transition-colors hover:bg-[#6FAEE0]"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-1">
            <div className="bg-gray-100 flex flex-1 items-center justify-between rounded px-3 py-2">
              <span className="text-gray-600 text-xs">Stake</span>
              <span className="text-gray-800 text-sm font-bold">
                ₹{stakeValue}
              </span>
            </div>
            <div className="bg-gray-100 flex flex-1 items-center justify-between rounded px-3 py-2">
              <span className="text-gray-600 text-xs">Profit</span>
              <span className="text-sm font-bold text-green-600">
                ₹{profit.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 rounded bg-[#FF4747] px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#E03E3E]"
          >
            Cancel
          </button>
          <button
            onClick={() => onPlaceBet(stake)}
            className="flex-1 rounded bg-[#008000] px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#006400]"
          >
            Place Bet
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Mobile Match Card Component - Stacked layout, NO horizontal scroll
const MobileMatchCard = ({
  match,
  onBackClick,
  onLayClick,
  activeBetSlip,
  activeSelection,
}: {
  match: Match;
  onBackClick: (
    matchId: string,
    matchName: string,
    price: string,
    oddType: string,
    index: number,
    selectionName: string,
  ) => void;
  onLayClick: (
    matchId: string,
    matchName: string,
    price: string,
    oddType: string,
    index: number,
    selectionName: string,
  ) => void;
  activeBetSlip: string | null;
  activeSelection: BetSelection | null;
}) => {
  const matchName = `${match.teamA} v ${match.teamB}`;
  const isActiveSlip =
    activeBetSlip && activeSelection && activeSelection.matchId === match.id;

  return (
    <div className="mb-3 overflow-hidden rounded-lg bg-white shadow-sm">
      {/* Match Header */}
      <div className="from-gray-50 border-gray-100 border-b bg-gradient-to-r to-white px-3 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {match.hasBM && (
              <div className="flex h-5 items-center justify-center rounded bg-[#1a237e] px-1.5 text-[9px] font-bold text-white">
                BM
              </div>
            )}
            {match.hasF && (
              <div className="flex h-5 items-center justify-center rounded bg-[#7b1fa2] px-1.5 text-[9px] font-bold italic text-white">
                F
              </div>
            )}
            {match.hasTV && (
              <div className="flex h-5 w-5 items-center justify-center rounded bg-[#2e7d32] text-white">
                <Tv className="h-3 w-3" />
              </div>
            )}
          </div>
          <span className="text-gray-500 text-[10px]">{match.date}</span>
        </div>
        <div className="mt-1.5">
          <span className="text-gray-800 text-sm font-bold">
            {match.teamA} v {match.teamB}
          </span>
        </div>
      </div>

      {/* Odds Section - Stacked Vertically */}
      <div className="divide-gray-100 divide-y p-3">
        {/* Home Team (1) */}
        <div className="pb-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[9px] font-bold text-white">
                1
              </div>
              <span className="text-gray-700 text-xs font-semibold">
                {match.teamA}
              </span>
            </div>
            <div className="text-gray-400 flex gap-2 text-[9px]">
              <span>Back</span>
              <span>Lay</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                match.odds.one[0] &&
                onBackClick(
                  match.id,
                  matchName,
                  match.odds.one[0]!.toString(),
                  'one',
                  0,
                  match.teamA,
                )
              }
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${
                match.odds.one[0]
                  ? 'bg-[#72c1e8] text-black hover:bg-[#5dafd6] active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!match.odds.one[0]}
            >
              {match.odds.one[0] || '-'}
            </button>
            <button
              onClick={() =>
                match.odds.one[1] &&
                onLayClick(
                  match.id,
                  matchName,
                  match.odds.one[1]!.toString(),
                  'one',
                  1,
                  match.teamA,
                )
              }
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${
                match.odds.one[1]
                  ? 'bg-[#f48fb1] text-black hover:bg-[#f06292] active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!match.odds.one[1]}
            >
              {match.odds.one[1] || '-'}
            </button>
          </div>
        </div>

        {/* Draw (X) - Only show if odds exist */}
        {(match.odds.x[0] || match.odds.x[1]) && (
          <div className="py-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[9px] font-bold text-white">
                  X
                </div>
                <span className="text-gray-700 text-xs font-semibold">
                  Draw
                </span>
              </div>
              <div className="text-gray-400 flex gap-2 text-[9px]">
                <span>Back</span>
                <span>Lay</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  match.odds.x[0] &&
                  onBackClick(
                    match.id,
                    matchName,
                    match.odds.x[0]!.toString(),
                    'x',
                    0,
                    'Draw',
                  )
                }
                className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${
                  match.odds.x[0]
                    ? 'bg-[#72c1e8] text-black hover:bg-[#5dafd6] active:scale-95'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!match.odds.x[0]}
              >
                {match.odds.x[0] || '-'}
              </button>
              <button
                onClick={() =>
                  match.odds.x[1] &&
                  onLayClick(
                    match.id,
                    matchName,
                    match.odds.x[1]!.toString(),
                    'x',
                    1,
                    'Draw',
                  )
                }
                className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${
                  match.odds.x[1]
                    ? 'bg-[#f48fb1] text-black hover:bg-[#f06292] active:scale-95'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!match.odds.x[1]}
              >
                {match.odds.x[1] || '-'}
              </button>
            </div>
          </div>
        )}

        {/* Away Team (2) */}
        <div className="pt-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[9px] font-bold text-white">
                2
              </div>
              <span className="text-gray-700 text-xs font-semibold">
                {match.teamB}
              </span>
            </div>
            <div className="text-gray-400 flex gap-2 text-[9px]">
              <span>Back</span>
              <span>Lay</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                match.odds.two[0] &&
                onBackClick(
                  match.id,
                  matchName,
                  match.odds.two[0]!.toString(),
                  'two',
                  0,
                  match.teamB,
                )
              }
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${
                match.odds.two[0]
                  ? 'bg-[#72c1e8] text-black hover:bg-[#5dafd6] active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!match.odds.two[0]}
            >
              {match.odds.two[0] || '-'}
            </button>
            <button
              onClick={() =>
                match.odds.two[1] &&
                onLayClick(
                  match.id,
                  matchName,
                  match.odds.two[1]!.toString(),
                  'two',
                  1,
                  match.teamB,
                )
              }
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${
                match.odds.two[1]
                  ? 'bg-[#f48fb1] text-black hover:bg-[#f06292] active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!match.odds.two[1]}
            >
              {match.odds.two[1] || '-'}
            </button>
          </div>
        </div>
      </div>

      {/* Inline Betting Slip */}
      <AnimatePresence>
        {isActiveSlip && activeSelection && (
          <InlineBettingSlip
            selection={activeSelection}
            onCancel={() => {}}
            onPlaceBet={(stake) => {}}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Desktop Odds Row Component (Horizontal Layout)
const DesktopOddsRow = ({
  match,
  onBackClick,
  onLayClick,
}: {
  match: Match;
  onBackClick: (
    matchId: string,
    matchName: string,
    price: string,
    oddType: string,
    index: number,
    selectionName: string,
  ) => void;
  onLayClick: (
    matchId: string,
    matchName: string,
    price: string,
    oddType: string,
    index: number,
    selectionName: string,
  ) => void;
}) => {
  const matchName = `${match.teamA} v ${match.teamB}`;

  return (
    <div className="border-gray-100 hover:bg-gray-50 flex items-center border-b transition-colors">
      <div className="flex flex-[3] items-center gap-3 p-3">
        <div className="min-w-[120px] whitespace-nowrap text-xs font-bold">
          <span className="text-gray-800">{match.date}</span>
          <span className="text-gray-300 mx-2">|</span>
          <span className="font-extrabold text-black">
            {match.teamA} v {match.teamB}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {match.hasBM && (
            <div className="flex h-5 min-w-[20px] items-center justify-center rounded bg-[#1a237e] px-1 text-[10px] font-bold text-white">
              BM
            </div>
          )}
          {match.hasF && (
            <div className="flex h-5 min-w-[20px] items-center justify-center rounded bg-[#7b1fa2] px-1 text-[10px] font-bold italic text-white">
              F
            </div>
          )}
          {match.hasTV && (
            <div className="flex h-5 min-w-[20px] items-center justify-center rounded bg-[#2e7d32] px-1 text-[10px] font-bold text-white">
              <Tv className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-[2] justify-end">
        <div className="grid w-full max-w-[450px] grid-cols-3 gap-1 p-2">
          <div className="flex gap-1">
            <button
              onClick={() =>
                match.odds.one[0] &&
                onBackClick(
                  match.id,
                  matchName,
                  match.odds.one[0]!.toString(),
                  'one',
                  0,
                  match.teamA,
                )
              }
              className={`flex h-9 flex-1 items-center justify-center rounded-sm text-xs font-bold transition-all ${
                match.odds.one[0]
                  ? 'cursor-pointer bg-[#90caf9] text-black shadow-sm hover:bg-[#64b5f6] active:scale-95'
                  : 'cursor-default bg-[#e3f2fd] opacity-40'
              }`}
              disabled={!match.odds.one[0]}
            >
              {match.odds.one[0] || '-'}
            </button>
            <button
              onClick={() =>
                match.odds.one[1] &&
                onLayClick(
                  match.id,
                  matchName,
                  match.odds.one[1]!.toString(),
                  'one',
                  1,
                  match.teamA,
                )
              }
              className={`flex h-9 flex-1 items-center justify-center rounded-sm text-xs font-bold transition-all ${
                match.odds.one[1]
                  ? 'cursor-pointer bg-[#f48fb1] text-black shadow-sm hover:bg-[#f06292] active:scale-95'
                  : 'cursor-default bg-[#fce4ec] opacity-40'
              }`}
              disabled={!match.odds.one[1]}
            >
              {match.odds.one[1] || '-'}
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() =>
                match.odds.x[0] &&
                onBackClick(
                  match.id,
                  matchName,
                  match.odds.x[0]!.toString(),
                  'x',
                  0,
                  'Draw',
                )
              }
              className={`flex h-9 flex-1 items-center justify-center rounded-sm text-xs font-bold transition-all ${
                match.odds.x[0]
                  ? 'cursor-pointer bg-[#90caf9] text-black shadow-sm hover:bg-[#64b5f6] active:scale-95'
                  : 'cursor-default bg-[#e3f2fd] opacity-40'
              }`}
              disabled={!match.odds.x[0]}
            >
              {match.odds.x[0] || '-'}
            </button>
            <button
              onClick={() =>
                match.odds.x[1] &&
                onLayClick(
                  match.id,
                  matchName,
                  match.odds.x[1]!.toString(),
                  'x',
                  1,
                  'Draw',
                )
              }
              className={`flex h-9 flex-1 items-center justify-center rounded-sm text-xs font-bold transition-all ${
                match.odds.x[1]
                  ? 'cursor-pointer bg-[#f48fb1] text-black shadow-sm hover:bg-[#f06292] active:scale-95'
                  : 'cursor-default bg-[#fce4ec] opacity-40'
              }`}
              disabled={!match.odds.x[1]}
            >
              {match.odds.x[1] || '-'}
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() =>
                match.odds.two[0] &&
                onBackClick(
                  match.id,
                  matchName,
                  match.odds.two[0]!.toString(),
                  'two',
                  0,
                  match.teamB,
                )
              }
              className={`flex h-9 flex-1 items-center justify-center rounded-sm text-xs font-bold transition-all ${
                match.odds.two[0]
                  ? 'cursor-pointer bg-[#90caf9] text-black shadow-sm hover:bg-[#64b5f6] active:scale-95'
                  : 'cursor-default bg-[#e3f2fd] opacity-40'
              }`}
              disabled={!match.odds.two[0]}
            >
              {match.odds.two[0] || '-'}
            </button>
            <button
              onClick={() =>
                match.odds.two[1] &&
                onLayClick(
                  match.id,
                  matchName,
                  match.odds.two[1]!.toString(),
                  'two',
                  1,
                  match.teamB,
                )
              }
              className={`flex h-9 flex-1 items-center justify-center rounded-sm text-xs font-bold transition-all ${
                match.odds.two[1]
                  ? 'cursor-pointer bg-[#f48fb1] text-black shadow-sm hover:bg-[#f06292] active:scale-95'
                  : 'cursor-default bg-[#fce4ec] opacity-40'
              }`}
              disabled={!match.odds.two[1]}
            >
              {match.odds.two[1] || '-'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Sports() {
  const [bets, setBets] = useState<BetSelection[]>([]);
  const [activeBetSlip, setActiveBetSlip] = useState<string | null>(null);
  const [activeSelection, setActiveSelection] = useState<BetSelection | null>(
    null,
  );

  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleBackClick = (
    matchId: string,
    matchName: string,
    price: string,
    oddType: string,
    index: number,
    selectionName: string,
  ) => {
    const uniqueId = generateUniqueId();
    const newBet: BetSelection = {
      matchId,
      matchName,
      selectionName,
      type: 'back',
      price,
      oddType: oddType as 'one' | 'x' | 'two',
      index,
      uniqueId,
      marketName: matchName,
    };
    setActiveSelection(newBet);
    setActiveBetSlip(uniqueId);
  };

  const handleLayClick = (
    matchId: string,
    matchName: string,
    price: string,
    oddType: string,
    index: number,
    selectionName: string,
  ) => {
    const uniqueId = generateUniqueId();
    const newBet: BetSelection = {
      matchId,
      matchName,
      selectionName,
      type: 'lay',
      price,
      oddType: oddType as 'one' | 'x' | 'two',
      index,
      uniqueId,
      marketName: matchName,
    };
    setActiveSelection(newBet);
    setActiveBetSlip(uniqueId);
  };

  const handleCancelBet = () => {
    setActiveBetSlip(null);
    setActiveSelection(null);
  };

  const handlePlaceBet = (selection: BetSelection, stake: number) => {
    setBets((prev) => [...prev, selection]);
    setActiveBetSlip(null);
    setActiveSelection(null);
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

  return (
    <div className="min-h-screen w-full bg-[#f4f4f4] font-sans text-[#1a1a1a]">
      {/* Top Header */}
      <div className="flex items-center gap-2 bg-[#e65100] px-4 py-3 text-white shadow-md">
        <Trophy className="h-5 w-5" />
        <h1 className="text-lg font-bold tracking-tight">Cricket</h1>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-2 md:p-4 lg:flex-row">
        {/* Main Content Area */}
        <main className="flex-1">
          {/* Desktop View - Horizontal table layout */}
          <div className="hidden overflow-hidden rounded-lg bg-white shadow-sm lg:block">
            <div className="border-gray-200 flex items-center border-b">
              <div className="flex flex-[3] items-center gap-2 p-3">
                <span className="flex items-center gap-1 rounded bg-[#d32f2f] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                  <Flame className="h-3 w-3" />
                  Live
                </span>
                <h2 className="text-sm font-bold">Indian Premier League</h2>
              </div>
              <div className="flex flex-[2] justify-end">
                <div className="grid w-full max-w-[450px] grid-cols-3 gap-1 px-3">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-400 mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                      1
                    </div>
                    <div className="h-6 w-full rounded-t-sm bg-[#64b5f6]"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-400 mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                      X
                    </div>
                    <div className="h-6 w-full rounded-t-sm bg-[#64b5f6]"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-400 mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                      2
                    </div>
                    <div className="h-6 w-full rounded-t-sm bg-[#64b5f6]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {matches.map((match) => (
                <div key={match.id}>
                  <DesktopOddsRow
                    match={match}
                    onBackClick={handleBackClick}
                    onLayClick={handleLayClick}
                  />
                  <AnimatePresence>
                    {activeBetSlip &&
                      activeSelection &&
                      activeSelection.matchId === match.id && (
                        <InlineBettingSlip
                          selection={activeSelection}
                          onCancel={handleCancelBet}
                          onPlaceBet={(stake) =>
                            activeSelection &&
                            handlePlaceBet(activeSelection, stake)
                          }
                        />
                      )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - Card based, NO horizontal scroll, fits on one page */}
          <div className="space-y-3 lg:hidden">
            {matches.map((match) => (
              <MobileMatchCard
                key={match.id}
                match={match}
                onBackClick={handleBackClick}
                onLayClick={handleLayClick}
                activeBetSlip={activeBetSlip}
                activeSelection={activeSelection}
              />
            ))}
          </div>
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
                            className={`inline-block h-2 w-2 rounded-full ${getBetTypeColor(bet.type)}`}
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
