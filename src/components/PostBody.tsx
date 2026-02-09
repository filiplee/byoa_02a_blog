interface PostBodyProps {
  body: string;
}

function renderInlineContent(text: string) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, k) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={k}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

export function PostBody({ body }: PostBodyProps) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <div className="prose-blog">
      {paragraphs.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.includes("\n")) {
          return (
            <p key={i} className="font-semibold mt-6 mb-2 first:mt-0">
              {trimmed.slice(2, -2)}
            </p>
          );
        }
        const lines = block.split("\n");
        const listItems = lines.filter((l) => l.trim().startsWith("- "));
        if (listItems.length === lines.length && listItems.length > 0) {
          return (
            <ul key={i} className="list-disc pl-6 mb-4 space-y-1">
              {listItems.map((item, j) => (
                <li key={j}>{renderInlineContent(item.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }
        const content = lines.map((line, j) => (
          <span key={j}>
            {renderInlineContent(line)}
            {j < lines.length - 1 && <br />}
          </span>
        ));
        return (
          <p key={i} className="mb-4 last:mb-0">
            {content}
          </p>
        );
      })}
    </div>
  );
}
