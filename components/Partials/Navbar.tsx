import React, { useState } from "react";

import Link from "next/link";
import type { NextPage } from "next";
import Search from "./Search";
import { useRouter } from "next/router";

const Navbar: NextPage = () => {
  const router = useRouter();
  const [showMenu, $showMenu] = useState(false);
  const [showSearch, $showSearch] = useState(false);
  const [active, setActive] = useState(router?.pathname);

  const toggleMenu = () => {
    $showMenu((pShow) => !pShow);
  };

  const toggleSearch = () => {
    $showSearch((pSearch) => !pSearch);
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => toggleMenu()}
        >
          <img src="/assets/icons/menu.svg" alt="Menu" />
        </button>
        <Link href="/home">
          <a className="navbar-brand">
            <img
              src="/assets/images/logo_fullcolor.svg"
              alt="Gochain Explorer"
            />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => toggleSearch()}
        >
          <img
            src={
              showSearch
                ? "/assets/icons/close.svg"
                : "/assets/icons/search-dark.svg"
            }
            alt="Search"
            // layout="fill"
          />
        </button>
        <div
          className={
            showMenu
              ? "collapse navbar-collapse show"
              : "collapse navbar-collapse"
          }
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="/home">
                <a
                  className={
                    active === "/home" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => toggleMenu()}
                >
                  Main
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/wallet">
                <a  
                  className={
                    active === "/wallet" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => toggleMenu()}
                >
                  Wallet
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/signers">
                <a
                  className={
                    active === "/signers" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => toggleMenu()}
                >
                  Signers
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={showSearch ? "navbar-search show" : "navbar-search"}>
          <Search />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
