import type { JSX } from "react";
import { SortableTweets } from "./SortableTweets";
import { TweetBox } from "./TweetBox";
import type { Tweet } from "./storage";

type ThreadListProps = {
  tweets: Tweet[];
  autoFocusId: string | null;
  onChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onReorder: (next: Tweet[]) => void;
};

/**
 * スレッド内のツイート一覧を縦に並べて描画するコンポーネント。
 *
 * @param tweets 表示するツイート配列
 * @param autoFocusId 起動直後にフォーカスを当てるツイートの ID(なければ `null`)
 * @param onChange 本文編集時に `(id, text)` で呼ばれるコールバック
 * @param onDelete 削除時に該当 ID で呼ばれるコールバック
 * @param onReorder 並び替え後の新しい配列を受け取るコールバック
 */
export const ThreadList = ({
  tweets,
  autoFocusId,
  onChange,
  onDelete,
  onReorder,
}: ThreadListProps): JSX.Element => (
  <SortableTweets tweets={tweets} onReorder={onReorder}>
    <div>
      {tweets.map(
        (t, i): JSX.Element => (
          <TweetBox
            key={t.id}
            id={t.id}
            index={i}
            text={t.text}
            autoFocus={t.id === autoFocusId}
            onChange={(text): void => onChange(t.id, text)}
            onDelete={(): void => onDelete(t.id)}
          />
        ),
      )}
    </div>
  </SortableTweets>
);
