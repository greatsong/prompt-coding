import { useEffect, useRef } from "react";
import { buildGlow } from "../utils/glowscript";

const MEDALS = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];

/**
 * ReflectionPage
 * Props:
 *   challenge    - 챌린지 객체 (discussionQuestions 포함)
 *   roundTeams   - [{...team, prompt, code, score, eval}]  이번 라운드 결과
 *   globalTeams  - [{...team, totalScore}]  누적 점수 기준 정렬된 팀
 *   onNext       - () => void
 */
export default function ReflectionPage({ challenge, roundTeams, globalTeams, onNext }) {
  const iframeRefs = useRef({});
  const answerRef = useRef(null);

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.srcdoc = buildGlow(challenge.answerCode);
    }
    roundTeams.forEach((t, i) => {
      const ref = iframeRefs.current[t.id];
      if (ref && t.code && !t.code.startsWith("#")) {
        setTimeout(() => {
          ref.srcdoc = buildGlow(t.code);
        }, 200 + i * 200);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sorted = [...roundTeams].sort((a, b) => b.score - a.score);
  const totalSorted = [...globalTeams].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* 상단 타이틀 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            💬 성찰 — {challenge.title}
          </span>
          <span
            style={{
              marginLeft: 10,
              fontSize: "0.75rem",
              color: "#64748b",
            }}
          >
            다양한 풀이를 비교하며 문제 정의의 차이를 확인하세요
          </span>
        </div>
        <button
          onClick={onNext}
          style={{
            padding: "8px 18px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg,#7c3aed,#ec4899)",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
            fontSize: "0.88rem",
            fontFamily: "inherit",
          }}
        >
          다음 →
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1, minHeight: 0 }}>
        {/* 왼쪽: 결과 비교 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, overflow: "auto" }}>
          {/* 정답 + 순위 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#94a3b8",
                  marginBottom: 4,
                  fontWeight: 600,
                }}
              >
                🎯 정답 장면
              </div>
              <iframe
                ref={answerRef}
                title="answer"
                style={{
                  width: "100%",
                  height: 160,
                  border: "none",
                  borderRadius: 10,
                  background: "#10101a",
                }}
                sandbox="allow-scripts"
              />
            </div>

            <div
              style={{
                background: "rgba(251,191,36,0.06)",
                borderRadius: 12,
                border: "1px solid rgba(251,191,36,0.12)",
                padding: "0.7rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#fbbf24",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                🏆 이번 라운드
              </div>
              {sorted.map((t, i) => (
                <div
                  key={t.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "3px 6px",
                    borderRadius: 6,
                    marginBottom: 3,
                    background:
                      i === 0 ? "rgba(251,191,36,0.1)" : "transparent",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <span style={{ fontSize: "0.82rem" }}>{MEDALS[i]}</span>
                    <span
                      style={{
                        fontWeight: 700,
                        color: t.color.text,
                        fontSize: "0.8rem",
                      }}
                    >
                      {t.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontWeight: 800,
                      color: "#fbbf24",
                      fontSize: "0.82rem",
                    }}
                  >
                    +{t.score}
                  </span>
                </div>
              ))}

              <div
                style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  fontSize: "0.7rem",
                  color: "#64748b",
                }}
              >
                누적 1위: {totalSorted[0]?.name} ({totalSorted[0]?.totalScore}점)
              </div>
            </div>
          </div>

          {/* 팀별 결과 그리드 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                roundTeams.length <= 4
                  ? "1fr 1fr"
                  : roundTeams.length <= 6
                  ? "1fr 1fr 1fr"
                  : "1fr 1fr 1fr 1fr",
              gap: 6,
            }}
          >
            {sorted.map((t) => (
              <div
                key={t.id}
                style={{
                  borderRadius: 10,
                  padding: "0.6rem",
                  background: t.color.light,
                  border: `1.5px solid ${t.color.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: t.color.text,
                      fontSize: "0.8rem",
                    }}
                  >
                    {t.name}
                  </span>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        t.score >= 80
                          ? "linear-gradient(135deg,#34d399,#10b981)"
                          : t.score >= 50
                          ? "linear-gradient(135deg,#fbbf24,#f59e0b)"
                          : "linear-gradient(135deg,#f87171,#ef4444)",
                      fontWeight: 800,
                      fontSize: "0.72rem",
                      color: "#fff",
                    }}
                  >
                    {t.score}
                  </div>
                </div>

                {/* 프롬프트 */}
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: t.color.text,
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: 6,
                    padding: "3px 7px",
                    marginBottom: 5,
                    maxHeight: 36,
                    overflow: "auto",
                    lineHeight: 1.4,
                    opacity: 0.9,
                  }}
                >
                  {t.prompt || "(없음)"}
                </div>

                {/* 결과 iframe */}
                <div
                  style={{
                    height: 90,
                    borderRadius: 7,
                    overflow: "hidden",
                    background: "#10101a",
                  }}
                >
                  {t.code && !t.code.startsWith("#") ? (
                    <iframe
                      ref={(el) => {
                        iframeRefs.current[t.id] = el;
                      }}
                      title={`reflect-${t.id}`}
                      style={{ width: "100%", height: "100%", border: "none" }}
                      sandbox="allow-scripts"
                    />
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        color: "#475569",
                      }}
                    >
                      {t.code || "없음"}
                    </div>
                  )}
                </div>

                {t.eval && (
                  <div
                    style={{ fontSize: "0.68rem", marginTop: 5, lineHeight: 1.4 }}
                  >
                    <div style={{ color: "#34d399" }}>✅ {t.eval.strengths}</div>
                    <div style={{ color: "#fbbf24", marginTop: 2 }}>
                      💡 {t.eval.improvements}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 토론 가이드 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              background: "rgba(167,139,250,0.07)",
              borderRadius: 14,
              border: "1px solid rgba(167,139,250,0.15)",
              padding: "1rem 1.2rem",
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "#a78bfa",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              💬 팀 토론 질문
            </div>
            {challenge.discussionQuestions.map((q, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 14,
                  padding: "10px 14px",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: 10,
                  borderLeft: "3px solid #a78bfa",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    marginBottom: 3,
                  }}
                >
                  Q{i + 1}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#e2e8f0",
                    lineHeight: 1.6,
                  }}
                >
                  {q}
                </div>
              </div>
            ))}
          </div>

          {/* CT 해설 */}
          <div
            style={{
              background: "rgba(16,185,129,0.06)",
              borderRadius: 14,
              border: "1px solid rgba(16,185,129,0.15)",
              padding: "1rem 1.2rem",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "#34d399",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              🧩 CT 핵심 요소: {challenge.ctElement}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#cbd5e1",
                lineHeight: 1.7,
              }}
            >
              {challenge.explanation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
