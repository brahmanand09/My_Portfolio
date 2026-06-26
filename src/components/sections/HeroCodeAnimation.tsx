"use client";

import { useEffect, useState, type ReactNode } from "react";

const snippets = [
  {
    file: "portfolio.tsx",
    lines: [
      { indent: 0, tokens: [{ t: "import", c: "kw" }, { t: " { Hero } ", c: "acc" }, { t: "from", c: "kw" }, { t: " 'next'", c: "str" }] },
      { indent: 0, tokens: [] },
      { indent: 0, tokens: [{ t: "export default", c: "kw" }, { t: " function ", c: "def" }, { t: "Home", c: "fn" }, { t: "() {", c: "def" }] },
      { indent: 1, tokens: [{ t: "return", c: "kw" }, { t: " (", c: "def" }] },
      { indent: 2, tokens: [{ t: "<Hero", c: "tag" }, { t: " role=", c: "def" }, { t: '"Full Stack"', c: "str" }, { t: " />", c: "tag" }] },
      { indent: 1, tokens: [{ t: ");", c: "def" }] },
      { indent: 0, tokens: [{ t: "}", c: "def" }] },
    ],
  },
  {
    file: "api/route.ts",
    lines: [
      { indent: 0, tokens: [{ t: "export async", c: "kw" }, { t: " function ", c: "def" }, { t: "POST", c: "fn" }, { t: "(req) {", c: "def" }] },
      { indent: 1, tokens: [{ t: "const", c: "kw" }, { t: " data = ", c: "def" }, { t: "await", c: "kw" }, { t: " req.json();", c: "def" }] },
      { indent: 1, tokens: [{ t: "await", c: "kw" }, { t: " db.collection(", c: "def" }, { t: "'contacts'", c: "str" }, { t: ").insert(data);", c: "def" }] },
      { indent: 1, tokens: [{ t: "return", c: "kw" }, { t: " Response.json({ ok: ", c: "def" }, { t: "true", c: "bool" }, { t: " });", c: "def" }] },
      { indent: 0, tokens: [{ t: "}", c: "def" }] },
    ],
  },
  {
    file: "server.js",
    lines: [
      { indent: 0, tokens: [{ t: "const", c: "kw" }, { t: " app = ", c: "def" }, { t: "express", c: "fn" }, { t: "();", c: "def" }] },
      { indent: 0, tokens: [{ t: "app.use", c: "fn" }, { t: "(cors()).use(express.json());", c: "def" }] },
      { indent: 0, tokens: [{ t: "app.get", c: "fn" }, { t: "('/api/health', (_, res) => {", c: "def" }] },
      { indent: 1, tokens: [{ t: "res.json", c: "fn" }, { t: "({ status: ", c: "def" }, { t: "'live'", c: "str" }, { t: " });", c: "def" }] },
      { indent: 0, tokens: [{ t: "});", c: "def" }] },
    ],
  },
];

const colorMap: Record<string, string> = {
  kw: "text-[#c792ea]",
  fn: "text-[#82aaff]",
  str: "text-[#c3e88d]",
  tag: "text-[#f07178]",
  acc: "text-[#89ddff]",
  def: "text-[#a6accd]",
  bool: "text-[#ffcb6b]",
  num: "text-[#f78c6c]",
};

function lineToText(line: (typeof snippets)[0]["lines"][0]) {
  return "  ".repeat(line.indent) + line.tokens.map((token) => token.t).join("");
}

export function HeroCodeAnimation() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const snippet = snippets[snippetIndex];
  const fullText = snippet.lines.map(lineToText).join("\n");
  const progress = fullText.slice(0, visibleChars);
  const displayLines = progress.split("\n");

  useEffect(() => {
    const typingSpeed = isDeleting ? 18 : 32;
    const pauseAtEnd = 2200;
    const pauseBeforeDelete = 2800;

    if (!isDeleting && visibleChars < fullText.length) {
      const timer = setTimeout(() => setVisibleChars((c) => c + 1), typingSpeed);
      return () => clearTimeout(timer);
    }

    if (!isDeleting && visibleChars === fullText.length) {
      const timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      return () => clearTimeout(timer);
    }

    if (isDeleting && visibleChars > 0) {
      const timer = setTimeout(() => setVisibleChars((c) => c - 1), typingSpeed);
      return () => clearTimeout(timer);
    }

    if (isDeleting && visibleChars === 0) {
      const timer = setTimeout(() => {
        setIsDeleting(false);
        setSnippetIndex((i) => (i + 1) % snippets.length);
      }, pauseAtEnd);
      return () => clearTimeout(timer);
    }
  }, [visibleChars, isDeleting, fullText.length, snippetIndex]);

  function renderColoredLine(lineIndex: number, typedLine: string) {
    const sourceLine = snippet.lines[lineIndex];
    if (!sourceLine) return null;

    if (sourceLine.tokens.length === 0) {
      return typedLine;
    }

    const indentStr = "  ".repeat(sourceLine.indent);
    let charPos = indentStr.length;
    const spans: ReactNode[] = [];

    if (typedLine.length <= indentStr.length && indentStr.startsWith(typedLine)) {
      return <span className="text-[#a6accd]">{typedLine}</span>;
    }

    if (typedLine.startsWith(indentStr)) {
      spans.push(
        <span key={`${lineIndex}-indent`} className="text-[#a6accd]">
          {indentStr}
        </span>,
      );
    }

    for (const token of sourceLine.tokens) {
      const tokenStart = charPos;
      charPos += token.t.length;
      const visiblePart = typedLine.slice(tokenStart, Math.min(charPos, typedLine.length));
      if (!visiblePart) continue;
      spans.push(
        <span key={`${lineIndex}-${tokenStart}`} className={colorMap[token.c]}>
          {visiblePart}
        </span>,
      );
    }

    return spans;
  }

  return (
    <div className="code-editor relative z-10 w-full">
      <div className="code-editor-header flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-xs text-subtle">{snippet.file}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-success">
          <span className="code-status-dot h-1.5 w-1.5 rounded-full bg-success" />
          live
        </span>
      </div>

      <div className="code-editor-body min-h-[220px] p-4 font-mono text-[11px] leading-relaxed sm:min-h-[240px] sm:text-xs md:text-[13px]">
        {snippet.lines.map((line, lineIndex) => {
          const typedLine = displayLines[lineIndex] ?? "";
          const isActiveLine = lineIndex === displayLines.length - 1;
          const showCursor = isActiveLine && !isDeleting && visibleChars < fullText.length;

          return (
            <div key={`${snippet.file}-${lineIndex}`} className="flex min-h-[1.4em]">
              <span className="mr-3 w-4 shrink-0 select-none text-right text-subtle/50">
                {lineIndex + 1}
              </span>
              <span className="flex-1 whitespace-pre">
                {renderColoredLine(lineIndex, typedLine)}
                {showCursor && <span className="code-cursor ml-px inline-block h-[1.1em] w-[2px] bg-accent align-middle" />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
