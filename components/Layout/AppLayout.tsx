// import Footer from "../Partials/Footer";

import Navbar from "@Components/Partials/Navbar";
import React from "react";
import Toasts from "@Components/Toasts";
import { useRouter } from "next/router";

export default function Index({ children }: any) {
  const { route } = useRouter();
  const parserRouter = route.split("/");
  return (
    <>
      <Toasts />
      <Navbar />
      <div className="z-body">{children}</div>
    </>
  );
}
