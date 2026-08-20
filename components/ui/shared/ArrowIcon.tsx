import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export const ArrowIcon = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "flex cursor-pointer items-center justify-center",
                className,
            )}
        >
            <div className="relative grid cursor-pointer items-center justify-center">
                <ChevronRight className="transition-all duration-500 ease-out group-hover/icon:translate-x-0.5" />
                <div className="absolute right-2.25 h-0.5 w-3 origin-right scale-x-0 rounded-[1px] bg-current transition-all duration-300 ease-out group-hover/icon:right-1.75 group-hover/icon:scale-x-100"></div>
            </div>
        </div>
    );
};