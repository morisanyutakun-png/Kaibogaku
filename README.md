# Asana Anatomy Lab

ヨガ講師・ヨガ講師養成中の学習者向けの「ヨガ解剖学 学習プラットフォーム」MVPです。

ポーズの完成形ではなく、関節・筋肉・安全配慮・講師の観察を、信頼できる参照元に紐づけて学ぶ教材として設計しています。

## セットアップ

```bash
npm install
cp .env.example .env.local
```

`.env.local` はMVPでは空でも動きます。

```env
DATABASE_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Asana Anatomy Lab
```

## 開発起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## 品質チェック

```bash
npm run lint
npm run format:check
npm run build
```

## Vercelデプロイ

1. このリポジトリをGitHubへpush
2. VercelでNew Project
3. Framework PresetはNext.js
4. 必要に応じて `NEXT_PUBLIC_APP_URL` と `NEXT_PUBLIC_APP_NAME` を設定
5. Deploy

現在はDB接続を使わないstatic content構成なので、`DATABASE_URL` が未設定でもビルドできます。

## 現在のデータ構成

教材データは以下にあります。

- `src/data/sources.ts`
- `src/data/lessons.ts`
- `src/data/poses.ts`
- `src/data/anatomy.ts`
- `src/data/safety.ts`

UIは直接 `src/data` をimportせず、`src/lib/repositories` の `contentRepository` 経由で取得します。

## sourceIdsの重要性

すべての lesson / pose / anatomy / quiz / safety topic は `sourceIds` を持ちます。

出典がない教材カードはUI上で「出典未設定」と警告されます。解剖学や安全配慮に関する主張は、必ず `src/data/sources.ts` の参照元へ紐づけてください。

## 教材データの追加方法

1. `src/data/sources.ts` に参照元を追加または確認
2. lesson / pose / anatomy / safety の該当ファイルにデータを追加
3. `sourceIds` に参照元IDを入れる
4. 関連するslugを `relatedPoseSlugs` / `relatedAnatomySlugs` / `relatedLessons` へ追加
5. `npm run lint` と `npm run build` を実行

文体は、医療診断や効果保証に見えないようにしてください。

推奨表現:

- 「安定しやすい」
- 「負担が出やすい」
- 「修正候補」
- 「一般的には」
- 「講師が観察するポイントとして」

避ける表現:

- 「治す」
- 「改善を保証する」
- 「このポーズで治療できる」
- 「正しい / 間違い」

## 将来Neon PostgreSQLへ移行する方法

MVPではstatic content repositoryを使っています。

将来Neonへ移行するときは、以下の流れを想定しています。

1. `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless` を導入
2. `src/db/schema.ts` の `schemaPlan` をDrizzle table定義へ置き換える
3. sources, lessons, poses, anatomyItems, safetyTopics, quizzes, join tablesを正規化
4. `src/lib/repositories/neonContentRepository.ts` を実装
5. `src/lib/repositories/index.ts` のrepository切り替えだけでUIを維持

Next.jsのビルド時に環境変数がなくても壊れないよう、Neon/Drizzleクライアントはmodule scopeで初期化せず、`getDb()` のようなlazy initializerで作成してください。

## 医療アドバイスではありません

このアプリの教材は医療診断や治療を目的としていません。

痛みがある場合、既往歴がある場合、妊娠中、高齢者、不安がある場合は、医師・理学療法士・資格を持つ専門家に相談してください。
