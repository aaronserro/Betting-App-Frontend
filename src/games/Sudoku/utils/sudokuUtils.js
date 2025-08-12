export function cloneGrid(g) {
  return g.map((row) => row.slice());
}

// zeros mean incomplete
export function isCompleteLocal(board) {
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
    if (board[r][c] === 0) return false;
  }
  return true;
}

// conflicts: true where row/col/box duplicates exist
export function findConflicts(board) {
  const conflicts = Array.from({ length: 9 }, () => Array(9).fill(false));
  // rows
  for (let r = 0; r < 9; r++) {
    const seen = new Map();
    for (let c = 0; c < 9; c++) {
      const v = board[r][c]; if (!v) continue;
      if (!seen.has(v)) seen.set(v, []);
      seen.get(v).push([r, c]);
    }
    for (const [, cells] of seen) if (cells.length > 1) cells.forEach(([rr, cc]) => conflicts[rr][cc] = true);
  }
  // cols
  for (let c = 0; c < 9; c++) {
    const seen = new Map();
    for (let r = 0; r < 9; r++) {
      const v = board[r][c]; if (!v) continue;
      if (!seen.has(v)) seen.set(v, []);
      seen.get(v).push([r, c]);
    }
    for (const [, cells] of seen) if (cells.length > 1) cells.forEach(([rr, cc]) => conflicts[rr][cc] = true);
  }
  // boxes
  for (let br = 0; br < 3; br++) for (let bc = 0; bc < 3; bc++) {
    const seen = new Map();
    for (let r = br * 3; r < br * 3 + 3; r++) for (let c = bc * 3; c < bc * 3 + 3; c++) {
      const v = board[r][c]; if (!v) continue;
      if (!seen.has(v)) seen.set(v, []);
      seen.get(v).push([r, c]);
    }
    for (const [, cells] of seen) if (cells.length > 1) cells.forEach(([rr, cc]) => conflicts[rr][cc] = true);
  }
  return conflicts;
}

export function formatTime(s) {
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
