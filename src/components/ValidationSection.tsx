import doctorsImg from '../assets/WhatsApp_Image_2026-03-06_at_09.25.02.jpeg';

export default function ValidationSection() {
  return (
    <section className="py-16 md:py-20 bg-[#e8edf2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="flex justify-center">
            <img
              src={doctorsImg}
              alt="Profissionais validados"
              className="w-64 md:w-80 lg:w-96 h-auto"
            />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              A Segurança de contar com profissionais validados e capacitados.
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Na Amah, todos os profissionais de enfermagem, prestadores de serviços, são validados e reconhecidos junto ao conselho de suas respectivas regionais, trazendo maior segurança e eficiência para as suas necessidades de cuidados em seu lar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
