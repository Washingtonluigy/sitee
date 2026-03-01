import { useState } from 'react';
import HeroEditor from './HeroEditor';
import { Settings, Home, Users, List, Shield, Award, Megaphone, BarChart } from 'lucide-react';

type ContentTab = 'hero' | 'user-type' | 'steps' | 'specialties' | 'transparency' | 'validation' | 'cta' | 'stats';

export default function ContentEditor() {
  const [activeTab, setActiveTab] = useState<ContentTab>('hero');

  const tabs = [
    { id: 'hero' as ContentTab, label: 'Hero', icon: Home },
    { id: 'user-type' as ContentTab, label: 'Escolha do Usuário', icon: Users },
    { id: 'steps' as ContentTab, label: 'Passos', icon: List },
    { id: 'specialties' as ContentTab, label: 'Especialidades', icon: Award },
    { id: 'transparency' as ContentTab, label: 'Transparência', icon: Shield },
    { id: 'validation' as ContentTab, label: 'Validação', icon: Award },
    { id: 'cta' as ContentTab, label: 'CTA Final', icon: Megaphone },
    { id: 'stats' as ContentTab, label: 'Estatísticas', icon: BarChart },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-[#783DAC]" />
        <h1 className="text-3xl font-bold text-gray-900">Editor de Conteúdo</h1>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#783DAC] text-[#783DAC]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'hero' && <HeroEditor />}
        {activeTab !== 'hero' && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Editor "{tabs.find(t => t.id === activeTab)?.label}" em desenvolvimento</p>
            <p className="text-sm">Por enquanto, você pode editar diretamente pelo banco de dados</p>
          </div>
        )}
      </div>
    </div>
  );
}
