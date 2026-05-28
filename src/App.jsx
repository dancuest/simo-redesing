import { useMemo, useState } from 'react'
import './App.css'

const navItems = [
  {
    id: 'inicio',
    label: 'Inicio',
    eyebrow: 'Acceso público',
    title: 'Inicio ciudadano',
  },
  {
    id: 'acceso',
    label: 'Acceso',
    eyebrow: 'Autenticación',
    title: 'Ingreso y registro',
  },
  {
    id: 'panel',
    label: 'Panel ciudadano',
    eyebrow: 'Resumen personal',
    title: 'Panel ciudadano',
  },
  {
    id: 'busqueda',
    label: 'Búsqueda',
    eyebrow: 'Convocatorias',
    title: 'Búsqueda de empleos',
  },
  {
    id: 'detalle',
    label: 'Detalle',
    eyebrow: 'Información clara',
    title: 'Detalle de convocatoria',
  },
  {
    id: 'inscripcion',
    label: 'Inscripción',
    eyebrow: 'Postulación guiada',
    title: 'Inscripción a empleo',
  },
  {
    id: 'mis-empleos',
    label: 'Mis empleos',
    eyebrow: 'Seguimiento',
    title: 'Mis empleos guardados y postulados',
  },
  {
    id: 'hoja-vida',
    label: 'Hoja de vida',
    eyebrow: 'Perfil laboral',
    title: 'Hoja de vida',
  },
  {
    id: 'alertas',
    label: 'Alertas',
    eyebrow: 'Notificaciones',
    title: 'Centro de alertas',
  },
  {
    id: 'ayuda',
    label: 'Ayuda',
    eyebrow: 'Soporte',
    title: 'Ayuda y accesibilidad',
  },
]

const featuredJobs = [
  {
    code: 'SIMO-24791',
    title: 'Profesional universitario de sistemas',
    entity: 'Alcaldía de Cali',
    city: 'Cali, Valle del Cauca',
    salary: '$4.850.000',
    vacancies: 3,
    deadline: 'Cierra en 6 días',
    tags: ['Sistemas', 'Profesional', 'Presencial'],
  },
  {
    code: 'SIMO-24822',
    title: 'Técnico administrativo',
    entity: 'Gobernación del Valle',
    city: 'Palmira, Valle del Cauca',
    salary: '$2.950.000',
    vacancies: 8,
    deadline: 'Cierra en 10 días',
    tags: ['Técnico', 'Administrativo', 'Mixto'],
  },
  {
    code: 'SIMO-25008',
    title: 'Analista de datos junior',
    entity: 'Entidad Nacional Digital',
    city: 'Bogotá D.C.',
    salary: '$4.200.000',
    vacancies: 5,
    deadline: 'Cierra en 14 días',
    tags: ['Datos', 'Junior', 'Remoto parcial'],
  },
]

const applicationSteps = [
  {
    number: '01',
    title: 'Verifica requisitos',
    description: 'Confirma estudios, experiencia, documentos y ciudad antes de iniciar.',
  },
  {
    number: '02',
    title: 'Actualiza hoja de vida',
    description: 'Carga soportes y revisa que la información esté completa.',
  },
  {
    number: '03',
    title: 'Selecciona empleo',
    description: 'Guarda la convocatoria o continúa directamente con la inscripción.',
  },
  {
    number: '04',
    title: 'Confirma inscripción',
    description: 'Revisa el resumen final y acepta la declaración de veracidad.',
  },
]

const savedProcesses = [
  {
    title: 'Profesional universitario de sistemas',
    status: 'Inscripción en revisión',
    progress: 68,
    next: 'Validación documental',
  },
  {
    title: 'Técnico administrativo',
    status: 'Guardado',
    progress: 25,
    next: 'Completar inscripción',
  },
  {
    title: 'Analista de datos junior',
    status: 'Convocatoria consultada',
    progress: 15,
    next: 'Revisar requisitos',
  },
]

const notifications = [
  {
    type: 'Importante',
    title: 'Tu inscripción fue recibida',
    text: 'La convocatoria SIMO-24791 pasó a revisión documental.',
    time: 'Hoy, 9:20 a. m.',
  },
  {
    type: 'Recordatorio',
    title: 'Convocatoria próxima a cerrar',
    text: 'Tienes 6 días para finalizar la inscripción al empleo guardado.',
    time: 'Ayer, 5:45 p. m.',
  },
  {
    type: 'Sistema',
    title: 'Documento pendiente',
    text: 'El soporte de experiencia laboral necesita fecha de finalización.',
    time: 'Lunes, 2:10 p. m.',
  },
]

