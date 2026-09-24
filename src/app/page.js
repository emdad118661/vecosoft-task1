'use client'
import { useState, useEffect } from 'react';
import { Package, AlertCircle, ChevronLeft, LogOut, User, ShieldCheck, Lock, Mail, Phone, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function OrderTrackingSystem() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPreparing, setIsPreparing] = useState(true);

  const [orderInfo, setOrderInfo] = useState({
    id: "ORD-992831",
    orderDate: "2023-10-20", 
    steps: {
      processing: { completed: true, date: "2023-10-21" },
      shipped: { completed: true, date: "2023-10-22" },
      outForDelivery: { completed: false, date: "" },
      delivered: { completed: false, date: "" }
    },
    feedback: { status: null, phone: '' }
  });

  const [isDelayed, setIsDelayed] = useState(false);
  const [tempPhone, setTempPhone] = useState('');

  useEffect(() => {
    if (user && user.role === 'customer') {
      setIsPreparing(true);
      const timer = setTimeout(() => setIsPreparing(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    const start = new Date(orderInfo.orderDate);
    const today = new Date();
    
    if (orderInfo.steps.outForDelivery.completed && orderInfo.steps.outForDelivery.date) {
      const outDate = new Date(orderInfo.steps.outForDelivery.date);
      const diff = Math.ceil(Math.abs(outDate - start) / (1000 * 60 * 60 * 24));
      if (diff > 3) { setIsDelayed(true); return; }
    }

    const diffSinceOrder = Math.ceil(Math.abs(today - start) / (1000 * 60 * 60 * 24));
    if (diffSinceOrder > 3 && !orderInfo.steps.delivered.completed) {
      setIsDelayed(true);
      return;
    }
    setIsDelayed(false);
  }, [orderInfo]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@test.com' && password === 'admin123') setUser({ email, role: 'admin' });
    else if (email === 'user@test.com' && password === 'user123') setUser({ email, role: 'customer' });
    else alert("Invalid credentials!");
  };

  const handleLogout = () => {
    setUser(null); setEmail(''); setPassword(''); setIsPreparing(true);
  };

  // Feedback submission function (with phone number validation)
  const submitFeedback = (status) => {
    if (status === 'not_received') {
      if (!tempPhone || tempPhone.trim() === "") {
        alert("Phone number is required to report a missing package!");
        return;
      }
    }
    setOrderInfo({ ...orderInfo, feedback: { status, phone: status === 'not_received' ? tempPhone : '' } });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl text-center border">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 -rotate-6 transition-transform hover:rotate-0"><Package className="text-white" size={40} /></div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tighter">TrackFlow</h2>
          <p className="text-gray-400 text-[10px] mb-8 font-black uppercase tracking-[.3em]">Logistics System</p>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <input type="email" placeholder="Email" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold text-sm transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold text-sm transition-all" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-700 active:scale-95 transition-all uppercase tracking-widest">Sign In</button>
          </form>
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl text-[10px] text-blue-800 font-bold text-left space-y-1">
            <p>Admin: <span className="font-black">admin@test.com</span> / admin123</p>
            <p>Customer: <span className="font-black">user@test.com</span> / user123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white border-b px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2"><Package className="text-blue-600" size={28}/><span className="font-black text-2xl tracking-tighter italic">TrackFlow</span></div>
        <div className="flex items-center gap-5 text-right">
          <div className="hidden sm:block"><p className="text-[10px] font-black uppercase text-blue-600">{user.role}</p><p className="text-xs font-bold text-gray-400 leading-none">{user.email}</p></div>
          <button type="button" onClick={handleLogout} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all cursor-pointer"><LogOut size={20} /></button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {user.role === 'admin' ? (
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 italic"><ShieldCheck className="text-blue-600"/> Dispatch Center</h3>
            {orderInfo.feedback.status === 'not_received' && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center gap-4 animate-pulse italic text-xs font-bold text-red-800">
                <AlertCircle className="text-red-600" /> Customer reported missing package! Call: {orderInfo.feedback.phone}
              </div>
            )}
            <div className="space-y-6">
              <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Placed Date</label>
              <input type="date" value={orderInfo.orderDate} onChange={(e)=>setOrderInfo({...orderInfo, orderDate: e.target.value})} className="w-full mt-2 p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 font-bold text-sm" /></div>
              {['processing', 'shipped', 'outForDelivery', 'delivered'].map(step => (
                <div key={step} className="p-4 bg-slate-50 rounded-3xl border flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-slate-800 capitalize tracking-tight">{step.replace(/([A-Z])/g, ' $1')}</span>
                    <input type="checkbox" checked={orderInfo.steps[step].completed} onChange={(e) => setOrderInfo({...orderInfo, steps: {...orderInfo.steps, [step]: {...orderInfo.steps[step], completed: e.target.checked}}})} className="w-6 h-6 accent-blue-600 cursor-pointer" />
                  </div>
                  {orderInfo.steps[step].completed && <input type="date" value={orderInfo.steps[step].date} onChange={(e) => setOrderInfo({...orderInfo, steps: {...orderInfo.steps, [step]: {...orderInfo.steps[step], date: e.target.value}}})} className="w-full p-2 bg-white rounded-xl text-xs font-bold border border-gray-100 outline-none" />}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden lg:block bg-blue-600 p-20 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group transition-all">
            <Package className="absolute -right-20 -bottom-20 text-white/10 group-hover:scale-110 duration-700" size={350} />
            <h2 className="text-6xl font-black leading-tight italic tracking-tighter decoration-white/20 underline underline-offset-8">Faster.<br/>Safer.<br/>Better.</h2>
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-full max-w-[410px] bg-white rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.12)] border-[10px] border-slate-900 overflow-hidden relative min-h-[820px] flex flex-col">
            <div className="p-8 pt-16 border-b flex justify-between items-center bg-white sticky top-0 z-20">
              <ChevronLeft size={24} className="text-gray-300" />
              <div className="text-center"><span className="text-[10px] font-black text-blue-600 uppercase tracking-[.4em]">Tracking Order</span><h4 className="font-black text-slate-800 text-xl tracking-tight italic underline underline-offset-4 decoration-blue-100">{orderInfo.id}</h4></div>
              <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center"><User size={20} className="text-gray-400"/></div>
            </div>

            {user.role === 'customer' && isPreparing ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-pulse">
                <Loader2 className="text-blue-600 animate-spin mb-6" size={56} />
                <h3 className="text-3xl font-black text-slate-900 mb-2 italic">Preparing...</h3>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-relaxed text-center">Tracking details will appear in a moment.</p>
              </div>
            ) : (
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="mb-10 text-center sm:text-left">
                  {/* Main Status Header – Updated according to your request. */}
                  <h2 className={`text-5xl font-black leading-none tracking-tighter italic ${isDelayed ? 'text-orange-600' : 'text-slate-900'}`}>
                    {orderInfo.feedback.status === 'not_received' ? 'Delivered, but not received' : 
                     orderInfo.steps.delivered.completed ? 'Delivered' : 
                     isDelayed ? 'Delayed' : 'En Route'}
                  </h2>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[.3em] mt-4 italic">Estimated Arrival: {isDelayed ? 'Oct 30, 2023' : 'Oct 28, 2023'}</p>
                </div>

                {isDelayed && (
                  <div className="bg-orange-50 p-6 rounded-[2.5rem] border-2 border-orange-100 mb-10 flex gap-4 shadow-sm animate-in fade-in duration-500">
                    <AlertCircle size={28} className="text-orange-600 shrink-0 mt-1" />
                    <div><h5 className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1 italic underline">Heavy Traffic Delay</h5>
                    <p className="text-[11px] font-bold text-orange-900 leading-snug italic text-left underline decoration-orange-200">We're sorry! Your package is running late due to heavy traffic conditions.</p></div>
                  </div>
                )}

                {orderInfo.steps.delivered.completed && !orderInfo.feedback.status && (
                  <div className="bg-blue-50 p-7 rounded-[3rem] border border-blue-100 mb-10 shadow-inner text-center">
                    <h4 className="font-black text-xs text-blue-900 mb-6 uppercase tracking-widest italic underline underline-offset-4 decoration-blue-200">Received the package?</h4>
                    <div className="flex gap-4 mb-6">
                      <button onClick={()=>submitFeedback('received')} className="flex-1 bg-white p-5 rounded-3xl border border-blue-100 flex flex-col items-center gap-2 shadow-sm hover:scale-105 active:scale-95 transition-all group"><CheckCircle2 className="text-gray-300 group-hover:text-green-500 transition-colors" /><span className="text-[10px] font-black uppercase text-slate-800">Yes</span></button>
                      <button onClick={()=>submitFeedback('not_received')} className="flex-1 bg-white p-5 rounded-3xl border border-blue-100 flex flex-col items-center gap-2 shadow-sm hover:scale-105 active:scale-95 transition-all group"><XCircle className="text-gray-300 group-hover:text-red-500 transition-colors" /><span className="text-[10px] font-black uppercase text-slate-800">No</span></button>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest italic">Report missing? Provide phone:</p>
                      <input type="tel" placeholder="+880 1XXX-XXXXXX" value={tempPhone} onChange={(e)=>setTempPhone(e.target.value)} className="w-full p-5 rounded-2xl text-xs font-black border-none outline-none focus:ring-2 ring-blue-400 shadow-sm" />
                    </div>
                  </div>
                )}

                {orderInfo.feedback.status && (
                  <div className={`p-6 rounded-[2.5rem] text-center mb-10 border-2 border-dashed ${orderInfo.feedback.status === 'received' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    <p className="text-[10px] font-black uppercase italic tracking-widest leading-relaxed underline underline-offset-4">{orderInfo.feedback.status === 'received' ? 'Delivery Confirmed! Thanks.' : 'Case Logged! We will call you back soon.'}</p>
                  </div>
                )}

                <div className="space-y-10 relative mt-5">
                  {[
                    { label: 'Order Placed', date: orderInfo.orderDate, done: true },
                    { label: 'Processing', ...orderInfo.steps.processing },
                    { label: 'Shipped', ...orderInfo.steps.shipped },
                    { label: 'Out for Delivery', ...orderInfo.steps.outForDelivery },
                    { label: 'Delivered', ...orderInfo.steps.delivered }
                  ].map((step, idx, arr) => (
                    <div key={idx} className="flex gap-7 relative">
                      {idx !== arr.length - 1 && (
                        <div className={`absolute left-[13px] top-8 w-[4px] h-full rounded-full transition-all duration-1000 ${step.completed || step.done ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'bg-gray-100'}`} />
                      )}
                      <div className={`z-10 w-[30px] h-[30px] rounded-full border-[6px] transition-all duration-700 ${step.completed || step.done ? 'bg-blue-600 border-blue-50 scale-110 shadow-lg' : 'bg-white border-gray-50'}`} />
                      <div><p className={`text-sm font-black italic tracking-tighter text-left ${step.completed || step.done ? 'text-slate-900 underline underline-offset-4 decoration-blue-100' : 'text-gray-300'}`}>{step.label}</p><p className="text-[10px] font-bold text-gray-400 mt-1 uppercase text-left">{step.date || 'Soon'}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-10 bg-slate-900 flex flex-col gap-4 mt-auto border-t border-slate-800">
               <button className="w-full bg-blue-600 text-white py-5 rounded-[2.5rem] font-black text-[11px] shadow-2xl active:scale-95 transition-all uppercase tracking-[.3em]">Support Center</button>
               <p className="text-center text-[9px] text-slate-500 font-black uppercase tracking-[.2em] cursor-pointer hover:text-white transition-colors">Privacy & Order Terms</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{` .custom-scrollbar::-webkit-scrollbar { width: 0px; } `}</style>
    </div>
  );
}