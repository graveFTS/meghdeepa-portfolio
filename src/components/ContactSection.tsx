import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'residential',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>GET IN TOUCH</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>OPPORTUNITIES & SANCTION CONSULTATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Contact Meghdeepa Maity
          </h2>
          <p className="mt-1 text-sm text-slate-400 font-sans max-w-2xl">
            Currently available for full-time architectural roles, AutoCAD drafting positions, and architectural consulting projects across Kolkata and pan-India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Communication Channels (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-lg bg-slate-900 border border-cyan-500/30 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                  DIRECT CONTACT INFORMATION
                </span>
                <h3 className="text-xl font-bold text-white font-sans">
                  Connect for Interviews & Inquiries
                </h3>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-500 block">OFFICIAL EMAIL:</span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-mono font-medium text-cyan-300 hover:text-amber-400 transition-colors truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-500 block">DIRECT TELEPHONE:</span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-sm font-mono font-medium text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {PERSONAL_INFO.formattedPhone}
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-500 block">BASE LOCATION:</span>
                <div className="flex items-center gap-2 text-sm font-mono text-slate-200">
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Quick WhatsApp / Direct Dial Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex-1 py-2.5 px-4 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold text-center transition-all shadow-md active:scale-95"
                >
                  CALL DIRECTLY
                </a>
                <a
                  href={`https://wa.me/918918760854?text=${encodeURIComponent("Hello Meghdeepa, I reviewed your architectural portfolio and would like to discuss an opportunity.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded border border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-mono text-xs font-bold text-center transition-all shadow-sm active:scale-95"
                >
                  WHATSAPP CHAT
                </a>
              </div>
            </div>
          </div>

          {/* Quick Consultation Form (Right 7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-lg bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                  COMMUNICATION DISPATCH
                </span>
                <h3 className="text-xl font-bold text-white font-sans">
                  Send a Message or Project Inquiry
                </h3>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                    <Check className="w-5 h-5" />
                    <span>MESSAGE DISPATCHED SUCCESSFULLY</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs">
                    Thank you for reaching out! Meghdeepa will review your inquiry and respond to <span className="text-amber-400 font-mono">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', projectType: 'residential', message: '' });
                    }}
                    className="mt-3 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 block">YOUR NAME / FIRM:</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sen / Design Group"
                        className="w-full px-3.5 py-2.5 rounded bg-slate-950 border border-slate-800 focus:border-amber-400 text-slate-200 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 block">EMAIL ADDRESS:</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. recruiter@architecturestudio.com"
                        className="w-full px-3.5 py-2.5 rounded bg-slate-950 border border-slate-800 focus:border-amber-400 text-slate-200 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">NATURE OF INQUIRY:</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-slate-950 border border-slate-800 focus:border-amber-400 text-slate-200 outline-none transition-colors"
                    >
                      <option value="fulltime">Full-Time Architectural & AutoCAD Role</option>
                      <option value="sanction">Municipal Sanction Drawings (KMC / NKDA / HIDCO)</option>
                      <option value="working">Civil Working Drawings & Detailing Package</option>
                      <option value="space">Educational or High-Rise Space Planning</option>
                      <option value="other">General Professional Inquiries</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">PROJECT SCOPE OR MESSAGE:</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention your project requirements, timeline, or interview schedule..."
                      className="w-full px-3.5 py-2.5 rounded bg-slate-950 border border-slate-800 focus:border-amber-400 text-slate-200 outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>DISPATCH MESSAGE TO MEGHDEEPA</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
