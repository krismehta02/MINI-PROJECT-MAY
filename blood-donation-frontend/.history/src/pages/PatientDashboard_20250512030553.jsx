import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientDashboard() {
  const navigate = useNavigate();

  // 1. Basic component test
  useEffect(() => {
    console.log('DEBUG: Component mounted - this should appear in console');
  }, []);

  // 2. Visibility test - you should ALWAYS see this
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'lime',
      color: 'black',
      fontSize: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>PATIENT DASHBOARD VISIBLE</h1>
        <p>If you see this, the component is rendering</p>
        <p>Check console for mount message</p>
        <button 
          onClick={() => console.log('Button click works')}
          style={{ fontSize: '1.5rem', padding: '10px 20px' }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
}