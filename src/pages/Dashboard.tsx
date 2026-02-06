import React, { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { supabase } from '../lib/supabase'
import { Users, Calendar, CheckCircle, AlertCircle } from 'lucide-react'

interface DashboardStats {
  totalCustomers: number
  totalVisits: number
  pendingRequests: number
  completedVisits: number
}

export function Dashboard() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalVisits: 0,
    pendingRequests: 0,
    completedVisits: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // User varsa veriyi çek, yoksa bekleme
    if (user) {
        loadDashboardData()
    } else {
        // User henüz yoksa loading'i false yap ki sonsuz döngü olmasın
        // (AuthContext zaten koruyor ama güvenli olsun)
        setLoading(false)
    }
  }, [user])

  const loadDashboardData = async () => {
    // KORUMA: Eğer profil yoksa loading'i kapatıp çık
    if (!user?.profile) {
      setLoading(false)
      return
    }

    try {
      setLoading(true) // Veri çekmeye başlarken loading aç
      const role = user.profile.role

      if (role === 'admin') {
        await loadAdminStats()
      } else if (role === 'company') {
        await loadCompanyStats()
      } else if (role === 'operator') {
        await loadOperatorStats()
      } else if (role === 'customer') {
        await loadCustomerStats()
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      // Hata olsa da olmasa da loading'i kapat
      setLoading(false)
    }
  }

  const loadAdminStats = async () => {
    const [customers, visits, requests] = await Promise.all([
      supabase.from('customers').select('id', { count: 'exact' }),
      supabase.from('visits').select('id, status', { count: 'exact' }),
      supabase.from('service_requests').select('id, status', { count: 'exact' })
    ])

    const completedVisits = await supabase
      .from('visits')
      .select('id', { count: 'exact' })
      .eq('status', 'completed')

    const pendingRequests = await supabase
      .from('service_requests')
      .select('id', { count: 'exact' })
      .eq('status', 'pending')

    setStats({
      totalCustomers: customers.count || 0,
      totalVisits: visits.count || 0,
      pendingRequests: pendingRequests.count || 0,
      completedVisits: completedVisits.count || 0
    })
  }

  const loadCompanyStats = async () => {
    const companyId = user?.profile?.company_id

    if (!companyId) return

    const [customers, visits, requests] = await Promise.all([
      supabase
        .from('customers')
        .select('id', { count: 'exact' })
        .eq('created_by_company_id', companyId),
      supabase
        .from('visits')
        .select('id, status', { count: 'exact' })
        .eq('company_id', companyId),
      supabase
        .from('service_requests')
        .select('id, status', { count: 'exact' })
        .eq('company_id', companyId)
    ])

    const completedVisits = await supabase
      .from('visits')
      .select('id', { count: 'exact' })
      .eq('company_id', companyId)
      .eq('status', 'completed')

    const pendingRequests = await supabase
      .from('service_requests')
      .select('id', { count: 'exact' })
      .eq('company_id', companyId)
      .eq('status', 'pending')

    setStats({
      totalCustomers: customers.count || 0,
      totalVisits: visits.count || 0,
      pendingRequests: pendingRequests.count || 0,
      completedVisits: completedVisits.count || 0
    })
  }

  const loadOperatorStats = async () => {
    const operatorId = user?.profile?.id

    const [visits, requests] = await Promise.all([
      supabase
        .from('visits')
        .select('id, status', { count: 'exact' })
        .eq('operator_id', operatorId),
      supabase
        .from('service_requests')
        .select('id, status', { count: 'exact' })
        .eq('operator_id', operatorId)
    ])

    const completedVisits = await supabase
      .from('visits')
      .select('id', { count: 'exact' })
      .eq('operator_id', operatorId)
      .eq('status', 'completed')

    const pendingRequests = await supabase
      .from('service_requests')
      .select('id', { count: 'exact' })
      .eq('operator_id', operatorId)
      .eq('status', 'pending')

    setStats({
      totalCustomers: 0,
      totalVisits: visits.count || 0,
      pendingRequests: pendingRequests.count || 0,
      completedVisits: completedVisits.count || 0
    })
  }

  const loadCustomerStats = async () => {
    const customerId = user?.profile?.id

    const [visits, requests] = await Promise.all([
      supabase
        .from('visits')
        .select('id, status', { count: 'exact' })
        .eq('customer_id', customerId),
      supabase
        .from('service_requests')
        .select('id, status', { count: 'exact' })
        .eq('customer_id', customerId)
    ])

    const completedVisits = await supabase
      .from('visits')
      .select('id', { count: 'exact' })
      .eq('customer_id', customerId)
      .eq('status', 'completed')

    const pendingRequests = await supabase
      .from('service_requests')
      .select('id', { count: 'exact' })
      .eq('customer_id', customerId)
      .eq('status', 'pending')

    setStats({
      totalCustomers: 0,
      totalVisits: visits.count || 0,
      pendingRequests: pendingRequests.count || 0,
      completedVisits: completedVisits.count || 0
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const statCards = [
    {
      title: t('dashboard.totalCustomers'),
      value: stats.totalCustomers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      show: ['admin', 'company'].includes(user?.profile?.role || '')
    },
    {
      title: t('dashboard.totalVisits'),
      value: stats.totalVisits,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      show: true
    },
    {
      title: t('dashboard.pendingRequests'),
      value: stats.pendingRequests,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      show: true
    },
    {
      title: t('dashboard.completedVisits'),
      value: stats.completedVisits,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      show: true
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <p className="text-gray-600">
          Hoş geldiniz, {user?.profile?.full_name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.filter(card => card.show).map((card, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className={`p-3 rounded-lg ${card.bgColor} mr-4`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Yeni müşteri eklendi</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Ziyaret tamamlandı</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Yeni servis talebi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.upcomingVisits')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">ABC Restoran</p>
                  <p className="text-sm text-gray-600">Rutin kontrol</p>
                </div>
                <span className="text-sm text-gray-500">Yarın 14:00</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">XYZ Market</p>
                  <p className="text-sm text-gray-600">İlaçlama</p>
                </div>
                <span className="text-sm text-gray-500">2 gün sonra</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}