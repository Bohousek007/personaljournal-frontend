import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="container mt-3">
    <h1
      className="display-4 text-center mb-4"
      style={{
        backgroundImage: "linear-gradient(to bottom, #ff69b4, #ffe0f0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      MY PERSONAL JOURNAL
    </h1>
    <div className="card mx-auto mt-4 shadow-lg" style={{ width: "30rem" }}>
      <div className="card-body p-4">
        <h5 className="card-title text-uppercase">Explore Your Journals</h5>
        <p className="card-text text-muted">
          Discover your thoughts, feelings, and experiences.
        </p>
        <Link to="/journals" className="btn btn-primary btn-block btn-lg mt-3">
          PODÍVAT SE NA DENÍKY
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
