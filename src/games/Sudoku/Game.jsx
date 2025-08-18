// src/games/Sudoku/Game.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SudokuCell from "./components/SudokuCell";
import sudokuApi from "./api/sudokuApi.js";
import { cloneGrid, isCompleteLocal, findConflicts, formatTime } from "./utils/sudokuUtils";

const GOLD = "#FFD700";

const DIFFICULTIES = [
  { label: "Easy", holes: 40 },
  { label: "Medium", holes: 45 },
  { label: "Hard", holes: 50 },
];

export default function SudokuGame() {
  const navigate = useNavigate();

  // board & meta
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [fixed, setFixed] = useState(Array.from({ length: 9 }, () => Array(9).fill(false)));
  const [difficultyIdx, setDifficultyIdx] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [serverValid, setServerValid] = useState(true);

  // time
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  // focus
  const focusedRef = useRef({ r: 0, c: 0 });

  // notes
  const [notesMode, setNotesMode] = useState(false);
  const emptyNotes = () => Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()));
  const [notes, setNotes] = useState(emptyNotes());

  // conflicts
  const conflicts = useMemo(() => findConflicts(board), [board]);

  // timer
  useEffect(() => {
    let id;
    if (startTime) id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 250);
    return () => clearInterval(id);
  }, [startTime]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      const { r, c } = focusedRef.current;
      if (e.key.toLowerCase() === "n") { e.preventDefault(); setNotesMode(v => !v); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); focusedRef.current = { r: (r + 8) % 9, c }; setStatus(""); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); focusedRef.current = { r: (r + 1) % 9, c }; setStatus(""); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); focusedRef.current = { r, c: (c + 8) % 9 }; setStatus(""); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); focusedRef.current = { r, c: (c + 1) % 9 }; setStatus(""); return; }
      if (fixed[r][c]) return;
      if (/^[1-9]$/.test(e.key)) { e.preventDefault(); handleNumberInput(r, c, parseInt(e.key, 10)); setStatus(""); return; }
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") { e.preventDefault(); handleNumberInput(r, c, 0); setStatus(""); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [board, fixed, notesMode]);

  // API
  const loadPuzzle = async (holes) => {
    setLoading(true);
    setStatus("Generating puzzle…");
    try {
      const data = await sudokuApi.generate(holes);
      setBoard(data.board);
      setFixed(data.fixed);
      setNotes(emptyNotes());
      setStartTime(Date.now());
      setElapsed(0);
      setServerValid(true);
      setStatus("Puzzle loaded.");
    } catch (e) {
      console.error(e);
      setStatus("Failed to generate puzzle.");
    } finally {
      setLoading(false);
    }
  };

  const validateOnServer = async () => {
    setStatus("Validating…");
    try {
      const ok = await sudokuApi.validate({ board, fixed });
      setServerValid(ok === true);
      setStatus(ok ? "Board is valid." : "Board has rule violations.");
    } catch (e) {
      console.error(e);
      setStatus("Validation error.");
    }
  };

  const solveFromServer = async () => {
    setLoading(true);
    setStatus("Solving…");
    try {
      const data = await sudokuApi.solve({ board, fixed });
      setBoard(data.board);
      setServerValid(true);
      setStatus("Solved.");
    } catch (e) {
      console.error(e);
      setStatus("Solve error or unsolvable.");
    } finally {
      setLoading(false);
    }
  };

  const clearNonFixed = () => {
    const next = cloneGrid(board);
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if (!fixed[r][c]) next[r][c] = 0;
    setBoard(next);
    setStatus("Cleared editable cells.");
    setServerValid(true);
  };

  const complete = useMemo(() => isCompleteLocal(board), [board]);
  useEffect(() => { if (complete) validateOnServer(); }, [complete]);

  // notes helpers
  function toggleNote(r, c, val) {
    setNotes(prev => {
      const next = prev.map(row => row.map(s => new Set(s)));
      const s = next[r][c];
      s.has(val) ? s.delete(val) : s.add(val);
      return next;
    });
  }
  function clearCellNotes(r, c) {
    setNotes(prev => {
      const next = prev.map(row => row.map(s => new Set(s)));
      next[r][c].clear();
      return next;
    });
  }
  function sweepNotesAfterPlacement(r, c, val) {
    setNotes(prev => {
      const next = prev.map(row => row.map(s => new Set(s)));
      for (let cc = 0; cc < 9; cc++) next[r][cc].delete(val);
      for (let rr = 0; rr < 9; rr++) next[rr][c].delete(val);
      const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
      for (let rr = br; rr < br + 3; rr++)
        for (let cc = bc; cc < bc + 3; cc++)
          next[rr][cc].delete(val);
      return next;
    });
  }
  function handleNumberInput(r, c, val) {
    if (fixed[r][c]) return;
    if (notesMode) { val === 0 ? clearCellNotes(r, c) : toggleNote(r, c, val); return; }
    const next = cloneGrid(board);
    next[r][c] = val;
    setBoard(next);
    if (val !== 0) { sweepNotesAfterPlacement(r, c, val); clearCellNotes(r, c); }
  }

  // layout helpers for highlighting row/col/box
  const highlightClass = (r, c) => {
    const fr = focusedRef.current.r, fc = focusedRef.current.c;
    const isRow = fr === r, isCol = fc === c;
    const inBox = Math.floor(fr / 3) === Math.floor(r / 3) && Math.floor(fc / 3) === Math.floor(c / 3);
    return isRow || isCol ? "bg-white/10" : inBox ? "bg-white/5" : "";
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="bg-stars animate-starfield" />

      {/* Top Bar */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-black/60 border-b-2" style={{ borderColor: GOLD }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="px-3 py-1.5 rounded-lg bg-black/50 hover:bg-black/60 border border-white/20 text-sm"
            style={{ backgroundColor: "#000" }}
          >
            ← Dashboard
          </button>

          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-[#FFD700] to-white bg-clip-text text-transparent drop-shadow">
            Sudoku
          </h1>

          {/* Spacer to keep header layout balanced (controls moved to sidebar) */}
          <div className="w-[160px]" />
        </div>
      </header>

      {/* Gold stripe */}
      <div className="w-full border-y-2 bg-gradient-to-r from-black via-[#FFD70022] to-black" style={{ borderColor: GOLD }}>
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-white/80">
          “Play. Bet. Win.”
        </div>
      </div>

      {/* Main: board left, sidebar right */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8 relative z-10">
        {/* Board (left) */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          <div
            className="rounded-3xl bg-gradient-to-br from-[#141414] to-[#0c0c0c] p-3 shadow-2xl border-2 ring-1 ring-white/10"
            style={{ borderColor: GOLD }}
          >
            <div className="rounded-2xl bg-black/60 backdrop-blur-sm p-2 ring-1 ring-white/10">
              <div className="grid grid-cols-9 grid-rows-9 gap-[2px] bg-[#1b1b1b] rounded-xl p-1 shadow-inner">
                {board.map((row, r) =>
                  row.map((value, c) => {
                    const isFocused = focusedRef.current.r === r && focusedRef.current.c === c;
                    const isFixed = fixed[r][c];
                    const inConflict = conflicts[r][c];
                    return (
                      <SudokuCell
                        key={`${r}-${c}`}
                        r={r}
                        c={c}
                        value={value}
                        fixed={isFixed}
                        focused={isFocused}
                        conflict={inConflict}
                        notesSet={notes[r][c]}
                        // Focused cell gets a gold wash; others get soft white hint
                        extraClass={isFocused ? "bg-[#FFD70033]" : highlightClass(r, c)}
                        onClick={(rr, cc) => { focusedRef.current = { r: rr, c: cc }; setStatus(""); }}
                        onChange={(rr, cc, val) => handleNumberInput(rr, cc, val)}
                      />
                    );
                  })
                )}
              </div>

              {/* Keypad */}
              <div className="mt-4 grid grid-cols-5 gap-2">
                {[1,2,3,4,5,6,7,8,9,"C"].map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      const { r, c } = focusedRef.current;
                      handleNumberInput(r, c, n === "C" ? 0 : n);
                    }}
                    className={`h-10 rounded-xl font-semibold transition border ${
                      n === "C"
                        ? "bg-black/50 text-white border-white/20 hover:bg-black/60"
                        : "bg-black/60 text-[#FFD700] border-[#FFD700] hover:bg-black/75 shadow-[0_0_20px_rgba(255,215,0,0.15)]"
                    }`}
                    style={{ backgroundColor: "#000" }}
                  >
                    {n === "C" ? "Clear" : n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Sidebar (right) — sticky so user doesn’t scroll to access controls */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
          className="space-y-4 self-start lg:sticky lg:top-24"
        >
          {/* Quick Controls: Notes, Timer, Valid */}
          <div
            className="rounded-2xl bg-gradient-to-br from-[#141414] to-[#0c0c0c] p-3 shadow-xl border-2 flex items-center gap-2 flex-wrap"
            style={{ borderColor: GOLD }}
          >
            <button
              onClick={() => setNotesMode(v => !v)}
              className={`px-3 py-1.5 rounded-full border transition ${
                notesMode
                  ? "bg-[#FFD700] text-black border-[#FFD700] font-bold"
                  : "bg-black/50 text-white border-white/15 hover:bg-black/60"
              }`}
n
              title="Toggle Notes (N)"
            >
              ✏️ {notesMode ? "Notes: ON" : "Notes: OFF"}
            </button>

            <span className="px-3 py-1.5 rounded-full bg-black/50 text-white border border-white/15">
              ⏱ {formatTime(elapsed)}
            </span>

            <span
              className={`px-3 py-1.5 rounded-full border ${
                serverValid
                  ? "bg-emerald-700 text-white border-emerald-400"
                  : "bg-rose-800 text-white border-rose-400"
              }`}
            >
              {serverValid ? "Valid" : "Invalid"}
            </span>
          </div>

          {/* Difficulty & New Puzzle */}
          <div
            className="rounded-2xl bg-gradient-to-br from-[#141414] to-[#0c0c0c] p-4 shadow-xl border-2"
            style={{ borderColor: GOLD }}
          >
            <label className="block text-xs uppercase tracking-wider text-white/70 mb-2">Difficulty</label>
            <div className="flex gap-2 flex-wrap">
              {DIFFICULTIES.map((d, i) => (
                <button
                  key={d.label}
                  onClick={() => setDifficultyIdx(i)}
                  className={`px-3 py-1.5 rounded-full text-sm transition border ${
                    i === difficultyIdx
                      ? "bg-black text-[#FFD700] border-[#FFD700] font-bold shadow"
                      : "bg-black/50 text-white border-white/15 hover:bg-black/60"
                  }`}
                  style={{ backgroundColor: "#000" }}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => loadPuzzle(DIFFICULTIES[difficultyIdx].holes)}
              disabled={loading}
              className="mt-3 w-full px-4 py-2 rounded-xl text-white font-semibold border border-white/15"
              style={{ backgroundColor: "#000" }}
            >
              {loading ? "Loading…" : "New Puzzle"}
            </button>
          </div>

          {/* Actions */}
          <div
            className="rounded-2xl bg-gradient-to-br from-[#141414] to-[#0c0c0c] border-2 p-4 shadow-xl space-y-2"
            style={{ borderColor: GOLD }}
          >
            <button
              onClick={validateOnServer}
              className="w-full px-4 py-2 rounded-xl text-white font-semibold border border-white/15"
              style={{ backgroundColor: "#000" }}
            >
              ✅ Validate
            </button>
            <button
              onClick={solveFromServer}
              className="w-full px-4 py-2 rounded-xl text-white font-semibold border border-white/15"
              style={{ backgroundColor: "#000" }}
            >
              🧠 Solve (Dev)
            </button>
            <button
              onClick={clearNonFixed}
              className="w-full px-4 py-2 rounded-xl text-white font-semibold border border-white/15"
              style={{ backgroundColor: "#000" }}
            >
              🧼 Clear Non-Fixed
            </button>
          </div>

          {/* Status */}

<div className="rounded-2xl bg-black/70 p-6 border-2 border-[#FFD700] min-h-[80px] flex flex-col items-center justify-center shadow-2xl transition-all duration-200">
  <div className="text-lg font-bold text-[#FFD700] drop-shadow mb-1 text-center">
    {status}
  </div>
  {isCompleteLocal(board) && (
    <div className="mt-2 font-semibold text-emerald-400 text-base text-center">
      Filled! Press Validate to confirm. 🎉
    </div>
  )}
</div>
        </motion.aside>
      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-10 text-center text-xs text-white/60">
        Tip: Arrow keys move • 1–9 type • 0/Backspace clear • N toggles notes.
      </footer>
    </div>
  );
}
