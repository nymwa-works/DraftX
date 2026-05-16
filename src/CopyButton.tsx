import { useState, type JSX } from "react";

type CopyButtonProps = {
  text: string;
};

/**
 * ツイート本文をクリップボードへコピーするアイコンボタン。
 *
 * 成功すると 1.5 秒だけアイコンをチェックマークに切り替える。
 * クリップボード API が利用できない環境では何もしない。
 *
 * @param text ツイート本文
 */
export const CopyButton = ({ text }: CopyButtonProps): JSX.Element => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? "コピーしました" : "コピー"}
      className="cursor-pointer rounded px-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
    >
      {copied ? "✓" : "⧉"}
    </button>
  );
};
