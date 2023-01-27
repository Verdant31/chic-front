import React, { FC } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Link from "next/link";
import { CaretDown } from "phosphor-react";

interface SidebarItemProps {
  title: string;
  items: string[];
}

const SidebarItem: FC<SidebarItemProps> = ({ items, title }) => {
  return (
    <Accordion
      className="border-none shadow-none before:content-none"
      elevation={0}
      disableGutters
    >
      <AccordionSummary
        expandIcon={<CaretDown color="black" />}
        className="m-0 h-8 min-h-0 p-0"
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Link href="#" className="text-lg font-semibold text-zinc-600">
          {title}
        </Link>
      </AccordionSummary>
      <AccordionDetails className=" flex flex-col gap-2 p-0">
        {items.map((item) => (
          <Link key={item} href="#">
            {item}
          </Link>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default SidebarItem;
