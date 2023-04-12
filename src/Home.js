import React from "react";
import Navbar from "./Components/Navbar";


const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <main className="grow">
        <section>
        <div className="home-container">
          <div className="home-section">
          <div className="home-text-section">
            <h1 data-aos="fade-up">Get More Done with Score</h1>
            <p data-aos="fade-up" data-aos-delay="200">Designed to simplify your day-to-day tasks and help you achieve your goals more efficiently.</p>
          </div>
          </div>
        </div>
        </section>
      </main>
    </div>
  )
}

export default Home