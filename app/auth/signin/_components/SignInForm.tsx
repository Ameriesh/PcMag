'use client'

import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import SignInAction from '../_actions/signInAction';
import { User } from '@/lib/auth';

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
       console.log("User après signin:", user);

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

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilledFields(prev => ({ ...prev, [e.target.name]: !!e.target.value }));
  };

  return (
    <div className="sign-container">
      <div className="sign-box">
        <h1 className="sign-title">Sign In</h1>

        <form className="sign-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className={`field ${filledFields.email ? 'filled' : ''}`}>
            <span className="field-icon"><Mail size={18} /></span>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field"
              placeholder=" "
              autoComplete="email"
              onChange={handleFieldChange}
            />
            <label htmlFor="email" className="field-label">Email</label>
          </div>

          {/* Password */}
          <div className={`field ${filledFields.password ? 'filled' : ''}`}>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="input-field"
              placeholder=" "
              autoComplete="current-password"
              onChange={handleFieldChange}
            />
            <span
              className="field-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            <label htmlFor="password" className="field-label">Password</label>
          </div>

          <Button type="submit" className="sign-btn sign-btn-left" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="sign-foot">
          Don't have an account?{" "}
          <a className="signin-link" href="/auth/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
