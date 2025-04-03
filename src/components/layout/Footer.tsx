
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  // Random addresses for locations
  const locations = {
    us: {
      address: '1234 Market Street, San Francisco, CA 94103',
      phone: '+1 (415) 555-0123'
    },
    uk: {
      address: '45 Oxford Street, London, W1D 2DZ',
      phone: '+44 20 7123 4567'
    },
    au: {
      address: '789 George Street, Sydney, NSW 2000',
      phone: '+61 2 8765 4321'
    }
  };

  return (
    <footer className="bg-cozy-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">CozyNest</h3>
            <p className="text-gray-300 mb-4">
              Bringing comfort and style to your home with our carefully curated collection of home and kitchen essentials.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-cozy-terracotta transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-cozy-terracotta transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-cozy-terracotta transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="hover:text-cozy-terracotta transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=cookware" className="text-gray-300 hover:text-white transition-colors">Cookware & Bakeware</Link>
              </li>
              <li>
                <Link to="/shop?category=appliances" className="text-gray-300 hover:text-white transition-colors">Kitchen Appliances</Link>
              </li>
              <li>
                <Link to="/shop?category=storage" className="text-gray-300 hover:text-white transition-colors">Storage & Organization</Link>
              </li>
              <li>
                <Link to="/shop?category=dining" className="text-gray-300 hover:text-white transition-colors">Dining & Serveware</Link>
              </li>
              <li>
                <Link to="/shop?category=decor" className="text-gray-300 hover:text-white transition-colors">Home Décor</Link>
              </li>
              <li>
                <Link to="/shop?category=cleaning" className="text-gray-300 hover:text-white transition-colors">Cleaning Supplies</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div>
            <h3 className="text-xl font-bold mb-4">Locations We Serve</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-2">
                <MapPin className="mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold">United States</p>
                  <p className="text-gray-300 text-sm">{locations.us.address}</p>
                  <p className="text-gray-300 text-sm flex items-center mt-1">
                    <Phone size={14} className="mr-1" /> {locations.us.phone}
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold">United Kingdom</p>
                  <p className="text-gray-300 text-sm">{locations.uk.address}</p>
                  <p className="text-gray-300 text-sm flex items-center mt-1">
                    <Phone size={14} className="mr-1" /> {locations.uk.phone}
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold">Australia</p>
                  <p className="text-gray-300 text-sm">{locations.au.address}</p>
                  <p className="text-gray-300 text-sm flex items-center mt-1">
                    <Phone size={14} className="mr-1" /> {locations.au.phone}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CozyNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
