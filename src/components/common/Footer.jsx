import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Mail, Phone, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* 1. MARCA Y REDES */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold mb-4">
              MO <span className="text-mo-pink-600">Indumentaria</span>
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Ropa deportiva diseñada para acompañar tu movimiento con estilo y confort. Industria Argentina.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-mo-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-mo-pink-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 2. TIENDA */}
          <div>
            <h4 className="font-bold text-lg mb-6">Tienda</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/tienda" className="hover:text-white transition-colors">Ver Todo</Link></li>
              <li><Link to="/tienda" className="hover:text-white transition-colors">Leggings</Link></li>
              <li><Link to="/tienda" className="hover:text-white transition-colors">Tops</Link></li>
              <li><Link to="/tienda" className="hover:text-white transition-colors">Conjuntos</Link></li>
            </ul>
          </div>

          {/* 3. AYUDA */}
          <div>
            <h4 className="font-bold text-lg mb-6">Ayuda</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="/nosotros" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link to="/nosotros" className="hover:text-white transition-colors">Guía de Talles</Link></li>
              <li><Link to="/nosotros" className="hover:text-white transition-colors">Cambios y Devoluciones</Link></li>
            </ul>
          </div>

          {/* 4. CONTACTO */}
          <div>
            <h4 className="font-bold text-lg mb-6">Info</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-mo-pink-600 shrink-0" />
                <span>Villa Carlos Paz, Córdoba,<br/>Argentina.</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-mo-pink-600 shrink-0" />
                <span>hola@moindumentaria.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-mo-pink-600 shrink-0" />
                <span>+54 9 3541 00-0000</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p className="flex items-center gap-1">
            © 2024 MO Indumentaria. Hecho con <Heart className="w-3 h-3 text-red-500 fill-current" /> en Córdoba.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-gray-300 cursor-pointer">Privacidad</span>
            <span className="hover:text-gray-300 cursor-pointer">Términos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;