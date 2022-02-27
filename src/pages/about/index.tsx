import './about.sass';

import { NextPage } from 'next';

import Meta from '@/components/Meta';
import TopNav from '@/components/TopNav';
import { getPostData, IPostData } from '@/lib/posts';

interface IAboutProps {
  post: IPostData;
}

const About: NextPage<IAboutProps> = ({ post }) => {
  return (
    <>
      <Meta title="About — ariano.ca" description="" />

      <div id="container">
        <div className="flexcontainer">
          <div className="flag"></div>
          <TopNav />
          <div className="toc-index"></div>
          <div className="content">
            <div className="content-inner-standard">
              <div id="title">
                <h1>About</h1>
              </div>
              <div
                id="about"
                dangerouslySetInnerHTML={{ __html: post.contentHtml ?? '' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const post = await getPostData('about', 'standalone', true);

  return {
    props: { post },
  };
}

export default About;
