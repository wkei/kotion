import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";

import { getNotionStaticPaths, getNotionObjectProperty } from "../../utils";
import { getPageBlocksBySlug } from "../../api/notion";
import config from "../../config";
import HeadTitle from "../../components/head-title";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getNotionStaticPaths(config.notion.photos);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page, blocks } = await getPageBlocksBySlug(
    config.notion.photos,
    context.params?.slug as string
  );

  return {
    props: { page, blocks },
  };
};

function ImgBlock({ block }: { block: any }) {
  if (block.type !== "image") return null;

  const caption = block.image?.caption[0]?.plain_text;
  const src = `https://keiz.notion.site/image/${encodeURIComponent(
    block.image?.file?.url
  )}?table=block&id=${block.id}&cache=v2`;

  return (
    <figure>
      <img src={src} alt={caption} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const Album: NextPage = ({
  page,
  blocks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = getNotionObjectProperty(page, "Name");

  return (
    <>
      <HeadTitle title={title} />
      <header className="mb-12">
        <h2 className="text-center text-2xl font-bold">{title}</h2>
      </header>
      <article className="prose">
        {blocks.map((block: any) => (
          <ImgBlock block={block} key={block.id} />
        ))}
      </article>
    </>
  );
};

export default Album;
