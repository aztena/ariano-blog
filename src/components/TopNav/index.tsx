import Link from "next/link";
import React from "react";
import classNames from "classnames";

const TopNav: React.FC<{ className?: string; flat?: boolean }> = (props) => {
  const links = [
    {
      href: "/",
      title: "Home",
      text: "△",
    },
    {
      href: "/articles",
      title: "Longform articles",
      text: "Articles",
    },
    {
      href: "/fragments",
      title: "Fragments (short articles)",
      text: "Fragments",
    },
    {
      href: "/now",
      title: "What I'm doing now",
      text: "Now",
    },
    {
      href: "/about",
      title: "About me & this site",
      text: "About",
    },
  ];

  return (
    <div
      className={classNames("top-nav", props.className, {
        "top-nav-flat": props.flat,
      })}
    >
      <div className="nav-inner">
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link.title}>
                <Link href={link.href}>
                  <a title={link.title}>{link.text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopNav;
