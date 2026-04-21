import React, { useState } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  Settings, 
  Ticket, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Send,
  User,
  ShieldCheck,
  Search,
  LayoutDashboard,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

// --- Mock Data ---
const INITIAL_TICKETS = [
  { id: 'TIC-1024', customer: 'Alice Smith', agent: 'John Doe', title: 'Payment Gateway Error', status: 'In Progress', priority: 'High', date: '2024-04-21 10:30' },
  { id: 'TIC-1025', customer: 'Bob Brown', agent: 'Jane Roe', title: 'Account Deactivation', status: 'New', priority: 'Medium', date: '2024-04-21 11:15' },
  { id: 'TIC-1026', customer: 'Charlie Davis', agent: 'John Doe', title: 'Feature Request: Dark Mode', status: 'Resolved', priority: 'Low', date: '2024-04-20 14:45' },
  { id: 'TIC-1027', customer: 'Dana White', agent: 'Pending', title: 'Slow Dashboard Loading', status: 'New', priority: 'High', date: '2024-04-21 12:00' },
];

const AGENTS = [
  { id: 'A001', name: 'John Doe', status: 'Online', specialized: 'Finance', active: 3 },
  { id: 'A002', name: 'Jane Roe', status: 'Offline', specialized: 'Account', active: 1 },
  { id: 'A003', name: 'Mark Wilson', status: 'Online', specialized: 'Infrastructure', active: 0 },
];

// --- Sub-Components ---

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: any, color: string }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const UserRoleBadge = ({ role }: { role: string }) => {
  const colors: Record<string, string> = {
    Admin: 'bg-indigo-500',
    Agent: 'bg-emerald-500',
    Customer: 'bg-amber-500',
  };
  return <Badge className={colors[role]}>{role}</Badge>;
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors: Record<string, string> = {
    High: 'bg-rose-500',
    Medium: 'bg-amber-500',
    Low: 'bg-slate-500',
  };
  return <Badge className={colors[priority]}>{priority}</Badge>;
};

const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, string> = {
    'New': 'bg-blue-100 text-blue-800 border-blue-200',
    'In Progress': 'bg-amber-100 text-amber-800 border-amber-200',
    'Resolved': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Closed': 'bg-slate-100 text-slate-800 border-slate-200',
  };
  return <Badge variant="outline" className={variants[status]}>{status}</Badge>;
};

// --- Main App Component ---

