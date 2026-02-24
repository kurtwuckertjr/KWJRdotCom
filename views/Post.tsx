
import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { Category } from '../types';
import { GLOSSARY_TERMS } from '../glossaryData';
import { buildPostSchemaGraph } from '../schemaUtils';
import { ArrowLeft, Calendar, Share2, ShieldCheck, ArrowRight, Info, CheckCircle2, Clock, Tool, BookOpen, AlertCircle, HelpCircle, Compass, Dumbbell, Zap, Footprints, ShoppingBag, Wallet, Smartphone, HardDrive, Lock, Globe, Link2, Check } from 'lucide-react';

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const post = useMemo(() => BLOG_POSTS.find(p => p.id === id), [id]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Kurt Wuckert Jr.`;
    }
  }, [post]);

  const authorTitle = useMemo(() => {
    if (!post) return "";
    switch(post.category) {
      case Category.BITCOIN: return "Chief Bitcoin Historian";
      case Category.FITNESS: return "BJJ Black Belt & Competition Coach";
      case Category.POLITICS: return "Independent American";
      case Category.RELIGION: return "Protestant Christian";
      default: return "Founder, GorillaPool & Open Protocol Labs";
    }
  }, [post]);

  const postContent = useMemo(() => {
    if (id === 'what-is-private-key-bitcoin-guide') {
      return (
        <div className="space-y-12">
          <p>
            A private key is the most important secret in Bitcoin. It is a long random number that gives you control over the coins at certain addresses.
          </p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               Mastering the Analogy
            </h3>
            <p className="mb-6 font-medium">You can think of it like the master key to a safe deposit box:</p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>The Bitcoin address</strong> is like the box number that people send money to.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>The private key</strong> is the key that lets you unlock that box and move the funds.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why Does the Private Key Matter?
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                1. It proves ownership
              </h3>
              <p className="text-gray-600 leading-relaxed">
                When you send Bitcoin, your wallet uses your private key to create a digital signature. The network can verify that the signature is valid, which proves that you are allowed to spend those coins, without revealing the key itself.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                2. It must stay secret
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Anyone who gets your private key can spend your coins. There is no “password reset” and no bank to call. The math does not care whose name is on the account.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                3. It should be backed up
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Losing your private key means losing access to your Bitcoin forever. Seed phrases exist to help you back up the keys in human readable words.
              </p>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Info size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Modern Abstraction</h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Most modern wallets do not show you individual private keys. They generate many keys from a seed phrase behind the scenes. This keeps things simple for you, but the core reality is still the same. Your Bitcoin lives on the blockchain. Your private key is the power to move it.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'why-man-wear-mechanical-watch') {
      return (
        <div className="space-y-12">
          {/* Quick Answer Bump-out */}
          <div className="bg-slate-50 border-l-4 border-amber-500 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               Quick Answer
            </h3>
            <p className="text-lg leading-relaxed text-slate-700 italic">
              A mechanical watch is one of the last everyday objects that rejects planned obsolescence on principle. It does not ask for a charger, a software update, or a replacement cycle that turns your life into subscriptions. It asks for stewardship: wear it, service it, keep it, then hand it down. Even if your phone keeps better time, a mechanical watch keeps better faith with who you want to be.
            </p>
            <p className="mt-6 text-slate-500 font-light">
              I still cook in my grandmother's cast iron pan, and I still wear my grandfather's watch and use a few of the tools he kept in his toolbox. I will pass these things down to my children someday. Will anything else make it into the next decade?
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why This Matters
          </h2>
          
          <div className="space-y-6">
            <p>
              Most modern stuff is built to break. It is designed to age poorly, to annoy you, to become incompatible, then to get replaced before it ever earns a story. A mechanical watch is the opposite in every way. It is a tiny machine, engineered in centuries past by men who thought generationally about quality, that behaves like it expects a long relationship with you.
            </p>
            <p>
              That matters because men are shaped by what they commit to. In fact, you can tell a lot about a man by what he maintains, what he repairs, what he refuses to treat as disposable. A good watch is not just “style.” It is a daily vote for continuity, for taste, for the idea that your life is worth building into something that lasts longer than a trend.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            The Playbook
          </h2>

          <ul className="space-y-12">
            {[
              { title: "Decide what you want your watch to represent.", desc: "Not “luxury.” Not “flex.” Pick a word like steadiness, capability, restraint, or readiness. Your watch should feel like an extension of that word when you look down at it as you live with authenticity." },
              { title: "Choose the most useful genre first, then get romantic.", desc: "If you own one mechanical watch, buy a tough, versatile one you can wear with a T-shirt, a sport coat, and a wet weekend. Most men land on a field watch or a diver for a reason: competence in steel." },
              { title: "Buy your first mechanical watch like you buy your first serious tool.", desc: "Prioritize legibility, durability, and comfort. If it disappears on your wrist and shows up in your life, you picked well." },
              { title: "Start at $500 with humility, then plan for “generational.”", desc: "A $500 watch can be excellent because it will teach you about likes and dislikes, because the deeper point is learning to save for something you love instead of feeding the upgrade treadmill. Your first good watch teaches you how to buy the next one." },
              { title: "Treat it like an heirloom from day one.", desc: "You do not baby it, you steward it. Wear it, rinse it if it hits saltwater, keep it away from magnets, service it occasionally, and keep the box and papers if you have them. This is how objects become legacy." }
            ].map((step, i) => (
              <li key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-black text-lg group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    {i + 1}
                  </div>
                  {i < 4 && <div className="w-px h-full bg-slate-100 group-hover:bg-amber-100 mt-2 transition-colors" />}
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-gray-500 font-light leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            The Details That Separate Amateurs from Adults
          </h2>

          <div className="space-y-16">
            <section>
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-6">Mechanical, Automatic, Quartz: The Grown-Up Definitions</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h5 className="font-black text-slate-900 mb-2 uppercase text-sm">Mechanical (manual-wind)</h5>
                  <p className="text-xs text-slate-500 font-light italic">you wind it by hand. It is the most tactile option, and it turns maintenance into a quiet ritual.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h5 className="font-black text-slate-900 mb-2 uppercase text-sm">Automatic (self-winding)</h5>
                  <p className="text-xs text-slate-500 font-light italic">still mechanical, but your movement winds it. It is the easiest “daily driver” way into the mechanical world, and it's my recommendation for most people.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h5 className="font-black text-slate-900 mb-2 uppercase text-sm">Quartz</h5>
                  <p className="text-xs text-slate-500 font-light italic">battery-powered, accurate, cheap to maintain, and often tougher. Quartz is not “bad,” it is just less romantic, less heirloom-minded, and usually less repairable.</p>
                </div>
              </div>
              <p className="mt-8 text-slate-500 text-sm font-bold uppercase tracking-widest text-center">Adult move: don’t make this a morality contest. Make it a use-case decision. Then choose the version that fits your life and your values.</p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
                 <ShieldCheck size={120} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 relative z-10">Planned Obsolescence versus Stewardship</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Smartwatches are incredible products. They are also disposable by design. Battery degradation, software support, compatibility, and fashion cycles are not side effects, they are the business model, and you don't have to consume it!
              </p>
              <p className="text-gray-600 leading-relaxed relative z-10 mt-4">
                A mechanical watch, on the other hand, is built around the idea that parts can be cleaned, lubricated, adjusted, and replaced. It can live through generations because it was engineered to be serviced rather than tossed. That single detail changes the whole emotional math. You stop thinking like a consumer and start thinking like a caretaker.
              </p>
            </section>

            <section className="space-y-8">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6">The Rolex Submariner problem, and why it is still the reference point</h3>
              <p className="text-gray-600 leading-relaxed">
                The Submariner is not perfect for every man, but it is the best example of “one watch that works almost everywhere.” It is tough, readable, water-ready, and socially neutral. It is equally at home with jeans, a polo, or a suit that is not trying too hard. The basic design is timeless and legible, and the construction is built for duty without losing its premium, fashionable posture.
              </p>
              <p className="text-gray-600 leading-relaxed">
                A classic design can stay aesthetically relevant while the world changes around it. If you can afford it, great. If you cannot yet, that is also great. You now have a north star, which is how adults build collections and families build heirlooms.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6">What “generational” really means</h3>
              <p className="text-gray-500 mb-8 italic">A generational watch is not just expensive. It is:</p>
              <div className="grid md:grid-cols-2 gap-8">
                 {[
                   { label: "Serviceable", desc: "it can be maintained by competent watchmakers for decades." },
                   { label: "Timeless in design", desc: "it won’t look silly in 15 years." },
                   { label: "Durable in materials", desc: "solid case, decent water resistance, sapphire crystal on modern pieces is a plus." },
                   { label: "Story-friendly", desc: "it can accumulate scratches, dents and patina without becoming trash." }
                 ].map((attr, i) => (
                   <div key={i} className="flex gap-4 items-start">
                     <CheckCircle2 className="text-teal-600 shrink-0 mt-1" size={16} />
                     <div>
                       <span className="font-bold text-slate-900 uppercase text-xs tracking-widest block mb-1">{attr.label}</span>
                       <p className="text-sm text-gray-500 font-light">{attr.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
              <p className="mt-8 text-center text-slate-900 font-black uppercase tracking-tighter text-2xl">The real flex is not “I bought it.” The flex is “I kept it, and it kept me.”</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6">If you only buy one, buy the watch you will actually wear</h3>
              <p className="text-gray-600 leading-relaxed">
                The biggest mistake men make is buying “aspirational” and then never wearing it. If it is too precious to take to dinner, too fragile for travel, or too loud for your real life, it becomes a drawer ornament, and legacies aren't built in the closet.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Tough watches win because they reduce decision fatigue. You grab it, you go, you live. That is the whole point.
              </p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Common Mistakes
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
             {[
               "Buying a watch to impress strangers instead of to serve your life.",
               "Going too dressy as a first mechanical watch, then realizing it fits nothing you wear.",
               "Ignoring comfort: case thickness, lug-to-lug, bracelet taper, clasp fit. If it is annoying, you will stop wearing it.",
               "Falling for “complication cosplay.” A pile of features you never use does not make you interesting.",
               "Skipping water resistance. “Water resistant” is not “go swim whenever,” but you don't want to have to leave it home for a stroll in the rain.",
               "Treating servicing like a scam instead of basic ownership. Machines need maintenance.",
               "Buying the cheapest mechanical option and expecting luxury behavior. Entry-level is great, but it has limits.",
               "Not learning how to set it properly. Forcing a date change at the wrong time can cause damage on some watches.",
               "Magnetizing your watch with careless habits: tossing it on speakers, laptop closures, magnetic phone mounts.",
               "Chasing status too early: buying beyond your means, then resenting the watch you wanted to love."
             ].map((mistake, i) => (
               <div key={i} className="flex items-center gap-4 bg-red-50/30 p-4 rounded-2xl border border-red-100/50">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <span className="text-xs text-red-900/70 font-bold uppercase tracking-tight">{mistake}</span>
               </div>
             ))}
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            A Simple Starter Kit
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col h-full">
              <h4 className="text-amber-500 font-black uppercase tracking-widest text-sm mb-8 border-b border-white/10 pb-4">Beginner, $500 “adult watch” path</h4>
              <ul className="space-y-8 flex-grow">
                <li className="flex flex-col">
                  <span className="font-bold uppercase tracking-tight text-lg mb-1">Seiko</span>
                  <span className="text-xs text-gray-400 leading-relaxed italic">a tough, honest automatic that can take real life and still look like a watch, not a gadget.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold uppercase tracking-tight text-lg mb-1">Hamilton</span>
                  <span className="text-xs text-gray-400 leading-relaxed italic">especially a field watch, clean design, good heritage, easy to wear.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold uppercase tracking-tight text-lg mb-1">Tissot</span>
                  <span className="text-xs text-gray-400 leading-relaxed italic">strong value in Swiss entry-level, plenty of classic, office-friendly options.</span>
                </li>
              </ul>
            </div>
            <div className="bg-teal-600 text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col h-full">
              <h4 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-8 border-b border-black/10 pb-4">Save-up, “generational” path</h4>
              <ul className="space-y-8 flex-grow">
                <li className="flex flex-col">
                  <span className="font-bold uppercase tracking-tight text-lg mb-1">Longines or Tudor</span>
                  <span className="text-xs text-teal-100 leading-relaxed italic">the sweet spot where build quality and timeless design start feeling truly permanent.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold uppercase tracking-tight text-lg mb-1">Omega</span>
                  <span className="text-xs text-teal-100 leading-relaxed italic">iconic designs with real history, very “grown man” without being loud.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold uppercase tracking-tight text-lg mb-1">Rolex</span>
                  <span className="text-xs text-teal-100 leading-relaxed italic">the cultural default for a reason, the ultimate one-watch answer for most men.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-10 rounded-[2.5rem] mt-12">
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-6">Audemars Piguet, Vacheron Constantin, Patek Philippe and beyond?</h4>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              I'm not an heir to a trust fund, and if you are, you probably don't need my advice about wrist-wear or legacy planning. If you make it big in sports or Hollywood, you probably didn't do it because of my advice either. There are incredible watches in the world, but as you climb over $20,000 for an entry price, you start trading ruggedness for elegance and fitness for finishing. These are high aspirational brands, and they're truly great, but they also push you out of the orbit where anyone outside of the 1% will ever tread.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            FAQ
          </h2>

          <div className="space-y-4">
            {[
              { q: "1) Is a mechanical watch “worth it” if my phone keeps better time?", a: "Yes, because this is not an accuracy contest. It is an object lesson in permanence, care, and taste. Your phone is a tool, your watch can be a companion." },
              { q: "2) Automatic or manual-wind for my first one?", a: "Automatic is usually the easiest daily driver. Manual-wind is more ritual, more intimacy, and more responsibility. If you like habits, manual can be surprisingly grounding." },
              { q: "3) Do I need a watch winder?", a: "Not for most people. If your watch has a simple time-and-date setup, you can just reset it when needed. Winders make more sense for complicated watches you rotate often." },
              { q: "4) How often do I need to service it?", a: "Think in years, not months. Many modern watches can go a long time if they are running well, but servicing is part of true ownership. Budget for it like you budget for tires on a good car." },
              { q: "5) Will a mechanical watch last my whole life?", a: "Yes, if it is well-made and you maintain it. The entire point is that it can be repaired. That is what makes it different from most modern electronics." },
              { q: "6) What style should a guy buy if he only owns one watch?", a: "A field watch or a diver. They are practical, legible, and versatile with most wardrobes. Dress watches are beautiful, but they are not as forgiving, and they won't dominate your wrist time." },
              { q: "7) Is it irresponsible to spend real money on a watch?", a: "It depends on your finances and your intent. If it replaces a cycle of impulse buying and becomes a long-term piece you maintain, it can be a disciplined purchase. If it is debt-fueled image management, it will feel heavy on your wrist for the wrong reasons." },
              { q: "8) What’s the point of a “timeless design”?", a: "Timeless design keeps you from craving novelty. It looks right in a decade because it never tried to be trendy in the first place. That is how a watch becomes an heirloom instead of a timestamp of a phase." },
              { q: "9) Can a $500 watch be “heirloom quality”?", a: "It can be heirloom-loved, which is more important. Some affordable watches will not be worth servicing forever on pure economics, but families do not pass down spreadsheets. They pass down stories. A Seiko movement can be replaced for under $100, and that's a great thing!" },
              { q: "10) What’s the best way to buy a better watch if I cannot afford it yet?", a: "Pick a target model, set a monthly transfer, work hard, invest diligently, and stop browsing as entertainment. Desire with discipline is how men build taste without wrecking their budget." },
              { q: "11) Should I buy new or used?", a: "Used can be a smart way to get more watch for the money, especially from reputable dealers. New gives you warranty and the cleanest ownership history. Either way, buy from someone you trust." },
              { q: "12) What makes a watch feel “grown up” on the wrist?", a: "Legibility, restraint, and fit. A grown-up watch does not beg for attention; it quietly performs. It feels like it belongs on you, not like it is borrowing your identity." }
            ].map((faq, i) => (
              <details key={i} className="group border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <summary className="flex justify-between items-center p-6 cursor-pointer bg-white group-hover:bg-slate-50 transition-colors list-none">
                  <span className="font-black uppercase tracking-tight text-slate-900 text-sm md:text-base pr-4">{faq.q}</span>
                  <HelpCircle size={18} className="text-teal-600 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-8 pt-0 bg-slate-50 text-gray-500 font-light leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] group-hover:bg-amber-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-amber-500 text-slate-900 p-4 rounded-2xl shadow-lg shrink-0">
                <Compass size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-8 text-amber-500">This Week’s Moves</h4>
                <div className="grid md:grid-cols-2 gap-8 text-gray-300 text-sm font-light">
                   <div className="space-y-4">
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={14} /> <span>Pick one word you want your style to communicate, then choose gear that reinforces it.</span></p>
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={14} /> <span>Measure your wrist and write it down, then stop guessing about case sizes. 36-42mm will fit most men.</span></p>
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={14} /> <span>Try on a field watch and a diver, notice which one feels like your real life.</span></p>
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={14} /> <span>Start a watch fund, even if it is small, and treat it like a respect-for-the-future practice.</span></p>
                   </div>
                   <div className="space-y-4">
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={14} /> <span>Wear your current watch daily for seven days, learn what annoys you and what you love.</span></p>
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={14} /> <span>Clean your watch and bracelet gently, then notice how maintenance changes your relationship with it.</span></p>
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={14} /> <span>Research one “north star” watch you would hand to your son or daughter.</span></p>
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={14} /> <span>Choose one reliable seller or dealer, and ignore the chaos of the rest of the market.</span></p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'adjustable-dumbbells-full-body-plan') {
      return (
        <div className="space-y-12">
          <p className="text-xs text-gray-400 italic mb-8 border-l-2 border-slate-100 pl-4">
            Affiliate Disclosure: This article may contain affiliate links. If you use them, Kurt may earn a small commission at no extra cost to you.
          </p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               Quick Summary
            </h3>
            <p className="text-lg leading-relaxed text-slate-700">
              If you have adjustable dumbbells, you can build an athletic, strong physique with a simple full-body plan. Full-body training scales because missing one workout does not delete a body part for the week. Work mostly in <strong>5 to 20 reps</strong>, push sets close to failure, and add weight over time.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Who Is This Plan Engineered For?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p>
                I have done plenty of “perfect programs.” The ones that work best are the ones I can do between meetings, travel, and family life. Dumbbells (especially adjustable ones!) win because they remove excuses.
              </p>
              <ul className="space-y-4">
                {[
                  "Busy dads training at home",
                  "Beginners who want a plan that will not break them",
                  "Lifters who miss workouts sometimes and want forgiveness built in",
                  "Anyone who wants strength plus mobility",
                  "Guys who want a repeatable system"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-teal-600 shrink-0" size={16} />
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <Zap className="absolute top-4 right-4 text-teal-400 opacity-20 group-hover:scale-110 transition-transform" size={80} />
               <h4 className="text-xl font-black uppercase mb-4 text-teal-400">The Efficiency Paradox</h4>
               <p className="text-gray-400 text-sm font-light leading-relaxed">
                 You don't need a warehouse of iron to build a sovereign body. You need high-intent movements performed with absolute technical integrity.
               </p>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            What Is the Core Protocol?
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
             {[
               { icon: <Clock />, label: "Frequency", val: "2-4X per Week" },
               { icon: <Dumbbell />, label: "Patterns", val: "Big 6 Patterns" },
               { icon: <Zap />, label: "Volume", val: "1-2 Hard Sets" },
               { icon: <Compass />, label: "Progression", val: "Weekly Additions" },
               { icon: <Footprints />, label: "Floor", val: "5k Steps Daily" }
             ].map((item, i) => (
               <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl text-center shadow-sm">
                  <div className="text-teal-600 mb-4 flex justify-center">{item.icon}</div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                  <p className="text-xs font-bold text-slate-900 uppercase">{item.val}</p>
               </div>
             ))}
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            What Details Actually Matter?
          </h2>

          <p>
            The best program is the one you can run on your worst week. Dumbbells are not “lesser.” They are practical. They train stability, they are joint-friendly, and they let you move naturally.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
               <h4 className="text-xl font-black uppercase text-slate-900 mb-8 border-b border-slate-200 pb-4">Workout A</h4>
               <ul className="space-y-6">
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">Goblet / Front Squat</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">1-2 Sets | 5-20 Reps</span>
                 </li>
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">DB Bench / Floor Press</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">1-2 Sets | 5-20 Reps</span>
                 </li>
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">One-Arm Row</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">1-2 Sets | 5-20 Reps</span>
                 </li>
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">Romanian Deadlift</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">1-2 Sets | 5-20 Reps</span>
                 </li>
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">Farmer Carry</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">2-4 Short Walks</span>
                 </li>
               </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
               <h4 className="text-xl font-black uppercase text-slate-900 mb-8 border-b border-slate-200 pb-4">Workout B</h4>
               <ul className="space-y-6">
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">Split Squat (Each Leg)</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">1-2 Sets | 8-20 Reps</span>
                 </li>
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">Overhead Press</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">1-2 Sets | 5-20 Reps</span>
                 </li>
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">Chest-Supported Row</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">1-2 Sets | 5-20 Reps</span>
                 </li>
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">Hip Hinge Variation</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">1-2 Sets | 5-20 Reps</span>
                 </li>
                 <li className="flex justify-between items-start">
                   <span className="text-sm font-bold text-slate-700 uppercase">Plank / Dead Bug</span>
                   <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">2-3 Rounds</span>
                 </li>
               </ul>
            </div>
          </div>

          <div className="bg-teal-600 text-white p-12 rounded-[3rem] shadow-2xl mt-12">
            <h4 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3"><Zap /> Progression Rule</h4>
            <p className="text-lg font-light leading-relaxed">
              Add reps until you hit the top of your range (20). Then add weight and drop reps back down to the floor (5). This keeps you honest and keeps your joints safe.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            What Are the Common Mistakes?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {[
               "Changing exercises every week.",
               "Training too light (toning).",
               "Training too heavy (ego form).",
               "Doing only arms and chest.",
               "Ignoring carries and core.",
               "Skipping the walking floor."
             ].map((mistake, i) => (
               <div key={i} className="flex items-center gap-4 bg-red-50/30 p-4 rounded-2xl border border-red-100/50">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <span className="text-[10px] text-red-900/70 font-bold uppercase tracking-tight">{mistake}</span>
               </div>
             ))}
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            What Do I Actually Do in Real Life?
          </h2>

          <div className="space-y-6">
            <p>
              I keep dumbbells and a bench in my office (next to my Speediance Gym Monster 2) because it removes friction. If I have a 20 minute gap, I can do a full session. If I only have 8 minutes, I do two movements hard and move on. That sounds “too simple,” but it is exactly why it works.
            </p>
            <p>
              My recovery floor is walking. Start at <strong>5,000 steps per day</strong>, then earn your way up. That keeps me leaner without stealing recovery from lifting.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            What Gear and Tools Do I Use for Success?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
             <a href="https://amzn.to/4shv1kz" target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-teal-100 transition-all group">
                <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors"><ShoppingBag size={20}/></div>
                <h5 className="font-black uppercase text-sm mb-2">REP Adjustable DBs</h5>
                <p className="text-xs text-gray-400 font-light">The standard for home strength infrastructure.</p>
             </a>
             <a href="https://amzn.to/48RJhHC" target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-teal-100 transition-all group">
                <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors"><ShoppingBag size={20}/></div>
                <h5 className="font-black uppercase text-sm mb-2">REP Weight Bench</h5>
                <p className="text-xs text-gray-400 font-light">Commercial grade stability for the home office.</p>
             </a>
             <a href="https://join.whoop.com/8258E885" target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-teal-100 transition-all group">
                <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors"><ShoppingBag size={20}/></div>
                <h5 className="font-black uppercase text-sm mb-2">Whoop 5.0</h5>
                <p className="text-xs text-gray-400 font-light">How I track sleep, strain, and recovery without guessing.</p>
             </a>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            FAQ
          </h2>

          <div className="space-y-4">
            {[
              { q: "Is full-body better than push pull legs?", a: "Not “better,” just more forgiving for busy people. If you miss a day on full-body, you still trained everything recently." },
              { q: "How many days per week should I lift?", a: "Start with 2 to 3. If recovery and schedule allow, add a fourth day, or switch to 'Heavy Duty,' train to BRUTAL failure, and only train 2X per week." },
              { q: "Do I need heavy weights to grow?", a: "You need progressive overload and hard sets. Dumbbells can take you very far if you train close to failure." }
            ].map((faq, i) => (
              <details key={i} className="group border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <summary className="flex justify-between items-center p-6 cursor-pointer bg-white group-hover:bg-slate-50 transition-colors list-none">
                  <span className="font-black uppercase tracking-tight text-slate-900">{faq.q}</span>
                  <HelpCircle size={18} className="text-teal-600 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-8 pt-0 bg-slate-50 text-gray-500 font-light leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Compass size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-8 text-teal-400">Action Steps for This Week</h4>
                <div className="grid md:grid-cols-2 gap-8 text-gray-300 text-sm font-light">
                   <div className="space-y-4">
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-teal-400 shrink-0 mt-0.5" size={14} /> <span>Schedule 3 full-body sessions.</span></p>
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-teal-400 shrink-0 mt-0.5" size={14} /> <span>Pick 6 movements and repeat them for 6 weeks.</span></p>
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-teal-400 shrink-0 mt-0.5" size={14} /> <span>Track reps and weight, progress weekly.</span></p>
                   </div>
                   <div className="space-y-4">
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-teal-400 shrink-0 mt-0.5" size={14} /> <span>Walk 5,000 steps per day as a baseline.</span></p>
                     <p className="flex items-start gap-3"><CheckCircle2 className="text-teal-400 shrink-0 mt-0.5" size={14} /> <span>Add 1 rep per set before adding weight.</span></p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-a-bitcoin-wallet-guide') {
      return (
        <div className="space-y-12">
          <p>
            A Bitcoin wallet is a tool that lets you hold, send, and receive Bitcoin. It does not literally “store” coins inside it. Instead, it stores the private keys that control your Bitcoin on the blockchain.
          </p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               Digital Custody Summary
            </h3>
            <p className="text-lg leading-relaxed text-slate-700 italic">
              Your wallet is your interface to the Bitcoin network. It acts as the guardian of your digital master keys, hiding the immense complexity of cryptographic signing behind simple actions like “Send” and “Receive.” Without a wallet you control, you are merely a visitor in the Bitcoin economy, not a sovereign participant.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why Do You Need a Bitcoin Wallet?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <ShieldCheck />, 
                title: "1. Control of funds", 
                desc: "Your wallet contains the keys that prove you are the owner of specific coins. If you control the wallet, you control the coins. If someone else holds the wallet or keys for you, they control the coins." 
              },
              { 
                icon: <ArrowRight />, 
                title: "2. Sending and receiving", 
                desc: "A wallet makes it easy to generate addresses, scan QR codes, and create transactions. It hides the technical details and lets you work with simple actions like “Send” and “Receive”." 
              },
              { 
                icon: <Lock />, 
                title: "3. Security", 
                desc: "Good wallets help you back up your keys, use a seed phrase, encrypt your data, and sometimes use hardware devices so your keys never touch the internet." 
              }
            ].map((reason, i) => (
              <section key={i} className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
                <div className="bg-teal-50 text-teal-600 p-4 rounded-2xl mb-6">{reason.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-4">{reason.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{reason.desc}</p>
              </section>
            ))}
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            What Types of Wallets Exist?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: <Smartphone />, 
                title: "Mobile and Desktop Wallets", 
                desc: "Apps you install on your phone or computer. Convenient for daily transactions but rely on the security of your OS." 
              },
              { 
                icon: <HardDrive />, 
                title: "Hardware Wallets", 
                desc: "Small physical devices that keep keys offline. The gold standard for securing significant amounts of Bitcoin." 
              },
              { 
                icon: <BookOpen />, 
                title: "Paper or “Cold” Wallets", 
                desc: "Keys or seed phrases stored on paper or in metal, entirely offline. Immune to remote hacking, but vulnerable to physical loss." 
              },
              { 
                icon: <Globe />, 
                title: "Custodial Wallets", 
                desc: "Exchanges or services that hold your keys for you. Simple to use but carries third-party risk—you don't truly own the coins." 
              }
            ].map((type, i) => (
              <div key={i} className="flex gap-6 items-start bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                <div className="bg-slate-900 text-teal-400 p-3 rounded-xl shrink-0">{type.icon}</div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase text-sm tracking-widest mb-2">{type.title}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Sovereign Choice</h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  For serious use, non-custodial wallets, where you hold your own keys, are usually best. Your wallet is your interface to Bitcoin, so choosing and backing it up properly is one of the most important steps for a new user. Remember the mantra of the historian: <span className="text-white italic">"Not your keys, not your coins."</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-beginners-guide') {
      return (
        <div className="space-y-12">
          <p>
            Bitcoin is a digital form of money that runs on a public network instead of a bank. You can send it to anyone, anywhere in the world, without asking permission from a company or government.
          </p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
              <BookOpen size={24} className="text-teal-600" /> The Shared Spreadsheet
            </h3>
            <p className="text-gray-600 leading-relaxed">
              At the core of Bitcoin is a public ledger called the <strong>blockchain</strong>. Think of the blockchain as a shared spreadsheet that lists every transaction ever made. Thousands of computers around the world keep copies of this spreadsheet and agree on what it contains.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            How Bitcoin Works
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Bitcoin works with three basic parts:
          </p>

          {/* Numbered step timeline */}
          <div className="relative pl-12 space-y-16 before:absolute before:left-[1.15rem] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-teal-600 before:to-teal-100">
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">1</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Addresses &amp; Wallets</h3>
              <p className="text-gray-600 leading-relaxed">
                You receive Bitcoin to a digital address, similar to an email address. A <strong>wallet</strong> is software or hardware that manages your addresses and the keys that control them.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">2</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Private Keys &amp; Signing</h3>
              <p className="text-gray-600 leading-relaxed">
                Each address is controlled by a <strong>private key</strong>, which is a secret number. When you send Bitcoin, your wallet uses your private key to create a digital signature. This proves that you are allowed to spend those coins, without revealing your key.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">3</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Nodes &amp; Miners</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Nodes</strong> are computers running Bitcoin software that check every transaction to be sure it follows the rules. <strong>Miners</strong> group valid transactions into blocks, compete using computing power (proof of work) and add blocks to the chain. As a reward, they earn new coins and transaction fees.
              </p>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why It Matters
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                <Globe size={20} /> Decentralized
              </h3>
              <p className="text-gray-600 leading-relaxed">
                There is no single point of failure. No company or government controls the network.
              </p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                <ShieldCheck size={20} /> Rules, Not Rulers
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The rules are enforced by software and economic incentives, not by a central authority.
              </p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                <Lock size={20} /> Permissionless
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Anyone can send or receive Bitcoin without asking permission from a bank or institution.
              </p>
            </section>
          </div>

          {/* Dark summary box */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 my-16">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <Info size={24} className="text-amber-400" /> The Bottom Line
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Bitcoin is digital money that runs on a shared public ledger maintained by thousands of computers worldwide. It combines addresses, private keys, and a network of nodes and miners to create a permissionless, decentralized financial system — no banks required.
            </p>
          </div>
        </div>
      );
    }

    // NEW BITCOIN BASICS CURRICULUM ARTICLES (4-23)

    if (id === 'what-is-utxo-bitcoin') {
      return (
        <div className="space-y-12">
          <p>Bitcoin tracks coins using something called UTXOs, which stands for Unspent Transaction Outputs. It sounds technical, but the idea is simple.</p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               The Envelope Analogy
            </h3>
            <p className="mb-6 font-medium">Every Bitcoin transaction has inputs and outputs that work like envelopes holding coins:</p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Inputs</strong> are old envelopes of bitcoin you are opening to pay.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Outputs</strong> are new envelopes the transaction creates that hold the amounts for the recipient and your change.</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-600 leading-relaxed">A UTXO is one of those outputs that has not been spent yet. It is like a labeled "coin" on the ledger with:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">A specific amount of Bitcoin</span>
            </li>
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">A locking script (rules) that say who can spend it later</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Your wallet's balance is the sum of all the UTXO envelopes it can unlock.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            How a UTXO Gets Created and Spent
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Someone sends you 0.5 bitcoin</h4>
                <p className="text-gray-500 font-light leading-relaxed">That creates a new UTXO of 0.5 bitcoin that belongs to you.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">You spend 0.3 bitcoin</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4">Your wallet will use that 0.5 bitcoin UTXO as an input, then create two new outputs:</p>
                <ul className="space-y-3">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">One output of <strong>0.3 bitcoin</strong> to the receiver</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">One "change" output of <strong>0.2 bitcoin</strong> back to a new address you control</span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">The old envelope is gone</h4>
                <p className="text-gray-500 font-light leading-relaxed">The original 0.5 bitcoin UTXO is spent. The envelope that held it does not exist anymore. There are two new UTXOs: one of 0.3 bitcoin and one of 0.2 bitcoin.</p>
              </div>
            </li>
          </ol>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why the UTXO Model Matters
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Simple Verification
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A node only needs to check that the inputs are valid unspent outputs. This makes the entire verification process straightforward and efficient.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Massive Parallelism
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Because each UTXO is independent, transactions that do not share inputs can be validated simultaneously. This supports high parallelism and scaling.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Fine-Grained Control
              </h3>
              <p className="text-gray-600 leading-relaxed">
                UTXOs give fine-grained control over individual coins, which helps with privacy and scripting. Each output can carry its own conditions for spending.
              </p>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Info size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">You Never Manage UTXOs Directly</h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Your wallet handles UTXO selection for you behind the scenes. But understanding the envelope model gives you a much clearer picture of how Bitcoin really works, and why it scales differently than account-based systems like Ethereum.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-address') {
      return (
        <div className="space-y-12">
          <p>A Bitcoin address is a string of characters that people use to send you Bitcoin. It is similar to a bank account number, but it is generated by you, not by a bank.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            How an Address Is Created
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Private Key Generation</h4>
                <p className="text-gray-500 font-light leading-relaxed">Your wallet creates a private key, a random secret number.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Public Key Derivation</h4>
                <p className="text-gray-500 font-light leading-relaxed">From that private key, it calculates a public key using one-way math. You cannot reverse the process to find the private key.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Hash and Encode</h4>
                <p className="text-gray-500 font-light leading-relaxed">It then runs the public key through a set of hashing and encoding steps to produce a shorter, user-friendly address.</p>
              </div>
            </li>
          </ol>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               The Important Points
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Anyone can see</strong> the address and send coins to it.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Only the holder</strong> of the matching private key can spend those coins.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>You can create</strong> as many addresses as you like.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Creating an Address in Practice
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                1. Install a Wallet
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Install a reputable Bitcoin wallet on your phone or computer.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                2. Back Up Your Seed Phrase
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Follow the setup process and write down your seed phrase backup. This is your master recovery key.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                3. Tap "Receive"
              </h3>
              <p className="text-gray-600 leading-relaxed">
                In the app, tap "Receive" and it will show you a QR code and an address string. That is a fresh address ready to use.
              </p>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">Best Practices</h4>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                    <span className="text-gray-300 leading-relaxed text-lg"><strong className="text-white">Use a new address for each payment</strong> when possible. This improves privacy, since observers cannot easily link all your activity together.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                    <span className="text-gray-300 leading-relaxed text-lg"><strong className="text-white">Share your address carefully.</strong> It is safe for people to know an address, but scammers sometimes use lookalike addresses, so always copy and paste from your wallet directly.</span>
                  </li>
                </ul>
                <p className="text-gray-400 mt-6 font-light">The address is your public-facing contact point. The private key and seed phrase stay hidden and safe.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-blockchain') {
      return (
        <div className="space-y-12">
          <p>The Bitcoin blockchain is a special type of database that records every transaction ever made with Bitcoin. It is called a "block chain" because it is literally a chain of blocks, and each block contains a batch of transactions.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            How It Works
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Transactions Are Created</h4>
                <p className="text-gray-500 font-light leading-relaxed">People send Bitcoin to each other. These transactions are broadcast to the network.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Miners Gather Transactions into Blocks</h4>
                <p className="text-gray-500 font-light leading-relaxed">Miners collect many transactions into a candidate block. They then compete to solve a proof-of-work puzzle.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">A New Block Is Added</h4>
                <p className="text-gray-500 font-light leading-relaxed">The first miner to solve the puzzle broadcasts its block. Other nodes verify the transactions and the proof of work. If everything is valid, they attach the new block to the end of the chain.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">4</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Each Block Links to the Previous One</h4>
                <p className="text-gray-500 font-light leading-relaxed">Every block includes a reference (a hash) to the block before it. This creates a chain that goes all the way back to the first block, called the genesis block.</p>
              </div>
            </li>
          </ol>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why It Matters
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Immutability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Once a block is deeply buried under many more blocks, changing it would require enormous computing power. This makes history very hard to rewrite.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Transparency
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Anyone can download the blockchain and verify that the rules are being followed. No permission is required.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Coordination
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All honest nodes converge on the same chain, with the most proof of work, as the valid history.
              </p>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <BookOpen size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Big Picture</h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  You can think of the blockchain as a shared, append-only log that the whole world can inspect and verify. Bitcoin is the system of incentives and rules built around that log.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'how-do-bitcoin-transactions-work') {
      return (
        <div className="space-y-12">
          <p>A Bitcoin transaction is the process of moving coins from one set of addresses to another. Here is the high-level flow.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Step by Step
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">You Create the Transaction</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4">Using your wallet, you:</p>
                <ul className="space-y-3">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">Choose how much Bitcoin you want to send.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">Paste or scan the recipient's address.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">The wallet selects one or more UTXOs you control as inputs and creates outputs that pay the recipient and return any change back to you.</span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Your Wallet Signs It</h4>
                <p className="text-gray-500 font-light leading-relaxed">The wallet uses your private key to create digital signatures on the inputs. These signatures prove that you are allowed to spend those specific UTXOs.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">The Transaction Is Broadcast</h4>
                <p className="text-gray-500 font-light leading-relaxed">Your wallet sends the signed transaction to the Bitcoin network. It is relayed from node to node and reaches miners and other participants.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">4</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Nodes Validate It</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4">Each node checks:</p>
                <ul className="space-y-3">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">The signatures are valid.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">The inputs are real, unspent outputs on the blockchain.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">The transaction follows the consensus rules (no negative values, proper fees, correct scripts, and so on).</span>
                  </li>
                </ul>
                <p className="text-gray-500 font-light leading-relaxed mt-4">If it passes, they hold it in their memory pool (mempool) as a candidate for inclusion in a block.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">5</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Miners Include It in a Block</h4>
                <p className="text-gray-500 font-light leading-relaxed">Miners pick transactions from the mempool, gather them into a block, and work on the proof-of-work puzzle. When a miner finds a valid proof, it broadcasts the block.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">6</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">The Block Is Accepted</h4>
                <p className="text-gray-500 font-light leading-relaxed">Other nodes verify the block and add it to their copy of the blockchain. Your transaction is now confirmed.</p>
              </div>
            </li>
          </ol>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               Confirmations
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>One confirmation</strong> means it is in the latest block.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>More confirmations</strong> mean the block is deeper in the chain and harder to reverse.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Zap size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">In Practice</h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  On a well-scaled chain like BSV, this all happens quickly and can support large volumes of transactions. For the user, it usually feels like sending money with an online payment app, but the rules are enforced by software and miners, not a central company.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-mining') {
      return (
        <div className="space-y-12">
          <p>Bitcoin mining is the process of adding new blocks of transactions to the blockchain and securing the network. It is called "mining" because miners also earn newly created coins as a reward, similar to mining gold.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            What Miners Actually Do
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Collect Transactions</h4>
                <p className="text-gray-500 font-light leading-relaxed">Miners gather valid transactions from the network and assemble them into a candidate block.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Do Proof of Work</h4>
                <p className="text-gray-500 font-light leading-relaxed">To add their block, they must solve a cryptographic puzzle. This involves trying many different inputs until they find a hash that meets the current difficulty target. This work is done by specialized hardware called ASICs.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Broadcast the Block</h4>
                <p className="text-gray-500 font-light leading-relaxed">When a miner finds a valid block, they send it to the network. Other nodes verify the proof of work and the transactions.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">4</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Earn Rewards</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4">If the block is accepted into the chain, the miner receives:</p>
                <ul className="space-y-3">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">The <strong>block subsidy</strong> (new coins created by the protocol).</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">The <strong>transaction fees</strong> paid by users.</span>
                  </li>
                </ul>
              </div>
            </li>
          </ol>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why Mining Matters
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Proof of work makes it very expensive to rewrite history. An attacker would need huge amounts of energy and hardware to outcompete honest miners.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Decentralization
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Many independent miners compete. No single party is supposed to control the network.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Ordering and Finality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Miners decide the order of transactions in blocks, giving the system a clear timeline and eventual finality.
              </p>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <HardDrive size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">Mining as an Industry</h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  On scalable networks, mining also becomes a competitive data processing industry, not just a game of speculation. Miners are rewarded for providing real services to users.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-node') {
      return (
        <div className="space-y-12">
          <p>A Bitcoin node is a computer that runs Bitcoin software and participates in the network by verifying and relaying data. Not every node mines, but every node that follows the rules helps keep the system honest.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            What Nodes Do
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Maintain a Copy of the Blockchain</h4>
                <p className="text-gray-500 font-light leading-relaxed">Nodes download and store the current blockchain or at least the parts they need. This lets them independently verify transactions and blocks.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Validate Transactions</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4">When nodes receive a transaction, they check:</p>
                <ul className="space-y-3">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">Are the inputs valid unspent outputs?</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">Are the signatures correct?</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-500 font-light">Do the amounts add up?</span>
                  </li>
                </ul>
                <p className="text-gray-500 font-light leading-relaxed mt-4">If a transaction breaks the rules, they reject it and do not relay it further.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Validate Blocks</h4>
                <p className="text-gray-500 font-light leading-relaxed">When a miner broadcasts a block, nodes verify the proof of work and every transaction inside. Only if the block is valid do they attach it to their chain and pass it on.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">4</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Relay Data</h4>
                <p className="text-gray-500 font-light leading-relaxed">Nodes relay valid transactions and blocks to their peers. This helps the network stay connected and up to date.</p>
              </div>
            </li>
          </ol>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Types of Nodes
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Full Nodes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Store and validate the whole chain. They can independently compute the current state without trusting external sources.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Pruned or Simplified Nodes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Store only part of the data, or use proofs from full nodes, to reduce storage needs.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Mining Nodes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Full nodes that also construct blocks and compete in proof of work. These are the engines of the network.
              </p>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Globe size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">Verify, Don't Trust</h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Running a node gives you direct insight into the network and lets you verify that the rules are being followed, rather than trusting someone else's copy of Bitcoin.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-seed-phrase-bitcoin') {
      return (
        <div className="space-y-12">
          <p>A seed phrase (also called a recovery phrase or mnemonic) is a list of 12, 18, or 24 words that backs up your Bitcoin wallet. From this list of words, your wallet can regenerate all the private keys and addresses it uses.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            How It Works
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Random Number Generation</h4>
                <p className="text-gray-500 font-light leading-relaxed">When you create a new wallet, it generates a large random number.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Word Conversion</h4>
                <p className="text-gray-500 font-light leading-relaxed">This number is converted into a list of words from a fixed dictionary.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Your Master Backup</h4>
                <p className="text-gray-500 font-light leading-relaxed">That list is your seed phrase. All your wallet keys can be recreated from it.</p>
              </div>
            </li>
          </ol>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               Why It Is Important
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Recovery power:</strong> If you lose your phone or hardware wallet, you can install the same wallet app on a new device, enter the seed phrase, and recover all your coins.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Equal danger:</strong> If someone else gets your seed phrase, they can also recover your coins. It is as powerful as your private keys.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Safe Backup Tips
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                1. Write It Down by Hand
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Do not store it in plain text on your computer, email, or cloud storage. Those can be hacked.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                2. Keep Multiple Copies in Safe Places
              </h3>
              <p className="text-gray-600 leading-relaxed">
                For example, one in a home safe and one in a safety deposit box. Consider using metal backup plates to resist fire and water.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                3. Never Share It with Anyone
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No support agent, exchange, or friend should ever ask for your seed phrase. If someone asks, it is a scam.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                4. Test Recovery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                If possible, practice recovering a small test wallet so you are comfortable with the process.
              </p>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Lock size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Master Key</h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  The seed phrase is the ultimate backup. Treat it like the master key to your entire Bitcoin life.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-are-bitcoin-fees') {
      return (
        <div className="space-y-12">
          <p>Every Bitcoin transaction includes a fee paid to miners. The fee is the difference between the total inputs and the total outputs in the transaction. Miners collect these fees as part of their reward for including your transaction in a block.</p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               Why Fees Exist
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Miner compensation:</strong> Miners spend real money on hardware and electricity.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Long-term sustainability:</strong> The protocol subsidizes them with new coins for a while, but over time fees become more important.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Spam prevention:</strong> Fees make it costly to flood the network with useless transactions.</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-600 leading-relaxed">Why fees behave differently on BSV vs BTC comes down to block size and capacity.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            BTC vs BSV Fee Economics
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-500 uppercase tracking-widest mb-6">On BTC</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="text-gray-600">The block size is intentionally limited to a small capacity.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="text-gray-600">During busy periods, there is more demand for block space than there is supply.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="text-gray-600">Users compete for limited space by bidding higher fees.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="text-gray-600">This creates volatile fees, sometimes very high, and confirmation delays for low-fee transactions.</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6">On BSV</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">The protocol allows very large blocks and focuses on scaling on-chain.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Miners can process a much higher volume of transactions.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Because capacity is abundant, there is less competition for space.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Fees can be kept very low and stable, and miners make money on volume rather than high fees per transaction.</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Zap size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Highway Analogy</h4>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                    <span className="text-gray-300 leading-relaxed text-lg"><strong className="text-white">BTC</strong> behaves like a crowded highway with tolls that spike during rush hour.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                    <span className="text-gray-300 leading-relaxed text-lg"><strong className="text-white">BSV</strong> behaves like a multi-lane highway that keeps adding lanes so everyday tolls stay low and predictable.</span>
                  </li>
                </ul>
                <p className="text-gray-400 mt-6 font-light">For regular users and businesses, stable and low fees make it easier to plan and build real-world applications.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'on-chain-vs-off-chain-bitcoin') {
      return (
        <div className="space-y-12">
          <p>In Bitcoin, on-chain and off-chain describe where a transaction or piece of data is recorded and enforced.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            On-Chain
          </h2>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               What On-Chain Means
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Recorded directly:</strong> The transaction is recorded directly on the blockchain.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Validated by consensus:</strong> It is validated by nodes and miners according to the consensus rules.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Permanent history:</strong> It becomes part of the permanent public history once confirmed.</span>
              </li>
            </ul>
          </div>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Examples of On-Chain Activity
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Sending coins from one address to another in a standard transaction.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Storing data in transaction outputs.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Smart contract style scripts executed by the Bitcoin protocol.</span>
                </li>
              </ul>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Off-Chain
          </h2>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               What Off-Chain Means
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Tracked elsewhere:</strong> The transfer or agreement is tracked somewhere else, not directly on the blockchain.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Third-party enforcement:</strong> It might rely on a company, a side network, or a legal contract to enforce who owns what.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Optional settlement:</strong> Final settlement may or may not eventually touch the main chain.</span>
              </li>
            </ul>
          </div>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Examples of Off-Chain Activity
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Balances inside a centralized exchange. They keep an internal ledger and settle on chain in batches.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Payment channels and second layer networks that update balances off-chain and settle later.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">IOUs, vouchers, or wrapped tokens that represent Bitcoin but are not themselves UTXOs on the chain.</span>
                </li>
              </ul>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Key Differences
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Comparing On-Chain vs Off-Chain
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600"><strong>Trust:</strong> On-chain transactions rely on network rules and proof of work. Off-chain solutions often add trust in a company, gateway, or protocol.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600"><strong>Finality:</strong> On-chain settlements, once deeply confirmed, are hard to reverse. Off-chain records can change based on policies or agreements.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600"><strong>Scalability:</strong> Off-chain methods can sometimes offer speed and convenience, but they trade away some of the transparency and trust minimization that on-chain gives you.</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Globe size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Bottom Line</h4>
                <p className="text-gray-300 leading-relaxed text-lg">In a well designed system, on-chain is the foundation, and off-chain tools are used where they make sense, without undermining the security and clarity of the underlying chain.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-fork') {
      return (
        <div className="space-y-12">
          <p>A Bitcoin fork is a change in the rules or the history of the Bitcoin network. The word "fork" comes from the idea of a path splitting into two directions.</p>
          <p>There are two main types: hard forks and soft forks.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Soft Fork
          </h2>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               The Analogy
            </h3>
            <p className="text-gray-600 leading-relaxed">Think of a soft fork as a club that decides to enforce a stricter dress code. The building is the same, but the rules for entry change.</p>
          </div>

          <p className="text-gray-600 leading-relaxed">A soft fork is a change that tightens the rules but remains compatible with older software, at least in theory.</p>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                How Soft Forks Work
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Nodes that upgrade follow the new stricter rules.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Nodes that do not upgrade still see the new blocks as valid, because the new rules are a subset of the old rules.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">In practice, social and economic pressure matters. Even soft forks can cause friction if many people disagree.</span>
                </li>
              </ul>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Hard Fork
          </h2>

          <p className="text-gray-600 leading-relaxed">A hard fork is a change that relaxes or changes the rules in a way that is not compatible with older software.</p>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                How Hard Forks Work
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Upgraded nodes accept new types of blocks or transactions.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Old nodes reject those blocks as invalid.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">If both groups keep mining and transacting, the blockchain can split into two separate networks with a shared history up to the fork point.</span>
                </li>
              </ul>
            </section>
          </div>

          <p className="text-gray-600 leading-relaxed">In that case, users can end up with coins on both chains, and the market decides which fork has more value and support.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Forks in Bitcoin History
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                What Forks Have Been Used For
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Change block size limits.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Modify script rules.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Create new projects with different philosophies.</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Compass size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">Why Forks Matter</h4>
                <p className="text-gray-300 leading-relaxed text-lg">They are important because they reveal governance in practice. Who gets to change the rules, under what conditions, and with what consequences.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-halving') {
      return (
        <div className="space-y-12">
          <p>The Bitcoin halving is an event that happens automatically in the protocol every 210,000 blocks, roughly every four years. At each halving, the block subsidy that miners receive is cut in half.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            The Halving Schedule
          </h2>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               At the Beginning
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>50 BTC per block:</strong> The first miners earned 50 new bitcoins per block.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Successive halvings:</strong> Then it dropped to 25, then 12.5, then 6.25, and so on.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Trending to zero:</strong> Over time, the subsidy trends toward zero.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why It Exists
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Controlled Supply</h4>
                <p className="text-gray-500 font-light leading-relaxed">Bitcoin has a maximum supply limit of 21 million coins. The halving schedule is how the protocol distributes new coins over time without a central authority.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Monetary Policy</h4>
                <p className="text-gray-500 font-light leading-relaxed">The halving creates a predictable, transparent monetary policy. Everyone can see the schedule and no one can secretly print extra coins.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Incentives for Miners</h4>
                <p className="text-gray-500 font-light leading-relaxed">Early on, high subsidies attract miners to secure the network. As the subsidy shrinks, transaction fees are expected to become a larger part of miner revenue, especially on high throughput chains.</p>
              </div>
            </li>
          </ol>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why People Talk About It
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Market & Mining Impact
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">On speculative networks, halvings often affect price expectations, since new coin supply slows down.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">For miners, halvings are serious business. They immediately cut block reward income. Miners with inefficient hardware or expensive electricity may no longer be profitable unless they rely on transaction fees or better scaling strategies.</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Clock size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Bottom Line</h4>
                <p className="text-gray-300 leading-relaxed text-lg">In short, the Bitcoin halving is a built in schedule that reduces new coin creation over time. It keeps the supply scarce, gives the system credibility, and forces miners and businesses to plan for a world where transaction volume matters more than inflation rewards.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'how-to-get-bitcoin') {
      return (
        <div className="space-y-12">
          <p>There are three main ways to get Bitcoin: buy it, earn it, or mine it.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Three Ways to Get Bitcoin
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Buying Bitcoin</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4">This is the most common route for beginners.</p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-600"><strong>Exchanges:</strong> Sign up with a reputable exchange, complete any required identity checks, deposit money, then buy Bitcoin. Withdraw to a self custody wallet if you want full control.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-600"><strong>Broker apps:</strong> Some fintech apps let you buy small amounts of Bitcoin from your phone. Make sure you understand whether you can withdraw to your own wallet.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-600"><strong>Bitcoin ATMs and peers:</strong> In some places, machines or peer to peer platforms let you buy for cash.</span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Earning Bitcoin</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4">Instead of spending fiat to buy Bitcoin, you can accept it as payment.</p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-600"><strong>Freelance or salary:</strong> Offer your services or products and accept Bitcoin.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-600"><strong>Tips and rewards:</strong> Some sites, social platforms, or communities let people tip you in Bitcoin.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-600"><strong>Business invoices:</strong> Companies can integrate Bitcoin payments for customers, especially useful on low fee chains.</span>
                  </li>
                </ul>
                <p className="text-gray-500 font-light leading-relaxed mt-4">Earning is often the most natural way to get Bitcoin because you are directly trading your time or products for coins.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Mining Bitcoin</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4">Mining is the most technical option.</p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-600">You buy specialized mining hardware and secure low cost power.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-600">You point your machines at a mining pool or run your own setup.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-gray-600">You earn a share of the block rewards and fees for the work your machines do.</span>
                  </li>
                </ul>
                <p className="text-gray-500 font-light leading-relaxed mt-4">For most individuals today, mining is a serious business decision, not a hobby with a laptop. It involves real capital, long term planning, and understanding of the specific chain's economics.</p>
              </div>
            </li>
          </ol>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <ShoppingBag size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Key Step</h4>
                <p className="text-gray-300 leading-relaxed text-lg">No matter which method you choose, the key step is the same. Learn to use a reliable wallet, back up your seed phrase, and move coins into self custody if you want true control.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-self-custody-bitcoin') {
      return (
        <div className="space-y-12">
          <p>Self custody means you personally control the private keys that secure your Bitcoin. No company, exchange, or third party stands between you and your coins.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Self Custody vs Custodial
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Your Own Wallet
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">You can send funds at any time, without asking permission.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Your balance is not an IOU in someone else's database.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">You are not exposed to their solvency, ethics, or security practices.</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Exchange or Custodial Service
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span className="text-gray-600">You do not hold the keys.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span className="text-gray-600">You have a claim against the company, not direct control of coins on the chain.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span className="text-gray-600">If they are hacked, go bankrupt, or freeze your account, your access can disappear.</span>
                </li>
              </ul>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Your Responsibilities
          </h2>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">You Must Handle Backups</h4>
                <p className="text-gray-500 font-light leading-relaxed">That means safely storing seed phrases and making sure trusted heirs or processes exist in case something happens to you.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">You Must Avoid Scams and Malware</h4>
                <p className="text-gray-500 font-light leading-relaxed">Never type your seed phrase into random websites or apps. Be cautious with links and downloads, especially around crypto.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">You Must Choose Good Tools</h4>
                <p className="text-gray-500 font-light leading-relaxed">Use reputable wallets and, for larger amounts, consider hardware wallets or multisig setups.</p>
              </div>
            </li>
          </ol>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why It Is Worth It
          </h2>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               The Case for Self Custody
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Direct ownership:</strong> Bitcoin was designed for direct ownership.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Original purpose:</strong> Self custody aligns with the original purpose, which is to reduce reliance on middlemen and give individuals control over their own money.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Lower risk:</strong> It lowers counterparty risk, which is the risk that someone else fails you.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Lock size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Bottom Line</h4>
                <p className="text-gray-300 leading-relaxed text-lg">Exchanges can be useful for trading and conversions, but for long term holding and serious amounts, self custody is usually the safer and more principled option.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'bitcoin-vs-ethereum') {
      return (
        <div className="space-y-12">
          <p>Bitcoin and Ethereum are both large blockchain networks, but they have different designs, goals, and trade offs.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Purpose
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Bitcoin
              </h3>
              <p className="text-gray-600 leading-relaxed">Bitcoin began as peer to peer electronic cash, focused on sound money, secure settlement, and a stable protocol that businesses can build on.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Ethereum
              </h3>
              <p className="text-gray-600 leading-relaxed">Ethereum was created as a "world computer" for running general purpose smart contracts and decentralized applications.</p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Data Model
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                UTXO Model
              </h3>
              <p className="text-gray-600 leading-relaxed">Bitcoin uses a UTXO model. Coins are discrete outputs that can be combined and split. This model is simple to verify and scales well for parallel processing.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Account Model
              </h3>
              <p className="text-gray-600 leading-relaxed">Ethereum uses an account based model. Each account has a changing balance and state. This can be convenient for complex contracts but is more state heavy.</p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Protocol Philosophy
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Stability First
              </h3>
              <p className="text-gray-600 leading-relaxed">Bitcoin places a lot of importance on a long term stable base protocol and external legal and commercial frameworks on top.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Experimentation First
              </h3>
              <p className="text-gray-600 leading-relaxed">Ethereum has changed its core rules several times, including shifting from proof of work to proof of stake, which places more emphasis on protocol level governance and experimentation.</p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Smart Contracts
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Bitcoin Script
              </h3>
              <p className="text-gray-600 leading-relaxed">Bitcoin supports scripting and smart contracts through a stack based language and op codes. On scalable implementations, very complex logic can be expressed on chain.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                EVM & Solidity
              </h3>
              <p className="text-gray-600 leading-relaxed">Ethereum was designed from the start for general purpose smart contracts using the Ethereum Virtual Machine and languages like Solidity, so most dApps and tokens today are on Ethereum or similar platforms.</p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Consensus & Security
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Proof of Work
              </h3>
              <p className="text-gray-600 leading-relaxed">Classic Bitcoin uses proof of work, where security comes from miners committing energy and hardware.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Proof of Stake
              </h3>
              <p className="text-gray-600 leading-relaxed">Ethereum started with proof of work and later moved to proof of stake, where security comes from locked coins and protocol rules about slashing.</p>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Compass size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Bottom Line</h4>
                <p className="text-gray-300 leading-relaxed text-lg">In short, Bitcoin focuses on being a durable, high integrity foundation for money and data, while Ethereum focuses more on being a flexible platform for programmable assets and applications. Both approaches have benefits and trade offs that users and developers should understand.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-proof-of-work') {
      return (
        <div className="space-y-12">
          <p>Proof of Work (PoW) is the mechanism Bitcoin uses to secure the blockchain and choose which version of history is valid.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            How It Works
          </h2>

          <p className="text-gray-600 leading-relaxed">In PoW, miners compete to solve a mathematical puzzle:</p>

          <ol className="space-y-12">
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">1</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Collect Transactions</h4>
                <p className="text-gray-500 font-light leading-relaxed">A miner collects transactions and builds a candidate block.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">2</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Hash the Block Header</h4>
                <p className="text-gray-500 font-light leading-relaxed">They repeatedly hash the block header with different inputs (called nonces) until the resulting hash is below a target value set by the network.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">3</div>
                <div className="w-px h-full bg-slate-100 group-hover:bg-teal-100 mt-2 transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Expend Real Work</h4>
                <p className="text-gray-500 font-light leading-relaxed">Finding such a hash requires huge numbers of attempts, which means real computational work and energy use.</p>
              </div>
            </li>
            <li className="flex gap-6 group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-black text-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">4</div>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-slate-900 mb-2">Broadcast & Verify</h4>
                <p className="text-gray-500 font-light leading-relaxed">When a miner finds a valid solution, it broadcasts the block. Other nodes can quickly verify that the work is correct.</p>
              </div>
            </li>
          </ol>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            How PoW Secures Bitcoin
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Hard to Rewrite History
              </h3>
              <p className="text-gray-600 leading-relaxed">To change a past block, an attacker would need to redo the proof of work for that block and all blocks after it, then catch up and overtake the honest chain. If honest miners control most of the total computing power, this is extremely expensive.</p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Objective Chain Selection
              </h3>
              <p className="text-gray-600 leading-relaxed">Nodes do not rely on trust or voting. They simply follow the chain with the most cumulative proof of work, which is the one that required the most energy and computation to produce.</p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Economic Alignment
              </h3>
              <p className="text-gray-600 leading-relaxed">Miners invest heavily in hardware and electricity. Their incentives are to follow the rules and protect the value of the system, because they are rewarded in Bitcoin and fees.</p>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Zap size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Bottom Line</h4>
                <p className="text-gray-300 leading-relaxed text-lg">Proof of work is sometimes criticized for energy use, but its purpose is clear. It turns energy and computation into a wall that protects the history of transactions. This makes Bitcoin resistant to cheap manipulation and central control.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'bitcoin-privacy-vs-anonymity') {
      return (
        <div className="space-y-12">
          <p>Bitcoin is often called anonymous, but a more accurate word is pseudonymous.</p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               On the Blockchain
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Pseudonymous addresses:</strong> You are represented by addresses, not your real name.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Transparent movements:</strong> Anyone can see the movement of coins between addresses.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>Permanent record:</strong> The ledger is public and permanent.</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-6">So, you have pseudonyms (addresses), not complete anonymity.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Privacy vs Anonymity
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Where Privacy Comes From
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Using new addresses for different payments makes it harder to link all your activity.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Careful wallet practices and some on-chain techniques can improve privacy.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">On chains with rich scripting and data capabilities, tools can be built to help users manage privacy better.</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Where Anonymity Breaks Down
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Exchanges and many services use identity checks. If you withdraw to a personal wallet, they know which address you withdrew to.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Blockchain analysis companies can track patterns and cluster addresses, especially when users reuse addresses or interact with known services.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span className="text-gray-600">If you publicly post an address, anyone can see its history.</span>
                </li>
              </ul>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            The Reality
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                What Bitcoin Actually Offers
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Bitcoin offers more privacy than a typical bank account that you hand over to every merchant.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">It does not offer perfect anonymity like cash handed over in person.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Good practices can improve privacy, but careless behavior can expose a lot of information.</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Right Framing</h4>
                <p className="text-gray-300 leading-relaxed text-lg">For most people, the right framing is this. Bitcoin gives you transparency and control by default, and privacy is something you can actively manage. It is not a magic invisibility cloak, but with smart usage, it can give you a healthier balance between openness and personal financial privacy than many legacy systems.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'what-is-satoshi') {
      return (
        <div className="space-y-12">
          <p>A satoshi, often shortened to "sat," is the smallest unit of bitcoin. It is named in honor of Bitcoin's creator, Satoshi Nakamoto. One bitcoin is divided into 100 million satoshis, so one sat equals 0.00000001 bitcoin. In dollar terms, the value of a satoshi depends entirely on the current market price of bitcoin. As bitcoin's price rises and the total supply approaches its fixed limit of 21 million coins, people will naturally use smaller units like sats for everyday amounts. It is a lot easier to say "I paid 50,000 sats" than "I paid 0.0005 bitcoin."</p>
          <p>Satoshis make it possible to divide bitcoin very finely, which is important for small payments and micro-transactions. They also give users a simple way to talk about value without juggling long strings of decimal places.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Why Satoshis Matter
          </h2>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               Quick Math
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">Because one sat is one hundred millionth of a bitcoin, you can represent very small amounts without breaking the unit further. For example, if one bitcoin is worth 10,000 dollars, then:</p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>1 satoshi</strong> is worth 0.0001 dollars (one ten-thousandth of a dollar).</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>A 100 dollar purchase</strong> would be 1,000,000 satoshis at that price level.</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-6">You can think in whole numbers instead of long decimals, which is easier for most people to read and discuss.</p>
            <p className="text-gray-600 leading-relaxed mt-4">The need for satoshis arises from the same basic reason we have cents under a dollar or pennies under a pound. As the base unit becomes more valuable, smaller denominations become necessary for everyday use.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Naming & the Double-Spend Problem
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                The Origin of the Name
              </h3>
              <p className="text-gray-600 leading-relaxed">As was stated above, the name "satoshi" pays tribute to the pseudonymous author of the 2008 white paper "Bitcoin: A Peer-to-Peer Electronic Cash System." That paper laid out how to solve a core problem for digital money: double spending.</p>
              <p className="text-gray-600 leading-relaxed mt-4">With physical cash, you cannot hand the same bill to two different people at the same time. The note is either in your wallet or someone else's. In digital systems, a balance is just a number in a database. Without strong rules, someone could try to spend the same unit twice, like writing two 100 dollar checks on a 100 dollar account and hoping both are honored by the merchants; one of which will be the victim of theft of the goods that are not actually paid for.</p>
              <p className="text-gray-600 leading-relaxed mt-4">Bitcoin prevents this behavior by using a public ledger (the blockchain) and a consensus process. Every valid satoshi transfer is recorded in this shared history. Nodes verify that each satoshi is only spent once, so a user cannot reuse the same unit for multiple transactions. This protection applies whether you are dealing in whole bitcoins or tiny satoshi amounts.</p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Using Satoshis in Practice
          </h2>

          <div className="grid gap-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                How You Use Sats
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">In the real world, satoshis are what you actually move around when you send or receive bitcoin. You can:</p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Deposit traditional currency into an exchange.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Convert that balance into bitcoin, which the system tracks internally as satoshis.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Spend sats at merchants or services that accept bitcoin.</span>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-6">Not every merchant takes bitcoin, so it is wise to check who accepts what before you plan to pay in sats.</p>
              <p className="text-gray-600 leading-relaxed mt-4">Even though sats are not a separate currency, you can always talk about prices in satoshis instead of fractions of a bitcoin. Many wallets and interfaces let you toggle between Bitcoin and sats display so you can choose whichever unit feels clearer.</p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Satoshis & Other Denominations
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Bitcoin (Satoshis)
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">Different blockchains choose different unit structures. Bitcoin has one base asset, and its smallest unit is the satoshi.</p>
              <p className="text-gray-600 leading-relaxed">To convert between sats and dollars in simple terms:</p>
              <ul className="space-y-4 mt-4">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">Take the current bitcoin price and divide by 100,000,000 to get the value of one sat in dollars.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="text-gray-600">To see how many sats equal a certain dollar amount, divide the dollar amount by the dollar value of one sat.</span>
                </li>
              </ul>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-3">
                Ethereum (Wei)
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">Ethereum, for example, uses a different layout. Its smallest unit is called wei:</p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span className="text-gray-600">1 wei = 0.000000000000000001 ether (one quintillionth of an ether)</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span className="text-gray-600">1 gwei = 1,000,000,000 wei</span>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">Both systems let you express very small pieces of the main asset. The exact names and scales differ, so one satoshi has a different monetary value than one gwei, and both move up and down in price as Bitcoin and Ethereum markets change.</p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            How Much Is One Satoshi?
          </h2>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
               Price Examples
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">The value of a satoshi is always tied to bitcoin's price. Examples:</p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span>If 1 Bitcoin = <strong>10,000 dollars</strong>, then 1 sat = 0.0001 dollars.</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span>If 1 Bitcoin = <strong>50,000 dollars</strong>, then 1 sat = 0.0005 dollars.</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-6">No matter what the market does, the relationship inside the protocol stays fixed:</p>
            <ul className="space-y-6 mt-4">
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>1 bitcoin</strong> = 100,000,000 satoshis</span>
              </li>
              <li className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                <span><strong>1 satoshi</strong> = 0.00000001 bitcoin</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-6">Only the exchange rate between bitcoin and your local currency changes.</p>
          </div>

          <div className="bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] group-hover:bg-teal-500/10 transition-all duration-1000" />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shrink-0">
                <Info size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6 text-teal-400">The Bottom Line</h4>
                <p className="text-gray-300 leading-relaxed text-lg">A satoshi is the smallest unit of bitcoin, and there are 100 million of them in every coin. The unit is named after Satoshi Nakamoto, the inventor of Bitcoin. Talking in sats makes it easier to handle real-world amounts without a sea of zeros after the decimal point. As bitcoin's price and usage grow, sats are likely to become the main way people quote prices, pay for goods and services, and think about everyday transactions in the Bitcoin economy.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === 'bitcoin-glossary') {
      const letters = [...new Set(GLOSSARY_TERMS.map(t => t.letter))];
      return (
        <div className="space-y-12">
          <p className="text-gray-600 leading-relaxed">A comprehensive glossary of Bitcoin and blockchain terminology. Use this reference to navigate the language of the ecosystem.</p>
          {letters.map(letter => (
            <div key={letter}>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
                {letter}
              </h2>
              {GLOSSARY_TERMS.filter(t => t.letter === letter).map(t => (
                <div key={t.term} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
                  <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">{t.term}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.definition}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (id === 'what-is-bitcoin-script') {
      return (
        <div className="space-y-12">
          <p>Bitcoin Script is a simple but powerful programming language that enables smart contracts. It powers everything from multi-signature wallets to complex conditional payments.</p>
          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6">Bitcoin\'s Programming Language</h3>
            <p className="text-lg leading-relaxed text-slate-700 italic">Bitcoin Script is intentionally simple. It is not Turing-complete (no loops), which prevents infinite computation. This design choice trades flexibility for security and predictability.</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">How Script Works</h2>
          <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm"><h3 className="font-bold text-slate-900 uppercase tracking-widest mb-6">Stack-Based Execution</h3><p className="text-gray-600 mb-6 font-light">Bitcoin Script uses a stack machine. Operations push and pop values from a stack. The final result determines if a transaction is valid or invalid.</p><div className="bg-slate-50 p-6 rounded-2xl border border-slate-200"><p className="text-sm text-slate-600 font-light italic">Example: OP_DUP (duplicate top item) → OP_HASH160 (hash twice) → [expected hash] → OP_EQUAL (check equality)</p></div></section>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Common Use Cases</h2>
          <div className="space-y-6">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm"><h3 className="font-bold text-slate-900 uppercase tracking-widest mb-4">Multi-Signature Wallets</h3><p className="text-gray-600 font-light">Require multiple private keys to spend. Example: 2-of-3 means two of three keys can authorize spending.</p></section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm"><h3 className="font-bold text-slate-900 uppercase tracking-widest mb-4">Timelocks</h3><p className="text-gray-600 font-light">Coins can be locked until a specific time or block height. Used for vesting schedules or delayed payments.</p></section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm"><h3 className="font-bold text-slate-900 uppercase tracking-widest mb-4">Hash Locks</h3><p className="text-gray-600 font-light">Coins are locked by a hash puzzle. Whoever knows the preimage can unlock them. Enables atomic swaps.</p></section>
          </div>
          <div className="bg-teal-600 text-white rounded-[3rem] p-12 shadow-2xl"><h4 className="text-2xl font-black uppercase tracking-tight mb-6">Simple but Powerful</h4><p className="text-lg leading-relaxed font-light">Bitcoin Script proves that you don\'t need Turing-completeness to enable sophisticated contracts. Simplicity is a feature, not a bug.</p></div>
        </div>
      );
    }

    if (id === 'christian-response-involuntary-taxation') {
      return (
        <div className="space-y-12">

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Thesis
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            You open your paycheck, and it feels like someone else got there first. Not a donation, not a cheerful &quot;community investment,&quot; but a compulsory extraction with penalties (up to and including the threat of imprisonment) attached if you resist.
          </p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
              <BookOpen size={24} className="text-teal-600" /> Thesis
            </h3>
            <p className="text-gray-600 leading-relaxed">
              My thesis is simple: taxes are not automatically evil, but involuntary taxation is never morally neutral, because it is always a claim about authority, ownership, and lordship. Christians should refuse the state&apos;s messianic pretensions, obey lawful demands without surrendering conscience, and work, patiently and courageously, to rebuild a culture where civil power is limited, local, and accountable to God.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            The Problem
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            The modern world wants you to treat taxation like weather. It just happens, and serious people do not ask moral questions about clouds. That posture is not &quot;neutral,&quot; it is a confession. It assumes the state has a standing right to take first, redefine the source of property rights, and then reframe their taking as a social virtue. It assumes sovereignty is located in &quot;the public,&quot; interpreted by administrators and enforced by the threat of violence.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6">The Secular Assumption</h3>
              <p className="text-gray-600 leading-relaxed">
                Underneath that is a rival religion. Secular humanism does not merely reject God, it replaces Him with managerial bureaucracy as a form of social salvation. The state becomes the provider of meaning, safety, equity, identity, health, education, and &quot;justice,&quot; as defined by Hegelian whims of shifting committees. When people fear chaos more than God, they beg for control, and they call that control &quot;compassion.&quot;
              </p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500">
              <h3 className="text-xl font-bold text-amber-500 uppercase tracking-widest mb-6">The Christian Cannot Accept This</h3>
              <p className="text-gray-600 leading-relaxed">
                The Christian cannot accept that framing, because it quietly makes the magistrate into a proxy god. Even when the goals sound noble, or even if the outcomes are indeed &quot;good,&quot; the method catechizes the soul: you are ultimately owned, and the highest moral act is compliance with the system.
              </p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            The Christian Response
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Start with lordship. The Nicene Creed begins where sanity begins, with God as &quot;Maker of heaven and earth,&quot; and Jesus Christ as the one &quot;through whom all things were made.&quot; If God made it, God owns it. That one premise destabilizes the entire modern moral mythology of the state.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            From there, everything else lines up.
          </p>

          <div className="relative pl-12 space-y-16 before:absolute before:left-[1.15rem] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-teal-600 before:to-teal-100">
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">1</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">There Is No Neutrality in Anything</h3>
              <p className="text-gray-600 leading-relaxed">
                First, there is no neutrality in anything. The state will claim ultimate jurisdiction as broadly as it can. Either it is a minister under God with limited tasks, or it will act like a rival sovereignty that defines good and evil by decree. Involuntary taxation sits right at that fault line because it is enforced worship through tithe. Not in a liturgical sense, but in a covenantal sense. It declares whose law is first and final, whose claims cannot be refused, and whose penalties are ultimate.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">2</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Coercion Is a Tool God Gives, but Only Within Bounds</h3>
              <p className="text-gray-600 leading-relaxed">
                Second, coercion is a tool God gives, but only within bounds. Scripture describes the magistrate as bearing &quot;the sword&quot; to punish evil and praise good, not as a total-life shepherd. The Westminster Confession speaks of liberty of conscience as freedom from &quot;the doctrines and commandments of men&quot; when they are imposed as religious necessity. That matters because a modern tax regime rarely stays in the lane of justice. It funds godless missions, immoral visions, and anti-Christian educational liturgies that often run directly against the Word of God in rhetoric, and always run against it in structure.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">3</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Consent and Jurisdiction Are Moral Categories</h3>
              <p className="text-gray-600 leading-relaxed">
                Third, consent and jurisdiction are not side issues. They are moral categories. A tax that is truly voluntary functions like a subscription or insurance, you can opt in, opt out, and choose alternatives. In a free society, spending should be constrained by consent, because taxation is downstream of spending. When spending becomes unbounded, taxation becomes predatory, and when direct taxation becomes politically painful, the temptation rises to use hidden taxes like currency debasement (often called &quot;inflation&quot; in modern politics.) Economists even describe government revenue from money creation as &quot;seigniorage,&quot; often discussed as an &quot;inflation tax,&quot; because it erodes purchasing power without a line item on your pay stub.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">4</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Obedience Is Not Worship</h3>
              <p className="text-gray-600 leading-relaxed">
                Finally, Christians must not confuse obedience with worship. There is a difference between paying what is demanded and baptizing the demand as righteous. If the state is overreaching, Christians can comply without surrendering the moral vocabulary that calls overreach what it is.
              </p>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Scripture as the Foundation
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            I will stick to the ESV.
          </p>

          <div className="grid gap-8 my-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">Romans 13:1 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">&quot;Let every person be subject to the governing authorities. For there is no authority except from God...&quot;</p>
              <p className="text-gray-600 leading-relaxed">Paul&apos;s point is not that every demand is righteous, but that authority itself is not self-generated. Magistrates are derivative. That means they are accountable. It should also be noted that Paul was executed for resisting the evils of his government.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">Romans 13:4 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">&quot;...he is God&apos;s servant for your good.&quot;</p>
              <p className="text-gray-600 leading-relaxed">The magistrate is a servant, not a savior. The Christian must keep saying this out loud in an age that treats the state like a redeemer.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">Romans 13:7 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">&quot;Pay to all what is owed to them: taxes to whom taxes are owed...&quot;</p>
              <p className="text-gray-600 leading-relaxed">Yes, Christians pay. Even under imperfect regimes. But &quot;owed&quot; is not the same as &quot;holy,&quot; and payment is not the same as moral endorsement.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">Matthew 22:21 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">&quot;Therefore render to Caesar the things that are Caesar&apos;s, and to God the things that are God&apos;s.&quot;</p>
              <p className="text-gray-600 leading-relaxed">Jesus refuses the trap. He does not enthrone Caesar, and He does not start a tax riot. He puts Caesar back in his creaturely place under God with a clever play on words describing Caesar&apos;s (idolatrous) graven image stamped into the coin.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">Acts 5:29 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">&quot;We must obey God rather than men.&quot;</p>
              <p className="text-gray-600 leading-relaxed">This is the boundary line. When the state commands sin, Christians disobey. That principle does not require constant rebellion, but focused refusal when necessary, and it requires clear allegiance and swim-lanes directly from Scripture.</p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Modern Challenges (focus on the 2020&apos;s)
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            The 2020s made two things obvious.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            First, politics has become religion for millions of people. The slogans are liturgy, the news cycle is the daily office, and outrage is the sacrament, and the permanent state of war and abortion is the blood sacrifice on the altar to the godless nationstate. Taxes, in that environment, are not merely revenue. They are moral signaling, a forced tithe to whichever moral vision has captured the bureaucracy and raised its flag over your plantation-state.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            Second, institutions are openly catechizing children and rewarding ideological compliance. Many parents feel it, even if they cannot articulate it. They sense that the state does not want &quot;educated citizens&quot; as much as it wants managed subjects. A tax regime that funds that machine becomes emotionally explosive, because it demands the compulsory payment for the formation of your child into someone else&apos;s disciple.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            Third, tech saturation has trained people to accept non-consensual extraction as normal. Terms of service, dark patterns, subscriptions you forget to cancel, data harvested by default. The state is not separate from that spirit. It is often the biggest practitioner of &quot;default consent,&quot; where you are treated as having agreed because you did not escape.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            So yes, taxation is an economic issue, but it is also discipleship. It teaches you what you are, who owns you, and what you should fear.
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Pastoral Application Without Softness
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Here is the straight advice.
          </p>

          <div className="relative pl-12 space-y-16 before:absolute before:left-[1.15rem] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-teal-600 before:to-teal-100">
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">1</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Refuse the State&apos;s Theological Claims in Your Own Mind</h3>
              <p className="text-gray-600 leading-relaxed">
                You can pay what is demanded without calling it virtuous. You can comply without mentally bowing.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">2</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Do Not Lie, Cheat, or Perform Righteousness Through Fraud</h3>
              <p className="text-gray-600 leading-relaxed">
                Christians should not build a &quot;freedom ethic&quot; on dishonesty. Pay what is legally required, challenge what is unjust through lawful means, and keep your conscience clean.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">3</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Rebuild Local Competence</h3>
              <p className="text-gray-600 leading-relaxed">
                The most effective protest against bloated taxation is not a meme, it is a parallel economy of real responsibility: family care, church diaconal strength, mutual aid, local business, local schooling, real charity that is personal and accountable.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">4</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Treat Spending as the Real Battlefield</h3>
              <p className="text-gray-600 leading-relaxed">
                Taxation is downstream of spending, so endless spending is a moral problem before it is a budget problem. Ask, every time, &quot;By what authority does the state do this?&quot; and &quot;Who consented, in a meaningful way, and how could we have withdrawn consent?&quot;
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">5</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Be Very Cautious with the Language of Violence</h3>
              <p className="text-gray-600 leading-relaxed">
                Scripture recognizes legitimate force in the hands of lawful authority, and it recognizes self-defense, but it never gives Christians permission to romanticize bloodshed. If you ever find yourself excited by the idea of violence, that is not zeal, it is a warning light on your dashboard. God calls His people to courage, not intoxication.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
              <Compass size={24} className="text-teal-600" /> Personal Note
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Now, personally, I live with the same tension you do. I am libertarian enough to want the smallest state possible, and Christian enough to know my real citizenship is in the Kingdom. So I pay what I owe, I do not pretend it is all righteous, and I try to push everything I can back down to the family, the church, and the local community. The goal is not to &quot;win politics.&quot; The goal is to keep my household faithful, keep my conscience clear, and keep my instincts trained on Christ&apos;s lordship rather than the daily panic cycle.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Objections and Honest Replies
          </h2>

          <div className="grid gap-8 my-12">
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">Objection 1: &quot;Romans 13 means you have to stop criticizing taxation.&quot;</h3>
              <p className="text-gray-600 leading-relaxed">Romans 13 commands submission, not silence. The prophets critiqued kings. John the Baptist confronted rulers even to the point of execution. Submission means you do not treat yourself as sovereign. It does not mean you call every policy good.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">Objection 2: &quot;Without involuntary taxes, society collapses.&quot;</h3>
              <p className="text-gray-600 leading-relaxed">That is a faith claim. It assumes people cannot coordinate, cannot covenant, cannot build institutions, cannot educate, cannot care for the needy, unless coerced by central power. Christianity says the opposite: regenerate people, strong families, and a courageous church can do far more good than a bureaucratic machine, and do it with real accountability.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">Objection 3: &quot;Jesus said render to Caesar, so taxation is beyond moral debate.&quot;</h3>
              <p className="text-gray-600 leading-relaxed">Jesus made taxation a moral debate by placing Caesar under God in the same sentence. Caesar is not ultimate. The real question is always, what belongs to Caesar, and what belongs to God? When Caesar claims what God has reserved, Christians must say no.</p>
            </section>
            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">Objection 4: &quot;Talking about consent is just libertarian ideology dressed up as theology.&quot;</h3>
              <p className="text-gray-600 leading-relaxed">It can be, if it is detached from Christ&apos;s lordship. But consent and jurisdiction are not modern inventions. They are downstream of a deeper claim: no creature has absolute rights over other creatures, because God alone is sovereign. The moment the state becomes absolute, it is no longer &quot;just politics.&quot; It is idolatry.</p>
            </section>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            Conclusion
          </h2>

          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 my-16">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <Info size={24} className="text-amber-400" /> The Bottom Line
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Involuntary taxation is not just an argument about dollars. It is an argument about dominion, conscience, and worship. The Christian response is not to panic, not to fantasize about purity through chaos, and not to baptize the modern state as a benevolent god.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              We render what is owed, we refuse the state&apos;s messianic posture, we obey God rather than men when the line is crossed, and we rebuild the kind of local, covenantal strength that makes tyranny less plausible. The future does not belong to bureaucratic permanence. It belongs to Christ, who reigns now, and who will judge every authority that pretends otherwise.
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
            References
          </h2>

          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              <strong>The Nicene Creed</strong> (text): CCEL. Christian Classics Ethereal Library
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Westminster Confession of Faith, Chapter 20</strong> (Christian liberty and conscience): Blue Letter Bible. Blue Letter Bible
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>&quot;Taxation, Liberty, and the Bible&quot;</strong> (position paper, Chalcedon Foundation): Martin G. Selbrede. Chalcedon
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Augustine, <em>City of God</em>, Book IV, ch. 4</strong> (kingdoms without justice): Open Oklahoma State. Open Oklahoma State Library
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>McCulloch v. Maryland</strong> (re: &quot;the power to tax involves the power to destroy&quot;): U.S. National Archives. National Archives
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Seigniorage and inflation as a form of taxation</strong> (economic framing): Brookings working paper discussing seigniorage and inflation in optimal taxation models. Brookings
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Scripture (ESV)</strong> quoted: Romans 13:1, 13:4, 13:7; Matthew 22:21; Acts 5:29. biblegateway.com
            </p>
          </div>

        </div>
      );
    }

    if (id === 'christs-dominion-over-everything') {
      return (
        <div className="space-y-12">

          {/* ── Thesis ── */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Thesis</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            The average, contemporary person in the western hemisphere doesn&apos;t realize that Ba&apos;al worship is at an all-time high. The god of fertility and storms has taken over the minds and hearts of most people, even they few of them know he exists. Through the successful influence of secular humanism, Ba&apos;al has tricked the world into catechizing their kids through screens, outsourcing conscience to &ldquo;experts,&rdquo; and treating elections like liturgies.
          </p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-teal-600" />
              <span className="text-sm font-bold text-teal-600 uppercase tracking-widest">Core Thesis</span>
            </div>
            <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium">
              My thesis is simple: Christ does not offer to be Lord of your private feelings while the rest of life belongs to other gods. He is Lord of everything, and every rival &ldquo;sovereignty&rdquo; is either a servant under Him or a rebel heading for judgment.
            </p>
          </div>

          {/* ── The Problem ── */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">The Problem</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            The modern Western default is not &ldquo;neutral.&rdquo; It is a rival faith. It assumes man is autonomous, meaning is self-authored, and authority is negotiated rather than revealed. That is why the same culture that says &ldquo;my truth&rdquo; also demands institutional compliance. It wants personal sovereignty and centralized sovereignty at the same time, which is impossible unless the state becomes a substitute god.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            This is the undercurrent flowing beneath so many 2020s arguments about wealth, education, sexuality, and politics. The state promises salvation by legislation, the market promises salvation by consumption, the algorithm promises salvation by attention, and the self promises salvation by self-definition. None of these can deliver what they promise, because none of them define reality without chaos. They can only manage behaviors and redistribute consequences.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            And here is the uncomfortable part: it is the fault of Christians for accepting the pagan framing of issues in Christ&apos;s Kingdom. We argue about &ldquo;values&rdquo; as though values float in midair. We talk about &ldquo;rights&rdquo; as though rights exist without a Giver. We ask for &ldquo;tolerance&rdquo; as though tolerance is a moral law that binds everyone rather than emotional insecurity raging itself into the public discourse. The secular worldview borrows moral and rational furniture from God&apos;s world, then acts surprised when their house collapses in Ba&apos;al&apos;s storm.
          </p>

          {/* ── The Christian Response ── */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">The Christian Response</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            If Christ is not Lord, then power is. There is no third option. &ldquo;Neutrality&rdquo; is a costume we wear when we do not want to confess who our god is.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            The Christian confession begins with God as Creator, which immediately means God as Owner, which immediately means God as Lawgiver, which immediately means God as Judge. That chain is what modern thought tries to cut. But cut it, and you do not get freedom. You get a rotating cast of mini-sovereigns, each claiming the right to define good and evil through violence if necessary, but usually through social manipulation or coercion and the implicit threat of violence.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            This is why the Church has historically insisted that Jesus is not merely a spiritual guide but the living Lord through whom all things were made, and under whom all things hold together. The Nicene Creed does not give you a small Jesus. It gives you the One &ldquo;through whom all things were made.&rdquo; That is not poetic filler like the modern humanist implies. It is metaphysics of your timeless, omnipotent King who claims dominion over every square inch of existence that He created.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            So when the state claims total jurisdiction over education, wealth, speech, conscience, family, medicine, and even the meaning of male and female, it is not merely &ldquo;overreach.&rdquo; It is pagan idolatry; a creature pretending to be the Creator. Yet we should not pretend the state is a demon with a clipboard, separate from us. The state is often the public shape of our private sins: laziness, fear, envy, lust for control, and the desire to offload responsibility so we can spend time loving our sins.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            The Christian answer is not mere resistance for resistance&apos;s sake. It is a positive confession and a positive rebuilding. Christ&apos;s dominion means there is a true order to life: God first, then the household, then the civil magistrate in his limited lane. It means money, schooling, inheritance, and charity are not raw material for bureaucratic experiments. They are stewardship arenas under God. It means the question is never &ldquo;what can we get away with?&rdquo; The question is &ldquo;what does faithfulness look like here?&rdquo;
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            This is also why, when Christians speak about civil government, we speak with both seriousness and limitation. The Reformed tradition has historically affirmed civil government as ordained by God, while also denying that it is absolute or holy in itself. A magistrate is a minister, not a messiah. When he acts like a messiah, he becomes a rival priesthood.
          </p>

          {/* ── Scripture as the Foundation ── */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Scripture as the Foundation</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            I will use <strong>ESV</strong> throughout.
          </p>

          <div className="grid gap-8 my-12">

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">1) Matthew 28:18 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                &ldquo;And Jesus came and said to them, &apos;All authority in heaven and on earth has been given to me.&apos;&rdquo;
              </p>
              <p className="text-gray-600 leading-relaxed">
                This is not &ldquo;church authority.&rdquo; This is not &ldquo;authority over hearts only.&rdquo; It is authority in heaven and on earth. The Great Commission is not a suggestion to make converts who then retreat into private spirituality. It is a claim of universal kingship that demands universal obedience across the public face of the world starting in the local community, centered in the local church, and also in the privacy of the home.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">2) Colossians 1:16&#8211;17 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                &ldquo;For by him all things were created, in heaven and on earth, visible and invisible, whether thrones or dominions or rulers or authorities, all things were created through him and for him. And he is before all things, and in him all things hold together.&rdquo;
              </p>
              <p className="text-gray-600 leading-relaxed">
                Paul explicitly names political realities: thrones, dominions, rulers, authorities. They are created <em>through</em> Christ and <em>for</em> Christ. That means government is real, but it is not ultimate. It has meaning only when it stays in its creaturely place.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">3) Psalm 24:1 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                &ldquo;The earth is the LORD&apos;s and the fullness thereof, the world and those who dwell therein.&rdquo;
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ownership precedes policy. God&apos;s ownership is the reason the state cannot claim total ownership. It is also the reason you cannot claim total ownership of yourself. You are not self-made, and you are not self-ruled.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">4) 1 Corinthians 10:31 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                &ldquo;So, whether you eat or drink, or whatever you do, do all to the glory of God.&rdquo;
              </p>
              <p className="text-gray-600 leading-relaxed">
                This is the daily-life verse that destroys sacred-secular compartmentalization. &ldquo;Whatever you do&rdquo; includes work, schooling, budgeting, voting, parenting, and the way you talk about your enemies.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500">
              <h3 className="text-lg font-bold text-teal-600 uppercase tracking-widest mb-4">5) Revelation 11:15 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                &ldquo;The kingdom of the world has become the kingdom of our Lord and of his Christ, and he shall reign forever and ever.&rdquo;
              </p>
              <p className="text-gray-600 leading-relaxed">
                History is going somewhere. Christ&apos;s dominion is not a fragile ideal waiting for permission. It is a certainty moving toward consummation.
              </p>
            </section>

          </div>

          {/* ── Modern Challenges ── */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Modern Challenges</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            The 2020s have made it hard to breathe without bumping into propaganda built on the leverage of your data. Your phone is not just a tool; it is a portable discipleship machine. Institutions you were told to trust have publicly lied, then demanded more trust under the implication that you cannot be trusted with freedom while they can be trusted with power. Sexual identity has been detached from creation and covenant, and then enforced by policy. Education has become less about formation in wisdom and more about formation in compliance. Families are fragmented, churches are distracted, and men are trained to be either passive or performatively angry - neither of which are worth anything to the kingdom.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            In that environment, &ldquo;Christ&apos;s dominion&rdquo; stops being a bumper-sticker doctrine and becomes survival reality.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12">

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                If Christ is Lord, then schooling is not neutral. Education always teaches what man is, what the world is, and what counts as &ldquo;good.&rdquo; If the state is functionally god in the classroom, it will produce citizens for that god.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                If Christ is Lord, then wealth is not a dirty word, nor is it a savior. It is stewardship, and the moral question is not &ldquo;do you have money?&rdquo; but &ldquo;who rules your heart, and what are you building?&rdquo;
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                If Christ is Lord, then politics is not religion. It is a limited arena where Christians pursue justice, restrain evil, and protect neighbor, but never as a substitute for gospel obedience.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                If Christ is Lord, then fear is exposed. The attention economy monetizes anxiety. Christ&apos;s kingship calls that bluff and demands faithfulness in a world begging for you to love your sinfulness.
              </p>
            </section>

          </div>

          {/* ── Pastoral Application ── */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Pastoral Application</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Here is what I think Christians need to believe, refuse, and do.
          </p>

          {/* Believe */}
          <div className="bg-slate-50 border-l-4 border-teal-600 p-6 rounded-r-3xl shadow-sm mb-6">
            <span className="text-lg font-bold text-slate-900">Believe:</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 my-12">

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Christ&apos;s reign is present, not merely future. Confessing &ldquo;Jesus is Lord&rdquo; is not a church slogan. It is a public claim about reality.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                There is no neutral zone. Every &ldquo;just the facts&rdquo; posture still rests on a god, a moral law, and a story about what humans are for.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                God&apos;s order is good. A limited magistrate is a mercy, not a curse, but it is only a mercy when it stays limited.
              </p>
            </section>

          </div>

          {/* Refuse */}
          <div className="bg-slate-50 border-l-4 border-teal-600 p-6 rounded-r-3xl shadow-sm mb-6">
            <span className="text-lg font-bold text-slate-900">Refuse:</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 my-12">

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Refuse the habit of treating the state as the primary builder of the future. That is idolatry with paperwork.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Refuse the cowardly version of Christianity that hides Christ&apos;s authority to avoid social cost.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Refuse to let outrage become your personality. A man can be politically aware and spiritually hollow at the same time.
              </p>
            </section>

          </div>

          {/* Do */}
          <div className="bg-slate-50 border-l-4 border-teal-600 p-6 rounded-r-3xl shadow-sm mb-6">
            <span className="text-lg font-bold text-slate-900">Do:</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 my-12">

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Rebuild your household as a real institution. This means actual family worship rhythms, real authority, real discipline, real affection, real planning.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Put your money where your confession is. Fund what you want to exist: Christian education, Christian mercy, Christian media, Christian community. Starve the idols by refusing to finance them as your first resort.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Speak with clarity, not bile. The culture is confused and scared. That does not excuse rebellion, but it explains the temperature of the room.
              </p>
            </section>

          </div>

          {/* Personal Note */}
          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-6 h-6 text-teal-600" />
              <span className="text-sm font-bold text-teal-600 uppercase tracking-widest">Personal Note</span>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed">
              Now for the personal note. I have to watch my own heart here, because I can turn politics into a stimulant. I really like to debate, and it feels productive to be angry at the machine. It feels manly to be &ldquo;in the know,&rdquo; and stand against it. But there is a point where it is just anxiety dressed up as righteousness. When I am faithful, I get practical: I look at my calendar, my kids, my spending, my church life, my attention diet. I ask, &ldquo;Is Christ actually ruling here, or am I outsourcing responsibility to the next meme of the week?&rdquo; Most weeks, that question convicts me before it comforts me. That is usually how God works.
            </p>
          </div>

          {/* ── Objections and Honest Replies ── */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Objections and Honest Replies</h2>

          <div className="grid gap-8 my-12">

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Objection 1: &ldquo;If Christ rules everything, aren&apos;t you turning Christianity into politics?&rdquo;</h3>
              <p className="text-gray-600 leading-relaxed">
                No. I am refusing to let politics become Christianity. Christ&apos;s dominion is bigger than politics, and that is precisely the point. The Christian claims that moral order, truth, and meaning are grounded in God, not in elections. Politics is downstream from worship and formation.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Objection 2: &ldquo;Isn&apos;t this triumphalism? Shouldn&apos;t we just preach the gospel?&rdquo;</h3>
              <p className="text-gray-600 leading-relaxed">
                Preaching the gospel is exactly what produces obedience. The gospel is not merely pardon; it is the announcement that the King has come. If you preach a gospel that never collides with how people educate children, handle money, define marriage, or speak truth, you are not preaching the whole Christ.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Objection 3: &ldquo;What about Romans 13? Doesn&apos;t submission mean we stop resisting?&rdquo;</h3>
              <p className="text-gray-600 leading-relaxed">
                Romans 13 teaches that civil authority is real and ordained by God, and that Christians are not anarchic by default. But it does not teach that the magistrate becomes God. Scripture itself gives you categories for lawful disobedience when rulers command sin (think of the apostles in Acts). Submission is covenantal, not absolute. The magistrate is accountable to God, and Christians are accountable to God first.
              </p>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Objection 4: &ldquo;Isn&apos;t this just a Reformed way of saying &apos;culture war&apos;?&rdquo;</h3>
              <p className="text-gray-600 leading-relaxed">
                If &ldquo;culture war&rdquo; means Christians confess Christ publicly and live coherently, then yes, in a sense, conflict is unavoidable. But if &ldquo;culture war&rdquo; means making enemies your mission, then no. The mission is faithful witness, gospel proclamation, and rebuilding institutions that embody obedience. Conflict comes because rival gods do not share sovereignty.
              </p>
            </section>

          </div>

          {/* ── Conclusion ── */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Conclusion</h2>

          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 my-16">
            <div className="flex items-center gap-3 mb-8">
              <Info className="w-6 h-6 text-teal-400" />
              <span className="text-sm font-bold text-teal-400 uppercase tracking-widest">Final Word</span>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">
              Every generation has to decide what &ldquo;lordship&rdquo; means in practice. The 2020s are simply making the choice louder. The state wants to be the shepherd, the screen wants to be the priest, the self wants to be the god, and the church is tempted to be a chaplain for the whole arrangement.
            </p>

            <p className="text-white text-xl font-bold leading-relaxed mb-8">
              Christ will not be a mascot.
            </p>

            <p className="text-gray-300 leading-relaxed mb-8">
              He is Lord of everything. That means your life is not trapped in the news cycle, not owned by the algorithm, not finally defined by the regime, and not saved by your own willpower. It also means you do not get to carve out a private corner of &ldquo;spirituality&rdquo; while the rest of your household runs on the assumptions of the age.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Take heart. The confession is not fragile. The King is not tired. Your calling is not to win the internet, but to be faithful in the lane God actually gave you: household, church, vocation, community. Christ&apos;s dominion is not an excuse to panic. It is a reason to build.
            </p>
          </div>

          {/* ── References ── */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">References</h2>

          <ul className="space-y-4 text-gray-600 leading-relaxed list-disc pl-6">
            <li><strong>The Nicene Creed</strong> (Christ &ldquo;through whom all things were made&rdquo;).</li>
            <li><strong>Westminster Confession of Faith</strong>, especially on Christ and civil magistracy.</li>
            <li><strong>Augustine, <em>The City of God</em></strong> (the two cities as rival loves).</li>
            <li><strong>John Calvin</strong>, <em>Institutes of the Christian Religion</em> (on God&apos;s providence and civil order).</li>
            <li><strong>Cornelius Van Til</strong>, on the religious root of epistemology and the myth of neutrality.</li>
            <li><strong>Greg Bahnsen</strong>, on the impossibility of neutrality and the necessity of Christian foundations for rational discourse.</li>
            <li>Scripture (ESV): Matt. 28:18; Col. 1:16&#8211;17; Ps. 24:1; 1 Cor. 10:31; Rev. 11:15</li>
          </ul>

        </div>
      );
    }

    if (id === 'american-christian-political-discourse') {
      return (
        <div className="space-y-12">

          {/* ======================== THESIS ======================== */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Thesis</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            A lot of American Christians talk about politics the way pagans talk about fate. Every headline is an omen, every election is Armageddon, every tweet is a sacrament. The result is predictable: anxiety, anger, and a weird spiritual exhaustion that looks nothing like &quot;peace that surpasses understanding.&quot;
          </p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-teal-600" />
              <span className="text-sm font-bold uppercase tracking-widest text-teal-600">Thesis</span>
            </div>
            <p className="text-gray-800 leading-relaxed text-lg">
              My thesis is simple: the American Christian must speak in political discourse as a citizen of Christ&apos;s Kingdom first, and as a citizen of any nation second. That does not mean silence, and it does not mean withdrawal. It means refusing political idolatry, exposing the false &quot;neutrality&quot; behind secular moral claims, and insisting that only the Triune God provides the preconditions for justice, liberty, and coherent public reasoning. Christians should not be nation-state mystics. We should be covenant people with clean hands, clear categories, and courage.
            </p>
          </div>

          {/* ======================== THE HIDDEN ASSUMPTIONS ======================== */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">The Hidden Assumptions</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Political discourse is never just about policy. It is always about authority, morality, and man&apos;s place in the world. That means it is always religious at root, even if your religion is agnostic or antagonistically atheist.
          </p>

          <div className="grid gap-8 my-12">
            {/* Secular Humanist */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">The Secular Humanist</h3>
              <p className="text-gray-600 leading-relaxed">
                The secular humanist must assume moral norms (human rights, equality, dignity, justice) while also claiming the universe is ultimately impersonal and accidental. He wants &quot;ought&quot; without a transcendent Lawgiver. He wants binding moral claims while insisting nobody has the right to impose morality. He wants truth that obligates your conscience, while saying your conscience is a social construct.
              </p>
            </div>

            {/* Statist */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">The Statist</h3>
              <p className="text-gray-600 leading-relaxed">
                The statist, whether progressive or conservative, must assume that salvation comes through centralized power. That is not merely a preference for efficiency. It is a rival doctrine of providence. The state becomes the messiah, the planner, the protector, the moral teacher, and the final court of appeal. It is functionally a god for the godless.
              </p>
            </div>

            {/* Catholic or Eastern Orthodox */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">The Catholic or Eastern Orthodox</h3>
              <p className="text-gray-600 leading-relaxed">
                The Catholic or Eastern Orthodox political thinker, if he leans on natural law in a way that tries to create a &quot;common rational platform&quot; independent of Scripture, risks granting too much to the myth of neutrality or authority of the institution of the(ir) church. If God is God, there is no safe corner of the mind where man can stand above Him and arbitrate reality.
              </p>
            </div>

            {/* Muslim */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">The Muslim</h3>
              <p className="text-gray-600 leading-relaxed">
                The Muslim assumes a unitary monotheism and a law-order that does not require the ontological Trinity. Yet the very categories needed for intelligibility, unity and diversity, universal norms applied to particular cases, have deep Trinitarian implications. Unitarianism historically struggles to avoid either sheer arbitrariness or frozen necessity.
              </p>
            </div>

            {/* Libertarian */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">The Libertarian</h3>
              <p className="text-gray-600 leading-relaxed">
                Even the libertarian, and I say this as a Rothbardian by instinct, has assumptions to examine. Libertarian talk about &quot;rights,&quot; &quot;self-ownership,&quot; and &quot;non-aggression&quot; often rides on borrowed Christian capital. The state is criticized as coercive, and that critique is frequently correct, but the moral force of the critique still requires a grounded moral order and a doctrine of man. Rothbard&apos;s classic definition of the state as a coercive monopoly is not wrong as an observation, but it still leaves the question, &quot;By what standard is coercion evil, and why does man have rightful claims at all?&quot;
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            Underneath every political argument is worship. Underneath every outrage cycle is a theology of man.
          </p>

          {/* ======================== THE PRESUPPOSITIONAL CASE ======================== */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">The Presuppositional Case</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Cornelius Van Til&apos;s core move is to drag the argument down to bedrock. You cannot debate ethics, law, or politics as if both sides share the same ultimate authority. There is no neutrality. There is only submission to or revolt against God.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            That is covenantal language, not classroom language. Van Til frames human beings as covenant-keepers or covenant-breakers. You either live as God&apos;s creature, under His revelation, or you live as an attempted autonomous interpreter of reality. Westminster has preserved this emphasis in Van Til&apos;s own lectures on covenant consciousness, where the human situation is explicitly covenantal, not &quot;religiously neutral with a sprinkle of spirituality.&quot;
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            Greg Bahnsen sharpened the apologetic edge with what people often call the transcendental argument. The basic point is not, &quot;Christians are smarter,&quot; or &quot;atheists cannot think.&quot; The point is that atheists, humanists, and secularists must borrow the very tools they use (logic, moral norms, scientific regularity) from the Christian worldview in order to argue against it. In the famous Bahnsen-Stein debate transcript, Bahnsen summarizes the thrust as a proof &quot;from the impossibility of the contrary,&quot; pressing that without the Christian God you cannot justify the preconditions of intelligibility.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            Apply that to political discourse and you get something clarifying:
          </p>

          <div className="relative pl-12 space-y-16 before:absolute before:left-[1.15rem] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-teal-600 before:to-teal-100 my-12">
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">1</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">The myth of neutrality dies immediately.</h3>
              <p className="text-gray-600 leading-relaxed">
                &quot;Let&apos;s just reason together without religion&quot; is a claim that smuggles in a religion. It assumes human reason is authoritative, autonomous, and properly functioning without reference to God. That is not neutral. That is a worldview.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">2</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">Secular political morality cannot cash its own checks.</h3>
              <p className="text-gray-600 leading-relaxed">
                When someone says, &quot;Human rights are self-evident,&quot; the presuppositional question is: self-evident to whom, and on what authority? When someone says, &quot;We must have justice,&quot; the question is: justice defined by what standard, enforced by what right, accountable to whom?
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-teal-600/30">3</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4">The Christian worldview makes public reasoning possible without deifying the state.</h3>
              <p className="text-gray-600 leading-relaxed">
                Christianity gives you a Lawgiver, a stable moral order, human dignity rooted in the image of God, and accountability above rulers. It also gives you a doctrine of sin that prevents utopian politics. That combination is political sanity.
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            This is also where my libertarian note fits cleanly. I want the most minimal state possible because I do not believe the state is a savior, a parent, or a priest. Biblically, civil authority is real, but it is delegated, limited, and accountable. Gary North, writing as a theonomist, presses the point bluntly: human authority is bounded by God&apos;s law, not man&apos;s imagination.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            So the presuppositional posture in politics is not, &quot;Christians should win the culture war.&quot; It is: <strong>Christians must refuse the idol of neutrality, refuse the idol of the nation-state, and speak as servants of King Jesus, using categories that actually explain reality.</strong>
          </p>

          {/* ======================== SCRIPTURE AS THE FOUNDATION ======================== */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Scripture as the Foundation</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            I am sticking with the ESV for this article.
          </p>

          <div className="grid gap-8 my-12">
            {/* Matthew 6:33 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">1) Matthew 6:33 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                &quot;But seek first the kingdom of God and his righteousness, and all these things will be added to you.&quot;
              </p>
              <p className="text-gray-600 leading-relaxed">
                This is an ordering principle. The Christian does not seek first a candidate, a party, or a policy outcome. He seeks first the Kingdom and righteousness, then he walks outward into every sphere, including politics, without confusing means with ends.
              </p>
            </div>

            {/* Psalm 146:3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">2) Psalm 146:3 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                &quot;Put not your trust in princes, in a son of man, in whom there is no salvation.&quot;
              </p>
              <p className="text-gray-600 leading-relaxed">
                That is a direct rebuke to political messianism. The psalm does not say, &quot;Princes are irrelevant.&quot; It says they are not saviors. When Christians talk like the next administration will resurrect the dead or fix the human heart, we are doing bad theology with patriotic vibes, and I don&apos;t like it.
              </p>
            </div>

            {/* Proverbs 29:25 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">3) Proverbs 29:25 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                &quot;The fear of man lays a snare, but whoever trusts in the LORD is safe.&quot;
              </p>
              <p className="text-gray-600 leading-relaxed">
                Political discourse is often fear management. Fear of the other side, fear of losing status, fear of being excluded, fear of speaking plainly. Scripture calls that a snare. The beginning of political courage is not the tingle you get from a great podcast. It is the fear of God.
              </p>
            </div>

            {/* Romans 13:1-4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">4) Romans 13:1-4 (ESV)</h3>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                &quot;Let every person be subject to the governing authorities. For there is no authority except from God, and those that exist have been instituted by God… for he is God&apos;s servant for your good.&quot;
              </p>
              <p className="text-gray-600 leading-relaxed">
                This passage is frequently abused in two opposite directions. Some use it to baptize unlimited government. Others use it to pretend government is inherently illegitimate. Paul does neither. He describes civil rulers as God&apos;s servants with a defined moral purpose related to good and evil. The moment the state tries to become lord of conscience, it is attempting a blasphemous job change. It should be noted that Paul was executed by his state for refusing to compromise on God&apos;s Law/Word.
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            Those four texts give the frame: kingdom first, no salvation in princes, fear God not man, and recognize delegated civil authority without worshiping it.
          </p>

          <div className="bg-slate-50 border-l-4 border-teal-600 p-8 md:p-12 rounded-r-3xl shadow-sm my-16">
            <p className="text-gray-800 leading-relaxed text-lg">
              Scripture, however, was written in the context of sovereign kings reigning down the hierarchy upon men. This does require some careful prayer and discernment in an American context, because our civil order was born in a secession-oriented revolution and then intentionally structured to diffuse power from the bottom-up. The Constitution assumes layered authority, starting with the individual under God, then local and state jurisdictions, then a limited federal sphere, which means &quot;the governing authorities&quot; are not a single, absolute voice that can swallow conscience, church, or neighborhood. Even the right to bear arms, whatever one thinks of its modern use, signals that the state is not the final owner of force or the final judge of justice, and that citizens are not meant to be passive livestock. Still, Romans 13 does not bless vigilantism or rage politics. It calls for a posture of order, honor, and restraint, while recognizing that obedience to God is higher than obedience to men, and that any resistance, if it ever becomes morally unavoidable, must be sober, humble, accountable to God, and treated as a last resort rather than an egotistical venture in libertinism.
            </p>
          </div>

          {/* ======================== THE 2020s PRESSURE TEST ======================== */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">The 2020s Pressure Test</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            The 2020s are basically a discipleship crisis wearing a tech costume.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            We live in an attention economy where outrage pays the rent, and it isn&apos;t lost on me that I earn a living in media. Algorithms reward moral posturing, not moral clarity. People are lonely, anxious, and spiritually hungry, so politics becomes a substitute church. The rally becomes liturgy. The hashtag becomes confession. The existential enemy becomes the devil. The candidate becomes messiah...
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            That is why Christian political discourse is so often a mess. Christians are being catechized all day by their feeds, then trying to &quot;add Jesus&quot; on Sunday.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            You see it in real life:
          </p>

          <div className="grid gap-8 my-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">Institutional distrust</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Institutional distrust</strong> turns every authority claim into suspicion. That can be healthy, but it can also become cynicism, which is just pride wearing a fedora.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">Sexual confusion and identity politics</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Sexual confusion and identity politics</strong> turn anthropology into legislation. If you get man wrong, law becomes a factory for lies.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">Tech saturation</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Tech saturation</strong> makes everyone feel like they must have a take on everything. That produces constant judgment with almost no wisdom.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">Fear-based coalition building</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Fear-based coalition building</strong> tempts Christians to excuse sin because &quot;we need votes,&quot; or to bless corrupt means because &quot;the stakes are too high.&quot;
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            When politics becomes religion, it will demand sacrifices. It will demand your joy, your family peace, your honesty, your courage to speak truth to your own side, and eventually your conscience.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            The Kingdom of Christ does not need that kind of worship, and it refuses that kind of fear.
          </p>

          {/* ======================== PASTORAL APPLICATION WITHOUT SOFTNESS ======================== */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Pastoral Application Without Softness</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Here is what I think American Christians need to believe, refuse, and do.
          </p>

          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-8">What to believe</h3>

          <div className="grid gap-8 my-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                <strong>Christ is King now.</strong> That is not a bumper sticker. It means every ruler is accountable, every policy is morally evaluable, and every political hope must be subordinated to Christ&apos;s reign.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                <strong>The state is not neutral and neither are you.</strong> Your political speech is either covenant faithfulness or covenant rebellion in public form.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                <strong>Law comes from a god.</strong> Rushdoony was right to press that point: the source of law reveals the god of the society. Chalcedon&apos;s own framing of &quot;law as liberty&quot; captures the basic idea that God&apos;s law protects life and restrains evil, rather than existing as arbitrary oppression.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-8">What to refuse</h3>

          <div className="grid gap-8 my-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Refuse to speak as if &quot;the right side&quot; just means &quot;my side.&quot;
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Refuse to treat voting as a sacrament or abstaining as a virtue signal. I have been guilty of the latter, in the past, and I&apos;m not yet sure how to rectify it in the future. Selbrede&apos;s Chalcedon paper is helpful here because it attacks the fear-driven &quot;lesser of two evils&quot; posture as a form of man-fearing politics, and it re-centers the issue as obedience before God, not managing outcomes.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                Refuse the soft lie that Christian faith is &quot;private.&quot; If Christ is Lord, there is no private corner where His claims do not reach.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-8">What to do in your real life</h3>

          <div className="grid gap-8 my-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                <strong>Speak with categories, not slogans.</strong> Ask &quot;By what standard?&quot; and &quot;On what authority?&quot; That is not debate-club behavior, although it is very effective rhetoric. More importantly, it is discipleship in public.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                <strong>Practice localism and responsibility.</strong> If you want a smaller state, build thicker communities. Family, church, mutual aid, private charity, local accountability. The big state grows where personal responsibility collapses.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed">
                <strong>Prioritize formation over information.</strong> Read less outrage, read more Scripture. Pray more than you post. It sounds basic because it is basic, and because it works.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-8">What I do in my real life</h3>

          <p className="text-gray-600 leading-relaxed mb-8">
            I have to manage my own temptation to treat the timeline like it is my pastor. I can feel the pull to react, to dunk, to &quot;win,&quot; to signal that I am not one of those Christians. The quickest way I know to become a political addict is to convince myself that my anger is righteousness.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            So I try to do a few simple things: I limit my inputs, I force myself to name the presuppositions under my own arguments, and I try to remember that my kids do not care who won the discourse today. They care whether dad is steady, joyful, and honest as a covenant representative of Jesus Christ at the head of our household. If my political engagement makes me harsher at home, it is already disordered, even if my positions are correct, and that is something I need to work on.
          </p>

          {/* ======================== OBJECTIONS AND HONEST REPLIES ======================== */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Objections and Honest Replies</h2>

          <div className="grid gap-8 my-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black tracking-tight text-slate-900 mb-4">Objection 1: &quot;Shouldn&apos;t Christians just avoid politics since it is dirty?&quot;</h3>
              <p className="text-gray-600 leading-relaxed">
                Politics is downstream of worship, which means you cannot avoid it entirely. The question is not whether you engage, but how you engage. Gary DeMar is right to reject the idea that politics is outside the Christian worldview, because civil government is part of God&apos;s order and therefore morally accountable. The answer is not retreat; it is faithful presence without idolatry.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black tracking-tight text-slate-900 mb-4">Objection 2: &quot;Presuppositionalism sounds arrogant. Why not just use &apos;common ground&apos;?&quot;</h3>
              <p className="text-gray-600 leading-relaxed">
                Presuppositionalism is actually the opposite of arrogance if it is done correctly. It says the unbeliever knows God but suppresses the truth, and the believer also depends entirely on God&apos;s revelation for any clarity at all. The claim is not &quot;I am smarter.&quot; The claim is &quot;There is no neutrality, and your own reasoning depends on the God you deny.&quot; That is an act of honesty, not ego.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black tracking-tight text-slate-900 mb-4">Objection 3: &quot;If you minimize the state, won&apos;t evil just run wild?&quot;</h3>
              <p className="text-gray-600 leading-relaxed">
                Evil runs wild when men are ungoverned inwardly and unrestrained outwardly. Scripture does not call for an absent magistrate; Romans 13 calls the magistrate a servant for restraining evil. But the modern state often expands far beyond justice into management, moral redefinition, and pseudo-salvation. The Christian case is not &quot;no authority,&quot; it is &quot;bounded authority under God.&quot; Also, the state will grow as the individual&apos;s obedience to God shrinks, so if you think the government is too big, the first person to blame is yourself and your lack of focus on building the kingdom.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black tracking-tight text-slate-900 mb-4">Objection 4: &quot;If we don&apos;t win politically, won&apos;t we lose everything?&quot;</h3>
              <p className="text-gray-600 leading-relaxed">
                That is Psalm 146:3 territory. You are not promised cultural control. You are promised Christ&apos;s reign, the church&apos;s endurance, and God&apos;s judgment in history and eternity. Political outcomes matter, but they are not ultimate. When Christians act like they are ultimate, we reveal that our hope has slid.
              </p>
            </div>
          </div>

          {/* ======================== CONCLUSION ======================== */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">Conclusion</h2>

          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 my-16">
            <p className="leading-relaxed mb-8 text-lg text-slate-200">
              The American Christian has a role in political discourse, but it is not to be the chaplain of a party or the hype man of the nation-state. It is to be a witness. A witness has two jobs: tell the truth, and refuse to lie.
            </p>
            <p className="leading-relaxed mb-8 text-lg text-slate-200">
              In the 2020s, the pressure to lie is intense. Lie about neutrality. Lie about salvation through politics. Lie about man, law, and liberty. Lie with your silence when God&apos;s claims are treated as optional.
            </p>
            <p className="leading-relaxed text-lg text-slate-200">
              So speak, but speak like a Christian. Seek first the Kingdom. Put no trust in princes. Fear God more than man. Recognize legitimate authority without worshiping it. Then build the kind of household, church life, and local community that makes statism less plausible and Christ&apos;s lordship more visible.
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            Political discourse is not your heaven or your hell. It is one more arena where covenant-keepers must live honestly among covenant-breakers, with hope, with backbone, and with clean hands.
          </p>

          {/* ======================== REFERENCES ======================== */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">References</h2>

          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Cornelius Van Til, &quot;Covenant Consciousness&quot; (Westminster Media).
            </p>
            <p className="text-gray-600 leading-relaxed">
              Cornelius Van Til, &quot;The Certainty of Our Faith&quot; (Westminster Media).
            </p>
            <p className="text-gray-600 leading-relaxed">
              Greg L. Bahnsen vs. Gordon Stein debate transcript (PDF).
            </p>
            <p className="text-gray-600 leading-relaxed">
              Murray N. Rothbard, <em>Anatomy of the State</em> (Mises Institute library).
            </p>
            <p className="text-gray-600 leading-relaxed">
              Gary North, <em>Authority and Dominion</em> (PDF).
            </p>
            <p className="text-gray-600 leading-relaxed">
              Chalcedon Foundation, &quot;Law as Liberty.&quot;
            </p>
            <p className="text-gray-600 leading-relaxed">
              Martin G. Selbrede, &quot;Judgment, Politics, and the Bible&quot; (Scribd upload attributed to Chalcedon Foundation).
            </p>
            <p className="text-gray-600 leading-relaxed">
              Gary DeMar, &quot;Is Politics Outside the Scope of the Christian Worldview?&quot;
            </p>
            <p className="text-gray-600 leading-relaxed mt-8">
              <strong>Scripture (ESV):</strong> Matthew 6:33; Psalm 146:3; Proverbs 29:25; Romans 13:1-4
            </p>
          </div>

        </div>
      );
    }


        return (
      <div className="py-32 text-center border-2 border-dashed border-gray-100 rounded-[3rem] bg-slate-50/50">
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Authority Record Syncing...</p>
        <p className="text-lg mt-4 text-slate-400 font-light max-w-md mx-auto leading-relaxed">Detailed content for this record is currently being synchronized with the Chief Bitcoin Historian's local archive.</p>
      </div>
    );
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <h2 className="text-6xl font-black mb-12 italic uppercase tracking-tighter">Article Not Found</h2>
          <Link to="/" className="text-teal-600 font-bold uppercase tracking-[0.4em] text-xs border-b-2 border-teal-600 pb-2">Return to Safety</Link>
        </div>
      </div>
    );
  }

  const jsonLd = useMemo(() => buildPostSchemaGraph(post, authorTitle), [post, authorTitle]);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const shareUrl = `https://kurtwuckertjr.com/post/${id}`;

  useEffect(() => {
    if (!isShareOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setIsShareOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsShareOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isShareOpen]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => { setCopied(false); setIsShareOpen(false); }, 1200);
    });
  }, [shareUrl]);

  const handleShareX = useCallback(() => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, '_blank', 'width=600,height=400');
    setIsShareOpen(false);
  }, [shareUrl, post.title]);

  const handleShareFB = useCallback(() => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
    setIsShareOpen(false);
  }, [shareUrl]);

  return (
    <article className="bg-white min-h-screen py-32" itemScope itemType="http://schema.org/BlogPosting">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="mb-16">
            <Link to="/archive/all" className="inline-flex items-center gap-2 text-gray-400 hover:text-teal-600 mb-12 transition-colors font-bold uppercase tracking-widest text-[10px]">
              <ArrowLeft size={16} /> The Archive
            </Link>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-teal-50 text-teal-600 px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest" itemProp="keywords">
                {post.tag}
              </span>
              <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <Calendar size={12} />
                <time dateTime={post.date} itemProp="datePublished">{post.date}</time>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase mb-8" itemProp="headline">
              {post.title}
            </h1>
            <span itemProp="description" className="sr-only">{post.excerpt}</span>

            <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
              <img 
                src="https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/main/public/Kurtface.jpg" 
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-lg" 
                alt="Kurt Wuckert Jr." 
              />
              <div>
                <p className="text-slate-900 font-black uppercase text-xs tracking-widest" itemProp="author">Kurt Wuckert Jr.</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{authorTitle}</p>
              </div>
            </div>
          </header>

          <figure className="relative aspect-video rounded-[3rem] overflow-hidden mb-20 shadow-3xl ring-1 ring-black/5 bg-slate-100">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" itemProp="image" />
          </figure>

          <div className="prose prose-xl prose-slate max-w-none text-slate-700 font-light leading-relaxed mb-32" itemProp="articleBody">
            {postContent}
          </div>

          <footer className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="flex items-center gap-6">
                <div className="relative" ref={shareRef}>
                  <button
                    onClick={() => setIsShareOpen(o => !o)}
                    aria-expanded={isShareOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-amber-500 transition-all shadow-xl shadow-black/5 group"
                  >
                    <Share2 size={16} className="group-hover:scale-110 transition-transform" /> Share Insights
                  </button>
                  <AnimatePresence>
                    {isShareOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        role="menu"
                        className="absolute bottom-full left-0 mb-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 space-y-1 z-50"
                      >
                        <button onClick={handleCopy} role="menuitem" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                          {copied ? <Check size={16} className="text-teal-600" /> : <Link2 size={16} />}
                          {copied ? 'Copied!' : 'Copy URL'}
                        </button>
                        <button onClick={handleShareX} role="menuitem" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          Share on X
                        </button>
                        <button onClick={handleShareFB} role="menuitem" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          Share on Facebook
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-2 text-teal-600">
                  <ShieldCheck size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Verified Record</span>
                </div>
             </div>

             <Link 
              to="/#contact" 
              className="bg-teal-600 hover:bg-amber-500 text-white inline-flex items-center gap-4 px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-teal-600/20 hover:-translate-y-1"
            >
              Contact Kurt <ArrowRight size={18} />
            </Link>
          </footer>
        </motion.div>
      </div>
    </article>
  );
};

export default Post;
