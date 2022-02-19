import "./fragments.sass";
import { NextPage } from "next";
import TopNav from "@/components/TopNav";
import { getGroupedPostsDataByYear, IPostData } from "@/lib/posts";
import Link from "next/link";
import Meta from "@/components/Meta";
import React from "react";

interface IFragmentsProps {
  fragmentsByYear: { [Key: string]: IPostData[] };
}

const Fragments: NextPage<IFragmentsProps> = ({ fragmentsByYear }) => {
  const years = Object.keys(fragmentsByYear).sort().reverse();

  return (
    <>
      <Meta
        title="Fragments - ariano.ca"
        description="Stream of musings that do not merit a more dedicated
        write-up."
      />

      <div id="container">
        <div className="flexcontainer">
          <div className="flag"></div>
          <TopNav />
          <div className="toc-index">
            <div className="toc-inner">
              <div className="toc">
                <ul>
                  {years.map((year) => (
                    <li key={year}>
                      <a href={`#year-${year}`}>{year}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="fragments">
            <div className="content">
              <div className="fragments-content-header">
                <h1>Fragments</h1>
              </div>
              <div className="fragments-header-separator"></div>
              <div className="fragments-intro">
                <p>
                  Stream of musings that do not merit a more dedicated write-up.
                </p>
              </div>
              <div className="fragments-content-list">
                {years.map((year) => (
                  <React.Fragment key={year}>
                    <div className="year" id={`year-${year}`}></div>
                    <a href={`#year-${year}`}>
                      <h2>{year}</h2>
                    </a>
                    <ul>
                      {fragmentsByYear[year]?.map((fragment) => (
                        <li key={fragment.slug}>
                          <Link href={fragment.relativeUrl}>
                            <a>{fragment.title}</a>
                          </Link>
                          <span className="meta">{fragment.publishedAt}</span>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const fragmentsByYear = await getGroupedPostsDataByYear("fragments");

  return {
    props: {
      fragmentsByYear,
    },
  };
}

export default Fragments;
