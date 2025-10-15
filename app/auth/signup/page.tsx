'use client'
import React, { useState } from 'react'
import { User, Mail, Eye, EyeOff } from 'lucide-react'
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

  const [filledFields, setFilledFields] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const [loading, setLoading] = useState(false)

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
   
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
    <div className="sign-container">
      <div className="sign-box">
        <h1 className="sign-title">Create an Account</h1>

        <form className="sign-form" onSubmit={handleSubmit} noValidate>
          <div className={`field ${filledFields.name ? 'filled' : ''}`}>
            <span className="field-icon"><User size={18} /></span>
            <input
              id="name"
              name="name"
              type="text"
              className="input-field"
              placeholder=" "
              autoComplete="name"
              onChange={handleFieldChange}
            />
            <label htmlFor="name" className="field-label">Full Name</label>
          </div>
          {errors.name && <p className="error">{errors.name}</p>}

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
          {errors.email && <p className="error">{errors.email}</p>}

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
              className="field-password-icon cursor-pointer"
              onClick={() => setShowPassword(s => !s)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            <label htmlFor="password" className="field-label">Password</label>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <div className={`field ${filledFields.confirmPassword ? 'filled' : ''}`}>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              className="input-field"
              placeholder=" "
              autoComplete="new-password"
              onChange={handleFieldChange}
            />
            <span
              className="field-password-icon cursor-pointer"
              onClick={() => setShowConfirm(s => !s)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            <label htmlFor="confirmPassword" className="field-label">Confirm Password</label>
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          {errors.general && <p className="error">{errors.general}</p>}

          <Button type="submit" className="sign-btn sign-btn-left" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="sign-foot">
          Already have an account? <a className="signin-link" href="/auth/signin">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
