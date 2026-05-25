"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'michaelryansia.dev@gmail.com', href: 'mailto:michaelryansia.dev@gmail.com' },
    { icon: FaPhone, label: 'Phone', value: '+639 9170 208', href: 'tel:+6399170208' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Metro Manila, Philippines', href: 'https://maps.google.com/?q=Malabon,+Metro+Manila,+Philippines' },
    { icon: FaLinkedin, label: 'LinkedIn', value: 'michael-ryan-sia', href: 'https://www.linkedin.com/in/michael-ryan-sia-a1a75028b/' },
    { icon: FaGithub, label: 'GitHub', value: 'Mr-S-26', href: 'https://github.com/Mr-S-26' },
  ];

  const inputClass = "w-full bg-transparent border-b-2 border-white/10 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors duration-300";

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="max-w-5xl mx-auto">
        {/* Large typographic CTA */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]">
            Let&apos;s build
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              something great
            </span>
          </h2>
        </motion.div>

        {/* Inline contact info row */}
        <motion.div
          className="flex flex-wrap gap-x-8 gap-y-3 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <a
                key={info.label}
                href={info.href}
                target={info.label === 'LinkedIn' || info.label === 'GitHub' ? '_blank' : undefined}
                rel={info.label === 'LinkedIn' || info.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
              >
                <Icon size={14} className="shrink-0" />
                <span>{info.value}</span>
              </a>
            );
          })}
        </motion.div>

        {/* Availability line */}
        <motion.div
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>
          <span className="text-green-400 text-sm font-medium">Available for hire</span>
          <span className="text-gray-600 text-sm">— Response within 24 hours</span>
        </motion.div>

        {/* Form with bottom-border inputs */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="relative">
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className={inputClass}
                placeholder="Your name"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 origin-center"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className={inputClass}
                placeholder="your@email.com"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 origin-center"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Subject */}
          <div className="relative">
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              required
              className={inputClass}
              placeholder="What's this about?"
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 origin-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === 'subject' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Message */}
          <div className="relative">
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              required
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="Tell me about your project..."
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 origin-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={formStatus === 'sending' || formStatus === 'sent'}
            className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            whileHover={{ scale: formStatus === 'idle' ? 1.05 : 1 }}
            whileTap={{ scale: formStatus === 'idle' ? 0.95 : 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400"
              initial={{ x: '100%' }}
              animate={{ x: formStatus === 'sending' ? '0%' : '100%' }}
              transition={{ duration: 1 }}
            />
            <span className="relative z-10">
              {formStatus === 'idle' && 'Send Message'}
              {formStatus === 'sending' && 'Sending...'}
              {formStatus === 'sent' && 'Message Sent!'}
              {formStatus === 'error' && 'Failed - Try Again'}
            </span>
          </motion.button>

          {formStatus === 'sent' && (
            <motion.p
              className="text-green-400 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you for reaching out! I&apos;ll get back to you soon.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;