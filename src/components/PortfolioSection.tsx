import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ExternalLink, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Layers, 
  ShoppingBag, 
  BarChart3, 
  Monitor, 
  Share2 
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'ecommerce' | 'ads' | 'web' | 'social';
  categoryLabel: string;
  badge: string;
  highlightMetric: string;
  metricLabel: string;
  summary: string;
  image: string;
  tags: string[];
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
  }[];
  serviceId: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'sophistique',
    title: 'From Zero to Category Bestseller on Amazon & Flipkart',
    client: 'Sophistique Cosmetics',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Scaling',
    badge: 'Amazon & Flipkart',
    highlightMetric: '0 to ₹35L/Mo',
    metricLabel: 'Monthly Revenue Growth',
    summary: 'End-to-end account launch, APOB registrations, high-converting A+ Content, and sponsored brand campaigns taking products to category bestsellers.',
    image: '/portfolio-cosmetics.jpg',
    tags: ['Amazon PPC', 'Flipkart Ads', 'A+ Content', 'Marketplace SEO'],
    challenge: 'A newly launched beauty brand with zero marketplace history, low organic visibility, and strict competition against established global cosmetics brands.',
    solution: 'Engineered complete catalog architecture with keyword-optimized titles, bullet points, and premium A+ brand story design. Executed targeted Sponsored Products & Brand ads with negative keyword isolation to preserve profit margins.',
    results: [
      { label: 'Revenue Milestone', value: '₹35 Lakhs/Month' },
      { label: 'PPC ROAS', value: '6.2x Return' },
      { label: 'Organic Keyword Ranks', value: 'Top 3 for 18+ Keywords' },
      { label: 'Verified Customer Reviews', value: '1,250+ Ratings' },
    ],
    serviceId: 'amazon',
  },
  {
    id: 'hyme-towels',
    title: 'High-Converting D2C Store & Google Ads Scaling',
    client: 'HYME Towels',
    category: 'web',
    categoryLabel: 'Website & Google Ads',
    badge: 'Shopify & Lead Gen',
    highlightMetric: '+340% Inquiries',
    metricLabel: 'B2B & Retail Orders',
    summary: 'Built a luxury Shopify e-commerce experience combined with Google Shopping & Search campaigns, driving both direct retail orders and bulk B2B hotel contracts.',
    image: '/portfolio-towels.jpg',
    tags: ['Shopify Store', 'Google Shopping Ads', 'UI/UX Redesign', 'Technical SEO'],
    challenge: 'An outdated web storefront with slow mobile loading speeds and high shopping cart drop-offs, failing to capture lucrative corporate and hospitality orders.',
    solution: 'Designed and developed a custom mobile-first Shopify theme with instant checkout flows, wholesale inquiry forms, and Google Ads Performance Max campaigns.',
    results: [
      { label: 'Direct Inquiries', value: '+340% Growth' },
      { label: 'Conversion Rate', value: '3.8% (up from 1.1%)' },
      { label: 'Google Ads ROAS', value: '4.8x Blended' },
      { label: 'Average Order Value', value: '+45% Increase' },
    ],
    serviceId: 'seo',
  },
  {
    id: 'mark-stamps',
    title: 'Precision B2B Lead Generation & Localized Meta Ads',
    client: 'Mark Pre-Inked Stamps',
    category: 'ads',
    categoryLabel: 'Performance Marketing',
    badge: 'Google & Meta Ads',
    highlightMetric: '4.5x ROAS',
    metricLabel: 'Ad Spend Return',
    summary: 'Targeted Google Search and Meta ad funnels capturing high-margin custom industrial and commercial stamping orders with optimized conversion tracking.',
    image: '/portfolio-ads.jpg',
    tags: ['Google Search Ads', 'Meta Lead Ads', 'Conversion Tracking', 'B2B Funnels'],
    challenge: 'High cost-per-lead and wasted ad clicks on irrelevant consumer queries with poor tracking attribution.',
    solution: 'Restructured search campaigns with phrase & exact negative keywords, designed localized creative reels and banners on Meta, and implemented server-side conversion API tracking.',
    results: [
      { label: 'Cost Per Qualified Lead', value: '-38% Reduction' },
      { label: 'Campaign ROAS', value: '4.5x Steady' },
      { label: 'Monthly Corporate Inquiries', value: '350+ Leads' },
      { label: 'Lead-to-Order Conversion', value: '32%' },
    ],
    serviceId: 'ads',
  },
  {
    id: 'grainy-goodness',
    title: 'Marketplace Catalog SEO & FMCG Sales Acceleration',
    client: 'Grainy Goodness Superfoods',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Scaling',
    badge: 'Amazon Choice & FMCG',
    highlightMetric: '+220% Organic Lift',
    metricLabel: 'Organic Sales Multiplier',
    summary: 'Complete marketplace listing optimization, keyword indexation, A+ brand storytelling, and review velocity strategy across Amazon and Flipkart.',
    image: '/portfolio-food.jpg',
    tags: ['Amazon FBA', 'Listing Optimization', 'Amazon Choice Badge', 'Brand Store'],
    challenge: 'High reliance on costly sponsored ads with minimal organic search rank traction and inconsistent stock replenishment planning.',
    solution: 'Rewrote product metadata to align with high-intent search queries, introduced bundle SKU strategy to increase basket size, and managed FBA inventory forecasting.',
    results: [
      { label: 'Organic Sales', value: '+220% Increase' },
      { label: 'Amazon Choice Badges', value: '3 Product Lines' },
      { label: 'ACoS (Ad Cost of Sale)', value: 'Reduced to 14.2%' },
      { label: 'Repeat Customer Rate', value: '28%' },
    ],
    serviceId: 'amazon',
  },
  {
    id: 'urban-elite',
    title: 'Viral Social Media Campaigns & D2C Apparel Launch',
    client: 'Urban Streetwear & Apparel',
    category: 'social',
    categoryLabel: 'Branding & Social Media',
    badge: 'Instagram & Viral Reels',
    highlightMetric: '1.2M+ Views',
    metricLabel: 'Organic & Paid Reach',
    summary: 'High-energy lifestyle reels campaigns, influencer UGC content production, and automated retargeting funnels driving rapid brand awareness and D2C sales.',
    image: '/portfolio-social.jpg',
    tags: ['Instagram Reels', 'UGC Content', 'Meta Retargeting', 'Influencer Seeding'],
    challenge: 'A streetwear brand struggling to cut through social media noise and generate profitable first-order customer acquisition.',
    solution: 'Produced aesthetic short-form video reels, launched dynamic product catalog retargeting, and implemented scarcity-driven drops via Instagram Shop.',
    results: [
      { label: 'Total Content Views', value: '1.2 Million+' },
      { label: 'Orders Generated', value: '12,500+ Units' },
      { label: 'Engagement Rate', value: '8.4%' },
      { label: 'Blended Acquisition Cost', value: '₹185 / Order' },
    ],
    serviceId: 'creative',
  },
  {
    id: 'global-tech',
    title: 'Multi-Channel Performance Max & YouTube Scaling',
    client: 'NexaTech Smart Gadgets',
    category: 'ads',
    categoryLabel: 'Performance Marketing',
    badge: 'PMax & YouTube',
    highlightMetric: '5.2x ROAS',
    metricLabel: 'Targeted Ad Efficiency',
    summary: 'Engineered comprehensive customer acquisition across Google Performance Max, YouTube discovery ads, and cross-platform retargeting.',
    image: '/portfolio-ads.jpg',
    tags: ['Google PMax', 'YouTube Video Ads', 'Lookalike Audiences', 'Retargeting'],
    challenge: 'Customer acquisition costs were spiking due to reliance on single-channel ad creatives without omni-channel remarketing.',
    solution: 'Built high-converting video hooks for YouTube, leveraged Google AI smart bidding, and deployed omni-channel customer journey tracking.',
    results: [
      { label: 'Blended ROAS', value: '5.2x Consistent' },
      { label: 'Revenue Generated', value: '₹48 Lakhs in 90 Days' },
      { label: 'Click-Through Rate', value: '3.6%' },
      { label: 'Customer Retention', value: '24%' },
    ],
    serviceId: 'ads',
  },
];

