// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Users/dashboard";
import SudokuPage from "./pages/SudokuPage";

// Fantasy-only layout + pages
import FantasyLayout from "./pages/Fantasy/FantasyLayout";
import FantasyPage from "./pages/Fantasy/FantasyPage";
import DraftAssistant from "./games/Fantasy/Features/DraftAssistant.jsx";
import TradeEvaluator from "./games/Fantasy/Features/TradeEvaluator.jsx";
import RosOptimizer from "./games/Fantasy/Features/RosOptimizer.jsx";
import WaiversStartSit from "./games/Fantasy/Features/WaiversStartSit.jsx";
import "./App.css";

function App() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Routes>
        {/* Main entry goes straight to Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Other games */}
        <Route path="/games/sudoku" element={<SudokuPage />} />

        {/* Fantasy Football suite (nav + dynamic background live inside FantasyLayout only) */}
        <Route path="/pages/Fantasy" element={<FantasyLayout />}>
          <Route index element={<FantasyPage />} />
          <Route path="draft" element={<DraftAssistant />} />
          <Route path="trades" element={<TradeEvaluator />} />
          <Route path="ros" element={<RosOptimizer />} />
          <Route path="waivers" element={<WaiversStartSit />} />
        </Route>

        {/* Optional: 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
