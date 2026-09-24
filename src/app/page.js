'use client'
import { useState, useEffect } from 'react';
import { Package, AlertCircle, ChevronLeft, LogOut, User, ShieldCheck, Lock, Mail, Phone, CheckCircle2, XCircle, Info, Loader2, Search } from 'lucide-react';

export default function OrderTrackingSystem() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // নতুন স্টেট: ট্র্যাকিং এভেইলেবল কি না তা চেক করার জন্য
  const [isPreparing, setIsPreparing] = useState(true);

  const [orderInfo, setOrderInfo] = useState({
    id: "ORD-992831",
    orderDate: "2023-10-20",
    steps: {
      processing: { completed: true, date: "2023-10-21" },
      shipped: { completed: false, date: "" },
      outForDelivery: { completed: false, date: "" },
      delivered: { completed: false, date: "" }
    },
    feedback: { status: null, phone: '' }
  });

  const [isDelayed, setIsDelayed] = useState(false);
  const [tempPhone, setTempPhone] = useState('');

  // সিমুলেশন: কাস্টমার লগইন করলে ৫ সেকেন্ড "Preparing" মোড থাকবে
  useEffect(() => {
    if (user && user.role === 'customer') {
      setIsPreparing(true);
      const timer = setTimeout(() => {
        setIsPreparing(false);
      }, 5000); // ৫ সেকেন্ড পর ট্র্যাকিং আসবে
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    if (orderInfo.steps.outForDelivery.completed && orderInfo.steps.outForDelivery.date) {
      const start = new Date(orderInfo.orderDate);
      const end = new Date(orderInfo.steps.outForDelivery.date);
      const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
      setIsDelayed(diffDays > 3);
    }
  }, [orderInfo]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@test.com' && password === 'admin123') setUser({ email, role: 'admin' });
    else if (email === 'user@test.com' && password === 'user123') setUser({ email, role: 'customer' });
    else alert("Use: admin@test.com/admin123 or user@test.com/user123");
  };

  const handleLogout = () => {
    setUser(null);
    setIsPreparing(true);
  };

  const submitFeedback = (status) => {
    if (status === 'not_received' && !tempPhone) {
      alert("Please provide your phone number.");
      return;
    }
    setOrderInfo({ ...orderInfo, feedback: { status, phone: status === 'not_received' ? tempPhone : '' } });
  };

  // --- LOGIN VIEW ---
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200 mx-auto mb-6 -rotate-6 transition-transform hover:rotate-0">
            <Package className="text-white" size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 italic">TrackFlow</h2>
          <p className="text-gray-400 text-[10px] mb-10 font-black uppercase tracking-[.3em]">Logistics Management</p>
          
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-300" size={18} />
              <input type="email" placeholder="Email" required className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold text-sm" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-300" size={18} />
              <input type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold text-sm" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all">LOG IN</button>
          </form>
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl text-[9px] text-blue-800 font-bold leading-relaxed text-center">
             ADMIN: admin@test.com (admin123) <br/> CUSTOMER: user@test.com (user123)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="bg-white border-b px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2"><Package className="text-blue-600" size={28}/><span className="font-black text-2xl tracking-tighter italic">TrackFlow</span></div>
        <div className="flex items-center gap-5 text-right">
          <div className="hidden sm:block"><p className="text-[10px] font-black uppercase text-blue-600">{user.role}</p><p className="text-xs font-bold text-gray-400">{user.email}</p></div>
          <button onClick={handleLogout} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><LogOut size={20}/></button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* --- LEFT SIDE --- */}
        {user.role === 'admin' ? (
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3"><ShieldCheck className="text-blue-600" size={24}/> Dispatch Center</h3>
            
            {orderInfo.steps.delivered.completed && (
              <div className={`mb-8 p-6 rounded-[2rem] border-2 border-dashed flex items-start gap-4 ${
                orderInfo.feedback.status === 'received' ? 'bg-green-50 border-green-200' : 
                orderInfo.feedback.status === 'not_received' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
              }`}>
                {orderInfo.feedback.status === 'received' ? <CheckCircle2 className="text-green-600 mt-1" /> : 
                 orderInfo.feedback.status === 'not_received' ? <XCircle className="text-red-600 mt-1" /> : <Info className="text-gray-400 mt-1" />}
                <div>
                  <h4 className="font-black text-xs uppercase tracking-[.2em]">Customer Confirmation</h4>
                  <p className="text-xs font-bold mt-1 italic">
                    {orderInfo.feedback.status === 'received' ? 'Package Received Successfully!' : 
                     orderInfo.feedback.status === 'not_received' ? `REPORTED MISSING! Contact: ${orderInfo.feedback.phone}` : 'Waiting for customer response...'}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Initialized</label>
              <input type="date" value={orderInfo.orderDate} onChange={(e)=>setOrderInfo({...orderInfo, orderDate: e.target.value})} className="w-full mt-2 p-4 bg-gray-50 rounded-2xl outline-none ring-blue-500 focus:ring-2 font-bold text-sm border-none" /></div>
              
              {['processing', 'shipped', 'outForDelivery', 'delivered'].map(step => (
                <div key={step} className="p-5 bg-slate-50 rounded-3xl border border-gray-100 hover:bg-white transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-black text-slate-800 capitalize tracking-tight">{step.replace(/([A-Z])/g, ' $1')}</span>
                    <input type="checkbox" checked={orderInfo.steps[step].completed} onChange={(e) => setOrderInfo({...orderInfo, steps: {...orderInfo.steps, [step]: {...orderInfo.steps[step], completed: e.target.checked}}})} className="w-6 h-6 accent-blue-600 cursor-pointer" />
                  </div>
                  {orderInfo.steps[step].completed && <input type="date" value={orderInfo.steps[step].date} onChange={(e) => setOrderInfo({...orderInfo, steps: {...orderInfo.steps, [step]: {...orderInfo.steps[step], date: e.target.value}}})} className="w-full p-2 bg-white rounded-xl text-xs font-bold border border-gray-100 outline-none focus:border-blue-500 shadow-sm" />}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden lg:block space-y-6">
            <div className="bg-blue-600 p-16 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <Package className="absolute -right-20 -bottom-20 text-white/10 transition-transform group-hover:scale-110 duration-700" size={350} />
               <h2 className="text-6xl font-black mb-6 leading-tight italic tracking-tighter underline underline-offset-8 decoration-white/20">Ship Smarter.<br/>Track Better.</h2>
               <p className="text-blue-100 font-bold text-sm uppercase tracking-[.4em]">Next-Gen Logistic Solutions</p>
            </div>
          </div>
        )}

        {/* --- RIGHT SIDE: CUSTOMER MOBILE UI --- */}
        <div className="flex justify-center">
          <div className="w-full max-w-[400px] bg-white rounded-[4rem] shadow-[0_35px_70px_rgba(0,0,0,0.1)] border-[10px] border-slate-900 overflow-hidden relative min-h-[780px] flex flex-col transition-all">
            
            <div className="p-8 pt-14 border-b flex justify-between items-center bg-white sticky top-0 z-20">
              <ChevronLeft size={24} className="text-gray-300" />
              <div className="text-center"><span className="text-[10px] font-black text-blue-600 uppercase tracking-[.3em]">Track Order</span><h4 className="font-black text-slate-800 text-lg">{orderInfo.id}</h4></div>
              <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center"><User size={20} className="text-gray-400"/></div>
            </div>

            {/* --- ১. TRACKING NOT AVAILABLE YET (PREPARING) --- */}
            {user.role === 'customer' && isPreparing ? (
              <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-700">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center shadow-inner border border-blue-100">
                    <Loader2 className="text-blue-600 animate-spin" size={36} />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight italic">Preparing your order...</h3>
                <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-[200px] mx-auto uppercase tracking-widest">
                  We are organizing your items for shipment. Tracking details will appear shortly.
                </p>
                <div className="mt-12 w-full space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 items-center opacity-30">
                      <div className="w-5 h-5 rounded-full bg-gray-100 border-4 border-white"></div>
                      <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* --- ২. ACTUAL TRACKING SCREEN --- */
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar animate-in slide-in-from-bottom-5 duration-700">
                <div className="mb-10">
                  <h2 className={`text-4xl font-black leading-none tracking-tighter italic ${isDelayed ? 'text-orange-600' : 'text-slate-900'}`}>
                    {orderInfo.steps.delivered.completed ? 'Delivered' : isDelayed ? 'Delayed' : 'En Route'}
                  </h2>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[.2em] mt-3">Est. Arrival: {isDelayed ? 'Oct 30' : 'Oct 28'}</p>
                </div>

                {isDelayed && !orderInfo.steps.delivered.completed && (
                  <div className="bg-orange-50 p-5 rounded-[2.5rem] border border-orange-100 mb-8 flex gap-4 shadow-sm italic">
                    <AlertCircle size={22} className="text-orange-600 shrink-0 mt-1" />
                    <p className="text-[11px] font-bold text-orange-900 leading-snug">We're sorry! Your package is running late due to heavy traffic conditions.</p>
                  </div>
                )}

                {/* Delivery Feedback */}
                {orderInfo.steps.delivered.completed && !orderInfo.feedback.status && (
                  <div className="bg-blue-50 p-6 rounded-[2.5rem] border border-blue-100 mb-8 shadow-inner">
                    <h4 className="font-black text-xs text-blue-900 mb-4 text-center uppercase tracking-widest">Order Received?</h4>
                    <div className="flex gap-4 mb-5">
                      <button onClick={() => submitFeedback('received')} className="flex-1 bg-white p-5 rounded-2xl flex flex-col items-center gap-2 border border-blue-100 hover:scale-105 transition-all shadow-sm">
                        <CheckCircle2 className="text-green-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Yes</span>
                      </button>
                      <button onClick={() => submitFeedback('not_received')} className="flex-1 bg-white p-5 rounded-2xl flex flex-col items-center gap-2 border border-blue-100 hover:scale-105 transition-all shadow-sm">
                        <XCircle className="text-red-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">No</span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-blue-300 text-center uppercase">Not received? Call us back</p>
                      <input type="tel" placeholder="+880 1xxx-xxxxxx" value={tempPhone} onChange={(e) => setTempPhone(e.target.value)} className="w-full p-4 rounded-2xl text-xs font-black border-none outline-none focus:ring-2 ring-blue-400 shadow-sm" />
                    </div>
                  </div>
                )}

                {orderInfo.feedback.status && (
                  <div className={`p-6 rounded-[2.5rem] text-center mb-8 border-2 border-dashed ${orderInfo.feedback.status === 'received' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    <p className="text-[10px] font-black uppercase italic tracking-widest">{orderInfo.feedback.status === 'received' ? 'Delivery Confirmed!' : 'Case Opened! Agent calling soon.'}</p>
                  </div>
                )}

                {/* Timeline */}
                <div className="space-y-8 relative">
                  {[
                    { label: 'Order Placed', date: orderInfo.orderDate, done: true },
                    { label: 'Processing', ...orderInfo.steps.processing },
                    { label: 'Shipped', ...orderInfo.steps.shipped },
                    { label: 'Out for Delivery', ...orderInfo.steps.outForDelivery },
                    { label: 'Delivered', ...orderInfo.steps.delivered }
                  ].map((step, idx, arr) => (
                    <div key={idx} className="flex gap-6 relative group">
                      {idx !== arr.length - 1 && (
                        <div className={`absolute left-[13px] top-8 w-[4px] h-full rounded-full transition-all duration-1000 ${step.completed || step.done ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-gray-100'}`} />
                      )}
                      <div className={`z-10 w-[30px] h-[30px] rounded-full border-[6px] transition-all duration-700 ${
                        step.completed || step.done ? 'bg-blue-600 border-blue-50 scale-110 shadow-lg shadow-blue-200' : 'bg-white border-gray-50'
                      }`} />
                      <div className="pb-2">
                        <p className={`text-sm font-black tracking-tighter transition-colors italic ${step.completed || step.done ? 'text-slate-900' : 'text-gray-300'}`}>{step.label}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1">{step.date || '---'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="p-10 bg-slate-950 flex flex-col gap-4 mt-auto">
               <button className="w-full bg-blue-600 text-white py-5 rounded-[2.5rem] font-black text-[11px] shadow-2xl hover:shadow-blue-500/50 active:scale-95 transition-all uppercase tracking-[.3em]">Support Center</button>
               <p className="text-center text-[9px] text-slate-600 font-black uppercase tracking-[.2em] cursor-pointer hover:text-white transition-colors">Order Report History</p>
            </div>
          </div>
        </div>
      </main>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        .animate-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}