import React, { useState, useEffect, useRef } from 'react'

// ── Leaf SVG decorations ─────────────────────────────────────────────────────
const LeafLeft = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 35 C20 10, 60 5, 115 20" stroke="#93a85a" strokeWidth="1.2" fill="none"/>
    {[15,30,45,60,75,90].map((x, i) => (
      <ellipse key={i} cx={x} cy={35 - i * 2.5 - Math.sin(i) * 3} rx="5" ry="3"
        transform={`rotate(${-20 + i * 8} ${x} ${35 - i * 2.5})`}
        fill="#93a85a" fillOpacity="0.55"/>
    ))}
  </svg>
)

const LeafRight = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
    <path d="M5 35 C20 10, 60 5, 115 20" stroke="#93a85a" strokeWidth="1.2" fill="none"/>
    {[15,30,45,60,75,90].map((x, i) => (
      <ellipse key={i} cx={x} cy={35 - i * 2.5 - Math.sin(i) * 3} rx="5" ry="3"
        transform={`rotate(${-20 + i * 8} ${x} ${35 - i * 2.5})`}
        fill="#93a85a" fillOpacity="0.55"/>
    ))}
  </svg>
)

// ── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Services', 'About', 'Portfolio', 'Contact']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm border-b border-sage-200/50' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home">
          <img src="/logo.png" alt="Craftacode Web Design" className="h-14 w-auto" />
        </a>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="font-sans text-sm tracking-widest uppercase text-bark/70 hover:text-sage-600 transition-colors duration-200">
              {l}
            </a>
          ))}
          <a href="#contact"
            className="font-sans text-sm tracking-widest uppercase bg-sage-500 text-white px-6 py-2.5 rounded-full hover:bg-sage-600 transition-colors duration-200">
            Get In Touch
          </a>
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-6 h-0.5 bg-bark mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-bark mb-1.5"></span>
          <span className="block w-4 h-0.5 bg-bark"></span>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/98 border-t border-sage-200/50 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm tracking-widest uppercase text-bark/70 hover:text-sage-600 transition-colors duration-200 py-1">
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-24 pb-16 bg-cream">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #748d3c 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Leaf accents top */}
      <div className="absolute top-24 left-0 opacity-20 w-48 -rotate-12">
        <LeafLeft />
      </div>
      <div className="absolute top-24 right-0 opacity-20 w-48 rotate-12">
        <LeafRight />
      </div>

      <div className="relative text-center max-w-3xl mx-auto">
        <FadeIn delay={0}>
          <img src="/logo.png" alt="Craftacode Web Design" className="mx-auto h-36 w-auto mb-6" />
        </FadeIn>

        <FadeIn delay={150}>
          <div className="section-divider mb-4">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-500">Local Web Design</span>
          </div>
        </FadeIn>

        <FadeIn delay={250}>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-darkbark leading-tight mb-6">
            Beautiful Websites,<br />
            <em className="text-sage-600 not-italic font-normal">Handcrafted</em> for You
          </h1>
        </FadeIn>

        <FadeIn delay={350}>
          <p className="font-sans font-light text-lg text-bark/70 max-w-xl mx-auto mb-10 leading-relaxed">
            I design and build custom websites for local businesses and creators — with care, intention, and a personal touch you won't find with big agencies.
          </p>
        </FadeIn>

        <FadeIn delay={450}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#portfolio"
              className="font-sans text-sm tracking-widest uppercase bg-sage-500 text-white px-8 py-4 rounded-full hover:bg-sage-600 transition-all duration-200 hover:shadow-lg hover:shadow-sage-200">
              View My Work
            </a>
            <a href="#contact"
              className="font-sans text-sm tracking-widest uppercase border border-sage-400 text-sage-600 px-8 py-4 rounded-full hover:bg-sage-50 transition-all duration-200">
              Let's Work Together
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Bottom leaf decoration */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-40">
        <LeafLeft className="w-20" />
        <div className="w-1.5 h-1.5 rounded-full bg-sage-400"></div>
        <LeafRight className="w-20" />
      </div>
    </section>
  )
}

// ── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect x="4" y="8" width="32" height="22" rx="3" stroke="#748d3c" strokeWidth="1.5"/>
        <path d="M14 30l-2 4h16l-2-4" stroke="#748d3c" strokeWidth="1.5"/>
        <path d="M4 24h32" stroke="#748d3c" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Custom Web Design',
    desc: 'Unique, tailor-made designs that reflect your brand identity and speak directly to your audience.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect x="6" y="4" width="18" height="28" rx="3" stroke="#748d3c" strokeWidth="1.5"/>
        <rect x="18" y="10" width="16" height="24" rx="3" stroke="#748d3c" strokeWidth="1.5"/>
        <path d="M10 12h10M10 17h6" stroke="#748d3c" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Mobile-First Development',
    desc: 'Every site I build looks and works beautifully on any screen size — phones, tablets, and desktops.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#748d3c" strokeWidth="1.5"/>
        <path d="M20 6v14l8 5" stroke="#748d3c" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Fast & Optimized',
    desc: 'Speed matters. I build lean, optimized sites that load fast and rank well in search engines.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <path d="M8 32l8-8 6 6 10-14" stroke="#748d3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="30" cy="12" r="5" stroke="#748d3c" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'SEO & Local Visibility',
    desc: 'Get found by customers in your area. I optimize every site so you show up where it counts.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect x="6" y="8" width="28" height="22" rx="3" stroke="#748d3c" strokeWidth="1.5"/>
        <path d="M14 20l4 4 8-8" stroke="#748d3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Easy to Manage',
    desc: 'Your site, your control. I build with user-friendly CMS tools so you can update content anytime.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <path d="M20 6l3.5 7 7.5 1.1-5.5 5.3 1.3 7.6L20 24l-6.8 3.5 1.3-7.6L9 14.1l7.5-1.1z" stroke="#748d3c" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 32c2.5 1.3 5.2 2 8 2s5.5-.7 8-2" stroke="#748d3c" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Ongoing Support',
    desc: "I'm a local developer — you'll always have a real person to call when you need help or updates.",
  },
]

