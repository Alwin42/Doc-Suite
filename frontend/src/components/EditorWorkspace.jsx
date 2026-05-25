import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

export default function EditorWorkspace() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize the TipTap Headless Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start drafting your legal document here...',
      }),
    ],
    content: `
      <h2>Confidential Memo</h2>
      <p>Welcome to the <strong>Doc-Suite</strong> workspace. This secure environment processes your dictations entirely on your local machine.</p>
      <ul>
        <li>Client confidentiality is maintained.</li>
        <li>No internet connection required for dictation.</li>
      </ul>
      <p>Click the microphone on the right to initialize the voice buffer and begin drafting.</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-slate prose-lg max-w-none focus:outline-none prose-headings:font-black prose-p:text-gray-700 prose-strong:text-black',
      },
    },
  });

  // Reusable button class for the toolbar
  const toolbarBtnClass = (isActive) => 
    `p-1.5 rounded-md transition-all duration-200 ease-in-out flex items-center justify-center ${
      isActive ? 'bg-gray-200 text-black shadow-inner' : 'text-gray-500 hover:bg-gray-100 hover:text-black'
    }`;

  // API handler function
  const handleRecordingToggle = async () => {
    if (!isRecording) {
      // START RECORDING
      setIsRecording(true);
    } else {
      // STOP RECORDING & SEND TO BACKEND
      setIsRecording(false);
      setIsProcessing(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/process-dictation/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audio_data: "Base64 or blob reference", 
            language: "en-IN" 
          })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        editor.commands.insertContent(data.formatted_text);

      } catch (error) {
        console.error("Error processing dictation:", error);
        alert("Failed to connect to the AI Engine. (Make sure Django is running!)");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#F8F9FA] font-sans text-black overflow-hidden selection:bg-[#D1AA41]/30">
      
      {/* Sleek Top Navigation */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-30 shadow-sm">
        <button 
          onClick={() => navigate('/home')} 
          className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-black transition-colors flex items-center space-x-2"
        >
          <span>← Back to Home</span>
        </button>
        
        <span className="font-black tracking-widest text-lg uppercase">
          Doc-Suite
        </span>
        
        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Gemma 4 Engine Online</span>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="flex-1 flex mt-4 overflow-hidden">
        
        {/* Modern Editor Canvas (Left Side - 70%) */}
        <div className="w-[70%] flex flex-col relative z-10">
          
          {/* Sticky Glassmorphism Toolbar */}
          <div className="h-15 bg-white/30 backdrop-blur-md rounded-4xl border-b border-gray-200 flex items-center justify-center gap-6 px-4 shrink-0 z-20 absolute top-0 w-full overflow-x-auto">
            
            {/* 1. History Controls */}
            <div className="flex items-center gap-1">
              <button onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()} className={`${toolbarBtnClass(false)} disabled:opacity-30 disabled:hover:bg-transparent`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
              </button>
              <button onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()} className={`${toolbarBtnClass(false)} disabled:opacity-30 disabled:hover:bg-transparent`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
              </button>
            </div>
            <div className="w-px h-5 bg-gray-200 rounded-full"></div>

            {/* 2. Character & Font Formatting */}
            <div className="flex items-center gap-1 text-sm">
              <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`font-bold ${toolbarBtnClass(editor?.isActive('bold'))}`}>B</button>
              <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`italic font-serif ${toolbarBtnClass(editor?.isActive('italic'))}`}>I</button>
              <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={`underline ${toolbarBtnClass(editor?.isActive('underline'))}`}>U</button>
              <button onClick={() => editor?.chain().focus().toggleStrike().run()} className={`line-through ${toolbarBtnClass(editor?.isActive('strike'))}`}>S</button>
            </div>
            <div className="w-px h-5 bg-gray-200 rounded-full"></div>

            {/* 3. Paragraph Alignment */}
            <div className="flex items-center gap-1 text-sm">
              <button onClick={() => editor?.chain().focus().setTextAlign('left').run()} className={toolbarBtnClass(editor?.isActive({ textAlign: 'left' }))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <button onClick={() => editor?.chain().focus().setTextAlign('center').run()} className={toolbarBtnClass(editor?.isActive({ textAlign: 'center' }))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <button onClick={() => editor?.chain().focus().setTextAlign('right').run()} className={toolbarBtnClass(editor?.isActive({ textAlign: 'right' }))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <button onClick={() => editor?.chain().focus().setTextAlign('justify').run()} className={toolbarBtnClass(editor?.isActive({ textAlign: 'justify' }))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
            <div className="w-px h-5 bg-gray-200 rounded-full"></div>

            {/* 4. Lists */}
            <div className="flex items-center gap-1 text-sm">
              <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={toolbarBtnClass(editor?.isActive('bulletList'))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
              <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={toolbarBtnClass(editor?.isActive('orderedList'))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
              </button>
            </div>
            <div className="w-px h-5 bg-gray-200 rounded-full"></div>

            {/* 5. Styles & Headings */}
            <div className="flex items-center gap-1 text-sm font-bold">
              <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={toolbarBtnClass(editor?.isActive('heading', { level: 1 }))}>H1</button>
              <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={toolbarBtnClass(editor?.isActive('heading', { level: 2 }))}>H2</button>
              <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={toolbarBtnClass(editor?.isActive('heading', { level: 3 }))}>H3</button>
            </div>
          </div>

          {/* Document Content Area (The "Paper") */}
          <div className="flex-1 overflow-y-auto px-12 py-24 flex justify-center">
            <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-sm rounded-xl px-16 py-16 min-h-full">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* Minimalist Staging Sidebar (Right Side - 30%) */}
        <div className="w-[30%] bg-white border-l border-gray-200 p-8 flex flex-col rounded-3xl justify-between shrink-0 z-20 shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.05)]">
          
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-black text-sm tracking-widest uppercase">
                Voice Buffer
              </h3>
              {/* Dynamic Status Indicator */}
              {isRecording && (
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Listening</span>
                </span>
              )}
            </div>
            
            {/* Empty State / Active Buffer Area */}
            <div className={`flex-1 rounded-2xl p-5 border transition-all duration-300 ${isRecording ? 'border-[#D1AA41] bg-[#D1AA41]/5' : 'border-dashed border-gray-200 bg-gray-50'}`}>
              {!isRecording ? (
                <p className="text-xs font-medium text-gray-400 leading-relaxed text-center mt-10">
                  Transcribed audio clips will appear here for review before you inject them into the main document.
                </p>
              ) : (
                <p className="text-sm font-medium text-gray-700 leading-relaxed animate-pulse">
                  Listening for dictation...
                </p>
              )}
            </div>
          </div>
          
          {/* Interactive Dictation Control */}
          <div className="flex flex-col items-center justify-center pt-8 mt-4">
            <button 
              onClick={handleRecordingToggle}
              disabled={isProcessing}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95 group ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' 
                  : isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed animate-pulse'
                    : 'bg-[#D1AA41] hover:bg-[#b89539] shadow-[#D1AA41]/30 hover:-translate-y-1'
              }`}
            >
              {isRecording ? (
                // Stop Square Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                  <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3-3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                </svg>
              ) : (
                // Microphone Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white group-hover:animate-pulse">
                  <path d="M12 1.5a3.75 3.75 0 0 0-3.75 3.75v6.75a3.75 3.75 0 0 0 7.5 0v-6.75A3.75 3.75 0 0 0 12 1.5ZM5.25 12a.75.75 0 0 1 1.5 0v1.5a5.25 5.25 0 0 0 10.5 0V12a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709V12Z" />
                </svg>
              )}
            </button>
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mt-6">
              {isRecording ? 'Tap to Stop' : 'Tap to Dictate'}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}