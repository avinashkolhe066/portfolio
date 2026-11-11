import { useEffect, useState } from "react";

export default function TypingText({ words, speed = 70, pause = 1400 }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i];
    let t;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((i + 1) % words.length);
    } else
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? speed / 2 : speed
      );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return (
    <span>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent">&nbsp;</span>
    </span>
  );
}