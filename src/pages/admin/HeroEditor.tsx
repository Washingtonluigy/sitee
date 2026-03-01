import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getHeroContent, updateHeroContent, HeroContent } from '../../services/adminService';

export default function HeroEditor() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getHeroContent();
      if (data) setContent(data);
    } catch (error) {
      console.error('Error loading hero content:', error);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setLoading(true);
    try {
      await updateHeroContent(content);
      setMessage('✓ Hero salvo com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Erro ao salvar');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!content) return <div>Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Seção Hero (Principal)</h2>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#783DAC] text-white rounded-lg hover:bg-[#6a34a0] disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-lg ${message.startsWith('✓') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Badge/Etiqueta</label>
          <input
            type="text"
            value={content.badge_text}
            onChange={(e) => setContent({ ...content, badge_text: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783DAC] focus:border-transparent"
            placeholder="🏥 PLATAFORMA DE PROFISSIONAIS DA SAÚDE"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783DAC] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título Destacado (Roxo)</label>
          <input
            type="text"
            value={content.title_highlight}
            onChange={(e) => setContent({ ...content, title_highlight: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783DAC] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <textarea
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783DAC] focus:border-transparent"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto Botão Primário</label>
            <input
              type="text"
              value={content.button_primary_text}
              onChange={(e) => setContent({ ...content, button_primary_text: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783DAC] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto Botão Secundário</label>
            <input
              type="text"
              value={content.button_secondary_text}
              onChange={(e) => setContent({ ...content, button_secondary_text: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783DAC] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem Hero</label>
          <input
            type="text"
            value={content.hero_image_url || ''}
            onChange={(e) => setContent({ ...content, hero_image_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783DAC] focus:border-transparent"
            placeholder="https://..."
          />
          <p className="text-sm text-gray-500 mt-1">Se vazio, usa a imagem padrão</p>
        </div>
      </div>
    </div>
  );
}
