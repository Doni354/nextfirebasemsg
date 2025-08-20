import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function ChatMessage({ message, currentUser }: any) {
  const isUser = message.uid === currentUser.uid;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-lg px-4 py-2 rounded-2xl text-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        }`}
      >
        {message.isLoading ? (
          <span className="animate-pulse text-gray-400">
            AI sedang mengetik...
          </span>
        ) : (
          <div className="prose prose-invert max-w-none">
           <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        // ✅ Custom checkbox hijau
        input: ({ node, ...props }) => {
          if (props.type === "checkbox") {
            const checked = props.checked as boolean;
            return (
              <span
                className={`w-4 h-4 inline-flex items-center justify-center rounded border text-xs mr-2 ${
                  checked
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-400"
                }`}
              >
                {checked && "✓"}
              </span>
            );
          }
          return <input {...props} />;
        },

        // ✅ Headings
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mt-3 mb-2" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-semibold mt-3 mb-2" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-medium mt-2 mb-1" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-lg font-medium mt-2 mb-1" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-base font-medium mt-2 mb-1" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6
            className="text-sm font-medium mt-2 mb-1 text-gray-400"
            {...props}
          />
        ),

        // ✅ List
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside space-y-1 ml-5" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside space-y-1 ml-5" {...props} />
        ),

        // ✅ Blockquote
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-500 pl-3 italic text-gray-400"
            {...props}
          />
        ),

        // ✅ Link
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),

        // ✅ Code block + inline code
        code({ node, inline, className, children, ...props }) {
          return !inline ? (
            <pre className="bg-black/40 p-2 rounded-lg overflow-x-auto text-sm my-2">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code className="bg-black/40 px-1 rounded" {...props}>
              {children}
            </code>
          );
        },

        // ✅ Horizontal Rule
        hr: () => <hr className="my-4 border-t border-gray-600" />,

        // ✅ Image
        img: ({ node, ...props }) => (
          <img
            {...props}
            className="max-w-full rounded-lg my-2 border border-gray-700"
            alt={props.alt || ""}
          />
        ),

        // ✅ Table
        table: ({ node, ...props }) => (
          <table
            className="border border-gray-500 border-collapse my-3 w-full text-sm"
            {...props}
          />
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-800 text-gray-200" {...props} />
        ),
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => (
          <tr className="border-b border-gray-600" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="px-3 py-2 text-left font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-3 py-2 align-top" {...props} />
        ),
      }}
    >
      {message.text}
    </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
