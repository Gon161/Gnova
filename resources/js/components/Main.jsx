export default function Main() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .gnova-root {
          --g-bg: #0b0e14;
          --g-surface: #13171f;
          --g-border: rgba(255,255,255,0.07);
          --g-accent: #c8f04a;
          --g-accent2: #4af0b8;
          --g-muted: #5a6070;
          --g-text: #e8ecf4;
          font-family: 'DM Sans', sans-serif;
          background: var(--g-bg);
          min-height: 100vh;
          color: var(--g-text);
          overflow-x: hidden;
        }

        /* Noise texture overlay */
        .gnova-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }

        /* Glow orbs */
        .gnova-glow {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .gnova-glow-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(200,240,74,0.08) 0%, transparent 70%);
          top: -200px; left: -150px;
          animation: drift1 12s ease-in-out infinite alternate;
        }
        .gnova-glow-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(74,240,184,0.07) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: drift2 15s ease-in-out infinite alternate;
        }
        @keyframes drift1 { from { transform: translate(0,0) } to { transform: translate(60px, 40px) } }
        @keyframes drift2 { from { transform: translate(0,0) } to { transform: translate(-40px, -50px) } }

        /* Layout */
        .gnova-layout {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 240px 1fr;
          grid-template-rows: 64px 1fr;
          min-height: 100vh;
        }

        /* Topbar */
        .gnova-topbar {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          border-bottom: 1px solid var(--g-border);
          backdrop-filter: blur(12px);
          background: rgba(11,14,20,0.6);
          position: sticky; top: 0; z-index: 10;
          animation: slideDown 0.5s ease;
        }
        @keyframes slideDown { from { opacity:0; transform: translateY(-10px) } to { opacity:1; transform: translateY(0) } }

        .gnova-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gnova-logo-dot {
          width: 8px; height: 8px;
          background: var(--g-accent);
          border-radius: 50%;
          box-shadow: 0 0 12px var(--g-accent);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 8px var(--g-accent); }
          50% { box-shadow: 0 0 20px var(--g-accent), 0 0 40px rgba(200,240,74,0.3); }
        }

        .gnova-topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .gnova-badge {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--g-accent);
          background: rgba(200,240,74,0.1);
          border: 1px solid rgba(200,240,74,0.25);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .gnova-avatar {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, var(--g-accent), var(--g-accent2));
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #0b0e14;
          cursor: pointer;
        }

        /* Sidebar */
        .gnova-sidebar {
          border-right: 1px solid var(--g-border);
          padding: 24px 0;
          background: rgba(19,23,31,0.5);
          animation: slideRight 0.5s ease;
        }
        @keyframes slideRight { from { opacity:0; transform: translateX(-10px) } to { opacity:1; transform: translateX(0) } }

        .gnova-nav-section {
          padding: 0 16px;
          margin-bottom: 28px;
        }
        .gnova-nav-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--g-muted);
          padding: 0 12px;
          margin-bottom: 8px;
        }
        .gnova-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 400;
          color: var(--g-muted);
          cursor: pointer;
          transition: all 0.18s ease;
          margin-bottom: 2px;
          border: 1px solid transparent;
        }
        .gnova-nav-item:hover {
          color: var(--g-text);
          background: rgba(255,255,255,0.04);
        }
        .gnova-nav-item.active {
          color: var(--g-accent);
          background: rgba(200,240,74,0.08);
          border-color: rgba(200,240,74,0.15);
          font-weight: 500;
        }
        .gnova-nav-icon { font-size: 15px; width: 18px; text-align: center; }

        /* Main content */
        .gnova-content {
          padding: 36px 40px;
          overflow-y: auto;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        @keyframes fadeUp { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform: translateY(0) } }

        .gnova-header {
          margin-bottom: 36px;
        }
        .gnova-greeting {
          font-size: 12px;
          font-weight: 400;
          font-style: italic;
          color: var(--g-muted);
          margin-bottom: 6px;
          font-family: 'DM Sans', sans-serif;
        }
        .gnova-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 36px;
          letter-spacing: -1.5px;
          line-height: 1;
          color: var(--g-text);
        }
        .gnova-title span {
          color: var(--g-accent);
        }

        /* Stats row */
        .gnova-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .gnova-stat-card {
          background: var(--g-surface);
          border: 1px solid var(--g-border);
          border-radius: 16px;
          padding: 22px;
          transition: border-color 0.2s, transform 0.2s;
          cursor: default;
        }
        .gnova-stat-card:hover {
          border-color: rgba(200,240,74,0.3);
          transform: translateY(-2px);
        }
        .gnova-stat-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px;
        }
        .gnova-stat-label {
          font-size: 12px;
          color: var(--g-muted);
          font-weight: 400;
          letter-spacing: 0.03em;
        }
        .gnova-stat-icon { font-size: 16px; }
        .gnova-stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -1px;
          color: var(--g-text);
          line-height: 1;
          margin-bottom: 4px;
        }
        .gnova-stat-delta {
          font-size: 11px;
          color: var(--g-accent2);
          font-weight: 400;
        }

        /* Activity row */
        .gnova-row {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 16px;
        }
        .gnova-card {
          background: var(--g-surface);
          border: 1px solid var(--g-border);
          border-radius: 16px;
          padding: 24px;
        }
        .gnova-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--g-text);
          margin-bottom: 18px;
          display: flex; align-items: center; gap: 8px;
        }
        .gnova-card-title-dot {
          width: 6px; height: 6px;
          background: var(--g-accent);
          border-radius: 50%;
        }

        /* Activity list */
        .gnova-activity-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--g-border);
        }
        .gnova-activity-item:last-child { border-bottom: none; }
        .gnova-activity-pip {
          width: 8px; height: 8px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }
        .gnova-activity-text {
          font-size: 13px;
          color: var(--g-text);
          line-height: 1.5;
          font-weight: 300;
        }
        .gnova-activity-time {
          font-size: 11px;
          color: var(--g-muted);
          margin-top: 2px;
        }

        /* Quick actions */
        .gnova-action {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid var(--g-border);
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.18s;
          background: rgba(255,255,255,0.02);
        }
        .gnova-action:hover {
          border-color: rgba(200,240,74,0.3);
          background: rgba(200,240,74,0.05);
        }
        .gnova-action-icon { font-size: 16px; }
        .gnova-action-label { font-size: 13px; font-weight: 400; color: var(--g-text); }
        .gnova-action-arrow { margin-left: auto; color: var(--g-muted); font-size: 12px; }
      `}</style>

      <div className="gnova-root">
        <div className="gnova-glow gnova-glow-1" />
        <div className="gnova-glow gnova-glow-2" />

        <div className="gnova-layout">
          {/* Topbar */}
          <header className="gnova-topbar">
            <div className="gnova-logo">
              <div className="gnova-logo-dot" />
              Gnova
            </div>
            <div className="gnova-topbar-right">
              <span className="gnova-badge">Beta</span>
              <div className="gnova-avatar">GP</div>
            </div>
          </header>

          {/* Sidebar */}
          <aside className="gnova-sidebar">
            <div className="gnova-nav-section">
              <div className="gnova-nav-label">General</div>
              <div className="gnova-nav-item active">
                <span className="gnova-nav-icon">⊞</span> Panel Principal
              </div>
              <div className="gnova-nav-item">
                <span className="gnova-nav-icon">◈</span> Proyectos
              </div>
              <div className="gnova-nav-item">
                <span className="gnova-nav-icon">◎</span> Analytics
              </div>
            </div>
            <div className="gnova-nav-section">
              <div className="gnova-nav-label">Configuración</div>
              <div className="gnova-nav-item">
                <span className="gnova-nav-icon">◇</span> Equipo
              </div>
              <div className="gnova-nav-item">
                <span className="gnova-nav-icon">⚙</span> Ajustes
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="gnova-content">
            <div className="gnova-header">
              <p className="gnova-greeting">Bienvenido de vuelta,</p>
              <h1 className="gnova-title">Panel <span>Principal</span></h1>
            </div>

            {/* Stats */}
            <div className="gnova-stats">
              {[
                { label: "Proyectos activos", value: "14", delta: "+2 este mes", icon: "◈" },
                { label: "Tareas completadas", value: "89", delta: "↑ 12% vs semana anterior", icon: "✓" },
                { label: "Colaboradores", value: "6", delta: "3 en línea ahora", icon: "◉" },
              ].map((s, i) => (
                <div className="gnova-stat-card" key={i}>
                  <div className="gnova-stat-top">
                    <span className="gnova-stat-label">{s.label}</span>
                    <span className="gnova-stat-icon">{s.icon}</span>
                  </div>
                  <div className="gnova-stat-value">{s.value}</div>
                  <div className="gnova-stat-delta">{s.delta}</div>
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div className="gnova-row">
              {/* Activity */}
              <div className="gnova-card">
                <div className="gnova-card-title">
                  <div className="gnova-card-title-dot" /> Actividad reciente
                </div>
                {[
                  { text: "Nuevo proyecto creado: Rediseño Dashboard", time: "hace 2 min", color: "#c8f04a" },
                  { text: "María subió 3 archivos al módulo de reportes", time: "hace 18 min", color: "#4af0b8" },
                  { text: "Tarea #42 marcada como completada", time: "hace 1 hora", color: "#c8f04a" },
                  { text: "Integración con Slack activada", time: "hace 3 horas", color: "#4af0b8" },
                ].map((a, i) => (
                  <div className="gnova-activity-item" key={i}>
                    <div className="gnova-activity-pip" style={{ background: a.color }} />
                    <div>
                      <div className="gnova-activity-text">{a.text}</div>
                      <div className="gnova-activity-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="gnova-card">
                <div className="gnova-card-title">
                  <div className="gnova-card-title-dot" /> Acciones rápidas
                </div>
                {[
                  { icon: "＋", label: "Nuevo proyecto" },
                  { icon: "↗", label: "Invitar colaborador" },
                  { icon: "⊡", label: "Ver reportes" },
                  { icon: "◈", label: "Configurar integración" },
                ].map((a, i) => (
                  <div className="gnova-action" key={i}>
                    <span className="gnova-action-icon">{a.icon}</span>
                    <span className="gnova-action-label">{a.label}</span>
                    <span className="gnova-action-arrow">›</span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}