// Fichier : components/ArticleCreationForm.tsx

"use client";

import React, { useEffect, useState } from 'react';

import { useFormStatus } from 'react-dom'; 
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
// Assurez-vous d'avoir les imports corrects pour vos actions
import { createArticleAction, updateArticleAction } from '../_actions/ArticleAction'; 
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { 
  Pencil, BookOpen, Image, Tag, Clock, FileText, CheckCircle2, LayoutGrid
} from 'lucide-react'; 
import { cn } from '@/lib/utils'; 
import { Button } from "@/components/ui/button"; // Assurez-vous d'avoir l'import Button
import { Spinner } from '@/components/ui/spinner';
import MDEditor from '@uiw/react-md-editor';
// 💡 Import de next-international
import { useI18n, useScopedI18n } from '@/locales/client';

// --- INTERFACES ET TYPES (Inchagngées) ---
interface ActionState {
    success: boolean;
    message: string;
    articleId?: number; 
    errors?: Record<string, string[] | undefined>;
}
interface CategoryData{ id: number; title: string; }
interface TypeData{ id: number; name: string; }

interface FullArticleData {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    categoryId: number;
    typeId: number;
    badge: string;
    readTime: string;
    featured: boolean;
    content: string; 
    pitch: string; 
    videoUrl: string; 
}

interface ArticleCreationProps {
  categories : CategoryData[];
  types : TypeData[]; 
  initialData?: FullArticleData; 
  isEditMode?: boolean; 
  onSuccess?: () => void;
}

const initialState: ActionState = {
    success: false,
    message: '',
    articleId: undefined,
    errors: undefined,
};


// --- Composants Enfants (SubmitButton) ---
function SubmitButton({ isEditMode }: { isEditMode: boolean }) {
    const { pending } = useFormStatus();
    // 💡 Utilisez le hook dans le composant enfant
    const t = useScopedI18n('create');
    
    // Déterminer les textes basés sur la traduction
    const pendingText = isEditMode ? 'MISE À JOUR EN COURS' : 'PUBLICATION EN COURS'; // Laissez les majuscules ici pour le style si vous n'avez pas de clé
    const actionText = isEditMode ? t('update_action') : t('publish_action');

    return (
        <Button 
            type="submit" 
            className="btn-secondary py-3 p-4 mt-8 text-lg font-bold tracking-wider"
            disabled={pending}
        >
            {pending ? (
                <>
                  <Spinner/>
                  {pendingText} 
                </>
            ) : (
                <>
                  <CheckCircle2 className="w-5 top-2 h-5"/>
                  {actionText} 
                </>
            )}
        </Button>
    );
}

// --- Composant FormField (Inchangé) ---
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
    error?: string; 
}

const FormField: React.FC<FormFieldProps> = ({ label, icon: Icon, children, className, error }) => (
    <div className={cn("space-y-2", className)}>
        <label className="flex items-center text-sm font-semibold text-secondary-800">
            <Icon className="w-4 h-4 mr-2 text-primary-600" />
            {label}
        </label>
        {children}
        {error && (
            <p className="text-sm text-red-500 font-medium pt-1">{error}</p>
        )}
    </div>
);


