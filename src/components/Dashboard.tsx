"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import Image from 'next/image'


export default async function Home() {

  return (
    <main className="flex min-h-screen bg-gray-50 text-gray-900">
    <div className="m-auto p-6 rounded-lg shadow-lg bg-white max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Aural!
        </h1>
        <p className="mb-6">
          A platform to help you prepare for your next interview.
          Click below to get started! You will have 15 seconds to prepare your answer and 2 minutes to answer the generated question. <strong>Good luck!</strong>
        </p>
        <Image
        src="/logo.png"
        width={300}
        height={300}
        alt="Picture of the author"
        className="pl-40 mb-5"
        />
        <Link href="/interview" passHref>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Generate Question
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </main>
  );


}