function Services() {
  return (
    <section id="services" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="section-divider mb-3">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-500">What I Offer</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-darkbark">Services</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="group p-8 rounded-2xl border border-sage-100 hover:border-sage-300 hover:shadow-lg hover:shadow-sage-100/50 transition-all duration-300 bg-cream/40">
                <div className="mb-4 p-3 rounded-xl bg-sage-50 inline-block group-hover:bg-sage-100 transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-serif text-xl font-medium text-darkbark mb-2">{s.title}</h3>
                <p className="font-sans font-light text-bark/70 leading-relaxed text-sm">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-28 px-6 bg-sage-50/50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <FadeIn>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl border border-sage-200 opacity-60"></div>
            <div className="relative rounded-3xl overflow-hidden bg-sage-100 aspect-square flex items-center justify-center">
              {/* Decorative illustration placeholder */}
              <div className="text-center p-12">
                <img src="/logo.png" alt="Craftacode" className="w-48 mx-auto opacity-80 mb-6" />
                <div className="flex justify-center gap-2 opacity-50">
                  <LeafLeft className="w-24" />
                  <LeafRight className="w-24" />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Text side */}
        <FadeIn delay={150}>
          <div>
            <div className="section-divider justify-start mb-3" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="h-px bg-sage-300/60 w-16"></div>
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-500">About Me</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-darkbark mb-6">
              A Local Developer<br />
              <em className="text-sage-600 not-italic">Who Cares</em>
            </h2>
            <p className="font-sans font-light text-bark/70 leading-relaxed mb-4">
              Hi, I'm the person behind Craftacode Web Design. I'm a local website developer who believes every small business deserves a beautiful online presence — without the big agency price tag.
            </p>
            <p className="font-sans font-light text-bark/70 leading-relaxed mb-8">
              I take the time to understand your business, your customers, and your goals before I write a single line of code. The result? Websites that feel personal, perform beautifully, and actually help your business grow.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { num: 'Custom', label: 'Every Project' },
                { num: '100%', label: 'Client Satisfaction' },
                { num: 'Local', label: 'Always Available' },
                { num: '48hr', label: 'Response Time' },
              ].map((stat, i) => (
                <div key={i} className="border-l-2 border-sage-300 pl-4">
                  <p className="font-serif text-3xl font-light text-sage-600">{stat.num}</p>
                  <p className="font-sans text-xs text-bark/60 uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
            <a href="#contact"
              className="inline-block font-sans text-sm tracking-widest uppercase bg-sage-500 text-white px-8 py-4 rounded-full hover:bg-sage-600 transition-all duration-200">
              Work With Me
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Portfolio ────────────────────────────────────────────────────────────────
const projects = [
  { title: 'Bloom Florals', category: 'Local Florist', color: 'bg-rose-50', accent: '#e8a0a0' },
  { title: 'Stone & Grain Bakery', category: 'Food & Bakery', color: 'bg-amber-50', accent: '#d4a85c' },
  { title: 'Hartwell Law', category: 'Professional Services', color: 'bg-slate-50', accent: '#7a8fa0' },
  { title: 'Coastal Yoga Studio', category: 'Health & Wellness', color: 'bg-sky-50', accent: '#7ab8c8' },
  { title: 'Timber & Trowel', category: 'Home Services', color: 'bg-orange-50', accent: '#c47a4a' },
  { title: 'Verde Kitchen', category: 'Restaurant', color: 'bg-green-50', accent: '#6a9e6a' },
]

function Portfolio() {
  return (
    <section id="portfolio" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="section-divider mb-3">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-500">My Work</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-darkbark">Portfolio</h2>
            <p className="font-sans font-light text-bark/60 mt-4 max-w-md mx-auto">
              A selection of websites I've crafted for local businesses just like yours.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={i} delay={i * 70}>
              <div className={`group rounded-2xl overflow-hidden border border-sage-100 hover:shadow-xl hover:shadow-sage-100/60 transition-all duration-400 cursor-pointer`}>
                {/* Mock browser window */}
                <div className={`${p.color} aspect-video relative flex items-center justify-center`}>
                  <div className="w-full px-4">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      {/* Browser bar */}
                      <div className="bg-gray-100 px-3 py-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-300"></span>
                        <span className="w-2 h-2 rounded-full bg-yellow-300"></span>
                        <span className="w-2 h-2 rounded-full bg-green-300"></span>
                        <div className="flex-1 mx-2 bg-white rounded-sm h-3"></div>
                      </div>
                      {/* Content preview */}
                      <div className="p-3" style={{ borderTop: `3px solid ${p.accent}` }}>
                        <div className="h-2 rounded mb-1.5" style={{ backgroundColor: p.accent, opacity: 0.6, width: '60%' }}></div>
                        <div className="h-1.5 bg-gray-200 rounded mb-1 w-full"></div>
                        <div className="h-1.5 bg-gray-200 rounded mb-2 w-4/5"></div>
                        <div className="h-5 rounded-full w-20" style={{ backgroundColor: p.accent, opacity: 0.7 }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-sage-700/0 group-hover:bg-sage-700/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="font-sans text-xs tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity bg-sage-600/80 px-4 py-2 rounded-full">
                      View Project
                    </span>
                  </div>
                </div>
                <div className="p-5 bg-cream/60">
                  <p className="font-sans text-xs tracking-wider uppercase text-sage-500 mb-1">{p.category}</p>
                  <h3 className="font-serif text-lg text-darkbark">{p.title}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "Working with Craftacode was the best decision I made for my business. My website finally looks as good as my products.",
    name: "Sarah M.",
    role: "Owner, Bloom Florals",
  },
  {
    quote: "Professional, responsive, and genuinely cared about getting it right. I've already recommended them to three other local businesses.",
    name: "James T.",
    role: "Manager, Stone & Grain Bakery",
  },
  {
    quote: "Our new website has brought in so many new clients. The investment paid for itself within the first month.",
    name: "Linda R.",
    role: "Principal, Hartwell Law",
  },
]

function Testimonials() {
  return (
    <section className="py-28 px-6 bg-sage-50/60">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="section-divider mb-3">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-500">Kind Words</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-darkbark">What Clients Say</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl p-8 border border-sage-100 shadow-sm relative">
                {/* Quote mark */}
                <span className="font-serif text-6xl text-sage-200 leading-none absolute top-4 left-6">"</span>
                <p className="font-sans font-light text-bark/70 leading-relaxed mb-6 mt-4 relative z-10">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                    <span className="font-serif text-sage-600 font-medium">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-darkbark">{t.name}</p>
                    <p className="font-sans text-xs text-bark/50">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="section-divider mb-3">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-500">Say Hello</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-darkbark mb-4">Let's Build Something<br /><em className="text-sage-600 not-italic">Beautiful Together</em></h2>
            <p className="font-sans font-light text-bark/60 max-w-md mx-auto">
              Ready to grow your business online? I'd love to hear about your project.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Info */}
          <FadeIn className="md:col-span-2">
            <div className="space-y-6">
              {[
                {
                  label: 'Email',
                  value: 'craftacodeai@gmail.com',
                  icon: (
                    <path d="M4 8l16 10L36 8M4 8h32v24H4z" stroke="#748d3c" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                  )
                },
                {
                  label: 'Phone',
                  value: '330-861-2441',
                  icon: (
                    <path d="M10 6h6l2 7-4 2a18 18 0 008 8l2-4 7 2v6a2 2 0 01-2 2C14 29 11 6 10 8a2 2 0 010-2z" stroke="#748d3c" strokeWidth="1.5" fill="none"/>
                  )
                },
                {
                  label: 'Location',
                  value: 'Serving Your Local Area',
                  icon: (
                    <>
                      <path d="M20 4C15 4 11 8 11 13c0 7 9 17 9 17s9-10 9-17c0-5-4-9-9-9z" stroke="#748d3c" strokeWidth="1.5" fill="none"/>
                      <circle cx="20" cy="13" r="3" stroke="#748d3c" strokeWidth="1.5" fill="none"/>
                    </>
                  )
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2.5 bg-sage-50 rounded-xl">
                    <svg viewBox="0 0 40 40" className="w-5 h-5">{item.icon}</svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-wider text-bark/50 mb-0.5">{item.label}</p>
                    <p className="font-sans text-sm text-bark/80">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex gap-3">
                {['Facebook', 'Instagram', 'LinkedIn'].map(s => (
                  <a key={s} href="#"
                    className="w-9 h-9 rounded-full border border-sage-200 flex items-center justify-center hover:bg-sage-50 hover:border-sage-400 transition-colors text-xs font-sans text-sage-500">
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={150} className="md:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-sage-50 border border-sage-100">
                <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                    <path d="M10 20l7 7 13-14" stroke="#748d3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-darkbark mb-2">Thank you!</h3>
                <p className="font-sans font-light text-bark/60">I'll be in touch within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: 'Your Name', type: 'text' },
                  { name: 'email', label: 'Email Address', type: 'email' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block font-sans text-xs uppercase tracking-wider text-bark/60 mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      required
                      value={form[f.name]}
                      onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full border border-sage-200 rounded-xl px-4 py-3 font-sans text-sm text-bark focus:outline-none focus:border-sage-400 bg-cream/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-bark/60 mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full border border-sage-200 rounded-xl px-4 py-3 font-sans text-sm text-bark focus:outline-none focus:border-sage-400 bg-cream/50 transition-colors resize-none"
                  />
                </div>
                <button type="submit"
                  className="w-full font-sans text-sm tracking-widest uppercase bg-sage-500 text-white py-4 rounded-full hover:bg-sage-600 transition-all duration-200 hover:shadow-lg hover:shadow-sage-200">
                  Send Message
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ── Giving Back ──────────────────────────────────────────────────────────────
function GivingBack() {
  return (
    <section className="py-20 px-6 bg-darkbark text-white">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Icon */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-sage-400/50 flex items-center justify-center mb-3">
                <span className="font-serif text-4xl font-light text-sage-400">10%</span>
              </div>
              <span className="font-sans text-xs tracking-widest uppercase text-white/40">of every project</span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-24 bg-white/10 flex-shrink-0"></div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px bg-sage-400/40 w-8"></div>
                <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-400">Giving Back</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-4 leading-snug">
                Business with <em className="text-sage-400 not-italic">Purpose</em>
              </h2>
              <p className="font-sans font-light text-white/60 leading-relaxed mb-5">
                10% of every project's profit is donated to <strong className="text-white/80 font-medium">A21</strong> — a nonprofit working tirelessly to end human trafficking around the world. When you invest in your website, you're also helping protect vulnerable people and restore lives.
              </p>
              <a
                href="https://www.a21.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-sage-400 hover:text-sage-300 transition-colors border border-sage-400/40 hover:border-sage-400 px-5 py-2.5 rounded-full"
              >
                Learn about A21
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-darkbark text-white/70 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-white/10">
          <img src="/logo.png" alt="Craftacode" className="h-16 brightness-0 invert opacity-80" />
          <div className="flex gap-8">
            {['Services', 'About', 'Portfolio', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="font-sans text-xs tracking-widest uppercase text-white/50 hover:text-white/80 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Craftacode" className="h-12 w-auto brightness-0 invert opacity-60" />
            <p className="text-white/40">© {new Date().getFullYear()} Craftacode Web Design. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <LeafLeft className="w-10 opacity-30" />
            <span>Handcrafted with care</span>
            <LeafRight className="w-10 opacity-30" />
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
      <GivingBack />
      <Footer />
    </>
  )
}
