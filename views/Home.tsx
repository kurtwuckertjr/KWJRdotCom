
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import LogoCarousel from '../components/LogoCarousel';
import { Play, ArrowRight, Calendar, Send, CheckCircle2, User, Mail, Phone, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]); 

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80; // account for navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const SectionFadeUp: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );

  const homeDisplayPosts = BLOG_POSTS.slice(0, 2);

  return (
    <main className="overflow-hidden">
      {/* SECTION 1: HERO (LIGHT) */}
      <section className="bg-white py-20 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          <SectionFadeUp className="lg:col-span-8 order-2 lg:order-1">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-3xl bg-black shadow-2xl group ring-1 ring-black/5 hover:ring-teal-500/20 transition-all duration-700">
              <iframe 
                src="https://www.youtube-nocookie.com/embed/YnupeHcCg8U?modestbranding=1&rel=0" 
                className="absolute top-0 left-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                title="Kurt Wuckert Jr. Introduction Video"
              />
            </div>
          </SectionFadeUp>
          <header className="lg:col-span-4 order-1 lg:order-2">
            <SectionFadeUp>
              <h2 aria-label="Kurt Wuckert Jr - Bitcoin Historian and Infrastructure Strategist" className="text-4xl md:text-5xl font-black mb-8 italic text-slate-900 leading-tight">
                Who is <br className="hidden lg:block" /> <span className="whitespace-nowrap">Kurt Wuckert Jr?</span>
              </h2>
              <p className="text-gray-500 mb-10 leading-relaxed text-lg font-light">
                Kurt bridges the gap between digital philosophy and hard-coded reality. With a journey started in the 2012 Bitcoin trenches, he has evolved into the world’s foremost Bitcoin Historian. Today, he leverages his cybersecurity foundation to build AI-forward apps and infrastructure that honors the original Satoshi vision. Kurt is the authoritative voice on Bitcoin's scalability and its ability to power the global AI revolution.
              </p>
              <div className="flex flex-col gap-6">
                <a 
                  href="#contact"
                  onClick={scrollToContact}
                  className="bg-teal-600 hover:bg-amber-500 text-white inline-flex items-center gap-4 px-12 py-8 rounded-full font-black text-2xl uppercase shadow-xl shadow-teal-600/20 hover:-translate-y-2 transition-all duration-300 group tracking-wider"
                >
                  Contact Kurt <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </SectionFadeUp>
          </header>
        </div>
      </section>

      {/* SECTION 2: HIDDEN HISTORY (DARK) */}
      <article id="bitcoin-historian" className="bg-slate-900 text-white py-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_rgba(13,148,136,0.3),rgba(245,158,11,0.05)_50%,transparent_100%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <SectionFadeUp className="z-10">
            <h2 className="text-6xl md:text-8xl font-black leading-none mb-12 tracking-tighter">
              Hijacking Bitcoin and Killing Satoshi: <br />
              <span className="italic text-teal-400 drop-shadow-[0_0_20px_rgba(20,184,166,0.5)]">The War for Bitcoin’s Soul.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-xl font-light">
              The history you’ve been told is a lie. While legacy financial interests waged a nasty civil war to hijack the protocol, the true power and people of Bitcoin were driven underground. Kurt Wuckert Jr. is the primary voice reclaiming that lost record. As the world’s leading Bitcoin Historian, he exposes the hidden truths that prove Satoshi’s original design was never meant to be digital gold. Bitcoin was built for unlimited on-chain scaling and the backbone of verifiable AI.
            </p>
            <a 
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-4 bg-teal-600 hover:bg-amber-500 text-white px-8 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-teal-600/20 hover:-translate-y-1 group"
            >
              Contact Kurt <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </SectionFadeUp>
          <motion.div 
            style={{ y: y1 }}
            className="relative h-[700px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(20,184,166,0.4)] perspective-1000 group ring-1 ring-white/10"
          >
            <img 
              src="https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/main/public/Kurtwithcoin.jpg" 
              alt="Kurt Wuckert Jr. - Bitcoin Historian reclaiming Satoshi Nakamoto’s original design after the Bitcoin Civil War." 
              className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 group-hover:brightness-110 transition-all duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <p className="text-[10px] font-bold tracking-widest uppercase text-teal-400">The Original Vision</p>
              <h4 className="text-lg font-bold mt-1">Immutable Evidence</h4>
            </div>
          </motion.div>
        </div>
      </article>

      <LogoCarousel />

      {/* SECTION 3: BITCOIN MEANS BUSINESS (LIGHT) */}
      <section id="bitcoin-business" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            style={{ y: y3 }}
            className="relative h-[700px] rounded-3xl overflow-hidden border border-gray-100 shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)] perspective-1000 group ring-1 ring-black/5"
          >
            <img 
              src="https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/main/public/KurtSpeaking.jpg" 
              alt="Kurt Wuckert Jr. - Co-founder of GorillaPool and Open Protocol Labs, speaking on Bitcoin Infrastructure and AI." 
              className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:brightness-110 transition-all duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-20 group-hover:opacity-10 transition-opacity" />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-black/5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <p className="text-[10px] font-bold tracking-widest uppercase text-teal-600">Entrepreneurship</p>
              <h4 className="text-lg font-bold mt-1 text-slate-900">Scaling Reality</h4>
            </div>
          </motion.div>
          <SectionFadeUp>
            <h2 className="text-5xl font-black mb-12 text-slate-900 tracking-tighter uppercase">Bitcoin Means Business</h2>
            <div className="space-y-8 text-xl text-gray-500 font-light leading-relaxed mb-12">
              <p>
                Kurt Wuckert Jr. has been a cornerstone of the Bitcoin ecosystem since 2012. As a co-founder of 
                <a href="https://gorillapool.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-bold mx-1 hover:underline">GorillaPool</a>, 
                <a href="https://openprotocollabs.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-bold mx-1 hover:underline">Open Protocol Labs</a>, and 
                <a href="https://bopen.io" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-bold mx-1 hover:underline">bOpen</a>, 
                Kurt builds at the intersection of open-source ethics and high-performance entrepreneurship.
              </p>
              <p>
                From GorillaPool’s progressive hash power hosting to Open Protocol’s node software and smart contracts, his work ensures Bitcoin serves as the immutable, AI-ready backbone for global infrastructure.
              </p>
            </div>
            <a 
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-4 bg-slate-900 hover:bg-amber-500 text-white px-8 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-black/5 hover:-translate-y-1 group"
            >
              Contact Kurt <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </SectionFadeUp>
        </div>
      </section>

      {/* SECTION 4: DIGITAL LUCIDITY ON SOCIAL MEDIA (DARK) */}
      <section id="digital-lucidity" className="py-40 bg-slate-950 text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-10 gap-16 lg:gap-24 items-center">
          <SectionFadeUp className="lg:col-span-4">
            <h2 className="text-5xl font-black mb-8 text-amber-400 uppercase tracking-tighter">Digital Lucidity on Social Media</h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed mb-12">
              Kurt Wuckert Jr. is a social media maven and a relentless voice for the public record. Whether debating in the digital trenches or hosting deep-dive livestreams, Kurt provides a lucid perspective on the intersection of Bitcoin, history, religion, politics, martial arts, and business. He is known for fearless public discourse and a commitment to digital lucidity.
            </p>
            <div className="space-y-10">
              <a 
                href="https://youtube.com/@kurtwuckertjr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-8 group"
              >
                <div className="w-16 h-16 bg-red-600/5 rounded-2xl flex items-center justify-center border border-red-600/10 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6 shadow-2xl">
                  <Play className="fill-current" size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-teal-400 transition-colors">@kurtwuckertjr</h4>
                  <p className="text-[9px] text-teal-400 font-bold tracking-[0.3em] uppercase mt-1">Main Video Feed</p>
                </div>
              </a>

              <a 
                href="https://x.com/kurtwuckertjr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-8 group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-slate-500 grayscale group-hover:grayscale-0 group-hover:text-white group-hover:bg-slate-800 transition-all duration-500 transform group-hover:scale-110 shadow-2xl">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-white transition-colors">@kurtwuckertjr</h4>
                  <p className="text-[9px] text-slate-400 font-bold tracking-[0.3em] uppercase mt-1">Main Social Feed</p>
                </div>
              </a>

              <a 
                href="https://youtube.com/@HistoryofBitcoinTV" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-8 group"
              >
                <div className="w-16 h-16 bg-amber-500/5 rounded-2xl flex items-center justify-center border border-amber-500/10 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 transform group-hover:rotate-6 shadow-2xl">
                  <Play className="fill-current" size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-amber-400 transition-colors">@HistoryofBitcoinTV</h4>
                  <p className="text-[9px] text-amber-400 font-bold tracking-widest uppercase mt-1">Bitcoin History Video Feed</p>
                </div>
              </a>

              <a 
                href="https://t.me/KWJRupdates" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-8 group"
              >
                <div className="w-16 h-16 bg-sky-500/5 rounded-2xl flex items-center justify-center border border-sky-500/10 text-sky-500 grayscale group-hover:grayscale-0 group-hover:text-white group-hover:bg-sky-500 transition-all duration-500 transform group-hover:-translate-y-1 group-hover:-rotate-12 shadow-2xl">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden="true">
                    <path d="M11.944 0C5.352 0 0 5.352 0 11.944c0 6.592 5.352 11.944 11.944 11.944 6.592 0 11.944-5.352 11.944-11.944C23.888 5.352 18.536 0 11.944 0zm5.832 8.328l-2.016 9.504c-.144.672-.552.816-1.104.504l-3.072-2.256-1.488 1.44c-.168.168-.288.288-.6.288l.216-3.144 5.712-5.16c.24-.216-.048-.336-.384-.12l-7.056 4.44-3.048-.96c-.648-.216-.672-.648.144-.96l11.904-4.584c.552-.216 1.032.12.888.984z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-sky-400 transition-colors">@KWJRupdates</h4>
                  <p className="text-[9px] text-sky-400 font-bold tracking-[0.3em] uppercase mt-1">Kurt's Breaking Newsfeed</p>
                </div>
              </a>
            </div>
          </SectionFadeUp>
          <SectionFadeUp className="lg:col-span-6">
             <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-[2.5rem] bg-black border border-white/10 shadow-3xl ring-1 ring-white/5 group hover:ring-amber-500/20 transition-all duration-700">
              <iframe 
                src="https://www.youtube-nocookie.com/embed/E6AuBt0gEUU?modestbranding=1" 
                className="absolute top-0 left-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                title="Satoshi's Vision Documentary Clip"
              />
            </div>
          </SectionFadeUp>
        </div>
      </section>

      {/* SECTION 5: AUTHORITATIVE INSIGHTS ON THE GLOBAL FRONTIER (LIGHT) */}
      <section id="insights" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase max-w-4xl">Authoritative Insights on the Global Frontier</h2>
            <Link to="/archive/all" className="text-2xl font-black border-b-4 border-teal-600 hover:border-amber-500 pb-2 uppercase tracking-[.4em] hover:text-amber-500 transition-all duration-300 mb-4 whitespace-nowrap">
              Full Archive
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-20">
            {homeDisplayPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer flex flex-col">
                <SectionFadeUp className="flex flex-col h-full">
                  <Link to={`/post/${post.id}`} className="flex flex-col h-full">
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl border border-gray-100 perspective-1000 group-hover:shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)] transition-all duration-500">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-[2s] ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex justify-between items-center mt-auto px-4">
                      <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                        <Calendar size={12} />
                        <span>{post.date}</span>
                      </div>
                      <span className="text-amber-500 group-hover:text-teal-600 font-black border-b-2 border-amber-500 group-hover:border-teal-600 pb-1 text-xs uppercase tracking-widest transition-all duration-300">
                        Read More
                      </span>
                    </div>
                  </Link>
                </SectionFadeUp>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: LIFE DISCIPLINE (DARK) */}
      <article id="life-discipline" className="py-40 bg-slate-900 text-white overflow-hidden relative z-0">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_rgba(20,184,166,0.3),transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            style={{ y: y2 }}
            className="relative h-[700px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(20,184,166,0.4)] perspective-1000 group ring-1 ring-white/10"
          >
            <img 
              src="https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/main/public/Kurtbjj.jpg" 
              alt="Kurt Wuckert Jr. - BJJ Black Belt teaching advanced Jiu-Jitsu." 
              className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:brightness-110 transition-all duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
            
            {/* Hover-activated Text Overlay */}
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <p className="text-[10px] font-bold tracking-widest uppercase text-teal-400">The Journey</p>
              <h4 className="text-lg font-bold mt-1 text-white">Training since 2010. Black Belt since 2023.</h4>
            </div>
          </motion.div>
          <SectionFadeUp>
            <h2 className="text-5xl font-black mb-12 text-teal-400 italic heading-font uppercase tracking-tighter">Life Discipline: The Intersection of BJJ and Business</h2>
            <div className="space-y-8 text-xl text-gray-400 font-light leading-relaxed mb-12">
              <p>Kurt Wuckert Jr. maintains a lifestyle of uncompromising readiness through a journey in Brazilian Jiu-Jitsu that spans over 15 years. Kurt is available for specialized Jiu-Jitsu seminars, where he brings a unique ability to explain complexity to both beginners and elite athletes.</p>
              <p className="text-teal-400 font-bold uppercase tracking-widest text-sm">Discipline compounds greatness.</p>
            </div>
            <a 
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-4 bg-teal-600 hover:bg-amber-500 text-white px-8 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-teal-600/20 hover:-translate-y-1 group"
            >
              Contact Kurt <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </SectionFadeUp>
        </div>
      </article>

      {/* FINAL CALL TO ACTION & CONTACT FORM */}
      <section id="contact" className="py-40 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(13,148,136,0.03)_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SectionFadeUp className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black mb-12 text-slate-900 uppercase tracking-tighter leading-none">Get in Touch <br />With Kurt.</h2>
            <p className="text-gray-400 uppercase tracking-[0.4em] font-bold text-xs">Direct Engagement for Strategy & History</p>
          </SectionFadeUp>

          <SectionFadeUp className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-8 md:p-16">
            {formStatus === 'sent' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 bg-teal-50 text-teal-600 rounded-full mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 uppercase mb-4">Transmission Received</h3>
                <p className="text-gray-500 font-light">The record has been updated. Kurt will review your message shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <User size={12} /> Full Name
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="Your Name"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <BookOpen size={12} /> Subject
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="Protocol Strategy"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Mail size={12} /> Email Address
                    </label>
                    <input 
                      required
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Phone size={12} /> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message Content</label>
                  <textarea 
                    required
                    maxLength={2000}
                    rows={6}
                    placeholder="Provide depth for your inquiry..."
                    className="w-full bg-slate-50 border-none rounded-3xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-700 leading-relaxed resize-none"
                  />
                  <p className="text-[9px] text-right text-slate-300 font-bold uppercase">Max 2000 characters</p>
                </div>

                <button 
                  disabled={formStatus === 'sending'}
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-amber-500 text-white py-8 rounded-2xl font-black uppercase tracking-[.3em] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-black/10 group disabled:opacity-50"
                >
                  {formStatus === 'sending' ? 'Transmitting...' : 'Send Message'}
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </SectionFadeUp>
        </div>
      </section>
    </main>
  );
};

export default Home;
