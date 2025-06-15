import React from "react";
import Link from "next/link";

const AboutUs: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#FAF3DC', minHeight: '100vh', color: '#2E7D32', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {/* Team Section */}
      <section style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#2E7D32', marginBottom: '30px' }}>Our Team</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Team Member 1 */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '250px', flexGrow: 1, minWidth: '200px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
            <img src="https://i.ibb.co/GVpwqhJ/photo-min.jpg" alt="Aniket R T" style={{ width: '160px', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#2E7D32', marginBottom: '10px', fontWeight: 'bold' }}>Aniket R T</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '10px' }}>1RV23AI017</p>
          </div>
          {/* Team Member 2 */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '250px', flexGrow: 1, minWidth: '200px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
            <img src="https://i.ibb.co/7Kd5Mcx/Whats-App-Image-2025-01-22-at-2-53-43-PM.jpg" alt="Amogh A P" style={{ width: '160px', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#2E7D32', marginBottom: '10px', fontWeight: 'bold' }}>Amogh A P</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '10px' }}>1RV23AI013</p>
          </div>
          {/* Team Member 3 */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '250px', flexGrow: 1, minWidth: '200px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
            <img src="https://i.ibb.co/VpjrFLR/anika.jpg" alt="Anika Vidya Raghav" style={{ width: '160px', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#2E7D32', marginBottom: '10px', fontWeight: 'bold' }}>Anika Vidya Raghav</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '10px' }}>1RV23AI016</p>
          </div>
          {/* Team Member 4 */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '250px', flexGrow: 1, minWidth: '200px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
            <img src="https://i.ibb.co/gwVG5mv/anupama.jpg" alt="Anupama" style={{ width: '160px', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#2E7D32', marginBottom: '10px', fontWeight: 'bold' }}>Anupama</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '10px' }}>1RV23AI018</p>
          </div>
          {/* Team Member 5 */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '250px', flexGrow: 1, minWidth: '200px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
            <img src="https://i.ibb.co/djD8y9y/bheemraj.jpg" alt="Bheemraj Doddamani" style={{ width: '160px', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#2E7D32', marginBottom: '10px', fontWeight: 'bold' }}>Bheemraj Doddamani</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '10px' }}>1RV23AI026</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
