import CodeEditor from "@/components/CodeEditor";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Playground() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 bg-yellow-400 relative">
      {/* Back Icon */}
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center text-gray-800 hover:text-gray-600 transition-colors"
      >
        <FaArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
        <span className="hidden sm:inline text-sm sm:text-base font-medium">
          Back
        </span>
      </Link>

      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-10 text-center text-gray-800 font-mono">
        Console.lol
      </h1>

      {/* Code Editor */}
      <CodeEditor />
    </main>
  );
}
