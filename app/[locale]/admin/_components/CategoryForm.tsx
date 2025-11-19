// Fichier : components/ArticleCreationForm.tsx

"use client";

import React, { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useFormStatus } from 'react-dom'; 
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createCategoryAction } from '../_actions/CategoryAction';
// 💡 Import de next-international (ajustez le chemin si nécessaire)
import { useScopedI18n } from '@/locales/client'; 

import { 
  Pencil, 
  BookOpen, 
  Tag, 
  CheckCircle2,
  PlusCircle
} from 'lucide-react';
import { cn } from '@/lib/utils'; 
import { Button } from '@/components/ui/button';


// 🚨 Définir le même type d'état que dans la Server Action
interface ActionState {
    success: boolean;
    message: string;
    articleId?: number; 
    errors?: Record<string, string[] | undefined>;
}


const initialState: ActionState = {
    success: false,
    message: '',
    articleId: undefined,
    errors: undefined,
};

// Composant pour suivre l'état de soumission
function SubmitButton() {
    const { pending } = useFormStatus();
    // 💡 Hook de traduction
    const t = useScopedI18n('category_form');

    return (
        <Button 
            type="submit" 
            className="btn-primary w-full py-3 mt-8 text-lg font-bold tracking-wider" 
            disabled={pending}
        >
            {pending ? (
                <>
                 <Spinner/>
                 {/* 💡 Traduction */}
                 {t('submit_pending')} 
                </>
            ) : (
                <>
                  <CheckCircle2 className="w-5 top-2 h-5"/>
                 {/* 💡 Traduction */}
                 {t('submit_action')}
                </>
            )}
        </Button>
    );
}

// --- FormField composant (Inchangé dans la structure) ---
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
// ------------------------------------


export default function CategoryForm() {
  const router = useRouter();
  // 💡 Hook de traduction
  const t = useScopedI18n('category_form');
  
  const [state, formAction] = useActionState(createCategoryAction, initialState);
  const errors = state.errors; 

  useEffect(() => {
    if (state.message && state.message !== initialState.message) {
        if (state.success) {
            // 💡 Traduction
            toast.success(t('success_title'), {
                description: state.message,
                className: 'custom-cyan-toast',
            });
           
        } else if (state.message !== t('validation_error_message')) { // Utilisez la clé pour la validation
            // 💡 Traduction
            toast.error(t('error_title'), {
                description: state.message,
            });
        }
    }
  }, [state, router, t]);


  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-12"> 
      
      <div className="bg-white border border-secondary-200 p-8 md:p-10 shadow-lg mx-auto max-w-4xl rounded-lg"> 
        
        <h1 className="text-3xl font-black text-center text-secondary-900 border-b-2 border-primary-500 pb-3 mb-8">
            <PlusCircle className="w-6 h-6 inline mr-3 text-primary-500" />
           {/* 💡 Traduction */}
           {t('add_title')}
        </h1>
        
        {state.message && !state.success && (
            <div className="bg-red-50/70 border border-red-300 text-red-700 p-3 mb-6 text-sm rounded-md">
                {/* 💡 Traduction */}
                {t('error_prefix')} {state.message}
            </div>
        )}

        <form action={formAction} className="space-y-6">
          
          
          <div >
            {/* 💡 Traduction du label */}
            <FormField label={t('title_label')} icon={Pencil} error={errors?.title?.[0]}>
              <input
                type="text"
                name="title" 
                className="input-form-v2"
                required
              />
            </FormField>

          </div>
          
          {/* 💡 Traduction du label */}
          <FormField label={t('description_label')} icon={BookOpen} error={errors?.excerpt?.[0]}>
            <textarea
              name="description" 
              rows={4}
              className="input-form-v2 resize-y" 
              required
            ></textarea>
          </FormField>
          
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}