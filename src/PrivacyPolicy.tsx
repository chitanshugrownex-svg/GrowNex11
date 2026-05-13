import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-black text-white font-sans py-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <Link to="/" className="inline-flex flex-row items-center gap-2 text-brand-orange hover:text-orange-400 font-semibold w-fit transition-colors">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
          
          <p>
            Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <p>
            At GrowNex ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and any other details you provide to us through contact forms, emails, or when registering for our services.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, operate, and maintain our services</li>
            <li>Improve, personalize, and expand our offerings</li>
            <li>Understand and analyze how you use our website</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Log Files</h2>
          <p>
            GrowNex follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies and Web Beacons</h2>
          <p>
            Like any other website, GrowNex uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Third-Party Privacy Policies</h2>
          <p>
            Our Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:chitanshu.grownex@gmail.com" className="text-brand-orange hover:underline">chitanshu.grownex@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
