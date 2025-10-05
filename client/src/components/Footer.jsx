import React from 'react';
import { assets, footer_data } from '../assets/assets';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative bg-white/60 backdrop-blur-xl border-t border-gray-200 shadow-2xl rounded-t-3xl px-8 md:px-20 lg:px-32 py-16 overflow-hidden">

      {/* Floating gradient shapes for 3D effect */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-purple-300/30 rounded-full blur-3xl -z-10 animate-blob"></div>
      <div className="absolute -bottom-20 -right-16 w-72 h-72 bg-gradient-to-r from-pink-200/30 to-yellow-200/30 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-16 relative z-10">
        
        {/* Logo & Description */}
        <div className="flex-1 min-w-[280px]">
          <img 
            src={assets.logo} 
            alt="logo" 
            className="w-24 sm:w-32 rounded-full shadow-xl mb-4 hover:scale-105 transition-transform duration-500"
          />
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Made with ❤️ by creators, for readers. Share your stories, ideas, and grow your audience.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-gray-500 hover:text-blue-500 transition duration-300 transform hover:-translate-y-1 hover:scale-110"><Facebook size={22} /></a>
            <a href="#" className="text-gray-500 hover:text-sky-400 transition duration-300 transform hover:-translate-y-1 hover:scale-110"><Twitter size={22} /></a>
            <a href="#" className="text-gray-500 hover:text-pink-500 transition duration-300 transform hover:-translate-y-1 hover:scale-110"><Instagram size={22} /></a>
            <a href="#" className="text-gray-500 hover:text-blue-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"><Linkedin size={22} /></a>
          </div>
        </div>

        {/* Links Sections */}
        <div className="flex flex-wrap flex-1 justify-between gap-12 relative z-10">
          {footer_data.map((section, index) => (
            <div key={index} className="min-w-[140px]">
              <h3 className="font-bold text-lg mb-5 text-gray-800 tracking-wide">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href="#"
                      className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:pl-2 block text-sm md:text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm md:text-base border-t border-gray-300/40 pt-6 relative z-10">
        <p>© {new Date().getFullYear()} <span className="font-semibold text-gray-800">QuickBlog</span> — All Rights Reserved.</p>
        <p className="mt-3 md:mt-0">Designed with ❤️ by Abhishek Singh</p>
      </div>

      {/* Blob animation styles */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </footer>
  );
}

export default Footer;
