import { useMemo, useState } from 'react'
import './App.css'

const menuGroups = [
  {
    title: 'Módulo público',
    items: [
      { id: 'inicio', label: 'Inicio' },
      { id: 'convocatorias', label: 'Convocatorias' },
      { id: 'detalle-convocatoria', label: 'Detalle de convocatoria' },
      { id: 'entidades', label: 'Entidades' },
      { id: 'detalle-entidad', label: 'Detalle de entidad' },
    ],
  },
  {
    title: 'Mi cuenta',
    items: [
      { id: 'perfil', label: 'Mi perfil' },
      { id: 'datos-personales', label: 'Datos personales' },
      { id: 'experiencia', label: 'Experiencia' },
      { id: 'estudios', label: 'Estudios' },
    ],
  },
  {
    title: 'Inscripción',
    items: [
      { id: 'inscripcion-datos', label: 'Paso 1: información' },
      { id: 'inscripcion-documentos', label: 'Paso 3: documentos' },
      { id: 'revision-envio', label: 'Paso 4: revisión' },
      { id: 'confirmacion', label: 'Confirmación' },
    ],
  },
  {
    title: 'Estados críticos',
    items: [
      { id: 'detalle-postulacion', label: 'Detalle de postulación' },
      { id: 'documentos', label: 'Documentos' },
      { id: 'error-validacion', label: 'Error / validación' },
    ],
  },
]

const allMenuItems = menuGroups.flatMap((group) => group.items)

const screenTitles = {
  login: { label: 'Iniciar sesión' },
  registro: { label: 'Registro de usuario' },
}

const jobs = [
  {
    code: 'OPEC 182654',
    title: 'Analista III',
    contest: 'Nación 6',
    entity: 'DIAN',
    level: 'Profesional',
    formationLevel: 'Profesional universitario',
    city: 'Bogotá D.C.',
    vacancies: 5,
    salary: '$4.870.000',
    status: 'Abierta',
    statusTone: 'success',
  },
  {
    code: 'OPEC 194728',
    title: 'Profesional universitario',
    contest: 'Territorial Valle',
    entity: 'Alcaldía de Cali',
    level: 'Profesional',
    formationLevel: 'Profesional universitario',
    city: 'Cali',
    vacancies: 3,
    salary: '$4.250.000',
    status: 'Abierta',
    statusTone: 'success',
  },
  {
    code: 'OPEC 201245',
    title: 'Técnico administrativo',
    contest: 'Territorial 11',
    entity: 'Gobernación del Valle',
    level: 'Técnico',
    formationLevel: 'Técnico laboral',
    city: 'Palmira',
    vacancies: 8,
    salary: '$2.950.000',
    status: 'Próxima a cerrar',
    statusTone: 'warning',
  },
  {
    code: 'OPEC 217680',
    title: 'Auxiliar de archivo',
    contest: 'Municipios priorizados',
    entity: 'Secretaría de Educación',
    level: 'Asistencial',
    formationLevel: 'Bachiller',
    city: 'Tuluá',
    vacancies: 12,
    salary: '$1.980.000',
    status: 'Abierta',
    statusTone: 'success',
  },
  {
    code: 'OPEC 167390',
    title: 'Profesional especializado',
    contest: 'Nación 4',
    entity: 'Ministerio de Educación',
    level: 'Profesional',
    formationLevel: 'Especialización',
    city: 'Bogotá D.C.',
    vacancies: 2,
    salary: '$6.120.000',
    status: 'Finalizada',
    statusTone: 'muted',
  },
]

const entities = [
  {
    name: 'Dirección de Impuestos y Aduanas Nacionales',
    short: 'DIAN',
    matchKey: 'DIAN',
    type: 'Entidad nacional',
    city: 'Bogotá D.C.',
    jobs: 42,
    status: 'Convocatoria activa',
    description:
      'Entidad encargada de administrar obligaciones tributarias, aduaneras y cambiarias en Colombia.',
    address: 'Cra. 8 # 6C - 38, Bogotá D.C.',
  },
  {
    name: 'Alcaldía de Santiago de Cali',
    short: 'CALI',
    matchKey: 'Alcaldía de Cali',
    type: 'Entidad territorial',
    city: 'Cali',
    jobs: 18,
    status: 'Inscripciones abiertas',
    description:
      'Entidad territorial responsable de la gestión administrativa, social y urbana del municipio de Santiago de Cali.',
    address: 'Centro Administrativo Municipal, Cali',
  },
  {
    name: 'Gobernación del Valle del Cauca',
    short: 'VALLE',
    matchKey: 'Gobernación del Valle',
    type: 'Entidad departamental',
    city: 'Valle del Cauca',
    jobs: 24,
    status: 'En publicación',
    description:
      'Entidad departamental encargada de coordinar políticas públicas y servicios administrativos en el Valle del Cauca.',
    address: 'Palacio de San Francisco, Cali',
  },
]

const experienceRows = [
  {
    company: 'Registraduría Nacional del Estado Civil',
    role: 'Apoyo administrativo y validación de información',
    city: 'Tuluá',
    period: '2024 - 2025',
    status: 'Validada',
    tone: 'success',
  },
  {
    company: 'Proyecto académico AnimeDev',
    role: 'Desarrollador Android / Backend',
    city: 'Cali',
    period: '2025 - 2026',
    status: 'En revisión',
    tone: 'warning',
  },
  {
    company: 'Prácticas de QA funcional',
    role: 'Validación SQL y reporte de incidencias',
    city: 'Remoto',
    period: '2023 - 2024',
    status: 'Validada',
    tone: 'success',
  },
]

