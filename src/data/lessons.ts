import type { Lesson } from "@/types/content";

const anatomySources = ["openstax-anatomy-physiology-2e", "yoga-alliance-rys-standards"];
const safetySources = [
  "nccih-yoga-effectiveness-safety",
  "nccih-yoga-health-science",
  "yoga-alliance-rys-standards",
];
const combinedSources = Array.from(new Set([...anatomySources, ...safetySources]));

export const lessons: Lesson[] = [
  {
    id: "lesson-anatomy-intro",
    slug: "anatomy-for-yoga-teachers",
    title: "ヨガ講師のための解剖学入門",
    subtitle: "形を直す前に、身体の地図を持つ。",
    summary: "解剖学をポーズの正解探しではなく、観察と言葉がけの土台として扱うための導入です。",
    category: "基礎解剖学",
    level: "入門",
    estimatedMinutes: 12,
    bodyArea: "全身",
    tags: ["解剖学用語", "観察", "安全な言葉がけ"],
    learningObjectives: [
      "解剖学的説明とヨガ指導上の解釈を分けて捉える",
      "方向用語や関節運動の基本を、クラス中の観察に結びつける",
      "医療的な断定を避けた説明の型を知る",
    ],
    keyPoints: [
      "解剖学は身体の構造を説明する言語であり、ポーズの優劣を決めるものではありません。",
      "講師は診断ではなく、負担が出やすい状況の観察と修正候補を提示します。",
      "出典が確認できない説明は、教材本文として扱わない設計にしています。",
    ],
    sections: [
      {
        id: "what-anatomy-describes",
        title: "解剖学が説明すること",
        kind: "anatomy",
        gentleExplanation: "身体の部位名、骨や筋肉、関節の動きを共通語で整理するための学びです。",
        body: [
          "基礎解剖学では、骨格・筋・関節・胸郭などの構造を、身体を観察するための地図として扱います。",
          "ポーズ中の動きは個人差があり、骨格、可動域、経験、疲労などの影響を受けることがあります。",
        ],
        sourceIds: anatomySources,
      },
      {
        id: "teaching-translation",
        title: "ヨガ指導へ翻訳する",
        kind: "teaching",
        body: [
          "講師の実践では、解剖学的な言葉をそのまま伝えるよりも、呼吸・安定感・負担感を観察しやすい言葉に変換します。",
          "「間違い」ではなく、「この形では肩や腰に負担が出やすい場合があります」と表現すると、学習者が自分の身体を観察しやすくなります。",
        ],
        sourceIds: safetySources,
      },
    ],
    teacherNotes: [
      "専門用語を使った後は、すぐに日常語で言い換えると理解が進みやすくなります。",
      "観察は外見だけで決めず、呼吸、表情、本人の感覚の共有と合わせて扱います。",
    ],
    commonObservations: [
      "肩をすくめたまま頑張っている",
      "深く入ることを優先して呼吸が浅くなる",
      "左右差を失敗として捉えてしまう",
    ],
    safetyNotes: [
      "痛みやしびれを我慢して続けるよう促さない。",
      "既往歴や妊娠中などの情報がある場合は、必要に応じて専門家への相談を促す。",
    ],
    quiz: [
      {
        question: "ヨガ講師が解剖学を使うときの基本姿勢として近いものはどれですか。",
        choices: [
          "身体の構造を手がかりに、観察と言葉がけの質を上げる",
          "全員を同じ角度にそろえる",
          "痛みの原因を診断する",
        ],
        answerIndex: 0,
        explanation:
          "講師の役割は医療診断ではなく、構造の理解をもとに安全な観察と修正候補を提示することです。",
        sourceIds: safetySources,
      },
    ],
    relatedPoseSlugs: ["downward-facing-dog", "warrior-ii"],
    relatedAnatomySlugs: ["shoulder-joint", "hip-joint", "spine"],
    sourceIds: combinedSources,
  },
  {
    id: "lesson-joints-range",
    slug: "joints-and-range-of-motion",
    title: "関節と可動域の基礎",
    subtitle: "動ける範囲と、安定しやすい範囲を見分ける。",
    summary: "関節の動き、可動域、個人差を、ヨガ指導で観察しやすい言葉に整理します。",
    category: "関節",
    level: "基礎",
    estimatedMinutes: 15,
    bodyArea: "肩・股関節・脊柱",
    tags: ["可動域", "関節運動", "個人差"],
    learningObjectives: [
      "屈曲・伸展・外転・内転などの基本語を理解する",
      "可動性と安定性を対立ではなく協働として捉える",
      "可動域の個人差を尊重した修正候補を考える",
    ],
    keyPoints: [
      "関節は骨同士が動く場所で、周囲の筋や靭帯、関節包などの影響を受けます。",
      "大きく動くことと安全に学べることは同じではありません。",
      "安定しやすい範囲を探すことは、柔軟性を否定することではありません。",
    ],
    sections: [
      {
        id: "joint-basics",
        title: "関節運動の基本",
        kind: "anatomy",
        gentleExplanation: "関節の名前と動き方を知ると、ポーズの観察が具体的になります。",
        body: [
          "関節は骨と骨が連結する部位で、形状や周囲組織によって動きやすい方向が異なります。",
          "ヨガでは、肩関節、股関節、脊柱、膝、手首などに体重や伸張感が集まりやすいことがあります。",
        ],
        sourceIds: anatomySources,
      },
      {
        id: "range-in-class",
        title: "クラスでの見方",
        kind: "teaching",
        body: [
          "可動域は広いほどよいと捉えず、呼吸が保てる範囲、支えを感じられる範囲を一緒に探します。",
          "同じポーズでも、ブロック、壁、膝の曲げ伸ばしで負担が出にくい形へ調整することがあります。",
        ],
        sourceIds: safetySources,
      },
    ],
    teacherNotes: [
      "「もっと深く」よりも「呼吸が続く範囲で」を優先すると、観察が穏やかになります。",
      "関節名を伝えるときは、手で触れる位置や動きの方向も合わせると理解しやすくなります。",
    ],
    commonObservations: [
      "股関節の動きを腰で代償する",
      "肩の可動域を首の緊張で補う",
      "膝や手首に体重が集中する",
    ],
    safetyNotes: [
      "関節に鋭い痛みや不安感がある場合は、その動きを中止または軽減する。",
      "痛みを可動域の制限として無理に突破しようとしない。",
    ],
    quiz: [
      {
        question: "可動域を見るときに講師が優先したい視点はどれですか。",
        choices: [
          "全員が同じ完成形に近づいているか",
          "呼吸や安定感が保てる範囲で動けているか",
          "一番柔らかい人を基準にできているか",
        ],
        answerIndex: 1,
        explanation:
          "可動域には個人差があり、安定しやすい範囲や負担感の観察が安全な指導につながります。",
        sourceIds: safetySources,
      },
    ],
    relatedPoseSlugs: ["triangle-pose", "seated-forward-fold"],
    relatedAnatomySlugs: ["shoulder-joint", "hip-joint", "spine"],
    sourceIds: combinedSources,
  },
  {
    id: "lesson-muscle-actions",
    slug: "muscle-actions-agonist-antagonist",
    title: "筋肉の働きと主動筋・拮抗筋",
    subtitle: "伸ばす筋肉だけでなく、支える筋肉も見る。",
    summary: "筋肉を伸ばす・縮めるだけでなく、姿勢を支える働きとして理解します。",
    category: "筋肉",
    level: "基礎",
    estimatedMinutes: 14,
    bodyArea: "全身",
    tags: ["主動筋", "拮抗筋", "安定性"],
    learningObjectives: [
      "主動筋・拮抗筋・協働筋の考え方を学ぶ",
      "ポーズで伸びる部位と安定に使う部位を分けて観察する",
      "筋肉の説明を、過度な効果保証にしない言い方で伝える",
    ],
    keyPoints: [
      "筋肉は関節を動かすだけでなく、姿勢を保つためにも働きます。",
      "伸張感がある部位だけを見ていると、支える部位の疲労や負担を見落としやすくなります。",
      "筋肉名は地図であり、個別の痛みの原因を断定するものではありません。",
    ],
    sections: [
      {
        id: "muscle-roles",
        title: "筋肉の役割",
        kind: "anatomy",
        gentleExplanation: "筋肉は骨を引いて関節を動かし、姿勢を保つ支えにもなります。",
        body: [
          "骨格筋は収縮によって骨格を動かし、関節や姿勢の安定にも関わります。",
          "主動筋、拮抗筋、協働筋という見方は、ポーズでどの部位が働きやすいかを整理する助けになります。",
        ],
        sourceIds: anatomySources,
      },
      {
        id: "stretch-and-support",
        title: "伸びる部位と支える部位",
        kind: "teaching",
        body: [
          "前屈ではハムストリングスの伸張感に注目しやすい一方、骨盤や脊柱をどう支えるかも観察します。",
          "筋肉を鍛える・伸ばすという効果を保証せず、「使われやすい」「伸びを感じやすい」と表現します。",
        ],
        sourceIds: anatomySources,
      },
    ],
    teacherNotes: [
      "筋肉名を覚える目的は、学習者を分類することではなく、観察の解像度を上げることです。",
      "筋肉の硬さを一つの原因に決めつけず、呼吸、姿勢、疲労、心理的緊張も含めて見ます。",
    ],
    commonObservations: [
      "伸ばしたい部位以外に力みが出る",
      "安定させたい部位が抜けて関節に負担が集まる",
      "左右差を無理にそろえようとする",
    ],
    safetyNotes: [
      "強い伸張痛やしびれを伴う場合は、角度を浅くするか動きを休む。",
      "筋肉名を使って痛みの原因を断定しない。",
    ],
    quiz: [
      {
        question: "主動筋・拮抗筋の説明として近いものはどれですか。",
        choices: [
          "一つの筋肉だけが単独で身体を動かすという考え方",
          "動きに関わる筋肉の役割を整理するための見方",
          "痛みの原因を特定する診断法",
        ],
        answerIndex: 1,
        explanation:
          "筋肉の役割分担は動きを理解するための手がかりであり、診断として用いるものではありません。",
        sourceIds: anatomySources,
      },
    ],
    relatedPoseSlugs: ["bridge-pose", "warrior-ii"],
    relatedAnatomySlugs: ["hamstrings", "gluteus-maximus", "quadriceps"],
    sourceIds: anatomySources,
  },
  {
    id: "lesson-breath-rib-cage",
    slug: "breath-and-rib-cage-basics",
    title: "呼吸と胸郭の基礎",
    subtitle: "呼吸を、胸郭と横隔膜の動きとして観察する。",
    summary: "胸郭・横隔膜・呼吸の基本を、クラス中の安心感や姿勢観察に結びつけます。",
    category: "基礎解剖学",
    level: "基礎",
    estimatedMinutes: 13,
    bodyArea: "胸郭・横隔膜",
    tags: ["呼吸", "胸郭", "横隔膜"],
    learningObjectives: [
      "胸郭と横隔膜の基礎構造を理解する",
      "呼吸を深さの競争ではなく、観察の手がかりとして扱う",
      "呼吸指導で不安をあおらない言葉を選ぶ",
    ],
    keyPoints: [
      "横隔膜は胸腔と腹腔を分ける筋で、呼吸運動に大きく関わります。",
      "胸郭は肋骨・胸骨・胸椎で構成され、呼吸時の容量変化に関係します。",
      "呼吸は個人差が大きく、強制せず観察しやすい環境を作ります。",
    ],
    sections: [
      {
        id: "thoracic-cavity",
        title: "胸郭と横隔膜",
        kind: "anatomy",
        gentleExplanation:
          "胸郭は呼吸でふくらみやすい器のような構造、横隔膜はその底面にある筋肉として学びます。",
        body: [
          "胸郭は肋骨、胸骨、胸椎を含む構造で、胸腔内の器官を保護し、呼吸時の動きにも関わります。",
          "横隔膜は胸腔と腹腔を分ける筋で、呼吸に伴う胸腔容積の変化に関係します。",
        ],
        sourceIds: anatomySources,
      },
      {
        id: "breathing-cues",
        title: "呼吸の伝え方",
        kind: "teaching",
        body: [
          "「もっと深く吸って」と強めるより、「今ある呼吸を観察します」と伝えると、力みに気づきやすくなります。",
          "息苦しさや不安感が出る場合は、呼吸法を休み、自然な呼吸に戻す選択肢を提示します。",
        ],
        sourceIds: safetySources,
      },
    ],
    teacherNotes: [
      "胸郭を手で触れるセルフチェックは、強制せず選択制にすると安心感が保たれます。",
      "呼吸の良し悪しを決めるより、姿勢や緊張との関係を観察します。",
    ],
    commonObservations: [
      "肩で息をしようとして首が緊張する",
      "息を止めたままポーズを深める",
      "腹部や胸部の動きを正解化してしまう",
    ],
    safetyNotes: [
      "めまい、息苦しさ、不安感がある場合は呼吸法を中止し、必要に応じて専門家へ相談する。",
      "妊娠中や呼吸器・循環器に不安がある人へ強い呼吸法を勧めない。",
    ],
    quiz: [
      {
        question: "呼吸の指導で安全に近い表現はどれですか。",
        choices: [
          "必ず大きく吸い切りましょう",
          "今の呼吸を観察し、苦しさがあれば自然な呼吸に戻しましょう",
          "息苦しさはよい変化のサインです",
        ],
        answerIndex: 1,
        explanation: "呼吸指導では不快感や不安感を軽視せず、選択肢を示すことが大切です。",
        sourceIds: safetySources,
      },
    ],
    relatedPoseSlugs: ["childs-pose", "cobra-pose", "bridge-pose"],
    relatedAnatomySlugs: ["diaphragm", "rib-cage", "spine"],
    sourceIds: combinedSources,
  },
  {
    id: "lesson-shoulder-down-dog",
    slug: "shoulder-and-downward-facing-dog",
    title: "肩関節とダウンドッグ",
    subtitle: "手で床を押すポーズを、肩だけで抱え込まない。",
    summary: "ダウンドッグで肩、胸郭、脊柱、手首に負担が集まりやすい状況を観察します。",
    category: "ポーズ",
    level: "実践",
    estimatedMinutes: 18,
    bodyArea: "肩・胸郭・手首",
    tags: ["ダウンドッグ", "肩関節", "荷重"],
    learningObjectives: [
      "ダウンドッグの上肢荷重を肩関節だけでなく胸郭・脊柱と合わせて見る",
      "肩や手首に負担が出やすいパターンを観察する",
      "膝を曲げる、手の位置を変えるなどの修正候補を学ぶ",
    ],
    keyPoints: [
      "肩関節は可動性が高く、周囲の支えとセットで観察します。",
      "ダウンドッグでは上肢、体幹、下肢のどこか一部に負担が集まりすぎない形を探します。",
      "手首や肩に不安がある場合は、時間を短くする、角度を変える、別の形を選ぶことがあります。",
    ],
    sections: [
      {
        id: "shoulder-load",
        title: "肩まわりの構造",
        kind: "anatomy",
        gentleExplanation:
          "肩はよく動く関節で、肩甲帯や胸郭の動きと一緒に見ると整理しやすくなります。",
        body: [
          "肩関節は大きな可動性を持つ一方、周囲の筋や肩甲帯との協調が姿勢保持に関わります。",
          "上肢で体重を支えるポーズでは、肩、手首、胸郭、脊柱の関係を一体として観察します。",
        ],
        sourceIds: anatomySources,
      },
      {
        id: "down-dog-teaching",
        title: "ダウンドッグでの講師視点",
        kind: "teaching",
        body: [
          "肩がすくむ、肘が過伸展しやすい、腰を反って形を作る場合は、膝を曲げる・手を前へ置く・壁を使うなどの修正候補があります。",
          "「踵を床へ」よりも、手で床を押しながら呼吸できる範囲を探すと、負担の観察がしやすくなります。",
        ],
        sourceIds: safetySources,
      },
    ],
    teacherNotes: [
      "肩幅や手の角度は一律に決めず、手首と肩の感覚を確認します。",
      "長く保つより、短い保持で呼吸と荷重の分散を見ます。",
    ],
    commonObservations: [
      "肩が耳に近づき、首が詰まりやすい",
      "腰を反らせて背中の長さを作ろうとする",
      "手首に体重が集まり、指先が浮く",
    ],
    safetyNotes: [
      "手首、肩、腰に痛みや不安がある場合は、壁・椅子・チャイルドポーズなどへ変更する。",
      "めまい、血圧、緑内障などに不安がある人には、頭を下げる姿勢の時間や選択肢に配慮する。",
    ],
    quiz: [
      {
        question: "ダウンドッグで肩が詰まりやすい人への修正候補として穏やかなものはどれですか。",
        choices: [
          "踵を床につけるまで強く押す",
          "膝を曲げ、手の位置や保持時間を調整する",
          "痛みがあっても肩を伸ばし続ける",
        ],
        answerIndex: 1,
        explanation:
          "荷重の分散と呼吸の保ちやすさを優先し、痛みがあれば無理をしない選択が大切です。",
        sourceIds: safetySources,
      },
    ],
    relatedPoseSlugs: ["downward-facing-dog", "childs-pose"],
    relatedAnatomySlugs: ["shoulder-joint", "rib-cage", "spine"],
    sourceIds: combinedSources,
  },
  {
    id: "lesson-hip-forward-fold",
    slug: "hip-and-forward-fold",
    title: "股関節と前屈",
    subtitle: "背中を丸める前に、骨盤と股関節の動きを見る。",
    summary: "前屈でハムストリングス、骨盤、脊柱の関係を分けて観察する実践レッスンです。",
    category: "ポーズ",
    level: "実践",
    estimatedMinutes: 17,
    bodyArea: "股関節・骨盤・脊柱",
    tags: ["前屈", "股関節", "ハムストリングス"],
    learningObjectives: [
      "股関節屈曲と脊柱屈曲を分けて観察する",
      "ハムストリングスの伸張感を安全に扱う",
      "膝を曲げる、座面を高くするなどの修正候補を学ぶ",
    ],
    keyPoints: [
      "前屈では股関節、骨盤、脊柱、ハムストリングスの関係を分けて見ると整理しやすくなります。",
      "膝を曲げることは逃げではなく、骨盤と脊柱を観察しやすくする選択肢です。",
      "強い伸張痛やしびれは柔軟性向上のサインとして扱いません。",
    ],
    sections: [
      {
        id: "hip-flexion",
        title: "股関節と骨盤の動き",
        kind: "anatomy",
        gentleExplanation:
          "前屈は背中だけでなく、太ももの付け根から折りたたむ動きとして観察できます。",
        body: [
          "股関節は大腿骨と骨盤の関係で動き、前屈では股関節屈曲と脊柱の動きが組み合わさります。",
          "ハムストリングスは坐骨から下腿にかけて関わる筋群として、膝や股関節の動きに影響します。",
        ],
        sourceIds: anatomySources,
      },
      {
        id: "forward-fold-teaching",
        title: "前屈での講師視点",
        kind: "teaching",
        body: [
          "骨盤が後ろへ倒れやすい場合、座面を高くしたり膝を曲げたりすると、腰に負担が出にくい形へ調整できることがあります。",
          "深さよりも、背面の伸張感が強くなりすぎず、呼吸が続く範囲を探します。",
        ],
        sourceIds: safetySources,
      },
    ],
    teacherNotes: [
      "前屈の見た目だけで柔軟性を評価しない。",
      "膝を曲げる選択肢を先に提示すると、学習者が安心して調整できます。",
    ],
    commonObservations: [
      "骨盤が後傾し、腰背部だけで丸める",
      "膝裏の伸張感が強くなり、呼吸が止まる",
      "足先をつかむことを優先する",
    ],
    safetyNotes: [
      "腰や坐骨神経まわりに不安がある人には、座面を高くする、膝を曲げる、保持を短くする選択肢を出す。",
      "しびれや鋭い痛みがある場合は中止し、専門家へ相談する。",
    ],
    quiz: [
      {
        question: "座位前屈で膝を曲げる理由として適切なものはどれですか。",
        choices: [
          "完成形から遠ざかるため避ける",
          "骨盤と脊柱の動きを観察しやすくし、負担を調整するため",
          "必ずハムストリングスを治療できるため",
        ],
        answerIndex: 1,
        explanation: "膝を曲げることは、伸張感や腰の負担を調整する修正候補の一つです。",
        sourceIds: safetySources,
      },
    ],
    relatedPoseSlugs: ["seated-forward-fold", "triangle-pose"],
    relatedAnatomySlugs: ["hip-joint", "pelvis", "hamstrings", "spine"],
    sourceIds: combinedSources,
  },
  {
    id: "lesson-low-back-care",
    slug: "support-for-low-back-concerns",
    title: "腰に不安がある人への配慮",
    subtitle: "治すのではなく、負担が出にくい選択肢を増やす。",
    summary:
      "腰に不安がある参加者へ、医療的な断定を避けながら一般的な配慮と修正候補を提示するレッスンです。",
    category: "安全配慮",
    level: "実践",
    estimatedMinutes: 16,
    bodyArea: "腰部・骨盤・股関節",
    tags: ["腰", "安全配慮", "修正候補"],
    learningObjectives: [
      "腰への不安を医療診断として扱わない姿勢を確認する",
      "前屈・後屈・ねじりで負担が出やすい状況を観察する",
      "クラス中に使える安全な言葉がけを学ぶ",
    ],
    keyPoints: [
      "腰痛の原因を講師が断定しない。",
      "腰に不安がある人には、動きの深さ、保持時間、支えを調整する選択肢を提示します。",
      "痛みや既往歴がある場合は、医師・理学療法士・資格を持つ専門家への相談を促します。",
    ],
    sections: [
      {
        id: "low-back-anatomy",
        title: "腰部を周辺構造として見る",
        kind: "anatomy",
        gentleExplanation:
          "腰だけを単独で見るのではなく、脊柱、骨盤、股関節、呼吸との関係を観察します。",
        body: [
          "脊柱は複数の椎骨が連なる構造で、体幹の支持と動きに関わります。",
          "腰部の負担感は個人差があり、股関節や骨盤、胸郭の動きと合わせて観察します。",
        ],
        sourceIds: anatomySources,
      },
      {
        id: "low-back-teaching",
        title: "一般的な配慮と言葉がけ",
        kind: "safety",
        body: [
          "「腰痛を改善するポーズ」とは伝えず、「腰に不安がある場合は、浅めの角度や支えを使うことがあります」と表現します。",
          "痛み、しびれ、既往歴、妊娠中、高齢者、不安がある場合は、専門家に相談するよう案内します。",
        ],
        sourceIds: safetySources,
      },
    ],
    teacherNotes: [
      "腰が不安な人に前屈・後屈・ねじりを一律に禁止するのではなく、本人の感覚と専門家の助言を尊重します。",
      "クラス中は、休む選択肢を自然に出しておくと自己調整しやすくなります。",
    ],
    commonObservations: [
      "腰だけで後屈しようとする",
      "前屈で膝を伸ばし切り、腰背部が強く丸まる",
      "ねじりで呼吸を止めて深める",
    ],
    safetyNotes: [
      "鋭い痛み、しびれ、放散痛、不安がある場合は動きを中止する。",
      "医療的な判断が必要そうな相談には、専門家への相談を促す。",
    ],
    quiz: [
      {
        question: "腰に不安がある人への説明として適切なのはどれですか。",
        choices: [
          "このポーズで腰痛が治ります",
          "腰に不安がある場合は、浅めの角度や支えを使うことがあります",
          "痛みがあるほど効果的です",
        ],
        answerIndex: 1,
        explanation: "医療的な断定や治療効果の保証を避け、一般的な配慮と修正候補として伝えます。",
        sourceIds: safetySources,
      },
    ],
    relatedPoseSlugs: ["childs-pose", "bridge-pose", "seated-forward-fold"],
    relatedAnatomySlugs: ["spine", "pelvis", "hip-joint", "iliopsoas"],
    sourceIds: combinedSources,
  },
];
