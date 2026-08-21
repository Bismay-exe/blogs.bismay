'use client'

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import Image, { StaticImageData } from "next/image";

export interface TeamCardProps {
    name: string;
    role: string;
    imageSrc: string | StaticImageData;
    imageAlt?: string;
    iconSrc?: string | StaticImageData | React.ReactNode;
    iconAlt?: string;
    unoptimized?: boolean;
}

export default function TeamCard({
    name,
    role,
    imageSrc,
    imageAlt = "Team member",
    iconSrc = "/pencil.svg",
    iconAlt = "Role icon",
    unoptimized,
}: TeamCardProps) {
    const shouldReduceMotion = useReducedMotion();
    return (
        <div className="w-full h-full rounded-md flex justify-center items-center">
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hover: { y: shouldReduceMotion ? 0 : 0 },
                }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
                whileHover="hover"
                whileFocus="hover"
                initial="initial"
                tabIndex={0}
                className="relative w-full aspect-9/12 rounded-2xl bg-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer"
            >
                <motion.div
                    className="absolute inset-0 bottom-5 z-10 rounded-md flex flex-col gap-1.5 justify-end -ml-3 mb-2 text-xs md:text-sm pointer-events-none"
                    variants={{
                        initial: {
                            scale: 0.3,
                            opacity: 0,
                        },
                        hover: {
                            scale: 1,
                            opacity: 1,
                            transition: shouldReduceMotion ? { duration: 0.01 } : {
                                type: "spring",
                                stiffness: 600,
                                damping: 30,
                            },
                        },
                    }}
                >
                    <p className="bg-accent px-4 py-2 rounded-full w-fit text-[16px] font-inter-tight tracking-wider text-bg font-semibold shadow-xl shadow-bg/30">
                        {name}
                    </p>
                    <div className="flex flex-row gap-1.5 px-4 py-2 justify-start bg-accent font-semibold rounded-full w-fit items-center shadow-xl shadow-bg/30 text-bg ">
                        {typeof iconSrc === 'string' || (iconSrc && typeof iconSrc === 'object' && 'src' in iconSrc) ? (
                            <Image src={iconSrc as string | StaticImageData} alt={iconAlt} width={14} height={14} unoptimized={unoptimized} />
                        ) : (
                            iconSrc
                        )}
                        <p className="text-[16px] font-inter-tight tracking-wider font-semibold leading-tight">{role}</p>
                    </div>
                </motion.div>

                <div className="relative w-full h-full bg-bg rounded-xl overflow-hidden z-0">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        unoptimized={unoptimized}
                        className="object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                    />
                </div>
            </motion.div>
        </div>
    );
}