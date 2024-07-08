import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-20 flex justify-center items-center bg-dark_grey">
      <Link href="/">
        <div className="w-[150px] h-full flex items-center justify-left gap-3">
          <Image
            src="/images/logo.webp"
            width="30"
            height="30"
            alt="Logo"
          ></Image>
          <div className="w-[1px] h-[35px] bg-light_grey"></div>
          <h3>Free Games</h3>
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
