import React from "react";

const Profile = () => {
    return (
        <div className="w-full h-full">
            <div className="pb-3">
                <h1 className="text-lg text-sec font-mono">About <span className="text-fg font-semibold font-sans">Bismay.exe</span></h1>
            </div>
            <div className="w-full h-full p-4 border border-sec/30 rounded-xl">
                <div className="w-full h-full aspect-4/5 rounded-xl overflow-hidden border border-sec/30">
                    <img
                        className="w-full h-full object-cover hover:scale-110 transition-all duration-300 ease-in-out"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1epKN3vAvrQRIxnYi2AaXMJyKmVzUP3-mJr1D3b-DMSQID3s68GvINJ0&s=10"
                        alt=""
                    />
                </div>
                <div className="space-y-4 pt-4">
                    <p className="text-md leading-snug">
                        💻 Full-stack tinkerer sharing code, GitHub hacks & dev tips 🚀 Learning, building & automating one repo at a time ⚡ Open-source vibes + tech community love 🌱
                    </p>
                    <div className="text-md text-fg">
                        <span className="text-md text-sec font-mono">Education</span>
                        <p className="leading-snug font-medium text-fg">B.Tech in Computer Science and Engineering</p>
                    </div>
                    <div className="text-md text-fg">
                        <span className="text-md text-sec font-mono">Pronouns</span>
                        <p className="leading-snug font-medium text-fg">he/him</p>
                    </div>
                    <div className="text-md text-fg">
                        <span className="text-md text-sec font-mono">Work</span>
                        <p className="leading-snug font-medium text-fg">Frontend Developer | Open to Internship Opportunities</p>
                    </div>
                    <div className="text-md text-fg">
                        <span className="text-md text-sec font-mono">Joined</span>
                        <p className="leading-snug font-medium text-fg">Aug 22, 2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
