import React, { useState } from "react";

export default function useHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsSidebarOpen(open);
    };
  return { isSidebarOpen, toggleDrawer };
}
