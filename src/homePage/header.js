import React from "react";

export default function Header() {
  return (
    <header id="header">
      <div className="inner">
        {/* Logo */}
        <a href="index.html" className="logo">
          <span className="symbol">
            <img src="https://picsum.photos/200/300" alt="" />
          </span>
          <span className="title">Phantom</span>
        </a>
      </div>
    </header>
  );
}
