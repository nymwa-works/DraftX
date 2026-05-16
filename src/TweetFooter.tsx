import type { JSX } from "react";
import { CharCounter } from "./CharCounter";
import { CopyButton } from "./CopyButton";

type TweetFooterProps = {
  text: string;
};

/**
 * ツイート本文の下部に表示するフッター行。
 *
 * @param text ツイート本文
 */
export const TweetFooter = ({ text }: TweetFooterProps): JSX.Element => {
  const length = [...text].length;
  return (
    <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
      <CopyButton text={text} />
      <CharCounter length={length} />
    </div>
  );
};
