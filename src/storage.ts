/** ツイート1件あたりの最大文字数。 */
export const MAX_LENGTH = 140;
/** localStorage に現在のスレッドを保存する際のキー。 */
export const STORAGE_KEY = "draftx:current-thread";
/** 自動保存を行う際のデバウンス時間（ミリ秒）。 */
export const SAVE_DEBOUNCE_MS = 300;

/** スレッド内の1ツイートを表す型。`id` は描画用の安定キー、`text` は本文。 */
export type Tweet = {
  id: string;
  text: string;
};

/**
 * 新しいツイート用の一意な ID を生成する。
 *
 * @returns crypto.randomUUID() による UUID 文字列
 */
export const newId = (): string => crypto.randomUUID();

/**
 * localStorage から保存済みのスレッド本文を読み込む。
 *
 * 保存形式は文字列配列。
 * データが存在しない・破損している・空配列の場合は `null` を返す。
 *
 * @returns 保存されていたツイート本文の配列、または `null`
 */
export const loadStored = (): string[] | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed.every((t): t is string => typeof t === "string")
    ) {
      return parsed as string[];
    }
  } catch {
    // ignore corrupt storage
  }
  return null;
};

/**
 * 現在のスレッドを localStorage に保存する。
 *
 * `id` は保存せず、本文の配列としてシリアライズする。
 * 容量超過などで失敗した場合は黙って無視する。
 *
 * @param tweets 保存するツイート配列
 */
export const saveStored = (tweets: Tweet[]): void => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tweets.map((t): string => t.text)),
    );
  } catch {
    // ignore quota / unavailable storage
  }
};
