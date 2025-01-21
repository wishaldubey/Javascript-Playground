"use client";

import Link from "next/link";
import { Github } from "lucide-react"; // Only import the GitHub icon

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-yellow-400 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-gray-700 text-2xl font-semibold">
              Console.lol
            </Link>
          </div>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://github.com/wishaldubey"
              className="p-2 rounded-lg border-2 border-gray-700 hover:bg-gray-700 hover:text-yellow-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Action Button */}
          <div className="md:hidden flex items-center">
            <Link
              href="https://github.com/wishaldubey"
              className="p-2 rounded-lg border-2 border-gray-700 hover:bg-gray-700 hover:text-yellow-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
