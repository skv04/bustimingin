import Header from './Header';
function AboutUs() {
  return (
    < >
      <Header />
      
      <div
      style={{        
        margin: '120px   auto 20px auto',
        padding: '30px',
        background: 'linear-gradient(135deg, rgb(233 236 244), rgb(175 170 181))',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        fontFamily: "'Roboto', sans-serif",
        color: '#2b2b2b',
      }}
      className='aboutuscontainer'
    >
      <h1
        style={{
          fontSize: '2.0rem',
          color: '#212121',
          textAlign: 'center',
          marginBottom: '20px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        About Us
      </h1>
      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: '1.8',
          marginBottom: '20px',
          textAlign: 'justify',
        }}
      >
        Public transportation is the backbone of urban mobility, helping millions of commuters
        travel efficiently. However, challenges like unclear bus timings and unpredictable
        locations often lead to delays and inconvenience for users.
      </p>
      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: '1.8',
          marginBottom: '20px',
          textAlign: 'justify',
        }}
      >
        In today's digital age, the need for reliable, real-time information has never been
        greater. To address this, we have developed a web application that empowers commuters
        with live updates on bus timings and GPS locations.
      </p>
      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: '1.8',
          marginBottom: '20px',
          textAlign: 'justify',
        }}
      >
        Our mission is to enhance the commuting experience by providing accurate, real-time data
        that helps users plan their journeys better. Whether you're a daily commuter or an
        occasional traveler, our platform is here to make your ride smoother and stress-free.
      </p>
      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: '1.8',
          textAlign: 'justify',
          fontStyle: 'italic',
          color: '#444',
        }}
      >
        Join us in revolutionizing urban transportation with technology. Together, we can make
        commuting a hassle-free experience!
      </p>
    </div>
  
    </>
  );
}

export default AboutUs;
