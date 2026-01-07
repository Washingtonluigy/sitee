import { useState, useEffect } from 'react';
import { Settings, Video, MessageSquare, Save, Plus, Trash2, Eye, EyeOff, Link as LinkIcon, Edit } from 'lucide-react';
import {
  getSiteConfig,
  updateSiteConfig,
  getVideos,
  addVideo,
  updateVideo,
  deleteVideo,
  getAllTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getFooterLinks,
  addFooterLink,
  updateFooterLink,
  deleteFooterLink,
  getContactInfo,
  updateContactInfo,
  SiteConfig,
  Video as VideoType,
  Testimonial,
  FooterLink,
  ContactInfo,
} from '../services/adminService';

type TabType = 'config' | 'videos' | 'testimonials' | 'footer';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabType>('config');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  const [newVideo, setNewVideo] = useState({ title: '', description: '', video_url: '', thumbnail_url: '' });
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', content: '', rating: 5, image_url: '', is_active: true });
  const [newFooterLink, setNewFooterLink] = useState({ section: 'Plataforma', title: '', url: '', order: 0, is_active: true });

  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [configData, videosData, testimonialsData, footerLinksData, contactInfoData] = await Promise.all([
        getSiteConfig(),
        getVideos(),
        getAllTestimonials(),
        getFooterLinks(),
        getContactInfo(),
      ]);
      setConfig(configData);
      setVideos(videosData);
      setTestimonials(testimonialsData);
      setFooterLinks(footerLinksData);
      setContactInfo(contactInfoData || {
        id: '',
        email: 'contato@amah.com.br',
        phone: '(11) 4000-0000',
        address: '',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        terms_url: 'https://amah-sistema-de-saude.netlify.app',
        privacy_url: 'https://amah-sistema-de-saude.netlify.app',
        cookies_url: 'https://amah-sistema-de-saude.netlify.app',
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      showMessage('Erro ao carregar dados', 'error');
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(`${type === 'success' ? '✓' : '✗'} ${msg}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleConfigSave = async () => {
    if (!config) return;
    setLoading(true);
    try {
      await updateSiteConfig(config);
      showMessage('Configurações salvas com sucesso!');
    } catch (error) {
      showMessage('Erro ao salvar configurações', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async () => {
    if (!newVideo.title || !newVideo.video_url) {
      showMessage('Preencha título e URL do vídeo', 'error');
      return;
    }
    setLoading(true);
    try {
      const video = await addVideo({ ...newVideo, is_active: true });
      setVideos([video, ...videos]);
      setNewVideo({ title: '', description: '', video_url: '', thumbnail_url: '' });
      showMessage('Vídeo adicionado com sucesso!');
    } catch (error) {
      showMessage('Erro ao adicionar vídeo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este vídeo?')) return;
    setLoading(true);
    try {
      await deleteVideo(id);
      setVideos(videos.filter(v => v.id !== id));
      showMessage('Vídeo deletado com sucesso!');
    } catch (error) {
      showMessage('Erro ao deletar vídeo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditVideo = (video: VideoType) => {
    setEditingVideoId(video.id);
    setEditingVideo({ ...video });
  };

  const handleSaveVideo = async () => {
    if (!editingVideo || !editingVideoId) return;
    setLoading(true);
    try {
      await updateVideo(editingVideoId, editingVideo);
      setVideos(videos.map(v => v.id === editingVideoId ? editingVideo : v));
      setEditingVideoId(null);
      setEditingVideo(null);
      showMessage('Vídeo atualizado com sucesso!');
    } catch (error) {
      showMessage('Erro ao atualizar vídeo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEditVideo = () => {
    setEditingVideoId(null);
    setEditingVideo(null);
  };

  const handleAddTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.content) {
      showMessage('Preencha nome e conteúdo do depoimento', 'error');
      return;
    }
    setLoading(true);
    try {
      const testimonial = await addTestimonial(newTestimonial);
      setTestimonials([testimonial, ...testimonials]);
      setNewTestimonial({ name: '', role: '', content: '', rating: 5, image_url: '', is_active: true });
      showMessage('Depoimento adicionado com sucesso!');
    } catch (error) {
      showMessage('Erro ao adicionar depoimento', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTestimonial = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      await updateTestimonial(id, { is_active: !isActive });
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_active: !isActive } : t));
      showMessage(`Depoimento ${!isActive ? 'ativado' : 'desativado'}!`);
    } catch (error) {
      showMessage('Erro ao atualizar depoimento', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este depoimento?')) return;
    setLoading(true);
    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
      showMessage('Depoimento deletado com sucesso!');
    } catch (error) {
      showMessage('Erro ao deletar depoimento', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFooterLink = async () => {
    if (!newFooterLink.title || !newFooterLink.url) {
      showMessage('Preencha título e URL do link', 'error');
      return;
    }
    setLoading(true);
    try {
      const link = await addFooterLink(newFooterLink);
      setFooterLinks([...footerLinks, link]);
      setNewFooterLink({ section: 'Plataforma', title: '', url: '', order: 0, is_active: true });
      showMessage('Link adicionado com sucesso!');
    } catch (error) {
      showMessage('Erro ao adicionar link', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFooterLink = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      await updateFooterLink(id, { is_active: !isActive });
      setFooterLinks(footerLinks.map(l => l.id === id ? { ...l, is_active: !isActive } : l));
      showMessage(`Link ${!isActive ? 'ativado' : 'desativado'}!`);
    } catch (error) {
      showMessage('Erro ao atualizar link', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFooterLink = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este link?')) return;
    setLoading(true);
    try {
      await deleteFooterLink(id);
      setFooterLinks(footerLinks.filter(l => l.id !== id));
      showMessage('Link deletado com sucesso!');
    } catch (error) {
      showMessage('Erro ao deletar link', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditLink = (link: FooterLink) => {
    setEditingLinkId(link.id);
    setEditingLink({ ...link });
  };

  const handleSaveLink = async () => {
    if (!editingLink || !editingLinkId) return;
    setLoading(true);
    try {
      await updateFooterLink(editingLinkId, editingLink);
      setFooterLinks(footerLinks.map(l => l.id === editingLinkId ? editingLink : l));
      setEditingLinkId(null);
      setEditingLink(null);
      showMessage('Link atualizado com sucesso!');
    } catch (error) {
      showMessage('Erro ao atualizar link', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEditLink = () => {
    setEditingLinkId(null);
    setEditingLink(null);
  };

  const handleContactInfoSave = async () => {
    if (!contactInfo) return;
    setLoading(true);
    try {
      const updatedInfo = await updateContactInfo(contactInfo);
      setContactInfo(updatedInfo);
      showMessage('Informações de contato salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      showMessage('Erro ao salvar informações de contato', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Painel de Administração</h1>
          <p className="text-gray-600">Gerencie o conteúdo do seu site</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-lg shadow p-2">
          {[
            { id: 'config', label: 'Configurações', icon: Settings },
            { id: 'videos', label: 'Vídeos', icon: Video },
            { id: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
            { id: 'footer', label: 'Footer & Contato', icon: LinkIcon },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {activeTab === 'config' && config && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações do Site</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Título Principal</label>
                  <input
                    type="text"
                    value={config.hero_title}
                    onChange={(e) => setConfig({ ...config, hero_title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subtítulo</label>
                  <input
                    type="text"
                    value={config.hero_subtitle}
                    onChange={(e) => setConfig({ ...config, hero_subtitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                  <textarea
                    value={config.hero_description}
                    onChange={(e) => setConfig({ ...config, hero_description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 h-24"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL da Logomarca</label>
                  <input
                    type="url"
                    value={config.logo_url}
                    onChange={(e) => setConfig({ ...config, logo_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Texto Botão Primário</label>
                  <input
                    type="text"
                    value={config.button_primary_text}
                    onChange={(e) => setConfig({ ...config, button_primary_text: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Link Botão Primário</label>
                  <input
                    type="url"
                    value={config.button_primary_link}
                    onChange={(e) => setConfig({ ...config, button_primary_link: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Texto Botão Secundário</label>
                  <input
                    type="text"
                    value={config.button_secondary_text}
                    onChange={(e) => setConfig({ ...config, button_secondary_text: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Link Botão Secundário</label>
                  <input
                    type="url"
                    value={config.button_secondary_link}
                    onChange={(e) => setConfig({ ...config, button_secondary_link: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <button
                onClick={handleConfigSave}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Salvando...' : 'Salvar Configurações'}
              </button>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gerenciar Vídeos</h2>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-gray-900">Adicionar Novo Vídeo</h3>
                <input
                  type="text"
                  placeholder="Título do vídeo"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="text"
                  placeholder="Descrição (opcional)"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="url"
                  placeholder="URL do vídeo (Youtube, Vimeo, etc)"
                  value={newVideo.video_url}
                  onChange={(e) => setNewVideo({ ...newVideo, video_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="url"
                  placeholder="URL da thumbnail (opcional)"
                  value={newVideo.thumbnail_url}
                  onChange={(e) => setNewVideo({ ...newVideo, thumbnail_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  onClick={handleAddVideo}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar Vídeo
                </button>
              </div>

              <div className="space-y-4">
                {videos.map(video => (
                  <div key={video.id} className="bg-gray-50 p-4 rounded-lg">
                    {editingVideoId === video.id && editingVideo ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Título do vídeo"
                          value={editingVideo.title}
                          onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input
                          type="text"
                          placeholder="Descrição"
                          value={editingVideo.description}
                          onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input
                          type="url"
                          placeholder="URL do vídeo"
                          value={editingVideo.video_url}
                          onChange={(e) => setEditingVideo({ ...editingVideo, video_url: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input
                          type="url"
                          placeholder="URL da thumbnail"
                          value={editingVideo.thumbnail_url}
                          onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail_url: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveVideo}
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                          >
                            <Save className="w-4 h-4" />
                            Salvar
                          </button>
                          <button
                            onClick={handleCancelEditVideo}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{video.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                          <p className="text-xs text-gray-500 mt-2 truncate">{video.video_url}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditVideo(video)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteVideo(video.id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                            Deletar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gerenciar Depoimentos</h2>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-gray-900">Adicionar Novo Depoimento</h3>
                <input
                  type="text"
                  placeholder="Nome"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="text"
                  placeholder="Profissão/Cargo (ex: Paciente, Médico)"
                  value={newTestimonial.role}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <textarea
                  placeholder="Depoimento"
                  value={newTestimonial.content}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 h-24"
                />
                <input
                  type="url"
                  placeholder="URL da foto"
                  value={newTestimonial.image_url}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={newTestimonial.rating}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} Estrelas</option>
                  ))}
                </select>
                <button
                  onClick={handleAddTestimonial}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar Depoimento
                </button>
              </div>

              <div className="space-y-4">
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          {testimonial.image_url && (
                            <img src={testimonial.image_url} alt={testimonial.name} className="w-8 h-8 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-sm text-gray-700 mt-2">{testimonial.content}</p>
                        <p className="text-xs text-yellow-600 mt-2">{'⭐'.repeat(testimonial.rating)}</p>
                      </div>
                      <div className="flex gap-2 md:flex-col">
                        <button
                          onClick={() => handleToggleTestimonial(testimonial.id, testimonial.is_active)}
                          className={`font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all ${
                            testimonial.is_active
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-400 hover:bg-gray-500 text-white'
                          }`}
                        >
                          {testimonial.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          {testimonial.is_active ? 'Ativo' : 'Inativo'}
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                          Deletar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'footer' && contactInfo && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                    <input
                      type="text"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Endereço</label>
                    <input
                      type="text"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade</label>
                    <input
                      type="text"
                      value={contactInfo.city}
                      onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                    <input
                      type="text"
                      value={contactInfo.state}
                      onChange={(e) => setContactInfo({ ...contactInfo, state: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">País</label>
                    <input
                      type="text"
                      value={contactInfo.country}
                      onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">URL Termos de Uso</label>
                    <input
                      type="url"
                      value={contactInfo.terms_url}
                      onChange={(e) => setContactInfo({ ...contactInfo, terms_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">URL Política de Privacidade</label>
                    <input
                      type="url"
                      value={contactInfo.privacy_url}
                      onChange={(e) => setContactInfo({ ...contactInfo, privacy_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">URL Política de Cookies</label>
                    <input
                      type="url"
                      value={contactInfo.cookies_url}
                      onChange={(e) => setContactInfo({ ...contactInfo, cookies_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>
                <button
                  onClick={handleContactInfoSave}
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Salvando...' : 'Salvar Informações de Contato'}
                </button>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Links do Footer</h2>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900">Adicionar Novo Link</h3>
                  <select
                    value={newFooterLink.section}
                    onChange={(e) => setNewFooterLink({ ...newFooterLink, section: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Plataforma">Plataforma</option>
                    <option value="Empresa">Empresa</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Título do link"
                    value={newFooterLink.title}
                    onChange={(e) => setNewFooterLink({ ...newFooterLink, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="url"
                    placeholder="URL do link"
                    value={newFooterLink.url}
                    onChange={(e) => setNewFooterLink({ ...newFooterLink, url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="number"
                    placeholder="Ordem (0 = primeiro)"
                    value={newFooterLink.order}
                    onChange={(e) => setNewFooterLink({ ...newFooterLink, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button
                    onClick={handleAddFooterLink}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5" />
                    Adicionar Link
                  </button>
                </div>

                <div className="space-y-4">
                  {['Plataforma', 'Empresa'].map(section => {
                    const sectionLinks = footerLinks.filter(l => l.section === section);
                    return (
                      <div key={section}>
                        <h3 className="font-bold text-lg mb-3">{section}</h3>
                        <div className="space-y-2">
                          {sectionLinks.map(link => (
                            <div key={link.id} className="bg-gray-50 p-4 rounded-lg">
                              {editingLinkId === link.id && editingLink ? (
                                <div className="space-y-3">
                                  <select
                                    value={editingLink.section}
                                    onChange={(e) => setEditingLink({ ...editingLink, section: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                  >
                                    <option value="Plataforma">Plataforma</option>
                                    <option value="Empresa">Empresa</option>
                                  </select>
                                  <input
                                    type="text"
                                    placeholder="Título do link"
                                    value={editingLink.title}
                                    onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                  />
                                  <input
                                    type="url"
                                    placeholder="URL do link"
                                    value={editingLink.url}
                                    onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                  />
                                  <input
                                    type="number"
                                    placeholder="Ordem"
                                    value={editingLink.order}
                                    onChange={(e) => setEditingLink({ ...editingLink, order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={handleSaveLink}
                                      disabled={loading}
                                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                    >
                                      <Save className="w-4 h-4" />
                                      Salvar
                                    </button>
                                    <button
                                      onClick={handleCancelEditLink}
                                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">#{link.order}</span>
                                      <h4 className="font-semibold text-gray-900">{link.title}</h4>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 truncate">{link.url}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleToggleFooterLink(link.id, link.is_active)}
                                      className={`font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all ${
                                        link.is_active
                                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                          : 'bg-gray-400 hover:bg-gray-500 text-white'
                                      }`}
                                    >
                                      {link.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    <button
                                      onClick={() => handleEditLink(link)}
                                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteFooterLink(link.id)}
                                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
