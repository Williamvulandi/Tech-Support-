import React, { useState } from 'react';

// --- SVG Icon Components (for a professional look) ---
const TicketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2H5z" /></svg>;
const WrenchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const LoadingSpinner = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

// --- Helper Components ---
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700 flex items-center space-x-4 transition-all duration-300 hover:bg-slate-800 hover:shadow-cyan-500/10">
    <div className={`text-3xl p-4 rounded-full bg-slate-900/50 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const DonutChart = ({ percent, color, label }) => (
    <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 36 36">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="rgba(71, 85, 105, 0.5)" strokeWidth="3"></path>
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${percent}, 100`} strokeLinecap="round"></path>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-white text-2xl font-bold">{percent}%</span>
            <span className="block text-slate-400 text-xs">{label}</span>
        </div>
    </div>
);

const BarChart = ({ data, title }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="space-y-4">
            {data.map((item, index) => (
                <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                         <p className="text-slate-400 text-sm font-medium truncate">{item.label}</p>
                         <p className="text-white text-sm font-bold">{item.value}%</p>
                    </div>
                    <div className="flex-1 bg-slate-700/50 rounded-full h-2.5">
                        <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.value}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Main Views ---
const AdminDashboard = () => {
    const ticketStatusData = { open: 60, progress: 25, closed: 15 };
    const priorityData = [
        { label: 'High', value: 75, color: 'bg-red-500' },
        { label: 'Medium', value: 50, color: 'bg-amber-500' },
        { label: 'Low', value: 25, color: 'bg-green-500' },
    ];
    const categoryData = [
        { label: 'Hardware', value: 60, color: 'bg-sky-500' },
        { label: 'Software', value: 80, color: 'bg-indigo-500' },
        { label: 'Network', value: 45, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Tickets" value="75" icon={<TicketIcon />} color="text-sky-400" />
                <StatCard title="Open Tickets" value="45" icon={<WrenchIcon />} color="text-amber-400" />
                <StatCard title="Resolved Today" value="12" icon={<CheckCircleIcon />} color="text-green-400" />
                <StatCard title="Avg. Resolution" value="2.5h" icon={<ClockIcon />} color="text-indigo-400" />
            </div>

            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">BI Dashboard</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-semibold text-white mb-4">Ticket Status Distribution</h3>
                        <DonutChart percent={ticketStatusData.open} color="#0ea5e9" label="Open"/>
                    </div>
                    <BarChart data={priorityData} title="Tickets by Priority" />
                    <BarChart data={categoryData} title="Tickets by Category" />
                </div>
            </div>

             <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Manage Tickets</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="border-b border-slate-700 text-xs text-slate-400 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-4">Title</th>
                                <th scope="col" className="px-6 py-4">User</th>
                                <th scope="col" className="px-6 py-4">Priority</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                                <th scope="col" className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-800 hover:bg-slate-800">
                                <td className="px-6 py-4 font-medium text-white">"Printer Not Working"</td>
                                <td className="px-6 py-4 flex items-center space-x-3"><img className="h-6 w-6 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt=""/><span>user@example.com</span></td>
                                <td className="px-6 py-4"><span className="bg-red-500/20 text-red-300 text-xs font-medium mr-2 px-2.5 py-1 rounded-full">High</span></td>
                                <td className="px-6 py-4"><span className="bg-amber-500/20 text-amber-300 text-xs font-medium mr-2 px-2.5 py-1 rounded-full">In Progress</span></td>
                                <td className="px-6 py-4 text-right"><button className="font-medium text-cyan-400 hover:underline">View Details</button></td>
                            </tr>
                             <tr className="hover:bg-slate-800">
                                <td className="px-6 py-4 font-medium text-white">"Cannot connect to WiFi"</td>
                                <td className="px-6 py-4 flex items-center space-x-3"><img className="h-6 w-6 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt=""/><span>another@example.com</span></td>
                                <td className="px-6 py-4"><span className="bg-green-500/20 text-green-300 text-xs font-medium mr-2 px-2.5 py-1 rounded-full">Low</span></td>
                                <td className="px-6 py-4"><span className="bg-sky-500/20 text-sky-300 text-xs font-medium mr-2 px-2.5 py-1 rounded-full">Open</span></td>
                                <td className="px-6 py-4 text-right"><button className="font-medium text-cyan-400 hover:underline">View Details</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const UserPortal = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Submit a New Ticket</h2>
            <form className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                    <input type="text" id="title" className="w-full bg-slate-900/70 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition" placeholder="e.g., My computer is slow" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea id="description" rows="4" className="w-full bg-slate-900/70 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition" placeholder="Please describe the issue in detail..."></textarea>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                        <select id="category" className="w-full bg-slate-900/70 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition">
                            <option>Hardware</option>
                            <option>Software</option>
                            <option>Network</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                        <select id="priority" className="w-full bg-slate-900/70 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg shadow-cyan-500/20">Submit Ticket</button>
            </form>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Your Recent Tickets</h2>
            <div className="space-y-4">
                 <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg">
                    <p className="font-semibold text-white">"Cannot log in to email"</p>
                    <p className="text-sm text-slate-400">Status: <span className="text-green-400 font-medium">Resolved</span></p>
                </div>
                 <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg">
                    <p className="font-semibold text-white">"Monitor is flickering"</p>
                    <p className="text-sm text-slate-400">Status: <span className="text-amber-400 font-medium">In Progress</span></p>
                </div>
            </div>
        </div>
    </div>
  );
};

const AuthPage = ({ setIsLoggedIn }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
            setIsLoggedIn(true);
        }, 1500);
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl shadow-2xl shadow-cyan-500/10">
                <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome {isLogin ? 'Back' : 'Aboard'}!</h2>
                <p className="text-center text-slate-400 mb-8">{isLogin ? 'Log in to continue' : 'Create an account to get started'}</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {!isLogin && (
                         <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                            <input type="text" name="name" id="name" className="w-full bg-slate-900/70 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition" placeholder="John Doe" required />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <input type="email" name="email" id="email" className="w-full bg-slate-900/70 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition" placeholder="you@example.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input type="password" name="password" id="password" className="w-full bg-slate-900/70 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition" placeholder="••••••••" required />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20">
                        {isLoading ? <LoadingSpinner /> : (isLogin ? 'Log In' : 'Create Account')}
                    </button>
                </form>
                <p className="text-center text-sm text-slate-400 mt-6">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-cyan-400 hover:underline ml-2">
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    );
};


// --- App Component ---
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminView, setIsAdminView] = useState(true);

  if (!isLoggedIn) {
      return (
         <div className="bg-slate-900 min-h-screen text-slate-300 font-sans">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-900/50 z-0"></div>
            <div className="relative z-10">
                <AuthPage setIsLoggedIn={setIsLoggedIn} />
            </div>
         </div>
      );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-300 font-sans">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/50 z-0"></div>
       <div className="relative z-10 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
                <h1 className="text-3xl font-bold text-white">Tech Support Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <div className="bg-slate-800 p-1 rounded-lg flex space-x-1 border border-slate-700">
                        <button 
                            onClick={() => setIsAdminView(true)}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition ${isAdminView ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700'}`}
                        >
                            Admin
                        </button>
                        <button 
                            onClick={() => setIsAdminView(false)}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition ${!isAdminView ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700'}`}
                        >
                            User
                        </button>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm flex items-center transition">
                    <LogoutIcon />
                    Logout
                    </button>
                </div>
                </header>
                
                <main>
                {isAdminView ? <AdminDashboard /> : <UserPortal />}
                </main>
            </div>
       </div>
    </div>
  );
}

export default App;