function App() {
  const [activeScreen, setActiveScreen] = useState('inicio')
  const [searchTerm, setSearchTerm] = useState('sistemas')

  const activeItem = useMemo(
    () => navItems.find((item) => item.id === activeScreen) ?? navItems[0],
    [activeScreen],
  )

  const filteredJobs = featuredJobs.filter((job) => {
    const query = searchTerm.toLowerCase()
    return (
      job.title.toLowerCase().includes(query) ||
      job.entity.toLowerCase().includes(query) ||
      job.city.toLowerCase().includes(query) ||
      job.tags.join(' ').toLowerCase().includes(query)
    )
  })

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>

      <aside className="sidebar" aria-label="Navegación principal del prototipo">
        <div className="brand-block">
          <div className="brand-logo" aria-hidden="true">
            S
          </div>
          <div>
            <p className="brand-kicker">Rediseño UX</p>
            <h1>SIMO</h1>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`nav-button ${activeScreen === item.id ? 'is-active' : ''}`}
              onClick={() => setActiveScreen(item.id)}
              aria-current={activeScreen === item.id ? 'page' : undefined}
            >
              <span className="nav-index">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="sidebar-card-title">Objetivo UX</p>
          <p>
            Reducir fricción, mejorar comprensión y guiar al ciudadano con lenguaje claro.
          </p>
        </div>
      </aside>

      <main id="contenido-principal" className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">{activeItem.eyebrow}</p>
            <h2>{activeItem.title}</h2>
          </div>

          <div className="topbar-actions" aria-label="Acciones rápidas">
            <button type="button" className="ghost-button">
              Alto contraste
            </button>
            <button type="button" className="primary-button" onClick={() => setActiveScreen('acceso')}>
              Iniciar sesión
            </button>
          </div>
        </header>

        <section className="content-card">
          {activeScreen === 'inicio' && <HomeScreen setActiveScreen={setActiveScreen} />}
          {activeScreen === 'acceso' && <AccessScreen setActiveScreen={setActiveScreen} />}
          {activeScreen === 'panel' && <DashboardScreen setActiveScreen={setActiveScreen} />}
          {activeScreen === 'busqueda' && (
            <SearchScreen
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredJobs={filteredJobs}
              setActiveScreen={setActiveScreen}
            />
          )}
          {activeScreen === 'detalle' && <DetailScreen setActiveScreen={setActiveScreen} />}
          {activeScreen === 'inscripcion' && <ApplicationScreen setActiveScreen={setActiveScreen} />}
          {activeScreen === 'mis-empleos' && <MyJobsScreen setActiveScreen={setActiveScreen} />}
          {activeScreen === 'hoja-vida' && <ProfileScreen setActiveScreen={setActiveScreen} />}
          {activeScreen === 'alertas' && <AlertsScreen />}
          {activeScreen === 'ayuda' && <HelpScreen />}
        </section>
      </main>
    </div>
  )
}

function HomeScreen({ setActiveScreen }) {
  return (
    <div className="screen-grid hero-grid">
      <div className="hero-copy">
        <span className="status-pill">Prototipo de alta fidelidad</span>
        <h3>Encuentra convocatorias públicas sin perderte en el proceso.</h3>
        <p>
          Esta propuesta reorganiza la experiencia de SIMO alrededor de tareas reales:
          buscar empleos, revisar requisitos, postularse y hacer seguimiento sin ambigüedad.
        </p>

        <div className="hero-actions">
          <button type="button" className="primary-button large" onClick={() => setActiveScreen('busqueda')}>
            Buscar convocatorias
          </button>
          <button type="button" className="secondary-button large" onClick={() => setActiveScreen('ayuda')}>
            Ver guía rápida
          </button>
        </div>
      </div>

      <div className="hero-panel" aria-label="Resumen visual de mejoras">
        <div className="hero-panel-header">
          <span>SIMO claro</span>
          <strong>+ UX Writing</strong>
        </div>

        <div className="metric-row">
          <MetricCard value="10" label="pantallas clave" />
          <MetricCard value="4" label="pasos de inscripción" />
          <MetricCard value="100%" label="lenguaje ciudadano" />
        </div>

        <div className="mini-flow">
          <span>Buscar</span>
          <span>Comparar</span>
          <span>Postularse</span>
          <span>Seguir avance</span>
        </div>
      </div>

      <section className="wide-card">
        <div className="section-heading">
          <p className="eyebrow">Problema detectado</p>
          <h4>La información existe, pero el usuario necesita orientación.</h4>
        </div>

        <div className="insight-grid">
          <InsightCard
            title="Antes"
            text="Menús densos, etiquetas técnicas y rutas poco evidentes para completar una inscripción."
          />
          <InsightCard
            title="Después"
            text="Flujo guiado, mensajes accionables, filtros visibles y seguimiento del estado de cada empleo."
          />
          <InsightCard
            title="Impacto esperado"
            text="Menos abandono, menor carga cognitiva y mayor confianza del ciudadano en cada decisión."
          />
        </div>
      </section>
    </div>
  )
}

