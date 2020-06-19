import React from "react";
import Header from "./header";
import Cards from "./cards";
import Footer from "./footer";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const category = location.pathname.replace("/", "");
  console.log("category " + category);
  return (
    <div>
      <title>Phantom by HTML5 UP</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <link rel="stylesheet" href="assets/css/main.css" />
      <noscript>
        &lt;link rel="stylesheet" href="assets/css/noscript.css" /&gt;
      </noscript>
      <div id="wrapper">
        <Header />
        <Cards category={category} />
        <Footer />
      </div>
    </div>
  );
}
