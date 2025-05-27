import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import ContactDialog from "@/components/container/Contact-Dialog";

const NewDm = () => {
  const [openNewContactModel, setOpenNewContactModel] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300 "
              onClick={() => setOpenNewContactModel((prev) => !prev)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-3  ">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div>
        <ContactDialog
          openNewContactModel={openNewContactModel}
          setOpenNewContactModel={setOpenNewContactModel}
        />
      </div>
    </>
  );
};

export default NewDm;
