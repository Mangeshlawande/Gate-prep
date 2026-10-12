'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  Info,
  Lightbulb,
  CheckCircle2,
  Code2
} from 'lucide-react';

interface MarkdownMessageProps {
  content: string;
}

type Block =
  | { type: 'code'; code: string; language: string }
  | { type: 'alert'; variant: 'warning' | 'note' | 'tip'; text: string }
  | { type: 'heading'; level: number; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'paragraph'; text: string };

function parseMarkdownBlocks(rawText: string): Block[] {
  if (!rawText) return [];
  const lines = rawText.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 1. Code blocks: ``` or ```lang
    if (line.trim().startsWith('```')) {
      const language = line.trim().replace(/^```/, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++; // consume closing backticks
      }
      blocks.push({
        type: 'code',
        code: codeLines.join('\n'),
        language
      });
      continue;
    }

    // 2. Alert / Blockquotes: lines starting with >
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const combined = quoteLines.join('\n');
      let variant: 'warning' | 'note' | 'tip' = 'note';
      let cleanText = combined;

      if (combined.startsWith('[!WARNING]')) {
        variant = 'warning';
        cleanText = combined.replace('[!WARNING]', '').trim();
      } else if (combined.startsWith('[!NOTE]')) {
        variant = 'note';
        cleanText = combined.replace('[!NOTE]', '').trim();
      } else if (combined.startsWith('[!TIP]')) {
        variant = 'tip';
        cleanText = combined.replace('[!TIP]', '').trim();
      }

      blocks.push({
        type: 'alert',
        variant,
        text: cleanText
      });
      continue;
    }

    // 3. Headings: ### or #### or ##
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim()
      });
      i++;
      continue;
    }

    // 4. Unordered Lists: lines starting with - or *
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({
        type: 'list',
        ordered: false,
        items
      });
      continue;
    }

    // 5. Ordered Lists: lines starting with 1. or 2.
    if (/^\d+\.\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({
        type: 'list',
        ordered: true,
        items
      });
      continue;
    }

    // 6. Empty line: skip
    if (!line.trim()) {
      i++;
      continue;
    }

    // 7. Regular paragraph: group consecutive text lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ') &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({
      type: 'paragraph',
      text: paraLines.join('\n')
    });
  }

  return blocks;
}

/**
 * Parses inline formatting: **bold**, *italic*, `code`, [link](url)
 */
function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Tokenize using regex capturing inline patterns
  const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [label](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 hover:underline mx-0.5"
        >
          <span>{linkMatch[1]}</span>
          <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={index} className="font-bold text-zinc-900 dark:text-zinc-100">
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={index} className="italic text-zinc-700 dark:text-zinc-300">
          {renderInline(part.slice(1, -1))}
        </em>
      );
    }

    // Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-200/90 dark:bg-zinc-800 text-cyan-800 dark:text-cyan-300 font-mono text-[11px] border border-slate-300/60 dark:border-zinc-700/60"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function CodeBlockView({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-slate-300 dark:border-zinc-800 bg-slate-900 text-slate-100 shadow-md">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/80 border-b border-slate-800 text-[10px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase">
          <Code2 className="w-3.5 h-3.5" />
          {language || 'formula / code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="Copy formula"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 overflow-x-auto touch-scroll font-mono text-xs text-emerald-300 dark:text-cyan-300 leading-relaxed">
        <pre>{code}</pre>
      </div>
    </div>
  );
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content }) => {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed text-zinc-800 dark:text-zinc-200">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            if (block.level === 3) {
              return (
                <h3
                  key={idx}
                  className="text-sm sm:text-base font-bold font-mono text-zinc-950 dark:text-zinc-50 pt-2 pb-1 border-b border-slate-200 dark:border-zinc-800 flex items-center gap-2"
                >
                  {renderInline(block.text)}
                </h3>
              );
            }
            return (
              <h4
                key={idx}
                className="text-xs sm:text-sm font-bold font-mono text-cyan-700 dark:text-cyan-400 pt-2 flex items-center gap-1.5"
              >
                {renderInline(block.text)}
              </h4>
            );
          }

          case 'code':
            return <CodeBlockView key={idx} code={block.code} language={block.language} />;

          case 'alert': {
            if (block.variant === 'warning') {
              return (
                <div
                  key={idx}
                  className="my-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 shadow-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div className="flex-1 font-sans text-xs leading-relaxed">
                      <strong className="font-mono font-bold block mb-0.5 text-amber-800 dark:text-amber-300">
                        EXAM TRAP WARNING:
                      </strong>
                      {renderInline(block.text)}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 shadow-sm"
              >
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div className="flex-1 font-sans text-xs leading-relaxed">
                    {renderInline(block.text)}
                  </div>
                </div>
              </div>
            );
          }

          case 'list': {
            if (block.ordered) {
              return (
                <ol key={idx} className="space-y-1.5 my-2 pl-2">
                  {block.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {itemIdx + 1}
                      </span>
                      <span className="flex-1">{renderInline(item)}</span>
                    </li>
                  ))}
                </ol>
              );
            }

            return (
              <ul key={idx} className="space-y-1.5 my-2 pl-2">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shrink-0 mt-1.5" />
                    <span className="flex-1">{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          }

          case 'paragraph':
          default:
            return (
              <p key={idx} className="font-sans leading-relaxed">
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
};
