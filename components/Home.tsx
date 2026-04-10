import React from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Industries from './Industries';
import Resources from './Resources';
import Contact from './Contact';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <div id="about">
                <About />
            </div>
            <div id="services">
                <Services />
            </div>
            <div id="industries">
                <Industries />
            </div>
            <div id="resources">
                <Resources />
            </div>
            <div id="contact">
                <Contact />
            </div>
        </>
    );
};

export default Home;
