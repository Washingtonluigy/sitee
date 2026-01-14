import { useState, useEffect } from 'react';
import { Heart, Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { getFooterLinks, getContactInfo, FooterLink, ContactInfo } from '../services/adminService';

export default function Footer() {
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [links, contact] = await Promise.all([
          getFooterLinks(),
          getContactInfo(),
        ]);
        setFooterLinks(links.filter(l => l.is_active));
        setContactInfo(contact);
      } catch (error) {
        console.error('Erro ao carregar dados do footer:', error);
      }
    };
    loadData();
  }, []);

  const getLinksBySection = (section: string) => {
    return footerLinks
      .filter(link => link.section === section)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <footer className="bg-purple-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-purple-600 rounded-lg p-2">
                <Heart className="w-5 md:w-6 h-5 md:h-6 text-white fill-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">Amah</span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-4 md:mb-6">
              Conectando você aos melhores profissionais de saúde com tecnologia, segurança e humanização.
            </p>
            <div className="flex gap-2 md:gap-3">
              <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = 'https://amahsistema.netlify.app'; }} className="w-9 md:w-10 h-9 md:h-10 bg-gray-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 md:w-5 h-4 md:h-5" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = 'https://amahsistema.netlify.app'; }} className="w-9 md:w-10 h-9 md:h-10 bg-gray-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 md:w-5 h-4 md:h-5" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = 'https://amahsistema.netlify.app'; }} className="w-9 md:w-10 h-9 md:h-10 bg-gray-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-4 md:w-5 h-4 md:h-5" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = 'https://amahsistema.netlify.app'; }} className="w-9 md:w-10 h-9 md:h-10 bg-gray-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 md:w-5 h-4 md:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4">Plataforma</h3>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              {getLinksBySection('Plataforma').map(link => (
                <li key={link.id}>
                  <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = link.url; }} className="hover:text-purple-400 transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4">Empresa</h3>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              {getLinksBySection('Empresa').map(link => (
                <li key={link.id}>
                  <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = link.url; }} className="hover:text-purple-400 transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4">Contato</h3>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
              {contactInfo?.email && (
                <li className="flex items-start gap-2 md:gap-3">
                  <Mail className="w-4 md:w-5 h-4 md:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>{contactInfo.email}</span>
                </li>
              )}
              {contactInfo?.phone && (
                <li className="flex items-start gap-2 md:gap-3">
                  <Phone className="w-4 md:w-5 h-4 md:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>{contactInfo.phone}</span>
                </li>
              )}
              {(contactInfo?.city || contactInfo?.state || contactInfo?.country) && (
                <li className="flex items-start gap-2 md:gap-3">
                  <MapPin className="w-4 md:w-5 h-4 md:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm">
                    {contactInfo.address && <>{contactInfo.address}<br /></>}
                    {contactInfo.city}{contactInfo.state && `, ${contactInfo.state}`}<br />
                    {contactInfo.country}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
            <p className="text-gray-400 text-xs md:text-sm">
              © 2024 Amah. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm flex-wrap justify-center">
              {contactInfo?.terms_url && (
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = contactInfo.terms_url; }} className="hover:text-purple-400 transition-colors">Termos de Uso</a>
              )}
              {contactInfo?.privacy_url && (
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = contactInfo.privacy_url; }} className="hover:text-purple-400 transition-colors">Política de Privacidade</a>
              )}
              {contactInfo?.cookies_url && (
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = contactInfo.cookies_url; }} className="hover:text-purple-400 transition-colors">Cookies</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
