// src/games/Sudoku/components/SudokuCell.jsx
const GOLD = "#FFD700";

export default function SudokuCell({
  r, c,
  value,
  fixed,
  focused,
  conflict,
  notesSet,
  extraClass = "",
  onClick,
}) {
  const handleClick = () => onClick?.(r, c);

  const subgridBorders = [
    c % 3 === 0 ? "border-l-2 border-slate-700" : "border-l border-slate-700/60",
    r % 3 === 0 ? "border-t-2 border-slate-700" : "border-t border-slate-700/60",
    c === 8 ? "border-r-2 border-slate-700" : "",
    r === 8 ? "border-b-2 border-slate-700" : "",
  ].join(" ");

  const base = [
    "relative h-14 w-14 flex items-center justify-center select-none",
    // Dark tile base; subtle gradient
    "bg-gradient-to-br from-[#111] to-[#1a1a1a] text-white",
    "border border-slate-700",
    "transition-all duration-150 ease-out",
    "hover:-translate-y-[1px] hover:shadow-xl hover:shadow-black/30 hover:border-slate-500",
  ];

  const focus = focused
    ? `ring-2 ring-[${GOLD}] ring-offset-2 ring-offset-black bg-[${GOLD}] bg-opacity-20`
    : "";

  const fixedOrEditable = fixed
    ? "text-white font-extrabold"
    : "font-semibold cursor-pointer text-white";

  const conflictClass = conflict ? "bg-rose-950/40 border-rose-600 shadow-inner" : "";

  const cellClasses = [
    ...base,
    focus,
    fixedOrEditable,
    conflictClass,
    subgridBorders,
    extraClass,
  ].join(" ");

  const isEmpty = value === 0;
  const hasNotes = notesSet && notesSet.size > 0;

  return (
    <div className={cellClasses} onClick={handleClick} data-cell={`${r}-${c}`}>
      {!isEmpty ? (
        <span className="text-[1.35rem] leading-none">{value}</span>
      ) : hasNotes ? (
        <div className="grid grid-cols-3 grid-rows-3 gap-0.5 text-[11px] leading-[12px] text-slate-300 w-full h-full p-0.5 pointer-events-none">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
            <div key={n} className="flex items-center justify-center">
              {notesSet.has(n) ? n : ""}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
