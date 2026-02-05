# PESTGO360 - Haşere Kontrol Yönetim Sistemi

Profesyonel haşere kontrol şirketleri için geliştirilmiş modern bir yönetim sistemi.

## 🚀 Özellikler

### Mevcut Özellikler ✅
- **Kullanıcı Kimlik Doğrulama**: Supabase tabanlı güvenli giriş sistemi
- **Çoklu Dil Desteği**: Türkçe ve İngilizce dil seçenekleri
- **Rol Tabanlı Erişim**: Admin, Firma, Operatör ve Müşteri rolleri
- **Dashboard**: Anlık istatistikler ve özet bilgiler
- **Müşteri Yönetimi**: Müşteri ekleme, düzenleme ve listeleme
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu modern arayüz

### Geliştirme Aşamasında 🚧
- Ziyaret Yönetimi
- Operatör Yönetimi
- Ekipman Takibi
- Malzeme Yönetimi
- Depo Yönetimi
- Servis Talepleri
- Raporlama Sistemi
- Ayarlar

## 📋 Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Supabase hesabı (ücretsiz plan yeterli)

## 🔧 Kurulum

### 1. Projeyi İndirin
```bash
# Zip dosyasını çıkartın veya git clone yapın
cd pestgo360-updated
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
# veya
yarn install
```

### 3. Supabase Yapılandırması

`.env` dosyasını oluşturun:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Veritabanı Şeması

Aşağıdaki tabloları Supabase'de oluşturun:

#### profiles
```sql
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  role text check (role in ('admin', 'company', 'operator', 'customer')),
  company_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

#### customers
```sql
create table customers (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles,
  company_name text not null,
  address text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  created_by_company_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

#### visits
```sql
create table visits (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references customers,
  company_id uuid,
  operator_id uuid references profiles,
  visit_date timestamp with time zone,
  status text check (status in ('scheduled', 'in_progress', 'completed', 'cancelled')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

#### service_requests
```sql
create table service_requests (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references customers,
  company_id uuid,
  operator_id uuid references profiles,
  status text check (status in ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
  description text,
  priority text check (priority in ('low', 'medium', 'high', 'urgent')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

### 5. Projeyi Çalıştırın
```bash
npm run dev
# veya
yarn dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── layout/          # Layout bileşenleri (Header, Sidebar, Layout)
│   └── ui/              # UI bileşenleri (Button, Input, Card, Modal, vb.)
├── contexts/            # React Context'ler (Auth, Language)
├── lib/                 # Yardımcı kütüphaneler (Supabase, i18n, auth)
├── pages/               # Sayfa bileşenleri
│   ├── auth/           # Giriş/Kayıt sayfaları
│   ├── Dashboard.tsx   # Ana sayfa
│   └── Customers.tsx   # Müşteriler sayfası
├── App.tsx             # Ana uygulama bileşeni
└── main.tsx            # Giriş noktası
```

## 🔐 Kullanıcı Rolleri

### Admin
- Tüm sisteme tam erişim
- Firma, operatör ve müşteri yönetimi
- Sistem ayarları

### Firma (Company)
- Kendi müşterilerini yönetme
- Operatör atama
- Ziyaret ve servis planlaması
- Raporlar

### Operatör
- Atanan ziyaretleri görüntüleme
- Ziyaret tamamlama
- Servis kayıtları

### Müşteri
- Kendi ziyaretlerini görüntüleme
- Servis talebi oluşturma
- Geçmiş kayıtlar

## 🛠️ Teknolojiler

- **React 18** - UI framework
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Supabase** - Backend & Database
- **React Query** - Data fetching
- **React Hook Form** - Form yönetimi
- **Zod** - Validation
- **Lucide React** - İkonlar

## 📝 Geliştirme Notları

### Yapılacaklar
- [ ] Ziyaret yönetim modülünü tamamla
- [ ] Operatör yönetim modülünü ekle
- [ ] Harita entegrasyonu (Google Maps/Leaflet)
- [ ] Takvim/randevu sistemi
- [ ] PDF rapor oluşturma
- [ ] Bildirim sistemi
- [ ] E-posta bildirimleri
- [ ] Mobil uygulama (React Native)

### Bilinen Sorunlar
- Bazı sayfalar henüz geliştirme aşamasında
- Offline destek yok (planlanan)

## 🔧 Çözüm: npm Kurulum Hataları

Eğer npm kurulum hataları alıyorsanız:

```bash
# Önce node_modules ve lock dosyasını silin
rm -rf node_modules package-lock.json

# Sonra tekrar yükleyin
npm install --legacy-peer-deps

# Veya yarn kullanın
yarn install
```

## 📄 Lisans

Bu proje özel kullanım içindir.

## 🤝 Katkıda Bulunma

Geliştirme önerileri için issue açabilir veya pull request gönderebilirsiniz.

---

**PESTGO360** - Profesyonel Haşere Kontrol Yönetimi
