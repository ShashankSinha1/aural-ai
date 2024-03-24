"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ease: "linear", duration: 0.5 }}
      className="flex justify-between items-center w-full h-20 px-4 text-white bg-gray-800 fixed top-0 z-50"
    >
      <Link href="/" className="text-3xl font-bold">

          AuralAI.

      </Link>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="hidden md:flex"
      >
        <li className="mx-4">
          <Link href="/" className="text-lg font-medium text-gray-300 hover:text-white transition duration-200">
              Home

          </Link>
        </li>
        <li className="mx-4">
          <Link href="/about" className="text-lg font-medium text-gray-300 hover:text-white transition duration-200">
              About
          </Link>
        </li>
      </motion.ul>
    </motion.nav>
  );
};

export default Navbar;