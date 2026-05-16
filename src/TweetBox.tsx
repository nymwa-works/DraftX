import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { JSX } from "react";
import { TweetFooter } from "./TweetFooter";
import { TweetHeader } from "./TweetHeader";

type TweetBoxProps = {
  id: string;
  index: number;
  text: string;
  autoFocus: boolean;
  onChange: (text: string) => void;
  onDelete: () => void;
};

/**
 * スレッド内の1ツイートを表すカードコンポーネント。
 *
 * dnd-kit の `useSortable` によりドラッグ＆ドロップで並び替え可能。
 *
 * @param id dnd-kit の並び替えに使う一意な ID
 * @param index スレッド内でのインデックス（0始まり）
 * @param text ツイート本文
 * @param autoFocus マウント時に textarea へ自動フォーカスするかどうか
 * @param onChange 本文が変更された際に呼び出されるコールバック
 * @param onDelete 削除ボタン押下時に呼び出されるコールバック
 */
export const TweetBox = ({
  id,
  index,
  text,
  autoFocus,
  onChange,
  onDelete,
}: TweetBoxProps): JSX.Element => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-3.75 rounded-lg border border-slate-300 bg-white p-3.75 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-colors duration-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 ${isDragging ? "z-10 opacity-50" : ""}`}
    >
      <TweetHeader
        index={index}
        dragAttributes={attributes}
        dragListeners={listeners}
        onDelete={onDelete}
      />
      <textarea
        autoFocus={autoFocus}
        value={text}
        onChange={(e): void => onChange(e.target.value)}
        placeholder="いまどうしてる？"
        className="h-25 w-full outline-none"
      />
      <TweetFooter text={text} />
    </div>
  );
};
