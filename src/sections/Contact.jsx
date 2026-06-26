import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { personalData } from '../data/personal';
import { socialData } from '../data/social';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('Message sent!');
  const [toastMessage, setToastMessage] = useState('I will get back to you within 24 hours.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = { name: '', email: '', message: '' };
    let hasErrors = false;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
      hasErrors = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      hasErrors = true;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/amaanansari3108@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Message: formData.message
        })
      });

      const result = await response.json();

      if (response.ok) {
        setToastTitle("Message sent!");
        setToastMessage("I will get back to you within 24 hours.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setToastTitle("Submission failed");
        setToastMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setToastTitle("Network error");
      setToastMessage("Could not connect to submission server. Please try again.");
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute left-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" />

      <Container>
        <SectionTitle title="Get In Touch" subtitle="Contact & Collaboration" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Left Column: Direct info cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 reveal" data-reveal-direction="left">
            <GlassCard className="flex-1 flex flex-col justify-between p-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Let's create something together!
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8">
                  Whether you have an interesting job opportunity, a project collaboration, or simply want to talk about hardware architectures and AI - feel free to reach out.
                </p>
              </div>

              {/* Direct Details */}
              <div className="space-y-5">
                <div 
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 group"
                >
                  <a href={`mailto:${personalData.email}`} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Email Address</span>
                      <span className="text-sm md:text-base font-medium text-white group-hover:text-cyan-400 transition-colors">{personalData.email}</span>
                    </div>
                  </a>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-2 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer font-mono"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>

                <a 
                  href={`tel:${personalData.phone}`}
                  className="flex items-center gap-4 group p-3.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Phone Number</span>
                    <span className="text-sm md:text-base font-medium text-white group-hover:text-cyan-400 transition-colors">+{personalData.phone}</span>
                  </div>
                </a>

                <div 
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.01] border border-white/5"
                >
                  <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Location</span>
                    <span className="text-sm md:text-base font-medium text-white">{personalData.location}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Mini form/CTA grid card */}
          <div className="lg:col-span-7 reveal" data-reveal-direction="right" data-reveal-delay="0.1">
            <GlassCard className="h-full flex flex-col justify-between p-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                  Send a Direct Message
                </h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="John Doe" 
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 text-sm"
                      />
                      {errors.name && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.name}</span>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="john@example.com" 
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 text-sm"
                      />
                      {errors.email && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.email}</span>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Your Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Hi Amaan, I would love to collaborate on a hardware-AI project..." 
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 text-sm resize-none"
                    />
                    {errors.message && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.message}</span>}
                  </div>

                  <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending Message..." : "Send Message"} <Send size={16} />
                  </Button>
                </form>
              </div>

              {/* Social buttons bottom footer style */}
              <div className="pt-6 mt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Or connect via</span>
                
                <div className="flex items-center gap-3">
                  {socialData.filter(s => s.platform !== 'Phone' && s.platform !== 'Email').map((social) => (
                    <a 
                      key={social.platform} 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary" className="px-4 py-2 text-xs">
                        {social.platform} <ArrowUpRight size={12} />
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

        </div>
      </Container>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-gray-900 border border-emerald-500/30 text-white shadow-2xl flex items-center gap-3 w-80 font-sans"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <h4 className={`font-bold text-xs uppercase tracking-wider font-mono ${toastTitle.toLowerCase().includes('fail') || toastTitle.toLowerCase().includes('error') ? 'text-red-400' : 'text-emerald-400'}`}>
                {toastTitle}
              </h4>
              <p className="text-xs text-gray-300 mt-1">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
