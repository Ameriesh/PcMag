// Fichier : components/ArticleCreationForm.tsx
"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


import { 
  Pencil, 
  BookOpen, 
  Image, 
  Tag, 
  Clock, 
  FileText,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assurez-vous d'avoir cet utilitaire

// 

interface FormData {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  badge: string;
  type: 'news' | 'test' | 'video';
  readTime: string;
  featured: boolean;
}

const CATEGORIES = ["Gaming", "Tech", "Séries", "Cinéma", "Tests", "Science", "IA", "Programmation"];
const TYPES: { value: FormData['type'], label: string }[] = [
  { value: 'news', label: 'Actualité (News)' },
  { value: 'test', label: 'Test/Review' },
  { value: 'video', label: 'Contenu Vidéo' },
];

// --- NOUVEAU COMPOSANT FIELD POUR UN DESIGN CLAIR ---
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, icon: Icon, children, className }) => (
    <div className={cn("space-y-2", className)}>
        <label className="flex items-center text-sm font-semibold text-primary-400">
            <Icon className="w-4 h-4 mr-2" />
            {label}
        </label>
        {children}
    </div>
);
// ---------------------------------------------------


export default function ArticleCreationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    excerpt: '',
    image: '',
    category: CATEGORIES[0],
    badge: 'News',
    type: 'news',
    readTime: '5 min',
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (response.ok) {
     toast.success("Success", {
      description: "L'article a ete creer"
     })
      router.push('/'); 
    } else {
      toast.error('Error', {
        description: "Une erreur est survenue"
      })
    }
  };


  return (
    // Conteneur principal: Grand padding, fond sombre (hérité du layout)
    <div className="w-full py-12 px-4 sm:px-6 lg:px-12"> 
      
      {/* Conteneur de la carte de formulaire: Bordure fine, fond légèrement plus clair */}
      <div className="bg-secondary-800 border border-secondary-700 p-8 md:p-10 shadow-2xl mx-auto max-w-4xl"> 
        
        {/* Titre de la page */}
        <h1 className="text-3xl font-black text-white border-b border-primary-500 pb-2 mb-8">
            <Pencil className="w-6 h-6 inline mr-3 text-primary-500" />
            Nouveau Contenu
        </h1>
        
        {/* Message d'erreur */}
        {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-300 p-3 mb-6 text-sm">
                Erreur: {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Champs principaux (Grid 2 colonnes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Titre */}
            <FormField label="Titre de l'article" icon={Pencil}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-secondary-900 border border-secondary-600 focus:border-primary-500 text-secondary-100 px-4 py-2 text-base outline-none transition-colors"
                required
              />
            </FormField>

            {/* Catégorie (Select) */}
            <FormField label="Catégorie principale" icon={Tag}>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-secondary-900 border border-secondary-600 focus:border-primary-500 text-secondary-100 px-4 py-2 text-base outline-none transition-colors appearance-none"
                  required
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {/* Icône de flèche custom pour le select */}
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none">
                    &#9662; 
                </span>
              </div>
            </FormField>
          </div>
          
          {/* Section 2: Excerpt (Pleine largeur) */}
          <FormField label="Extrait / Description courte" icon={BookOpen}>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={4}
              className="w-full bg-secondary-900 border border-secondary-600 focus:border-primary-500 text-secondary-100 px-4 py-3 text-base outline-none transition-colors resize-none"
              required
            ></textarea>
          </FormField>
          
          {/* Section 3: URL d'image (Pleine largeur) */}
          <FormField label="URL de l'image de couverture" icon={Image}>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-secondary-900 border border-secondary-600 focus:border-primary-500 text-secondary-100 px-4 py-2 text-base outline-none transition-colors"
              placeholder="https://example.com/image.jpg"
              required
            />
          </FormField>
          
          {/* Section 4: Métadonnées (Grid 3 colonnes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-secondary-700">
            
            {/* Badge */}
            <FormField label="Badge (ex: Test, Rumeur)" icon={FileText}>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                className="w-full bg-secondary-900 border border-secondary-600 focus:border-primary-500 text-secondary-100 px-4 py-2 text-base outline-none transition-colors"
              />
            </FormField>

            {/* Type */}
            <FormField label="Type de contenu" icon={Tag}>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-secondary-900 border border-secondary-600 focus:border-primary-500 text-secondary-100 px-4 py-2 text-base outline-none transition-colors appearance-none"
                  required
                >
                  {TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none">
                    &#9662;
                </span>
              </div>
            </FormField>

            {/* Temps de lecture */}
            <FormField label="Temps de lecture (ex: 5 min)" icon={Clock}>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                className="w-full bg-secondary-900 border border-secondary-600 focus:border-primary-500 text-secondary-100 px-4 py-2 text-base outline-none transition-colors"
              />
            </FormField>
          </div>
          
          {/* Section 5: Featured Checkbox */}
          <div className="flex items-center gap-3 pt-4 border-t border-secondary-700">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              // Style Checkbox: utilise la couleur primaire comme accent
              className="w-5 h-5 accent-primary-500 bg-secondary-700 border-secondary-600 rounded cursor-pointer focus:ring-primary-500" 
            />
            <label htmlFor="featured" className="text-base font-medium text-secondary-100 cursor-pointer">
              Article Mis en Avant (Featured)
            </label>
          </div>

          {/* Bouton de Soumission */}
          <button 
            type="submit" 
            // Nouveau style de bouton basé sur votre btn-primary, mais adapté au contexte admin
            className="w-full mt-8 py-3 bg-primary-500 text-secondary-900 font-bold text-lg uppercase tracking-wider 
                       rounded-none hover:bg-primary-600 transition-colors flex justify-center items-center gap-3"
            disabled={loading}
          >
            {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  PUBLICATION EN COURS
                </>
            ) : (
                <>
                  <CheckCircle2 className="w-5 h-5"/>
                  PUBLIER L'ARTICLE
                </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}