function AccessScreen({ setActiveScreen }) {
  return (
    <div className="two-column">
      <section className="form-card">
        <p className="eyebrow">Ingreso seguro</p>
        <h3>Accede a tu cuenta</h3>
        <p className="muted">
          Usa tus datos registrados para consultar postulaciones, documentos y alertas.
        </p>

        <form className="stacked-form">
          <label>
            Correo electrónico
            <input type="email" placeholder="nombre@correo.com" />
          </label>

          <label>
            Contraseña
            <input type="password" placeholder="Ingresa tu contraseña" />
          </label>

          <div className="form-options">
            <label className="check-row">
              <input type="checkbox" />
              Recordarme
            </label>
            <button type="button" className="link-button">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button type="button" className="primary-button full" onClick={() => setActiveScreen('panel')}>
            Entrar al panel
          </button>
        </form>
      </section>

      <section className="support-card">
        <span className="status-pill">Nuevo usuario</span>
        <h3>Crea tu cuenta en menos pasos</h3>
        <p>
          El registro se divide en bloques cortos: datos básicos, contacto, documento e intereses
          laborales.
        </p>

        <ul className="check-list">
          <li>Mensajes claros sobre campos obligatorios.</li>
          <li>Validación visible antes de enviar.</li>
          <li>Ayuda contextual para documentos y soportes.</li>
        </ul>

        <button type="button" className="secondary-button full" onClick={() => setActiveScreen('hoja-vida')}>
          Completar hoja de vida
        </button>
      </section>
    </div>
  )
}

function DashboardScreen({ setActiveScreen }) {
  return (
    <div className="screen-grid">
      <section className="welcome-card">
        <div>
          <p className="eyebrow">Hola, Daniel</p>
          <h3>Tu proceso laboral en una sola vista</h3>
          <p>
            Revisa tus convocatorias guardadas, postulaciones activas y documentos pendientes.
          </p>
        </div>

        <button type="button" className="primary-button" onClick={() => setActiveScreen('busqueda')}>
          Explorar empleos
        </button>
      </section>

      <div className="metric-row">
        <MetricCard value="3" label="empleos guardados" />
        <MetricCard value="1" label="inscripción activa" />
        <MetricCard value="82%" label="hoja de vida completa" />
      </div>

      <section className="wide-card">
        <div className="section-heading">
          <p className="eyebrow">Siguiente mejor acción</p>
          <h4>Continúa donde lo dejaste</h4>
        </div>

        <div className="process-list">
          {savedProcesses.map((process) => (
            <article className="process-card" key={process.title}>
              <div>
                <h5>{process.title}</h5>
                <p>{process.status}</p>
              </div>

              <div className="progress-block">
                <div className="progress-bar" aria-label={`Avance ${process.progress}%`}>
                  <span style={{ width: `${process.progress}%` }} />
                </div>
                <small>{process.next}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function SearchScreen({ searchTerm, setSearchTerm, filteredJobs, setActiveScreen }) {
  return (
    <div className="screen-grid">
      <section className="search-hero">
        <div>
          <p className="eyebrow">Búsqueda inteligente</p>
          <h3>Filtra por cargo, entidad, ciudad o palabra clave</h3>
        </div>

        <label className="search-box">
          <span>Buscar convocatoria</span>
          <input
            type="search"
            value={searchTerm}
            placeholder="Ejemplo: sistemas, técnico, Cali"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </section>

      <section className="filter-row" aria-label="Filtros de búsqueda">
        <button type="button">Ciudad: Cali</button>
        <button type="button">Nivel: Profesional</button>
        <button type="button">Modalidad: Presencial</button>
        <button type="button">Salario: + $3M</button>
      </section>

      <section className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.code} job={job} setActiveScreen={setActiveScreen} />
          ))
        ) : (
          <div className="empty-state">
            <h4>No encontramos resultados exactos</h4>
            <p>Prueba con una palabra más general, como “administrativo” o “Cali”.</p>
          </div>
        )}
      </section>
    </div>
  )
}

