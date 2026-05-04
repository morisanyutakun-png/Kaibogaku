import type { SafetyTopic } from "@/types/content";

const safetySources = [
  "nccih-yoga-effectiveness-safety",
  "nccih-yoga-health-science",
  "yoga-alliance-rys-standards",
];

export const safetyTopics: SafetyTopic[] = [
  {
    id: "safety-low-back",
    slug: "low-back",
    title: "腰に不安がある人",
    summary: "前屈・後屈・ねじりで腰部だけに動きが集まりすぎないよう、浅い角度と支えを選びます。",
    audience: "腰部に不安、既往歴、痛みの経験がある参加者",
    observationPoints: [
      "腰だけで反る、または丸めていないか",
      "鋭い痛み、しびれ、不安感がないか",
      "呼吸が止まり、形を深めることを優先していないか",
    ],
    modificationIdeas: [
      "膝を曲げる、座面を高くする、ブロックを使う",
      "後屈は高さを下げ、保持時間を短くする",
      "休む選択肢を先に伝える",
    ],
    languageForTeachers: [
      "腰に不安がある場合は、浅めの角度や支えを使うことがあります。",
      "痛みやしびれがある場合は続けず、専門家に相談してください。",
    ],
    avoidClaims: ["腰痛を治します", "このポーズをすれば改善します"],
    sourceIds: safetySources,
  },
  {
    id: "safety-wrist",
    slug: "wrist",
    title: "手首に不安がある人",
    summary: "上肢荷重の量、手の角度、保持時間を調整し、手首だけに負担が集まらない形を探します。",
    audience: "手首に痛み、不安、過去の怪我がある参加者",
    observationPoints: [
      "手首に体重が集まり、指先が浮いていないか",
      "肩や体幹で支えられず、手首だけで耐えていないか",
      "荷重中に痛みやしびれがないか",
    ],
    modificationIdeas: [
      "壁や椅子を使って荷重を減らす",
      "保持時間を短くする",
      "前腕支持や別ポーズへ変更する",
    ],
    languageForTeachers: [
      "手首に不安がある方は、壁や椅子で角度を変えても大丈夫です。",
      "痛みが出る場合は荷重を減らしましょう。",
    ],
    avoidClaims: ["手首が強くなります", "我慢すれば慣れます"],
    sourceIds: safetySources,
  },
  {
    id: "safety-shoulder",
    slug: "shoulder",
    title: "肩が詰まりやすい人",
    summary: "腕を上げる角度、肩甲帯、胸郭、首の緊張を合わせて観察します。",
    audience: "肩や首に詰まり感、不安、過去の怪我がある参加者",
    observationPoints: [
      "肩が耳に近づき首が緊張していないか",
      "腕を上げるために腰を反らせていないか",
      "しびれや鋭い痛みがないか",
    ],
    modificationIdeas: [
      "腕の高さを下げる",
      "手を腰やブロックに置く",
      "壁を使い、胸郭と肩の動きを小さく確認する",
    ],
    languageForTeachers: [
      "肩が詰まりやすい場合は、腕を少し低くして呼吸の余裕を見ます。",
      "しびれや鋭い痛みがある場合は、その動きを休みましょう。",
    ],
    avoidClaims: ["肩こりを治します", "この角度が正しいです"],
    sourceIds: safetySources,
  },
  {
    id: "safety-knee",
    slug: "knee",
    title: "膝に不安がある人",
    summary: "膝の角度、足裏の接地、股関節との関係を見ながら、深さを調整します。",
    audience: "膝痛、既往歴、違和感がある参加者",
    observationPoints: [
      "膝に鋭い痛みや不安定感がないか",
      "足裏の接地が崩れ、膝に負担が集まっていないか",
      "深く曲げることを優先していないか",
    ],
    modificationIdeas: ["膝の角度を浅くする", "スタンスを狭くする", "ブロックや壁で支える"],
    languageForTeachers: [
      "膝に不安がある場合は、曲げる角度を浅くして足裏の支えを確認します。",
      "痛みがあるときは深めず、必要に応じて専門家に相談してください。",
    ],
    avoidClaims: ["膝痛が改善します", "膝は必ずこの向きです"],
    sourceIds: safetySources,
  },
  {
    id: "safety-older-adults",
    slug: "older-adults",
    title: "高齢者",
    summary: "バランス、疲労、既往歴、体温調整を考慮し、個別の必要性を尊重します。",
    audience: "高齢者、体力やバランスに不安がある参加者",
    observationPoints: [
      "立位でふらつきがないか",
      "長い保持で疲労や息切れがないか",
      "床からの立ち座りに不安がないか",
    ],
    modificationIdeas: [
      "椅子、壁、ブロックを使う",
      "移行をゆっくり行い、休息を増やす",
      "頭を下げる姿勢やバランス姿勢の時間を短くする",
    ],
    languageForTeachers: [
      "壁や椅子を使って、安定しやすい形を選びましょう。",
      "既往歴や不安がある場合は、医療者や資格を持つ専門家に相談してください。",
    ],
    avoidClaims: ["高齢者でも全員同じ形でできます", "転倒予防を保証します"],
    sourceIds: safetySources,
  },
  {
    id: "safety-pregnancy",
    slug: "pregnancy",
    title: "妊娠中",
    summary: "医療者の確認を優先し、腹部圧迫、過熱、長時間の仰向け、強い呼吸法などに配慮します。",
    audience: "妊娠中、妊娠の可能性がある参加者",
    observationPoints: [
      "息苦しさ、めまい、不安感がないか",
      "腹部が圧迫されていないか",
      "暑さや脱水への不安がないか",
    ],
    modificationIdeas: [
      "うつ伏せや強いねじりを避ける",
      "横向き休息や支えを使う",
      "ホットヨガや強い呼吸法は避ける候補として扱う",
    ],
    languageForTeachers: [
      "妊娠中は事前に医療者へ相談し、必要に応じてポーズを調整してください。",
      "苦しさや不安がある場合は、すぐに休みましょう。",
    ],
    avoidClaims: ["安産になります", "妊娠中でも安全です"],
    sourceIds: safetySources,
  },
  {
    id: "safety-beginners",
    slug: "beginners",
    title: "初心者",
    summary: "完成形よりも、呼吸、支え、休む選択肢を先に学べるようにします。",
    audience: "ヨガ経験が少ない参加者、運動に不安がある参加者",
    observationPoints: [
      "周囲に合わせて無理に深めていないか",
      "呼吸が止まっていないか",
      "休む選択肢を使えているか",
    ],
    modificationIdeas: [
      "短い保持から始める",
      "道具や壁を使う",
      "ポーズ名より、感じる場所と休み方を伝える",
    ],
    languageForTeachers: [
      "今日は完成形よりも、呼吸が続く範囲を探します。",
      "休むことも練習の一部です。",
    ],
    avoidClaims: ["初心者でも必ずできます", "痛みは成長のサインです"],
    sourceIds: safetySources,
  },
  {
    id: "safety-pain",
    slug: "pain",
    title: "痛みがある場合",
    summary: "痛みを我慢して続けず、動きを中止・軽減し、必要に応じて専門家へ相談します。",
    audience: "痛み、しびれ、違和感、不安がある参加者",
    observationPoints: [
      "鋭い痛み、しびれ、放散する不快感がないか",
      "痛みを隠して続けていないか",
      "本人が不安を表現できる雰囲気があるか",
    ],
    modificationIdeas: [
      "動きを中止する",
      "角度・荷重・保持時間を減らす",
      "休息し、専門家への相談を促す",
    ],
    languageForTeachers: [
      "痛みがある場合は、続けずに休みましょう。",
      "既往歴や不安がある場合は、医師・理学療法士・資格を持つ専門家に相談してください。",
    ],
    avoidClaims: ["痛みを乗り越えましょう", "この痛みは必ず良くなります"],
    sourceIds: safetySources,
  },
];
