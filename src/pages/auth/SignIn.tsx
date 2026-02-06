import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'
import { Globe } from 'lucide-react'
import toast from 'react-hot-toast'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('📝 Form submitted, attempting sign in...')
      await signIn(email, password)
      console.log('✅ Sign in completed, should redirect now')
      toast.success(t('auth.welcomeBack'))
      
      // Force navigation after a short delay to ensure state is updated
      setTimeout(() => {
        console.log('🔄 Navigating to dashboard...')
        navigate('/', { replace: true })
      }, 100)
    } catch (error: any) {
      console.error('❌ Login error:', error)
      toast.error(error.message || 'Giriş yapılırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr'
    i18n.changeLanguage(newLang)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">PestGo360</h1>
          <p className="text-gray-600">{t('auth.welcomeBack')}</p>
        </div>

        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{t('auth.signIn')}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{i18n.language}</span>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('auth.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              label={t('auth.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              {t('auth.signIn')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t('auth.dontHaveAccount')}{' '}
              <Link
                to="/auth/signup"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {t('auth.signUp')}
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}