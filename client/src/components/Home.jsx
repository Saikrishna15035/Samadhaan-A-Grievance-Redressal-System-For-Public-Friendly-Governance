import React, { useEffect, useState } from 'react';
import convo from '../images/convo.png';
import SimpleCarousel from './carousel';
import Footer from './Footer'; // Import the new Footer
import '../styles/Home.css'; // Import the new CSS
import about from '../images/about.cms'

// You'll also need an image for the "About Us" section
// import aboutImage from '../images/about-us-image.jpg';

const Home = () => {
    const [userName, setUserName] = useState();
    const [show, setShow] = useState(false); // You had this, let's use it

    // Your original data fetching logic - it's perfect.
    const userHome = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserName(data.name);
            setShow(true); // Set show to true when data is fetched

            if (res.status !== 200) { // Fixed the status check
                const error = new Error(res.err);
                throw error;
            }
        } catch (err) {
            console.log(err);
            setShow(true); // Also show content even if fetch fails
        }
    };

    useEffect(() => {
        userHome();
    }, []);

    // This renders the main page content after the fetch attempt
    return (
        <div className="home-page-wrapper">
            <main>
                
                    <SimpleCarousel />
                {/* --- About Section (Static) --- */}
                {/* This is the new "About Us" section you requested for the homepage */}
                <section id="about-section" className="about-section">
                    <div className="container about-content">
                        <div className="about-image">
                             
                            {/* Use a real image here */}
                    <img src={about} alt="About Samadhan" />
                        </div>
                        <div className="about-text">
                            <h2>About Our Portal</h2>
                            <p>
                                Samadhan is a centralized platform for citizens to lodge their grievances and track their status with ease. Our mission is to provide a transparent, efficient, and accessible service for all.
                            </p>
                            <p>
                                Whether it's an issue with public utilities, government services, or any other civic matter, Samadhan is your single point of contact for a swift and effective resolution.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- Footer --- */}
            {/* The new, separate footer component is added here */}
            <Footer />
        </div>
    );
};

export default Home;