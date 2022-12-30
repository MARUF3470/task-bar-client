import React from "react";
import Lottie from "lottie-react";
import taskAnimation from "./56438-man-with-task-list.json";
import Typewriter from "typewriter-effect";
const Home = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-center w-3/4 mx-auto">
                <div className="w-11/12 mx-auto">
                    <h1 className="text-4xl font-bold">Welcome</h1>

                    <div className="text-xl font-semibold">
                        We help people to manage their{" "}
                        <Typewriter
                            options={{
                                strings: ["Daily Task", "Weeky task", "Monthy Task"],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                </div>
                <Lottie
                    className="w-11/12 mx-auto"
                    animationData={taskAnimation}
                    loop={true}
                ></Lottie>
            </div>
            <p className="text-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-5 py-2.5 mr-2 mb-2 rounded-none w-full">
                Let's make the time management easy
            </p>
        </>
    );
};

export default Home;