interface PortfolioSectionProps {
  onSelectServiceForInquiry?: (serviceId: string) => void;
  getAssetURL: (path: string) => string;
}

export default function PortfolioSection({ onSelectServiceForInquiry, getAssetURL }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ecommerce' | 'ads' | 'web' | 'social'>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(item => item.category === activeFilter);

  const handleInquireFromCaseStudy = (study: CaseStudy) => {
    setSelectedCaseStudy(null);
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(study.serviceId);
    }
    const formSection = document.getElementById('send-message');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 300);
      }
    }
  };

  return (
    <section id="portfolio" className="relative py-24 bg-[#0a0a0a] border-t border-white/10 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs md:text-sm font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} className="text-brand-orange animate-pulse" />
            <span>Proven Track Record</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
          >
            Our <span className="text-brand-orange">Portfolio</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-400 text-base md:text-lg leading-relaxed"
          >
            Real results for real brands. Explore how we scale e-commerce marketplaces, drive explosive ad ROAS, and craft bespoke high-converting digital experiences.
          </motion.p>
        </div>

        {/* Impact Numbers Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {[
            { metric: '₹15Cr+', label: 'Client Revenue Generated', icon: TrendingUp },
            { metric: '5.4x', label: 'Average Ad Spend ROAS', icon: BarChart3 },
            { metric: '150+', label: 'E-Commerce Brands Scaled', icon: ShoppingBag },
            { metric: '98%', label: 'Client Retention & Growth', icon: CheckCircle2 },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="bg-zinc-900/80 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:border-brand-orange/50 transition-all hover:bg-zinc-900 group"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-brand-orange/15 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                <stat.icon size={20} />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white group-hover:text-brand-orange transition-colors">
                {stat.metric}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {[
            { id: 'all', label: 'All Projects', icon: Layers },
            { id: 'ecommerce', label: 'E-Commerce Scaling', icon: ShoppingBag },
            { id: 'ads', label: 'Meta & Google Ads', icon: BarChart3 },
            { id: 'web', label: 'Websites & D2C', icon: Monitor },
            { id: 'social', label: 'Social & Creative', icon: Share2 },
          ].map(tab => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-105'
                    : 'bg-zinc-900 text-gray-400 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                <tab.icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCaseStudy(project)}
                className="group bg-zinc-900/90 border border-white/10 hover:border-brand-orange/50 rounded-2xl overflow-hidden flex flex-col shadow-xl cursor-pointer transition-all duration-300"
              >
                {/* Image Cover Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                  <img
                    src={getAssetURL(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = getAssetURL('/service-amazon.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                  
                  {/* Category Badge Top Left */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/20 text-brand-orange">
                      {project.badge}
                    </span>
                  </div>

                  {/* Highlight Metric Pill Bottom Right */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="px-3.5 py-1.5 rounded-xl bg-brand-orange text-white font-extrabold text-xs shadow-lg shadow-brand-orange/40 flex items-center gap-1.5">
                      <TrendingUp size={14} />
                      <span>{project.highlightMetric}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                      {project.client}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors line-clamp-2 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6">
                      {project.summary}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Button */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-brand-orange font-bold text-sm group-hover:translate-x-1 transition-transform">
                      <span>View Case Study & Metrics</span>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Section Bottom CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-brand-orange/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Want Similar Results For <span className="text-brand-orange">Your Business?</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base mt-2">
              Let's analyze your current brand performance and craft a customized growth strategy tailored to your targets.
            </p>
          </div>
          
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 shrink-0 bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-xl shadow-brand-orange/30 transition-all uppercase tracking-wider text-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col"
            >
              {/* Header Image inside Modal */}
              <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full bg-zinc-950 overflow-hidden">
                <img
                  src={getAssetURL(selectedCaseStudy.image)}
                  alt={selectedCaseStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/60" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full transition-colors border border-white/20 z-10 cursor-pointer"
                  title="Close Case Study"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-orange text-white inline-block mb-2">
                    {selectedCaseStudy.badge}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black text-white leading-tight">
                    {selectedCaseStudy.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1">Client: {selectedCaseStudy.client}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Metrics Highlight Row */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-3">
                    Verified Key Results
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedCaseStudy.results.map((res, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-center">
                        <div className="text-brand-orange font-black text-lg sm:text-xl">
                          {res.value}
                        </div>
                        <div className="text-[11px] sm:text-xs text-gray-400 mt-1 font-medium">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      The Challenge
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {selectedCaseStudy.challenge}
                    </p>
                  </div>

                  <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-5">
                    <h4 className="text-base font-bold text-brand-orange mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-orange" />
                      The GrowNex Solution
                    </h4>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {selectedCaseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Services Delivered */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Core Capabilities Applied
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseStudy.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-white/10 text-xs font-medium text-gray-300">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-end items-center">
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleInquireFromCaseStudy(selectedCaseStudy)}
                    className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-brand-orange/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Results Like This</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
