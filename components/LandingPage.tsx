"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import CodePreview from "./CodePreview";
import { FaStar } from "react-icons/fa";

export default function LandingPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  // To ensure window is available only on the client side
  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Add mouse move listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isClient) return null; // Ensure that the code runs only after mounting on the client

  return (
    <div className="min-h-screen bg-yellow-400 relative overflow-hidden">
      {/* Moving Grid Background with lighter color */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px) 0 0,
            linear-gradient(180deg, rgba(0,0,0,0.05) 1px, transparent 1px) 0 0`,
          backgroundSize: "20px 20px",
          transform: `translate(${
            (cursorPosition.x - window.innerWidth / 2) * 0.05
          }px, ${(cursorPosition.y - window.innerHeight / 2) * 0.05}px)`,
          transition: "transform 0.1s ease-out",
        }}
      ></div>

      <Navigation />

      <main className="pt-20 pb-16 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Console.lol<br></br>Run, Code, <br></br> Regret, Repeat
              </h1>

              <p className="text-xl text-gray-700">
                Where JavaScript Meets Fun. Powered by the Browser, Designed for
                You!
              </p>

              <p className="text-xl text-gray-700">Happy experimenting!</p>

              <div className="space-y-4">
                <Link
                  href="/playground"
                  className="inline-block w-full sm:w-auto px-8 py-4 text-center bg-white text-gray-800 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Now
                </Link>

                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-700">
                  <Link
                    href="https://github.com/wishaldubey/Javascript-Playground"
                    className="flex items-center hover:text-gray-900"
                  >
                    <FaStar className="mr-2" />{" "}
                    {/* Icon in front of the text */}
                    Star this on GitHub
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 lg:pl-8">
              <CodePreview />
            </div>
          </div>

          {/* Mobile Code Preview */}
          <div className="mt-12 lg:hidden">
            <CodePreview />
          </div>
        </div>
      </main>
    </div>
  );
}
