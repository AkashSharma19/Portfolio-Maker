const Dashboard = ({ onNavigate }) => {
  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="dashboard-hero fade-in">
        <h1>Portfolio Maker</h1>
        <p>Create stunning, professional portfolios in minutes. Showcase your skills, projects, and achievements with our easy-to-use builder.</p>
        <button className="dashboard-cta" onClick={() => onNavigate('create')}>
          Create New Portfolio
        </button>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card fade-in">
          <div className="feature-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3>Lightning Fast</h3>
          <p>Build your portfolio in minutes with our intuitive interface.</p>
        </div>
        <div className="feature-card fade-in">
          <div className="feature-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3>Professional Templates</h3>
          <p>Choose from a variety of professionally designed templates.</p>
        </div>
        <div className="feature-card fade-in">
          <div className="feature-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3>Mobile Responsive</h3>
          <p>Your portfolio looks great on all devices and screen sizes.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Showcase Your Work?</h2>
        <p>Join thousands of professionals who have created amazing portfolios with Portfolio Maker.</p>
        <button className="cta-button" onClick={() => onNavigate('create')}>
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default Dashboard;