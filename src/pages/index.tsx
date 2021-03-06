import type { NextPage } from 'next';
import Link from 'next/link';

import Meta from '@/components/Meta';
import TopNav from '@/components/TopNav';
import { getSortedPostsData, IPostData, PostsDirectory } from '@/lib/posts';

import './index.sass';

interface IHomeProps {
  articles: IPostData[];
  fragments: IPostData[];
}

const Home: NextPage<IHomeProps> = (props) => {
  const PostsList = ({
    posts,
    directory,
  }: {
    posts: IPostData[];
    directory: PostsDirectory;
  }) => {
    const DirectoryLink = (text: string) => (
      <Link href={`/${directory}`}>
        <a>{text}</a>
      </Link>
    );

    return (
      <>
        <h1 className="block">{DirectoryLink(directory)}</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <p className="title">
                <Link href={post.relativeUrl}>
                  <a>{post.title}</a>
                </Link>
              </p>
              <p className="hook">
                {post.excerpt}
                <br />
                <span className="date">{post.publishedAt}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="older">
          <em>
            Older {directory} available {DirectoryLink('here')}.
          </em>
        </p>
      </>
    );
  };

  return (
    <>
      <Meta
        title="ariano.ca · Arinze Anozie"
        description="The personal website of Arinze Anozie and tech blog coming to you from Toronto, CA."
      />
      <div id="index">
        <div id="container">
          <TopNav className="hide-small" flat />
          <div id="flexcontainer-index" className="flexcontainer">
            <div id="text">
              <h1 className="block">
                <Link href="/about">
                  <a>About</a>
                </Link>
              </h1>
              <p>
                I am Arinze, a cloud solutions architect currently consulting
                with Bond Brand Loyalty and previously Bank of Montreal.
              </p>
              <p>
                I most often talk about working with .NET in the cloud, solution
                & application architecture, bleeding edge tech, and other
                interesting tidbits.
              </p>

              <div id="writing">
                <div className="divider-short"></div>
                <PostsList directory="articles" posts={props.articles} />
                <div className="divider-short"></div>
                <PostsList directory="fragments" posts={props.fragments} />
              </div>
            </div>

            <div id="photo">
              <img
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=75&w=1500"
                alt="Ocean clouds seen from space"
                width={1500}
                height={'auto'}
              />
              <p>
                Photo by{' '}
                <Link href="https://unsplash.com/photos/yZygONrUBe8">
                  <a>NASA</a>
                </Link>{' '}
                on{' '}
                <Link href="https://unsplash.com">
                  <a>Unsplash</a>
                </Link>
              </p>
            </div>

            <TopNav className="hide-big" flat />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const articles = await getSortedPostsData('articles', 3);
  const fragments = await getSortedPostsData('fragments', 1);

  return {
    props: {
      articles,
      fragments,
    },
  };
}

export default Home;
