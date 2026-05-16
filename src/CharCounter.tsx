import type { JSX } from "react";
import { MAX_LENGTH } from "./storage";

type CharCounterProps = {
  length: number;
};

/**
 * ツイートの文字数を `現在数 / 上限` 形式で表示するインライン要素。
 *
 * 上限({@link MAX_LENGTH})を超えると赤、通常時は水色で表示する。
 *
 * @param length 現在の文字数(コードポイント数)
 */
export const CharCounter = ({ length }: CharCounterProps): JSX.Element => (
  <span
    className={`text-sm font-bold ${length > MAX_LENGTH ? "text-rose-600" : "text-sky-500"}`}
  >
    {length} / {MAX_LENGTH}
  </span>
);
