import React from 'react';
import Navbar from "./Components/Navbar";

const Credits = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
    <Navbar/>
    <main className="grow font-inter antialiased text-gray-200 tracking-tight">
    <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1" data-aos="fade-up">Credits</h1>
              </div>
              <div className='mx-auto text-center pb-10 md:pb-6'>
                <h3 className="h3" data-aos="fade-up" data-aos-delay="100">Front-end Developers</h3>
                <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">Ann Binus<br/>Andy</p>
              </div>
              <div className='mx-auto text-center pb-10 md:pb-6'>
                <h3 className="h3" data-aos="fade-up" data-aos-delay="300">API</h3>
                <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="400">Jonathan<br/>Evan</p>
              </div>
              <div className='mx-auto text-center pb-10 md:pb-6'>
                <h3 className="h3" data-aos="fade-up" data-aos-delay="500">Project Manager</h3>
                <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="600">Caden</p>
              </div>
              <div className='mx-auto text-center pb-10 md:pb-6'>
                <h3 className="h3" data-aos="fade-up" data-aos-delay="700">Database</h3>
                <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="800">Jordan</p>
              </div>
    
            </div>
        </div>
    </section>
    </main>
    </div>
  )
}

export default Credits