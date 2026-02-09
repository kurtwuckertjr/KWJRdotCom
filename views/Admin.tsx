
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Sparkles, Image as ImageIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { CORE_IMAGES } from '../constants';
import { GoogleGenAI } from "@google/genai";

const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState(Category.BITCOIN);
  const [selectedImage, setSelectedImage] = useState(CORE_IMAGES[0].url);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A cinematic 16:9 4K image for a blog titled "${title}". Atmosphere: Professional, dark technical, cryptographic. Prompt: ${prompt}` }]
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setSelectedImage(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (e) {
      console.error("Generation failed:", e);
      // Fallback for demo
      alert("Generation error. Ensure API key is valid for Nano Banana.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-slate-900 mb-12 transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Exit Dashboard
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Editor Form */}
          <div className="lg:col-span-7 space-y-8">
            <header>
              <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Instant Publishing</h1>
              <p className="text-gray-400 text-sm mt-2">Update the frontier from the field.</p>
            </header>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Article Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The Destiny of Scalability..." 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</label>
                  <input 
                    type="text" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-slate-900 uppercase tracking-widest text-xs"
                  >
                    {Object.values(Category).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Excerpt / Narrative</label>
                <textarea 
                  rows={4}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-700 leading-relaxed"
                  placeholder="Summary for LLM indexing..."
                />
              </div>

              <div className="pt-4">
                <button 
                  onClick={handlePublish}
                  disabled={isSaving}
                  className="w-full bg-slate-900 hover:bg-teal-600 text-white py-6 rounded-2xl font-black uppercase tracking-[.2em] transition-all flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : success ? <CheckCircle2 /> : <Save size={20} />}
                  {success ? 'Article Live' : 'Publish to Frontier'}
                </button>
              </div>
            </div>
          </div>

          {/* Media Engine */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Media Engine</h2>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-8">
              {/* Preview */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
                <img src={selectedImage} className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-[5s]" alt="Preview" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-black text-xl leading-tight uppercase tracking-tighter">
                    {title || "Dynamic Headline Overlay"}
                  </h3>
                  <p className="text-teal-400 text-[8px] font-bold tracking-widest uppercase mt-2">Brand Signature Font</p>
                </div>
              </div>

              {/* Core Image Selection */}
              <div className="space-y-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <ImageIcon size={12} /> Legacy Headers
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {CORE_IMAGES.map((img) => (
                    <button 
                      key={img.url}
                      onClick={() => setSelectedImage(img.url)}
                      className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img.url ? 'border-teal-500 scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img.url} className="w-full h-full object-cover" alt={img.name} />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="text-[8px] font-black text-white uppercase bg-black/40 px-2 py-1 rounded">{img.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Generation (Nano Banana) */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Sparkles size={12} className="text-amber-500" /> Nano Banana Engine
                </p>
                <div className="relative">
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe a technical scene..." 
                    className="w-full bg-slate-50 border-none rounded-2xl pl-6 pr-16 py-4 outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-slate-700"
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className="absolute right-2 top-2 bottom-2 aspect-square bg-amber-500 hover:bg-teal-500 text-white rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                  </button>
                </div>
                <p className="text-[8px] text-gray-400 italic">Generates cinematic 16:9 imagery via gemini-2.5-flash-image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;