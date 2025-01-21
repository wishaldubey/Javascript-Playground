import { Copy } from "lucide-react"; // Import the Copy icon from lucide-react
import { useState } from "react";

export default function CodePreview() {
  const [copied, setCopied] = useState(false); // To track if code is copied

  const handleCopy = () => {
    const code = `// JavaScript code for simulation
simulate = function() {
  // Get canvas element
  console.log("inside simulate");

  const canvas = document.getElementById('simulation-canvas');
  const ctx = canvas.getContext('2d');

  console.log("canvas", canvas);

  // Set initial position and velocity
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 5;
  let dy = -5;

  // Set ball radius
  const ballRadius = 10;

  // Setting canvas width
  let boundary = canvas.width;
}`;

    navigator.clipboard
      .writeText(code) // Copy the code to clipboard
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl w-full max-w-2xl mx-auto relative">
      <div className="flex items-center justify-between space-x-2 px-4 py-2 bg-gray-800">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-sm">
          Dynamic Simulation of a Physical System
        </span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          <Copy size={20} />
        </button>
      </div>
      <div className="p-4">
        <pre className="text-sm text-gray-300 font-mono">
          <code>{`// JavaScript code for simulation
simulate = function() {
  // Get canvas element
  console.log("inside simulate");

  const canvas = document.getElementById('simulation-canvas');
  const ctx = canvas.getContext('2d');

  console.log("canvas", canvas);

  // Set initial position and velocity
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 5;
  let dy = -5;

  // Set ball radius
  const ballRadius = 10;

  // Setting canvas width
  let boundary = canvas.width;
}`}</code>
        </pre>
      </div>

      {/* Display styled "Code Copied!" message when copied is true */}
      {copied && (
        <div className="absolute top-5 right-5 bg-green-600 text-white p-3 rounded-md shadow-lg text-sm font-medium opacity-90 transition-opacity duration-300">
          <span>Code Copied!</span>
        </div>
      )}
    </div>
  );
}
