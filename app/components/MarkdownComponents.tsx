import type { ReactNode } from "react";
import type { Components } from "react-markdown";

// ✅ Typing generic
type GenericProps = React.HTMLAttributes<HTMLElement> & { node?: any; children?: ReactNode };

type CodeProps = GenericProps & {
  inline?: boolean;
  className?: string;
};

export const markdownComponents: Components = {
  // ✅ Custom checkbox hijau
  input: ({ node, ...props }: GenericProps & { type?: string; checked?: boolean }) => {
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

  // ✅ Headings lengkap
  h1: ({ node, ...props }: GenericProps) => (
    <h1 className="text-2xl font-bold mt-3 mb-2" {...props} />
  ),
  h2: ({ node, ...props }: GenericProps) => (
    <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />
  ),
  h3: ({ node, ...props }: GenericProps) => (
    <h3 className="text-lg font-medium mt-2 mb-1" {...props} />
  ),
  h4: ({ node, ...props }: GenericProps) => (
    <h4 className="text-base font-medium mt-2 mb-1" {...props} />
  ),
  h5: ({ node, ...props }: GenericProps) => (
    <h5 className="text-sm font-medium mt-2 mb-1" {...props} />
  ),
  h6: ({ node, ...props }: GenericProps) => (
    <h6 className="text-xs font-medium uppercase mt-2 mb-1" {...props} />
  ),

  // ✅ List
  ul: ({ node, ...props }: GenericProps) => (
    <ul className="list-disc list-inside space-y-1 ml-4" {...props} />
  ),
  ol: ({ node, ...props }: GenericProps) => (
    <ol className="list-decimal list-inside space-y-1 ml-4" {...props} />
  ),

  // ✅ Blockquote
  blockquote: ({ node, ...props }: GenericProps) => (
    <blockquote
      className="border-l-4 border-gray-500 pl-3 italic text-gray-300"
      {...props}
    />
  ),

  // ✅ Link
  a: ({ node, ...props }: GenericProps & { href?: string }) => (
    <a
      {...props}
      className="text-blue-400 underline"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),

  // ✅ Code block & inline
  code({ inline, className, children, ...props }: CodeProps) {
    return !inline ? (
      <pre className="bg-black/40 p-2 rounded-lg overflow-x-auto text-sm">
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

  // ✅ Table
  table: ({ node, ...props }: GenericProps) => (
    <table
      className="table-auto border-collapse border border-gray-500 my-3"
      {...props}
    />
  ),
  thead: ({ node, ...props }: GenericProps) => (
    <thead className="bg-gray-600" {...props} />
  ),
  th: ({ node, ...props }: GenericProps) => (
    <th className="border border-gray-500 px-3 py-1 text-left" {...props} />
  ),
  td: ({ node, ...props }: GenericProps) => (
    <td className="border border-gray-500 px-3 py-1" {...props} />
  ),
};
