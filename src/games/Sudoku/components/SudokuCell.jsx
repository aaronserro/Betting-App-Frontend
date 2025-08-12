// src/games/Sudoku/components/SudokuCell.jsx
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
    c % 3 === 0 ? "border-l-2 border-slate-500" : "border-l border-slate-300",
    r % 3 === 0 ? "border-t-2 border-slate-500" : "border-t border-slate-300",
    c === 8 ? "border-r-2 border-slate-500" : "",
    r === 8 ? "border-b-2 border-slate-500" : "",
  ].join(" ");

  const cellClasses = [
    // bigger & bolder cell
    "relative h-14 w-14 flex items-center justify-center select-none",
    // fresh look
    "bg-gradient-to-br from-white to-slate-50 text-gray-800",
    "border border-slate-300",
    // interactions
    "transition-all duration-150 ease-out",
    "hover:-translate-y-[1px] hover:shadow-xl hover:shadow-slate-900/10 hover:border-slate-400",
    // focused ring
    focused ? "ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900" : "",
    // fixed vs editable
    fixed ? "bg-slate-100 text-gray-900 font-extrabold" : "font-semibold cursor-pointer",
    // conflict feedback
    conflict ? "bg-rose-50 border-rose-300 shadow-inner" : "",
    // 3×3 separators and optional external highlight
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
        <div className="grid grid-cols-3 grid-rows-3 gap-0.5 text-[11px] leading-[12px] text-slate-500 w-full h-full p-0.5 pointer-events-none">
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
