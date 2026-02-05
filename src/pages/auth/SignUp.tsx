import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Card } from '../../components/ui/Card'
import { Globe } from 'lucide-react'
import toast from 'react-hot-toast'

export function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'customer' as const
  })
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Şifreler eşleşmiyor')
      return
    }

    setLoading(true)

    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.role)
      toast.success('Hesabınız oluşturuldu! Giriş yapabilirsiniz.')
      navigate('/auth/signin')
    } catch (error: any) {
      toast.error(error.message || 'Kayıt olurken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">PestGo360</h1>
          <p className="text-gray-600">{t('auth.welcome')}</p>
        </div>

        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{t('auth.createAccount')}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{language}</span>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('auth.fullName')}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <Input
              label={t('auth.email')}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <Select
              label="Rol"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="customer">Müşteri</option>
              <option value="company">İlaçlama Firması</option>
            </Select>

            <Input
              label={t('auth.password')}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />

            <Input
              label={t('auth.confirmPassword')}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              {t('auth.createAccount')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t('auth.alreadyHaveAccount')}{' '}
              <Link
                to="/auth/signin"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {t('auth.signIn')}
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}