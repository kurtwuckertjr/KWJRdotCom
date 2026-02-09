
import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { Category } from '../types';
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": "Kurt Wuckert Jr.",
      "jobTitle": authorTitle,
      "url": "https://kurtwuckertjr.com",
      "image": "https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/main/public/Kurtface.jpg"
    },
    "publisher": {
      "@type": "Person",
      "name": "Kurt Wuckert Jr.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/main/public/Kurtface.jpg"
      }
    },
    "datePublished": post.date,
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

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
