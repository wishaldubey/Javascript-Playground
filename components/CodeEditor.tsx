"use client";

import { useState, useRef, useEffect } from "react";
import {
  PlayIcon,
  MonitorStopIcon as StopIcon,
  TrashIcon,
  CopyIcon,
} from "lucide-react";
import OutputArea from "./OutputArea";

const defaultCode = `// Example: Drawing on Canvas
const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 200;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 150, 100);

// Example: Animation
let x = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, 50, 50, 50);
  x = (x + 1) % canvas.width;
  requestAnimationFrame(animate);
}
animate();

console.log('Check the preview area for canvas rendering!');`;

export default function CodeEditor() {
  const [code, setCode] = useState(defaultCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(code.length, code.length);
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "output") {
        setOutput((prevOutput) => [...prevOutput, event.data.content]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.srcdoc = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; overflow: hidden; }
              canvas { display: block; }
            </style>
          </head>
          <body>
            <div id="output"></div>
            <script>
              const originalConsole = console;
              console = {
                log: (...args) => {
                  originalConsole.log(...args);
                  window.parent.postMessage({ type: 'output', content: args.map(String).join(' ') }, '*');
                },
                error: (...args) => {
                  originalConsole.error(...args);
                  window.parent.postMessage({ type: 'output', content: 'Error: ' + args.map(String).join(' ') }, '*');
                }
              };
              
              try {
                ${code}
              } catch (error) {
                console.error(error);
              }
            </script>
          </body>
        </html>
      `;
    }
  };

  const stopCode = () => {
    setIsRunning(false);
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.srcdoc = "";
    }
  };

  const clearCode = () => {
    setCode("");
    setOutput([]);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-4 rounded-t-lg flex flex-col sm:flex-row justify-between items-center sticky top-0 z-10">
        <h2 className="text-white text-xl mb-4 sm:mb-0">Code Editor</h2>
        <div className="flex space-x-2">
          <button
            onClick={isRunning ? stopCode : runCode}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-800 transition-colors duration-200"
            aria-label={isRunning ? "Stop code execution" : "Run code"}
          >
            {isRunning ? (
              <StopIcon className="h-5 w-5 text-white" />
            ) : (
              <PlayIcon className="h-5 w-5 text-white" />
            )}
          </button>
          <button
            onClick={clearCode}
            className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-800 transition-colors duration-200"
            aria-label="Clear code"
          >
            <TrashIcon className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={copyCode}
            className="p-2 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-800 transition-colors duration-200"
            aria-label="Copy code"
          >
            <CopyIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] custom-editor-container">
          <textarea
            ref={textareaRef}
            className="w-full h-full p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none rounded-b-lg"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col h-[400px] lg:h-[600px]">
          <iframe
            ref={iframeRef}
            className="w-full h-1/2 border-2 border-gray-700 rounded-lg bg-white"
            sandbox="allow-scripts"
          />
          <div className="h-1/2 mt-4 flex-grow">
            <OutputArea output={output} />
          </div>
        </div>
      </div>
    </div>
  );
}
