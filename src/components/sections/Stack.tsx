'use client'
import { useTranslations } from 'next-intl'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

const techs = [
  'React / Next.js', 'Vue / Nuxt', 'Node.js', 'Python / FastAPI',
  'Go / Golang', 'PHP / Laravel', 'Java / Spring Boot', 'Java / Quarkus',
  'TypeScript', 'Microservicios', 'Flutter', 'React Native',
  'Swift / iOS', 'Kotlin / Android',
  'AWS', 'Azure', 'GCP', 'Docker / Kubernetes',
  'PostgreSQL / MySQL', 'MongoDB / Redis', 'GraphQL / REST',
  'Supabase / Firebase', 'Stripe / Payment APIs', 'OpenAI / LangChain',
  'Terraform / CI-CD', 'Facturación Electrónica',
  'Gestión de Proyectos', 'Figma / Design Systems', 'GitHub Actions',
]

export default function Stack() {
  const t = useTranslations('stack')

  return (
    <section id="stack" className="relative z-10 py-[100px] px-[5%]" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1240px] mx-auto">
        <RevealWrapper className="mb-11">
          <div className="eyebrow-label">{t('eyebrow')}</div>
          <h2
            className="font-display font-extrabold leading-none"
            style={{ fontSize: 'clamp(36px,5.5vw,60px)', letterSpacing: '-0.5px', color: 'var(--w)' }}
          >
            {t('title1')}
            <br />
            <span style={{ color: 'var(--wm)' }}>{t('title2')}</span>
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <div className="flex flex-wrap gap-2.5">
            {techs.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-[13px] border transition-all duration-200 cursor-default"
                style={{
                  borderColor: 'var(--bd)',
                  color: 'var(--wm)',
                  background: 'var(--bgc)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bdg)'
                  e.currentTarget.style.color = 'var(--w)'
                  e.currentTarget.style.background = 'var(--goldg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bd)'
                  e.currentTarget.style.color = 'var(--wm)'
                  e.currentTarget.style.background = 'var(--bgc)'
                }}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                  style={{ background: 'var(--gold)', opacity: 0.5 }}
                />
                {tech}
              </span>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
