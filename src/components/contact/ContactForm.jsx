import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Loader2, AlertCircle, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';
import { personalData } from '../../data/portfolioData';

export const ContactForm = () => {
  const { setCursor, resetCursor } = useCursor();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'WebGL & Creative Dev',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error' | 'notice'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '1d28c851-d69a-4c79-a265-06cdccce2afb';

    // If access key is not yet configured, seamlessly fall back to mailto link
    if (!accessKey || !accessKey.trim() || accessKey.includes('your_access_key')) {
      const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.projectType} from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Mahadev,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Focus: ${formData.projectType}\n\nProject Brief & Goals:\n${formData.message}\n\n---\nTransmitted from your portfolio website.`
      );
      window.open(`mailto:${personalData.email}?subject=${subject}&body=${body}`, '_blank');

      setStatus('notice');
      setStatusMessage('Mail client opened! To receive transmissions directly into your inbox silently, paste your free Web3Forms access key into the .env file.');
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('access_key', accessKey.trim());
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('project_focus', formData.projectType);
      formPayload.append('message', formData.message);
      formPayload.append('subject', `Portfolio Transmission: ${formData.name} [${formData.projectType}]`);
      formPayload.append('from_name', 'Mahadev Muchu Portfolio');
      formPayload.append('botcheck', '');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');

        // Trigger celebratory confetti burst
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#8B5CF6', '#06B6D4', '#10B981'],
          });
        } catch (err) {
          // Safe fallback
        }

        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            projectType: 'WebGL & Creative Dev',
            message: '',
          });
          setStatus('idle');
          setStatusMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Transmission failed. Please check your network or send directly via email.');
      }
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      setStatus('error');
      setStatusMessage('Network transmission error. Click below to reach out directly via email.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="relative group">
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full px-5 pt-6 pb-2 rounded-2xl bg-[#111117] border border-white/15 focus:border-accent-cyan text-white caret-accent-cyan font-sans text-sm placeholder-transparent outline-none transition-all duration-300 backdrop-blur-md focus:shadow-glow-cyan"
        />
        <label
          htmlFor="name"
          className="absolute left-5 top-2 text-[11px] font-grotesk uppercase tracking-wider text-slate-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent-cyan"
        >
          Your Name / Organization *
        </label>
      </div>

      {/* Email Field */}
      <div className="relative group">
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full px-5 pt-6 pb-2 rounded-2xl bg-[#111117] border border-white/15 focus:border-accent-cyan text-white caret-accent-cyan font-sans text-sm placeholder-transparent outline-none transition-all duration-300 backdrop-blur-md focus:shadow-glow-cyan"
        />
        <label
          htmlFor="email"
          className="absolute left-5 top-2 text-[11px] font-grotesk uppercase tracking-wider text-slate-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent-cyan"
        >
          Email Address *
        </label>
      </div>

      {/* Project Scope Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-grotesk uppercase tracking-wider text-slate-400 block pl-1">
          Project Focus
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            'WebGL & Creative Dev',
            'Full Product Engineering',
            'Design System & Motion',
            'Advisory & Consultation',
          ].map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setFormData((prev) => ({ ...prev, projectType: type }))}
              className={`p-3 rounded-xl text-xs font-grotesk transition-all duration-200 text-left border ${
                formData.projectType === type
                  ? 'bg-accent-violet/20 border-accent-violet text-white shadow-glow-violet'
                  : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Message Field */}
      <div className="relative group">
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full px-5 pt-6 pb-2 rounded-2xl bg-[#111117] border border-white/15 focus:border-accent-cyan text-white caret-accent-cyan font-sans text-sm placeholder-transparent outline-none transition-all duration-300 backdrop-blur-md focus:shadow-glow-cyan resize-none"
        />
        <label
          htmlFor="message"
          className="absolute left-5 top-2 text-[11px] font-grotesk uppercase tracking-wider text-slate-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent-cyan"
        >
          Project Brief & Goals *
        </label>
      </div>

      {/* Anti-spam Honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Feedback Message / Status Notice */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 border backdrop-blur-md ${
              status === 'error'
                ? 'bg-red-500/10 border-red-500/30 text-red-300'
                : 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
            }`}
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span>{statusMessage}</span>
              <div className="mt-1.5 flex items-center gap-3">
                <a
                  href={`mailto:${personalData.email}`}
                  className="inline-flex items-center gap-1 font-bold text-white hover:text-accent-cyan underline underline-offset-2"
                >
                  <Mail size={12} /> Direct Email: {personalData.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magnetic Submit Button */}
      <div className="pt-2">
        <Magnetic strength={0.35} className="w-full">
          <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            onMouseEnter={() => setCursor('button', 'SEND')}
            onMouseLeave={resetCursor}
            className={`w-full py-4 rounded-2xl font-grotesk font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 ${
              status === 'success'
                ? 'bg-accent-emerald text-obsidian shadow-glow-emerald'
                : 'bg-gradient-to-r from-accent-violet to-accent-cyan text-white hover:shadow-glow-violet'
            }`}
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Encrypting & Transmitting...</span>
              </>
            ) : status === 'success' ? (
              <>
                <Check size={16} />
                <span>Transmission Received! Speak Soon.</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Initiate Transmission</span>
              </>
            )}
          </button>
        </Magnetic>
      </div>
    </form>
  );
};

export default ContactForm;
