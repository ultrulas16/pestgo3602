export type Language = 'tr' | 'en'

export interface Translations {
  // Common
  common: {
    loading: string
    save: string
    cancel: string
    delete: string
    edit: string
    add: string
    search: string
    filter: string
    export: string
    import: string
    yes: string
    no: string
    ok: string
    error: string
    success: string
    warning: string
    info: string
    close: string
    back: string
    next: string
    previous: string
    submit: string
    reset: string
    clear: string
    select: string
    selectAll: string
    none: string
    all: string
    actions: string
    status: string
    date: string
    time: string
    name: string
    email: string
    phone: string
    address: string
    notes: string
    description: string
    price: string
    quantity: string
    total: string
    currency: string
  }
  
  // Navigation
  nav: {
    dashboard: string
    customers: string
    visits: string
    operators: string
    reports: string
    settings: string
    logout: string
    profile: string
    companies: string
    branches: string
    equipment: string
    materials: string
    warehouse: string
    serviceRequests: string
  }
  
  // Auth
  auth: {
    signIn: string
    signUp: string
    signOut: string
    email: string
    password: string
    confirmPassword: string
    fullName: string
    forgotPassword: string
    rememberMe: string
    dontHaveAccount: string
    alreadyHaveAccount: string
    createAccount: string
    welcomeBack: string
    welcome: string
  }
  
  // Dashboard
  dashboard: {
    title: string
    totalCustomers: string
    totalVisits: string
    pendingRequests: string
    completedVisits: string
    recentActivity: string
    upcomingVisits: string
    statistics: string
    overview: string
  }
  
  // Customers
  customers: {
    title: string
    addCustomer: string
    editCustomer: string
    customerDetails: string
    companyName: string
    contactPerson: string
    branches: string
    addBranch: string
    branchName: string
    mainAddress: string
    coordinates: string
    latitude: string
    longitude: string
    pricing: string
    monthlyPrice: string
    perVisitPrice: string
  }
  
  // Visits
  visits: {
    title: string
    addVisit: string
    editVisit: string
    visitDetails: string
    visitDate: string
    visitType: string
    pestTypes: string
    densityLevel: string
    equipmentChecks: string
    customerNotes: string
    operatorNotes: string
    startTime: string
    endTime: string
    reportNumber: string
    reportPhoto: string
    status: {
      planned: string
      completed: string
      cancelled: string
    }
    density: {
      none: string
      low: string
      medium: string
      high: string
    }
  }
  
  // Operators
  operators: {
    title: string
    addOperator: string
    editOperator: string
    operatorDetails: string
    assignedVisits: string
    performance: string
    warehouse: string
    equipment: string
  }
  
  // Service Requests
  serviceRequests: {
    title: string
    addRequest: string
    editRequest: string
    requestDetails: string
    serviceType: string
    priority: string
    scheduledDate: string
    completedDate: string
    assignOperator: string
    status: {
      pending: string
      assigned: string
      inProgress: string
      completed: string
      cancelled: string
    }
    priority: {
      low: string
      normal: string
      high: string
      urgent: string
    }
  }
  
  // Equipment
  equipment: {
    title: string
    addEquipment: string
    editEquipment: string
    equipmentDetails: string
    equipmentType: string
    controlProperties: string
    maintenanceDate: string
    installationDate: string
    locationNotes: string
    isActive: string
  }
  
  // Materials
  materials: {
    title: string
    addMaterial: string
    editMaterial: string
    materialDetails: string
    activeIngredient: string
    concentration: string
    unit: string
    stockQuantity: string
    minQuantity: string
    maxQuantity: string
    unitCost: string
    totalValue: string
    lastRestocked: string
  }
  
  // Warehouse
  warehouse: {
    title: string
    inventory: string
    transfers: string
    addTransfer: string
    fromWarehouse: string
    toWarehouse: string
    transferDate: string
    requestedBy: string
    approvedBy: string
    approvedAt: string
    mainWarehouse: string
    operatorWarehouse: string
  }
  
  // Reports
  reports: {
    title: string
    visitReports: string
    customerReports: string
    operatorReports: string
    financialReports: string
    exportPdf: string
    exportExcel: string
    dateRange: string
    fromDate: string
    toDate: string
  }
  
