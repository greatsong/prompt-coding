/**
 * 프롬프트 배틀 챌린지 데이터
 * 신호등 → 숲 → 꽃밭 순으로 난도 상승
 */
export const CHALLENGES = [
  {
    id: 1,
    title: "신호등",
    difficulty: "★★☆",
    category: "분해",
    ctElement: "분해",
    description:
      "검은 기둥 위에 빨강, 노랑, 초록 세 개의 구로 신호등을 만드세요. 빨간불이 맨 위입니다.",
    hint: "기둥은 cylinder, 신호등은 sphere 3개를 y축 방향으로 배치하세요.",
    answerCode: `cylinder(pos=vector(0,-3.5,0), axis=vector(0,7,0), radius=0.35, color=color.black)
sphere(pos=vector(0,2.2,0), radius=0.65, color=color.red)
sphere(pos=vector(0,0.5,0), radius=0.65, color=color.yellow)
sphere(pos=vector(0,-1.2,0), radius=0.65, color=color.green)`,
    explanation:
      "이 장면의 핵심 문제 정의 3가지: ①빨간불이 맨 위인지, ②구들의 간격이 얼마인지, ③기둥이 얼마나 긴지. 하나라도 모호하면 결과가 달라집니다. 오늘 처음 체험하는 '문제 정의의 힘'입니다.",
    discussionQuestions: [
      "빨간불이 맨 위라는 걸 명시했나요, 아니면 그냥 '신호등'이라고 했나요?",
      "신호등 구 3개의 간격을 어떻게 표현했나요?",
      "가장 높은 점수를 받은 팀 프롬프트의 비결은 무엇이었나요?",
    ],
  },
  {
    id: 2,
    title: "나무 숲",
    difficulty: "★★★",
    category: "패턴인식",
    ctElement: "패턴인식",
    description:
      "크기가 조금씩 다른 나무 세 그루가 서있는 숲입니다. 나무는 갈색 기둥과 초록 원뿔 모양 나뭇잎으로 이루어져 있습니다.",
    hint: "나무 = cylinder(갈색 기둥) + cone(초록 잎). x축으로 3그루를 간격을 두고 배치하세요.",
    answerCode: `box(pos=vector(0,-2.7,0), size=vector(14,0.4,4), color=vector(0.2,0.6,0.1))
cylinder(pos=vector(-4,-2.5,0), axis=vector(0,3,0), radius=0.35, color=vector(0.5,0.3,0.1))
cone(pos=vector(-4,0.5,0), axis=vector(0,3,0), radius=1.3, color=color.green)
cylinder(pos=vector(0,-2.5,0), axis=vector(0,4,0), radius=0.45, color=vector(0.4,0.25,0.08))
cone(pos=vector(0,1.5,0), axis=vector(0,3.5,0), radius=1.6, color=vector(0.1,0.55,0.1))
cylinder(pos=vector(4,-2.5,0), axis=vector(0,3.5,0), radius=0.3, color=vector(0.5,0.3,0.1))
cone(pos=vector(4,1,0), axis=vector(0,2.8,0), radius=1.2, color=vector(0.15,0.5,0.15))`,
    explanation:
      "'숲'이라는 단어 하나에 얼마나 많은 정보가 숨어있나요? 나무 한 그루 = 갈색 기둥 + 초록 원뿔. 이 패턴이 3번, 각기 다른 크기로 반복됩니다. 추상어를 구체적 명세로 변환하는 것이 문제 정의의 본질입니다.",
    discussionQuestions: [
      "나무 개수를 '3그루'로 명시했나요, 아니면 '숲'이라고만 했나요?",
      "각 나무의 위치를 어떻게 설명했나요?",
      "나무마다 크기가 조금씩 다르다는 것을 표현했나요?",
    ],
  },
  {
    id: 3,
    title: "꽃밭",
    difficulty: "★★★☆",
    category: "분해+패턴",
    ctElement: "분해+패턴",
    description:
      "초록 잔디 위에 꽃 두 송이가 피어 있습니다. 왼쪽 꽃은 빨간 꽃잎, 오른쪽 꽃은 보라색 꽃잎이며 오른쪽 꽃이 더 큽니다.",
    hint: "꽃 = 줄기(cylinder) + 꽃 중심(노란 sphere) + 꽃잎 8개(sphere 8방향).",
    answerCode: `box(pos=vector(0,-3.3,0), size=vector(12,0.4,5), color=vector(0.2,0.6,0.1))
cylinder(pos=vector(-3,-3.1,0), axis=vector(0,3.5,0), radius=0.12, color=color.green)
sphere(pos=vector(-3,0.6,0), radius=0.38, color=color.yellow)
sphere(pos=vector(-3.75,0.6,0), radius=0.27, color=color.red)
sphere(pos=vector(-2.25,0.6,0), radius=0.27, color=color.red)
sphere(pos=vector(-3,1.35,0), radius=0.27, color=color.red)
sphere(pos=vector(-3,-0.15,0), radius=0.27, color=color.red)
sphere(pos=vector(-3.55,1.15,0), radius=0.22, color=color.red)
sphere(pos=vector(-2.45,1.15,0), radius=0.22, color=color.red)
sphere(pos=vector(-3.55,0.05,0), radius=0.22, color=color.red)
sphere(pos=vector(-2.45,0.05,0), radius=0.22, color=color.red)
cylinder(pos=vector(2,-3.1,0), axis=vector(0,4.2,0), radius=0.12, color=color.green)
sphere(pos=vector(2,1.3,0), radius=0.46, color=color.yellow)
sphere(pos=vector(1.1,1.3,0), radius=0.33, color=vector(0.8,0.1,0.9))
sphere(pos=vector(2.9,1.3,0), radius=0.33, color=vector(0.8,0.1,0.9))
sphere(pos=vector(2,2.2,0), radius=0.33, color=vector(0.8,0.1,0.9))
sphere(pos=vector(2,0.4,0), radius=0.33, color=vector(0.8,0.1,0.9))
sphere(pos=vector(1.4,2.05,0), radius=0.27, color=vector(0.8,0.1,0.9))
sphere(pos=vector(2.6,2.05,0), radius=0.27, color=vector(0.8,0.1,0.9))
sphere(pos=vector(1.4,0.55,0), radius=0.27, color=vector(0.8,0.1,0.9))
sphere(pos=vector(2.6,0.55,0), radius=0.27, color=vector(0.8,0.1,0.9))`,
    explanation:
      "'꽃밭'이라는 두 글자 안에 줄기 2개, 꽃 중심 2개, 꽃잎 18개, 잔디 1개 — 총 23개의 객체가 숨어있습니다. AI에게 정확히 전달하려면 이것을 모두 명세로 풀어낼 수 있어야 합니다. 이것이 프로그래밍적 사고의 시작입니다.",
    discussionQuestions: [
      "꽃 한 송이의 구성 요소를 몇 가지로 분해했나요?",
      "왼쪽/오른쪽 꽃의 색상 차이와 크기 차이를 명시했나요?",
      "오늘 수업을 통해 '문제 정의'에 대해 무엇을 새롭게 느꼈나요?",
    ],
  },
];
