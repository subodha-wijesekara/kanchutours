"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Shield, 
  ShieldCheck, 
  Trash2, 
  UserPlus, 
  ArrowLeft, 
  CheckCircle, 
  XCircle,
  Loader2,
  Mail,
  Clock,
  Key
} from "lucide-react";

type User = {
  _id: string;
  email: string;
  role: 'admin' | 'superadmin';
  status: 'pending' | 'approved';
  createdAt: string;
};

export default function UserManagementPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // First check auth
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();
      
      if (!meData.success || meData.user.role !== 'superadmin') {
        router.push('/admin');
        return;
      }
      setCurrentUser(meData.user);

      // Fetch all users
      const usersRes = await fetch('/api/admin/users');
      const usersData = await usersRes.json();
      if (usersData.success) {
        setUsers(usersData.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (id: string, action: string, value: string) => {
    setActionLoading(id);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, value }),
      });
      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        alert(data.message || "Action failed");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePasswordReset = async (id: string, email: string) => {
    const newPassword = prompt(`Enter new password for ${email}:`);
    if (!newPassword || newPassword.length < 6) {
      if (newPassword) alert("Password must be at least 6 characters");
      return;
    }

    setActionLoading(id);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'password', value: newPassword }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Password updated successfully");
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this admin?")) return;
    
    setActionLoading(id);
    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      alert("Delete failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-sans pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <button 
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-white/40 mb-4"
              >
                Access Control
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none"
              >
                User <span className="text-primary italic">Management</span>
              </motion.h1>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 px-6 py-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Super Admin Role</p>
              <p className="text-xs text-slate-600 dark:text-white/60">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">User Details</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Role</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Registered</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border border-black/10 dark:border-white/10 flex items-center justify-center bg-white dark:bg-transparent">
                          <Mail className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-tight">{user.email}</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-widest">ID: {user._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        {user.role === 'superadmin' ? (
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest shadow-sm shadow-primary/20">
                            <ShieldCheck className="w-3 h-3" /> Super Admin
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/40 text-[9px] font-black uppercase tracking-widest">
                            <Shield className="w-3 h-3" /> Admin
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        {user.status === 'approved' ? (
                          <span className="flex items-center gap-1.5 text-green-500 text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle className="w-3.5 h-3.5" /> Approved
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-orange-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                            <Clock className="w-3.5 h-3.5" /> Pending
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6 text-[10px] text-slate-500 uppercase tracking-wider">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Approval Action */}
                        {user.status === 'pending' && (
                          <button 
                            onClick={() => handleAction(user._id, 'status', 'approved')}
                            disabled={actionLoading === user._id}
                            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}
                        
                        {/* Role Toggle Action (Super Admin only can toggle others) */}
                        {user.email !== currentUser.email && (
                          <>
                            <button 
                              onClick={() => handleAction(user._id, 'role', user.role === 'superadmin' ? 'admin' : 'superadmin')}
                              disabled={actionLoading === user._id || user.status !== 'approved'}
                              className="px-3 py-1.5 border border-black/10 dark:border-white/10 hover:border-primary text-slate-600 dark:text-white/60 hover:text-primary dark:hover:text-primary text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                            >
                              {user.role === 'superadmin' ? 'Make Admin' : 'Make Super'}
                            </button>
                            
                            <button 
                              onClick={() => handleDelete(user._id)}
                              disabled={actionLoading === user._id}
                              className="p-2 border border-black/10 dark:border-white/10 hover:border-red-500 hover:text-red-500 text-slate-400 transition-all disabled:opacity-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Help Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border border-dashed border-black/10 dark:border-white/10 bg-white dark:bg-transparent">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Approval System</h4>
             <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
               New administrators are registered in <span className="text-orange-500 font-bold">'Pending'</span> status by default. They will not be able to log in until a Super Admin approves their account from this panel.
             </p>
          </div>
          <div className="p-8 border border-dashed border-black/10 dark:border-white/10 bg-white dark:bg-transparent">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Super Admin Roles</h4>
             <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
               Super Admins have full access to User Management. They can promote regular Admins to Super Admins or remove access entirely. The primary super admin account cannot be deleted or demoted by others.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}