  // Settings
  settings: {
    title: string
    profile: string
    company: string
    preferences: string
    language: string
    currency: string
    notifications: string
    security: string
    changePassword: string
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
  }
  
  // Company
  company: {
    title: string
    companyInfo: string
    taxNumber: string
    taxOffice: string
    logo: string
    uploadLogo: string
    visitTypes: string
    targetPests: string
    biocidalProducts: string
    equipmentDefinitions: string
  }
}

const tr: Translations = {
  common: {
    loading: 'Yükleniyor...',
    save: 'Kaydet',
    cancel: 'İptal',
    delete: 'Sil',
    edit: 'Düzenle',
    add: 'Ekle',
    search: 'Ara',
    filter: 'Filtrele',
    export: 'Dışa Aktar',
    import: 'İçe Aktar',
    yes: 'Evet',
    no: 'Hayır',
    ok: 'Tamam',
    error: 'Hata',
    success: 'Başarılı',
    warning: 'Uyarı',
    info: 'Bilgi',
    close: 'Kapat',
    back: 'Geri',
    next: 'İleri',
    previous: 'Önceki',
    submit: 'Gönder',
    reset: 'Sıfırla',
    clear: 'Temizle',
    select: 'Seç',
    selectAll: 'Tümünü Seç',
    none: 'Hiçbiri',
    all: 'Tümü',
    actions: 'İşlemler',
    status: 'Durum',
    date: 'Tarih',
    time: 'Saat',
    name: 'Ad',
    email: 'E-posta',
    phone: 'Telefon',
    address: 'Adres',
    notes: 'Notlar',
    description: 'Açıklama',
    price: 'Fiyat',
    quantity: 'Miktar',
    total: 'Toplam',
    currency: 'Para Birimi'
  },
  nav: {
    dashboard: 'Ana Sayfa',
    customers: 'Müşteriler',
    visits: 'Ziyaretler',
    operators: 'Operatörler',
    reports: 'Raporlar',
    settings: 'Ayarlar',
    logout: 'Çıkış',
    profile: 'Profil',
    companies: 'Firmalar',
    branches: 'Şubeler',
    equipment: 'Ekipmanlar',
    materials: 'Malzemeler',
    warehouse: 'Depo',
    serviceRequests: 'Servis Talepleri'
  },
  auth: {
    signIn: 'Giriş Yap',
    signUp: 'Kayıt Ol',
    signOut: 'Çıkış Yap',
    email: 'E-posta',
    password: 'Şifre',
    confirmPassword: 'Şifre Tekrar',
    fullName: 'Ad Soyad',
    forgotPassword: 'Şifremi Unuttum',
    rememberMe: 'Beni Hatırla',
    dontHaveAccount: 'Hesabınız yok mu?',
    alreadyHaveAccount: 'Zaten hesabınız var mı?',
    createAccount: 'Hesap Oluştur',
    welcomeBack: 'Tekrar Hoş Geldiniz',
    welcome: 'Hoş Geldiniz'
  },
  dashboard: {
    title: 'Ana Sayfa',
    totalCustomers: 'Toplam Müşteri',
    totalVisits: 'Toplam Ziyaret',
    pendingRequests: 'Bekleyen Talepler',
    completedVisits: 'Tamamlanan Ziyaretler',
    recentActivity: 'Son Aktiviteler',
    upcomingVisits: 'Yaklaşan Ziyaretler',
    statistics: 'İstatistikler',
    overview: 'Genel Bakış'
  },
  customers: {
    title: 'Müşteriler',
    addCustomer: 'Müşteri Ekle',
    editCustomer: 'Müşteri Düzenle',
    customerDetails: 'Müşteri Detayları',
    companyName: 'Firma Adı',
    contactPerson: 'İletişim Kişisi',
    branches: 'Şubeler',
    addBranch: 'Şube Ekle',
    branchName: 'Şube Adı',
    mainAddress: 'Ana Adres',
    coordinates: 'Koordinatlar',
    latitude: 'Enlem',
    longitude: 'Boylam',
    pricing: 'Fiyatlandırma',
    monthlyPrice: 'Aylık Fiyat',
    perVisitPrice: 'Ziyaret Başı Fiyat'
  },
  visits: {
    title: 'Ziyaretler',
    addVisit: 'Ziyaret Ekle',
    editVisit: 'Ziyaret Düzenle',
    visitDetails: 'Ziyaret Detayları',
    visitDate: 'Ziyaret Tarihi',
    visitType: 'Ziyaret Türü',
    pestTypes: 'Zararlı Türleri',
    densityLevel: 'Yoğunluk Seviyesi',
    equipmentChecks: 'Ekipman Kontrolleri',
    customerNotes: 'Müşteri Notları',
    operatorNotes: 'Operatör Notları',
    startTime: 'Başlangıç Saati',
    endTime: 'Bitiş Saati',
    reportNumber: 'Rapor Numarası',
    reportPhoto: 'Rapor Fotoğrafı',
    status: {
      planned: 'Planlandı',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi'
    },
    density: {
      none: 'Yok',
      low: 'Düşük',
      medium: 'Orta',
      high: 'Yüksek'
    }
  },
  operators: {
    title: 'Operatörler',
    addOperator: 'Operatör Ekle',
    editOperator: 'Operatör Düzenle',
    operatorDetails: 'Operatör Detayları',
    assignedVisits: 'Atanan Ziyaretler',
    performance: 'Performans',
    warehouse: 'Depo',
    equipment: 'Ekipman'
  },
  serviceRequests: {
    title: 'Servis Talepleri',
    addRequest: 'Talep Ekle',
    editRequest: 'Talep Düzenle',
    requestDetails: 'Talep Detayları',
    serviceType: 'Servis Türü',
    priority: 'Öncelik',
    scheduledDate: 'Planlanan Tarih',
    completedDate: 'Tamamlanma Tarihi',
    assignOperator: 'Operatör Ata',
    status: {
      pending: 'Bekliyor',
      assigned: 'Atandı',
      inProgress: 'Devam Ediyor',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi'
    },
    priority: {
      low: 'Düşük',
      normal: 'Normal',
      high: 'Yüksek',
      urgent: 'Acil'
    }
  },
  equipment: {
    title: 'Ekipmanlar',
    addEquipment: 'Ekipman Ekle',
    editEquipment: 'Ekipman Düzenle',
    equipmentDetails: 'Ekipman Detayları',
    equipmentType: 'Ekipman Türü',
    controlProperties: 'Kontrol Özellikleri',
    maintenanceDate: 'Bakım Tarihi',
    installationDate: 'Kurulum Tarihi',
    locationNotes: 'Konum Notları',
    isActive: 'Aktif'
  },
  materials: {
    title: 'Malzemeler',
    addMaterial: 'Malzeme Ekle',
    editMaterial: 'Malzeme Düzenle',
    materialDetails: 'Malzeme Detayları',
    activeIngredient: 'Etken Madde',
    concentration: 'Konsantrasyon',
    unit: 'Birim',
    stockQuantity: 'Stok Miktarı',
    minQuantity: 'Minimum Miktar',
    maxQuantity: 'Maksimum Miktar',
    unitCost: 'Birim Maliyet',
    totalValue: 'Toplam Değer',
    lastRestocked: 'Son Stok Tarihi'
  },
  warehouse: {
    title: 'Depo',
    inventory: 'Envanter',
    transfers: 'Transferler',
    addTransfer: 'Transfer Ekle',
    fromWarehouse: 'Kaynak Depo',
    toWarehouse: 'Hedef Depo',
    transferDate: 'Transfer Tarihi',
    requestedBy: 'Talep Eden',
    approvedBy: 'Onaylayan',
    approvedAt: 'Onay Tarihi',
    mainWarehouse: 'Ana Depo',
    operatorWarehouse: 'Operatör Deposu'
  },
  reports: {
    title: 'Raporlar',
    visitReports: 'Ziyaret Raporları',
    customerReports: 'Müşteri Raporları',
    operatorReports: 'Operatör Raporları',
    financialReports: 'Mali Raporlar',
    exportPdf: 'PDF Olarak Dışa Aktar',
    exportExcel: 'Excel Olarak Dışa Aktar',
    dateRange: 'Tarih Aralığı',
    fromDate: 'Başlangıç Tarihi',
    toDate: 'Bitiş Tarihi'
  },
  settings: {
    title: 'Ayarlar',
    profile: 'Profil',
    company: 'Firma',
    preferences: 'Tercihler',
    language: 'Dil',
    currency: 'Para Birimi',
    notifications: 'Bildirimler',
    security: 'Güvenlik',
    changePassword: 'Şifre Değiştir',
    currentPassword: 'Mevcut Şifre',
    newPassword: 'Yeni Şifre',
    confirmNewPassword: 'Yeni Şifre Tekrar'
  },
  company: {
    title: 'Firma',
    companyInfo: 'Firma Bilgileri',
    taxNumber: 'Vergi Numarası',
    taxOffice: 'Vergi Dairesi',
    logo: 'Logo',
    uploadLogo: 'Logo Yükle',
    visitTypes: 'Ziyaret Türleri',
    targetPests: 'Hedef Zararlılar',
    biocidalProducts: 'Biyosidal Ürünler',
    equipmentDefinitions: 'Ekipman Tanımları'
  }
}

