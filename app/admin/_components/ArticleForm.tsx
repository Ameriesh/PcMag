// Fichier : components/ArticleCreationForm.tsx
"use client";

import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom'; 
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createArticleAction } from '../_actions/ArticleAction'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Pencil, 
  BookOpen, 
  Image, 
  Tag, 
  Clock, 
  FileText,
  CheckCircle2,
  Loader2,
  PlusCircle
} from 'lucide-react';
import { cn } from '@/lib/utils'; 
import { Button } from '@/components/ui/button';


interface ActionState {
    success: boolean;
    message: string;
    articleId?: number; 
    errors?: Record<string, string[] | undefined>;
}
interface CategoryData{
  id: number;
  title: string;
}
interface TypeData{
  id: number;
  name: string;
}

interface ArticleCreationProps{
  categories : CategoryData[];
  
}

interface TypeProps{
  type : TypeData[];
}

const initialState: ActionState = {
    success: false,
    message: '',
    articleId: undefined,
    errors: undefined,
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button 
            type="submit" 
            className="btn-primary w-full py-3 mt-8 text-lg font-bold tracking-wider" // Réutilise le btn-primary raffiné
            disabled={pending}
        >
            {pending ? (
                <>
                  <Loader2 className="w-5 h-5 py-3 animate-spin" />
                  PUBLICATION EN COURS
                </>
            ) : (
                <>
                  <CheckCircle2 className="w-5 top-2 h-5"/>
                  PUBLIER L'ARTICLE
                </>
            )}
        </Button>
    );
}

// --- FormField composant ---
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
    error?: string; 
}

const FormField: React.FC<FormFieldProps> = ({ label, icon: Icon, children, className, error }) => (
    <div className={cn("space-y-2", className)}>
        <label className="flex items-center text-sm font-semibold text-secondary-800"> {/* Label plus sobre */}
            <Icon className="w-4 h-4 mr-2 text-primary-600" /> {/* Icône en Cyan */}
            {label}
        </label>
        {children}
        {error && (
            <p className="text-sm text-red-500 font-medium pt-1">{error}</p>
        )}
    </div>
);
// ------------------------------------


export default function ArticleCreationForm({ categories = []} : ArticleCreationProps,  {type = []} : TypeProps) {
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
      
      {/* Conteneur principal: Fond blanc, bords arrondis, ombre légère */}
      <div className="bg-white border border-secondary-200 p-8 md:p-10 shadow-lg mx-auto max-w-4xl rounded-lg"> 
        
        {/* Titre de la section */}
        <h1 className="text-3xl font-black text-center text-secondary-900 border-b-2 border-primary-500 pb-3 mb-8">
            <PlusCircle className="w-6 h-6 inline mr-3 text-primary-500" />
           Ajouter un Article
        </h1>
        
        {/* Affichage de l'erreur générale */}
        {state.message && !state.success && (
            <div className="bg-red-50/70 border border-red-300 text-red-700 p-3 mb-6 text-sm rounded-md">
                Erreur: {state.message}
            </div>
        )}

        <form action={formAction} className="space-y-8">
          
          {/* Section 1: Champs principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Standard (Titre) */}
            <FormField label="Titre de l'article" icon={Pencil} error={errors?.title?.[0]}>
              <input
                type="text"
                name="title" 
                // Nouvelle classe pour un input épuré et moderne
                className="input-form-v2"
                required
              />
            </FormField>

            <FormField label="Catégorie principale" icon={Tag} error={errors?.category?.[0]}>
              <div className="relative">
                
                <div className=''>
                <Select required name="category ">
                    
                    <SelectTrigger className="w-full input-form-v2 !h-12 !py-4">
              
                        <SelectValue placeholder={categories.length === 0 ? "Créer une catégorie" : "Sélectionner une catégorie"} />
                    </SelectTrigger>
                    
                    <SelectContent className="bg-white border border-secondary-200 shadow-lg rounded-md p-1">
                        {categories.length === 0 && (
                            <SelectItem value="" disabled className="text-secondary-500">
                                Créer une catégorie
                            </SelectItem>
                        )}
                        {categories.map(cat => (
                            <SelectItem 
                                key={cat.id} 
                                value={cat.id.toString()} 
                                className="text-secondary-800 hover:bg-primary-50 focus:bg-primary-50 
                                           focus:text-primary-800 cursor-pointer"
                            >
                                {cat.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    
                </Select>
                </div>
               
              </div>
            </FormField>
          </div>
          
          {/* Section 2: Textarea (Excerpt) */}
          <FormField label="Extrait / Description courte" icon={BookOpen} error={errors?.excerpt?.[0]}>
            <textarea
              name="excerpt" 
              rows={4}
              className="input-form-v2 resize-y" // Utilise input-form-v2 pour textarea
              required
            ></textarea>
          </FormField>
          
          {/* Section 3: URL d'image */}
          <FormField label="URL de l'image de couverture" icon={Image} error={errors?.image?.[0]}>
            <input
              type="url"
              name="image" 
              className="input-form-v2"
              placeholder="https://example.com/image.jpg"
              required
            />
          </FormField>
          
          {/* Section 4: Métadonnées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-secondary-200">
            
            {/* Input (Badge) */}
            <FormField label="Badge (ex: Test)" icon={FileText} error={errors?.badge?.[0]}>
              <input
                type="text"
                name="badge" 
                className="input-form-v2"
                defaultValue="News"
              />
            </FormField>

            {/* Select (Type) */}
             <FormField label="Type de contenu" icon={Tag} error={errors?.category?.[0]}>
              <div className="relative">
                
                <div className=''>
                <Select>
                    
                    <SelectTrigger className="w-full input-form-v2 !h-12 !py-4">
              
                        <SelectValue placeholder={type.length === 0 ? "Créer un type" : "Sélectionner un type"} />
                    </SelectTrigger>
                    
                    <SelectContent className="bg-white border border-secondary-200 shadow-lg rounded-md p-1">
                       
                        {type.map(t => (
                            <SelectItem 
                                key={t.id} 
                                value={t.id.toString()} 
                                className="text-secondary-800 hover:bg-primary-50 focus:bg-primary-50 
                                           focus:text-primary-800 cursor-pointer"
                            >
                                {t.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    
                </Select>
                </div>
               
              </div>
            </FormField>

            {/* Input (Temps de lecture) */}
            <FormField label="Temps de lecture" icon={Clock} error={errors?.readTime?.[0]}>
              <input
                type="text"
                name="readTime" 
                className="input-form-v2"
                defaultValue="5 min"
              />
            </FormField>
          </div>
          
          {/* Section 5: Featured Checkbox */}
          <div className="flex items-center gap-3 pt-4 border-t border-secondary-200">
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