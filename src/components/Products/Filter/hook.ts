import React, { useState } from "react";

export default function useFilter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsFilterOpen(open);
    };
  return { isFilterOpen, toggleDrawer };
}
