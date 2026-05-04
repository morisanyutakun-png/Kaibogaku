import type { StudyTocEntry } from "@/types/content";

const anatomyFoundation = ["openstax-anatomy-physiology-2e", "openstax-anatomy-terminology"];
const yogaTraining = ["yoga-alliance-rys-standards"];
const safetyFoundation = [
  "nccih-yoga-effectiveness-safety",
  "nccih-yoga-health-science",
  "yoga-alliance-rys-standards",
];

export const studyTocEntries: StudyTocEntry[] = [
  {
    id: "toc-01",
    order: "01",
    title: "解剖学は、形の正解ではなく観察の言葉",
    eyebrow: "入口",
    summary:
      "方向用語、身体部位、講師が使う言葉がけを短く整理します。最初にここだけ読むと、以降の教材が追いやすくなります。",
    href: "/lessons/anatomy-for-yoga-teachers",
    kind: "lesson",
    estimatedMinutes: 12,
    sourceIds: [...anatomyFoundation, ...yogaTraining],
    question: "ヨガ講師が解剖学を学ぶ主な目的は？",
    answer:
      "身体の構造を手がかりに、観察と言葉がけを具体的にするためです。診断や治療の断定ではなく、負担が出やすい状況や修正候補を共有する土台として使います。",
  },
  {
    id: "toc-02",
    order: "02",
    title: "関節は、可動域と安定性を一緒に見る",
    eyebrow: "関節",
    summary:
      "屈曲・伸展・外転・内転などを、ポーズの見た目ではなく、呼吸が保てる範囲の観察に結びつけます。",
    href: "/lessons/joints-and-range-of-motion",
    kind: "lesson",
    estimatedMinutes: 15,
    sourceIds: [...anatomyFoundation, ...yogaTraining],
    question: "可動域を見るとき、深さ以外に何を見る？",
    answer:
      "呼吸、安定感、負担感、左右差への反応を見ます。広く動くことだけを目標にせず、安定しやすい範囲を一緒に探します。",
  },
  {
    id: "toc-03",
    order: "03",
    title: "筋肉は、伸びる部位と支える部位に分ける",
    eyebrow: "筋肉",
    summary:
      "主動筋・拮抗筋を暗記で終わらせず、前屈や立位ポーズで講師が観察しやすい言葉へ変換します。",
    href: "/lessons/muscle-actions-agonist-antagonist",
    kind: "lesson",
    estimatedMinutes: 14,
    sourceIds: ["openstax-skeletal-muscle", ...yogaTraining],
    question: "ポーズで伸びている筋肉だけを見ない理由は？",
    answer:
      "姿勢を支える筋肉や関節への荷重も、負担感に関わることがあるためです。伸張感と安定に使う部位を分けて観察します。",
  },
  {
    id: "toc-04",
    order: "04",
    title: "胸郭と呼吸は、がんばらせず観察する",
    eyebrow: "呼吸",
    summary:
      "横隔膜、胸郭、呼吸補助筋を、効果を保証する表現ではなく、クラス中の観察ポイントとして扱います。",
    href: "/lessons/breath-and-rib-cage-basics",
    kind: "lesson",
    estimatedMinutes: 13,
    sourceIds: ["openstax-anatomy-physiology-2e", ...yogaTraining],
    question: "呼吸指導で避けたい言い方は？",
    answer:
      "特定の呼吸法で症状が治る、必ず改善する、という断定です。一般的な観察として、息苦しさや力みがない範囲を確認します。",
  },
  {
    id: "toc-05",
    order: "05",
    title: "ダウンドッグは、肩と手首に負担が集まりやすい",
    eyebrow: "ポーズ応用",
    summary: "肩関節、胸郭、脊柱、手首への荷重を、完成形ではなく修正候補として読むための入口です。",
    href: "/lessons/shoulder-and-downward-facing-dog",
    kind: "lesson",
    estimatedMinutes: 16,
    sourceIds: [...anatomyFoundation, ...safetyFoundation],
    question: "ダウンドッグで講師が最初に確認したいことは？",
    answer:
      "肩や手首に鋭い痛みがないか、呼吸が止まっていないか、膝を曲げる・手の位置を変えるなどの修正で負担が減るかを確認します。",
  },
  {
    id: "toc-06",
    order: "06",
    title: "前屈は、股関節と骨盤からやさしく見る",
    eyebrow: "ポーズ応用",
    summary: "ハムストリングスの伸張感だけで判断せず、骨盤、脊柱、膝の曲げ方を観察します。",
    href: "/lessons/hip-and-forward-fold",
    kind: "lesson",
    estimatedMinutes: 15,
    sourceIds: [...anatomyFoundation, "openstax-skeletal-muscle", ...safetyFoundation],
    question: "前屈で膝を曲げるのは逃げ？",
    answer:
      "逃げではありません。骨盤や脊柱に負担が出にくい形を探す修正候補です。伸ばす深さより、呼吸と安定感を優先します。",
  },
  {
    id: "toc-07",
    order: "07",
    title: "腰に不安がある人へは、診断せず配慮を提案する",
    eyebrow: "安全配慮",
    summary:
      "痛みや既往歴がある場合の声かけ、休む選択、専門家への相談を、講師の範囲として整理します。",
    href: "/lessons/support-for-low-back-concerns",
    kind: "lesson",
    estimatedMinutes: 12,
    sourceIds: safetyFoundation,
    question: "腰に不安がある人へ、講師が避けたいことは？",
    answer:
      "原因を診断したり、特定のポーズで治ると伝えたりすることです。痛みがある場合は中止や修正を促し、必要に応じて医師・理学療法士・資格を持つ専門家への相談を案内します。",
  },
  {
    id: "toc-08",
    order: "08",
    title: "安全配慮の言葉を、毎回のクラスに置く",
    eyebrow: "まとめ",
    summary:
      "初心者、高齢者、妊娠中、痛みがある場合など、講師が共通して持っておきたい配慮の型です。",
    href: "/safety",
    kind: "safety",
    estimatedMinutes: 10,
    sourceIds: safetyFoundation,
    question: "安全配慮を伝えるときの基本文は？",
    answer:
      "痛み、不安、既往歴、妊娠中、高齢者などに当てはまる場合は、無理に続けず、医師・理学療法士・資格を持つ専門家に相談してください、という表現です。",
  },
];
