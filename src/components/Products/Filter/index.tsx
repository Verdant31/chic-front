import { Drawer } from "@mui/material";
import React, { FC } from "react";
import DrawerContent from "./components/DrawerContent";

interface FilterProps {
  isFilterOpen: boolean;
  toggleFilter: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Filter: FC<FilterProps> = ({ isFilterOpen, toggleFilter }) => {
  return (
    <Drawer open={isFilterOpen} onClose={toggleFilter(false)}>
      <DrawerContent />
    </Drawer>
  );
};

export default Filter;
