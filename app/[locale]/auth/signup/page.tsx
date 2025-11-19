// Remplacer le contenu de SignUpPage par ceci :

'use client'
import React, { useState } from 'react'
import { User, Mail, Eye, EyeOff, Lock, MonitorSmartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signUpAction } from './_actions/signUpAction'
import { formSchema } from '@/lib/validate'
import { ZodError } from 'zod'

const SignUpPage = () => {
  const router = useRouter()

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Utilise l'état pour les 4 champs
  const [filledFields, setFilledFields] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const [loading, setLoading] = useState(false)

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
   
    // Logique pour faire disparaître l'icône quand la valeur est présente
    setFilledFields(prev => ({ ...prev, [name]: !!value }))

    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({}) 

    const formData = new FormData(e.currentTarget)
    const values = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      confirmPassword: formData.get('confirmPassword')?.toString() || '',
    }

   
    try {
      await formSchema.parseAsync(values)
    } catch (err) {
      if (err instanceof ZodError) {
       
        const fieldErrors = err.flatten().fieldErrors as Record<string, string[] | undefined>
        const formatted: Record<string, string> = {}
        Object.keys(fieldErrors).forEach(key => {
          const msgs = fieldErrors[key]
          if (msgs && msgs.length > 0) formatted[key] = msgs[0]
        })
        setErrors(formatted)
        return 
      } else {
        
        setErrors({ general: 'Validation failed. Vérifiez vos champs.' })
        return
      }
    }

   
    setLoading(true)
    try {
      const data = await signUpAction(values)
     
      toast.success(`Le compte ${data.user.name} a été créé`)
      router.push('/auth/signin')
    } catch (err: any) {
      
      setErrors({ general: err?.message || "Une erreur serveur est survenue. Réessayez." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sign-container-v2">
        
        {/* Colonne de gauche (PCMag & Cyan) */}
        <div className="sign-left-v2">
            <div className="sign-logo-v2"><MonitorSmartphone size={80} /> PCMag</div> 
            <h2 className="sign-welcome-v2">Welcome to PCMag</h2>
            <p className="sign-slogan-v2">Get the full experience. Join the community!</p>
        </div>

        {/* Colonne de droite (Formulaire) */}
        <div className="sign-box-v2">
            <h1 className="sign-title-v2">Create your PCMag account</h1>

            <form className="sign-form-v2" onSubmit={handleSubmit} noValidate>
                
                {/* Full Name */}
                <div className="field-v2">
                    <span className={`field-icon-v2 ${filledFields.name ? 'field-icon-hidden' : ''}`}>
                        <User size={18} />
                    </span>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="input-field-v2"
                        placeholder="Full Name"
                        autoComplete="name"
                        onChange={handleFieldChange}
                    />
                </div>
                {errors.name && <p className="error">{errors.name}</p>}

                {/* Email */}
                <div className="field-v2">
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
                {errors.email && <p className="error">{errors.email}</p>}

                {/* Password */}
                <div className="field-v2">
                    <span className={`field-icon-v2 ${filledFields.password ? 'field-icon-hidden' : ''}`}>
                        <Lock size={18} />
                    </span>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className="input-field-v2"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={handleFieldChange}
                    />
                    <span
                        className="field-password-icon-v2 right-3"
                        onClick={() => setShowPassword(s => !s)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                </div>
                {errors.password && <p className="error">{errors.password}</p>}

                {/* Confirm Password */}
                <div className="field-v2">
                    <span className={`field-icon-v2 ${filledFields.confirmPassword ? 'field-icon-hidden' : ''}`}>
                        <Lock size={18} />
                    </span>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        className="input-field-v2"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        onChange={handleFieldChange}
                    />
                    <span
                        className="field-password-icon-v2 right-3"
                        onClick={() => setShowConfirm(s => !s)}
                    >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                </div>
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                {errors.general && <p className="error">{errors.general}</p>}

                <Button type="submit" className="sign-btn-v2 mt-3" disabled={loading}>
                    {loading ? 'Creating account...' : 'Sign Up'}
                </Button>
            </form>

            <p className="sign-foot-v2">
                Already have an account? <a className="signin-link-v2" href="/auth/signin">Sign in</a>
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
                Sign up with Google
            </Button>
        </div>
    </div>
  )
}

export default SignUpPage