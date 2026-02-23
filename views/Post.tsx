
import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { Category } from '../types';
import { GLOSSARY_TERMS } from '../glossaryData';
import { buildPostSchemaGraph } from '../schemaUtils';
import { ArrowLeft, Calendar, Share2, ShieldCheck, ArrowRight, Info, CheckCircle2, Clock, Tool, BookOpen, AlertCircle, HelpCircle, Compass, Dumbbell, Zap, Footprints, ShoppingBag, Wallet, Smartphone, HardDrive, Lock, Globe } from 'lucide-react';

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
          <p>A Bitcoin fork is a change in the rules or the history of the Bitcoin network. The word “fork” comes from the idea of a path splitting into two directions.</p>
          <p>There are two main types: hard forks and soft forks.</p>
          <p className="text-gray-600 leading-relaxed">Soft fork</p>
          <p className="text-gray-600 leading-relaxed">A soft fork is a change that tightens the rules but remains compatible with older software, at least in theory.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Nodes that upgrade follow the new stricter rules.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Nodes that do not upgrade still see the new blocks as valid, because the new rules are a subset of the old rules.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">In practice, social and economic pressure matters. Even soft forks can cause friction if many people disagree.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Think of a soft fork as a club that decides to enforce a stricter dress code. The building is the same, but the rules for entry change.</p>
          <p className="text-gray-600 leading-relaxed">Hard fork</p>
          <p className="text-gray-600 leading-relaxed">A hard fork is a change that relaxes or changes the rules in a way that is not compatible with older software.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Upgraded nodes accept new types of blocks or transactions.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Old nodes reject those blocks as invalid.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">If both groups keep mining and transacting, the blockchain can split into two separate networks with a shared history up to the fork point.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">In that case, users can end up with coins on both chains, and the market decides which fork has more value and support.</p>
          <p className="text-gray-600 leading-relaxed">Forks in Bitcoin history have been used to:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Change block size limits.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Modify script rules.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Create new projects with different philosophies.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">They are important because they reveal governance in practice. Who gets to change the rules, under what conditions, and with what consequences.</p>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-halving') {
      return (
        <div className="space-y-12">
          <p>The Bitcoin halving is an event that happens automatically in the protocol every 210,000 blocks, roughly every four years. At each halving, the block subsidy that miners receive is cut in half.</p>
          <p>At the beginning:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The first miners earned 50 new bitcoins per block.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Then it dropped to 25, then 12.5, then 6.25, and so on.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Over time, the subsidy trends toward zero.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Why it exists:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Controlled supply</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Bitcoin has a maximum supply limit of 21 million coins. The halving schedule is how the protocol distributes new coins over time without a central authority.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Monetary policy</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">The halving creates a predictable, transparent monetary policy. Everyone can see the schedule and no one can secretly print extra coins.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Incentives for miners</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Early on, high subsidies attract miners to secure the network. As the subsidy shrinks, transaction fees are expected to become a larger part of miner revenue, especially on high throughput chains.</p>
          <p className="text-gray-600 leading-relaxed">Why people talk about it so much:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">On speculative networks, halvings often affect price expectations, since new coin supply slows down.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">For miners, halvings are serious business. They immediately cut block reward income. Miners with inefficient hardware or expensive electricity may no longer be profitable unless they rely on transaction fees or better scaling strategies.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">In short, the Bitcoin halving is a built in schedule that reduces new coin creation over time. It keeps the supply scarce, gives the system credibility, and forces miners and businesses to plan for a world where transaction volume matters more than inflation rewards.</p>
        </div>
      );
    }

    if (id === 'how-to-get-bitcoin') {
      return (
        <div className="space-y-12">
          <p>There are three main ways to get Bitcoin: buy it, earn it, or mine it.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Buying Bitcoin</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">This is the most common route for beginners.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Exchanges: Sign up with a reputable exchange, complete any required identity checks, deposit money, then buy Bitcoin. Withdraw to a self custody wallet if you want full control.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Broker apps: Some fintech apps let you buy small amounts of Bitcoin from your phone. Make sure you understand whether you can withdraw to your own wallet.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Bitcoin ATMs and peers: In some places, machines or peer to peer platforms let you buy for cash.</span>
            </li>
          </ul>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Earning Bitcoin</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Instead of spending fiat to buy Bitcoin, you can accept it as payment.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Freelance or salary: Offer your services or products and accept Bitcoin.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Tips and rewards: Some sites, social platforms, or communities let people tip you in Bitcoin.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Business invoices: Companies can integrate Bitcoin payments for customers, especially useful on low fee chains.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Earning is often the most natural way to get Bitcoin because you are directly trading your time or products for coins.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Mining Bitcoin</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Mining is the most technical option.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">You buy specialized mining hardware and secure low cost power.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">You point your machines at a mining pool or run your own setup.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">You earn a share of the block rewards and fees for the work your machines do.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">For most individuals today, mining is a serious business decision, not a hobby with a laptop. It involves real capital, long term planning, and understanding of the specific chain’s economics.</p>
          <p className="text-gray-600 leading-relaxed">No matter which method you choose, the key step is the same. Learn to use a reliable wallet, back up your seed phrase, and move coins into self custody if you want true control.</p>
        </div>
      );
    }

    if (id === 'what-is-self-custody-bitcoin') {
      return (
        <div className="space-y-12">
          <p>Self custody means you personally control the private keys that secure your Bitcoin. No company, exchange, or third party stands between you and your coins.</p>
          <p>If your keys are on your own wallet:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">You can send funds at any time, without asking permission.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Your balance is not an IOU in someone else’s database.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">You are not exposed to their solvency, ethics, or security practices.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">By contrast, when you leave coins on an exchange or custodial service:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">You do not hold the keys.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">You have a claim against the company, not direct control of coins on the chain.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">If they are hacked, go bankrupt, or freeze your account, your access can disappear.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Self custody has responsibilities:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">You must handle backups</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">That means safely storing seed phrases and making sure trusted heirs or processes exist in case something happens to you.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">You must avoid scams and malware</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Never type your seed phrase into random websites or apps. Be cautious with links and downloads, especially around crypto.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">You must choose good tools</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Use reputable wallets and, for larger amounts, consider hardware wallets or multisig setups.</p>
          <p className="text-gray-600 leading-relaxed">Why it is worth it:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Bitcoin was designed for direct ownership.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Self custody aligns with the original purpose, which is to reduce reliance on middlemen and give individuals control over their own money.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">It lowers counterparty risk, which is the risk that someone else fails you.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Exchanges can be useful for trading and conversions, but for long term holding and serious amounts, self custody is usually the safer and more principled option.</p>
        </div>
      );
    }

    if (id === 'bitcoin-vs-ethereum') {
      return (
        <div className="space-y-12">
          <p>Bitcoin and Ethereum are both large blockchain networks, but they have different designs, goals, and trade offs.</p>
          <p>Purpose</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Bitcoin began as peer to peer electronic cash, focused on sound money, secure settlement, and a stable protocol that businesses can build on.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Ethereum was created as a “world computer” for running general purpose smart contracts and decentralized applications.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Data model</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Bitcoin uses a UTXO model. Coins are discrete outputs that can be combined and split. This model is simple to verify and scales well for parallel processing.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Ethereum uses an account based model. Each account has a changing balance and state. This can be convenient for complex contracts but is more state heavy.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Protocol philosophy</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Bitcoin places a lot of importance on a long term stable base protocol and external legal and commercial frameworks on top.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Ethereum has changed its core rules several times, including shifting from proof of work to proof of stake, which places more emphasis on protocol level governance and experimentation.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Smart contracts</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Bitcoin supports scripting and smart contracts through a stack based language and op codes. On scalable implementations, very complex logic can be expressed on chain.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Ethereum was designed from the start for general purpose smart contracts using the Ethereum Virtual Machine and languages like Solidity, so most dApps and tokens today are on Ethereum or similar platforms.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Consensus and security</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Classic Bitcoin uses proof of work, where security comes from miners committing energy and hardware.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Ethereum started with proof of work and later moved to proof of stake, where security comes from locked coins and protocol rules about slashing.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">In short, Bitcoin focuses on being a durable, high integrity foundation for money and data, while Ethereum focuses more on being a flexible platform for programmable assets and applications. Both approaches have benefits and trade offs that users and developers should understand.</p>
        </div>
      );
    }

    if (id === 'what-is-proof-of-work') {
      return (
        <div className="space-y-12">
          <p>Proof of Work (PoW) is the mechanism Bitcoin uses to secure the blockchain and choose which version of history is valid.</p>
          <p>In PoW, miners compete to solve a mathematical puzzle:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">A miner collects transactions and builds a candidate block.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">They repeatedly hash the block header with different inputs (called nonces) until the resulting hash is below a target value set by the network.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Finding such a hash requires huge numbers of attempts, which means real computational work and energy use.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">When a miner finds a valid solution, it broadcasts the block. Other nodes can quickly verify that the work is correct.</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">This process secures Bitcoin in several ways:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Hard to rewrite history</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">To change a past block, an attacker would need to redo the proof of work for that block and all blocks after it, then catch up and overtake the honest chain. If honest miners control most of the total computing power, this is extremely expensive.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Objective chain selection</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Nodes do not rely on trust or voting. They simply follow the chain with the most cumulative proof of work, which is the one that required the most energy and computation to produce.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Economic alignment</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Miners invest heavily in hardware and electricity. Their incentives are to follow the rules and protect the value of the system, because they are rewarded in Bitcoin and fees.</p>
          <p className="text-gray-600 leading-relaxed">Proof of work is sometimes criticized for energy use, but its purpose is clear. It turns energy and computation into a wall that protects the history of transactions. This makes Bitcoin resistant to cheap manipulation and central control.</p>
        </div>
      );
    }

    if (id === 'bitcoin-privacy-vs-anonymity') {
      return (
        <div className="space-y-12">
          <p>Bitcoin is often called anonymous, but a more accurate word is pseudonymous.</p>
          <p>On the blockchain:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">You are represented by addresses, not your real name.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Anyone can see the movement of coins between addresses.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The ledger is public and permanent.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">So, you have pseudonyms (addresses), not complete anonymity.</p>
          <p className="text-gray-600 leading-relaxed">Where privacy comes from:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Using new addresses for different payments makes it harder to link all your activity.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Careful wallet practices and some on-chain techniques can improve privacy.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">On chains with rich scripting and data capabilities, tools can be built to help users manage privacy better.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Where anonymity breaks down:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Exchanges and many services use identity checks. If you withdraw to a personal wallet, they know which address you withdrew to.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Blockchain analysis companies can track patterns and cluster addresses, especially when users reuse addresses or interact with known services.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">If you publicly post an address, anyone can see its history.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">So the reality is:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Bitcoin offers more privacy than a typical bank account that you hand over to every merchant.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">It does not offer perfect anonymity like cash handed over in person.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Good practices can improve privacy, but careless behavior can expose a lot of information.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">For most people, the right framing is this. Bitcoin gives you transparency and control by default, and privacy is something you can actively manage. It is not a magic invisibility cloak, but with smart usage, it can give you a healthier balance between openness and personal financial privacy than many legacy systems.</p>
        </div>
      );
    }

    if (id === 'what-is-satoshi') {
      return (
        <div className="space-y-12">
          <p>A satoshi, often shortened to “sat,” is the smallest unit of bitcoin. It is named in honor of Bitcoin’s creator, Satoshi Nakamoto. One bitcoin is divided into 100 million satoshis, so one sat equals 0.00000001 bitcoin. In dollar terms, the value of a satoshi depends entirely on the current market price of bitcoin. As bitcoin’s price rises and the total supply approaches its fixed limit of 21 million coins, people will naturally use smaller units like sats for everyday amounts. It is a lot easier to say “I paid 50,000 sats” than “I paid 0.0005 bitcoin.”</p>
          <p>Satoshis make it possible to divide bitcoin very finely, which is important for small payments and micro-transactions. They also give users a simple way to talk about value without juggling long strings of decimal places.</p>

          <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6">Why Satoshis Matter</h3>
          <p className="text-gray-600 leading-relaxed">Because one sat is one hundred millionth of a bitcoin, you can represent very small amounts without breaking the unit further. For example, if one bitcoin is worth 10,000 dollars, then:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">1 satoshi is worth 0.0001 dollars (one ten-thousandth of a dollar).</span>
            </li>
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">A 100 dollar purchase would be 1,000,000 satoshis at that price level.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">You can think in whole numbers instead of long decimals, which is easier for most people to read and discuss.</p>
          <p className="text-gray-600 leading-relaxed">The need for satoshis arises from the same basic reason we have cents under a dollar or pennies under a pound. As the base unit becomes more valuable, smaller denominations become necessary for everyday use.</p>
          </section>

          <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6">Naming and the Double-Spend Problem</h3>
          <p className="text-gray-600 leading-relaxed">As was stated above, the name “satoshi” pays tribute to the pseudonymous author of the 2008 white paper “Bitcoin: A Peer-to-Peer Electronic Cash System.” That paper laid out how to solve a core problem for digital money: double spending.</p>
          <p className="text-gray-600 leading-relaxed">With physical cash, you cannot hand the same bill to two different people at the same time. The note is either in your wallet or someone else’s. In digital systems, a balance is just a number in a database. Without strong rules, someone could try to spend the same unit twice, like writing two 100 dollar checks on a 100 dollar account and hoping both are honored by the merchants; one of which will be the victim of theft of the goods that are not actually paid for.</p>
          <p className="text-gray-600 leading-relaxed">Bitcoin prevents this behavior by using a public ledger (the blockchain) and a consensus process. Every valid satoshi transfer is recorded in this shared history. Nodes verify that each satoshi is only spent once, so a user cannot reuse the same unit for multiple transactions. This protection applies whether you are dealing in whole bitcoins or tiny satoshi amounts.</p>
          </section>

          <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6">Using Satoshis in Practice</h3>
          <p className="text-gray-600 leading-relaxed">In the real world, satoshis are what you actually move around when you send or receive bitcoin. You can:</p>
          <ul className="space-y-4">
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
          <p className="text-gray-600 leading-relaxed">Not every merchant takes bitcoin, so it is wise to check who accepts what before you plan to pay in sats.</p>
          <p className="text-gray-600 leading-relaxed">Even though sats are not a separate currency, you can always talk about prices in satoshis instead of fractions of a bitcoin. Many wallets and interfaces let you toggle between Bitcoin and sats display so you can choose whichever unit feels clearer.</p>
          </section>

          <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6">Satoshis and Other Denominations</h3>
          <p className="text-gray-600 leading-relaxed">Different blockchains choose different unit structures. Bitcoin has one base asset, and its smallest unit is the satoshi.</p>
          <p className="text-gray-600 leading-relaxed">Ethereum, for example, uses a different layout. Its smallest unit is called wei:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">1 wei = 0.000000000000000001 ether (one quintillionth of an ether)</span>
            </li>
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">1 gwei = 1,000,000,000 wei</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Both systems let you express very small pieces of the main asset. The exact names and scales differ, so one satoshi has a different monetary value than one gwei, and both move up and down in price as Bitcoin and Ethereum markets change.</p>
          <p className="text-gray-600 leading-relaxed">To convert between sats and dollars in simple terms:</p>
          <ul className="space-y-4">
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

          <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6">How Much Is One Satoshi?</h3>
          <p className="text-gray-600 leading-relaxed">The value of a satoshi is always tied to bitcoin’s price. Examples:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">If 1 Bitcoin = 10,000 dollars, then 1 sat = 0.0001 dollars.</span>
            </li>
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">If 1 Bitcoin = 50,000 dollars, then 1 sat = 0.0005 dollars.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">No matter what the market does, the relationship inside the protocol stays fixed:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">1 bitcoin = 100,000,000 satoshis</span>
            </li>
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">1 satoshi = 0.00000001 bitcoin</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Only the exchange rate between bitcoin and your local currency changes.</p>
          </section>

          <section className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6">The Bottom Line</h3>
          <p className="text-gray-600 leading-relaxed">A satoshi is the smallest unit of bitcoin, and there are 100 million of them in every coin. The unit is named after Satoshi Nakamoto, the inventor of Bitcoin. Talking in sats makes it easier to handle real-world amounts without a sea of zeros after the decimal point. As bitcoin’s price and usage grow, sats are likely to become the main way people quote prices, pay for goods and services, and think about everyday transactions in the Bitcoin economy.</p>
          </section>
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
                <button className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-amber-500 transition-all shadow-xl shadow-black/5 group">
                  <Share2 size={16} className="group-hover:scale-110 transition-transform" /> Share Insights
                </button>
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
