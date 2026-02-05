import React from 'react'
import { NavLink } from 'react-router-dom'
import { Hop as Home, Users, Calendar, UserCheck, FileText, Settings, Building2, MapPin, Wrench, Package, Warehouse, ClipboardList, LogOut } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'
import { clsx } from 'clsx'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useLanguage()
  const { user, signOut } = useAuth()

  const getNavigationItems = () => {
    const role = user?.profile?.role

    const baseItems = [
      { to: '/', icon: Home, label: t('nav.dashboard') },
    ]

    if (role === 'admin') {
      return [
        ...baseItems,
        { to: '/companies', icon: Building2, label: t('nav.companies') },
        { to: '/customers', icon: Users, label: t('nav.customers') },
        { to: '/visits', icon: Calendar, label: t('nav.visits') },
        { to: '/operators', icon: UserCheck, label: t('nav.operators') },
        { to: '/service-requests', icon: ClipboardList, label: t('nav.serviceRequests') },
        { to: '/reports', icon: FileText, label: t('nav.reports') },
        { to: '/settings', icon: Settings, label: t('nav.settings') },
      ]
    }

    if (role === 'company') {
      return [
        ...baseItems,
        { to: '/customers', icon: Users, label: t('nav.customers') },
        { to: '/visits', icon: Calendar, label: t('nav.visits') },
        { to: '/operators', icon: UserCheck, label: t('nav.operators') },
        { to: '/equipment', icon: Wrench, label: t('nav.equipment') },
        { to: '/materials', icon: Package, label: t('nav.materials') },
        { to: '/warehouse', icon: Warehouse, label: t('nav.warehouse') },
        { to: '/service-requests', icon: ClipboardList, label: t('nav.serviceRequests') },
        { to: '/reports', icon: FileText, label: t('nav.reports') },
        { to: '/settings', icon: Settings, label: t('nav.settings') },
      ]
    }

    if (role === 'operator') {
      return [
        ...baseItems,
        { to: '/visits', icon: Calendar, label: t('nav.visits') },
        { to: '/customers', icon: Users, label: t('nav.customers') },
        { to: '/warehouse', icon: Warehouse, label: t('nav.warehouse') },
        { to: '/service-requests', icon: ClipboardList, label: t('nav.serviceRequests') },
        { to: '/settings', icon: Settings, label: t('nav.settings') },
      ]
    }

    if (role === 'customer') {
      return [
        ...baseItems,
        { to: '/branches', icon: MapPin, label: t('nav.branches') },
        { to: '/visits', icon: Calendar, label: t('nav.visits') },
        { to: '/service-requests', icon: ClipboardList, label: t('nav.serviceRequests') },
        { to: '/settings', icon: Settings, label: t('nav.settings') },
      ]
    }

    if (role === 'customer_branch') {
      return [
        ...baseItems,
        { to: '/visits', icon: Calendar, label: t('nav.visits') },
        { to: '/service-requests', icon: ClipboardList, label: t('nav.serviceRequests') },
        { to: '/settings', icon: Settings, label: t('nav.settings') },
      ]
    }

    return baseItems
  }

  const navigationItems = getNavigationItems()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-primary-600">PestGo360</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  )
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">
                {user?.profile?.full_name}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              {t('nav.logout')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}