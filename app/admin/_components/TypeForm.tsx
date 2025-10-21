// Fichier : components/ArticleCreationForm.tsx
"use client";

import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom'; 
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createTypeAction } from '../_actions/TypeAction';

import { 
  Pencil, 
  BookOpen, 
  Image, 
  Tag, 
  Clock, 
  FileText,
  CheckCircle2,
  Loader2,
  ChevronDown,
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
                  Adding
                </>
            ) : (
                <>
                  <CheckCircle2 className="w-5 top-2 h-5"/>
                 Add Type
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


export default function TypeForm() {
  const router = useRouter();
  
  const [state, formAction] = useActionState(createTypeAction, initialState);
  const errors = state.errors; 

  useEffect(() => {
    if (state.message && state.message !== initialState.message) {
        if (state.success) {
            toast.success("Succès !", {
                description: state.message,
                className: 'custom-cyan-toast',
            });
            router.push('/Article'); 
        } else if (state.message !== "Veuillez corriger les erreurs de validation ci-dessous.") {
            toast.error("Erreur", {
                description: state.message,
            });
        }
    }
  }, [state, router]);


  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-12"> 
      
      <div className="bg-white border border-secondary-200 p-8 md:p-10 shadow-lg mx-auto max-w-4xl rounded-lg"> 
        
        <h1 className="text-3xl font-black text-center text-secondary-900 border-b-2 border-primary-500 pb-3 mb-8">
            <PlusCircle className="w-6 h-6 inline mr-3 text-primary-500" />
           Add a Type
        </h1>
        
        {state.message && !state.success && (
            <div className="bg-red-50/70 border border-red-300 text-red-700 p-3 mb-6 text-sm rounded-md">
                Erreur: {state.message}
            </div>
        )}

        <form action={formAction} className="space-y-6">
          
          
          <div >
            
            <FormField label="Title" icon={Pencil} error={errors?.title?.[0]}>
              <input
                type="text"
                name="title" 
                className="input-form-v2"
                required
              />
            </FormField>

          </div>
          
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}