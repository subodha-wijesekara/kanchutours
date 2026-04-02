"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Calendar, 
  Trash2, 
  CheckCircle, 
  Inbox, 
  Clock, 
  User, 
  Phone, 
  Users, 
  Compass, 
  MessageSquare,
  RefreshCw,
  Search,
  Filter,
  LogOut,
  Users as UsersIcon,
  Activity,
  Globe
} from "lucide-react";

type UserType = {
  email: string;
  role: 'admin' | 'superadmin';
};

type Visitor = {
  _id: string;
  ip: string;
  userAgent: string;
  count: number;
  lastVisited: string;
};

type Submission = {
  _id: string;
  name: string;
  email: string;
  status: 'unread' | 'read';
  createdAt: string;
  type: 'contact' | 'booking';
  // Contact specific
  subject?: string;
  message?: string;
  // Booking specific
  phone?: string;
  date?: string;
  people?: string;
  interest?: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState<'contacts' | 'bookings' | 'visitors'>('contacts');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ contacts: Submission[], bookings: Submission[] }>({
    contacts: [],
    bookings: [],
  });
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const result = await response.json();
      if (result.success) {
        setCurrentUser(result.user);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/admin/submissions');
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
      
      // Also fetch visitors
      const vResponse = await fetch('/api/admin/visitors');
      const vResult = await vResponse.json();
      if (vResult.success) {
        setVisitors(vResult.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleDelete = async (id: string, type: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const response = await fetch(`/api/admin/submissions?id=${id}&type=${type}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const toggleStatus = async (id: string, type: string, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type, status: newStatus }),
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const filteredItems = (activeTab === 'contacts' ? data.contacts : data.bookings).filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400 animate-pulse">
          Verifying Session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-sans pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Bar Actions */}
        <div className="flex justify-end gap-3 mb-8">
           {currentUser.role === 'superadmin' && (
             <button 
                onClick={() => router.push('/admin/users')}
                className="flex items-center gap-2 px-4 py-2 border border-black/10 dark:border-white/10 hover:border-primary text-[10px] font-black uppercase tracking-widest transition-all"
             >
                <UsersIcon className="w-3.5 h-3.5" />
                User Management
             </button>
           )}
           <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-black/10 dark:border-white/10 hover:border-red-500 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-all"
           >
              <LogOut className="w-3.5 h-3.5" />
              Logout
           </button>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-white/40 mb-4"
            >
              Management Console
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none"
            >
              Admin <span className="text-primary italic">Dashboard</span>
            </motion.h1>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors min-w-[250px]"
                />
             </div>
             <button 
              onClick={fetchData}
              disabled={isRefreshing}
              className={`p-2 border border-black/10 dark:border-white/10 hover:border-primary transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
             >
               <RefreshCw className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Contacts', value: data.contacts.length, icon: Mail },
            { label: 'Total Bookings', value: data.bookings.length, icon: Calendar },
            { label: 'Unread Items', value: [...data.contacts, ...data.bookings].filter(i => i.status === 'unread').length, icon: Clock, highlight: true },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-[2px] h-full bg-primary/20 group-hover:bg-primary transition-colors" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-white/40 mb-1">{stat.label}</p>
                  <h3 className={`text-3xl font-black ${stat.highlight ? 'text-primary' : ''}`}>{stat.value}</h3>
                </div>
                <stat.icon className="w-5 h-5 text-slate-300 dark:text-white/20" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-black/5 dark:border-white/10">
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'contacts' ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
          >
            Contact Messages
            {activeTab === 'contacts' && <motion.div layoutId="admin-tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
          
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'bookings' ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
          >
            Bookings
            {activeTab === 'bookings' && <motion.div layoutId="admin-tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
          
          <button
            onClick={() => setActiveTab('visitors')}
            className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'visitors' ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
          >
            Traffic Logs
            {activeTab === 'visitors' && <motion.div layoutId="admin-tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
        </div>

        {/* Content Table/List */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 text-center animate-pulse text-slate-400 uppercase text-xs tracking-widest">Loading records...</div>
          ) : activeTab === 'visitors' ? (
            <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 overflow-hidden">
               <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[10px] uppercase font-black tracking-widest text-slate-500">
                      <th className="p-6">IP Address</th>
                      <th className="p-6">Browser / System</th>
                      <th className="p-6">Visits</th>
                      <th className="p-6 text-right">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {visitors.map((visitor) => (
                      <tr key={visitor._id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-primary" />
                            <span className="text-sm font-black uppercase tracking-tight">{visitor.ip}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate max-w-xs" title={visitor.userAgent}>
                            {visitor.userAgent}
                          </p>
                        </td>
                        <td className="p-6">
                          <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded">
                            {visitor.count}
                          </span>
                        </td>
                        <td className="p-6 text-right text-[10px] text-slate-400 uppercase font-black">
                          {new Date(visitor.lastVisited).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-black/10 dark:border-white/10">
              <Inbox className="w-10 h-10 text-slate-200 dark:text-white/10 mx-auto mb-4" />
              <p className="text-slate-400 text-sm uppercase tracking-widest">No submissions found</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-white dark:bg-white/5 border border-black/5 dark:border-white/8 p-6 lg:p-8 relative group transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.07] ${item.status === 'unread' ? 'border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="space-y-4 flex-1">
                      {/* Name & Badge */}
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-black uppercase tracking-tight">{item.name}</h4>
                        {item.status === 'unread' && (
                          <span className="bg-primary/10 text-primary text-[8px] font-black uppercase px-2 py-0.5 tracking-tighter">NEW</span>
                        )}
                        <span className="text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-widest ml-auto lg:ml-0">
                          {new Date(item.createdAt).toLocaleDateString()} · {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-white/60">
                          <Mail className="w-3.5 h-3.5 text-primary" />
                          {item.email}
                        </div>
                        {activeTab === 'bookings' && (
                          <>
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-white/60">
                              <Phone className="w-3.5 h-3.5 text-primary" />
                              {item.phone || 'N/A'}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-white/60">
                              <Calendar className="w-3.5 h-3.5 text-primary" />
                              {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-white/60">
                              <Users className="w-3.5 h-3.5 text-primary" />
                              {item.people} Travelers
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-white/60 col-span-full">
                              <Compass className="w-3.5 h-3.5 text-primary" />
                              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">{item.interest || 'General Inquiry'}</span>
                            </div>
                          </>
                        )}
                        {activeTab === 'contacts' && (
                          <div className="flex items-center gap-3 text-sm text-slate-900 dark:text-white col-span-full font-bold uppercase tracking-widest">
                            <MessageSquare className="w-3.5 h-3.5 text-primary" />
                            {item.subject}
                          </div>
                        )}
                      </div>

                      {/* Message Box */}
                      {item.message && (
                        <div className="bg-slate-50 dark:bg-black/20 p-4 border border-black/5 dark:border-white/5 text-sm text-slate-600 dark:text-white/50 leading-relaxed italic">
                          "{item.message}"
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-black/5 dark:border-white/10 shrink-0">
                      <button 
                        onClick={() => toggleStatus(item._id, activeTab === 'contacts' ? 'contact' : 'booking', item.status)}
                        className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${item.status === 'read' ? 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/40' : 'bg-primary text-white hover:bg-primary-dark'}`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        {item.status === 'read' ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id, activeTab === 'contacts' ? 'contact' : 'booking')}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
}
