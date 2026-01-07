import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTestimonials, Testimonial } from '../services/adminService';

export default function SocialProof() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Quem já usa a Amah
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100"
            >
              <Quote className="w-10 h-10 text-purple-500/20 mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 md:gap-4">
                {testimonial.image_url && (
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.name}
                    className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 text-sm md:text-base truncate">{testimonial.name}</div>
                  <div className="text-xs md:text-sm text-gray-500 truncate">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
          <div className="text-center p-4 bg-white rounded-xl shadow">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-purple-600 mb-1">98%</div>
            <div className="text-xs text-gray-600">Satisfação</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-purple-600 mb-1">500+</div>
            <div className="text-xs text-gray-600">Profissionais</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-purple-600 mb-1">10k+</div>
            <div className="text-xs text-gray-600">Atendimentos</div>
          </div>
        </div>
      </div>
    </section>
  );
}
