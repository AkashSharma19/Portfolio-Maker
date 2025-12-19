const Dashboard = ({ onNavigate }) => {
  return (
    <div className="dashboard">
      <h1>Portfolio Maker</h1>
      <p>Welcome to the Portfolio Maker. Create stunning portfolios easily.</p>
      <button onClick={() => onNavigate('form')}>Create New Portfolio</button>
    </div>
  );
};

export default Dashboard;