"use client";

import Link from "next/link";
import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => {
          return (
            <Link
              href={href || ""}
              target="_blank"
              className="text-blue-500 dark:text-blue-400"
            >
              {children}
            </Link>
          );
        },
        p: ({ children }) => {
          return <p className="mb-4 last:mb-0">{children}</p>;
        },
        code: ({ children }) => {
          return (
            <code className="rounded-sm bg-muted-foreground/15 px-1.5 py-0.5">
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(NonMemoizedMarkdown);