function DetailScreen({ setActiveScreen }) {
  return (
    <div className="screen-grid">
      <section className="detail-header">
        <div>
          <span className="status-pill">Convocatoria abierta</span>
          <h3>Profesional universitario de sistemas</h3>
          <p>Alcaldía de Cali · SIMO-24791 · Cali, Valle del Cauca</p>
        </div>

        <div className="salary-card">
          <span>Asignación mensual</span>
          <strong>$4.850.000</strong>
        </div>
      </section>

      <section className="detail-grid">
        <InfoBlock title="Requisitos mínimos">
          <ul>
            <li>Título profesional en Ingeniería de Sistemas o áreas afines.</li>
            <li>Tarjeta profesional vigente cuando aplique.</li>
            <li>24 meses de experiencia relacionada.</li>
          </ul>
        </InfoBlock>

        <InfoBlock title="Funciones principales">
          <ul>
            <li>Apoyar la gestión de sistemas de información institucionales.</li>
            <li>Realizar seguimiento a incidentes, reportes y disponibilidad.</li>
            <li>Documentar procesos técnicos y mejoras operativas.</li>
          </ul>
        </InfoBlock>

        <InfoBlock title="Fechas clave">
          <ul>
            <li>Publicación: 20 de mayo de 2026.</li>
            <li>Cierre de inscripción: 3 de junio de 2026.</li>
            <li>Validación documental: posterior al cierre.</li>
          </ul>
        </InfoBlock>
      </section>

      <section className="action-strip">
        <p>Antes de inscribirte, revisa que tu hoja de vida tenga soportes actualizados.</p>
        <button type="button" className="primary-button" onClick={() => setActiveScreen('inscripcion')}>
          Iniciar inscripción
        </button>
      </section>
    </div>
  )
}

function ApplicationScreen({ setActiveScreen }) {
  return (
    <div className="screen-grid">
      <section className="section-heading">
        <p className="eyebrow">Inscripción guiada</p>
        <h3>Postúlate con una ruta clara de cuatro pasos</h3>
        <p>
          El rediseño evita que el usuario avance sin entender qué falta, qué ya fue validado y
          qué se enviará.
        </p>
      </section>

      <div className="steps-grid">
        {applicationSteps.map((step) => (
          <article className="step-card" key={step.number}>
            <span>{step.number}</span>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </article>
        ))}
      </div>

      <section className="review-card">
        <div>
          <h4>Resumen antes de enviar</h4>
          <p>
            Cargo seleccionado: Profesional universitario de sistemas. Tu perfil cumple los
            requisitos mínimos, pero hay un soporte por revisar.
          </p>
        </div>

        <ul className="check-list compact">
          <li>Datos personales completos.</li>
          <li>Experiencia laboral cargada.</li>
          <li>Documento de identidad verificado.</li>
          <li className="warning">Soporte académico pendiente de revisión.</li>
        </ul>

        <button type="button" className="primary-button full" onClick={() => setActiveScreen('mis-empleos')}>
          Confirmar inscripción
        </button>
      </section>
    </div>
  )
}

