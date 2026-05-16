import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { JSX, ReactNode } from "react";
import type { Tweet } from "./storage";
import { reorderTweets } from "./threadReorder";

type SortableTweetsProps = {
  tweets: Tweet[];
  onReorder: (next: Tweet[]) => void;
  children: ReactNode;
};

/**
 * ツイート配列に対するドラッグ&ドロップ並び替えを提供するコンポーネント。
 *
 * @param tweets 対象のツイート配列
 * @param onReorder 並び替え後の配列を受け取るコールバック
 * @param children DnD コンテキスト配下にレンダリングするリスト UI
 */
export const SortableTweets = ({
  tweets,
  onReorder,
  children,
}: SortableTweetsProps): JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(e): void => {
        const next = reorderTweets(tweets, e);
        if (next) {
          onReorder(next);
        }
      }}
    >
      <SortableContext
        items={tweets.map((t): string => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};
