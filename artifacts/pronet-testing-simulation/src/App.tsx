import { type FormEvent, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  CircleDollarSign,
  Clock3,
  Eye,
  EyeOff,
  FileText,
  Inbox,
  KeyRound,
  LockKeyhole,
  MapPin,
  LogOut,
  Menu,
  Monitor,
  MoreHorizontal,
  Plus,
  Radio,
  Search,
  Save,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import { Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

type NavSection = 'Resumen' | 'Casos de prueba' | 'Servicios' | 'Actividad';

type ServiceRecord = {
  id: string;
  serviceName: string;
  description: string;
  address: string;
  quotation: number;
  status: 'A la espera';
  createdAt: string;
};

const servicesStorageKey = 'pronet-demo-services';

function readStoredServices(): ServiceRecord[] {
  try {
    const stored = window.localStorage.getItem(servicesStorageKey);
    return stored ? JSON.parse(stored) as ServiceRecord[] : [];
  } catch {
    return [];
  }
}

const incidentRows = [
  { id: 'SIM-042', title: 'Interrupción de enlace', owner: 'Equipo de redes', state: 'En revisión', time: 'Hace 14 min', color: 'orange' },
  { id: 'SIM-041', title: 'Acceso no autorizado', owner: 'Seguridad operativa', state: 'Contenido', time: 'Ayer, 18:20', color: 'teal' },
  { id: 'SIM-039', title: 'Alerta de disponibilidad', owner: 'Mesa de ayuda', state: 'Cerrado', time: '12 jun, 09:42', color: 'gray' },
];

function PronetMark({ light = false }: { light?: boolean }) {
  return (
    <div className={light ? 'brand-mark' : 'brand-mark'} data-testid="brand-pronet">
      Pronet <small>system</small>
    </div>
  );
}

function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!email.trim()) nextErrors.email = 'Ingresa tu correo corporativo.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Revisa el formato del correo.';
    if (!password) nextErrors.password = 'Ingresa tu contraseña.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    if (email.trim().toLowerCase() !== 'analista@pronet.system' || password !== 'pronet-demo') {
      setErrors({ form: 'Las credenciales no coinciden con el acceso de demostración.' });
      return;
    }
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 650);
  };

  const fillDemo = () => {
    setEmail('analista@pronet.system');
    setPassword('pronet-demo');
    setErrors({});
    setShowHint(true);
  };

  return (
    <main className="login-shell noise grid md:grid-cols-[minmax(0,1fr)_minmax(460px,1.04fr)]">
      <section className="brand-panel flex flex-col justify-between px-7 py-8 sm:px-12 md:px-14 md:py-12" aria-label="Identidad de Pronet">
        <div className="brand-grid" />
        <div className="relative z-10 animate-rise">
          <PronetMark />
          <div className="mt-20 max-w-[510px] sm:mt-28 md:mt-32">
            <p className="eyebrow mb-5">Simulación de pruebas · entorno controlado</p>
            <h1 className="max-w-[520px] font-serif text-[clamp(2.55rem,5vw,5.25rem)] leading-[1.04] tracking-[-.06em] text-[#f4f0e7]" data-testid="heading-brand">
              El servicio,
              <br />
              <em className="not-italic text-[#e88a2e]">bajo control.</em>
            </h1>
            <p className="mt-7 max-w-[390px] text-[.97rem] leading-7 text-[#b8cfca]" data-testid="text-brand-description">
              Una vista compartida para que cada incidencia avance con contexto, evidencia y responsabilidad.
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-16 flex items-end justify-between gap-6 border-t border-[#39716e]/60 pt-5 text-[.59rem] uppercase tracking-[.17em] text-[#83a7a0]">
          <span data-testid="text-brand-footer">Control operativo</span>
          <span className="font-mono" data-testid="text-version">v2.4 / LTMA</span>
        </div>
      </section>

      <section className="flex min-h-[560px] items-center justify-center px-6 py-12 sm:px-12 md:px-16 lg:px-24" aria-label="Acceso seguro">
        <div className="w-full max-w-[430px] animate-rise-2">
          <div className="flex items-center justify-between">
            <div className="flex h-11 items-center bg-[#073f42] px-5">
              <PronetMark />
            </div>
            <div className="hidden items-center gap-2 text-[.65rem] font-medium uppercase tracking-[.12em] text-[#77827d] sm:flex">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#e97b23]" />
              Sistema activo
            </div>
          </div>

          <div className="mt-14 sm:mt-16">
            <p className="eyebrow text-[#9c6b34]">Acceso seguro</p>
            <h2 className="mt-3 font-serif text-3xl tracking-[-.045em] text-[#173f40] sm:text-[2.7rem]" data-testid="heading-login">
              Bienvenido de vuelta
            </h2>
            <p className="mt-3 text-[.93rem] text-[#77827d]" data-testid="text-login-description">Ingresa a tu espacio operativo.</p>
          </div>

          <form className="mt-10 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="mb-2 block text-[.68rem] font-bold uppercase tracking-[.1em] text-[#53615d]">Correo corporativo</label>
              <div className={`relative flex items-center border-b bg-transparent transition-colors ${errors.email ? 'border-[#b84c3d]' : 'border-[#cfd2c9] focus-within:border-[#0a5a59]'}`}>
                <UserRound className="mr-3 h-4 w-4 text-[#8a9690]" strokeWidth={1.7} aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                  placeholder="nombre@pronet.system"
                  className="focus-ring w-full bg-transparent py-3 text-[.94rem] text-[#173f40] outline-none placeholder:text-[#abb1aa]"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  data-testid="input-email"
                />
              </div>
              {errors.email && <p id="email-error" className="mt-2 flex items-center gap-1.5 text-xs text-[#a64237]" data-testid="error-email"><AlertCircle className="h-3.5 w-3.5" />{errors.email}</p>}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block text-[.68rem] font-bold uppercase tracking-[.1em] text-[#53615d]">Contraseña</label>
                <span className="font-mono text-[.59rem] uppercase tracking-[.1em] text-[#a0aaa3]">Campo protegido</span>
              </div>
              <div className={`relative flex items-center border-b bg-transparent transition-colors ${errors.password ? 'border-[#b84c3d]' : 'border-[#cfd2c9] focus-within:border-[#0a5a59]'}`}>
                <KeyRound className="mr-3 h-4 w-4 text-[#8a9690]" strokeWidth={1.7} aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => { setPassword(event.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
                  placeholder="••••••••••"
                  className="focus-ring w-full bg-transparent py-3 text-[.94rem] text-[#173f40] outline-none placeholder:text-[#abb1aa]"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  data-testid="input-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus-ring p-1 text-[#84908b] transition-colors hover:text-[#174f4d]" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} data-testid="button-toggle-password">
                  {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.7} /> : <Eye className="h-4 w-4" strokeWidth={1.7} />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="mt-2 flex items-center gap-1.5 text-xs text-[#a64237]" data-testid="error-password"><AlertCircle className="h-3.5 w-3.5" />{errors.password}</p>}
            </div>

            {errors.form && <p className="rounded-md bg-[#f8e7e2] px-3 py-2 text-xs text-[#a64237]" data-testid="error-form">{errors.form}</p>}

            <button type="submit" disabled={isSubmitting} className="focus-ring group mt-3 flex w-full items-center justify-center gap-3 bg-[#245d8d] px-5 py-3.5 text-[.78rem] font-bold uppercase tracking-[.08em] text-[#f9f5ea] transition-colors hover:bg-[#174e7d] disabled:cursor-wait disabled:opacity-70" data-testid="button-submit-login">
              {isSubmitting ? 'Verificando acceso' : 'Ingresar al sistema'}
              {isSubmitting ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#f9f5ea]/35 border-t-[#f9f5ea]" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="mt-8 border-t border-[#dddcd3] pt-5">
            <button type="button" onClick={() => setShowHint(!showHint)} className="focus-ring flex items-center gap-2 text-left text-xs text-[#66736d] hover:text-[#174f4d]" data-testid="button-show-demo">
              <ShieldCheck className="h-4 w-4 text-[#6c9184]" strokeWidth={1.6} />
              <span>{showHint ? 'Ocultar credenciales de demostración' : 'Usar credenciales de demostración'}</span>
            </button>
            {showHint && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-[#d9d8cd] bg-[#f5f1e8] p-3 text-xs animate-rise-3" data-testid="hint-demo-credentials">
                <div className="space-y-1 font-mono text-[.67rem] text-[#5d6a64]">
                  <p><span className="text-[#9a6a37]">usuario</span> analista@pronet.system</p>
                  <p><span className="text-[#9a6a37]">clave</span> pronet-demo</p>
                </div>
                <button type="button" onClick={fillDemo} className="focus-ring shrink-0 border border-[#c9c6b9] px-2.5 py-1.5 text-[.62rem] font-bold uppercase tracking-[.08em] text-[#245d8d] hover:bg-[#ebe6da]" data-testid="button-fill-demo">Completar</button>
              </div>
            )}
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-[.68rem] text-[#89928d]" data-testid="text-session-security">
            <LockKeyhole className="h-3.5 w-3.5" strokeWidth={1.6} />
            Sesión protegida · Acceso por roles
          </p>
        </div>
      </section>
    </main>
  );
}

function StatusBadge({ state, color }: { state: string; color: string }) {
  const styles = color === 'orange'
    ? 'bg-[#f9ead8] text-[#a05b1c]'
    : color === 'teal'
      ? 'bg-[#dcece8] text-[#2d6c62]'
      : 'bg-[#e9e9e2] text-[#69736e]';
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[.64rem] font-bold ${styles}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{state}</span>;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState<NavSection>('Resumen');
  const [mobileNav, setMobileNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceView, setServiceView] = useState<'new' | 'saved'>('new');
  const [services, setServices] = useState<ServiceRecord[]>(() =>
    typeof window === 'undefined' ? [] : readStoredServices(),
  );
  const [serviceForm, setServiceForm] = useState({
    serviceName: '',
    description: '',
    address: '',
    quotation: '',
  });
  const [serviceErrors, setServiceErrors] = useState<Record<string, string>>({});
  const [savedNotice, setSavedNotice] = useState(false);

  const navItems: { label: NavSection; icon: typeof Activity }[] = [
    { label: 'Resumen', icon: Activity },
    { label: 'Casos de prueba', icon: ClipboardCheck },
    { label: 'Servicios', icon: Inbox },
    { label: 'Actividad', icon: Radio },
  ];

  const pageTitle = activeSection === 'Resumen' ? 'Resumen operativo' : activeSection === 'Servicios' ? 'Gestión de servicios' : activeSection;
  const pageDescription = activeSection === 'Resumen'
    ? 'Vista de control para la simulación actual.'
    : activeSection === 'Casos de prueba'
      ? 'Escenarios preparados para validar el flujo de atención.'
      : activeSection === 'Servicios'
        ? 'Registra una solicitud y deja trazabilidad de su cotización.'
      : 'Trazabilidad de las últimas acciones de la sesión.';
  const visibleRows = incidentRows.filter((row) => `${row.id} ${row.title} ${row.owner}`.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    window.localStorage.setItem(servicesStorageKey, JSON.stringify(services));
  }, [services]);

  const openServices = (view: 'new' | 'saved' = 'new') => {
    setActiveSection('Servicios');
    setServiceView(view);
    setMobileNav(false);
    setSavedNotice(false);
  };

  const updateServiceField = (field: keyof typeof serviceForm, value: string) => {
    setServiceForm((current) => ({ ...current, [field]: value }));
    if (serviceErrors[field]) {
      setServiceErrors((current) => ({ ...current, [field]: '' }));
    }
  };

  const saveService = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!serviceForm.serviceName.trim()) nextErrors.serviceName = 'Ingresa el nombre del servicio.';
    if (!serviceForm.description.trim()) nextErrors.description = 'Describe brevemente el servicio.';
    if (!serviceForm.address.trim()) nextErrors.address = 'Ingresa la dirección del servicio.';
    if (!serviceForm.quotation || Number(serviceForm.quotation) < 0) nextErrors.quotation = 'Ingresa una cotización válida.';
    if (Object.keys(nextErrors).length > 0) {
      setServiceErrors(nextErrors);
      return;
    }

    const newService: ServiceRecord = {
      id: `SRV-${String(Date.now()).slice(-6)}`,
      serviceName: serviceForm.serviceName.trim(),
      description: serviceForm.description.trim(),
      address: serviceForm.address.trim(),
      quotation: Number(serviceForm.quotation),
      status: 'A la espera',
      createdAt: new Date().toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' }),
    };
    setServices((current) => [newService, ...current]);
    setServiceForm({ serviceName: '', description: '', address: '', quotation: '' });
    setServiceErrors({});
    setServiceView('saved');
    setSavedNotice(true);
  };

  return (
    <div className="dashboard-shell noise flex min-h-[100dvh] text-[#173f40]">
      <aside className={`sidebar fixed inset-y-0 left-0 z-30 flex w-[248px] flex-col border-r border-[#2b6664] transition-transform md:relative md:translate-x-0 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Navegación principal">
        <div className="flex items-center justify-between px-7 py-7">
          <PronetMark />
          <button type="button" className="focus-ring p-1 text-[#8db0aa] md:hidden" onClick={() => setMobileNav(false)} aria-label="Cerrar menú" data-testid="button-close-menu"><X className="h-5 w-5" /></button>
        </div>
        <div className="mx-6 mb-8 border-t border-[#2b6664]" />
        <div className="px-4">
          <p className="px-3 pb-3 font-mono text-[.58rem] uppercase tracking-[.16em] text-[#79a29b]">Espacio operativo</p>
          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <button key={label} type="button" onClick={() => { setActiveSection(label); setMobileNav(false); }} className={`focus-ring flex w-full items-center gap-3 px-3 py-3 text-left text-[.82rem] transition-colors ${activeSection === label ? 'bg-[#155657] text-[#f3efe5]' : 'text-[#aec6c0] hover:bg-[#104c4d] hover:text-[#f3efe5]'}`} data-testid={`button-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>
                <Icon className="h-4 w-4" strokeWidth={1.7} />
                {label}
                {label === 'Casos de prueba' && <span className="ml-auto rounded-sm bg-[#e6802d] px-1.5 py-0.5 font-mono text-[.58rem] text-[#163f40]">03</span>}
                {label === 'Servicios' && services.length > 0 && <span className="ml-auto rounded-sm bg-[#e6802d] px-1.5 py-0.5 font-mono text-[.58rem] text-[#163f40]">{String(services.length).padStart(2, '0')}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto px-6 pb-7">
          <div className="mb-5 border-t border-[#2b6664] pt-5">
            <p className="font-mono text-[.57rem] uppercase tracking-[.13em] text-[#79a29b]">Sesión actual</p>
            <p className="mt-2 text-[.78rem] text-[#d2e0db]" data-testid="text-session-user">analista@pronet.system</p>
            <p className="mt-1 text-[.63rem] text-[#83a7a0]">Rol: Analista operativo</p>
          </div>
          <button type="button" onClick={onLogout} className="focus-ring flex items-center gap-2 text-[.75rem] text-[#abc3bd] transition-colors hover:text-[#f0b36e]" data-testid="button-logout">
            <LogOut className="h-4 w-4" strokeWidth={1.6} />
            Cerrar sesión
          </button>
        </div>
      </aside>
      {mobileNav && <button type="button" className="fixed inset-0 z-20 bg-[#073f42]/40 md:hidden" onClick={() => setMobileNav(false)} aria-label="Cerrar navegación" data-testid="button-dismiss-menu" />}

      <section className="min-w-0 flex-1">
        <header className="flex h-[76px] items-center justify-between border-b border-[#dfdbd0] bg-[#f7f4ed]/80 px-6 sm:px-10">
          <div className="flex items-center gap-4">
            <button type="button" className="focus-ring p-1 text-[#275d5c] md:hidden" onClick={() => setMobileNav(true)} aria-label="Abrir menú" data-testid="button-open-menu"><Menu className="h-5 w-5" /></button>
            <div className="hidden items-center gap-2 text-[.64rem] font-bold uppercase tracking-[.13em] text-[#7d8882] sm:flex"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#4a9678]" /> Entorno de simulación</div>
          </div>
          <div className="flex items-center gap-4">
            {searchOpen && <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Buscar casos" className="focus-ring w-28 border-b border-[#bfcac1] bg-transparent px-1 py-1 text-xs text-[#245d8d] outline-none placeholder:text-[#9aa39c] sm:w-40" aria-label="Buscar casos" data-testid="input-search-cases" />}
            <button type="button" onClick={() => setSearchOpen(!searchOpen)} className="focus-ring relative p-1.5 text-[#6e7b75] hover:text-[#245d8d]" aria-label={searchOpen ? 'Cerrar búsqueda' : 'Buscar'} aria-expanded={searchOpen} data-testid="button-search"><Search className="h-[18px] w-[18px]" strokeWidth={1.7} /></button>
            <div className="h-6 w-px bg-[#d8d5ca]" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#245d8d] font-serif text-sm text-[#f6f1e7]">A</div>
              <div className="hidden text-right sm:block">
                <p className="text-[.72rem] font-bold text-[#24504f]" data-testid="text-header-user">Analista operativo</p>
                <p className="font-mono text-[.57rem] text-[#819089]">PRN-014</p>
              </div>
              <MoreHorizontal className="hidden h-4 w-4 text-[#93a09a] sm:block" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1220px] px-6 py-9 sm:px-10 lg:px-14">
          <div className="animate-rise flex flex-col justify-between gap-5 border-b border-[#dcd8ce] pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-[#9c6b34]">Panel de control / {activeSection}</p>
              <h1 className="mt-3 font-serif text-3xl tracking-[-.045em] text-[#173f40] sm:text-[2.5rem]" data-testid="heading-dashboard">{pageTitle}</h1>
              <p className="mt-2 text-sm text-[#73807a]" data-testid="text-dashboard-description">{pageDescription}</p>
            </div>
            <div className="flex items-center gap-2 text-[.65rem] text-[#74827b]">
              <Clock3 className="h-4 w-4" strokeWidth={1.6} />
              Última sincronización: <span className="font-mono text-[#315c5c]">09:42:18</span>
            </div>
          </div>

          {activeSection === 'Resumen' && (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="dashboard-card animate-rise-2 p-5">
                  <div className="flex items-start justify-between"><p className="text-[.67rem] font-bold uppercase tracking-[.1em] text-[#7f8b84]">Casos abiertos</p><FileText className="h-4 w-4 text-[#a37949]" strokeWidth={1.7} /></div>
                  <p className="mt-5 font-serif text-3xl text-[#174f4d]" data-testid="metric-open-cases">02</p>
                  <p className="mt-1 text-[.68rem] text-[#8b948e]">+1 desde ayer</p>
                </div>
                <div className="dashboard-card animate-rise-2 p-5">
                  <div className="flex items-start justify-between"><p className="text-[.67rem] font-bold uppercase tracking-[.1em] text-[#7f8b84]">En revisión</p><AlertCircle className="h-4 w-4 text-[#d17b2b]" strokeWidth={1.7} /></div>
                  <p className="mt-5 font-serif text-3xl text-[#174f4d]" data-testid="metric-in-review">01</p>
                  <p className="mt-1 text-[.68rem] text-[#8b948e]">Requiere seguimiento</p>
                </div>
                <div className="dashboard-card animate-rise-3 p-5">
                  <div className="flex items-start justify-between"><p className="text-[.67rem] font-bold uppercase tracking-[.1em] text-[#7f8b84]">Tiempo medio</p><Activity className="h-4 w-4 text-[#477c72]" strokeWidth={1.7} /></div>
                  <p className="mt-5 font-serif text-3xl text-[#174f4d]" data-testid="metric-response-time">18<span className="ml-1 text-lg">min</span></p>
                  <p className="mt-1 text-[.68rem] text-[#8b948e]">Últimos 7 días</p>
                </div>
                <div className="dashboard-card animate-rise-3 p-5">
                  <div className="flex items-start justify-between"><p className="text-[.67rem] font-bold uppercase tracking-[.1em] text-[#7f8b84]">Trazabilidad</p><CheckCircle2 className="h-4 w-4 text-[#477c72]" strokeWidth={1.7} /></div>
                  <p className="mt-5 font-serif text-3xl text-[#174f4d]" data-testid="metric-traceability">100<span className="ml-1 text-lg">%</span></p>
                  <p className="mt-1 text-[.68rem] text-[#8b948e]">Registros completos</p>
                </div>
              </div>
              <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,.75fr)]">
                <section className="dashboard-card animate-rise-4 overflow-hidden" aria-labelledby="incidents-title">
                  <div className="flex items-center justify-between border-b border-[#e2ded4] px-5 py-5 sm:px-6">
                    <div><h2 id="incidents-title" className="font-serif text-lg text-[#1a4b4b]">Incidencias recientes</h2><p className="mt-1 text-xs text-[#87918b]">Seguimiento de los casos de la simulación</p></div>
                    <button type="button" onClick={() => setActiveSection('Casos de prueba')} className="focus-ring text-[.65rem] font-bold uppercase tracking-[.08em] text-[#245d8d] hover:text-[#174e7d]" data-testid="button-view-all-cases">Ver todos <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></button>
                  </div>
                  <div className="divide-y divide-[#e9e5dc]">
                    {visibleRows.map((row) => (
                      <div key={row.id} className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4 sm:grid-cols-[minmax(170px,1.1fr)_minmax(120px,.8fr)_auto_auto] sm:items-center sm:px-6" data-testid={`row-incident-${row.id}`}>
                        <div className="min-w-0"><p className="truncate text-[.82rem] font-bold text-[#285a59]">{row.title}</p><p className="mt-1 font-mono text-[.61rem] text-[#9aa39c]">{row.id}</p></div>
                        <p className="hidden text-xs text-[#74807a] sm:block">{row.owner}</p>
                        <StatusBadge state={row.state} color={row.color} />
                        <p className="hidden text-right text-[.65rem] text-[#9aa39c] sm:block">{row.time}</p>
                      </div>
                    ))}
                    {visibleRows.length === 0 && <div className="px-6 py-8 text-center text-xs text-[#87918b]" data-testid="empty-search-results">No hay incidencias que coincidan con la búsqueda.</div>}
                  </div>
                </section>
                <section className="dashboard-card animate-rise-4 p-5 sm:p-6" aria-labelledby="health-title">
                  <div className="flex items-start justify-between"><div><h2 id="health-title" className="font-serif text-lg text-[#1a4b4b]">Salud del sistema</h2><p className="mt-1 text-xs text-[#87918b]">Servicios monitoreados</p></div><Monitor className="h-5 w-5 text-[#477c72]" strokeWidth={1.6} /></div>
                  <div className="mt-7 space-y-5">
                    {['Registro de evidencias', 'Asignación de responsables', 'Auditoría de actividad'].map((label) => <div key={label} className="flex items-center justify-between gap-3"><span className="text-[.76rem] text-[#64736c]">{label}</span><span className="flex items-center gap-1.5 text-[.65rem] font-bold text-[#43806f]"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#4c9a7d]" />Operativo</span></div>)}
                  </div>
                  <div className="mt-8 border-t border-[#e3ded3] pt-5"><div className="flex items-center gap-2 text-[.68rem] text-[#728078]"><ShieldCheck className="h-4 w-4 text-[#477c72]" />Todos los controles responden</div></div>
                </section>
              </div>
            </>
          )}

          {activeSection === 'Casos de prueba' && (
            <section className="dashboard-card animate-rise-2 mt-8 overflow-hidden" aria-label="Casos de prueba">
              <div className="border-b border-[#e2ded4] px-5 py-5 sm:px-6"><h2 className="font-serif text-lg text-[#1a4b4b]">Casos de prueba activos</h2><p className="mt-1 text-xs text-[#87918b]">Tres escenarios disponibles para revisar el flujo de control.</p></div>
              <div className="divide-y divide-[#e9e5dc]">{visibleRows.map((row, index) => <div key={row.id} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6" data-testid={`card-test-case-${row.id}`}><div className="flex items-start gap-4"><span className="font-mono text-xs text-[#a37949]">0{index + 1}</span><div><p className="text-sm font-bold text-[#285a59]">{row.title}</p><p className="mt-1 text-xs text-[#87918b]">Validar registro, asignación y cierre documentado.</p></div></div><StatusBadge state={row.state} color={row.color} /></div>)}{visibleRows.length === 0 && <div className="px-6 py-8 text-center text-xs text-[#87918b]" data-testid="empty-case-results">No hay casos que coincidan con la búsqueda.</div>}</div>
            </section>
          )}

          {activeSection === 'Servicios' && (
            <section className="animate-rise-2 mt-8" aria-label="Gestión de servicios">
              <div className="service-tabs mb-5 flex flex-wrap items-center gap-2 border-b border-[#dcd8ce]">
                <button
                  type="button"
                  onClick={() => openServices('new')}
                  className={`focus-ring service-tab ${serviceView === 'new' ? 'service-tab-active' : ''}`}
                  data-testid="tab-new-service"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.8} />
                  Servicio nuevo
                </button>
                <button
                  type="button"
                  onClick={() => openServices('saved')}
                  className={`focus-ring service-tab ${serviceView === 'saved' ? 'service-tab-active' : ''}`}
                  data-testid="tab-saved-services"
                >
                  <Inbox className="h-4 w-4" strokeWidth={1.8} />
                  Guardados
                  {services.length > 0 && <span className="service-count">{services.length}</span>}
                </button>
              </div>

              {serviceView === 'new' ? (
                <form className="dashboard-card overflow-hidden" onSubmit={saveService} noValidate data-testid="form-new-service">
                  <div className="border-b border-[#e2ded4] px-5 py-5 sm:px-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="eyebrow text-[#9c6b34]">Registro de atención</p>
                        <h2 className="mt-2 font-serif text-2xl tracking-[-.04em] text-[#1a4b4b]">Ingresar un servicio</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7a8780]">Completa los datos de la solicitud para dejarla en seguimiento operativo.</p>
                      </div>
                      <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#e7f0ec] text-[#2d7467] sm:flex">
                        <ClipboardCheck className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 px-5 py-6 sm:grid-cols-2 sm:px-7">
                    <div className="sm:col-span-2">
                      <label htmlFor="service-name" className="form-label">Servicio solicitado</label>
                      <input
                        id="service-name"
                        value={serviceForm.serviceName}
                        onChange={(event) => updateServiceField('serviceName', event.target.value)}
                        placeholder="Ej. Mantenimiento de red"
                        className={`service-input ${serviceErrors.serviceName ? 'service-input-error' : ''}`}
                        aria-invalid={Boolean(serviceErrors.serviceName)}
                        data-testid="input-service-name"
                      />
                      {serviceErrors.serviceName && <p className="form-error" data-testid="error-service-name">{serviceErrors.serviceName}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="service-description" className="form-label">Descripción del servicio</label>
                      <textarea
                        id="service-description"
                        value={serviceForm.description}
                        onChange={(event) => updateServiceField('description', event.target.value)}
                        placeholder="Describe el trabajo que debe realizarse y cualquier detalle importante."
                        rows={4}
                        className={`service-input resize-y ${serviceErrors.description ? 'service-input-error' : ''}`}
                        aria-invalid={Boolean(serviceErrors.description)}
                        data-testid="input-service-description"
                      />
                      {serviceErrors.description && <p className="form-error" data-testid="error-service-description">{serviceErrors.description}</p>}
                    </div>
                    <div>
                      <label htmlFor="service-address" className="form-label"><MapPin className="mr-1 inline h-3.5 w-3.5" />Dirección del servicio</label>
                      <input
                        id="service-address"
                        value={serviceForm.address}
                        onChange={(event) => updateServiceField('address', event.target.value)}
                        placeholder="Ej. Av. Arequipa 2450, Lima"
                        className={`service-input ${serviceErrors.address ? 'service-input-error' : ''}`}
                        aria-invalid={Boolean(serviceErrors.address)}
                        data-testid="input-service-address"
                      />
                      {serviceErrors.address && <p className="form-error" data-testid="error-service-address">{serviceErrors.address}</p>}
                    </div>
                    <div>
                      <label htmlFor="service-quotation" className="form-label"><CircleDollarSign className="mr-1 inline h-3.5 w-3.5" />Cotización estimada</label>
                      <div className={`flex items-center service-input ${serviceErrors.quotation ? 'service-input-error' : ''}`}>
                        <span className="mr-2 font-mono text-xs text-[#87918b]">S/</span>
                        <input
                          id="service-quotation"
                          type="number"
                          min="0"
                          step="0.01"
                          value={serviceForm.quotation}
                          onChange={(event) => updateServiceField('quotation', event.target.value)}
                          placeholder="0.00"
                          className="w-full bg-transparent outline-none"
                          aria-invalid={Boolean(serviceErrors.quotation)}
                          data-testid="input-service-quotation"
                        />
                      </div>
                      {serviceErrors.quotation && <p className="form-error" data-testid="error-service-quotation">{serviceErrors.quotation}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 border-t border-[#e2ded4] bg-[#fbfaf6] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
                    <p className="flex items-center gap-2 text-xs text-[#7a8780]"><span className="h-2 w-2 rounded-full bg-[#db4d44]" />Al guardar, el servicio quedará <strong className="font-bold text-[#a33f38]">A la espera</strong>.</p>
                    <button type="submit" className="focus-ring flex w-full items-center justify-center gap-2 bg-[#245d8d] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-[#f9f5ea] transition-colors hover:bg-[#174e7d] sm:w-auto" data-testid="button-save-service">
                      <Save className="h-4 w-4" strokeWidth={1.7} />
                      Guardar servicio
                    </button>
                  </div>
                </form>
              ) : (
                <section className="dashboard-card overflow-hidden" aria-label="Servicios guardados" data-testid="saved-services-panel">
                  <div className="flex flex-col gap-4 border-b border-[#e2ded4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <div>
                      <p className="eyebrow text-[#9c6b34]">Bandeja de seguimiento</p>
                      <h2 className="mt-2 font-serif text-2xl tracking-[-.04em] text-[#1a4b4b]">Servicios guardados</h2>
                      <p className="mt-2 text-sm text-[#7a8780]">Cada registro conserva la cotización y queda listo para su asignación.</p>
                    </div>
                    <button type="button" onClick={() => openServices('new')} className="focus-ring flex items-center justify-center gap-2 border border-[#b9c9c0] px-4 py-2.5 text-xs font-bold uppercase tracking-[.08em] text-[#245d8d] transition-colors hover:bg-[#eef4f0]" data-testid="button-create-another-service">
                      <Plus className="h-4 w-4" />
                      Servicio nuevo
                    </button>
                  </div>
                  {savedNotice && (
                    <div className="mx-5 mt-5 flex items-center gap-2 rounded-md border border-[#cde1d7] bg-[#edf7f1] px-4 py-3 text-xs text-[#34735f] sm:mx-7" role="status" data-testid="service-saved-notice">
                      <CheckCircle2 className="h-4 w-4" />
                      Servicio guardado correctamente en la bandeja de seguimiento.
                    </div>
                  )}
                  {services.length > 0 ? (
                    <div className="divide-y divide-[#e9e5dc]">
                      {services.map((service) => (
                        <article key={service.id} className="px-5 py-5 sm:px-7" data-testid={`saved-service-${service.id}`}>
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-3">
                                <h3 className="text-base font-bold text-[#285a59]">{service.serviceName}</h3>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f9e4e0] px-2.5 py-1 text-[.64rem] font-bold text-[#a33f38]">
                                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#db4d44]" />
                                  {service.status}
                                </span>
                              </div>
                              <p className="mt-1 font-mono text-[.61rem] text-[#9aa39c]">{service.id} · Registrado {service.createdAt}</p>
                              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#66756e]">{service.description}</p>
                              <p className="mt-3 flex items-center gap-1.5 text-xs text-[#7a8780]"><MapPin className="h-3.5 w-3.5 text-[#a37949]" />{service.address}</p>
                            </div>
                            <div className="shrink-0 rounded-md bg-[#f5f1e8] px-4 py-3 lg:min-w-[150px]">
                              <p className="text-[.62rem] font-bold uppercase tracking-[.1em] text-[#8a918a]">Cotización</p>
                              <p className="mt-1 font-serif text-2xl text-[#245d8d]">S/ {service.quotation.toFixed(2)}</p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center px-6 py-14 text-center" data-testid="empty-saved-services">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef4f0] text-[#5d8d7d]"><Inbox className="h-5 w-5" /></div>
                      <h3 className="mt-4 font-serif text-lg text-[#1a4b4b]">Aún no hay servicios guardados</h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-[#7a8780]">Registra tu primera solicitud para verla aquí con el estado A la espera.</p>
                    </div>
                  )}
                </section>
              )}
            </section>
          )}

          {activeSection === 'Actividad' && (
            <section className="dashboard-card animate-rise-2 mt-8" aria-label="Registro de actividad">
              <div className="border-b border-[#e2ded4] px-5 py-5 sm:px-6"><h2 className="font-serif text-lg text-[#1a4b4b]">Registro de actividad</h2><p className="mt-1 text-xs text-[#87918b]">Eventos de esta sesión de demostración.</p></div>
              <div className="space-y-5 px-5 py-6 sm:px-6">{['Sesión iniciada por analista@pronet.system', 'Casos de prueba sincronizados', 'Control de trazabilidad verificado'].map((event, index) => <div key={event} className="flex items-start gap-3" data-testid={`activity-event-${index}`}><div className="mt-1 h-2 w-2 rounded-full bg-[#d17b2b]" /><div><p className="text-sm text-[#355b59]">{event}</p><p className="mt-1 font-mono text-[.61rem] text-[#9aa39c]">{index === 0 ? '09:42:18' : index === 1 ? '09:42:20' : '09:42:22'}</p></div></div>)}</div>
            </section>
          )}

          <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-[#dedad0] pt-5 text-[.62rem] text-[#9ba39d] sm:flex-row">
            <span>Pronet System · Simulación de pruebas académica</span>
            <span className="font-mono">Canal seguro / sesión local</span>
          </footer>
        </main>
      </section>
    </div>
  );
}

function Router() {
  const [authenticated, setAuthenticated] = useState(false);
  const [, setLocation] = useLocation();
  return authenticated
    ? <Dashboard onLogout={() => { setAuthenticated(false); setLocation('/'); }} />
    : <LoginPage onSuccess={() => setAuthenticated(true)} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ErrorBoundary resetKey="pronet"><Router /></ErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;