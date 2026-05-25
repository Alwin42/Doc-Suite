import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false); // Tracks if the user failed the security check
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set your master security PIN here
    const CORRECT_PIN = "123456"; 
    
    if (pin === CORRECT_PIN) {
      navigate('/home');
    } else {
      // If blank or wrong, trigger the error state and clear the field
      setError(true);
      setPin('');
      
      // Remove the error message after 2 seconds so they can try again smoothly
      setTimeout(() => setError(false), 2000);
    }
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
            onChange={(e) => {
              setPin(e.target.value);
              setError(false); // Hide error as soon as they start typing again
            }}
            placeholder="Enter the pin"
            className={`w-72 bg-[#D1AA41] text-white placeholder:text-white/90 text-center text-lg font-medium px-8 py-4 rounded-full outline-none focus:ring-4 transition-all shadow-sm ${
              error ? 'focus:ring-red-500/40 border-2 border-red-500' : 'focus:ring-[#D1AA41]/40 border-2 border-transparent'
            }`}
          />
          
          {/* Dynamic Helper / Error Text */}
          <div className="h-6 mt-4">
            {error ? (
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