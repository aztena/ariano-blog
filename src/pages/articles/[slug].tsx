import './articles.sass';
import '@/styles/prism.scss';
import React from 'react';

import { NextPage } from 'next';

import Meta from '@/components/Meta';
import TopNav from '@/components/TopNav';
import { getAllPostSlugs, getPostData, IPostData } from '@/lib/posts';

interface IArticleProps {
  article: IPostData;
  githubUrl: string;
}

const Article: NextPage<IArticleProps> = ({ article, githubUrl }) => {
  const hasImage = (article.imageUrl ?? '') !== '';

  const PublishingInfo = () => (
    <>
      <p>
        <strong>Article</strong>
        <br />
        {article.title}
      </p>
      <p>
        <strong>Published</strong>
        <br />
        {article.publishedAt}
      </p>
      <p>
        <strong>Location</strong>
        <br />
        Toronto
      </p>
    </>
  );
  return (
    <>
      <Meta
        title={`${article.title} — ariano.ca`}
        description={article.excerpt}
      />
      <div id="container">
        {hasImage ? (
          <React.Fragment>
            <div
              className="vista"
              style={{ backgroundImage: `url('${article.imageUrl}')` }}
            >
              <div className="vista-inner"></div>
            </div>
            <div className="vista-overlay">
              <div className="vista-overlay-inner">
                <div id="title">
                  <h1>{article.title}</h1>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null}

        <div className="signature">
          <div className="flexcontainer">
            {!hasImage ? <div className="flag"></div> : null}

            <TopNav>
              <div className="divider"></div>
              <PublishingInfo />
              <div className="divider"></div>
            </TopNav>

            <div className="toc-index"></div>

            <div className="content">
              {!hasImage ? (
                <div className="signature-content-header">
                  <div id="title">
                    <h1>{article.title}</h1>
                  </div>
                </div>
              ) : null}
              <div className="signature-content">
                <div className="toc">
                  <h2>Contents</h2>
                  <div className="divider-short"></div>
                </div>
                <article className="big">
                  <div
                    id="article"
                    dangerouslySetInnerHTML={{
                      __html: article.contentHtml || '',
                    }}
                  ></div>
                  <div className="divider-short"></div>
                  <div className="info">
                    <div className="publishing-info-bottom">
                      <PublishingInfo />
                    </div>
                    <p>
                      Did I make a mistake? Please consider{' '}
                      <a href={githubUrl}>sending a pull request</a>.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const article = await getPostData(params.slug, 'articles', true);
  const githubUrl = `https://github.com/aztena/ariano-blog/edit/main/posts/articles/${article.slug}`;

  return {
    props: {
      article,
      githubUrl,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllPostSlugs('articles');
  return {
    paths,
    fallback: false,
  };
}

export default Article;
