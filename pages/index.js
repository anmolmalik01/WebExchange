import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { motion } from 'framer-motion';
import Head from 'next/head'

import Header from '../components/Header'
import Footer from '../components/Footer'
import NewsLetter from '../components/NewsLetter'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Head>
        <title>Welcome to Our Website Marketplace</title>
        <meta name="description" content="Find your next website project or make a profit by selling your own website on our marketplace." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="px-4 py-8 max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-8 text-center"
        >
          Welcome to Our Website Marketplace
        </motion.h1>

        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl mb-8 text-center"
        >
          Find your next website project or make a profit by selling your own website on our marketplace.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
          >
            <h2 className="text-lg font-bold mb-2">Browse Websites</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Find your next website project by browsing our selection of unique and beautiful websites for sale.
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
            >
              Browse Now
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
          >
            <h2 className="text-lg font-bold mb-2">Sell Your Website</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Make a profit by selling your own website on our marketplace. Our simple and intuitive platform makes it easy to get started.
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
            >
              Start Selling
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
          >
            <h2 className="text-lg font-bold mb-2">Frequently Asked Questions</h2>

            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Have questions about our marketplace? Check out our FAQ section for answers to commonly asked questions.
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
            >
              Visit FAQ
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      
      <NewsLetter />

      <Footer />

    </div >
  )
}
