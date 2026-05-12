import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-black text-white font-sans overflow-x-hidden">
      {/* Header / Hero */}
      <header className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-center md:justify-start md:px-16">
          <div className="text-center md:text-left bg-white px-6 py-4 rounded-xl shadow-xl inline-flex flex-col md:items-start items-center">
            <img 
              src="/logo.png" 
              alt="GrowNex Logo" 
              className="h-12 md:h-16 object-contain" 
              onError={(e) => {
                // Fallback if image isn't uploaded yet
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback-text')?.classList.remove('hidden');
              }}
            />
            {/* Fallback text if image cannot be loaded */}
            <h1 className="fallback-text hidden text-5xl md:text-6xl font-heading font-bold tracking-tight text-black">
              Grow<span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">Nex</span>
            </h1>
          </div>
        </div>

        {/* Background ambient gradient */}
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-l from-brand-orange/20 to-transparent z-0 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center relative z-10 pt-32">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black italic tracking-tighter leading-tight text-[#ff7e20]"
            >
              Driving Your<br /> Brand Digitally
            </motion.h2>
            <motion.a 
              href="https://forms.gle/NHNcwQ8iENMfsuN49"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 inline-block bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded shadow-lg shadow-brand-orange/30 transition-all uppercase tracking-wider text-sm w-fit"
            >
              Enquire Now
            </motion.a>
          </div>

          <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
            {/* Hero Statue uploaded by user */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              src="/hero-statue.png" 
              alt="Statue holding lightbulb concept" 
              className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl object-contain origin-bottom transform md:scale-110 lg:scale-125 mix-blend-lighten mask-image-gradient"
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
                    src={partner.src} 
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
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 space-y-6">
          <h3 className="text-3xl md:text-4xl font-black mb-8">Who we are?</h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            Grownex Business Solutions, we are a results driven digital marketing agency helping businesses grow their online presence since 2021. We specialize in performance marketing, branding, social media management, e-commerce growth, website development and lead generation strategies tailored to each business.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            Our mission is to help brands scale faster through creative marketing, data-driven campaigns, and innovative digital solutions. From startups to established businesses, we partner with brands to build visibility, generate quality leads, and drive measurable growth in the digital world.
          </p>
          <p className="text-white font-semibold text-xl mt-4">
            Let's create your success together!
          </p>
        </div>
        <div className="w-full md:w-1/2 relative">
          <div className="bg-brand-orange/20 absolute inset-0 rounded-[2rem] transform rotate-3" />
          <div className="relative bg-zinc-900 rounded-[2rem] overflow-hidden aspect-video border border-white/10">
             <img 
               src="/group-of-statues.png" 
               alt="Group of statues" 
               className="w-full h-full object-cover"
             />
             <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors">
                <ArrowRight size={24} />
             </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-brand-orange">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h3 className="text-center text-4xl font-black text-white mb-16">Explore Our Services</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { id: 1, label: 'Social Media', icon: 'Instagram', img: '/service-instagram.png' },
              { id: 2, label: 'Meta Ads', icon: 'Meta', img: '/service-meta.png' },
              { id: 3, label: 'Google Ads', icon: 'Google Ads', img: '/service-google.png' },
              { id: 4, label: 'E-commerce', icon: 'Amazon', img: '/service-amazon.png' },
              { id: 5, label: 'Website Design', icon: 'Shopify', img: '/service-shopify.png' },
            ].map(service => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={service.id} 
                className="bg-brand-black rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex flex-col"
              >
                <div className="flex-1 w-full bg-zinc-900 relative">
                  <img src={service.img} alt={service.label} className="w-full h-64 md:h-80 object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-300" />
                </div>
                <div className="bg-brand-black p-4 text-center border-t border-white/10">
                  <h4 className="text-brand-orange font-bold text-[15px]">{service.label}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-16">
        <h3 className="text-center text-4xl font-black mb-16">How can I help you?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 1, title: 'Branding & Performance Marketing', img: '/help-1.png' },
            { id: 2, title: 'Creative & Content Creation', img: '/help-2.png' },
            { id: 3, title: 'SEO Optimize & Website design', img: '/help-3.png' },
          ].map(offer => (
            <div key={offer.id} className="bg-white rounded-xl overflow-hidden shadow-xl group">
              <div className="h-64 overflow-hidden bg-gray-100">
                <img src={offer.img} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-white flex items-center justify-center text-center min-h-[100px]">
                <h4 className="text-brand-orange font-black text-xl leading-tight">{offer.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-orange">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h3 className="text-center text-3xl md:text-4xl font-black text-white mb-16">Clients Feedback</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
              }
            ].map(client => (
              <div key={client.id} className="flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <img src={client.img} alt={client.name} className="w-16 h-16 rounded-full border-2 border-white object-cover" />
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
      <footer className="py-24 max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 relative isolate">
          {/* Chat bubble icon */}
          <div className="absolute -left-6 bottom-12 bg-brand-orange text-white p-4 rounded-xl shadow-xl z-20">
            <MessageSquare size={32} />
          </div>
          <div className="bg-brand-orange rounded-[2rem] overflow-hidden aspect-square md:aspect-[4/3] relative z-10 border-4 border-brand-black p-2">
             <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
                <img 
                  src="/statues-talking.png" 
                  alt="Contact us concept" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-10">
          <h3 className="text-4xl md:text-5xl font-black text-brand-orange leading-tight">
            Let's lead your<br /> business to success.
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
               <div>
                 <h4 className="text-brand-orange font-bold text-xl mb-1">Address</h4>
                 <p className="text-gray-400 text-lg">B/15 Krishna Park, Near ITI Gorwa, Vadodara</p>
               </div>
            </div>
            
            <div className="flex items-start gap-4">
               <div>
                 <h4 className="text-brand-orange font-bold text-xl mb-1">E-mail</h4>
                 <a href="mailto:chitanshu.grownex@gmail.com" className="text-gray-400 text-lg hover:text-white transition-colors">chitanshu.grownex@gmail.com</a>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div>
                 <h4 className="text-brand-orange font-bold text-xl mb-1">Contact Number</h4>
                 <a href="tel:+917777987542" className="text-gray-400 text-lg hover:text-white transition-colors">+91 77779 87542</a>
               </div>
            </div>
          </div>

          <a 
            href="https://wa.me/917777987542"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded shadow-lg shadow-brand-orange/20 transition-all uppercase tracking-wider text-sm w-fit"
          >
            Connect Now
          </a>
        </div>
      </footer>
    </div>
  );
}
