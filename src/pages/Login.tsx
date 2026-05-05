import React, {useState} from 'react';
import {
  Eye,
  EyeOff,
  X,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from 'lucide-react';
import {motion} from 'framer-motion';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('ak91');
  const [password, setPassword] = useState('password');

  const orangeColor = '#ff4d00';

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center p-4 font-sans">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="relative w-full max-w-md overflow-hidden rounded-xl border-2 border-[#ff4d00] bg-white shadow-2xl"
      >
        {/* Close Button */}
        <button className="hover:bg-gray-100 absolute right-4 top-4 rounded-full p-1 text-black transition-colors">
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="pb-2 pt-6 text-center">
          <h1 className="text-2xl font-bold text-[#ff4d00]">Login</h1>
          <div className="mt-4 h-1 w-full bg-[#ff4d00] shadow-sm" />
        </div>

        <div className="space-y-6 p-8">
          {/* User ID Field */}
          <div className="space-y-1">
            <div className="border-gray-100 relative border-b pb-1">
              <label className="text-gray-500 ml-3 text-xs font-medium">
                User ID
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-[#eef2ff] px-3 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#ff4d00]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="relative">
              <label className="text-gray-500 ml-3 text-xs font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-[#eef2ff] px-3 py-2 pr-10 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#ff4d00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 transition-colors hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="h-5 w-5 cursor-pointer rounded border-2 border-slate-800 accent-[#ff4d00] transition-all checked:bg-[#ff4d00]"
            />
            <label
              htmlFor="remember"
              className="cursor-pointer text-sm font-medium text-slate-800"
            >
              Remember me
            </label>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <motion.button
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              className="rounded-lg bg-[#0f172a] py-3 font-bold text-white shadow-[0_0_15px_rgba(255,77,0,0.4)] transition-all hover:shadow-[0_0_20px_rgba(255,77,0,0.6)]"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              className="rounded-lg bg-[#0f172a] py-3 font-bold text-white shadow-[0_0_15px_rgba(255,77,0,0.4)] transition-all hover:shadow-[0_0_20px_rgba(255,77,0,0.6)]"
            >
              Demo ID
            </motion.button>
          </div>

          {/* Separator */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dotted border-[#ff4d00]"></div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold text-slate-700">
              Connect with us
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <SocialIcon
                icon={
                  <MessageCircle className="h-5 w-5 fill-green-500/20 text-green-500" />
                }
              />
              <SocialIcon icon={<Send className="h-5 w-5 text-sky-500" />} />
              <SocialIcon
                icon={
                  <Facebook className="h-5 w-5 fill-blue-600 text-blue-600" />
                }
              />
              <SocialIcon
                icon={<Instagram className="h-5 w-5 text-pink-600" />}
              />
              <SocialIcon icon={<Twitter className="h-5 w-5 text-black" />} />
              <SocialIcon
                icon={<Youtube className="h-5 w-5 fill-red-600 text-red-600" />}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SocialIcon: React.FC<{icon: React.ReactNode}> = ({icon}) => (
  <button className="hover:bg-gray-50 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 transition-all hover:border-slate-400">
    {icon}
  </button>
);

export default Login;
