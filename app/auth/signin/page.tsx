'use client'

import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import SignInAction from './_actions/signInAction';

const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [filledFields, setFilledFields] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";

    try {
      const res = await SignInAction({ email, password });

      if (!res.success) {
        const field = res.error.field;
        setErrors(prev => ({ ...prev, [field]: res.error.message }));
        toast.error(res.error.message);
        return;
      }

      toast.success("Connexion réussie !", { description: `Bienvenue ${res.data.user?.name ?? ""}` });
      router.push("/");

    } catch (err: any) {
      setErrors({ general: err?.message ?? "Erreur inattendue" });
      toast.error(err?.message ?? "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilledFields(prev => ({ ...prev, [e.target.name]: !!e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  return (
    <div className="sign-container">
      <div className="sign-box">
        <h1 className="sign-title">Sign In</h1>

        <form className="sign-form" onSubmit={handleSubmit} noValidate>
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
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={`field ${filledFields.password ? 'filled' : ''}`}>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="input-field"
              placeholder=" "
              autoComplete="new-password"
              onChange={handleFieldChange}
            />
            <span
              className="field-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            <label htmlFor="password" className="field-label">Password</label>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* Erreur générale */}
          {errors.general && <p className="error">{errors.general}</p>}

          <Button type="submit" className="sign-btn sign-btn-left" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="sign-foot">
          Don't have an account? <a className="signin-link" href="/auth/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
