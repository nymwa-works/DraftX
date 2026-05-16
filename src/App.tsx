import type { JSX } from "react";
import { ThreadList } from "./ThreadList";
import { useTweets } from "./useTweets";

/**
 * スレッド作成画面のルートコンポーネント。
 */
export const App = (): JSX.Element => {
  const {
    tweets,
    autoFocusId,
    updateTweet,
    addTweet,
    deleteTweet,
    reorderTweets,
  } = useTweets();

  return (
    <>
      <h2 className="mb-2 text-center text-2xl font-bold text-sky-500">
        スレッド作成
      </h2>
      <ThreadList
        tweets={tweets}
        autoFocusId={autoFocusId}
        onChange={updateTweet}
        onDelete={deleteTweet}
        onReorder={reorderTweets}
      />
      <button
        type="button"
        onClick={addTweet}
        className="mt-4 w-full cursor-pointer rounded-full bg-sky-500 p-3 font-bold text-white transition-colors duration-200 hover:bg-sky-600"
      >
        ＋ ツイートを追加
      </button>
    </>
  );
};