const studiesRows = [
  {
    program: 'Ingeniería de Sistemas',
    institution: 'Universidad del Valle',
    level: 'Profesional',
    year: '2026',
    status: 'En curso',
    tone: 'info',
  },
  {
    program: 'Técnico en Desarrollo de Software',
    institution: 'SENA',
    level: 'Técnico',
    year: '2024',
    status: 'Validado',
    tone: 'success',
  },
  {
    program: 'Curso de pruebas funcionales',
    institution: 'Formación complementaria',
    level: 'Curso',
    year: '2023',
    status: 'Validado',
    tone: 'success',
  },
]

const documentRows = [
  {
    name: 'Cédula de ciudadanía',
    type: 'Identificación',
    date: '10/05/2026',
    status: 'Vigente',
    tone: 'success',
  },
  {
    name: 'Diploma técnico',
    type: 'Formación académica',
    date: '12/05/2026',
    status: 'En revisión',
    tone: 'warning',
  },
  {
    name: 'Certificado laboral',
    type: 'Experiencia',
    date: '16/05/2026',
    status: 'Vigente',
    tone: 'success',
  },
  {
    name: 'Tarjeta profesional',
    type: 'Documento opcional',
    date: 'Pendiente',
    status: 'Por cargar',
    tone: 'danger',
  },
  {
    name: 'Otros documentos',
    type: 'Soporte adicional',
    date: 'Pendiente',
    status: 'Por cargar',
    tone: 'danger',
  },
]

const postulationSteps = [
  { label: 'Inscripción recibida', status: 'Completado', tone: 'success' },
  { label: 'Verificación de requisitos', status: 'En curso', tone: 'warning' },
  { label: 'Evaluación documental', status: 'Pendiente', tone: 'muted' },
  { label: 'Publicación de resultados', status: 'Pendiente', tone: 'muted' },
]

function App() {
  const [activeScreen, setActiveScreen] = useState('inicio')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState(entities[0])

  const visibleMenuGroups = useMemo(() => {
    if (isLoggedIn) return menuGroups
    return menuGroups.filter((group) => group.title === 'Módulo público')
  }, [isLoggedIn])

  const currentItem = useMemo(
    () =>
      screenTitles[activeScreen] ??
      allMenuItems.find((item) => item.id === activeScreen) ?? { label: 'Inicio' },
    [activeScreen],
  )

  return (
    <div className="simo-app">
      <Sidebar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        menuGroups={visibleMenuGroups}
      />

      <main className="workspace">
        <Topbar
          title={currentItem.label}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setActiveScreen={setActiveScreen}
        />

        <div className="workspace-grid">
          <section className="screen-card">
            <ScreenRenderer
              activeScreen={activeScreen}
              setActiveScreen={setActiveScreen}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              selectedEntity={selectedEntity}
              setSelectedEntity={setSelectedEntity}
            />
          </section>

          <AssistPanel
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </main>
    </div>
  )
}

