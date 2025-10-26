import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LockIcon } from "lucide-react";

export const Share = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <Button variant="outline" disabled={true}>
            <LockIcon />
            Share
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature will be available soon</p>
      </TooltipContent>
    </Tooltip>
  );
};
