import React, { useEffect } from "react";
import LoadingPage from "./LoadingPage";
import AuthPage from "./AuthPage";

function App() {
  // Disable manual scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable manual scroll
    return () => {
      document.body.style.overflow = "auto"; // re-enable if unmounted
    };
  }, []);

  return (
    <>
      <LoadingPage />
      <AuthPage />
    </>
  );
}

export default App;
