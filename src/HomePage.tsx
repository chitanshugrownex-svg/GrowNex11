import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, MessageSquare, Phone, Mail, MapPin, X, Instagram, Linkedin, Facebook, Globe, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GrowNexLogo } from './components/GrowNexLogo';
import PortfolioSection from './components/PortfolioSection';

const getAssetURL = (path: string) => {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL || '/';
  return base + path.replace(/^\//, '');
};

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91 (India)", placeholder: "98765 43210" },
  { code: "+1", label: "🇺🇸 +1 (USA)", placeholder: "(555) 012-3456" },
  { code: "+44", label: "🇬🇧 +44 (UK)", placeholder: "7911 123456" },
  { code: "+971", label: "🇦🇪 +971 (UAE)", placeholder: "50 123 4567" },
  { code: "+1-CA", label: "🇨🇦 +1 (Canada)", placeholder: "(555) 012-3456" },
  { code: "+61", label: "🇦🇺 +61 (Australia)", placeholder: "412 345 678" },
  { code: "+65", label: "🇸🇬 +65 (Singapore)", placeholder: "8123 4567" },
  { code: "+966", label: "🇸🇦 +966 (Saudi Arabia)", placeholder: "50 123 4567" },
  { code: "+49", label: "🇩🇪 +49 (Germany)", placeholder: "151 23456789" },
  { code: "+33", label: "🇫🇷 +33 (France)", placeholder: "6 12 34 56 78" },
  { code: "+974", label: "🇶🇦 +974 (Qatar)", placeholder: "3312 3456" },
  { code: "+965", label: "🇰🇼 +965 (Kuwait)", placeholder: "5123 4567" },
  { code: "+968", label: "🇴🇲 +968 (Oman)", placeholder: "9123 4567" },
  { code: "+973", label: "🇧🇭 +973 (Bahrain)", placeholder: "3612 3456" },
  { code: "+64", label: "🇳🇿 +64 (New Zealand)", placeholder: "21 123 4567" },
  { code: "+31", label: "🇳🇱 +31 (Netherlands)", placeholder: "6 12345678" },
  { code: "+41", label: "🇨🇭 +41 (Switzerland)", placeholder: "78 123 45 67" },
  { code: "+39", label: "🇮🇹 +39 (Italy)", placeholder: "312 345 6789" },
  { code: "+34", label: "🇪🇸 +34 (Spain)", placeholder: "612 34 56 78" },
  { code: "+60", label: "🇲🇾 +60 (Malaysia)", placeholder: "12-345 6789" },
  { code: "+27", label: "🇿🇦 +27 (South Africa)", placeholder: "71 123 4567" },
  { code: "+63", label: "🇵🇭 +63 (Philippines)", placeholder: "912 345 6789" },
  { code: "+62", label: "🇮🇩 +62 (Indonesia)", placeholder: "812-3456-7890" },
  { code: "+977", label: "🇳🇵 +977 (Nepal)", placeholder: "981-2345678" },
  { code: "+880", label: "🇧🇩 +880 (Bangladesh)", placeholder: "1712-345678" },
  { code: "+94", label: "🇱🇰 +94 (Sri Lanka)", placeholder: "71 234 5678" },
  { code: "other", label: "🌐 Other / International", placeholder: "+Code Number e.g. +44 7911..." },
];