function Sidebar({ activeScreen, setActiveScreen, menuGroups }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">S</div>
        <div>
          <strong>SIMO</strong>
          <span>Sistema de Mérito y Oportunidad</span>
        </div>
      </div>

      <nav className="side-nav" aria-label="Navegación del prototipo">
        {menuGroups.map((group) => (
          <div className="nav-group" key={group.title}>
            <p>{group.title}</p>
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={activeScreen === item.id ? 'active' : ''}
                onClick={() => setActiveScreen(item.id)}
              >
                <span className="nav-dot" />
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="need-help">
        <div className="help-icon">?</div>
        <strong>¿Necesita ayuda?</strong>
        <span>Consulte las guías rápidas del proceso.</span>
      </div>
    </aside>
  )
}

function Topbar({ title, isLoggedIn, setIsLoggedIn, setActiveScreen }) {
  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveScreen('inicio')
  }

  return (
    <header className="topbar">
      <div>
        <p>Inicio / Rediseño SIMO</p>
        <h1>{title}</h1>
      </div>

      <div className="top-actions">
        {isLoggedIn ? (
          <>
            <button type="button" className="ghost-button" onClick={() => setActiveScreen('perfil')}>
              Mi cuenta
            </button>
            <button type="button" className="secondary-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <button type="button" className="ghost-button" onClick={() => setActiveScreen('registro')}>
              Registrarse
            </button>
            <button type="button" className="primary-button" onClick={() => setActiveScreen('login')}>
              Iniciar sesión
            </button>
          </>
        )}
      </div>
    </header>
  )
}

function ScreenRenderer({
  activeScreen,
  setActiveScreen,
  isLoggedIn,
  setIsLoggedIn,
  selectedEntity,
  setSelectedEntity,
}) {
  const privateProps = { isLoggedIn, setActiveScreen }

  const screens = {
    inicio: <HomeScreen setActiveScreen={setActiveScreen} />,
    convocatorias: <JobsScreen setActiveScreen={setActiveScreen} />,
    'detalle-convocatoria': (
      <JobDetailScreen
        setActiveScreen={setActiveScreen}
        isLoggedIn={isLoggedIn}
      />
    ),
    entidades: (
      <EntitiesScreen
        setActiveScreen={setActiveScreen}
        setSelectedEntity={setSelectedEntity}
      />
    ),
    'detalle-entidad': (
      <EntityDetailScreen
        selectedEntity={selectedEntity}
        setActiveScreen={setActiveScreen}
      />
    ),
    login: (
      <LoginScreen
        setIsLoggedIn={setIsLoggedIn}
        setActiveScreen={setActiveScreen}
      />
    ),
    registro: (
      <RegisterScreen
        setIsLoggedIn={setIsLoggedIn}
        setActiveScreen={setActiveScreen}
      />
    ),
    perfil: (
      <PrivateGuard {...privateProps}>
        <ProfileScreen setActiveScreen={setActiveScreen} />
      </PrivateGuard>
    ),
    'datos-personales': (
      <PrivateGuard {...privateProps}>
        <PersonalDataScreen />
      </PrivateGuard>
    ),
    experiencia: (
      <PrivateGuard {...privateProps}>
        <ExperienceScreen />
      </PrivateGuard>
    ),
    estudios: (
      <PrivateGuard {...privateProps}>
        <StudiesScreen />
      </PrivateGuard>
    ),
    'inscripcion-datos': (
      <PrivateGuard {...privateProps}>
        <InscriptionDataScreen setActiveScreen={setActiveScreen} />
      </PrivateGuard>
    ),
    'inscripcion-documentos': (
      <PrivateGuard {...privateProps}>
        <InscriptionDocumentsScreen setActiveScreen={setActiveScreen} />
      </PrivateGuard>
    ),
    'revision-envio': (
      <PrivateGuard {...privateProps}>
        <ReviewScreen setActiveScreen={setActiveScreen} />
      </PrivateGuard>
    ),
    confirmacion: (
      <PrivateGuard {...privateProps}>
        <ConfirmationScreen setActiveScreen={setActiveScreen} />
      </PrivateGuard>
    ),
    'detalle-postulacion': (
      <PrivateGuard {...privateProps}>
        <PostulationDetailScreen />
      </PrivateGuard>
    ),
    documentos: (
      <PrivateGuard {...privateProps}>
        <DocumentsScreen />
      </PrivateGuard>
    ),
    'error-validacion': (
      <PrivateGuard {...privateProps}>
        <ErrorValidationScreen setActiveScreen={setActiveScreen} />
      </PrivateGuard>
    ),
  }

  return screens[activeScreen] ?? screens.inicio
}

function PrivateGuard({ isLoggedIn, setActiveScreen, children }) {
  if (isLoggedIn) return children

  return (
    <LoginRequiredScreen setActiveScreen={setActiveScreen} />
  )
}

function LoginRequiredScreen({ setActiveScreen }) {
  return (
    <div className="module private-message">
      <Status text="Acceso requerido" tone="warning" />
      <h2>Debe iniciar sesión para continuar</h2>
      <p>
        Esta sección contiene información privada de la cuenta, inscripciones, documentos y estados
        de postulación. Inicie sesión o cree una cuenta para ver estos datos.
      </p>

      <div className="hero-actions">
        <button type="button" className="primary-button" onClick={() => setActiveScreen('login')}>
          Iniciar sesión
        </button>
        <button type="button" className="secondary-button" onClick={() => setActiveScreen('registro')}>
          Registrarse
        </button>
      </div>
    </div>
  )
}

function LoginScreen({ setIsLoggedIn, setActiveScreen }) {
  const handleLogin = () => {
    setIsLoggedIn(true)
    setActiveScreen('perfil')
  }

  return (
    <div className="module">
      <section className="auth-layout">
        <div className="auth-card">
          <Status text="Acceso seguro" tone="info" />
          <h2>Iniciar sesión</h2>
          <p>
            Ingrese con su correo y contraseña para consultar su perfil, documentos,
            inscripciones y estados de postulación.
          </p>

          <div className="auth-form">
            <Field label="Correo electrónico" value="daniel.cuestas@correounivalle.edu.co" />
            <label className="field">
              <span>Contraseña</span>
              <input type="password" defaultValue="12345678" />
            </label>

            <button type="button" className="primary-button full" onClick={handleLogin}>
              Entrar a mi cuenta
            </button>

            <button type="button" className="inline-link" onClick={() => setActiveScreen('registro')}>
              No tengo cuenta, registrarme
            </button>
          </div>
        </div>

        <div className="auth-side">
          <h3>Al iniciar sesión podrá:</h3>
          <ul>
            <li>Consultar su hoja de vida.</li>
            <li>Guardar convocatorias de interés.</li>
            <li>Iniciar una inscripción.</li>
            <li>Revisar documentos y estados críticos.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

function RegisterScreen({ setIsLoggedIn, setActiveScreen }) {
  const handleRegister = () => {
    setIsLoggedIn(true)
    setActiveScreen('perfil')
  }

  return (
    <div className="module">
      <section className="auth-layout">
        <div className="auth-card">
          <Status text="Nuevo usuario" tone="success" />
          <h2>Crear cuenta</h2>
          <p>
            Complete los datos básicos para habilitar su perfil y comenzar a gestionar
            convocatorias e inscripciones.
          </p>

          <div className="auth-form">
            <div className="form-grid two">
              <Field label="Nombres" value="Daniel José" />
              <Field label="Apellidos" value="Cuestas Parada" />
              <Field label="Correo electrónico" value="daniel.cuestas@correounivalle.edu.co" />
              <Field label="Documento" value="1.234.567.890" />
            </div>

            <button type="button" className="primary-button full" onClick={handleRegister}>
              Crear cuenta y continuar
            </button>

            <button type="button" className="inline-link" onClick={() => setActiveScreen('login')}>
              Ya tengo cuenta, iniciar sesión
            </button>
          </div>
        </div>

        <div className="auth-side">
          <h3>Registro guiado</h3>
          <p>
            La propuesta evita pedir toda la hoja de vida al inicio. Primero se crea la cuenta y
            luego se completa el perfil por secciones.
          </p>
        </div>
      </section>
    </div>
  )
}

function HomeScreen({ setActiveScreen }) {
  return (
    <div className="module">
      <section className="public-hero">
        <div className="hero-content">
          <span className="success-label">Convocatorias públicas abiertas</span>
          <h2>
            Encuentre su próxima oportunidad en el <strong>empleo público</strong>
          </h2>
          <p>
            Busque por cargo, entidad, ciudad, código OPEC, concurso o nivel de formación. La
            experiencia está organizada para que comprenda requisitos, fechas y próximos pasos sin
            perder el contexto.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => setActiveScreen('convocatorias')}
            >
              Explorar convocatorias
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setActiveScreen('entidades')}
            >
              Ver entidades participantes
            </button>
          </div>
        </div>

        <div className="hero-illustration" aria-hidden="true">
          <div className="person one" />
          <div className="person two" />
          <div className="building-icon">🏛</div>
        </div>
      </section>

      <FilterStrip extended />

      <section className="section-block">
        <SectionHeader
          kicker="Resultados destacados"
          title="Convocatorias disponibles"
          action="Ver todas"
          onAction={() => setActiveScreen('convocatorias')}
        />

        <div className="compact-cards">
          {jobs.slice(0, 3).map((job) => (
            <JobMiniCard
              key={job.code}
              job={job}
              onClick={() => setActiveScreen('detalle-convocatoria')}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function JobsScreen({ setActiveScreen }) {
  return (
    <div className="module">
      <SectionHeader
        kicker="Búsqueda de oportunidades"
        title="Convocatorias disponibles"
        description="Filtre los resultados por ubicación, nivel, entidad, estado, concurso o código OPEC."
      />

      <FilterStrip />

      <div className="data-layout">
        <aside className="filter-panel">
          <h3>Filtrar resultados</h3>

          <FilterGroup title="Nivel jerárquico" values={['Profesional', 'Técnico', 'Asistencial']} />
          <FilterGroup title="Ciudad" values={['Bogotá D.C.', 'Cali', 'Palmira', 'Tuluá']} />
          <FilterGroup title="Estado" values={['Abierta', 'Próxima a cerrar', 'Finalizada']} />
          <FilterGroup title="Entidad" values={['DIAN', 'Alcaldía de Cali', 'Gobernación del Valle']} />
        </aside>

        <div className="table-card">
          <TableHeader title="Resultados encontrados" count={`${jobs.length} convocatorias`} />

          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Empleo</th>
                <th>Concurso</th>
                <th>Entidad</th>
                <th>Nivel</th>
                <th>Vacantes</th>
                <th>Estado</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job.code}>
                  <td>{job.code}</td>
                  <td>
                    <strong>{job.title}</strong>
                    <small>{job.city}</small>
                  </td>
                  <td>{job.contest}</td>
                  <td>{job.entity}</td>
                  <td>{job.level}</td>
                  <td>{job.vacancies}</td>
                  <td>
                    <Status text={job.status} tone={job.statusTone} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="table-action"
                      onClick={() => setActiveScreen('detalle-convocatoria')}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function JobDetailScreen({ setActiveScreen, isLoggedIn }) {
  const handleStartInscription = () => {
    setActiveScreen(isLoggedIn ? 'inscripcion-datos' : 'login')
  }

  return (
    <div className="module">
      <section className="detail-hero">
        <div>
          <Status text="Convocatoria abierta" tone="success" />
          <h2>Analista III</h2>
          <p>DIAN · OPEC 182654 · Bogotá D.C.</p>
        </div>

        <div className="detail-actions">
          <button
            type="button"
            className="primary-button"
            onClick={handleStartInscription}
          >
            Iniciar inscripción
          </button>
          <button type="button" className="secondary-button">
            Guardar convocatoria
          </button>
        </div>
      </section>

      <div className="detail-stats">
        <StatCard label="Vacantes" value="5" />
        <StatCard label="Salario" value="$4.870.000" />
        <StatCard label="Nivel" value="Profesional" />
        <StatCard label="Cierre" value="6 días" />
      </div>

      <div className="tab-strip">
        <button type="button" className="selected">Resumen</button>
        <button type="button">Requisitos</button>
        <button type="button">Funciones</button>
        <button type="button">Documentos solicitados</button>
        <button type="button">Cronograma</button>
      </div>

      <div className="detail-grid">
        <InfoCard
          title="Objetivo del empleo"
          text="Gestionar, analizar y documentar información asociada a procesos internos de la entidad."
        />
        <InfoCard
          title="Requisitos mínimos"
          text="Título profesional en Ingeniería de Sistemas, Administración o áreas afines, más experiencia relacionada."
        />
        <InfoCard
          title="Próximo paso"
          text="Revise que sus documentos estén actualizados antes de iniciar la inscripción."
        />
      </div>
    </div>
  )
}

function EntitiesScreen({ setActiveScreen, setSelectedEntity }) {
  const handleEntityClick = (entity) => {
    setSelectedEntity(entity)
    setActiveScreen('detalle-entidad')
  }

  return (
    <div className="module">
      <SectionHeader
        kicker="Instituciones participantes"
        title="Entidades participantes"
        description="Consulte las entidades con convocatorias activas y revise sus oportunidades publicadas."
      />

      <FilterStrip />

      <div className="table-card">
        <TableHeader title="Entidades registradas" count={`${entities.length} entidades`} />

        <table>
          <thead>
            <tr>
              <th>Entidad</th>
              <th>Tipo</th>
              <th>Ubicación</th>
              <th>Convocatorias</th>
              <th>Estado</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {entities.map((entity) => (
              <tr key={entity.short}>
                <td>
                  <div className="entity-cell">
                    <span>{entity.short}</span>
                    <div>
                      <strong>{entity.name}</strong>
                      <small>{entity.short}</small>
                    </div>
                  </div>
                </td>
                <td>{entity.type}</td>
                <td>{entity.city}</td>
                <td>{entity.jobs}</td>
                <td>
                  <Status text={entity.status} tone="success" />
                </td>
                <td>
                  <button
                    type="button"
                    className="table-action"
                    onClick={() => handleEntityClick(entity)}
                  >
                    Ver entidad
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function EntityDetailScreen({ selectedEntity, setActiveScreen }) {
  const entityJobs = jobs.filter((job) => job.entity === selectedEntity.matchKey)
  const visibleJobs = entityJobs.length > 0 ? entityJobs : jobs.slice(0, 2)

  return (
    <div className="module">
      <section className="entity-detail-hero">
        <div className="entity-logo">{selectedEntity.short}</div>

        <div>
          <Status text={selectedEntity.status} tone="success" />
          <h2>{selectedEntity.name}</h2>
          <p>{selectedEntity.description}</p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => setActiveScreen('entidades')}
        >
          Volver a entidades
        </button>
      </section>

      <div className="detail-stats">
        <StatCard label="Tipo" value={selectedEntity.type} />
        <StatCard label="Ubicación" value={selectedEntity.city} />
        <StatCard label="Convocatorias" value={selectedEntity.jobs} />
        <StatCard label="Dirección" value="Disponible" />
      </div>

      <div className="entity-summary-grid">
        <InfoCard
          title="Información institucional"
          text={`Dirección principal: ${selectedEntity.address}. Esta vista permite consultar la entidad antes de revisar o iniciar una inscripción.`}
        />
        <InfoCard
          title="Transparencia del proceso"
          text="Se muestran oportunidades asociadas, estado de convocatoria y datos básicos para que el usuario entienda el contexto institucional."
        />
      </div>

      <section className="section-block">
        <SectionHeader
          kicker="Oportunidades asociadas"
          title="Convocatorias de la entidad"
          action="Ver convocatorias"
          onAction={() => setActiveScreen('convocatorias')}
        />

        <div className="compact-cards">
          {visibleJobs.map((job) => (
            <JobMiniCard
              key={job.code}
              job={job}
              onClick={() => setActiveScreen('detalle-convocatoria')}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function ProfileScreen({ setActiveScreen }) {
  return (
    <div className="module">
      <section className="profile-hero">
        <div className="avatar">DC</div>

        <div className="profile-main">
          <Status text="Perfil actualizado" tone="success" />
          <h2>Daniel José Cuestas</h2>
          <p>Ingeniería de Sistemas · Cali, Valle del Cauca</p>

          <div className="profile-meta">
            <span>daniel.cuestas@correounivalle.edu.co</span>
            <span>Documento verificado</span>
          </div>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => setActiveScreen('datos-personales')}
        >
          Editar información
        </button>
      </section>

      <div className="detail-stats">
        <StatCard label="Completitud" value="68%" />
        <StatCard label="Experiencias" value="3" />
        <StatCard label="Estudios" value="3" />
        <StatCard label="Documentos" value="5" />
      </div>

      <section className="section-block">
        <SectionHeader kicker="Accesos rápidos" title="Gestione su cuenta" />

        <div className="quick-grid">
          <QuickCard
            title="Datos personales"
            text="Actualice contacto, ubicación y documento."
            onClick={() => setActiveScreen('datos-personales')}
          />
          <QuickCard
            title="Experiencia"
            text="Consulte experiencia laboral cargada."
            onClick={() => setActiveScreen('experiencia')}
          />
          <QuickCard
            title="Estudios"
            text="Revise formación académica y soportes."
            onClick={() => setActiveScreen('estudios')}
          />
          <QuickCard
            title="Otros documentos"
            text="Cargue soportes adicionales, tarjetas, certificaciones o anexos."
            onClick={() => setActiveScreen('documentos')}
          />
        </div>
      </section>
    </div>
  )
}

function PersonalDataScreen() {
  return (
    <div className="module">
      <SectionHeader
        kicker="Mi cuenta"
        title="Datos personales"
        description="Actualice únicamente la información que requiere corrección."
      />

      <div className="form-layout">
        <div className="form-card">
          <h3>Información básica</h3>

          <div className="form-grid">
            <Field label="Tipo de documento" value="Cédula de ciudadanía" />
            <Field label="Número de documento" value="1.234.567.890" />
            <Field label="Nombres" value="Daniel José" />
            <Field label="Apellidos" value="Cuestas Parada" />
            <Field label="Fecha de nacimiento" value="15/06/2001" />
            <Field label="Género" value="Masculino" />
          </div>
        </div>

        <div className="form-card">
          <h3>Información de contacto</h3>

          <div className="form-grid">
            <Field label="Correo electrónico" value="daniel.cuestas@correounivalle.edu.co" />
            <Field label="Celular" value="300 000 0000" />
            <Field label="Departamento" value="Valle del Cauca" />
            <Field label="Municipio" value="Cali" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ExperienceScreen() {
  return (
    <div className="module">
      <SectionHeader
        kicker="Hoja de vida"
        title="Experiencia laboral"
        description="Registre experiencia relacionada con las convocatorias a las que desea postularse."
        action="+ Agregar experiencia"
      />

      <div className="table-card">
        <TableHeader title="Experiencia registrada" count="3 registros" />

        <table>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Cargo / funciones</th>
              <th>Ciudad</th>
              <th>Periodo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {experienceRows.map((row) => (
              <tr key={row.company}>
                <td>{row.company}</td>
                <td>
                  <strong>{row.role}</strong>
                </td>
                <td>{row.city}</td>
                <td>{row.period}</td>
                <td>
                  <Status text={row.status} tone={row.tone} />
                </td>
                <td>
                  <button type="button" className="table-action">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StudiesScreen() {
  return (
    <div className="module">
      <SectionHeader
        kicker="Hoja de vida"
        title="Formación académica"
        description="Mantenga actualizados sus estudios y soportes académicos."
        action="+ Agregar estudio"
      />

      <div className="table-card">
        <TableHeader title="Estudios registrados" count="3 registros" />

        <table>
          <thead>
            <tr>
              <th>Programa</th>
              <th>Institución</th>
              <th>Nivel</th>
              <th>Año</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {studiesRows.map((row) => (
              <tr key={row.program}>
                <td>
                  <strong>{row.program}</strong>
                </td>
                <td>{row.institution}</td>
                <td>{row.level}</td>
                <td>{row.year}</td>
                <td>
                  <Status text={row.status} tone={row.tone} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function InscriptionDataScreen({ setActiveScreen }) {
  return (
    <div className="module">
      <Stepper active={1} />

      <SectionHeader
        kicker="Inscripción a convocatoria"
        title="Paso 1: información personal"
        description="Complete la información solicitada. Los campos obligatorios aparecen marcados para evitar errores al enviar."
      />

      <div className="form-layout">
        <div className="form-card">
          <h3>Datos básicos</h3>

          <div className="form-grid">
            <Field label="Tipo de documento" value="Cédula de ciudadanía" />
            <Field label="Número de documento" value="1.234.567.890" />
            <Field label="Fecha de expedición" value="12/05/2019" />
            <Field label="País" value="Colombia" />
            <Field label="Departamento" value="Valle del Cauca" />
            <Field label="Municipio" value="Cali" />
          </div>
        </div>

        <div className="form-card">
          <h3>Información de contacto</h3>

          <div className="form-grid">
            <Field label="Correo electrónico" value="daniel.cuestas@correounivalle.edu.co" />
            <Field label="Confirmar correo" value="daniel.cuestas@correounivalle.edu.co" />
            <Field label="Teléfono celular" value="300 000 0000" />
            <Field label="Dirección" value="Cali, Valle del Cauca" />
          </div>
        </div>
      </div>

      <footer className="screen-footer">
        <button type="button" className="secondary-button">
          Guardar borrador
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={() => setActiveScreen('inscripcion-documentos')}
        >
          Guardar y continuar
        </button>
      </footer>
    </div>
  )
}

function InscriptionDocumentsScreen({ setActiveScreen }) {
  return (
    <div className="module">
      <Stepper active={3} />

      <SectionHeader
        kicker="Inscripción a convocatoria"
        title="Paso 3: documentos"
        description="Adjunte los documentos requeridos en formato PDF. El sistema indicará qué falta antes de continuar."
      />

      <div className="table-card">
        <TableHeader title="Documentos solicitados" count={`${documentRows.length} requeridos`} />

        <table>
          <thead>
            <tr>
              <th>Documento</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Archivo cargado</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {documentRows.map((doc) => (
              <tr key={doc.name}>
                <td>
                  <strong>{doc.name}</strong>
                </td>
                <td>{doc.type}</td>
                <td>
                  <Status text={doc.status} tone={doc.tone} />
                </td>
                <td>{doc.date}</td>
                <td>
                  <button type="button" className="table-action">
                    Adjuntar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="screen-footer">
        <button type="button" className="secondary-button">
          Volver
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={() => setActiveScreen('revision-envio')}
        >
          Continuar revisión
        </button>
      </footer>
    </div>
  )
}

function ReviewScreen({ setActiveScreen }) {
  return (
    <div className="module">
      <Stepper active={4} />

      <SectionHeader
        kicker="Inscripción a convocatoria"
        title="Paso 4: revisión y envío"
        description="Revise el resumen de su postulación antes de enviarla."
      />

      <div className="review-layout">
        <section className="review-list">
          <ReviewItem title="Información personal" status="Completa" tone="success" />
          <ReviewItem title="Experiencia laboral" status="Completa" tone="success" />
          <ReviewItem title="Formación académica" status="Completa" tone="success" />
          <ReviewItem title="Documentos" status="1 pendiente" tone="warning" />
        </section>

        <section className="summary-box">
          <h3>Resumen de postulación</h3>
          <p>Convocatoria seleccionada</p>
          <strong>Analista III · OPEC 182654</strong>

          <div className="summary-line">
            <span>Progreso</span>
            <strong>75%</strong>
          </div>

          <div className="progress-line">
            <span style={{ width: '75%' }} />
          </div>

          <button
            type="button"
            className="primary-button full"
            onClick={() => setActiveScreen('confirmacion')}
          >
            Enviar postulación
          </button>
        </section>
      </div>
    </div>
  )
}

function ConfirmationScreen({ setActiveScreen }) {
  return (
    <div className="module centered-state">
      <div className="success-icon">✓</div>
      <Status text="Acción completada" tone="success" />
      <h2>¡Postulación enviada con éxito!</h2>
      <p>
        Su inscripción fue recibida correctamente. Puede descargar el comprobante o revisar el
        estado de su postulación.
      </p>

      <div className="confirmation-grid">
        <InfoCard title="Convocatoria" text="Analista III · DIAN" />
        <InfoCard title="Código OPEC" text="182654" />
        <InfoCard title="Estado inicial" text="Inscripción recibida" />
      </div>

      <div className="hero-actions">
        <button type="button" className="secondary-button">
          Descargar comprobante
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={() => setActiveScreen('detalle-postulacion')}
        >
          Ver detalle de postulación
        </button>
      </div>
    </div>
  )
}

function PostulationDetailScreen() {
  return (
    <div className="module">
      <section className="detail-hero">
        <div>
          <Status text="Postulación en revisión" tone="warning" />
          <h2>Detalle de postulación</h2>
          <p>Analista III · DIAN · OPEC 182654</p>
        </div>

        <button type="button" className="primary-button">
          Descargar comprobante
        </button>
      </section>

      <div className="postulation-grid">
        <section className="timeline-card">
          <h3>Estado actual del proceso</h3>

          <div className="timeline">
            {postulationSteps.map((step) => (
              <div className="timeline-item" key={step.label}>
                <span className={`timeline-dot ${step.tone}`} />
                <div>
                  <strong>{step.label}</strong>
                  <Status text={step.status} tone={step.tone} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="summary-box">
          <h3>Documentos enviados</h3>
          {documentRows.slice(0, 3).map((doc) => (
            <div className="document-summary" key={doc.name}>
              <span>{doc.name}</span>
              <Status text={doc.status} tone={doc.tone} />
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

function DocumentsScreen() {
  return (
    <div className="module">
      <SectionHeader
        kicker="Hoja de vida"
        title="Documentos"
        description="Consulte el estado de los documentos cargados y corrija los que requieran validación."
      />

      <div className="table-card">
        <TableHeader title="Documentos del aspirante" count={`${documentRows.length} documentos`} />

        <table>
          <thead>
            <tr>
              <th>Documento</th>
              <th>Categoría</th>
              <th>Fecha de carga</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {documentRows.map((doc) => (
              <tr key={doc.name}>
                <td>
                  <strong>{doc.name}</strong>
                </td>
                <td>{doc.type}</td>
                <td>{doc.date}</td>
                <td>
                  <Status text={doc.status} tone={doc.tone} />
                </td>
                <td>
                  <button type="button" className="table-action">
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ErrorValidationScreen({ setActiveScreen }) {
  return (
    <div className="module">
      <Stepper active={3} error />

      <section className="error-banner">
        <div className="error-icon">!</div>
        <div>
          <h2>No pudimos completar esta acción</h2>
          <p>
            Hay documentos requeridos sin cargar o con información pendiente. Revise los elementos
            marcados antes de continuar.
          </p>
        </div>
      </section>

      <div className="review-layout">
        <section className="review-list">
          <ReviewItem title="Documento de identidad" status="Validado" tone="success" />
          <ReviewItem title="Diploma académico" status="Requiere revisión" tone="danger" />
          <ReviewItem title="Certificado laboral" status="Validado" tone="success" />
          <ReviewItem title="Tarjeta profesional" status="Pendiente" tone="danger" />
        </section>

        <section className="summary-box danger-box">
          <h3>Resumen de validación</h3>

          <div className="summary-line">
            <span>Progreso</span>
            <strong>50%</strong>
          </div>

          <div className="progress-line danger">
            <span style={{ width: '50%' }} />
          </div>

          <p>
            Corrija los documentos pendientes para habilitar el envío final de la postulación.
          </p>

          <button
            type="button"
            className="primary-button full"
            onClick={() => setActiveScreen('inscripcion-documentos')}
          >
            Corregir documentos
          </button>
        </section>
      </div>
    </div>
  )
}

function AssistPanel({ activeScreen, setActiveScreen, isLoggedIn }) {
  const isInscription = activeScreen.includes('inscripcion') || activeScreen === 'revision-envio'
  const progress = isInscription ? '75%' : '68%'

  return (
    <aside className="assist-panel">
      {isLoggedIn && (
        <section className="mini-account">
          <p>Mi cuenta</p>
          <strong>Daniel Cuestas</strong>
          <span>Perfil actualizado parcialmente</span>

          <div className="progress-line">
            <span style={{ width: progress }} />
          </div>

          <small>{progress} completado</small>
        </section>
      )}

      {!isLoggedIn && (
        <section className="assist-card">
          <h3>Acceso ciudadano</h3>
          <p>
            Puede explorar convocatorias y entidades sin iniciar sesión. Para inscribirse o ver su
            información personal, debe acceder a su cuenta.
          </p>
          <button type="button" className="primary-button full" onClick={() => setActiveScreen('login')}>
            Iniciar sesión
          </button>
        </section>
      )}

      <section className="assist-card">
        <h3>¿Necesita ayuda?</h3>
        <p>Consulte una guía rápida sobre esta pantalla o revise los requisitos del proceso.</p>
        <button type="button" className="secondary-button full">
          Abrir ayuda
        </button>
      </section>

      <section className="assist-card">
        <h3>Consejos para este paso</h3>
        <ul>
          <li>Revise fechas y requisitos antes de enviar.</li>
          <li>Use documentos legibles en formato PDF.</li>
          <li>Guarde avances si necesita continuar después.</li>
        </ul>
      </section>

      <section className="assist-card subtle">
        <h3>Accesibilidad</h3>
        <p>Textos claros, botones descriptivos y estados visibles para reducir incertidumbre.</p>
        <button type="button" className="ghost-button full" onClick={() => setActiveScreen('inicio')}>
          Volver al inicio
        </button>
      </section>
    </aside>
  )
}

function SectionHeader({ kicker, title, description, action, onAction }) {
  return (
    <header className="section-header">
      <div>
        <p>{kicker}</p>
        <h2>{title}</h2>
        {description && <span>{description}</span>}
      </div>

      {action && (
        <button type="button" className="primary-button small" onClick={onAction}>
          {action}
        </button>
      )}
    </header>
  )
}

function FilterStrip({ extended = false }) {
  return (
    <section className={`filter-strip ${extended ? 'extended' : ''}`}>
      <label>
        Palabra clave
        <input type="search" placeholder="Cargo, entidad o código OPEC" defaultValue="Analista" />
      </label>

      <label>
        Código OPEC
        <input type="search" placeholder="Ej: 182654" defaultValue="182654" />
      </label>

      <label>
        Concurso
        <select defaultValue="Nación 6">
          <option>Nación 6</option>
          <option>Territorial Valle</option>
          <option>Territorial 11</option>
          <option>Municipios priorizados</option>
        </select>
      </label>

      <label>
        Entidad
        <select defaultValue="DIAN">
          <option>DIAN</option>
          <option>Alcaldía de Cali</option>
          <option>Gobernación del Valle</option>
          <option>Secretaría de Educación</option>
        </select>
      </label>

      <label>
        Estado del concurso
        <select defaultValue="Abierta">
          <option>Abierta</option>
          <option>Próxima a cerrar</option>
          <option>Finalizada</option>
        </select>
      </label>

      <label>
        Nivel de formación
        <select defaultValue="Profesional">
          <option>Bachiller</option>
          <option>Técnico</option>
          <option>Tecnólogo</option>
          <option>Profesional</option>
          <option>Especialización</option>
        </select>
      </label>

      <label>
        Ciudad
        <select defaultValue="Cali">
          <option>Cali</option>
          <option>Bogotá D.C.</option>
          <option>Palmira</option>
          <option>Tuluá</option>
        </select>
      </label>

      <button type="button" className="primary-button">
        Buscar
      </button>
    </section>
  )
}

function FilterGroup({ title, values }) {
  return (
    <div className="filter-group">
      <strong>{title}</strong>
      {values.map((value) => (
        <label key={value}>
          <input type="checkbox" defaultChecked={value === values[0]} />
          {value}
        </label>
      ))}
    </div>
  )
}

function JobMiniCard({ job, onClick }) {
  return (
    <article className="job-mini-card">
      <div className="job-icon">{job.entity.slice(0, 2)}</div>

      <div>
        <Status text={job.status} tone={job.statusTone} />
        <h3>{job.title}</h3>
        <p>{job.entity}</p>
        <small>{job.code} · {job.city} · {job.salary}</small>
      </div>

      <button type="button" className="table-action" onClick={onClick}>
        Ver
      </button>
    </article>
  )
}

function TableHeader({ title, count }) {
  return (
    <div className="table-header">
      <div>
        <h3>{title}</h3>
        <span>{count}</span>
      </div>

      <button type="button" className="secondary-button small">
        Exportar
      </button>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function InfoCard({ title, text }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function QuickCard({ title, text, onClick }) {
  return (
    <button type="button" className="quick-card" onClick={onClick}>
      <strong>{title}</strong>
      <span>{text}</span>
    </button>
  )
}

function Field({ label, value }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input defaultValue={value} />
    </label>
  )
}

function Stepper({ active, error = false }) {
  const steps = ['Información personal', 'Experiencia y estudios', 'Documentos', 'Revisión y envío']

  return (
    <div className={`stepper ${error ? 'has-error' : ''}`}>
      {steps.map((step, index) => {
        const number = index + 1
        const isActive = number === active
        const isDone = number < active

        return (
          <div
            key={step}
            className={`step ${isActive ? 'current' : ''} ${isDone ? 'done' : ''}`}
          >
            <span>{number}</span>
            <p>{step}</p>
          </div>
        )
      })}
    </div>
  )
}

function ReviewItem({ title, status, tone }) {
  return (
    <article className="review-item">
      <div>
        <strong>{title}</strong>
        <span>Revise la información antes de continuar.</span>
      </div>

      <Status text={status} tone={tone} />
    </article>
  )
}

function Status({ text, tone = 'muted' }) {
  return <span className={`status ${tone}`}>{text}</span>
}

export default App