export default function App() {
  const [activeRole, setActiveRole] = useState('admin');
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [newTicket, setNewTicket] = useState({ title: '', priority: 'Medium', description: '' });

  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title) return toast.error('Please enter a title');
    
    const tic = {
      id: `TIC-${1024 + tickets.length}`,
      customer: 'Current User',
      agent: 'Pending',
      title: newTicket.title,
      status: 'New',
      priority: newTicket.priority,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    
    setTickets([tic, ...tickets]);
    setNewTicket({ title: '', priority: 'Medium', description: '' });
    toast.success('Ticket created successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-blue-100">
      <Toaster position="top-right" />
      
      {/* Top Navigation / Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-700 text-white p-2 rounded">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight uppercase">BPO MANAGEMENT SYSTEM</h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Engineering Project Manual | CS-304</p>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-700">Candidate ID: ENG-2024-0369</p>
            <p className="text-[10px] text-green-600 font-bold uppercase">Status: Verified & Complete</p>
          </div>
          <Button className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 text-sm font-medium rounded transition-colors h-9">
            Export to PDF
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
          <nav className="p-4 flex-1 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Access Roles</p>
            <div 
              onClick={() => setActiveRole('admin')}
              className={`p-2 text-sm cursor-pointer transition-all ${
                activeRole === 'admin' 
                  ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              01. System Administrator
            </div>
            <div 
              onClick={() => setActiveRole('agent')}
              className={`p-2 text-sm cursor-pointer transition-all ${
                activeRole === 'agent' 
                  ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              02. Support Agent
            </div>
            <div 
              onClick={() => setActiveRole('customer')}
              className={`p-2 text-sm cursor-pointer transition-all ${
                activeRole === 'customer' 
                  ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              03. End Customer
            </div>
            
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2">System Specs</p>
            <div className="p-2 text-slate-600 text-sm hover:bg-slate-50 cursor-pointer">Project Methodology</div>
            <div className="p-2 text-slate-600 text-sm hover:bg-slate-50 cursor-pointer">Database Schema</div>
            <div className="p-2 text-slate-600 text-sm hover:bg-slate-50 cursor-pointer">Test Results</div>
          </nav>
          
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between text-xs mb-1 font-semibold text-slate-500">
              <span>Task Completion</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full">
              <div className="bg-blue-600 h-1.5 rounded-full w-full"></div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto overflow-x-hidden">
          {/* Mobile Role Switcher */}
          <div className="md:hidden mb-4">
            <Select value={activeRole} onValueChange={setActiveRole}>
              <SelectTrigger className="w-full bg-white border-slate-200">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">System Administrator</SelectItem>
                <SelectItem value="agent">Support Agent</SelectItem>
                <SelectItem value="customer">End Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* ADMIN VIEW */}
              {activeRole === 'admin' && (
                <div className="space-y-6">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 border border-slate-200 rounded shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Queue Health</p>
                      <h3 className="text-xl font-bold text-slate-800">{tickets.length}</h3>
                      <p className="text-xs text-slate-500 mt-1 italic">Total tickets logged</p>
                    </div>
                    <div className="bg-white p-4 border border-slate-200 rounded shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Agent Coverage</p>
                      <h3 className="text-xl font-bold text-slate-800">{AGENTS.filter(a => a.status === 'Online').length}</h3>
                      <p className="text-xs text-slate-500 mt-1 italic">Active online personnel</p>
                    </div>
                    <div className="bg-white p-4 border border-slate-200 rounded shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Attention Req.</p>
                      <h3 className="text-xl font-bold text-slate-800">{tickets.filter(t => t.agent === 'Pending').length}</h3>
                      <p className="text-xs text-slate-500 mt-1 italic text-amber-600">Unassigned priority tasks</p>
                    </div>
                    <div className="bg-white p-4 border border-slate-200 rounded shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Resolution Efficiency</p>
                      <h3 className="text-xl font-bold text-slate-800">84%</h3>
                      <p className="text-xs text-slate-500 mt-1 italic text-green-600">Verified & Complete</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Ticket Matrix */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col">
                      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Exercise 9: Global Ticket Workflow Matrix</h2>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                          <Input className="pl-8 h-8 text-xs w-[180px] bg-white border-slate-200" placeholder="Search entries..." />
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] text-left border-collapse">
                          <thead className="bg-slate-50 text-slate-500 uppercase font-bold">
                            <tr>
                              <th className="px-4 py-2 border-b border-slate-200">ID</th>
                              <th className="px-4 py-2 border-b border-slate-200">Actor</th>
                              <th className="px-4 py-2 border-b border-slate-200">Owner</th>
                              <th className="px-4 py-2 border-b border-slate-200">Status</th>
                              <th className="px-4 py-2 border-b border-slate-200">Priority</th>
                              <th className="px-4 py-2 border-b border-slate-200 text-right">Audit</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-600">
                            {tickets.map((t) => (
                              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-2 border-b border-slate-100 font-mono text-[10px] font-bold">{t.id}</td>
                                <td className="px-4 py-2 border-b border-slate-100">{t.customer}</td>
                                <td className="px-4 py-2 border-b border-slate-100 italic">{t.agent}</td>
                                <td className="px-4 py-2 border-b border-slate-100">
                                  <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase border ${
                                    t.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    t.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                    t.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-100' :
                                    'bg-slate-50 text-slate-700 border-slate-100'
                                  }`}>
                                    {t.status}
                                  </span>
                                </td>
                                <td className="px-4 py-2 border-b border-slate-100 font-bold uppercase text-[9px] tracking-wide">{t.priority}</td>
                                <td className="px-4 py-2 border-b border-slate-100 text-right">
                                  <button className="text-blue-600 hover:underline font-bold">Review</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Agent Pulse Monitor */}
                    <div className="bg-white border border-slate-200 rounded shadow-sm flex flex-col">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Agent Availability Pulse</h2>
                      </div>
                      <div className="p-4 space-y-4">
                        {AGENTS.map((agent) => (
                          <div key={agent.id} className="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50/50">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ring-4 ring-offset-2 ${
                                agent.status === 'Online' ? 'bg-green-500 ring-green-50/50' : 'bg-slate-300 ring-slate-50/50'
                              }`} />
                              <div>
                                <p className="text-xs font-bold text-slate-900">{agent.name}</p>
                                <p className="text-[10px] text-slate-500 uppercase font-semibold">{agent.specialized}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 italic">Workload: {agent.active}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 mt-auto border-t border-slate-100">
                        <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 text-xs h-8" variant="outline">
                          <Plus className="mr-2 h-3 w-3" /> Register New Agent
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AGENT VIEW */}
              {activeRole === 'agent' && (
                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4 bg-white border border-slate-200 rounded shadow-sm flex flex-col h-fit">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Assigned Task Queue</h2>
                    </div>
                    <ScrollArea className="h-[520px]">
                      <div className="divide-y divide-slate-100">
                        {tickets.filter(t => t.agent === 'John Doe').map(t => (
                          <div key={t.id} className="p-4 hover:bg-slate-50 cursor-pointer transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">UID: {t.id}</span>
                              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">{t.priority}</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{t.title}</h4>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-[10px] text-slate-500 font-medium italic">{t.customer}</span>
                              <span className="text-[9px] font-bold uppercase text-slate-400 italic font-mono">{t.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-white border border-slate-200 rounded shadow-sm flex flex-col min-h-[400px]">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <div>
                          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <Ticket className="w-3 h-3 text-blue-600" /> 
                            Manual Review: TIC-1024
                          </h2>
                          <p className="text-[10px] text-slate-400 italic">Initiated by Alice Smith on 2024-04-21</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-[10px] font-bold uppercase hover:bg-slate-200 border border-slate-200">On Hold</button>
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase hover:bg-green-700 shadow-sm transition-all">Resolve Ticket</button>
                        </div>
                      </div>
                      <div className="p-6 space-y-6 flex-1">
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded text-xs text-slate-600 italic leading-relaxed">
                          <p className="font-bold text-slate-800 uppercase text-[10px] mb-2 not-italic">Issue Component Analysis:</p>
                          "The customer is reporting that every time they try to checkout, the screen freezes at the 'Processing' stage. They have tried multiple browsers but the result remains the same."
                        </div>

                        <div className="space-y-4">
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                             Activity Audit Trail
                          </h5>
                          <div className="space-y-4 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
                            <div className="flex items-start gap-4 pl-6 relative">
                              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-white border border-slate-300" />
                              <div className="text-[11px]">
                                <p className="font-bold text-slate-700">Ticket Initialized in Database</p>
                                <p className="text-slate-400 text-[10px] italic">Timestamp: 2024-04-21 10:30</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4 pl-6 relative">
                              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-500 border border-blue-200" />
                              <div className="text-[11px]">
                                <p className="font-bold text-blue-700 leading-tight">Assigned to Primary Agent [John Doe]</p>
                                <p className="text-slate-400 text-[10px] italic">Timestamp: 2024-04-21 10:45</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                        <Input placeholder="Type internal audit note or response..." className="bg-white h-9 text-xs border-slate-200" />
                        <button className="bg-slate-900 text-white p-2 rounded hover:bg-slate-800 self-center">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CUSTOMER VIEW */}
              {activeRole === 'customer' && (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-200 rounded shadow-sm flex flex-col">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Raise New Support Directive</h2>
                      </div>
                      <form onSubmit={handleRaiseTicket} className="p-6 space-y-4">
                        <div className="space-y-1">
                          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider" htmlFor="title">Direct Title</Label>
                          <Input 
                            id="title" 
                            className="bg-white text-xs h-9 border-slate-200" 
                            placeholder="Briefly summarize your request" 
                            value={newTicket.title}
                            onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider" htmlFor="priority">Urgency Classification</Label>
                          <Select 
                            value={newTicket.priority} 
                            onValueChange={(val) => setNewTicket({...newTicket, priority: val})}
                          >
                            <SelectTrigger className="h-9 bg-white text-xs border-slate-200">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Low">Low - Deferred</SelectItem>
                              <SelectItem value="Medium">Medium - Standard</SelectItem>
                              <SelectItem value="High">High - Critical Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider" htmlFor="desc">Execution Details</Label>
                          <textarea 
                            id="desc"
                            className="w-full min-h-[100px] border border-slate-200 rounded-md p-3 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Describe the issue for the system administrator..."
                          />
                        </div>
                        <button type="submit" className="w-full bg-slate-900 text-white py-2 rounded text-[11px] font-bold uppercase transition-all shadow-sm hover:translate-y-[-1px]">
                          Submit to Queue &rarr;
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded shadow-sm flex flex-col">
                      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Historical Interaction Log</h2>
                        <span className="text-[9px] px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded">PERSISTENT STATUS</span>
                      </div>
                      <div className="p-4 space-y-4">
                        {tickets.filter(t => t.customer === 'Alice Smith' || t.customer === 'Current User').map(t => (
                          <div key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded bg-white hover:bg-slate-50 transition-all group cursor-pointer border-l-4 border-l-slate-300 hover:border-l-blue-600">
                            <div className="flex items-center gap-4 mb-3 sm:mb-0">
                              <div className={`p-2.5 rounded border ${
                                t.status === 'Resolved' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`}>
                                <Ticket className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-800">{t.title}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">UID: {t.id} | {t.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                                t.status === 'Resolved' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-100'
                              }`}>{t.status}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Premium Support Banner Styling */}
                    <div className="bg-slate-900 border border-slate-800 rounded shadow-lg overflow-hidden relative p-8">
                       <div className="relative z-10">
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2">Technical Assurance</p>
                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">24/7 SLA Verified Support</h3>
                        <p className="text-slate-400 max-w-[420px] mb-6 text-xs leading-relaxed italic">
                          Enterprise-level directive: priority access to tier-3 agents with guaranteed 15-minute response throughput for critical infrastructure issues.
                        </p>
                        <button className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-2 rounded text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors">
                          Access Help Desk
                        </button>
                       </div>
                       <ShieldCheck className="absolute -right-16 -bottom-16 w-64 h-64 text-white opacity-[0.03] rotate-12 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer Bar */}
      <footer className="bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">BPO Management System UML Specification &copy; 2024</p>
        <div className="flex space-x-6 items-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Page Ref: CS-304/L24</span>
          <span className="text-[10px] text-blue-600 font-bold cursor-pointer uppercase tracking-wider flex items-center group">
            Proceed to Verification <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </footer>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

