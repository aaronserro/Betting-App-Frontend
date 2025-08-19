import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GameCard from "../components/GameCard";

function GamePanel({ title, imageUrl, onClick, disabled = false }) {
  const clickable = !!onClick && !disabled;

  return (
    <div
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick()
          : undefined
      }
      aria-disabled={disabled ? true : undefined}
      className={[
        "relative rounded-3xl shadow-xl border-2 border-[#FFD700] flex flex-col items-center justify-center",
        "transition-transform duration-300 min-h-[240px] overflow-hidden bg-black",
        clickable ? "hover:scale-105 cursor-pointer" : "opacity-95 cursor-not-allowed"
      ].join(" ")}
      style={{ backgroundColor: "#101010" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
          filter: "none",
          zIndex: 1
        }}
      />

      {/* Subtle gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#FFD70015] to-black/70 z-10" />

      {/* Center “Coming Soon” textbox overlay when disabled */}
      {disabled && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
          <div className="bg-black/70 border border-[#FFD700] rounded-2xl px-6 py-4 text-center max-w-[80%] backdrop-blur">
            <div className="text-[#FFD700] text-2xl font-extrabold tracking-wide">
              Coming Soon
            </div>
            <div className="text-white/90 text-sm mt-1">
              This game is in development. Check back shortly!
            </div>
          </div>
        </div>
      )}

      {/* Title sits on top so it’s still visible under the overlay */}
      <h2 className="relative text-3xl md:text-4xl font-extrabold mb-2 text-[#FFD700] z-20 drop-shadow-lg">
        {title}
      </h2>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // Framer Motion scroll progress for the welcome section
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });

  // Animations for sections
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const announcementsOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const announcementsY = useTransform(scrollYProgress, [0.1, 0.6], [40, 0]);

  const panelsOpacity = useTransform(scrollYProgress, [0.38, 0.93], [0, 1]);
  const panelsY = useTransform(scrollYProgress, [0.38, 0.93], [80, 0]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* Starfield background */}
      <div className="bg-stars animate-starfield" />

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 left-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition z-20"
      >
        Logout
      </button>

      {/* Welcome Section */}
      <motion.section
        ref={scrollRef}
        style={{ opacity, y }}
        className="h-screen flex flex-col items-center justify-center text-center px-4 relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-[#FFD700] to-white bg-clip-text text-transparent">
          Welcome to the Fantasy Betting Arena
        </h1>
        <p className="text-gray-300 text-lg md:text-2xl max-w-xl">
          Play. Bet. Win. Challenge your mind or try your luck.
        </p>
      </motion.section>

      {/* Announcements Section */}
      <motion.section
        style={{ opacity: announcementsOpacity, y: announcementsY }}
        className="h-screen flex flex-col items-center justify-center text-center px-6 relative z-10"
      >
        <div className="bg-gradient-to-br from-[#232323] to-[#101010] rounded-3xl shadow-lg border-2 border-[#FFD700] max-w-2xl w-full p-8 mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 text-[#FFD700] tracking-wide">
            Announcements
          </h2>
          <p className="text-lg text-gray-100">
            🎉 Welcome to the beta version of the Fantasy Betting App!
            <br />
            New features, games, and rewards will be added soon. Stay tuned for updates and weekly competitions!
          </p>
        </div>
      </motion.section>

      {/* Panels Section */}
      <motion.section
        style={{ opacity: panelsOpacity, y: panelsY }}
        className="h-screen flex items-center justify-center relative z-10"
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {/* Live game */}
          <GamePanel
            title="Sudoku"
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku_distinction_of_cases.PNG/640px-Sudoku_distinction_of_cases.PNG"
            onClick={() => navigate('/games/sudoku')}
            disabled={false}
          />
            <GamePanel
            title="Fantasy "
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/NFL_wordmark_logo_2008.svg/640px-NFL_wordmark_logo_2008.svg.png"
            onClick={()=> navigate('games/Fantasy')}
            disabled = {false}
          />

          {/* Coming Soon games (disabled overlays) */}
          <GamePanel
            title=""
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/13-02-27-spielbank-wiesbaden-by-RalfR-094.jpg/640px-13-02-27-spielbank-wiesbaden-by-RalfR-094.jpg"
            disabled
          />
          <GamePanel
            title=""
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Blurry_blackjack_table.jpg/640px-Blurry_blackjack_table.jpg"
            disabled
          />
          <GamePanel
            title=""
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Lipu_tenpo_nanpa_kulupu_-_alasa_nimi_%28ma_Apika%29.png/640px-Lipu_tenpo_nanpa_kulupu_-_alasa_nimi_%28ma_Apika%29.png"
            disabled
          />
          <GamePanel
            title=""
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Battleship_game_board.svg/640px-Battleship_game_board.svg.png"
            disabled
          />
          <GamePanel
            title=""
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Poker_closeup.jpg/640px-Poker_closeup.jpg"
            disabled
          />
          <GamePanel
            title=""
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Gravity-chess-game.png/640px-Gravity-chess-game.png"
            disabled
          />
          <GamePanel
            title=""
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg"
            disabled
          />
          <GamePanel
            title=""
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/2048_Monotonicity.png/640px-2048_Monotonicity.png"
            disabled
          />
        </div>
      </motion.section>

      {/* Tiny Spacer for natural scroll */}
      <div className="h-[32vh] w-full"></div>
    </div>
  );
}

export default Dashboard;
