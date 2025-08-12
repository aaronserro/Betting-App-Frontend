import { get, post } from "../../../api/httpClient";

const BASE = "/api/sudoku"; // if you set a dev proxy. Otherwise: `${FULL}/api/sudoku`

export const SudokuApi = {
  generate: (holes) => get(`${BASE}/generate?holes=${holes}`),
  validate: (payload) => post(`${BASE}/validate`, payload),
  solve: (payload) => post(`${BASE}/solve`, payload),
};
export default SudokuApi;