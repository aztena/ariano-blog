import "./fragments.sass";
import { NextPage } from "next";
import TopNav from "@/components/TopNav";

interface IFragmentsProps {}

const Fragments: NextPage<IFragmentsProps> = (props) => {
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
            <div className="fragments-content-list"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fragments;