export default function HomePage() {
  const [activeAboutSlide, setActiveAboutSlide] = useState(0);
  const [selectedService, setSelectedService] = useState<{ id: number; label: string; icon: string; img: string; details: string; features: string[]; } | null>(null);
  const [expandedOfferingId, setExpandedOfferingId] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [selectedServiceInForm, setSelectedServiceInForm] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");
    
    const formElement = event.currentTarget;
    
    // Web3Forms access key (publicly safe to embed in client-side applications)
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "a4e58e0f-6919-4ba6-b2b4-62f107255cd9";
    if (!accessKey) {
        console.warn("Please provide a Web3Forms access key.");
    }
    
    const formData = new FormData(formElement);
    formData.append("access_key", accessKey);

    // Format WhatsApp number for foreign and domestic numbers
    const rawWhatsapp = (whatsappNumber || (formData.get("whatsapp") as string) || "").trim();
    let fullWhatsapp = rawWhatsapp;
    if (rawWhatsapp) {
      if (rawWhatsapp.startsWith("+")) {
        fullWhatsapp = rawWhatsapp;
      } else if (countryCode && countryCode !== "other") {
        const cleanCode = countryCode.split("-")[0];
        fullWhatsapp = `${cleanCode} ${rawWhatsapp}`;
      }
      formData.set("whatsapp", fullWhatsapp);
      formData.set("international_whatsapp", fullWhatsapp);
    }

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus("success");
        formElement.reset();
        setCountryCode("+91");
        setWhatsappNumber("");
        setSelectedServiceInForm("");
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        console.error("Web3Forms Error:", data);
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const offeringsData = [
    { 
      id: 1, 
      title: 'Branding & Performance Marketing', 
      img: '/help-1.png',
      details: 'We build digital identities that speak directly to your audience while driving measurable growth through targeted performance marketing campaigns.',
      features: [
        'Brand Identity & Guidelines',
        'Performance Marketing Strategy',
        'Conversion Rate Optimization',
        'Data-Driven Campaign Management'
      ]
    },
    { 
      id: 2, 
      title: 'Creative & Content Creation', 
      img: '/help-2.png',
      details: 'Elevating your brand storytelling with stunning visuals, engaging copy, and compelling multimedia content that converts visitors into advocates.',
      features: [
        'High-Quality Video Production',
        'Graphic Design & Branding',
        'Copywriting & Narrative Design',
        'Social Media Content Calenders'
      ]
    },
    { 
      id: 3, 
      title: 'SEO Optimize & Website design', 
      img: '/help-3.png',
      details: 'Designing user-centric, beautiful websites optimized for search engines to ensure your brand stands out in the digital landscape.',
      features: [
        'On-Page & Off-Page SEO',
        'Responsive UI/UX Web Design',
        'Technical SEO Audits',
        'Website Performance Optimization'
      ]
    },
  ];

  const servicesData = [
    { 
      id: 1, 
      label: 'Social Media', 
      icon: 'Instagram', 
      img: '/service-instagram.png', 
      details: 'We help you build a strong presence on platforms like Instagram, Facebook, and LinkedIn. Engaging content, community management, and brand building to connect with your target audience.',
      features: [
        'Strategic Content Strategy & Creation',
        'Proactive Community Management',
        'Influencer Collaborations & Marketing',
        'Targeted Brand Awareness Campaigns',
        'Monthly Analytics & Growth Reporting'
      ]
    },
    { 
      id: 2, 
      label: 'Meta Ads', 
      icon: 'Meta', 
      img: '/service-meta.png', 
      details: 'High-converting Facebook & Instagram ad campaigns designed to maximize ROI, generate qualified leads, and drive sales through data-driven targeting and creative excellence.',
      features: [
        'High-Quality Lead Generation Campaigns',
        'E-commerce Sales Conversions',
        'Retargeting & Lookalike Audiences',
        'A/B Testing & Creative Optimization',
        'Robust Pixel & Conversion Tracking'
      ]
    },
    { 
      id: 3, 
      label: 'Google Ads', 
      icon: 'Google Ads', 
      img: '/service-google.png', 
      details: 'Targeted search, display, and YouTube advertising. We ensure your business appears exactly when potential customers are searching for your products or services.',
      features: [
        'Search Network Contextual Ads',
        'Display Network Banner Placements',
        'YouTube Video Advertisement',
        'Keyword Strategy & Negative Targeting',
        'Performance Max (PMax) Campaigns'
      ]
    },
    { 
      id: 4, 
      label: 'E-commerce', 
      icon: 'Amazon', 
      img: '/service-amazon.png', 
      details: 'Complete e-commerce scaling solutions on platforms like Amazon, Flipkart, and Blinkit. Listing optimization, performance marketing, and end-to-end growth strategies.',
      features: [
        'Account handling for Amazon, Flipkart, Blinkit, Nykaa, Myntra, etc.,',
        'Marketplace Listing Optimization (SEO)',
        'Platform-specific Sponsored Ads',
        'Inventory Management Strategy',
        'Pricing & Offer Optimization',
        'A+ Content strategy execution'
      ]
    },
    { 
      id: 5, 
      label: 'Website Design', 
      icon: 'Shopify', 
      img: '/service-shopify.png', 
      details: 'Custom, high-performing websites optimized for conversions. From UI/UX design to robust development, we build digital storefronts that turn visitors into loyal customers.',
      features: [
        'Custom Shopify Store Setup',
        'High-Converting UI/UX Design',
        'Landing Page Creation',
        'Technical SEO Implementation',
        'Mobile-First Responsiveness'
      ]
    },
  ];

  const aboutSlides = [
    {
      title: "Who we are?",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Grownex Business Solutions, we are a results driven digital marketing agency helping businesses grow their online presence since 2021. We specialize in performance marketing, branding, social media management, e-commerce growth, website development and lead generation strategies tailored to each business.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Our mission is to help brands scale faster through creative marketing, data-driven campaigns, and innovative digital solutions. From startups to established businesses, we partner with brands to build visibility, generate quality leads, and drive measurable growth in the digital world.
          </p>
          <p className="text-white font-semibold text-xl mt-4">
            Let's create your success together!
          </p>
        </>
      ),
      image: "/group-of-statues.png"
    },
    {
      title: "Our Vision & Mission",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            We envision a digital landscape where every brand, regardless of size, can connect meaningfully with their audience and achieve sustainable growth through innovative and transparent marketing strategies.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            By staying ahead of trends and consistently delivering measurable ROI, we strive to be the most trusted performance marketing partner for expanding businesses globally.
          </p>
          <p className="text-white font-semibold text-xl mt-4">
            Driving the future of digital!
          </p>
        </>
      ),
      image: "/vision-statue.png"
    },
    {
      title: "Meet the minds behind your success!",
      content: (
        <>
          <ul className="text-gray-300 leading-relaxed text-sm md:text-base mb-6 space-y-2 list-disc pl-5">
            <li><strong>Jay Patel</strong> – Meta Ads & Performance Marketing Expert</li>
            <li><strong>Chitanshu Makwana</strong> – E-commerce Platform Expert (Amazon, Flipkart, Blinkit & more)</li>
            <li><strong>Raj Baldev</strong> – Google Ads & SEO Expert</li>
            <li><strong>Sunaina Makwana</strong> – Social Media Management Expert</li>
            <li><strong>Himani Galchur</strong> – WhatsApp & Email Marketing Expert</li>
            <li><strong>Viren Gamit</strong> – Content & Creative Design Expert</li>
            <li><strong>Tejas Bariya</strong> – UX/UI & Website Development Expert</li>
          </ul>
          <p className="text-gray-300 leading-relaxed text-base italic mt-4">
            Together, we combine strategy, creativity, and technology to help brands grow digitally with confidence and measurable results.
          </p>
        </>
      ),
      image: "/Gemini_Generated_Image_dwnisndwnisndwni.png"
    }
  ];

  const currentAboutSlide = aboutSlides[activeAboutSlide];

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans overflow-x-hidden">
      {/* Top Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/85 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <img 
              src={getAssetURL("/Grow_Nex_Logo.png")} 
              alt="GrowNex Logo" 
              className="h-12 md:h-14 object-contain transition-transform group-hover:scale-105" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.nav-fallback-text')?.classList.remove('hidden');
              }}
            />
            <span className="nav-fallback-text hidden text-2xl font-black tracking-tight">
              Grow<span className="text-brand-orange">Nex</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-300">
            <a href="#about" className="hover:text-brand-orange transition-colors">About</a>
            <a href="#services" className="hover:text-brand-orange transition-colors">Services</a>
            <a 
              href="#portfolio" 
              className="text-white hover:text-brand-orange transition-colors flex items-center gap-1.5"
            >
              <span>Portfolio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            </a>
            <a href="#offerings" className="hover:text-brand-orange transition-colors">Why GrowNex</a>
            <a href="#reviews" className="hover:text-brand-orange transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-brand-orange transition-colors">Contact</a>
          </div>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <a 
              href="#send-message"
              onClick={(e) => {
                e.preventDefault();
                const formSection = document.getElementById("send-message");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth" });
                  const nameInput = document.getElementById("name");
                  if (nameInput) nameInput.focus();
                }
              }}
              className="hidden sm:inline-flex bg-brand-orange hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-full text-xs uppercase tracking-wider transition-all shadow-md shadow-brand-orange/20 cursor-pointer"
            >
              Enquire Now
            </a>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-zinc-950/95 border-b border-white/10 px-6 py-6 space-y-4"
            >
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-brand-orange font-semibold py-1"
              >
                About
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-brand-orange font-semibold py-1"
              >
                Services
              </a>
              <a 
                href="#portfolio" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-brand-orange font-bold py-1 flex items-center justify-between"
              >
                <span>Our Portfolio</span>
                <span className="text-xs bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded-full">Featured</span>
              </a>
              <a 
                href="#offerings" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-brand-orange font-semibold py-1"
              >
                Why GrowNex
              </a>
              <a 
                href="#reviews" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-brand-orange font-semibold py-1"
              >
                Reviews
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-brand-orange font-semibold py-1"
              >
                Contact
              </a>
              <div className="pt-2">
                <a 
                  href="#send-message"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const formSection = document.getElementById("send-message");
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: "smooth" });
                      const nameInput = document.getElementById("name");
                      if (nameInput) nameInput.focus();
                    }
                  }}
                  className="w-full text-center block bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-xs uppercase tracking-wider transition-all"
                >
                  Enquire Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Header / Hero */}
      <header className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden pt-20">
        {/* Tablet strictly top-center logo */}
        <div className="hidden md:flex lg:hidden absolute top-8 left-0 w-full justify-center z-30">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center"
          >
            <img 
              src={getAssetURL("/Grow_Nex_Logo.png")} 
              alt="GrowNex Logo" 
              className="h-28 md:h-36 object-contain transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:drop-shadow-[0_0_20px_rgba(242,101,34,0.4)] cursor-pointer" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback-text')?.classList.remove('hidden');
              }}
            />
            <h1 className="fallback-text hidden text-4xl font-heading font-bold tracking-tight">
              <span className="text-white">Grow</span><span className="text-brand-orange">Nex</span>
            </h1>
          </motion.div>
        </div>

        {/* Background ambient gradient */}
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-l from-brand-orange/20 to-transparent z-0 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center relative z-10 pt-20 md:pt-40 lg:pt-0">
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center z-20">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex md:hidden lg:flex items-center justify-center w-full mb-6"
            >
              <img 
                src={getAssetURL("/Grow_Nex_Logo.png")} 
                alt="GrowNex Logo" 
                className="h-28 md:h-40 object-contain transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:drop-shadow-[0_0_20px_rgba(242,101,34,0.4)] cursor-pointer" 
                onError={(e) => {
                  // Fallback if image isn't uploaded yet
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.fallback-text')?.classList.remove('hidden');
                }}
              />
              <h1 className="fallback-text hidden text-3xl md:text-4xl font-heading font-bold tracking-tight">
                <span className="text-white">Grow</span><span className="text-brand-orange">Nex</span>
              </h1>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black italic tracking-tighter leading-tight text-[#ff7e20]"
            >
              Driving Your<br /> Brand Digitally
            </motion.h2>
            <motion.a 
              href="#send-message"
              onClick={(e) => {
                e.preventDefault();
                const formSection = document.getElementById("send-message");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth" });
                  const nameInput = document.getElementById("name");
                  if (nameInput) {
                    nameInput.focus();
                  }
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 inline-block bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded shadow-lg shadow-brand-orange/30 transition-all uppercase tracking-wider text-sm w-fit cursor-pointer"
            >
              Enquire Now
            </motion.a>
          </div>

          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center">
            {/* Hero Statue uploaded by user */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              src={getAssetURL("/hero-statue.png")} 
              alt="Statue holding lightbulb concept" 
              className="w-full max-w-sm md:max-w-md lg:max-w-3xl object-contain origin-bottom transform lg:scale-125 mix-blend-lighten mask-image-gradient"
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
            />
          </div>
        </div>
      </header>

      {/* Partners Strip */}
      <div className="w-full bg-white h-20 md:h-24 overflow-hidden flex items-center relative gap-0">
        <motion.div 
          className="flex w-max items-center font-bold text-lg md:text-xl text-gray-800 whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                { id: 'meta', src: '/meta.jpg', alt: 'Meta', className: 'h-24 md:h-32 mix-blend-multiply' },
                { id: 'google-ads', src: '/google-ads.jpg', alt: 'Google Ads', className: 'h-16 md:h-20 mix-blend-multiply' },
                { id: 'shopify', src: '/shopify.jpg', alt: 'Shopify', className: 'h-36 md:h-48 mix-blend-multiply' },
                { id: 'amazon', src: '/amazon.jpg', alt: 'Amazon', className: 'h-28 md:h-36 mix-blend-multiply' },
                { id: 'flipkart', src: '/flipkart.jpg', alt: 'Flipkart', className: 'h-32 md:h-40 mix-blend-multiply' },
                { id: 'nykaa', src: '/nykaa.jpg', alt: 'Nykaa', className: 'h-32 md:h-40 mix-blend-multiply' },
                { id: 'myntra', src: '/myntra.jpg', alt: 'Myntra', className: 'h-16 md:h-20 mix-blend-multiply' },
                { id: 'blinkit', src: '/blinkit.jpg', alt: 'Blinkit', className: 'h-16 md:h-20 mix-blend-multiply rounded-xl' },
              ].map(partner => (
                <div key={`${i}-${partner.id}`} className="relative flex items-center justify-center w-[120px] md:w-[160px] lg:w-[180px] shrink-0 mx-4 md:mx-8 text-center">
                  <img 
                    src={getAssetURL(partner.src)} 
                    alt={partner.alt} 
                    className={`${partner.className} object-contain`} 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
                    }}
                  />
                  <span className="fallback hidden font-bold text-xl text-gray-800">{partner.alt}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row gap-16 items-center scroll-mt-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeAboutSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-3xl md:text-4xl font-black mb-8">{currentAboutSlide.title}</h3>
            {currentAboutSlide.content}
          </motion.div>
        </AnimatePresence>
        <div className="w-full md:w-1/2 relative">
          <div className="bg-brand-orange/20 absolute inset-0 rounded-[2rem] transform rotate-3" />
          <div className="relative bg-zinc-900 rounded-[2rem] overflow-hidden aspect-video border border-white/10">
             <AnimatePresence mode="wait">
               <motion.img 
                 key={activeAboutSlide}
                 initial={{ opacity: 0, scale: 1.05 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.3 }}
                 src={getAssetURL(currentAboutSlide.image)} 
                 alt={currentAboutSlide.title} 
                 className="w-full h-full object-cover absolute inset-0"
               />
             </AnimatePresence>
             <button 
               onClick={() => setActiveAboutSlide((prev) => (prev + 1) % aboutSlides.length)}
               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors z-10 shadow-lg"
             >
                <ArrowRight size={24} />
             </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-brand-orange scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h3 className="text-center text-4xl font-black text-white mb-16">Explore Our Services</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {servicesData.map(service => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={service.id} 
                onClick={() => setSelectedService(service)}
                className="bg-brand-black rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex flex-col cursor-pointer"
              >
                <div className="flex-1 w-full bg-zinc-900 relative">
                  <img src={getAssetURL(service.img)} alt={service.label} className="w-full h-64 md:h-80 object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-300" />
                </div>
                <div className="bg-brand-black p-4 text-center border-t border-white/10">
                  <h4 className="text-brand-orange font-bold text-[15px]">{service.label}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col"
            >
              <div className="p-6 md:p-8 flex flex-col gap-4 relative">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <h3 className="text-2xl md:text-3xl font-black text-brand-orange pr-8">{selectedService.label}</h3>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {selectedService.details}
                </p>
                <div className="bg-white/5 rounded-2xl p-4 md:p-6 mt-2 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">What's included:</h4>
                  <ul className="text-gray-300 space-y-3">
                    {selectedService.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5 flex-shrink-0" />
                        <span className="text-sm md:text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-6 border-t border-white/10 flex justify-end">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Our Portfolio Section */}
      <PortfolioSection 
        getAssetURL={getAssetURL} 
        onSelectServiceForInquiry={(serviceId) => setSelectedServiceInForm(serviceId)} 
      />

      {/* Offerings Section */}
      <section id="offerings" className="py-24 max-w-7xl mx-auto px-6 md:px-16 scroll-mt-20">
        <h3 className="text-center text-4xl font-black mb-16">How can I help you?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {offeringsData.map(offer => {
            const isExpanded = expandedOfferingId === offer.id;
            return (
              <motion.div 
                layout
                onClick={() => setExpandedOfferingId(isExpanded ? null : offer.id)}
                key={offer.id} 
                className={`rounded-xl overflow-hidden shadow-xl cursor-pointer border transition-colors duration-300 ${isExpanded ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-gray-100 text-black'}`}
              >
                <motion.div layout className="h-64 overflow-hidden relative">
                  <img src={getAssetURL(offer.img)} alt={offer.title} className="w-full h-full object-cover" />
                  {isExpanded && <div className="absolute inset-0 bg-black/40" />}
                </motion.div>
                <motion.div layout className={`p-6 flex flex-col justify-center min-h-[100px] relative ${isExpanded ? 'text-left' : 'text-center'}`}>
                  <motion.h4 layout className={`font-black text-xl leading-tight pr-10 ${isExpanded ? 'text-brand-orange' : 'text-brand-orange'}`}>
                    {offer.title}
                  </motion.h4>
                  
                  <div className={`absolute right-6 top-6 w-8 h-8 rounded-full flex items-center justify-center ${isExpanded ? 'bg-white/10' : 'bg-gray-100'}`}>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                      {isExpanded ? <X size={18} className="text-brand-orange" /> : <ArrowRight size={18} className="text-gray-500 rotate-90" />}
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-4 border-t border-white/10">
                          <p className="text-gray-300 leading-relaxed text-base mb-6">
                            {offer.details}
                          </p>
                          <h5 className="text-white font-semibold mb-4">What's included:</h5>
                          <ul className="space-y-3">
                            {offer.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
                                <span className="text-gray-300 text-sm md:text-base leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-brand-orange scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h3 className="text-3xl md:text-4xl font-black text-white">Clients Feedback</h3>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  const container = document.getElementById('testimonials-container');
                  if (container) container.scrollBy({ left: -350, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-brand-orange transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <button 
                onClick={() => {
                  const container = document.getElementById('testimonials-container');
                  if (container) container.scrollBy({ left: 350, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-brand-orange transition-colors"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
          
          <div 
            id="testimonials-container"
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 px-6 md:-mx-16 md:px-16"
          >
            {[
              {
                id: 1,
                name: 'Rajesh Shah',
                company: 'Mark Pre-Inked Stamps',
                img: '/rajesh.png',
                text: 'We started Google and social media ads with Chitanshu & Team Grownex and saw a noticeable increase in inquiries and online reach. Their team manages campaigns professionally and provides timely support whenever needed. Satisfied with the overall results and service experience.'
              },
              {
                id: 2,
                name: 'Raj Chaudhari',
                company: 'HYME Towels',
                img: '/raj.jpeg',
                text: 'Grownex Business Solutions helped us with Google Ads and website design for our brand. Their team created a professional website and managed our ads effectively, which improved our online presence and inquiries. Happy with their support, creativity, and overall branding service.'
              },
              {
                id: 3,
                name: 'Anita Answar',
                company: 'Grainy Goodness',
                img: '/anita.png',
                text: 'We assigned our Amazon and Flipkart account handling to Chitanshu bhai, and the experience has been smooth and professional. Their team manages listings, orders, and advertising properly, which helped improve our product visibility and sales.'
              },
              {
                id: 4,
                name: 'Jay Suhagiya',
                company: 'Sophistique Cosmetics',
                img: 'https://ui-avatars.com/api/?name=Jay+Suhagiya&background=ff5a00&color=fff',
                text: 'GrowNex helped us grow our Amazon business from zero to hero. Their team guided us through every step, from account setup and optimization to APOB registrations and marketplace management. Professional support, excellent service, and the best part is all this at a very affordable price. Highly recommended for anyone looking to grow their e-commerce business!'
              }
            ].map(client => (
              <div key={client.id} className="flex-shrink-0 w-[85vw] md:w-[400px] snap-center flex flex-col bg-brand-black/20 rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <img src={getAssetURL(client.img)} alt={client.name} className="w-16 h-16 rounded-full border-2 border-white object-cover" />
                  <div>
                    <h5 className="font-bold text-white text-lg">{client.name}</h5>
                    <p className="text-white/80 text-sm">{client.company}</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  "{client.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-zinc-900 border-t border-white/10 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24">
          
          {/* Left Column: Info */}
          <div className="w-full lg:w-7/12 space-y-10">
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                Ready to grow your<br /> <span className="text-brand-orange">business?</span>
              </h3>
              <p className="text-gray-400 text-lg">Leave us a message and we'll get back to you to discuss your growth strategy.</p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                 <div className="bg-brand-orange/20 p-3 rounded-xl flex-shrink-0">
                   <MapPin className="text-brand-orange" size={24} />
                 </div>
                 <div>
                   <h4 className="text-white font-bold text-lg mb-1">Our Office</h4>
                   <p className="text-gray-400 text-sm leading-relaxed">Vadodara, Gujarat</p>
                 </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                   <div className="bg-brand-orange/20 p-3 rounded-xl flex-shrink-0">
                     <Mail className="text-brand-orange" size={20} />
                   </div>
                   <div className="overflow-hidden">
                     <h4 className="text-white font-bold text-base mb-1">E-mail</h4>
                     <a href="mailto:info@grownex.digital" className="text-gray-400 text-sm hover:text-white transition-colors block break-all">info@grownex.digital</a>
                   </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                   <div className="bg-brand-orange/20 p-3 rounded-xl flex-shrink-0">
                     <Phone className="text-brand-orange" size={20} />
                   </div>
                   <div>
                     <h4 className="text-white font-bold text-base mb-1">Phone</h4>
                     <a href="tel:+917777987542" className="text-gray-400 text-sm hover:text-white transition-colors">+91 77779 87542</a>
                   </div>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/917777987542"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-brand-orange/20 transition-all uppercase tracking-wider text-sm w-fit"
            >
              WhatsApp Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column: Form */}
          <div id="send-message" className="w-full lg:w-5/12 relative scroll-mt-24">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden h-full">
              {/* Decorative Blur */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange/20 blur-[100px] rounded-full pointer-events-none" />
              
              <h4 className="text-2xl font-bold text-white mb-8">Send us a message</h4>
              
              <form className="space-y-6 relative z-10" onSubmit={onFormSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-400">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="whatsapp" className="text-sm font-medium text-gray-400">
                        WhatsApp Number
                      </label>
                      <span className="text-xs text-brand-orange/90 font-medium flex items-center gap-1">
                        <Globe className="w-3 h-3 inline" /> Foreign / International
                      </span>
                    </div>
                    <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5 focus-within:ring-2 focus-within:ring-brand-orange/50 focus-within:border-brand-orange transition-all">
                      <select 
                        id="country_code"
                        name="country_code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-zinc-800 text-white text-xs sm:text-sm px-2.5 sm:px-3 py-3 border-r border-white/10 focus:outline-none cursor-pointer max-w-[125px] sm:max-w-[160px] shrink-0"
                        title="Select Country Code"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code} className="bg-zinc-900 text-white">
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input 
                        type="tel" 
                        id="whatsapp" 
                        name="whatsapp"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        required
                        inputMode="tel"
                        className="w-full bg-transparent px-3 sm:px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none text-sm sm:text-base"
                        placeholder={
                          COUNTRY_CODES.find((c) => c.code === countryCode)?.placeholder || "Phone number"
                        }
                      />
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Select your country code or enter with country code (e.g., +1 for US/Canada, +44 for UK, +971 for UAE).
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-gray-400">Interested Service</label>
                  <select 
                    id="service"
                    name="service"
                    value={selectedServiceInForm}
                    onChange={(e) => setSelectedServiceInForm(e.target.value)}
                    required
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="amazon">Amazon / E-commerce Management</option>
                    <option value="ads">Performance Marketing & Ads</option>
                    <option value="seo">SEO & Website Design</option>
                    <option value="creative">Creative & Content</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all resize-none"
                    placeholder="Tell us about your business goals..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className={`w-full font-bold py-4 px-8 rounded-xl transition-colors mt-4 flex justify-center items-center gap-2 ${
                    formStatus === 'success' 
                      ? 'bg-green-500 text-white'
                      : formStatus === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {formStatus === 'submitting' && 'Sending...'}
                  {formStatus === 'success' && 'Message Sent!'}
                  {formStatus === 'error' && 'Error Sending'}
                  {formStatus === 'idle' && (
                    <>
                      Send Message
                      <MessageSquare size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Real Footer Bottom Line */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img 
              src={getAssetURL("/Grow_Nex_Logo.png")} 
              alt="GrowNex Logo" 
              className="h-16 md:h-24 object-contain transition-transform duration-300 hover:scale-105" 
            />
            <span className="text-gray-500 text-sm ml-4">© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a href="#portfolio" className="text-gray-400 hover:text-brand-orange text-sm font-medium transition-colors">Our Portfolio</a>
            <Link to="/privacy-policy" className="text-gray-500 hover:text-brand-orange text-sm font-medium transition-colors">Privacy Policy</Link>
            <div className="flex gap-4 ml-4 pl-4 border-l border-white/10 items-center">
              <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
