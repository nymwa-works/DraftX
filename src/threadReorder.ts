import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Tweet } from "./storage";

/**
 * dnd-kit の `onDragEnd` イベントから並び替え後の配列を返す。
 *
 * @param tweets 並び替え前のツイート配列
 * @param event dnd-kit の `DragEndEvent`
 * @returns 並び替え後の新しい配列。並び替えが不要・不能な場合は `null`
 */
export const reorderTweets = (
  tweets: Tweet[],
  event: DragEndEvent,
): Tweet[] | null => {
  const {
    active, // ドラッグされているアイテム
    over, // ドロップ先のアイテム
  } = event;

  // ドロップ先がない、または同じアイテムにドロップされた場合は並び替え不要
  if (!over || active.id === over.id) {
    return null;
  }
  const oldIndex = tweets.findIndex((t): boolean => t.id === active.id);
  const newIndex = tweets.findIndex((t): boolean => t.id === over.id);

  // インデックスが見つからない場合は並び替え不能
  if (oldIndex === -1 || newIndex === -1) {
    return null;
  }
  return arrayMove(tweets, oldIndex, newIndex);
};
