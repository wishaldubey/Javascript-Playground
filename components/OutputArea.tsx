import { useRef, useEffect, useState } from "react"

interface OutputAreaProps {
  output: string[]
}

export default function OutputArea({ output }: OutputAreaProps) {
  const outputRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState("12rem")

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    const updateMaxHeight = () => {
      const vh = window.innerHeight
      setMaxHeight(`${vh * 0.4}px`)
    }

    updateMaxHeight()
    window.addEventListener("resize", updateMaxHeight)
    return () => window.removeEventListener("resize", updateMaxHeight)
  }, [])

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-2 text-white">Console Output</h3>
      <div
        ref={outputRef}
        className="bg-gray-900 text-white p-4 rounded-lg flex-grow overflow-y-auto font-mono text-sm"
        style={{ maxHeight }}
      >
        {output.map((item, index) => (
          <pre key={index} className="mb-2 whitespace-pre-wrap break-words">
            {item}
          </pre>
        ))}
      </div>
    </div>
  )
}

