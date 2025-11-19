// Remplacer le contenu de `SignInForm` par ceci :

'use client'

import React, { useState } from 'react';
import { Mail, Eye, EyeOff, Lock, MonitorSmartphone } from 'lucide-react'; // Ajout de Lock et MonitorSmartphone
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import SignInAction from '../_actions/signInAction';
import { User } from '@/lib/auth';

const SignInForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    // État pour les champs remplis (gère la disparition de l'icône)
    const [filledFields, setFilledFields] = useState({ email: false, password: false });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = (formData.get("email") as string) ?? "";
        const password = (formData.get("password") as string) ?? "";

        try {
            const res = await SignInAction({ email, password });

            if (!res.success) {
                toast.error(res.error?.message ?? "Connexion échouée");
                return;
            }

            const user = res.data?.user as User | undefined;
            
            if(user){
                toast.success("Connexion réussie !", {
                    description: `Bienvenue ${res.data?.user?.name ?? ""}`,
                });
            }

            if(user?.role === 'ADMIN'){
                router.push('/admin')
            }else{
                router.push('/')
            }

        } catch (err: any) {
            toast.error("Erreur inattendue");
        } finally {
            setLoading(false);
        }
    };

    // La logique de changement gère si l'icône doit disparaître
    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilledFields(prev => ({ 
            ...prev, 
            // Si la valeur existe, c'est 'true' (l'icône disparaît)
            [e.target.name]: !!e.target.value 
        }));
    };

    return (
        <div className="sign-container-v2">
            
            {/* Colonne de gauche (PCMag & Cyan) */}
            <div className="sign-left-v2">
                {/* Utilisation de MonitorSmartphone comme logo visuel */}
                <div className="sign-logo-v2"><MonitorSmartphone size={80} /> PCMag</div> 
                <h2 className="sign-welcome-v2">Welcome to PCMag</h2>
                <p className="sign-slogan-v2">Get the full experience. Join the community!</p>
            </div>

            {/* Colonne de droite (Formulaire) */}
            <div className="sign-box-v2">
                <h1 className="sign-title-v2 text-center">SIGN IN</h1> 

                <form className="sign-form-v2" onSubmit={handleSubmit}>
                    
                    {/* Email */}
                    <div className="field-v2">
                        {/* L'icône est active tant que 'email' n'est pas rempli */}
                        <span className={`field-icon-v2 ${filledFields.email ? 'field-icon-hidden' : ''}`}>
                            <Mail size={18} />
                        </span>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="input-field-v2"
                            placeholder="Email address"
                            autoComplete="email"
                            onChange={handleFieldChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="field-v2">
                        {/* L'icône est active tant que 'password' n'est pas rempli */}
                        <span className={`field-icon-v2 ${filledFields.password ? 'field-icon-hidden' : ''}`}>
                            <Lock size={18} />
                        </span>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            className="input-field-v2"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={handleFieldChange}
                        />
                        {/* Icône Oeil/Oeil-barré à droite (position absolue, ne disparaît pas) */}
                        <span
                            className="field-password-icon-v2 right-3" // Décalage à droite
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>
                    
                    {/* Bouton de Soumission */}
                    <Button type="submit" className="sign-btn-v2" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                {/* Pied de page */}
                <p className="sign-foot-v2">
                    Don't have an account?{" "}
                    <a className="signin-link-v2" href="/auth/signup">Sign Up</a>
                </p>
                
                {/* Séparateur pour Google (ou autre) */}
                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-secondary-200"></div>
                    <p className="mx-4 text-sm text-secondary-500">or</p>
                    <div className="flex-1 border-t border-secondary-200"></div>
                </div>

                {/* Bouton Google (couleur ajustée) */}
                <Button className="w-full bg-white border border-secondary-300 text-secondary-700 hover:bg-secondary-50">
                     <img src="/path/to/google-icon.svg" alt="Google" className="w-5 h-5 mr-3" />
                     Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default SignInForm;