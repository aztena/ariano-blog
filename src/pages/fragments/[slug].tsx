import "./fragments.sass";
import "@/styles/prism.scss";
import Meta from "@/components/Meta";
import TopNav from "@/components/TopNav";
import { getAllPostSlugs, getPostData, IPostData } from "@/lib/posts";
import { NextPage } from "next";
import Link from "next/link";

interface IFragmentPostProps {
  fragment: IPostData;
  githubUrl: string;
}

const Fragments: NextPage<IFragmentPostProps> = ({ fragment, githubUrl }) => {
  const hasImage = fragment.imageUrl || "" !== "";

  const PublishingInfo = () => (
    <>
      <p>
        <strong>Fragment</strong>
        <br />
        {fragment.title}
      </p>
      <p>
        <strong>Published</strong>
        <br />
        {fragment.publishedAt}
      </p>
    </>
  );
  return (
    <>
      <Meta
        title={`${fragment.title} - ariano.ca`}
        description={fragment.excerpt}
      />
      <div
        className="flexcontainer"
        id={hasImage ? "flexcontainer-fragments-show-mood" : undefined}
      >
        <div className="flag"></div>
        <TopNav>
          <div className="divider"></div>
          <PublishingInfo />
          <div className="divider"></div>
        </TopNav>
        {!hasImage ? <div className="toc-index"></div> : null}
        <div className="fragments">
          <div className="content">
            {hasImage && <img id="mood" src={fragment.imageUrl} />}
            <div
              className="content-inner-fragments-show"
              id={hasImage ? "content-inner-fragments-show-mood" : undefined}
            >
              <div className="fragments-content-header">
                <div className="fragments-content-header-type">
                  <Link href="/fragments">
                    <a>Fragments</a>
                  </Link>
                </div>
                <h1>{fragment.title}</h1>
              </div>
              <div className="fragments-header-separator"></div>
              <article>
                <div
                  dangerouslySetInnerHTML={{
                    __html: fragment.contentHtml || "",
                  }}
                ></div>
                <div className="divider-short"></div>
                <div className="info">
                  <div className="publishing-info-bottom">
                    <PublishingInfo />
                  </div>
                  <p>
                    Did I make a mistake? Please consider{" "}
                    <a href={githubUrl}>sending a pull request</a>.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const fragment = await getPostData(params.slug, "fragments", true);
  const githubUrl = `https://github.com/aztena/ariano-blog/edit/main/posts/fragments/${fragment.slug}`;

  return {
    props: {
      fragment,
      githubUrl,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllPostSlugs("fragments");
  return {
    paths,
    fallback: false,
  };
}

export default Fragments;
