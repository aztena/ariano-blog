import "@/styles/index.sass";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div id="index">
      <div id="container">
        <div id="flexcontainer-index" className="flexcontainer">
          <div id="text">
            <h1 className="block">
              <Link href="/about">
                <a>About</a>
              </Link>
            </h1>
            <p>
              I'm Arinze, a cloud solutions architect currently consulting with
              Bond Brand Loyalty and previously Bank of Montreal.
            </p>
            <p>
              I most often talk about working with .NET in the cloud, solution &
              application architecture, bleeding edge tech, and other
              interesting tidbits.
            </p>
          </div>
          <div id="photo">
            <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=75&w=2755" />
            <p>
              Photo by{" "}
              <Link href="https://unsplash.com/photos/yZygONrUBe8">
                <a>NASA</a>
              </Link>{" "}
              on{" "}
              <Link href="https://unsplash.com">
                <a>Unsplash</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
