import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Styles from "./_navbar.module.css";
const Navbar = () => {
  return (
    <section id={Styles.navbarSection}>
      <article>
        <Logo />
        <Menu />
      </article>
    </section>
  );
};

export default Navbar;
