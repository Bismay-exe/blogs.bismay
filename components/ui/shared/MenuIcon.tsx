import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

const MenuIcon = ({ className }: { className?: string }) => {
    const [toggle, setToggle] = useState(false);

    return (
        <div
            onClick={() => setToggle((x) => !x)}
            className={cn(
                "group flex size-full cursor-pointer items-center justify-center",
                className,
            )}
        >
            <div className="relative grid size-4 cursor-pointer items-center justify-center">
                <motion.div
                    animate={{ y: toggle ? 0 : "-5px", rotate: toggle ? 45 : 0 }}
                    className="absolute h-0.5 w-full rounded-full bg-current"
                ></motion.div>
                <motion.div
                    animate={{ opacity: toggle ? 0 : 1 }}
                    transition={{ duration: 0.1 }}
                    className="absolute h-0.5 w-full rounded-full bg-current"
                ></motion.div>
                <motion.div
                    animate={{ y: toggle ? 0 : "5px", rotate: toggle ? -45 : 0 }}
                    className="absolute h-0.5 w-full rounded-full bg-current"
                ></motion.div>
            </div>
        </div>
    );
};