const en: Translations = {
  common: {
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    clear: 'Clear',
    select: 'Select',
    selectAll: 'Select All',
    none: 'None',
    all: 'All',
    actions: 'Actions',
    status: 'Status',
    date: 'Date',
    time: 'Time',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    notes: 'Notes',
    description: 'Description',
    price: 'Price',
    quantity: 'Quantity',
    total: 'Total',
    currency: 'Currency'
  },
  nav: {
    dashboard: 'Dashboard',
    customers: 'Customers',
    visits: 'Visits',
    operators: 'Operators',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout',
    profile: 'Profile',
    companies: 'Companies',
    branches: 'Branches',
    equipment: 'Equipment',
    materials: 'Materials',
    warehouse: 'Warehouse',
    serviceRequests: 'Service Requests'
  },
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    forgotPassword: 'Forgot Password',
    rememberMe: 'Remember Me',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    createAccount: 'Create Account',
    welcomeBack: 'Welcome Back',
    welcome: 'Welcome'
  },
  dashboard: {
    title: 'Dashboard',
    totalCustomers: 'Total Customers',
    totalVisits: 'Total Visits',
    pendingRequests: 'Pending Requests',
    completedVisits: 'Completed Visits',
    recentActivity: 'Recent Activity',
    upcomingVisits: 'Upcoming Visits',
    statistics: 'Statistics',
    overview: 'Overview'
  },
  customers: {
    title: 'Customers',
    addCustomer: 'Add Customer',
    editCustomer: 'Edit Customer',
    customerDetails: 'Customer Details',
    companyName: 'Company Name',
    contactPerson: 'Contact Person',
    branches: 'Branches',
    addBranch: 'Add Branch',
    branchName: 'Branch Name',
    mainAddress: 'Main Address',
    coordinates: 'Coordinates',
    latitude: 'Latitude',
    longitude: 'Longitude',
    pricing: 'Pricing',
    monthlyPrice: 'Monthly Price',
    perVisitPrice: 'Per Visit Price'
  },
  visits: {
    title: 'Visits',
    addVisit: 'Add Visit',
    editVisit: 'Edit Visit',
    visitDetails: 'Visit Details',
    visitDate: 'Visit Date',
    visitType: 'Visit Type',
    pestTypes: 'Pest Types',
    densityLevel: 'Density Level',
    equipmentChecks: 'Equipment Checks',
    customerNotes: 'Customer Notes',
    operatorNotes: 'Operator Notes',
    startTime: 'Start Time',
    endTime: 'End Time',
    reportNumber: 'Report Number',
    reportPhoto: 'Report Photo',
    status: {
      planned: 'Planned',
      completed: 'Completed',
      cancelled: 'Cancelled'
    },
    density: {
      none: 'None',
      low: 'Low',
      medium: 'Medium',
      high: 'High'
    }
  },
  operators: {
    title: 'Operators',
    addOperator: 'Add Operator',
    editOperator: 'Edit Operator',
    operatorDetails: 'Operator Details',
    assignedVisits: 'Assigned Visits',
    performance: 'Performance',
    warehouse: 'Warehouse',
    equipment: 'Equipment'
  },
  serviceRequests: {
    title: 'Service Requests',
    addRequest: 'Add Request',
    editRequest: 'Edit Request',
    requestDetails: 'Request Details',
    serviceType: 'Service Type',
    priority: 'Priority',
    scheduledDate: 'Scheduled Date',
    completedDate: 'Completed Date',
    assignOperator: 'Assign Operator',
    status: {
      pending: 'Pending',
      assigned: 'Assigned',
      inProgress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled'
    },
    priority: {
      low: 'Low',
      normal: 'Normal',
      high: 'High',
      urgent: 'Urgent'
    }
  },
  equipment: {
    title: 'Equipment',
    addEquipment: 'Add Equipment',
    editEquipment: 'Edit Equipment',
    equipmentDetails: 'Equipment Details',
    equipmentType: 'Equipment Type',
    controlProperties: 'Control Properties',
    maintenanceDate: 'Maintenance Date',
    installationDate: 'Installation Date',
    locationNotes: 'Location Notes',
    isActive: 'Active'
  },
  materials: {
    title: 'Materials',
    addMaterial: 'Add Material',
    editMaterial: 'Edit Material',
    materialDetails: 'Material Details',
    activeIngredient: 'Active Ingredient',
    concentration: 'Concentration',
    unit: 'Unit',
    stockQuantity: 'Stock Quantity',
    minQuantity: 'Minimum Quantity',
    maxQuantity: 'Maximum Quantity',
    unitCost: 'Unit Cost',
    totalValue: 'Total Value',
    lastRestocked: 'Last Restocked'
  },
  warehouse: {
    title: 'Warehouse',
    inventory: 'Inventory',
    transfers: 'Transfers',
    addTransfer: 'Add Transfer',
    fromWarehouse: 'From Warehouse',
    toWarehouse: 'To Warehouse',
    transferDate: 'Transfer Date',
    requestedBy: 'Requested By',
    approvedBy: 'Approved By',
    approvedAt: 'Approved At',
    mainWarehouse: 'Main Warehouse',
    operatorWarehouse: 'Operator Warehouse'
  },
  reports: {
    title: 'Reports',
    visitReports: 'Visit Reports',
    customerReports: 'Customer Reports',
    operatorReports: 'Operator Reports',
    financialReports: 'Financial Reports',
    exportPdf: 'Export as PDF',
    exportExcel: 'Export as Excel',
    dateRange: 'Date Range',
    fromDate: 'From Date',
    toDate: 'To Date'
  },
  settings: {
    title: 'Settings',
    profile: 'Profile',
    company: 'Company',
    preferences: 'Preferences',
    language: 'Language',
    currency: 'Currency',
    notifications: 'Notifications',
    security: 'Security',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password'
  },
  company: {
    title: 'Company',
    companyInfo: 'Company Information',
    taxNumber: 'Tax Number',
    taxOffice: 'Tax Office',
    logo: 'Logo',
    uploadLogo: 'Upload Logo',
    visitTypes: 'Visit Types',
    targetPests: 'Target Pests',
    biocidalProducts: 'Biocidal Products',
    equipmentDefinitions: 'Equipment Definitions'
  }
}

export const translations = { tr, en }

export class I18n {
  private static instance: I18n
  private currentLanguage: Language = 'tr'
  private translations = translations

  static getInstance(): I18n {
    if (!I18n.instance) {
      I18n.instance = new I18n()
    }
    return I18n.instance
  }

  setLanguage(language: Language) {
    this.currentLanguage = language
    localStorage.setItem('pestgo360_language', language)
  }

  getLanguage(): Language {
    const saved = localStorage.getItem('pestgo360_language') as Language
    return saved || this.currentLanguage
  }

  t(key: string): string {
    const keys = key.split('.')
    let value: any = this.translations[this.getLanguage()]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  constructor() {
    const saved = localStorage.getItem('pestgo360_language') as Language
    if (saved) {
      this.currentLanguage = saved
    }
  }
}

export const i18n = I18n.getInstance()