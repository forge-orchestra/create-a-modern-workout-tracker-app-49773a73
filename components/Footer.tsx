import React from 'react';
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  contactEmail: string;
  socialLinks: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
}

const Footer: React.FC<FooterProps> = ({ contactEmail, socialLinks }) => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <a href={`mailto:${contactEmail}`} className="flex items-center space-x-2">
            <Mail className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">Contact: {contactEmail}</span>
          </a>
        </div>
        <div className="flex space-x-4">
          <a href={socialLinks.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 hover:text-blue-400" />
          </a>
          <a href={socialLinks.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-5 h-5 hover:text-blue-600" />
          </a>
          <a href={socialLinks.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 hover:text-pink-500" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;