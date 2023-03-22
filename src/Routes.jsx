import React from "react";
import CardPageApp from "./components/CardPage/CardPage";
import Profile from "./components/Profile/Profile";
import SavedPageApp from "./components/SavedPage/SavedPage";
import AppliedPageApp from "./components/AppliedPage/AppliedPage";
import { Routes as BaseRoutes, Route, Navigate } from "react-router-dom";

const Routes = () => {
  return (
    <BaseRoutes>
      <Route exact path="/" element={<CardPageApp />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/saved" element={<SavedPageApp />} />
      <Route exact path="/applied" element={<AppliedPageApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </BaseRoutes>
  );
};

export default Routes;
