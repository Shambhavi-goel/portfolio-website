"use client";

import React from "react";

// ThemeProvider retained for extensibility, but the site uses a warm cream
// light theme by default. Dark mode toggle has been removed.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const useTheme = () => ({ theme: "light" as const, toggleTheme: () => {} });
