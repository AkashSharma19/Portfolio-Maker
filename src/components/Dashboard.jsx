import React from 'react';
import { Plus, ExternalLink, Edit3, MoreVertical, Layout, Trash2 } from 'lucide-react';

const Dashboard = ({ onNavigate, savedPortfolios, onEdit, onDelete }) => {
  // Convert savedPortfolios to project format
  const projects = savedPortfolios.map((portfolio, index) => ({
    id: portfolio.id || index + 1,
    title: portfolio.name || 'Unnamed Portfolio',
    slug: `portfolio-${portfolio.id || index + 1}`,
    lastEdited: 'Recently', // Could add timestamp later
    status: 'Published', // Assume published
    thumbnail: null,
    portfolio: portfolio // Keep reference
  }));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* 1. TOP NAVIGATION */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ backgroundColor: '#9333ea', padding: '0.5rem', borderRadius: '0.5rem' }}>
            <Layout style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '-0.025em' }}>PortfolioMaker</span>
        </div>

        {/* User Profile Dropdown Placeholder */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '9999px', transition: 'background-color 0.3s' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
          <div style={{ width: '2rem', height: '2rem', backgroundColor: '#faf5ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', fontWeight: 'bold', fontSize: '0.875rem' }}>
            AS
          </div>
        </div>
      </nav>

      {/* 2. MAIN WORKSPACE */}
      <main style={{ maxWidth: '72rem', margin: '0 auto', padding: '1.5rem 1.5rem 2.5rem' }}>

        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0f172a' }}>Welcome back, Akash</h1>
            <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Manage your portfolios and projects.</p>
          </div>

          {/* Primary CTA */}
          <button style={{ backgroundColor: '#9333ea', color: 'white', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s', border: 'none', cursor: 'pointer', marginLeft: 'auto' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'} onMouseLeave={(e) => e.target.style.backgroundColor = '#9333ea'} onClick={() => onNavigate('create')}>
            <Plus style={{ width: '1rem', height: '1rem' }} />
            Create New Portfolio
          </button>
        </div>

        {/* TABLE SYSTEM */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>Portfolio Name</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>Last Edited</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Existing Portfolios */}
              {projects.map((project) => (
                <tr key={project.id} style={{ borderBottom: '1px solid #f1f5f9' }} onMouseEnter={(e) => e.target.closest('tr').style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.target.closest('tr').style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: '500', color: '#1f2937' }}>
                    {project.title}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '500', backgroundColor: project.status === 'Published' ? '#dcfce7' : '#fef3c7', color: project.status === 'Published' ? '#166534' : '#92400e' }}>
                      {project.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {project.lastEdited}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ padding: '0.375rem 0.75rem', backgroundColor: 'transparent', color: '#9333ea', border: '1px solid #9333ea', borderRadius: '0.375rem', fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#9333ea'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#9333ea'; }} onClick={() => onEdit(project.portfolio)}>
                        Edit
                      </button>
                      <button style={{ padding: '0.375rem 0.75rem', backgroundColor: 'transparent', color: '#dc2626', border: '1px solid #dc2626', borderRadius: '0.375rem', fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#dc2626'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#dc2626'; }} onClick={() => onDelete(project.portfolio)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;