function MyJobsScreen({ setActiveScreen }) {
  return (
    <div className="screen-grid">
      <section className="section-heading">
        <p className="eyebrow">Seguimiento transparente</p>
        <h3>Consulta el estado de cada proceso</h3>
      </section>

      <div className="tracking-list">
        {savedProcesses.map((process) => (
          <article className="tracking-card" key={process.title}>
            <div>
              <h4>{process.title}</h4>
              <p>{process.status}</p>
            </div>

            <div className="tracking-meta">
              <span>{process.progress}%</span>
              <button type="button" className="secondary-button" onClick={() => setActiveScreen('detalle')}>
                Ver detalle
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="tip-card">
        <h4>Microcopy propuesto</h4>
        <p>
          “Tu inscripción está en revisión. No necesitas hacer nada por ahora. Te avisaremos si
          algún documento requiere corrección.”
        </p>
      </section>
    </div>
  )
}

function ProfileScreen({ setActiveScreen }) {
  return (
    <div className="screen-grid">
      <section className="profile-header">
        <div className="avatar" aria-hidden="true">
          DC
        </div>

        <div>
          <p className="eyebrow">Hoja de vida</p>
          <h3>Daniel Cuesta</h3>
          <p>Ingeniería de Sistemas · Cali, Valle del Cauca</p>
        </div>

        <button type="button" className="primary-button" onClick={() => setActiveScreen('busqueda')}>
          Ver empleos compatibles
        </button>
      </section>

      <div className="metric-row">
        <MetricCard value="82%" label="perfil completo" />
        <MetricCard value="4" label="soportes cargados" />
        <MetricCard value="1" label="alerta pendiente" />
      </div>

      <section className="detail-grid">
        <InfoBlock title="Datos personales">
          <p>Documento, contacto, ubicación y disponibilidad laboral.</p>
        </InfoBlock>

        <InfoBlock title="Formación académica">
          <p>Estudios técnicos, universitarios, certificaciones y soportes cargados.</p>
        </InfoBlock>

        <InfoBlock title="Experiencia">
          <p>Historial laboral organizado por cargo, entidad, fechas y funciones.</p>
        </InfoBlock>
      </section>

      <section className="action-strip">
        <p>Una hoja de vida completa mejora la compatibilidad con convocatorias.</p>
        <button type="button" className="secondary-button">
          Actualizar información
        </button>
      </section>
    </div>
  )
}

function AlertsScreen() {
  return (
    <div className="screen-grid">
      <section className="section-heading">
        <p className="eyebrow">Centro de alertas</p>
        <h3>Mensajes priorizados y fáciles de entender</h3>
      </section>

      <div className="notification-list">
        {notifications.map((notification) => (
          <article className="notification-card" key={notification.title}>
            <div>
              <span className="notification-type">{notification.type}</span>
              <h4>{notification.title}</h4>
              <p>{notification.text}</p>
            </div>
            <time>{notification.time}</time>
          </article>
        ))}
      </div>

      <section className="preferences-card">
        <h4>Preferencias de notificación</h4>
        <div className="toggle-list">
          <label>
            <input type="checkbox" defaultChecked />
            Recibir alertas de cierres próximos.
          </label>
          <label>
            <input type="checkbox" defaultChecked />
            Recibir cambios de estado de inscripción.
          </label>
          <label>
            <input type="checkbox" />
            Recibir nuevas convocatorias similares.
          </label>
        </div>
      </section>
    </div>
  )
}

function HelpScreen() {
  return (
    <div className="screen-grid">
      <section className="section-heading">
        <p className="eyebrow">Soporte ciudadano</p>
        <h3>Ayuda clara, accesible y orientada a tareas</h3>
        <p>
          Esta pantalla centraliza preguntas frecuentes, accesibilidad y rutas de contacto.
        </p>
      </section>

      <div className="help-grid">
        <InfoBlock title="¿Cómo me inscribo?">
          <p>Busca una convocatoria, revisa requisitos, completa tu hoja de vida y confirma.</p>
        </InfoBlock>

        <InfoBlock title="¿Qué documentos necesito?">
          <p>Documento de identidad, soportes académicos, experiencia y certificaciones.</p>
        </InfoBlock>

        <InfoBlock title="¿Cómo consulto mi estado?">
          <p>Entra a “Mis empleos” y revisa el avance de cada proceso guardado o inscrito.</p>
        </InfoBlock>

        <InfoBlock title="Accesibilidad">
          <p>Incluye contraste alto, textos descriptivos, navegación por teclado y etiquetas claras.</p>
        </InfoBlock>
      </div>

      <section className="contact-card">
        <div>
          <h4>¿No encontraste lo que necesitabas?</h4>
          <p>El usuario puede recibir orientación sin salir del flujo principal.</p>
        </div>

        <button type="button" className="primary-button">
          Solicitar ayuda
        </button>
      </section>
    </div>
  )
}

function MetricCard({ value, label }) {
  return (
    <article className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

function InsightCard({ title, text }) {
  return (
    <article className="insight-card">
      <h5>{title}</h5>
      <p>{text}</p>
    </article>
  )
}

function JobCard({ job, setActiveScreen }) {
  return (
    <article className="job-card">
      <div className="job-main">
        <div className="job-code">{job.code}</div>
        <h4>{job.title}</h4>
        <p>{job.entity}</p>
        <p className="muted">{job.city}</p>

        <div className="tag-row">
          {job.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="job-side">
        <strong>{job.salary}</strong>
        <span>{job.vacancies} vacantes</span>
        <small>{job.deadline}</small>
        <button type="button" className="primary-button" onClick={() => setActiveScreen('detalle')}>
          Ver convocatoria
        </button>
      </div>
    </article>
  )
}

function InfoBlock({ title, children }) {
  return (
    <article className="info-block">
      <h4>{title}</h4>
      {children}
    </article>
  )
}

export default App