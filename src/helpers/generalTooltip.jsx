import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const GeneralTooltip = ({ content, triggerContent, onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* triggerContent DEBE ser un único elemento */}
          <span onClick={onClick} className="cursor-pointer inline-flex">
            {triggerContent}
          </span>
        </TooltipTrigger>

        <TooltipContent className="max-w-xs p-2 text-center">
          <p className="whitespace-normal break-words">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default GeneralTooltip
