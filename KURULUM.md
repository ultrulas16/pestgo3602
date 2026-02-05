# PESTGO360 Kurulum Rehberi

## Hata Çözümü: npm ENOENT

Aldığınız hata, npm'in package.json dosyasını bulamamasından kaynaklanıyor. İşte çözüm adımları:

## Adım 1: Doğru Dizine Gidin

```bash
# Terminalinizde projenizin bulunduğu klasöre gidin
cd /path/to/pestgo360-updated
```

## Adım 2: Gerekli Dosyaları Kontrol Edin

Proje klasöründe şu dosyalar olmalı:
- ✅ package.json
- ✅ vite.config.ts
- ✅ tsconfig.json
- ✅ tsconfig.node.json
- ✅ index.html
- ✅ .env (kendiniz oluşturacaksınız)

## Adım 3: .env Dosyası Oluşturun

Proje klasöründe `.env` dosyası oluşturun:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Supabase bilgilerinizi nasıl bulursunuz?**
1. https://supabase.com adresine gidin
2. Projenizi seçin
3. Settings > API menüsüne gidin
4. "Project URL" ve "anon public" key'i kopyalayın

## Adım 4: Bağımlılıkları Yükleyin

```bash
# Önce eski dosyaları temizleyin (varsa)
rm -rf node_modules package-lock.json

# Bağımlılıkları yükleyin
npm install --legacy-peer-deps

# VEYA yarn kullanın (önerilen)
yarn install
```

### Alternatif: pnpm Kullanımı
```bash
# pnpm daha hızlı ve güvenilirdir
npm install -g pnpm
pnpm install
```

## Adım 5: Supabase Veritabanını Ayarlayın

Supabase dashboard'da SQL Editor'ü açın ve şu komutları çalıştırın:

### 1. Profiles Tablosu
```sql
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text check (role in ('admin', 'company', 'operator', 'customer')) default 'customer',
  company_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table profiles enable row level security;

-- Policies
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);
```

### 2. Customers Tablosu
```sql
create table if not exists customers (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles on delete cascade,
  company_name text not null,
  address text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  created_by_company_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table customers enable row level security;

-- Policies
create policy "Companies can view their customers"
  on customers for select
  using (
    auth.uid() in (
      select id from profiles where role in ('admin', 'company')
    )
  );

create policy "Companies can insert customers"
  on customers for insert
  with check (
    auth.uid() in (
      select id from profiles where role in ('admin', 'company')
    )
  );

create policy "Companies can update their customers"
  on customers for update
  using (
    auth.uid() in (
      select id from profiles where role in ('admin', 'company')
    )
  );
```

### 3. Visits Tablosu
```sql
create table if not exists visits (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references customers on delete cascade,
  company_id uuid,
  operator_id uuid references profiles on delete set null,
  visit_date timestamp with time zone,
  status text check (status in ('scheduled', 'in_progress', 'completed', 'cancelled')) default 'scheduled',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table visits enable row level security;

-- Create index for performance
create index if not exists visits_customer_id_idx on visits(customer_id);
create index if not exists visits_operator_id_idx on visits(operator_id);
create index if not exists visits_status_idx on visits(status);
```

### 4. Service Requests Tablosu
```sql
create table if not exists service_requests (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references customers on delete cascade,
  company_id uuid,
  operator_id uuid references profiles on delete set null,
  status text check (status in ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')) default 'pending',
  description text,
  priority text check (priority in ('low', 'medium', 'high', 'urgent')) default 'medium',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table service_requests enable row level security;

-- Create indexes
create index if not exists service_requests_customer_id_idx on service_requests(customer_id);
create index if not exists service_requests_status_idx on service_requests(status);
```

### 5. Trigger Fonksiyonları
```sql
-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply triggers
create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();

create trigger update_customers_updated_at before update on customers
  for each row execute function update_updated_at_column();

create trigger update_visits_updated_at before update on visits
  for each row execute function update_updated_at_column();

create trigger update_service_requests_updated_at before update on service_requests
  for each row execute function update_updated_at_column();
```

## Adım 6: İlk Kullanıcıyı Oluşturun

Supabase Authentication > Users kısmından manuel olarak bir kullanıcı oluşturun veya uygulamadan kayıt olun.

Kayıt olduktan sonra, SQL Editor'de admin yetkisi verin:

```sql
-- Kullanıcının ID'sini alın (Authentication > Users'dan)
update profiles 
set role = 'admin' 
where id = 'USER_ID_BURAYA';
```

## Adım 7: Uygulamayı Çalıştırın

```bash
# Development modunda çalıştırın
npm run dev

# VEYA
yarn dev

# VEYA
pnpm dev
```

Tarayıcınızda `http://localhost:5173` adresini açın.

## Yaygın Hatalar ve Çözümleri

### Hata 1: "Cannot find module 'vite'"
```bash
# node_modules'u temizleyin ve tekrar yükleyin
rm -rf node_modules
npm install --legacy-peer-deps
```

### Hata 2: "Supabase client is not initialized"
- `.env` dosyasının proje kökünde olduğundan emin olun
- Supabase URL ve Key'in doğru olduğunu kontrol edin
- Sunucuyu yeniden başlatın (Ctrl+C sonra `npm run dev`)

### Hata 3: "Failed to fetch"
- Supabase projenizin aktif olduğundan emin olun
- RLS (Row Level Security) politikalarını kontrol edin
- Network sekmesinden API isteklerini inceleyin

### Hata 4: "Port 5173 is already in use"
```bash
# Farklı bir port kullanın
npm run dev -- --port 3000
```

## Üretim (Production) Build

```bash
# Build oluşturun
npm run build

# Build'i test edin
npm run preview
```

## Ekstra: VSCode Ayarları

`.vscode/settings.json` dosyası oluşturun:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Destek

Sorun yaşarsanız:
1. README.md dosyasını okuyun
2. Supabase dashboard'daki logs'ları kontrol edin
3. Browser console'daki hataları inceleyin
4. GitHub Issues açın

---

**Başarılar! 🚀**
