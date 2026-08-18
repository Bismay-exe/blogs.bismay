import React from "react";

const Author = () => {
    return (
        <div className="flex gap-3 items-center">
            <img
                className="aspect-square h-14 rounded-xl"
                src="https://bismay.hashnode.dev/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fuploads%2Flogos%2F6a399a8c39e4220fe8771f37%2F3ac7e594-8df0-4a00-a515-53906b12a6f5.png&w=640&q=75"
                alt=""
            />
            <div className="flex flex-col justify-center text-sec font-semibold">
                <h4>
                    by <a href="/about" className="text-fg font-bold underline-effect">Bismay.exe</a>
                </h4>
                <span>building in public</span>
            </div>
        </div>
    );
};

export default Author;
