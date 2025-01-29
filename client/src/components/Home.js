import Header from "./Header";
import "./styles/home.css";

function Home() {
  return (
    <>
      <Header />
      <div className="content">
        <div className="home-container">
          <header className="home-header" style={{ textAlign: "center",padding:'10px',margin:'10px' }}>
            <h1>Bus Timing Management System</h1>
            <p>
              Track buses in real-time, get accurate schedules, and enjoy a
              smoother commute.
            </p>
            <img src="bus4.jpg" width='400px' height='400px'style={{margin:'50px auto'}}/>
          </header>
        </div>
      </div>
    </>
  );
}

export default Home;
