import React, { useEffect } from "react";
import LoadingPage from "./LoadingPage";
import AuthPage from "./AuthPage";
import StudentDashboard from "./StudentDashboard";
import PomodoroTimer from "./pomodoro";
import BreathingExercise from "./Breathe";
import BookingModal from "./BookingModal";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable manual scroll
    return () => {
      document.body.style.overflow = "auto"; // re-enable if unmounted
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LoadingPage />
              <AuthPage />
            </>
          }
        />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} /> {/* <-- added route */}
        <Route path="/breathe" element={<BreathingExercise />} /> {/* <-- added route */}
        <Route path="/book" element={<BookingModal />} /> {/* <-- added route */}
        {/* later add counselor + admin */}
      </Routes>
    </Router>
  );
}

export default App;
