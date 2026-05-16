import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import type { JSX } from "react";

type TweetHeaderProps = {
  index: number;
  dragAttributes: DraggableAttributes;
  dragListeners: DraggableSyntheticListeners;
  onDelete: () => void;
};

/**
 * ツイートカード上部に表示するヘッダー行。
 *
 * 並び替え用のドラッグハンドルと削除ボタンを含む。
 *
 * @param index ツイートのインデックス（0始まり、表示時は+1される）
 * @param dragAttributes dnd-kit のドラッグ用属性
 * @param dragListeners dnd-kit のドラッグ用イベントリスナー
 * @param onDelete 削除ボタン押下時に呼び出されるコールバック
 */
export const TweetHeader = ({
  index,
  dragAttributes,
  dragListeners,
  onDelete,
}: TweetHeaderProps): JSX.Element => (
  <div className="mb-2.5 flex items-center justify-between text-sm font-bold text-slate-500">
    <div className="flex items-center gap-2">
      <button
        type="button"
        {...dragAttributes}
        {...dragListeners}
        aria-label="並び替え"
        className="cursor-grab touch-none rounded px-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing"
      >
        ⠿
      </button>
      <span>ツイート {index + 1}</span>
    </div>
    <button
      type="button"
      onClick={onDelete}
      className="cursor-pointer rounded px-2 py-1 text-rose-600 hover:bg-rose-600/10"
    >
      削除
    </button>
  </div>
);
