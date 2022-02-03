import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

import HeadTitle from "../../components/head-title";
import config from "../../config";
import { getPublishedList } from "../../api/notion";
import { getNotionObjectProperty } from "../../utils";

export const getStaticProps: GetStaticProps = async () => {
  const list = await getPublishedList(config.notion.records);
  return {
    props: { list },
  };
};

const Records: NextPage = ({
  list,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <HeadTitle title="Records" />
      <ul>
        {list.map((item: any) => (
          <li key={item.id} className="mb-16">
            <h2 className="mb-2 text-xl font-semibold">
              <Link href={`/records/${getNotionObjectProperty(item, "Slug")}`}>
                <a className="focus:outline-dotted focus:outline-1">
                  {getNotionObjectProperty(item, "Title")}
                </a>
              </Link>
            </h2>
            <p className="text-stone-400">
              {getNotionObjectProperty(item, "Description")}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Records;