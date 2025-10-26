import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-4">
              Road Accountability Platform
            </h3>
            <p className="text-sm mb-4">
              A citizen-driven platform to track road construction projects, contracts,
              and incidents. Promoting transparency and accountability in infrastructure
              development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/roads" className="hover:text-white transition-colors">
                  Browse Roads
                </Link>
              </li>
              <li>
                <Link to="/contractors" className="hover:text-white transition-colors">
                  Contractors
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-white transition-colors">
                  Upload Document
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="hover:text-white transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Road Accountability Platform. All rights
            reserved.
          </p>
          <p className="mt-2 text-xs">
            Built with transparency and accountability in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;