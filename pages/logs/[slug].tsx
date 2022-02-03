import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";

import { getNotionStaticPaths, getNotionObjectProperty } from "../../utils";
import { getPageBlocksBySlug } from "../../api/notion";
import Article from "../../components/article";
import config from "../../config";
import HeadTitle from "../../components/head-title";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getNotionStaticPaths(config.notion.logs);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page, blocks } = await getPageBlocksBySlug(
    config.notion.logs,
    context.params?.slug as string
  );

  return {
    props: { page, blocks },
  };
};

const Log: NextPage = ({
  page,
  blocks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = getNotionObjectProperty(page, "Title");
  return (
    <>
      <HeadTitle title={title} />
      <header className="mb-12">
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <p className="text-sm text-stone-400">
          <code>{getNotionObjectProperty(page, "Date")}</code>
        </p>
      </header>
      <Article blocks={blocks} />
    </>
  );
};

export default Log;
