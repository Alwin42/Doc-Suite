import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (pin.trim() === '') return;

    setIsVerifying(true);
    setError(false);

    try {
      // 1. Send the PIN to your Django backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/verify-pin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin: pin })
      });

      // 2. Handle the Backend's response
      if (response.ok) {
        const data = await response.json();
        
        // Save the token securely in the browser
        localStorage.setItem('auth_token', data.token);
        
        // Route to the dashboard
        navigate('/home');
      } else {
        // Server responded with 401 Unauthorized (Wrong PIN)
        triggerError();
      }
    } catch (err) {
      console.error("Connection failed:", err);
      triggerError(); // Handle network errors (e.g., Django isn't running)
    } finally {
      setIsVerifying(false);
    }
  };

  const triggerError = () => {
    setError(true);
    setPin('');
    setTimeout(() => setError(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans">
      <div className="text-center px-6">
        
        <h1 className="text-6xl sm:text-8xl font-black text-black tracking-tight mb-4">
          DOC-SUITE
        </h1>

        <p className="text-xl sm:text-2xl text-black font-medium mb-12">
          Drafting documents made easy
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center relative">
          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            disabled={isVerifying}
            onChange={(e) => {
              setPin(e.target.value);
              setError(false);
            }}
            placeholder="Enter the pin"
            className={`w-72 bg-[#D1AA41] text-white placeholder:text-white/90 text-center text-lg font-medium px-8 py-4 rounded-full outline-none focus:ring-4 transition-all shadow-sm disabled:opacity-70 ${
              error ? 'focus:ring-red-500/40 border-2 border-red-500' : 'focus:ring-[#D1AA41]/40 border-2 border-transparent'
            }`}
          />
          
          {/* Dynamic Helper / Error Text */}
          <div className="h-6 mt-4">
            {isVerifying ? (
               <span className="text-xs font-bold text-[#D1AA41] tracking-wide uppercase animate-pulse">
                 Verifying...
               </span>
            ) : error ? (
              <span className="text-xs font-bold text-red-500 tracking-wide uppercase animate-pulse">
                Incorrect PIN
              </span>
            ) : (
              <span className={`text-xs text-slate-400 transition-opacity duration-300 ${pin.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
                Press Enter to continue
              </span>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}