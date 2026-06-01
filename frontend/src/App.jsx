import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const ChatPage = lazy(() => import("./pages/ChatPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-violet-50">
      <div className="spinner-ring" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat/:businessSlug" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Suspense>
  );
}