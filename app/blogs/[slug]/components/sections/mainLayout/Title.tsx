import React from "react";

interface TitleProps {
    title?: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg leading-tight">
            {title || "🚀 Learning React Series"}
        </h1>
    );
};

export default Title;
