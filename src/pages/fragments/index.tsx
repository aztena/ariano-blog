import "./fragments.sass";
import { NextPage } from "next";
import TopNav from "@/components/TopNav";
import { getGroupedPostsDataByYear, IPostData } from "@/lib/posts";
import Link from "next/link";

interface IFragmentsProps {
  fragmentsByYear: { [Key: string]: IPostData[] };
}

const Fragments: NextPage<IFragmentsProps> = ({ fragmentsByYear }) => {
  const years = Object.keys(fragmentsByYear).sort().reverse();

  return (
    <div id="container">
      <div className="flexcontainer">
        <div className="flag"></div>
        <TopNav />
        <div className="toc-index">toc</div>
        <div className="fragments">
          <div className="content">
            <div className="fragments-content-header">
              <h1>Fragments</h1>
            </div>
            <div className="fragments-header-separator"></div>
            <div className="fragments-intro">
              <p>
                Streams of consciousness that do not merit a more dedicated
                write-up.
              </p>
            </div>
            <div className="fragments-content-list">
              {years.map((year) => (
                <>
                  <div className="year" id={`year-${year}`}></div>
                  <a href={`#year-${year}`}>
                    <h2>{year}</h2>
                  </a>
                  <ul>
                    {fragmentsByYear[year]?.map((fragment) => (
                      <li key={fragment.id}>
                        <Link href={fragment.relativeUrl}>
                          <a>{fragment.title}</a>
                        </Link>
                        <span className="meta">{fragment.publishedAt}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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
