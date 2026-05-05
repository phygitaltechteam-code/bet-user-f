import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronDown, Info, Clock, ExternalLink} from 'lucide-react';

// Types for the interface
interface OddsData {
  back: {price: string; size: string}[];
  lay: {price: string; size: string}[];
}

interface MarketRowProps {
  title: string;
  odds: OddsData;
  isSuspended?: boolean;
}

const MarketRow: React.FC<MarketRowProps> = ({title, odds, isSuspended}) => {
  return (
    <div className="border-gray-200 grid grid-cols-[1fr,60px,60px,60px,60px,60px,60px] items-center border-b bg-white py-2">
      <div className="text-gray-800 pl-4 text-sm font-semibold">{title}</div>
      {isSuspended ? (
        <div className="bg-gray-600 col-span-6 flex h-full items-center justify-center text-xs font-bold tracking-widest text-white">
          — SUSPENDED —
        </div>
      ) : (
        <>
          {/* Back columns */}
          {odds.back.map((item, idx) => (
            <div
              key={`back-${idx}`}
              className={`border-gray-100 flex h-10 cursor-pointer flex-col items-center justify-center border transition-colors ${
                idx === 2
                  ? 'bg-[#93c5fd] hover:bg-blue-400'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-[13px] font-bold leading-tight">
                {item.price}
              </span>
              <span className="text-gray-600 text-[9px] leading-tight">
                {item.size}
              </span>
            </div>
          ))}
          {/* Lay columns */}
          {odds.lay.map((item, idx) => (
            <div
              key={`lay-${idx}`}
              className={`border-gray-100 flex h-10 cursor-pointer flex-col items-center justify-center border transition-colors ${
                idx === 0
                  ? 'bg-[#fecaca] hover:bg-red-300'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-[13px] font-bold leading-tight">
                {item.price}
              </span>
              <span className="text-gray-600 text-[9px] leading-tight">
                {item.size}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const SectionHeader: React.FC<{
  title: string;
  minMax?: string;
  showCashOut?: boolean;
}> = ({title, minMax, showCashOut = true}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between bg-[#ea580c] px-3 py-1.5 text-sm font-semibold text-white">
        <span>{title}</span>
        <div className="flex items-center gap-2">
          {showCashOut && (
            <div className="flex cursor-pointer items-center gap-0 rounded bg-[#262626] px-2 py-0.5">
              <span className="mr-1 text-[11px] font-bold">Cash Out</span>
              <ChevronDown size={14} />
            </div>
          )}
          <ChevronDown size={14} className="cursor-pointer" />
        </div>
      </div>
      {minMax && (
        <div className="bg-gray-50 text-gray-500 border-gray-200 flex items-center justify-between border-b px-4 py-1 text-[10px]">
          <span>{minMax}</span>
          <div className="flex gap-12">
            <span className="w-[180px] text-center font-bold uppercase tracking-wider text-blue-600">
              Back
            </span>
            <span className="w-[180px] text-center font-bold uppercase tracking-wider text-pink-600">
              Lay
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CricketEvent2() {
  const [activeFancyTab, setActiveFancyTab] = useState('All');

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans selection:bg-orange-200">
      {/* Site Header */}
      <header className="flex items-center justify-between border-b border-orange-600 bg-[#1a1a1a] p-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-tight">
            Rajasthan Royals v Delhi Capitals - Indian Premier League
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs opacity-90">
          <Clock size={12} />
          <span>01/05/2026 19:30</span>
        </div>
      </header>

      <main className="flex flex-col gap-4 p-4 lg:flex-row">
        {/* Left Column: Markets */}
        <div className="flex flex-1 flex-col gap-4 overflow-hidden">
          {/* Match Odds Section */}
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            className="overflow-hidden rounded shadow-md"
          >
            <SectionHeader title="Match Odds" minMax="Min 1.00 | Max: 0.00" />
            <MarketRow
              title="Rajasthan Royals"
              odds={{
                back: [
                  {price: '1.73', size: '11.9K'},
                  {price: '1.74', size: '5.9K'},
                  {price: '1.75', size: '635.10'},
                ],
                lay: [
                  {price: '1.76', size: '1.5K'},
                  {price: '1.77', size: '6.2K'},
                  {price: '1.78', size: '11.3K'},
                ],
              }}
            />
            <MarketRow
              title="Delhi Capitals"
              odds={{
                back: [
                  {price: '2.28', size: '13.4K'},
                  {price: '2.3', size: '2.5K'},
                  {price: '2.32', size: '566.52'},
                ],
                lay: [
                  {price: '2.34', size: '1.2K'},
                  {price: '2.36', size: '3.8K'},
                  {price: '2.38', size: '8.6K'},
                ],
              }}
            />
            <div className="flex items-center gap-1 bg-white p-2 text-[10px] font-medium text-red-600">
              <Info size={10} />
              <span>Stop Watching, Start Winning — Place Your Bet Now.</span>
            </div>
          </motion.div>

          {/* To Win The Toss 1 Section */}
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.1}}
            className="overflow-hidden rounded shadow-md"
          >
            <SectionHeader
              title="To Win The Toss 1"
              minMax="Min 100.00 | Max: 10000.00"
            />
            <MarketRow
              title="Rajasthan Royals"
              odds={{
                back: [
                  {price: '96', size: '-'},
                  {price: '97', size: '-'},
                  {price: '98', size: '-'},
                ],
                lay: [
                  {price: '-', size: '-'},
                  {price: '-', size: '-'},
                  {price: '-', size: '-'},
                ],
              }}
            />
            <MarketRow
              title="Delhi Capitals"
              odds={{
                back: [
                  {price: '96', size: '-'},
                  {price: '97', size: '-'},
                  {price: '98', size: '-'},
                ],
                lay: [
                  {price: '-', size: '-'},
                  {price: '-', size: '-'},
                  {price: '-', size: '-'},
                ],
              }}
            />
          </motion.div>

          {/* Bookmaker 0 Commission Section */}
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2}}
            className="overflow-hidden rounded shadow-md"
          >
            <SectionHeader
              title="Bookmaker 0 Commission"
              minMax="Min 100.00 | Max: 100000.00"
            />
            <MarketRow
              title="Rajasthan Royals"
              odds={{
                back: [
                  {price: '72', size: '-'},
                  {price: '73', size: '-'},
                  {price: '74', size: '-'},
                ],
                lay: [
                  {price: '78', size: '-'},
                  {price: '79', size: '-'},
                  {price: '80', size: '-'},
                ],
              }}
            />
            <MarketRow
              title="Delhi Capitals"
              odds={{
                back: [],
                lay: [],
              }}
              isSuspended
            />
            <div className="flex items-center justify-center gap-1 bg-white p-2 text-[10px] font-medium text-red-600">
              <Info size={10} />
              <span>
                Think Smart, Bet Smarter — This Match Is Going All The Way!
              </span>
            </div>
          </motion.div>

          {/* Fancy Section */}
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3}}
            className="overflow-hidden rounded shadow-md"
          >
            <SectionHeader title="Fancy" showCashOut={false} />
            <div className="border-gray-200 flex gap-4 border-b bg-white px-2 pt-2">
              {['All', 'OVERS(13)', 'BATSMAN(78)'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFancyTab(tab)}
                  className={`border-b-2 px-3 py-1 text-[11px] font-bold uppercase transition-all ${
                    activeFancyTab === tab
                      ? 'border-orange-600 text-orange-600'
                      : 'text-gray-500 hover:text-gray-700 border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white">
              {/* Fancy Odds Header */}
              <div className="bg-gray-50 border-gray-100 grid grid-cols-[1fr,120px,120px,120px] items-center border-b">
                <div className="text-gray-400 px-4 py-1 text-[10px]">
                  Fancy Market
                </div>
                <div className="text-gray-700 flex h-full items-center justify-center bg-red-200 text-[10px] font-bold">
                  No
                </div>
                <div className="text-gray-700 flex h-full items-center justify-center bg-blue-200 text-[10px] font-bold">
                  Yes
                </div>
                <div className="text-gray-400 px-4 py-1 text-center text-[10px]">
                  Min / Max
                </div>
              </div>

              {/* Fancy Rows Example */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFancyTab}
                  initial={{opacity: 0, x: -10}}
                  animate={{opacity: 1, x: 0}}
                  exit={{opacity: 0, x: 10}}
                  className="divide-gray-100 divide-y"
                >
                  {[
                    {
                      title:
                        activeFancyTab === 'BATSMAN(78)'
                          ? '1st WKT RR ADV.'
                          : 'Lunch Favourite ADV.',
                      no: '27',
                      yes: '27',
                      low: '110',
                      high: '90',
                    },
                    {
                      title:
                        activeFancyTab === 'BATSMAN(78)'
                          ? '1st WKT DC ADV.'
                          : '4 Over RR ADV.',
                      no: '23',
                      yes: '23',
                      low: '110',
                      high: '90',
                    },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="grid h-14 grid-cols-[1fr,120px,120px,120px] items-center py-2"
                    >
                      <div className="text-gray-800 px-4 text-[13px] font-bold">
                        {row.title}
                      </div>
                      <div className="flex h-full cursor-pointer flex-col items-center justify-center border-l border-white bg-red-100 transition-colors hover:bg-red-200">
                        <span className="text-sm font-bold">{row.no}</span>
                        <span className="text-gray-500 text-[10px]">
                          {row.low}
                        </span>
                      </div>
                      <div className="flex h-full cursor-pointer flex-col items-center justify-center border-l border-white bg-blue-100 transition-colors hover:bg-blue-200">
                        <span className="text-sm font-bold">{row.yes}</span>
                        <span className="text-gray-500 text-[10px]">
                          {row.high}
                        </span>
                      </div>
                      <div className="text-gray-400 flex flex-col items-center justify-center text-[10px]">
                        <span>Min / Max</span>
                        <span className="text-gray-500 font-semibold">
                          100.00 / 25K
                        </span>
                      </div>
                    </div>
                  ))}

                  {activeFancyTab === 'BATSMAN(78)' && (
                    <div className="grid h-14 grid-cols-[1fr,120px,120px,120px] items-center py-2">
                      <div className="text-gray-800 px-4 text-[13px] font-bold">
                        1st 2 WKT RR ADV.
                      </div>
                      <div className="flex h-full cursor-pointer flex-col items-center justify-center border-l border-white bg-red-100 transition-colors hover:bg-red-200">
                        <span className="text-sm font-bold">65</span>
                        <span className="text-gray-500 text-[10px]">110</span>
                      </div>
                      <div className="flex h-full cursor-pointer flex-col items-center justify-center border-l border-white bg-blue-100 transition-colors hover:bg-blue-200">
                        <span className="text-sm font-bold">65</span>
                        <span className="text-gray-500 text-[10px]">90</span>
                      </div>
                      <div className="text-gray-400 flex flex-col items-center justify-center text-[10px]">
                        <span>Min / Max</span>
                        <span className="text-gray-500 font-semibold">
                          100.00 / 25K
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="border-gray-100 flex items-center justify-center gap-1 border-t bg-white p-2 text-[10px] font-medium text-green-700">
              <Info size={10} />
              <span>
                IPL Winner Cup Bookmaker Bets Started In Our Exchange 🎉🏏🎉
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="flex flex-col gap-4 lg:w-80">
          <div className="overflow-hidden rounded bg-white shadow-md">
            <div className="flex items-center justify-between bg-orange-600 px-3 py-2 text-sm font-bold text-white">
              <span>Matched Bet</span>
            </div>
            <div className="flex items-center justify-center bg-white p-12">
              <span className="text-gray-400 text-sm font-medium">
                No open bets
              </span>
            </div>
          </div>

          <div className="border-gray-200 rounded border bg-white p-4 shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-gray-700 text-xs font-bold uppercase">
                Live Support
              </span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
            </div>
            <p className="text-gray-500 mb-3 text-[11px] leading-relaxed">
              Need help with your bets? Our specialist team is online 24/7.
            </p>
            <button className="flex w-full items-center justify-center gap-2 rounded bg-[#1a1a1a] py-2 text-[11px] font-bold text-white transition-colors hover:bg-orange-600">
              Join Chat <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Footer Placeholder if needed, but the image shows a desktop view */}
      <footer className="text-gray-400 mt-12 bg-[#1a1a1a] py-8 text-center text-[11px]">
        <div className="mx-auto max-w-4xl px-4">
          <p>
            © 2026 Cricket Exchange. All Rights Reserved. Please gamble
            responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
}
