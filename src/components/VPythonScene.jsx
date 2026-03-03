import { useEffect, useRef } from "react";
import { buildGlow } from "../utils/glowscript";

export default function VPythonScene({ code, height = 300, style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && code && !code.startsWith("#")) {
      ref.current.srcdoc = buildGlow(code);
    }
  }, [code]);

  return (
    <iframe
      ref={ref}
      title="vpython-scene"
      style={{
        width: "100%",
        height,
        border: "none",
        borderRadius: 12,
        background: "#10101a",
        display: "block",
        ...style,
      }}
      sandbox="allow-scripts"
    />
  );
}
