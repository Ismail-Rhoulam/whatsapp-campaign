
import React, { useState, useCallback, useEffect } from 'react';
import { 
  Users, 
  Send, 
  CheckCircle, 
  MailOpen, 
  MousePointer2, 
  DollarSign, 
  Target, 
  FileText, 
  UserMinus, 
  Zap,
  TrendingUp,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import FunnelChartComponent from './components/FunnelChart';
import KPICard from './components/KPICard';
import { CampaignData, KPIResult, FunnelItem } from './types';
import { getCampaignInsights } from './services/geminiService';

const App: React.FC = () => {
  // Static Data from Request
  const campaignData: CampaignData = {
    contacts: 1413,
    sent: 1308,
    delivered: 1226,
    read: 490,
    clicked: 130,
  };

  const kpis: KPIResult = {
    campaignCost: 28.13,
    costPerMessage: 0.02,
    costPerClick: 0.22,
    optOut: 4,
    showedInterest: 3,
    formSubmission: 2,
  };

  // State
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Prepare Funnel Data
  const funnelData: FunnelItem[] = [
    { name: 'Contacts', value: campaignData.contacts, fill: '#0ea5e9', percentage: '100%' },
    { name: 'Sent', value: campaignData.sent, fill: '#38bdf8', percentage: `${((campaignData.sent / campaignData.contacts) * 100).toFixed(1)}%` },
    { name: 'Delivered', value: campaignData.delivered, fill: '#7dd3fc', percentage: `${((campaignData.delivered / campaignData.sent) * 100).toFixed(1)}%` },
    { name: 'Read', value: campaignData.read, fill: '#bae6fd', percentage: `${((campaignData.read / campaignData.delivered) * 100).toFixed(1)}%` },
    { name: 'Clicked', value: campaignData.clicked, fill: '#e0f2fe', percentage: `${((campaignData.clicked / campaignData.read) * 100).toFixed(1)}%` },
  ];

  const handleFetchInsights = useCallback(async () => {
    setLoadingInsights(true);
    const result = await getCampaignInsights(campaignData, kpis);
    setInsights(result || "Could not generate insights.");
    setLoadingInsights(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Campaign Intelligence</h1>
            <p className="text-slate-500 font-medium">Performance Analysis Dashboard v2.4</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleFetchInsights}
              disabled={loadingInsights}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {loadingInsights ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loadingInsights ? 'Analyzing...' : 'AI Insights'}
            </button>
          </div>
        </header>

        {/* Top Tier Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KPICard label="Contacts" value={campaignData.contacts.toLocaleString()} icon={<Users className="w-5 h-5" />} />
          <KPICard label="Sent" value={campaignData.sent.toLocaleString()} icon={<Send className="w-5 h-5" />} />
          <KPICard label="Delivered" value={campaignData.delivered.toLocaleString()} icon={<CheckCircle className="w-5 h-5" />} />
          <KPICard label="Read" value={campaignData.read.toLocaleString()} icon={<MailOpen className="w-5 h-5" />}/>
          <KPICard label="Clicked" value={campaignData.clicked.toLocaleString()} icon={<MousePointer2 className="w-5 h-5" />}/>
          <KPICard label="CTR" value={`${((campaignData.clicked / campaignData.read) * 100).toFixed(1)}%`} icon={<Zap className="w-5 h-5" />} />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Funnel Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Conversion Funnel</h2>
                <p className="text-sm text-slate-500">Stage-by-stage dropoff analysis</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100">Healthy Delivery</span>
              </div>
            </div>
            <FunnelChartComponent data={funnelData} />
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-50">
                <div className="text-center">
                    <p className="text-xs text-slate-400 font-bold uppercase">Reach Rate</p>
                    <p className="text-lg font-bold text-slate-700">{((campaignData.sent / campaignData.contacts) * 100).toFixed(1)}%</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-400 font-bold uppercase">Open Rate</p>
                    <p className="text-lg font-bold text-slate-700">{((campaignData.read / campaignData.delivered) * 100).toFixed(1)}%</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-400 font-bold uppercase">Click-To-Open</p>
                    <p className="text-lg font-bold text-slate-700">{((campaignData.clicked / campaignData.read) * 100).toFixed(1)}%</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-400 font-bold uppercase">Dropoff Rate</p>
                    <p className="text-lg font-bold text-rose-500">{((1 - campaignData.clicked / campaignData.contacts) * 100).toFixed(1)}%</p>
                </div>
            </div>
          </div>

          {/* KPI Showcase Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" /> Cost Efficiency
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Total Campaign Cost</span>
                  <span className="text-lg font-bold text-slate-900">${kpis.campaignCost}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Cost Per Message</span>
                  <span className="text-lg font-bold text-slate-900">${kpis.costPerMessage}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Cost Per Click</span>
                  <span className="text-lg font-bold text-blue-600">${kpis.costPerClick}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" /> Conversion Quality
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
                    <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                        <UserMinus className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Opt-outs</p>
                        <p className="text-xl font-bold text-slate-900">{kpis.optOut}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
                    <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Showed Interest</p>
                        <p className="text-xl font-bold text-slate-900">{kpis.showedInterest}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
                    <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Form Submissions</p>
                        <p className="text-xl font-bold text-slate-900">{kpis.formSubmission}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gemini AI Insights Section */}
        {insights && (
          <section className="bg-white p-8 rounded-3xl shadow-lg border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-600 text-white rounded-lg shadow-blue-200 shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">AI Campaign Optimization</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              <div className="whitespace-pre-wrap">{insights}</div>
            </div>
            <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setInsights(null)} 
                  className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Dismiss Analysis
                </button>
            </div>
          </section>
        )}

      </div>
      
      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto mt-12 pb-8 text-center border-t border-slate-200 pt-8">
        <p className="text-sm text-slate-400 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
          Powered by <span className="text-blue-600 font-bold">InsightEngine</span> & Gemini AI
        </p>
      </footer>
    </div>
  );
};

export default App;
