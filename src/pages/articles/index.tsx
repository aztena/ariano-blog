import './articles.sass';
import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import Meta from '@/components/Meta';
import TopNav from '@/components/TopNav';
import { getGroupedPostsDataByYear, IPostData } from '@/lib/posts';

interface IArticlesProps {
  years: string[];
  articlesByYear: { [Key: string]: IPostData[] };
}

const Articles: NextPage<IArticlesProps> = ({ years, articlesByYear }) => {
  return (
    <>
      <Meta
        title="Articles · ariano.ca"
        description={
          'Articles for developers & architects building and managing applications big and small on the cloud.'
        }
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
          <div className="content">
            <div className="articles">
              <div className="content-inner-standard">
                <div id="title">
                  <h1>Articles</h1>
                </div>
                <div id="articles">
                  {years.map((year) => (
                    <React.Fragment key={year}>
                      <div className="year" id={`year-${year}`}></div>
                      <h2>{year}</h2>
                      <ul>
                        {articlesByYear[year]?.map((article) => (
                          <li key={article.slug}>
                            {article.imageUrl ? (
                              <Link href={article.relativeUrl}>
                                <a>
                                  <img src={article.imageUrl} alt=""></img>
                                </a>
                              </Link>
                            ) : null}

                            <div className="title">
                              <Link href={article.relativeUrl}>
                                <a>{article.title}</a>
                              </Link>
                              <span className="meta">
                                {article.publishedAt}
                              </span>
                            </div>
                            {article.excerpt !== '' ? (
                              <p className="hook">{article.excerpt}</p>
                            ) : null}
                            <div className="clear"></div>
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
      </div>
    </>
  );
};

export async function getStaticProps() {
  const articlesByYear = await getGroupedPostsDataByYear('articles');
  const years = Object.keys(articlesByYear).sort().reverse();

  return {
    props: { years, articlesByYear },
  };
}

export default Articles;
