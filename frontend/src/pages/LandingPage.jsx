import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ---------- Chat Demo Component (unchanged, same as before) ----------
const SCRIPT = [
  { from: "user", text: "Hi! Do you have eggless cakes?" },
  { from: "bot", text: "Yes 🎂 All our cakes can be made eggless on request — same price." },
  { from: "user", text: "What time do you close today?" },
  { from: "bot", text: "We're open till 9:30 PM today. Last order for fresh cakes is 8:30 PM." },
  { from: "user", text: "Can I customize one for tomorrow?" },
];

function ChatDemo() {
  const [shown, setShown] = useState([]);
  const [typing, setTyping] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i >= SCRIPT.length) {
        timeoutRef.current = setTimeout(() => {
          setShown([]);
          i = 0;
          tick();
        }, 4000);
        return;
      }
      const msg = SCRIPT[i];
      if (msg.from === "user") {
        timeoutRef.current = setTimeout(() => {
          setShown((s) => [...s, msg]);
          i++;
          tick();
        }, 1500);
      } else {
        setTyping(true);
        timeoutRef.current = setTimeout(() => {
          setTyping(false);
          setShown((s) => [...s, msg]);
          i++;
          timeoutRef.current = setTimeout(tick, 2500);
        }, 2000);
      }
    };
    timeoutRef.current = setTimeout(tick, 1000);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-r from-brand-purple to-brand-blue opacity-30 blur-3xl" />
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-3 bg-gradient-to-r from-brand-purple to-brand-blue px-4 py-3 text-white">
          <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">V</div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-tight">Sweet Crumbs Bakery</p>
            <p className="text-[11px] opacity-90">powered by Vorthix · online</p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(255,255,255,0.25)]" />
        </div>
        <div
          className="h-[360px] space-y-2 overflow-hidden px-3 py-4"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, rgba(108,59,212,0.15), transparent 40%), radial-gradient(circle at 80% 90%, rgba(27,152,255,0.15), transparent 40%)",
            backgroundColor: "rgba(5,8,22,0.4)",
          }}
        >
          <AnimatePresence initial={false}>
            {shown.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-snug shadow-sm ${
                    m.from === "user"
                      ? "rounded-br-md bg-gradient-to-r from-brand-purple to-brand-blue text-white"
                      : "rounded-bl-md bg-white/10 backdrop-blur-md text-white border border-white/10"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md bg-white/10 backdrop-blur-md px-4 py-3 shadow-sm border border-white/10">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="block h-1.5 w-1.5 rounded-full bg-gray-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="border-t border-white/10 bg-white/5 px-3 pb-3 pt-2">
          <button className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs font-medium text-purple-300 transition hover:bg-purple-400/20">
            <i className="fas fa-user text-[10px]" />
            Talk to a human
          </button>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <input
              readOnly
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500 text-white"
            />
            <button className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-md transition hover:scale-105 active:scale-95">
              <i className="fas fa-paper-plane text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- FAQ Item ----------
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="border border-white/10 rounded-2xl px-6 py-4 cursor-pointer hover:border-purple-400/30 transition-all duration-300 bg-white/5 backdrop-blur-md hover:bg-white/10"
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white text-sm sm:text-base">{q}</span>
        <i className={`fas fa-${open ? "minus" : "plus"} text-purple-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <motion.p
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mt-3 text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-3"
        >
          {a}
        </motion.p>
      )}
    </div>
  );
}

// ---------- Main Page ----------
const STEPS = [
  { num: "01", icon: "fa-file-alt", title: "Add your FAQs", desc: "Paste text — menus, schedules, price lists." },
  { num: "02", icon: "fa-flask", title: "Test the bot live", desc: "Toggle the preview, ask anything, tweak answers in seconds." },
  { num: "03", icon: "fa-code", title: "Copy & paste embed", desc: "One line of code goes on your site, Linktree, or bio link." },
];

const FAQS = [
  { q: "Is Vorthix really free?", a: "Yes! 100% free. No credit card, no hidden charges." },
  { q: "Do I need to know how to code?", a: "Not at all! Just paste your FAQs, copy the embed code, done." },
  { q: "How does Vorthix know my business?", a: "You upload your FAQ text or PDF. The AI only answers from that data — nothing made up." },
  { q: "Can my customers reach a real person?", a: "Yes! If the bot can't answer, it shows a 'Talk to Human' button automatically." },
  { q: "Will it work on mobile?", a: "Absolutely. The chat widget is fully mobile-responsive and WhatsApp-style." },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen font-sans text-white overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 z-[-2] bg-[#050816]" />
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(circle,rgba(27,152,255,0.25),rgba(108,59,212,0.15),transparent_70%)] blur-[100px]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,rgba(27,152,255,0.03)_1px,transparent_3px,transparent_40px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(27,152,255,0.25)_0%,rgba(108,59,212,0.18)_25%,transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050816]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center text-white font-bold text-sm">V</div>
              <span className="font-bold text-xl bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Vorthix</span>
            </div>
            <div className="hidden sm:flex items-center gap-8 text-sm text-gray-400 font-medium">
              <a href="#how" className="hover:text-purple-400 transition-colors">How it works</a>
              <a href="#demo" className="hover:text-purple-400 transition-colors">Live Demo</a>
              <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
            </div>
            <Link to="/admin" className="bg-gradient-to-r from-brand-purple to-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Get Started Free
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-purple-400/10 border border-purple-400/30 text-purple-300 text-xs font-bold px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live in 5 minutes — no credit card required
            </span>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              AI-powered <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                customer support
              </span>{" "}
              for small businesses
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Turn your FAQs into a 24/7 chat assistant. No coding, no monthly fees — just copy‑paste and you’re live.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/admin" className="bg-gradient-to-r from-brand-purple to-brand-blue text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                <i className="fas fa-robot mr-2" /> Create your free bot
              </Link>
              <a href="#demo" className="border border-white/20 text-gray-300 font-semibold px-8 py-4 rounded-2xl text-lg hover:border-purple-400/50 transition-all">
                See it in action
              </a>
            </div>
          </motion.div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">How it works</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4">
                Three simple steps to launch your AI chatbot
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map((step, idx) => (
                <motion.div
                  key={step.num}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 40 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-purple-400/30 hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className="text-5xl text-purple-400 mb-6">
                    <i className={`fas ${step.icon}`} />
                  </div>
                  <span className="text-3xl font-black text-white/10">{step.num}</span>
                  <h3 className="text-2xl font-bold mt-2 mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section id="demo" className="py-20 px-6 bg-[#050816]/50 backdrop-blur-md border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Interactive Demo</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4">
                See Vorthix in action
              </h2>
              <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                This is how your customers will chat with your business — in real time, with natural answers.
              </p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left side – text */}
              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-check text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Understands your business</h4>
                      <p className="text-gray-400 text-sm">Trained only on your FAQs — never makes up answers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Works 24/7</h4>
                      <p className="text-gray-400 text-sm">Even when you’re sleeping, your customers get instant answers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-shield-alt text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">No coding required</h4>
                      <p className="text-gray-400 text-sm">Just paste your FAQs, copy an embed code, and you're live.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side – Chat Demo Widget */}
              <div className="flex justify-center">
                <ChatDemo />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4">
                Frequently asked questions
              </h2>
              <p className="text-gray-400 mt-4">Everything you need to know about Vorthix.</p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {FAQS.map((faq, idx) => (
                <FAQItem key={idx} q={faq.q} a={faq.a} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-brand-purple to-brand-blue rounded-3xl p-12 text-center text-white shadow-2xl shadow-purple-500/20"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to help your customers?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Create your Vorthix bot in under 5 minutes. No credit card, no contract — just better support.
            </p>
            <Link
              to="/admin"
              className="inline-block bg-white text-brand-purple font-black px-10 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Get started free <i className="fas fa-arrow-right ml-2" />
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center text-white font-bold text-xs">V</div>
            <span className="font-bold text-lg bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Vorthix</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 Vorthix. Made for small businesses, big conversations.</p>
        </footer>
      </div>
    </div>
  );
}