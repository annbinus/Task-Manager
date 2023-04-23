import React from "react";
import Navbar from "./Components/Navbar";
import './dist/output.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
    <Navbar/>
    <main className="grow font-inter antialiased text-gray-200 tracking-tight">
    <section>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
   
   
      {/* Hero content */}
      <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h1 className="h1 mb-4" data-aos="fade-up">
          Get More Done with Score
          </h1>
          <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
          Designed to simplify your day-to-day tasks and help you achieve your goals more efficiently.
          </p>
          <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div data-aos="fade-up" data-aos-delay="400">
              <Link to="/credits" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0"> 
                Credits
                </Link>
            </div>
            <div data-aos="fade-up" data-aos-delay="600">
              <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="https://github.com/annbinus/LargeProjectGroup5COP4331" target="_blank">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
    
  </section>
  </main>
  </div>
  )
}

export default Home