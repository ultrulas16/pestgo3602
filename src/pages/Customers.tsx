import React, { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Modal } from '../components/ui/Modal'
import { supabase, type Customer, type Profile } from '../lib/supabase'
import { Plus, Search, CreditCard as Edit, Trash2, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'

export function Customers() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [customers, setCustomers] = useState<(Customer & { profile?: Profile })[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [formData, setFormData] = useState({
    company_name: '',
    address: '',
    latitude: '',
    longitude: '',
    contact_name: '',
    contact_email: '',
    contact_phone: ''
  })

  useEffect(() => {
    loadCustomers()
  }, [user])

  const loadCustomers = async () => {
    if (!user?.profile) return

    try {
      let query = supabase
        .from('customers')
        .select(`
          *,
          profile:profiles(*)
        `)

      // Filter based on user role
      if (user.profile.role === 'company') {
        query = query.eq('created_by_company_id', user.profile.company_id)
      } else if (user.profile.role === 'operator') {
        // Get company from operator
        const { data: operator } = await supabase
          .from('operators')
          .select('company_id')
          .eq('profile_id', user.id)
          .single()

        if (operator) {
          query = query.eq('created_by_company_id', operator.company_id)
        }
      } else if (user.profile.role === 'customer') {
        query = query.eq('profile_id', user.id)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setCustomers(data || [])
    } catch (error) {
      console.error('Error loading customers:', error)
      toast.error('Müşteriler yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingCustomer) {
        // Update existing customer
        const { error } = await supabase
          .from('customers')
          .update({
            company_name: formData.company_name,
            address: formData.address,
            latitude: formData.latitude ? parseFloat(formData.latitude) : null,
            longitude: formData.longitude ? parseFloat(formData.longitude) : null
          })
          .eq('id', editingCustomer.id)

        if (error) throw error
        toast.success('Müşteri güncellendi')
      } else {
        // Create new customer
        const { error } = await supabase
          .from('customers')
          .insert({
            company_name: formData.company_name,
            address: formData.address,
            latitude: formData.latitude ? parseFloat(formData.latitude) : null,
            longitude: formData.longitude ? parseFloat(formData.longitude) : null,
            created_by_company_id: user?.profile?.company_id
          })

        if (error) throw error
        toast.success('Müşteri eklendi')
      }

      setShowModal(false)
      resetForm()
      loadCustomers()
    } catch (error: any) {
      toast.error(error.message || 'İşlem sırasında hata oluştu')
    }
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setFormData({
      company_name: customer.company_name || '',
      address: customer.address || '',
      latitude: customer.latitude?.toString() || '',
      longitude: customer.longitude?.toString() || '',
      contact_name: '',
      contact_email: '',
      contact_phone: ''
    })
    setShowModal(true)
  }

  const handleDelete = async (customer: Customer) => {
    if (!confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customer.id)

      if (error) throw error
      toast.success('Müşteri silindi')
      loadCustomers()
    } catch (error: any) {
      toast.error(error.message || 'Silme işlemi sırasında hata oluştu')
    }
  }

  const resetForm = () => {
    setFormData({
      company_name: '',
      address: '',
      latitude: '',
      longitude: '',
      contact_name: '',
      contact_email: '',
      contact_phone: ''
    })
    setEditingCustomer(null)
  }

  const filteredCustomers = customers.filter(customer =>
    customer.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const canManageCustomers = ['admin', 'company'].includes(user?.profile?.role || '')

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
        <h1 className="text-2xl font-bold text-gray-900">{t('customers.title')}</h1>
        {canManageCustomers && (
          <Button onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t('customers.addCustomer')}
          </Button>
        )}
      </div>

      {/* Search */}
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

      {/* Customers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{customer.company_name}</span>
                {canManageCustomers && (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(customer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(customer)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-600">{customer.address}</p>
                </div>
                {customer.latitude && customer.longitude && (
                  <p className="text-xs text-gray-500">
                    {customer.latitude}, {customer.longitude}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Oluşturulma: {new Date(customer.created_at!).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Henüz müşteri bulunmuyor</p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          resetForm()
        }}
        title={editingCustomer ? t('customers.editCustomer') : t('customers.addCustomer')}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('customers.companyName')}
            value={formData.company_name}
            onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
            required
          />

          <Input
            label={t('common.address')}
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('customers.latitude')}
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
            />

            <Input
              label={t('customers.longitude')}
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-3">
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