// --- FORMULAIRE PRINCIPAL ---
export default function ArticleCreationForm({ 
    categories = [], 
    types = [], 
    initialData, 
    isEditMode = false,
    onSuccess 
} : ArticleCreationProps) {

  // 💡 Hooks de traduction
  const t = useScopedI18n('create') // Pour les titres de section et les labels
  const t_global = useI18n(); // Pour les messages globaux (toast, etc.)

  const router = useRouter();
  const [markdownContent, setMarkdownContent] = useState<string>(
      initialData?.content || initialData?.pitch || '' 
  );
  
  const serverAction = isEditMode ? updateArticleAction : createArticleAction;
  
  const [state, formAction] = useActionState(serverAction, initialState);
  const errors = state.errors; 

  useEffect(() => {
    // Note: Pour une traduction complète des messages d'erreur toast, vous devez 
    // passer les clés de traduction et les données nécessaires dans `state.message` 
    // depuis le Server Action. Ici, nous faisons une traduction simple des messages statiques.
    if (state.message && state.message !== initialState.message) {
        if (state.success) {
            toast.success("Succès !", { description: state.message });
            
        } else if (state.message !== "Veuillez corriger les erreurs de validation ci-dessous.") {
            toast.error("Erreur", { description: state.message });
        }
    }
  }, [state, router, isEditMode, onSuccess]);


  return (
  
    <div className="w-full"> 
      
        {state.message && !state.success && (
            <div className="bg-red-50/70 border border-red-300 text-red-700 p-3 mb-6 text-sm rounded-md">
                Erreur: {state.message}
            </div>
        )}

        <h1 className='text-[20px] font-bold text-secondary-600 mb-6'>{t('publier')}</h1>
        
        <form action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CHAMP CACHÉ POUR L'ID (ESSENTIEL EN MODE ÉDITION) */}
          {isEditMode && initialData?.id && (
              <input type="hidden" name="articleId" defaultValue={initialData.id} />
          )}

          {/* COLONNE GAUCHE (Champs principaux & Contenu Markdown) */}
          <div className="lg:col-span-2 space-y-8"> 
              
              {/* BLOC 1: INFORMATIONS CLÉS */}
              <div className="bg-white border border-primary-100 p-6 rounded-lg shadow-sm"> 
                  <h3 className="text-lg font-bold text-secondary-500 mb-6 border-b pb-3 border-secondary-100">{t('informations')}</h3>
                  
                  {/* Titre */}
                  <FormField label={t('title_label')} icon={Pencil} error={errors?.title?.[0]}>
                    <input
                      type="text"
                      name="title" 
                      className="input-form-v2"
                      required
                      defaultValue={initialData?.title}
                    />
                  </FormField><br/>
                  
                  {/* Extrait */}
                  <FormField label={t('excerpt_label')} icon={BookOpen} error={errors?.excerpt?.[0]}>
                    <textarea
                      name="excerpt" 
                      rows={3}
                      className="input-form-v2 resize-y"
                      required
                      defaultValue={initialData?.excerpt}
                    ></textarea>
                  </FormField><br/>

                  {/* Image URL */}
                  <FormField label={t('image_url_label')} icon={Image} error={errors?.image?.[0]}>
                    <input
                      type="url"
                      name="image" 
                      className="input-form-v2"
                      placeholder={t('image_placeholder')}
                      required
                      defaultValue={initialData?.image}
                    />
                  </FormField><br/>

              </div>
              
              {/* BLOC 2: CONTENU DÉTAILLÉ DE L'ARTICLE */}
              <div className="bg-white border border-primary-100 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-secondary-500 mb-6 border-b pb-3 border-secondary-100">{t('contenu')} (MDEditor)</h3>
                  
                  <FormField label={t('content_label')} icon={LayoutGrid} error={errors?.content?.[0]}> 
                      {/* MDEditor component */}
                      <MDEditor
                          value={markdownContent}
                          onChange={(value) => setMarkdownContent(value || '')}
                          preview="edit" 
                          height={400}
                          data-color-mode="light" 
                      />
                      {/* CHAMP HIDDEN pour la valeur 'content' */}
                      <input 
                          type="hidden" 
                          name="content" 
                          value={markdownContent} 
                          required 
                      />
                      {/* CHAMP HIDDEN pour le 'pitch' qui utilise la même valeur que content */}
                      <input 
                          type="hidden" 
                          name="pitch" 
                          value={markdownContent} 
                          required 
                      />
                  </FormField>
                  
                  {/* Champ pour l'URL de la Vidéo (si nécessaire) */}
                  <FormField label={t('video_url_label')} icon={Image} error={errors?.videoUrl?.[0]} className="mt-6">
                    <input
                      type="url"
                      name="videoUrl" 
                      className="input-form-v2"
                      placeholder={t('video_placeholder')}
                      defaultValue={initialData?.videoUrl}
                    />
                  </FormField>
              </div>
          </div>


          {/* COLONNE DROITE (Métadonnées et publication) - Reste inchangée */}
          <div className="lg:col-span-1 space-y-8">

              {/* Bloc Métadonnées */}
              <div className="bg-white border border-primary-100 p-6 rounded-lg shadow-sm space-y-6"> 
                  <h3 className="text-lg font-bold text-secondary-500 mb-6 border-b pb-3 border-secondary-100">{t('ct')}</h3>
                  
                  {/* Select Catégorie */}
                  <FormField label={t('category_label')} icon={Tag} error={errors?.categoryId?.[0]}>
                    <Select 
                      required 
                      name="category"
                      defaultValue={initialData?.categoryId?.toString()} 
                    >
                      <SelectTrigger className="w-full input-form-v2 !h-12 !py-4">
                        {/* Traduction du placeholder */}
                        <SelectValue placeholder={t('select_placeholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-secondary-200 rounded-md p-1">
                          {categories.map(cat => (
                              <SelectItem key={cat.id} value={cat.id.toString()}>{cat.title}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  
                  {/* Select Type */}
                  <FormField label={t('type_label')} icon={Tag} error={errors?.typeId?.[0]}>
                    <Select required name="type" defaultValue={initialData?.typeId?.toString()}>
                      <SelectTrigger className="w-full input-form-v2 !h-12 !py-4">
                          {/* Traduction du placeholder */}
                          <SelectValue placeholder={t('select_placeholder')} /> 
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-secondary-200 rounded-md p-1">
                          {types.map(t => (
                              <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  
                  {/* Temps de lecture */}
                  <FormField label={t('read_time_label')} icon={Clock} error={errors?.readTime?.[0]}>
                    <input
                      type="text"
                      name="readTime" 
                      className="input-form-v2"
                      defaultValue={initialData?.readTime || t('default_read_time')}
                    />
                  </FormField>

                   {/* Badge */}
                  <FormField label={t('badge_label')} icon={FileText} error={errors?.badge?.[0]}>
                    <input
                      type="text"
                      name="badge" 
                      className="input-form-v2"
                      defaultValue={initialData?.badge || t('default_badge')}
                    />
                  </FormField>
              </div>
              
            
              <div className="bg-white border border-primary-100 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-secondary-500 mb-6 border-b pb-3 border-secondary-100">{t('pub')}</h3>

                  <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured" 
                        className="w-5 h-5 accent-primary-500 bg-white border-secondary-400 rounded cursor-pointer focus:ring-primary-500" 
                        defaultChecked={initialData?.featured}
                      />
                      <label htmlFor="featured" className="text-base font-medium text-secondary-700 cursor-pointer">
                        {t('artc')}
                      </label>
                  </div>
                  
                  <SubmitButton isEditMode={isEditMode} />
              </div>
          </div>
        </form>
      </div>
  );
}