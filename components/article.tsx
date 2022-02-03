import { NotionBlocksHtmlParser } from "@notion-stuff/blocks-html-parser";

const parser = NotionBlocksHtmlParser.getInstance();

export default function Article({
  html,
  blocks,
}: {
  html?: string;
  blocks?: any;
}) {
  const __html = html || parser.parse(blocks);
  return (
    <>
      <article className="prose" dangerouslySetInnerHTML={{ __html }} />
      <div className="mt-20 select-none text-center text-stone-300">&bull;</div>
    </>
  );
}
