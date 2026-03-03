import { useState, useEffect, useRef } from "react";
import VPythonScene from "./VPythonScene";

// 종이 게임용 장면: 파란 상자 + 빨간 구 + 노란 기둥
const SCENE_CODE = `box(pos=vector(-2,0,0), size=vector(2.5,1.5,2), color=color.blue)
sphere(pos=vector(-2,1.25,0), radius=0.65, color=color.red)
cylinder(pos=vector(2.5,-1.2,0), axis=vector(0,3.5,0), radius=0.6, color=color.yellow)`;

const TIMER_SEC = 180;

const S = {
  wrap: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "1rem 1.4rem",
  },
};

export default function PaperGame({ onNext }) {
  const [phase, setPhase] = useState("ready"); // ready | running | done
  const [timeLeft, setTimeLeft] = useState(TIMER_SEC);
  const timerRef = useRef(null);

  const startTimer = () => {
    setPhase("running");
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPhase("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const pct = timeLeft / TIMER_SEC;
  const tCol = pct > 0.5 ? "#34d399" : pct > 0.2 ? "#fbbf24" : "#ef4444";
  const fmt = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (phase === "ready") {
    return (
      <div style={S.wrap}>
        <div style={{ textAlign: "center", paddingTop: 8 }}>
          <div style={{ fontSize: "2.5rem" }}>📝</div>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 900,
              background:
                "linear-gradient(90deg,#60a5fa,#a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "8px 0 4px",
            }}
          >
            종이 게임
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            준비가 되면 시작 버튼을 누르세요. 화면에 3D 장면이 나타납니다.
          </p>
        </div>

        <div style={S.card}>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#a78bfa",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            📋 규칙
          </div>
          {[
            ["설명자", "화면을 보고 파트너에게 장면을 말로만 설명합니다"],
            ["그림자", "등을 돌리고 설명만 듣고 종이에 그립니다"],
            ["시간", "3분 후 종이와 화면을 비교합니다"],
            ["포인트", "코드나 수학 용어 없이 일상어로 설명해야 합니다"],
          ].map(([label, desc]) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 8,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  minWidth: 52,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#fbbf24",
                  paddingTop: 1,
                }}
              >
                {label}
              </span>
              <span style={{ fontSize: "0.88rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                {desc}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={startTimer}
          style={{
            padding: "14px",
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(135deg,#2563eb,#7c3aed)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.05rem",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          🚀 게임 시작
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div style={S.wrap}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem" }}>🤔</div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "#e2e8f0",
              margin: "8px 0 4px",
            }}
          >
            어떠셨나요?
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
            종이 그림과 화면을 비교해보세요.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <VPythonScene code={SCENE_CODE} height={200} />
          <div style={{ ...S.card, display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: "0.78rem",
                color: "#a78bfa",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              💬 토론 질문
            </div>
            {[
              "무엇을 빠뜨렸나요?",
              "어떤 표현이 가장 어려웠나요?",
              "더 정확하게 설명하려면?",
            ].map((q) => (
              <div
                key={q}
                style={{
                  fontSize: "0.85rem",
                  color: "#cbd5e1",
                  padding: "6px 10px",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 8,
                  borderLeft: "3px solid #a78bfa",
                }}
              >
                {q}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onNext}
          style={{
            padding: "12px",
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(135deg,#7c3aed,#ec4899)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "1rem",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          다음으로 →
        </button>
      </div>
    );
  }

  // running
  return (
    <div style={S.wrap}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 4 }}
          >
            설명자는 이 장면을 말로 설명하고, 그림자는 등을 돌리고 듣기만 합니다
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 120,
              height: 7,
              borderRadius: 4,
              background: "rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${pct * 100}%`,
                height: "100%",
                background: tCol,
                borderRadius: 4,
                transition: "width 1s linear",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: "1.8rem",
              color: tCol,
              minWidth: 60,
              textAlign: "right",
            }}
          >
            {fmt(timeLeft)}
          </span>
          <button
            onClick={() => {
              clearInterval(timerRef.current);
              setPhase("done");
            }}
            style={{
              padding: "6px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontFamily: "inherit",
            }}
          >
            종료
          </button>
        </div>
      </div>

      <VPythonScene code={SCENE_CODE} height="calc(100vh - 240px)" />
    </div>
  );
}
