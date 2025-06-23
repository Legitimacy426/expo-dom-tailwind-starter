export default function DashboardPage() {


  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '400px' }}>
      {/* URGENT DEBUG: This should be visible if the component is rendering */}
      <div style={{
        padding: '20px',
        backgroundColor: '#ff0000',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        border: '5px solid #000'
      }}>
        🚨 DASHBOARD INDEX PAGE IS RENDERING! 🚨
      </div>

      {/* Simple test content with inline styles */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
          🏠 Dashboard
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Welcome to your dashboard. Here's an overview of your data.
        </p>
      </div>

      {/* Blue test box */}
      <div style={{
        padding: '16px',
        backgroundColor: '#dbeafe',
        border: '2px solid #3b82f6',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{ color: '#1e40af', fontWeight: 'bold' }}>
          🎯 SUCCESS: Dashboard content is rendering correctly!
        </p>
      </div>

      {/* Additional test content */}
      <div style={{
        padding: '16px',
        backgroundColor: '#dcfce7',
        border: '2px solid #16a34a',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#15803d', margin: '0 0 8px 0' }}>✅ Layout Status</h2>
        <p style={{ color: '#15803d', margin: 0 }}>
          Both the layout and dashboard page are working properly!
        </p>
      </div>

      {/* Simple HTML content to test */}
      <div style={{
        padding: '16px',
        backgroundColor: '#fef3c7',
        border: '2px solid #f59e0b',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#d97706', margin: '0 0 8px 0' }}>📊 Dashboard Features</h2>
        <ul style={{ color: '#d97706', margin: 0, paddingLeft: '20px' }}>
          <li>Revenue tracking</li>
          <li>User analytics</li>
          <li>Sales reports</li>
          <li>Real-time data</li>
        </ul>
      </div>
    </div>
  )
}
