export interface SourceDigest {
  sourceId: string;
  label: string;
  publicFinding: string;
  platformUse: string;
  routeHref: string;
}

export const sourceDigests: SourceDigest[] = [
  {
    sourceId: "openstax-anatomy-terminology",
    label: "Anatomical terminology",
    publicFinding: "身体を標準化して記述するため、解剖学的肢位と方向用語を基準にする。",
    platformUse:
      "ポーズの見た目ではなく、肩・胸郭・骨盤・脊柱などの部位と言葉を揃えて観察する入口にする。",
    routeHref: "/lessons/anatomy-for-yoga-teachers",
  },
  {
    sourceId: "openstax-skeletal-muscle",
    label: "Skeletal muscle",
    publicFinding: "骨格筋は結合組織、神経、血管を含む器官として、骨を引いて身体運動へ関わる。",
    platformUse:
      "伸びる筋肉だけでなく、支える筋肉・協働する部位・疲労しやすい場所を分けて表示する。",
    routeHref: "/lessons/muscle-actions-agonist-antagonist",
  },
  {
    sourceId: "yoga-alliance-rys-standards",
    label: "Teacher training standards",
    publicFinding: "講師養成では安全な動き、身体的制限、禁忌、適応、観察を扱うことが示されている。",
    platformUse:
      "各ポーズに『講師が観察するポイント』『負担が出やすいパターン』『修正候補』を独立カード化する。",
    routeHref: "/poses",
  },
  {
    sourceId: "nccih-yoga-effectiveness-safety",
    label: "Safety and modification",
    publicFinding:
      "妊娠中、高齢者、健康状態に不安がある人は、必要に応じてポーズや実践を避ける・修正する。",
    platformUse: "治療効果の保証を避け、痛み・既往歴・妊娠中・高齢者には専門家への相談を明示する。",
    routeHref: "/safety",
  },
];
