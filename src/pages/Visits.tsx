import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Modal } from '../components/ui/Modal'
import { supabase, type Customer } from '../lib/supabase'
import { 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Edit, 
  Trash2, 
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

// Ziyaret tip tanımı
interface Visit {
  id: string
  created_at: string
  customer_id: string
  visit_date: string
  start_time: string
  end_time: string
  visit_type: string
  status: 'planned' | 'completed' | 'cancelled'
  notes?: string
  customer?: Customer // Join ile gelen müşteri verisi
}

export function Visits() {
  const { t } = useTranslation()
  const { user } = useAuth()
  
  // State yönetimi
  const [visits, setVisits] = useState<Visit[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null)
  
  // Form verileri
  const [formData, setFormData] = useState({
    customer_id: '',
    visit_date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    end_time: '10:00',
    visit_type: 'Periyodik Kontrol',
    status: 'planned' as const,
    notes: ''
  })

  useEffect(() => {
    loadData()
  }, [user])

  const loadData = async () => {
    if (!user?.profile) return

    try {
      setLoading(true)
      
      // 1. Müşterileri çek (Dropdown için)
      let customersQuery = supabase
        .from('customers')
        .select('id, company_name, address')
        .eq('created_by_company_id', user.profile.company_id)
        
      const { data: customersData } = await customersQuery
      setCustomers(customersData || [])

      // 2. Ziyaretleri çek
      let query = supabase
        .from('visits')
        .select(`
          *,
          customer:customers (
            company_name,
            address
          )
        `)

      // Rol bazlı filtreleme
      if (user.profile.role === 'company') {
        query = query.eq('created_by_company_id', user.profile.company_id)
      } 
      // Operatör ve müşteri filtreleri buraya eklenebilir

      const { data, error } = await query.order('visit_date', { ascending: true })

      if (error) throw error
      setVisits(data || [])
    } catch (error) {
      console.error('Error loading visits:', error)
      toast.error('Veriler yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const visitData = {
        customer_id: formData.customer_id,
        visit_date: formData.visit_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        visit_type: formData.visit_type,
        status: formData.status,
        notes: formData.notes,
        created_by_company_id: user?.profile?.company_id
      }

      if (editingVisit) {
        // Güncelleme
        const { error } = await supabase
          .from('visits')
          .update(visitData)
          .eq('id', editingVisit.id)

        if (error) throw error
        toast.success(t('common.success'))
      } else {
        // Yeni kayıt
        const { error } = await supabase
          .from('visits')
          .insert(visitData)

        if (error) throw error
        toast.success(t('common.success'))
      }

      setShowModal(false)
      resetForm()
      loadData()
    } catch (error: any) {
      toast.error(error.message || t('common.error'))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('common.delete') + '?')) return

    try {
      const { error } = await supabase
        .from('visits')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast.success(t('common.success'))
      loadData()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleEdit = (visit: Visit) => {
    setEditingVisit(visit)
    setFormData({
      customer_id: visit.customer_id,
      visit_date: visit.visit_date,
      start_time: visit.start_time,
      end_time: visit.end_time,
      visit_type: visit.visit_type,
      status: visit.status,
      notes: visit.notes || ''
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      customer_id: '',
      visit_date: new Date().toISOString().split('T')[0],
      start_time: '09:00',
      end_time: '10:00',
      visit_type: 'Periyodik Kontrol',
      status: 'planned',
      notes: ''
    })
    setEditingVisit(null)
  }

  // Duruma göre renk belirleme
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const filteredVisits = visits.filter(visit =>
    visit.customer?.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.visit_type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{t('visits.title')}</h1>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('visits.addVisit')}
        </Button>
      </div>

      {/* Arama Alanı */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Ziyaretler Listesi */}
      <div className="space-y-4">
        {filteredVisits.map((visit) => (
          <Card key={visit.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                {/* Sol Taraf: Tarih ve Durum */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 text-center bg-gray-50 rounded-lg p-3 border border-gray-100 min-w-[80px]">
                    <div className="text-sm text-gray-500 font-medium">
                      {new Date(visit.visit_date).toLocaleDateString('tr-TR', { month: 'short' })}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {new Date(visit.visit_date).getDate()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(visit.visit_date).toLocaleDateString('tr-TR', { weekday: 'short' })}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {visit.customer?.company_name || 'Bilinmeyen Müşteri'}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {visit.start_time} - {visit.end_time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="truncate max-w-[200px]">{visit.customer?.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                        {t(`visits.status.${visit.status}`)}
                      </span>
                      <span className="text-xs text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">
                        {visit.visit_type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sağ Taraf: Aksiyonlar */}
                <div className="flex items-center space-x-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(visit)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(visit.id)} className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredVisits.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Ziyaret Bulunamadı</h3>
            <p className="text-gray-500 mt-1">Planlanmış bir ziyaretiniz bulunmuyor.</p>
          </div>
        )}
      </div>

      {/* Ekleme/Düzenleme Modalı */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          resetForm()
        }}
        title={editingVisit ? t('visits.editVisit') : t('visits.addVisit')}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Müşteri Seçimi */}
            <div className="col-span-2">
              <Select
                label={t('customers.companyName')}
                value={formData.customer_id}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_id: e.target.value }))}
                required
              >
                <option value="">{t('common.select')}</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.company_name}</option>
                ))}
              </Select>
            </div>

            {/* Tarih ve Saatler */}
            <Input
              label={t('visits.visitDate')}
              type="date"
              value={formData.visit_date}
              onChange={(e) => setFormData(prev => ({ ...prev, visit_date: e.target.value }))}
              required
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                label={t('visits.startTime')}
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                required
              />
              <Input
                label={t('visits.endTime')}
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                required
              />
            </div>

            {/* Ziyaret Türü ve Durum */}
            <Input
              label={t('visits.visitType')}
              value={formData.visit_type}
              onChange={(e) => setFormData(prev => ({ ...prev, visit_type: e.target.value }))}
              required
              placeholder="Örn: Rutin İlaçlama, Kemirgen Kontrolü"
            />

            <Select
              label={t('common.status')}
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
              required
            >
              <option value="planned">{t('visits.status.planned')}</option>
              <option value="completed">{t('visits.status.completed')}</option>
              <option value="cancelled">{t('visits.status.cancelled')}</option>
            </Select>

            {/* Notlar */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.notes')}
              </label>
              <textarea
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {t('common.save')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}