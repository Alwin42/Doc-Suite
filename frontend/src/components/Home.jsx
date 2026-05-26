import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // Dummy data for the Recent Documents table
  const recentDocuments = [
    { id: 1, name: 'Delhi High Court - Writ Petition', type: 'Petition', date: 'May 18, 2026' },
    { id: 2, name: 'Bail Application - Criminal Case', type: 'Application', date: 'May 17, 2026' },
    { id: 3, name: 'Power of Attorney', type: 'Deed', date: 'May 16, 2026' },
    { id: 4, name: 'Affidavit of Compliance', type: 'Affidavit', date: 'May 15, 2026' },
    { id: 5, name: 'Legal Notice - Property Dispute', type: 'Notice', date: 'May 14, 2026' },
  ];

  // Dummy data for Suggested Templates
  const suggestedTemplates = [
    { id: 1, title: 'Writ Petition', subtitle: 'High Court' },
    { id: 2, title: 'Bail Application', subtitle: 'Criminal Matters' },
    { id: 3, title: 'Legal Notice', subtitle: 'Civil Matters' },
    { id: 4, title: 'Affidavit', subtitle: 'General Purpose' },
    { id: 5, title: 'Power of Attorney', subtitle: 'Authorization' },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans text-slate-900 overflow-hidden">
      
      {/* 1. Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="h-20 flex items-center px-6 border-b border-slate-100">
            <div className="flex items-center space-x-2 text-[#D1AA41]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c1.68 0 3.282.466 4.75 1.285a.75.75 0 0 0 1-.707V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg>
              <div>
                <h1 className="font-bold text-slate-900 text-lg leading-tight tracking-tight">Doc-Suite</h1>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">AI Document Studio</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 bg-[#D1AA41]/10 text-[#D1AA41] rounded-lg font-semibold text-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              <span>Home</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
              <span>Documents</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" /></svg>
              <span>Templates</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              <span>Recent</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385c.148.621-.531 1.07-1.041.74l-4.72-3.04a.563.563 0 0 0-.54 0l-4.72 3.04c-.51.33-1.189-.119-1.042-.74l1.285-5.385a.563.563 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 0-.182-.557l-4.204-3.602c-.38-.325-.178-.95.321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
              <span>Favorites</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom Action & Profile */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-[#D1AA41]/10 rounded-xl p-4 mb-4">
            <h4 className="text-sm font-bold text-[#D1AA41] mb-1">AI Assistant</h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">Start by describing the document you want to create.</p>
            <button 
              onClick={() => navigate('/editor')}
              className="w-full bg-white text-slate-800 border border-slate-200 shadow-sm text-xs font-semibold py-2 rounded-md hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#D1AA41]"><path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" /><path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" /></svg>
              <span>Start Voice Input</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
              AE
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900 leading-none">Alwin Emmanuel</h4>
              <p className="text-xs text-slate-500">Advocate</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="max-w-6xl w-full mx-auto p-8 lg:p-12">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-[#D1AA41]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c1.414 0 2.806.256 4.122.75M12 20.25c-1.414 0-2.806.256-4.122.75M12 3c-1.414 0-2.806.256-4.122.75M12 3c1.414 0 2.806.256 4.122.75m0 0V21m-4.122-17.25c-1.414 0-2.806-.256-4.122-.75M7.878 3.75V21" /></svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Good morning, Advocate</h2>
                <p className="text-slate-500 text-sm mt-1">Create, edit, and manage all your legal documents with AI assistance.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 shrink-0">
              <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                Upload Document
              </button>
              <button 
                onClick={() => navigate('/editor')}
                className="px-5 py-2.5 bg-[#D1AA41] text-white font-semibold text-sm rounded-lg hover:bg-[#b89539] transition-colors shadow-md shadow-[#D1AA41]/20"
              >
                New Document
              </button>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Voice to Document', desc: 'Speak and let AI create your document', btnText: 'Start Speaking', action: () => navigate('/editor') },
              { title: 'AI Document', desc: 'Generate a document using AI', btnText: 'Generate', action: () => navigate('/editor') },
              { title: 'Templates', desc: 'Choose from legal document templates', btnText: 'Browse Templates', action: () => {} },
              { title: 'Import', desc: 'Import existing document', btnText: 'Import', action: () => {} },
            ].map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="text-[#D1AA41] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-xs text-slate-500 mb-6 flex-1">{card.desc}</p>
                <button 
                  onClick={card.action}
                  className="w-full py-2 bg-[#D1AA41]/10 text-[#D1AA41] hover:bg-[#D1AA41] hover:text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  {card.btnText}
                </button>
              </div>
            ))}
          </div>

          {/* Recent Documents Table */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold text-lg text-slate-900">Recent Documents</h3>
              <button className="text-sm font-semibold text-[#D1AA41] hover:text-[#b89539]">View all</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-2xl">Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Last Modified</th>
                    <th className="px-6 py-4 text-center rounded-tr-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {recentDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{doc.name}</td>
                      <td className="px-6 py-4">{doc.type}</td>
                      <td className="px-6 py-4 text-slate-500">{doc.date}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-slate-400 hover:text-slate-600">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Suggested Templates */}
          <div>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold text-lg text-slate-900">Suggested Templates</h3>
              <button className="text-sm font-semibold text-[#D1AA41] hover:text-[#b89539]">View all</button>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {suggestedTemplates.map((template) => (
                <div key={template.id} className="min-w-50 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group">
                  <div className="w-12 h-12 bg-[#D1AA41]/10 text-[#D1AA41] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{template.title}</h4>
                  <p className="text-xs text-slate-500">{template.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}