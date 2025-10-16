// Fichier : components/ArticleCreationForm.tsx
"use client";

import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom'; 
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createArticleAction } from '../_actions/ArticleAction'; 

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
import { cn } from '@/lib/utils'; 


// 🚨 Définir le même type d'état que dans la Server Action
interface ActionState {
    success: boolean;
    message: string;
    articleId?: number; 
    errors?: Record<string, string[] | undefined>;
}

const CATEGORIES = ["Gaming", "Tech", "Séries", "Cinéma", "Tests", "Science", "IA", "Programmation"];
const TYPES: { value: string, label: string }[] = [
  { value: 'news', label: 'Actualité (News)' },
  { value: 'test', label: 'Test/Review' },
  { value: 'video', label: 'Contenu Vidéo' },
];

const initialState: ActionState = {
    success: false,
    message: '',
    articleId: undefined,
    errors: undefined,
};

// Composant pour suivre l'état de soumission
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button 
            type="submit" 
            className="w-full mt-8 py-3 bg-primary-500 text-secondary-900 font-bold text-lg uppercase tracking-wider 
                       rounded-none hover:bg-primary-600 transition-colors flex justify-center items-center gap-3"
            disabled={pending}
        >
            {pending ? (
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
    );
}

// --- FormField composant ---
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
    error?: string; // Ajout d'une prop d'erreur
}

const FormField: React.FC<FormFieldProps> = ({ label, icon: Icon, children, className, error }) => (
    <div className={cn("space-y-2", className)}>
        <label className="flex items-center text-sm font-semibold text-primary-700">
            <Icon className="w-4 h-4 mr-2" />
            {label}
        </label>
        {children}
        {/* Affichage de l'erreur */}
        {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
        )}
    </div>
);
// ------------------------------------


export default function ArticleCreationForm() {
  const router = useRouter();
  
  const [state, formAction] = useActionState(createArticleAction, initialState);
  const errors = state.errors; // Accès facile à l'objet d'erreurs

  useEffect(() => {
    if (state.message && state.message !== initialState.message) {
        if (state.success) {
            toast.success("Succès !", {
                description: state.message,
            });
            router.push('/admin'); 
        } else if (state.message !== "Veuillez corriger les erreurs de validation ci-dessous.") {
             // Afficher l'erreur si c'est une erreur serveur non Zod
            toast.error("Erreur", {
                description: state.message,
            });
        }
    }
  }, [state, router]);


  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-12"> 
      
      <div className="bg-white border border-secondary-300 p-8 md:p-10 shadow-xl mx-auto max-w-4xl"> 
        
        <h1 className="text-3xl font-black text-secondary-900 border-b border-primary-500 pb-2 mb-8">
            <Pencil className="w-6 h-6 inline mr-3 text-primary-500" />
            Nouveau Contenu
        </h1>
        
        {/* Affichage du message d'erreur général Zod/Serveur */}
        {state.message && !state.success && (
            <div className="bg-red-500/10 border border-red-500 text-red-700 p-3 mb-6 text-sm">
                Erreur: {state.message}
            </div>
        )}

        {/* 🚨 Utilisation de l'attribut 'action' pour soumettre au Server Action */}
        <form action={formAction} className="space-y-8">
          
          {/* Section 1: Champs principaux (Grid 2 colonnes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Titre */}
            <FormField label="Titre de l'article" icon={Pencil} error={errors?.title?.[0]}>
              <input
                type="text"
                name="title" 
                className="w-full bg-secondary-100 border border-secondary-300 focus:border-primary-500 text-secondary-900 px-4 py-2 text-base outline-none transition-colors"
                required
              />
            </FormField>

            {/* Catégorie (Select) */}
            <FormField label="Catégorie principale" icon={Tag} error={errors?.category?.[0]}>
              <div className="relative">
                <select
                  name="category" 
                  className="w-full bg-secondary-100 border border-secondary-300 focus:border-primary-500 text-secondary-900 px-4 py-2 text-base outline-none transition-colors appearance-none"
                  required
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none">
                    &#9662; 
                </span>
              </div>
            </FormField>
          </div>
          
          {/* Section 2: Excerpt (Pleine largeur) */}
          <FormField label="Extrait / Description courte" icon={BookOpen} error={errors?.excerpt?.[0]}>
            <textarea
              name="excerpt" 
              rows={4}
              className="w-full bg-secondary-100 border border-secondary-300 focus:border-primary-500 text-secondary-900 px-4 py-3 text-base outline-none transition-colors resize-none"
              required
            ></textarea>
          </FormField>
          
          {/* Section 3: URL d'image (Pleine largeur) */}
          <FormField label="URL de l'image de couverture" icon={Image} error={errors?.image?.[0]}>
            <input
              type="url"
              name="image" 
              className="w-full bg-secondary-100 border border-secondary-300 focus:border-primary-500 text-secondary-900 px-4 py-2 text-base outline-none transition-colors"
              placeholder="https://example.com/image.jpg"
              required
            />
          </FormField>
          
          {/* Section 4: Métadonnées (Grid 3 colonnes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-secondary-300">
            
            {/* Badge */}
            <FormField label="Badge (ex: Test, Rumeur)" icon={FileText} error={errors?.badge?.[0]}>
              <input
                type="text"
                name="badge" 
                className="w-full bg-secondary-100 border border-secondary-300 focus:border-primary-500 text-secondary-900 px-4 py-2 text-base outline-none transition-colors"
                defaultValue="News"
              />
            </FormField>

            {/* Type */}
            <FormField label="Type de contenu" icon={Tag} error={errors?.type?.[0]}>
              <div className="relative">
                <select
                  name="type" 
                  className="w-full bg-secondary-100 border border-secondary-300 focus:border-primary-500 text-secondary-900 px-4 py-2 text-base outline-none transition-colors appearance-none"
                  required
                  defaultValue="news"
                >
                  {TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none">&#9662;</span>
              </div>
            </FormField>

            {/* Temps de lecture */}
            <FormField label="Temps de lecture" icon={Clock} error={errors?.readTime?.[0]}>
              <input
                type="text"
                name="readTime" 
                className="w-full bg-secondary-100 border border-secondary-300 focus:border-primary-500 text-secondary-900 px-4 py-2 text-base outline-none transition-colors"
                defaultValue="5 min"
              />
            </FormField>
          </div>
          
          {/* Section 5: Featured Checkbox */}
          <div className="flex items-center gap-3 pt-4 border-t border-secondary-300">
            <input
              type="checkbox"
              id="featured"
              name="featured" 
              className="w-5 h-5 accent-primary-500 bg-white border-secondary-400 rounded cursor-pointer focus:ring-primary-500" 
            />
            <label htmlFor="featured" className="text-base font-medium text-secondary-700 cursor-pointer">
              Article Mis en Avant (Featured)
            </label>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}