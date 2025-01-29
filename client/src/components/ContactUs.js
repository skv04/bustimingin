import Header from './Header';

function ContactUs() {
  return (
    <>
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
        className='contactuscontainer'
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
          Contact Us
        </h1>

        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: '1.8',
            marginBottom: '20px',
            textAlign: 'justify',
          }}
        >
          We would love to hear from you! If you have any questions, suggestions, or feedback,
          feel free to reach out to us through the contact form below.
        </p>

        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              marginBottom: '20px',
            }}
          >
            <label
              style={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#444',
              }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.9rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f9f9f9',
                color: '#333',
                boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          <div
            style={{
              marginBottom: '20px',
            }}
          >
            <label
              style={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#444',
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.9rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f9f9f9',
                color: '#333',
                boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          <div
            style={{
              marginBottom: '20px',
            }}
          >
            <label
              style={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#444',
              }}
            >
              Message
            </label>
            <textarea
              placeholder="Your message..."
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.9rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f9f9f9',
                color: '#333',
                boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.1)',
                resize: 'none',
                height: '100px',
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            style={{
              padding: '12px 20px',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #444, #555)',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}

export default ContactUs;
