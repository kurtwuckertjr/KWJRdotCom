
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

    // NEW BITCOIN BASICS CURRICULUM ARTICLES (4-23)

    if (id === 'what-is-utxo-bitcoin') {
      return (
        <div className="space-y-12">
          <p>Bitcoin tracks coins using something called UTXOs, which stands for Unspent Transaction Outputs. It sounds technical, but the idea is simple.</p>
          <p>Every Bitcoin transaction has inputs and outputs that work like envelopes holding coins:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Inputs are old envelopes of bitcoin you are opening to pay.</span>
            </li>
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Outputs are new envelopes the transaction creates that hold the amounts for the recipient and your change.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">A UTXO is one of those outputs that has not been spent yet. It is like a labeled “coin” on the ledger with:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">A specific amount of Bitcoin</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">A locking script (rules) that say who can spend it later</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Your wallet’s balance is the sum of all the UTXO envelopes it can unlock.</p>
          <p className="text-gray-600 leading-relaxed">Example:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Someone sends you 0.5 bitcoin. That creates a new UTXO of 0.5 bitcoin that belongs to you.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Later, you spend 0.3 bitcoin. Your wallet will use that 0.5 bitcoin UTXO as an input, then create:</span>
            </li>
          </ol>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">One output of 0.3 bitcoin to the receiver</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">One “change” output of 0.2 bitcoin back to a new address you control</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Now the original 0.5 bitcoin UTXO is spent. The envelope that held it does not exist anymore. There are two new UTXOs: one of 0.3 bitcoin and one of 0.2 bitcoin.</p>
          <p className="text-gray-600 leading-relaxed">This UTXO model has several benefits:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">It makes verification simple, because a node only needs to check that the inputs are valid unspent outputs.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">It supports high parallelism and scaling.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">It gives fine grained control over coins, which helps with privacy and scripting.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">You do not need to manage UTXOs manually. Your wallet does it for you, but understanding them gives you a clearer picture of how Bitcoin really works.</p>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-address') {
      return (
        <div className="space-y-12">
          <p>A Bitcoin address is a string of characters that people use to send you Bitcoin. It is similar to a bank account number, but it is generated by you, not by a bank.</p>
          <p>Under the hood, an address is created in a few steps:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Your wallet creates a private key, a random secret number.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">From that private key, it calculates a public key using one way math.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">It then runs the public key through a set of hashing and encoding steps to produce a shorter, user friendly address.</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">The important points:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Anyone can see the address and send coins to it.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Only the person who holds the matching private key can spend those coins.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">You can create as many addresses as you like.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">To create an address in practice:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Install a reputable Bitcoin wallet.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Follow the setup process and write down your seed phrase backup.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">In the app, tap “Receive” and it will show you a QR code and an address string. That is a fresh address.</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Best practices:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Use a new address for each payment when possible. This improves privacy, since observers cannot easily link all your activity together.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Share your address carefully. It is safe for people to know an address, but scammers sometimes use lookalike addresses, so always copy and paste from your wallet directly.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">The address is your public facing contact point. The private key and seed phrase stay hidden and safe.</p>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-blockchain') {
      return (
        <div className="space-y-12">
          <p>The Bitcoin blockchain is a special type of database that records every transaction ever made with Bitcoin. It is called a “block chain” because it is literally a chain of blocks, and each block contains a batch of transactions.</p>
          <p>Here is how it works:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Transactions are created</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">People send Bitcoin to each other. These transactions are broadcast to the network.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Miners gather transactions into blocks</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Miners collect many transactions into a candidate block. They then compete to solve a proof of work puzzle.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">A new block is added</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">The first miner to solve the puzzle broadcasts its block. Other nodes verify the transactions and the proof of work. If everything is valid, they attach the new block to the end of the chain.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Each block links to the previous one</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Every block includes a reference (a hash) to the block before it. This creates a chain that goes all the way back to the first block, called the genesis block.</p>
          <p className="text-gray-600 leading-relaxed">Why it matters:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Immutability: Once a block is deeply buried under many more blocks, changing it would require enormous computing power. This makes history very hard to rewrite.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Transparency: Anyone can download the blockchain and verify that the rules are being followed.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Coordination: All honest nodes converge on the same chain, with the most proof of work, as the valid history.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">You can think of the blockchain as a shared, append only log that the whole world can inspect and verify. Bitcoin is the system of incentives and rules built around that log.</p>
        </div>
      );
    }

    if (id === 'how-do-bitcoin-transactions-work') {
      return (
        <div className="space-y-12">
          <p>A Bitcoin transaction is the process of moving coins from one set of addresses to another. Here is the high level flow.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">You create the transaction</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Using your wallet, you:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Choose how much Bitcoin you want to send.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Paste or scan the recipient’s address.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The wallet selects one or more UTXOs you control as inputs and creates outputs that pay the recipient and return any change back to you.</span>
            </li>
          </ul>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Your wallet signs it</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">The wallet uses your private key to create digital signatures on the inputs. These signatures prove that you are allowed to spend those specific UTXOs.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">The transaction is broadcast</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Your wallet sends the signed transaction to the Bitcoin network. It is relayed from node to node and reaches miners and other participants.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Nodes validate it</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Each node checks:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The signatures are valid.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The inputs are real, unspent outputs on the blockchain.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The transaction follows the consensus rules (no negative values, proper fees, correct scripts, and so on).</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">If it passes, they hold it in their memory pool (mempool) as a candidate for inclusion in a block.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Miners include it in a block</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Miners pick transactions from the mempool, gather them into a block, and work on the proof of work puzzle. When a miner finds a valid proof, it broadcasts the block.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">The block is accepted</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Other nodes verify the block and add it to their copy of the blockchain. Your transaction is now confirmed.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">One block confirmation means it is in the latest block.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">More confirmations mean the block is deeper in the chain and harder to reverse.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">In practice, on a well scaled chain like BSV, this all happens quickly and can support large volumes of transactions. For the user, it usually feels like sending money with an online payment app, but the rules are enforced by software and miners, not a central company.</p>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-mining') {
      return (
        <div className="space-y-12">
          <p>Bitcoin mining is the process of adding new blocks of transactions to the blockchain and securing the network. It is called “mining” because miners also earn newly created coins as a reward, similar to mining gold.</p>
          <p>Here is what miners actually do:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Collect transactions</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Miners gather valid transactions from the network and assemble them into a candidate block.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Do proof of work</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">To add their block, they must solve a cryptographic puzzle. This involves trying many different inputs until they find a hash that meets the current difficulty target. This work is done by specialized hardware called ASICs.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Broadcast the block</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">When a miner finds a valid block, they send it to the network. Other nodes verify the proof of work and the transactions.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Earn rewards</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">If the block is accepted into the chain, the miner receives:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The block subsidy (new coins created by the protocol).</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The transaction fees paid by users.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Why mining matters:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Security</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Proof of work makes it very expensive to rewrite history. An attacker would need huge amounts of energy and hardware to outcompete honest miners.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Decentralization</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Many independent miners compete. No single party is supposed to control the network.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Ordering and finality</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Miners decide the order of transactions in blocks, giving the system a clear timeline and eventual finality.</p>
          <p className="text-gray-600 leading-relaxed">On scalable networks, mining also becomes a competitive data processing industry, not just a game of speculation. Miners are rewarded for providing real services to users.</p>
        </div>
      );
    }

    if (id === 'what-is-bitcoin-node') {
      return (
        <div className="space-y-12">
          <p>A Bitcoin node is a computer that runs Bitcoin software and participates in the network by verifying and relaying data. Not every node mines, but every node that follows the rules helps keep the system honest.</p>
          <p>Here is what nodes do:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Maintain a copy of the blockchain</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Nodes download and store the current blockchain or at least the parts they need. This lets them independently verify transactions and blocks.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Validate transactions</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">When nodes receive a transaction, they check:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Are the inputs valid unspent outputs?</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Are the signatures correct?</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Do the amounts add up?</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">If a transaction breaks the rules, they reject it and do not relay it further.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Validate blocks</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">When a miner broadcasts a block, nodes verify the proof of work and every transaction inside. Only if the block is valid do they attach it to their chain and pass it on.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Relay data</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Nodes relay valid transactions and blocks to their peers. This helps the network stay connected and up to date.</p>
          <p className="text-gray-600 leading-relaxed">There are different types of nodes:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Full nodes: Store and validate the whole chain.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Pruned or simplified nodes: Store only part of the data, or use proofs from full nodes, to reduce storage needs.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Mining nodes: Full nodes that also construct blocks and compete in proof of work.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Running a node gives you direct insight into the network and lets you verify that the rules are being followed, rather than trusting someone else’s copy of Bitcoin.</p>
        </div>
      );
    }

    if (id === 'what-is-seed-phrase-bitcoin') {
      return (
        <div className="space-y-12">
          <p>A seed phrase (also called a recovery phrase or mnemonic) is a list of 12, 18, or 24 words that backs up your Bitcoin wallet. From this list of words, your wallet can regenerate all the private keys and addresses it uses.</p>
          <p>Here is how it works:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">When you create a new wallet, it generates a large random number.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">This number is converted into a list of words from a fixed dictionary.</span>
            </li>
          </ol>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">That list is your seed phrase. All your wallet keys can be recreated from it.</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Why it is important:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">If you lose your phone or hardware wallet, you can install the same wallet app on a new device, enter the seed phrase, and recover all your coins.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">If someone else gets your seed phrase, they can also recover your coins. It is as powerful as your private keys.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Safe backup tips:</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Write it down by hand</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">Do not store it in plain text on your computer, email, or cloud storage. Those can be hacked.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Keep multiple copies in safe places</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">For example, one in a home safe and one in a safety deposit box. Consider using metal backup plates to resist fire and water.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Never share it with anyone</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">No support agent, exchange, or friend should ever ask for your seed phrase. If someone asks, it is a scam.</p>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="bg-teal-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">Test recovery</span>
            </li>
          </ol>
          <p className="text-gray-600 leading-relaxed">If possible, practice recovering a small test wallet so you are comfortable with the process.</p>
          <p className="text-gray-600 leading-relaxed">The seed phrase is the ultimate backup. Treat it like the master key to your entire Bitcoin life.</p>
        </div>
      );
    }

    if (id === 'what-are-bitcoin-fees') {
      return (
        <div className="space-y-12">
          <p>Every Bitcoin transaction includes a fee paid to miners. The fee is the difference between the total inputs and the total outputs in the transaction. Miners collect these fees as part of their reward for including your transaction in a block.</p>
          <p>Fees exist because:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Miners spend real money on hardware and electricity.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The protocol subsidizes them with new coins for a while, but over time fees become more important.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Fees also help prevent spam by making it costly to flood the network with useless transactions.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Why fees behave differently on BSV vs BTC comes down to block size and capacity.</p>
          <p className="text-gray-600 leading-relaxed">On BTC:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The block size is intentionally limited to a small capacity.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">During busy periods, there is more demand for block space than there is supply.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Users compete for limited space by bidding higher fees.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">This creates volatile fees, sometimes very high, and confirmation delays for low fee transactions.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">On BSV:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The protocol allows very large blocks and focuses on scaling on chain.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Miners can process a much higher volume of transactions.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Because capacity is abundant, there is less competition for space.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Fees can be kept very low and stable, and miners make money on volume rather than high fees per transaction.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">In simple terms:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">BTC behaves like a crowded highway with tolls that spike during rush hour.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">BSV behaves like a multi lane highway that keeps adding lanes so everyday tolls stay low and predictable.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">For regular users and businesses, stable and low fees make it easier to plan and build real world applications.</p>
        </div>
      );
    }

    if (id === 'on-chain-vs-off-chain-bitcoin') {
      return (
        <div className="space-y-12">
          <p>In Bitcoin, on-chain and off-chain describe where a transaction or piece of data is recorded and enforced.</p>
          <p>On-chain means:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The transaction is recorded directly on the blockchain.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">It is validated by nodes and miners according to the consensus rules.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">It becomes part of the permanent public history once confirmed.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Examples of on-chain activity:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Sending coins from one address to another in a standard transaction.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Storing data in transaction outputs.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Smart contract style scripts executed by the Bitcoin protocol.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Off-chain means:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">The transfer or agreement is tracked somewhere else, not directly on the blockchain.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">It might rely on a company, a side network, or a legal contract to enforce who owns what.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Final settlement may or may not eventually touch the main chain.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Examples of off-chain activity:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Balances inside a centralized exchange. They keep an internal ledger and settle on chain in batches.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Payment channels and second layer networks that update balances off-chain and settle later.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">IOUs, vouchers, or wrapped tokens that represent Bitcoin but are not themselves UTXOs on the chain.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">Key differences:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Trust: On-chain transactions rely on network rules and proof of work. Off-chain solutions often add trust in a company, gateway, or protocol.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Finality: On-chain settlements, once deeply confirmed, are hard to reverse. Off-chain records can change based on policies or agreements.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
              <span className="text-gray-600">Scalability: Off-chain methods can sometimes offer speed and convenience, but they trade away some of the transparency and trust minimization that on-chain gives you.</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">In a well designed system, on-chain is the foundation, and off-chain tools are used where they make sense, without undermining the security and clarity of the underlying chain.</p>
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
      return (
        <div className="space-y-12">
          <p className="text-gray-600 leading-relaxed">A comprehensive glossary of Bitcoin and blockchain terminology. Use this reference to navigate the language of the ecosystem.</p>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            A
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Actor</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An actor is a role label for any entity that can take actions in a blockchain system. It is the underlying agent, such as a person, organization, node, smart contract, or device, that can originate, validate, or relay transactions and messages. Unlike an address, which is just a cryptographic identifier, an actor is the real-world or logical entity that may control many addresses or nodes.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Address</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An address is a cryptographic identifier used as a destination or source for payments and messages on a blockchain. It encodes information derived from a public key so that funds can be assigned and later unlocked by the corresponding private key. Unlike a private key, which must remain secret, an address is meant to be shared and is often treated as disposable, with best practice in bitcoin being to use a fresh address for each transaction.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Application-Specific Integrated Circuit (ASIC)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An ASIC is a class of hardware chip designed to perform one specific computation pattern extremely efficiently. In blockchain systems it is typically wired to run a single hash function, such as SHA256, at very high throughput for mining. Unlike a general CPU or GPU, which can run many different programs, an ASIC trades versatility for vastly higher performance and energy efficiency on its target workload.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            B
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Bitcoin</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Bitcoin is a global peer-to-peer electronic cash system and ledger protocol that uses proof-of-work and a UTXO-based transaction model to record ownership and transfer of value. At the conceptual level, “Bitcoin” refers to the network, rules, and data structure, while “bitcoin” refers to the native currency unit whose smallest division is the satoshi. Unlike account-based chains like Ethereum, bitcoin tracks spendable outputs rather than balances tied to a single long-lived account.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Block</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A block is a structured record that groups a set of validated transactions and associated metadata into a single unit for addition to a blockchain. It typically contains a header (including references to the previous block and a Merkle root of transactions) plus a list of transactions that update the chain’s state. Unlike an individual transaction, which changes state locally, a block anchors those transactions into the global history and is referenced by later blocks.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Block, Canonical</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A canonical block is a block that lies on the chain’s selected “best” history, directly or indirectly referenced by subsequent blocks in the active longest or most-work chain. It defines the authoritative state at its height for nodes following the consensus rules. Unlike orphaned or stale blocks, which may be valid but discarded during reorganization, a canonical block remains part of the accepted ledger history.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Block, Genesis</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A genesis block is the first block of a blockchain, with height zero, from which all later blocks derive their linkage. It sets initial parameters such as network configuration, initial allocations, and protocol constants. Unlike later blocks, the genesis block has no previous-block reference and is normally hard-coded into node software.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Blockchain</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A blockchain is a data structure and protocol that stores records as an ordered sequence of blocks, each cryptographically linked to its predecessor by hash. It enforces rules about what constitutes a valid transaction and block, and nodes reject blocks that violate these rules. Unlike a generic append-only log, a blockchain is designed to operate in a decentralized environment where consensus among independent nodes is required.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Block Depth</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Block depth is a relative measure of how far a block is from the tip of the chain in terms of subsequent blocks built on top of it. It reflects how many confirmations or successors separate that block from the most recent block. Unlike block height, which is absolute from the genesis, depth is measured backward from the current head and changes as new blocks are added.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Block Explorer</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A block explorer is an application, typically with a web or GUI front end, that indexes blockchain data and makes it searchable and human-readable. It allows users and tools to query transactions, blocks, addresses, and statistics without running a full node or manual decoding. Unlike a node, which enforces consensus rules, a block explorer is a convenience layer for inspection and analytics.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Block Height</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Block height is the count of blocks from the genesis to a given block, representing its absolute position in the chain. The genesis block has a height of zero, and each valid successor increments the height by one. Unlike block depth, which is relative to the tip, height is a stable identifier for a block’s position in a given branch.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Block Reward</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A block reward is the native-asset payment a protocol grants to the miner or validator that successfully produces a new block, often combining newly issued coins and transaction fees. It is the economic mechanism that funds security and incentivizes participation in block production. Unlike transaction fees, which come from users, the subsidy portion of the block reward comes from inflation defined by the protocol schedule.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">BANKING SECRECY ACT (BSA)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">The BSA is a United States federal statute that regulates financial institutions’ recordkeeping and reporting obligations to combat money laundering and related crimes. It mandates monitoring, customer identification, and suspicious activity reporting for covered entities. Unlike technical blockchain rules, the BSA is a legal framework that applies off-chain but shapes how custodians and exchanges may operate.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">BYZANTINE FAULT TOLERANCE</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Byzantine fault tolerance is a property of a distributed system that allows correct consensus even when some participants behave arbitrarily or maliciously. It guarantees that honest nodes can agree on a single state as long as the proportion of faulty nodes stays below a specific threshold, often one-third. Unlike simple crash fault tolerance, which only handles node failures, BFT explicitly models adversarial behavior and inconsistent messaging.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            C
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">CERTIFICATE AUTHORITY (CA)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A CA is an entity in a public-key infrastructure that issues and signs digital certificates binding public keys to identities. It acts as a centralized trust root for verifying that a domain or subject controls a particular key pair. Unlike blockchain-style trustless verification, a CA operates on a trust-institution model where users rely on the CA’s integrity and processes.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Closed Source</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Closed source describes software whose human-readable source code is not publicly distributed and can only be inspected or modified by its owner or licensees. Users interact with compiled binaries without visibility into internal logic. Unlike open source, closed source designs cannot be independently audited or forked by the broader community.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Coin</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A coin is a native on-chain asset that is directly issued and accounted for by the base protocol of a blockchain. It typically serves as the primary medium of exchange, fee unit, and staking or mining incentive. Unlike many application-level tokens, coins are integral to consensus and are not implemented purely as smart contracts on top of another chain.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Coinbase (Company)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Coinbase is a centralized, regulated cryptocurrency brokerage and exchange platform based in the United States. It provides fiat on- and off-ramps, custody, and trading services for a curated set of digital assets. Unlike decentralized exchanges, Coinbase holds user assets and order books under its own control and operates under traditional financial compliance regimes.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Coinbase (Mining)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">In mining terminology, the coinbase is the special transaction within a block that pays the block reward to a designated address. It has no normal inputs and effectively mints the newly authorized coins plus aggregates transaction fees. Unlike ordinary transactions, the coinbase transaction is protocol-created and can only appear once per block.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Command-Line Interface (CLI)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A CLI is a text-based interaction mode where users issue commands and read responses in a terminal or console. It exposes program functions directly, often with more control and options than graphical tools. Unlike a GUI, a CLI requires familiarity with commands but is favored by developers and automation scripts for precision and scripting.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">CONFIRMATION</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A confirmation is a measure of how many blocks have been built on top of the block containing a given transaction, indicating its embeddedness in the chain history. Each added block exponentially reduces the chance that a competing branch will reorganize it away under normal assumptions. Unlike mere broadcast or mempool presence, confirmed transactions are those anchored in blocks with sufficient depth to be considered practically immutable.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Consensus</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Consensus is the process by which distributed nodes in a blockchain system agree on a single sequence of blocks and the resulting state. It combines rules about block validity with a selection mechanism (such as proof-of-work or proof-of-stake) to pick one branch as canonical when forks occur. Unlike simple voting, blockchain consensus must tolerate network delays and adversarial participants while still converging on one history.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Consortium</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A consortium chain is a permissioned blockchain operated collaboratively by a defined set of organizations rather than the open public. It provides shared, append-only records between known parties while restricting access and write privileges. Unlike fully public chains, consortium blockchains prioritize governance and confidentiality within a controlled membership.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Cryptocurrency</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A cryptocurrency is a common name given to a digitally native asset whose ownership and transfer are secured by cryptographic mechanisms on a distributed ledger. It uses public-key signatures and consensus rules to prevent double-spending without relying on a central issuer. Unlike fiat currency, which rests on legal decree and banking infrastructure, cryptocurrency derives its integrity from protocol-enforced computation and economic incentives.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Cryptography</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Cryptography is a branch of applied mathematics and computer science that designs algorithms for confidentiality, integrity, authenticity, and non-repudiation of data. It underpins digital signatures, hashing, and encryption used across blockchains for securing transactions and keys. Unlike general data structures, cryptographic primitives are defined by rigorous hardness assumptions and security proofs.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Currency</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Currency is a system of standardized units used to denominate and settle debts and prices within an economy. It serves as a medium of exchange, unit of account, and store of value. Unlike a single blockchain token, which may have niche scope, a national currency like the US dollar is backed by legal frameworks and central banking policy.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            D
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">DApp</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A DApp is an application whose core logic runs on a blockchain or similar decentralized network rather than a single server. It uses smart contracts for state and rules, while clients interact via wallets and node interfaces. Unlike traditional web apps that rely on centralized backend databases, DApps derive correctness and persistence from consensus among independent nodes.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Decentralization</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Decentralization is a structural property where control, decision-making, and data storage are distributed across many independent actors instead of a single authority. In blockchain contexts it means no one party can unilaterally change rules or censor valid transactions. Unlike federated or centralized systems, a properly decentralized network continues to operate even if individual actors fail or misbehave.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Decentralized Autonomous Organization (DAO)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A DAO is an organization whose governance rules and asset controls are encoded in smart contracts rather than traditional legal agreements. Members interact by submitting on-chain proposals and votes, and outcomes are enforced automatically by code. Unlike a conventional company, a DAO’s authority structure is transparent in its contract logic and does not rely solely on a board or management team.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Decentralized Finance (DeFi)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">DeFi is a category of financial protocols built on blockchains that implement lending, trading, derivatives, and asset management through smart contracts. Users interact directly with contract code, often providing collateral or liquidity to algorithmic markets. Unlike traditional finance, DeFi services can be non-custodial, composable, and globally accessible without conventional intermediaries.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Directed Acyclic Graph (DAG)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A DAG is a graph structure composed of vertices and directed edges with no cycles, so traversal never returns to a prior node. In blockchain-adjacent systems it is used to model dependencies between transactions, blocks, or data chunks without requiring a single linear chain. Unlike a traditional blockchain, a DAG-based ledger can allow multiple branches to grow concurrently while still enforcing partial ordering.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Double Spend Attack</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A double spend attack is a deliberate attempt by a malicious actor to create two conflicting transactions spending the same coins and convince different counterparties to accept each as valid. The attacker relies on network latency or chain reorganization to have only their preferred transaction end up in the canonical chain. Unlike the general concept of a double spend, which is any conflicting use of the same UTXO, a double spend attack emphasizes the adversarial misuse to defraud others.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            E
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Ether (ETH)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Ether is the native cryptocurrency of the Ethereum network, used to pay gas for transactions and smart contract execution. It is an account-based asset, with balances tracked directly in the global state. Unlike bitcoin’s UTXO model, Ether exists as aggregate balances on addresses and contracts rather than discrete spendable outputs.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Ethereum</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Ethereum is a programmable blockchain that extends the basic transaction model with a general-purpose virtual machine and smart contracts. It supports arbitrary stateful logic through its EVM and has become a primary platform for DeFi, NFTs, and other on-chain applications. Unlike bitcoin, which is optimized for simple, scalable payments, Ethereum’s core design targets rich application logic at the base layer.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Etherscan</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Etherscan is a web-based block explorer and analytics platform specifically for Ethereum and related networks. It provides indexed views of accounts, contracts, transactions, logs, and gas markets. Unlike a generic node, Etherscan adds labeling, search, and decoding features that make Ethereum’s raw data intelligible to developers and users.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Ethereum Enterprise Alliance (EEA)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">The EEA is an industry consortium of companies and institutions collaborating to promote and standardize enterprise uses of Ethereum technology. It coordinates working groups, reference architectures, and shared requirements for business-oriented deployments. Unlike public Ethereum governance, which is open and community-driven, the EEA focuses on enterprise adoption and interoperability across corporate stakeholders.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Ethereum Virtual Machine (EVM)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">The EVM is Ethereum’s deterministic execution environment that processes smart contract bytecode and state transitions. It defines the instruction set, gas costs, and semantics that every node must implement identically for consensus. Unlike a general OS virtual machine, the EVM is purpose-built for blockchain determinism, gas metering, and replayable state updates.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">eWASM</h3>
            <p className="text-gray-600 text-sm leading-relaxed">eWASM is an Ethereum-oriented adaptation of WebAssembly designed as a next-generation execution target for smart contracts. It enables contracts written in multiple languages to compile to a standardized binary format with performance and safety benefits. Unlike the legacy EVM bytecode, eWASM aims to leverage broader WASM tooling and closer-to-native execution.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Exchange</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An exchange is a service that facilitates trading between different cryptocurrencies and often between cryptocurrencies and fiat currencies. It maintains order books, matches trades, and typically holds custody of user deposits. Unlike decentralized exchanges, centralized exchanges operate under corporate control and regulatory oversight.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Exchange, Decentralized</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A decentralized exchange (DEX) is a smart-contract-based trading system where users swap assets directly from their own wallets. Liquidity is usually provided by users through pools or on-chain order books rather than a centralized intermediary. Unlike centralized exchanges, DEXs do not require users to deposit funds into custodial accounts.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            F
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Fiat</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Fiat is government-issued currency declared legal tender and not backed by a physical commodity. Its supply and value are managed through monetary policy rather than a fixed algorithm. Unlike cryptocurrency, fiat relies on legal systems and central banks rather than cryptographic consensus for validation and issuance.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Financial Crimes Enforcement Network (FinCEN)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">FinCEN is a bureau of the U.S. Treasury responsible for enforcing laws related to money laundering, terrorist financing, and other financial crimes. It issues regulations and guidance that affect money services businesses, including many crypto exchanges and custodians. Unlike technical blockchain standards, FinCEN’s authority derives from statutory law and applies through compliance obligations.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Fork</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A fork is a divergence in a blockchain’s history or rules where two or more branches share some common ancestry but then follow different block sequences or protocol versions. Forks can occur naturally from competing blocks or be driven by explicit software upgrades or governance decisions. Unlike a mere temporary chain split, a persistent fork can result in distinct networks and assets if not reconciled.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Fork, Hard</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A hard fork is a protocol change that introduces new rules incompatible with old nodes, such that blocks valid under the new rules may be rejected by software that has not upgraded. This can permanently split the network into separate chains if consensus on the change is not unanimous. Unlike a soft fork, which tightens rules while preserving backward compatibility, a hard fork expands or alters the rule set in non-compatible ways.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">FORK, SOFT</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A soft fork is a protocol change that tightens validation rules so that new blocks are still valid to upgraded nodes and also appear valid to old nodes, as long as miners enforce the new constraints. It relies on majority behavior coordination to enforce the stricter interpretation. This coordination is sometimes labeled malicious if the tightened rules change network behavior in a way that subverts nodes running legacy software. Unlike a hard fork, a soft fork does not necessarily create a lasting chain split if older software continues accepting the stricter blocks.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            G
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Gas</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Gas is an abstract metering unit that measures the computational and storage effort required to execute operations in a smart contract environment. Each opcode or action consumes a fixed or defined amount of gas, which users pay for in the chain’s native token. Unlike transaction size in bytes, gas quantifies logical complexity, preventing infinite loops and resource abuse.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Gas Price</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Gas price is the amount of native token a user is willing to pay per unit of gas consumed by their transaction. It determines priority in block inclusion when miners or validators select among competing transactions. Unlike gas itself, which measures resource usage, gas price expresses the user’s bid in economic terms.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Gossip Protocol</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A gossip protocol is a message dissemination method where each node forwards new information to a subset or all of its peers until it propagates through the network. It achieves eventual consistency without a central broadcaster. Unlike direct client-server broadcasting, gossip scales organically as each participant helps spread data.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Graphical User Interface (GUI)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A GUI is a visual interface that represents program functions with windows, icons, menus, and other graphical elements. It abstracts low-level commands into clickable or touchable interactions for usability. Unlike a CLI, which relies solely on text, a GUI targets ease of use for non-technical users.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            H
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Hash</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A hash is the fixed-size output of a hash function applied to arbitrary input data. It acts as a compact fingerprint that changes drastically with any alteration to the input. Unlike encryption, hashing is one-way and does not allow recovery of the original message from the hash alone.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Hash Collision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A hash collision occurs when two distinct inputs produce the same hash output. It represents a failure of ideal uniqueness for that hash function. Unlike the normal case where different inputs yield different hashes, collisions undermine certain security guarantees such as tamper-evidence and resistance to forgery.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Hashgraph</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Hashgraph is a particular type of distributed ledger structure that combines a gossip protocol with a DAG of events to reach consensus. It uses virtual voting based on message histories instead of traditional proof-of-work or proof-of-stake. Unlike a linear blockchain, hashgraph maintains a more complex event graph to optimize throughput and latency.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Hashrate</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Hashrate is the number of hash function evaluations a miner or network can perform per second. It quantifies raw proof-of-work capacity for a given algorithm. Unlike clock speed alone, hashrate directly measures performance on the specific mining function.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Hash Function</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A hash function is a deterministic algorithm that maps input data of arbitrary length to a fixed-length output in a way that is designed to be collision-resistant and preimage-resistant. It is used in blockchains to link blocks, build Merkle trees, and identify data succinctly. Unlike general compression, cryptographic hash functions are engineered to resist intentional manipulation.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Hexadecimal Notation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Hexadecimal notation is a base-16 representation of numbers using digits 0–9 and letters A–F. It provides a compact, human-readable format for binary data like hashes, keys, and addresses. Unlike decimal notation, hex aligns cleanly with byte and nibble boundaries in computer systems.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Hyperledger</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Hyperledger is a collection of open-source enterprise blockchain frameworks and tools hosted by the Linux Foundation. It provides modular components for building permissioned ledgers and consortium networks. Unlike public chains like bitcoin, Hyperledger projects target private, business-oriented deployments with configurable consensus and identity models.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            I
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Initial Coin Offering (ICO)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An ICO is a fundraising mechanism where a project sells newly issued tokens to early backers in exchange for established cryptocurrencies or fiat. The tokens typically represent utility or speculative value in a future ecosystem. Unlike a traditional IPO, ICOs often occur before a working product and historically have operated in more ambiguous regulatory territory.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Immutability</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Immutability is the property of data that cannot be altered once written without detection or prohibitive cost. In blockchains this is approximated by chaining blocks with proof-of-work or similar, making rewrites economically or computationally unfeasible. Unlike ordinary database entries, which administrators can edit directly, immutable records require constructing an explicit, traceable new history.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            J
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Java</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Java is a general-purpose, object-oriented programming language designed for portability across platforms via the Java Virtual Machine. It is widely used for server-side systems, enterprise applications, and Android development. Unlike JavaScript, which runs primarily in browsers, Java typically compiles to JVM bytecode and runs in a separate runtime.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">JavaScript</h3>
            <p className="text-gray-600 text-sm leading-relaxed">JavaScript is a dynamic, high-level programming language standardized as ECMAScript and originally designed for scripting in web browsers. It now runs on servers and tools via runtimes like Node.js and is commonly used to interact with blockchain nodes and wallets. Unlike Java, JavaScript is prototype-based and interpreted or JIT-compiled within host environments.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            M
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Mainnet</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Mainnet is the primary, production blockchain network for a given protocol where real economic value is at stake. It runs the canonical version of the software and consensus rules used by most participants. Unlike testnets, mainnets are not intended for experimentation and carry real financial risk.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Merkle Proof</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A Merkle proof is a minimal set of hashes that allows a verifier to confirm that a particular leaf belongs to a specific Merkle root. It reconstructs the path from the leaf to the root by iteratively hashing sibling nodes. Unlike downloading the entire tree, a Merkle proof provides membership verification with logarithmic-size data.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Merkle Tree</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A Merkle tree is a binary (or k-ary) tree structure where leaves contain hashes of data items and internal nodes store hashes of their children, culminating in a single root hash. It enables efficient integrity checks and membership proofs for large sets of data such as all transactions in a block. Unlike a flat list of hashes, a Merkle tree supports concise proofs and incremental verification.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Merkle Root</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A Merkle root is the top-level hash produced by aggregating all leaf hashes in a Merkle tree. It uniquely commits to the exact set and order of underlying data items under the chosen hash function. Unlike a single transaction hash, the Merkle root anchors an entire batch of data in one compact value.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Metamask</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Metamask is a browser-extension and mobile wallet that manages Ethereum-compatible keys and injects web3 APIs into web pages. It lets users sign transactions, interact with DApps, and manage accounts without running a full node. Unlike hardware wallets, Metamask stores keys in software within the user’s browser or device.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Miner</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A miner is an actor that assembles candidate blocks and participates in proof-of-work or other consensus processes to add them to the chain. They validate transactions, solve consensus puzzles, and claim block rewards. Unlike ordinary nodes that only relay and verify, miners actively compete or are selected to extend the ledger.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Miner, CPU</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A CPU miner uses a general-purpose central processing unit to perform mining computations. It can run algorithms that require sequential or complex branching logic unsuited to massive parallelization. Unlike GPU or ASIC miners, CPU miners are usually much slower on simple hash puzzles but more flexible for compute-intensive algorithms.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Miner, GPU</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A GPU miner uses a graphics processing unit to perform large numbers of parallel hashing or arithmetic operations for mining. It excels at algorithms that can be broken into many identical, independent tasks. Unlike ASIC miners, GPUs remain programmable for multiple algorithms, but they are less efficient on any single specialized function.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Miner, ASIC</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An ASIC miner uses custom-designed chips dedicated to a specific mining algorithm, such as SHA256 for bitcoin. It delivers the highest hashrate per watt and per dollar on that algorithm. Unlike GPU miners, ASIC miners are tied to a narrow function and become obsolete if the algorithm or economics change significantly.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Mining</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Mining is the process of producing new blocks in a proof-of-work or similar consensus system by validating transactions and solving computational puzzles. It secures the network by making it costly to rewrite history while rewarding honest participants with block rewards and fees. Unlike simple transaction relaying, mining involves capital investment in hardware and energy to participate in block creation.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Mining Pool</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A mining pool is a coordinated group of miners who aggregate their hashpower and share block rewards proportionally to contributed work. It reduces income variance for individual miners while centralizing block template creation. Unlike solo mining, pooled mining means most blocks originate from a few large pool operators.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Monero (XMR)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Monero is a privacy-focused cryptocurrency that obscures transaction details using ring signatures, stealth addresses, and confidential amounts. It aims to make sender, recipient, and value hard to trace on-chain. Unlike bitcoin, which has transparent UTXOs by default, Monero’s design makes meaningful chain analysis significantly harder.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Money Transmitting</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Money transmitting is the regulated activity of receiving funds from one party and transmitting them to another as an intermediary. In many jurisdictions it triggers licensing, reporting, and compliance obligations. Unlike direct peer-to-peer transfers, money transmission involves a third party temporarily controlling funds.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            N
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Network</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A network is a set of nodes and links through which messages and data propagate according to defined protocols. In blockchain contexts it refers to the collection of participating peers that share blocks, transactions, and state information. Unlike a single node, the network’s emergent behavior defines consensus and availability.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Node</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A node is a software instance connected to a blockchain network that participates in propagating and validating data. It enforces protocol rules on received blocks and transactions and maintains a local view of the ledger. Unlike a wallet that may only sign and broadcast transactions, a node checks other participants’ messages against consensus rules.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Node, Full</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A full node is a node that downloads and verifies all blocks and transactions according to the protocol from genesis onward. It can independently compute the current state without trusting external sources. Unlike light nodes, full nodes do not rely on simplified proofs from other peers for validation. Some definitions require a node to build blocks to be considered "full nodes."</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Node, Light</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A light node is a node that tracks only block headers and selected data, using SPV or similar methods to verify transactions without storing the full chain. It reduces storage and bandwidth requirements at the cost of relying more on other nodes’ responses. Unlike full nodes, light nodes cannot fully rederive state on their own.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            O
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Opcode</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An opcode is a low-level instruction code that tells a virtual machine or processor which operation to perform. In bitcoin Script or the EVM, opcodes implement arithmetic, stack manipulation, flow control, and cryptographic checks. Unlike high-level language constructs, opcodes are executed directly by the interpreter with fixed semantics and gas or resource costs.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Open Source</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Open source refers to software whose source code is publicly available and licensed to allow inspection, modification, and redistribution. It enables community review, forkability, and collaborative development. Unlike closed source, open code can be audited for security and correctness by anyone.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Oracle (Company)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Oracle is a commercial software vendor known for its database products and enterprise middleware, as well as for originating the Java language. It operates in traditional enterprise IT rather than blockchain infrastructure. Unlike blockchain “oracles,” the company is not itself a cryptographic data-bridge service.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Oracle (Service)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An oracle service is middleware that feeds external, off-chain data into on-chain smart contracts in a verifiable way. It bridges blockchains with real-world signals like prices, weather, or events that the chain cannot observe directly. Unlike pure on-chain computation, oracles introduce trusted or partially trusted data sources into the system.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            P
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Peer-to-Peer (P2P)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">P2P describes architectures where participants connect directly to one another without a central hub, exchanging data and services among equals. Bitcoin’s network layer is P2P, with each node relaying transactions and blocks it learns about. Unlike client–server models, P2P networks distribute both workload and authority across many peers.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Private Key</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A private key is a secret numerical value in a public-key cryptosystem that grants control over corresponding addresses and enables digital signatures. It is used to sign transactions so that the network can verify authorization without revealing the key itself. Unlike a public key or address, a private key must never be shared, as disclosure allows full control over associated funds.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">PRIVATE KEY INFRASTRUCTURE (PKI)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A PKI is a framework of hardware, software, policies, and procedures that manages key pairs and certificates for identity and authentication. It coordinates issuance, revocation, and validation of bindings between keys and subjects. Unlike ad hoc key usage in many wallets, PKI formalizes trust chains through certificate authorities and standardized protocols.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">PROOF-OF-LIQUIDITY</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Proof-of-liquidity is a mechanism where a trusted auditor or on-chain process attests that an issuer holds sufficient backing assets for a pegged token. It typically produces cryptographic or signed evidence tying reserves to circulating supply. Unlike proof-of-work or proof-of-stake, it secures claims about backing, not block production.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Proof-of-Stake (PoS)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">PoS is a class of consensus mechanisms where block production rights are allocated probabilistically based on the amount of native tokens staked by validators. Security rests on the economic cost of misbehavior via slashing or forfeiture of stake. Unlike proof-of-work, PoS relies on capital lockup rather than energy expenditure.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Proof-of-Stake, Delegated (DPoS)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">DPoS is a variant of PoS where token holders vote to elect a limited set of block producers who actually create blocks on behalf of the stakeholders. Voting weight typically scales with stake, and producer sets can change over time. Unlike pure PoS with many direct validators, DPoS concentrates block production into a smaller, elected group.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Proof-of-Work (PoW)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">PoW is a consensus mechanism where participants compete to solve computational puzzles whose difficulty can be tuned, and the winner earns the right to append the next block. It ties block creation to verifiable energy and hardware expenditure, making large-scale attacks costly. Unlike PoS, PoW security is anchored in external resource burn rather than locked capital.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">PROOF-OF-WORK, DELEGATED (DPOW)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">DPoW extends PoW by allowing the entity that found a valid proof to delegate block-creation rights to another actor. The solver demonstrates computational work but may not be the final block author. Unlike standard PoW, DPoW separates the roles of puzzle-solving and block assembly.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Public Key</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A public key is the non-secret counterpart to a private key in asymmetric cryptography, mathematically linked so signatures can be verified. It can be shared widely to receive funds or encrypted messages. Unlike an address, which is often a hashed or encoded derivative, the public key itself is used directly in signature verification.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            R
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Ring Signature</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A ring signature is a type of digital signature that proves a signer belongs to a specific group of possible signers without revealing which member signed. Verification confirms that one key in the ring authorized the message, but not which one. Unlike a standard signature, which binds to a single known key, ring signatures provide signer ambiguity for privacy.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Ripple</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Ripple is a payment-focused blockchain and associated network designed to connect banks, payment providers, and exchanges for cross-border transfers. Its protocol uses a consensus mechanism distinct from PoW or PoS and centers on institutional gateways. Unlike retail-oriented cryptocurrencies, Ripple’s emphasis is on interbank settlement and liquidity.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            S
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Scalability</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Scalability is the ability of a blockchain or protocol to maintain acceptable performance as transaction volume, users, or data size grow. It considers metrics like throughput, latency, storage, and bandwidth under load. Unlike raw correctness, scalability concerns how well a system handles real-world scale without degradation.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Scatter</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Scatter is a multi-chain wallet and identity manager that supports networks like Ethereum, EOS, and bitcoin. It handles key storage, transaction signing, and DApp integration. Unlike a single-chain wallet, Scatter aims to unify user identity and signing across several protocols.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Secure Hash Algorithm (SHA)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">SHA refers to a family of cryptographic hash functions standardized by NIST and originally designed by the NSA. Each variant (such as SHA1, SHA256) specifies output size and internal structure. Unlike non-cryptographic hashes, SHAs are designed to resist collisions and preimage attacks.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Securities and Exchange Commission (SEC)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">The SEC is a U.S. federal agency tasked with regulating securities markets and enforcing securities laws. It evaluates whether certain tokens qualify as securities and oversees compliant offerings and trading platforms. Unlike technical protocol bodies, the SEC shapes crypto markets through legal definitions and enforcement.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Security Token Offering (STO)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An STO is a token sale in which the token is explicitly treated as a regulated security under applicable law. It typically restricts participation to accredited investors and uses compliant platforms for issuance and trading. Unlike an unregistered ICO, an STO operates within formal securities frameworks.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">SHA256</h3>
            <p className="text-gray-600 text-sm leading-relaxed">SHA256 is a specific SHA family member that produces a 256-bit hash output from arbitrary input. It is used in bitcoin for block hashing, transaction IDs, and parts of address generation. Unlike shorter hashes like SHA1, SHA256 offers stronger resistance to brute-force and collision attacks.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Simple Agreement for Future Tokens (SAFT)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A SAFT is a contractual instrument where investors fund a project in exchange for a promise of future token allocation once the network is live. It models token sales after SAFE agreements used in equity financing but denominates claims in tokens instead of shares. Unlike direct token sales, SAFTs separate the fundraising phase from the token’s eventual issuance.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Solidity</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Solidity is a high-level, contract-oriented programming language targeting the EVM. It resembles C++ and JavaScript syntactically and compiles down to EVM bytecode. Unlike Vyper, which emphasizes simplicity and formal verifiability, Solidity prioritizes flexibility and developer familiarity.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Smart Contract</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A smart contract is code deployed on a blockchain that maintains state and enforces rules autonomously when invoked by transactions. It executes deterministically on every validating node, ensuring consistent results. Unlike off-chain contracts, smart contracts are self-enforcing and transparent in their logic to anyone reading the chain.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">STATE MACHINE</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A state machine is a computation model where a system occupies one of a finite set of states and transitions between states via defined inputs and rules. Blockchains can be viewed as replicated state machines, with each block applying transactions that move the global state forward. Unlike a Turing machine, a finite state machine does not assume infinite tape or unbounded memory.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            T
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Tangle</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A tangle is a DAG-based consensus structure where each new transaction references and validates one or more previous transactions. Security and confirmation arise from cumulative references rather than linear block chains. Unlike traditional blockchains, tangles avoid fixed-size blocks and can allow more fluid parallel issuance.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Testnet</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A testnet is a blockchain network that mirrors a mainnet’s protocol but uses valueless tokens and relaxed constraints for development and experimentation. Developers use it to test applications and upgrades without risking real funds. Unlike mainnet, testnet failures and exploits do not carry direct economic consequences.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Token</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A token is a digital asset unit recorded on a ledger, often implemented as a smart contract rather than a base-layer currency. It can represent utility, rights, access, or claims in a specific application or ecosystem. Unlike a native coin, which is intrinsic to consensus, many tokens are layered on top of an existing chain like Ethereum.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Token, Non-Fungible (NFT)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">An NFT is a token designed so that each unit is uniquely identifiable and not interchangeable on a one-to-one basis with others of the same type. It is commonly used to represent distinct digital or physical items such as art, tickets, or deeds. Unlike fungible tokens, where units are identical, NFTs encode per-token metadata or identifiers.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">TOKEN, SECURITY</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A security token is a token that represents regulated investment interests, such as equity, debt, or revenue share, in compliance with securities law. It encodes ownership rights and often transfer restrictions directly into its logic or registry. Unlike utility tokens, which focus on access or usage within a product, security tokens are explicitly tied to financial ownership and returns.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Token, Stablecoin</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A stablecoin token is a cryptocurrency designed to track the value of another asset, usually a fiat currency like the US dollar. It maintains its peg using mechanisms such as collateral reserves, algorithms, or arbitrage incentives. Unlike volatile native coins, stable tokens aim to minimize price fluctuation for transactional or accounting convenience.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Token, Utility</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A utility token is a token that grants access to a product, service, or function within a specific application ecosystem. It is intended to be consumed or used as “fuel” rather than primarily held as an investment. Unlike security tokens, utility tokens are not meant to confer ownership or profit rights, though in practice the line can blur.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Tokenization</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Tokenization is the process of mapping rights, assets, or business logic into digital tokens recorded on a ledger. It allows physical goods, financial instruments, or entitlements to be represented, traded, and programmed on-chain. Unlike simple database entries, tokenized representations can inherit blockchain properties like programmable transfers and shared verifiability.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Total-Complete</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Total-complete refers to programming languages or systems where all functions are guaranteed to terminate and cannot express infinite loops. This constraint allows stronger static analysis and optimization. Unlike Turing-complete languages, total-complete systems trade expressiveness for decidability and safety.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Transaction</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A transaction is a discrete operation submitted to a blockchain that proposes changes to the ledger state, such as transferring funds or invoking a contract. It carries inputs, outputs, and metadata needed for validation and execution. Unlike blocks, which bundle many operations, a transaction is the atomic unit of state change from a user’s perspective.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Transaction Fee</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A transaction fee is the amount of native token attached to a transaction as compensation to miners or validators for including and processing it. It signals priority when block space is limited and funds network operation. Unlike the transaction amount, which moves value between users, the fee is consumed by the protocol’s security providers.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">TRANSACTION POOL</h3>
            <p className="text-gray-600 text-sm leading-relaxed">The transaction pool (mempool) is the set of valid but unconfirmed transactions known to a node awaiting inclusion in a block. Nodes share and manage these pools according to local policies like fee thresholds and size limits. Unlike the blockchain itself, the pool’s contents are ephemeral and may differ across nodes.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Trustless</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Trustless describes systems where participants do not need to rely on each other’s honesty or on a central authority, because protocol rules and cryptography enforce correct behavior. Verification replaces trust, as nodes can independently check proofs or signatures. Unlike traditional arrangements that hinge on reputation or contracts alone, trustless designs minimize the damage a bad actor can inflict without broad collusion.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Turing-Complete</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Turing-complete refers to a programming system capable of simulating any Turing machine, given enough time and memory. It means the language can express arbitrary algorithms, including loops and conditional branching without predefined limits. Unlike total-complete systems, Turing-complete ones can encode non-terminating or undecidable behaviors.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Turing-Machine</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A Turing machine is an abstract computation model consisting of a finite control (states), an infinite tape of cells, and a read/write head that moves along the tape according to transition rules. It formalizes what it means for a function to be computable. Unlike a finite state machine, a Turing machine assumes unbounded memory via its tape.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            U
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Unspent Transaction Output (UTXO)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A UTXO is a discrete, spendable output from a prior transaction that has not yet been referenced as an input in any later transaction. It represents a specific quantity of coin that can be spent only by satisfying its locking conditions. Unlike account balances, which aggregate value, UTXOs treat funds as individual “coins” that are fully consumed and re-created in each spend.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            V
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Virtual Machine (VM)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A VM is an abstract computing environment that emulates a complete machine or runtime on top of underlying hardware or another OS. It isolates programs and provides a standardized instruction set. Unlike native execution, VM execution adds a translation layer but improves portability and security.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Vyper</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Vyper is a Python-inspired smart contract language for the EVM that emphasizes simplicity, auditability, and formal verifiability. It intentionally omits certain complex features to reduce attack surface. Unlike Solidity, which is feature-rich and flexible, Vyper focuses on safer, more restrictive constructs.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            W
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Wallet</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A wallet is software or hardware that manages private keys and derives addresses for interacting with blockchains. It signs transactions locally so that users can authorize spends without exposing their keys. Unlike an exchange account, a non-custodial wallet gives the user direct control over their cryptographic keys.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Wallet, Multisignature</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A multisignature wallet is a wallet whose funds are locked under a script requiring multiple independent signatures to authorize a spend. It enforces M-of-N approval policies at the protocol level. Unlike single-key wallets, multisig setups distribute control among several parties or devices to reduce single-point-of-failure risk.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Web Assembly (WASM)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">WASM is a low-level binary instruction format designed for efficient, sandboxed execution in web browsers and other hosts. It allows languages like C++ or Rust to compile to a compact, portable runtime. Unlike JavaScript, WASM is meant as a compilation target, not primarily a human-authored language.</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-8 mt-16">
            Z
          </h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm mb-2">Zero-Knowledge (ZK) Proof</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A ZK proof is a cryptographic protocol that lets a prover convince a verifier that a statement is true without revealing any information beyond that fact. It is used to demonstrate possession of secrets or correctness of computations while preserving privacy. Unlike standard proofs that expose all intermediate data, ZK proofs intentionally hide the underlying witness.</p>
          </div>
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
