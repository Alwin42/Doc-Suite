import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditorWorkspace() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-gray-100 font-sans text-black overflow-hidden">
      
      {/* Minimalist Top Navigation */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate('/')} 
          className="text-sm font-bold tracking-widest uppercase hover:text-gray-500 transition-colors flex items-center space-x-2"
        >
          <span>← Back</span>
        </button>
        
        {/* Centered Logo */}
        <span className="font-black tracking-widest text-lg uppercase">
          Doc-Suite
        </span>
        
        {/* Spacer to keep logo perfectly centered */}
        <div className="w-20"></div> 
      </div>

      {/* Main Split Interface */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Word-style Document Canvas (Left Side) */}
        <div className="flex-1 overflow-y-auto flex justify-center py-12 px-6 bg-[#ebecf0]">
          {/* The "Paper" Container */}
          <div className="w-full max-w-204 min-h-264 bg-white shadow-xl border border-gray-300 px-16 py-20 flex flex-col">
            
            <div 
              className="text-black font-serif text-lg leading-relaxed outline-none min-h-full"
              contentEditable 
              suppressContentEditableWarning
            >
              Start drafting your document here...
            </div>

          </div>
        </div>

        {/* Minimalist Staging Sidebar (Right Side) */}
        <div className="w-80 lg:w-96 bg-white border-l border-gray-200 p-8 flex flex-col justify-between shrink-0 z-10 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
          
          <div>
            <h3 className="font-black text-black text-sm tracking-widest uppercase mb-6">
              Voice Buffer
            </h3>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-37.5">
              <p className="text-xs font-medium text-gray-400 leading-relaxed">
                Transcribed audio clips will appear here for review before you inject them into the main document.
              </p>
            </div>
          </div>
          
          {/* Dictation Control Area */}
          <div className="flex flex-col items-center justify-center pt-8 border-t border-gray-100">
            <button className="w-20 h-20 rounded-full bg-[#D1AA41] flex items-center justify-center hover:bg-[#b89539] hover:scale-105 active:scale-95 transition-all shadow-lg group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white group-hover:animate-pulse">
                <path d="M12 1.5a3.75 3.75 0 0 0-3.75 3.75v6.75a3.75 3.75 0 0 0 7.5 0v-6.75A3.75 3.75 0 0 0 12 1.5ZM5.25 12a.75.75 0 0 1 1.5 0v1.5a5.25 5.25 0 0 0 10.5 0V12a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709V12Z" />
              </svg>
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-black mt-6">
              Tap to Dictate
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}