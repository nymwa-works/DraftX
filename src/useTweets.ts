import { useEffect, useState } from "react";
import {
  SAVE_DEBOUNCE_MS,
  type Tweet,
  loadStored,
  newId,
  saveStored,
} from "./storage";

/**
 * {@link useTweets} フックが返す値の型。
 *
 * - `tweets`: 現在のツイート配列
 * - `autoFocusId`: 直近に追加されたツイートの ID(初期描画時のフォーカス対象)
 * - `updateTweet` / `addTweet` / `deleteTweet` / `reorderTweets`: 各種更新操作
 */
type UseTweetsReturn = {
  tweets: Tweet[];
  autoFocusId: string | null;
  updateTweet: (id: string, text: string) => void;
  addTweet: () => void;
  deleteTweet: (id: string) => void;
  reorderTweets: (next: Tweet[]) => void;
};

/**
 * localStorage に保存されたツイートを復元し、初期状態として返す。
 *
 * 保存データが無い場合は空文字列1件で初期化する。
 *
 * @returns 復元したツイート配列(各要素に新規 ID を付与)
 */
const initialTweets = (): Tweet[] =>
  (loadStored() ?? [""]).map((text): Tweet => ({ id: newId(), text }));

/**
 * 指定 ID のツイート本文を差し替える状態更新関数を生成する。
 *
 * カリー化されており、{@link useState} の `setState` に直接渡せる形を返す。
 *
 * @param id 差し替え対象のツイート ID
 * @param text 新しい本文
 * @returns 現在の配列を受け取り、本文を差し替えた新しい配列を返す関数
 */
const replaceText =
  (id: string, text: string): ((tweets: Tweet[]) => Tweet[]) =>
  (tweets: Tweet[]): Tweet[] =>
    tweets.map((t): Tweet => (t.id === id ? { ...t, text } : t));

/**
 * ツイートを末尾に追加する状態更新関数を生成する。
 *
 * @param tweet 末尾に追加する新しいツイート
 * @returns 現在の配列を受け取り、末尾に追加した新しい配列を返す関数
 */
const appendTweet =
  (tweet: Tweet): ((tweets: Tweet[]) => Tweet[]) =>
  (tweets: Tweet[]): Tweet[] => [...tweets, tweet];

/**
 * 指定 ID のツイートを除外する状態更新関数を生成する。
 *
 * @param id 削除対象のツイート ID
 * @returns 現在の配列を受け取り、該当 ID を除いた新しい配列を返す関数
 */
const removeById =
  (id: string): ((tweets: Tweet[]) => Tweet[]) =>
  (tweets: Tweet[]): Tweet[] =>
    tweets.filter((t): boolean => t.id !== id);

/**
 * スレッド内のツイート配列とその操作を管理するカスタムフック。
 */
export const useTweets = (): UseTweetsReturn => {
  const [tweets, setTweets] = useState<Tweet[]>(initialTweets);
  const [autoFocusId, setAutoFocusId] = useState<string | null>(null);

  useEffect((): (() => void) => {
    const id = setTimeout((): void => saveStored(tweets), SAVE_DEBOUNCE_MS);
    return (): void => clearTimeout(id);
  }, [tweets]);

  const updateTweet = (id: string, text: string): void => {
    setTweets(replaceText(id, text));
  };

  const addTweet = (): void => {
    const id = newId();
    setTweets(appendTweet({ id, text: "" }));
    setAutoFocusId(id);
  };

  const deleteTweet = (id: string): void => {
    if (tweets.length <= 1) {
      alert("最後の1つは削除できません。");
      return;
    }
    setTweets(removeById(id));
  };

  return {
    tweets,
    autoFocusId,
    updateTweet,
    addTweet,
    deleteTweet,
    reorderTweets: setTweets,
  };
};
