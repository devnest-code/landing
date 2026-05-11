'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const t = useTranslations('contact')
  const ft = useTranslations('contact.form')
  const [status, setStatus] = useState<Status>('idle')

  const perks: string[] = t.raw('perks') as string[]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        reset()
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'form-input'
  const labelClass = 'block text-[11px] font-medium uppercase tracking-[0.4px] mb-1.5'
  const errClass = 'text-[11px] mt-1'

  return (
    <section
      id="contact"
      className="relative z-10 py-[100px] px-[5%] border-t"
      style={{ background: 'var(--bg)', borderColor: 'var(--bd)' }}
    >
      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-[76px] items-start">
        {/* Left */}
        <RevealWrapper>
          <div className="eyebrow-label">{t('eyebrow')}</div>
          <h2
            className="font-display font-extrabold leading-none mb-4"
            style={{ fontSize: 'clamp(36px,5.5vw,60px)', letterSpacing: '-0.5px', color: 'var(--w)' }}
          >
            {t('title1')}
            <br />
            {t('title2')}
            <br />
            <span style={{ color: 'var(--gold)' }}>{t('title3')}</span>
          </h2>
          <p className="text-[16px] mb-7 leading-[1.75]" style={{ color: 'var(--wm)' }}>
            {t('desc')}
          </p>
          <div className="flex flex-col gap-3">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3 text-[14px]" style={{ color: 'var(--wm)' }}>
                <span
                  className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 border"
                  style={{
                    background: 'var(--goldg)',
                    borderColor: 'var(--bdg)',
                    color: 'var(--gold)',
                  }}
                >
                  ✓
                </span>
                {perk}
              </div>
            ))}
          </div>
        </RevealWrapper>

        {/* Right — form */}
        <RevealWrapper delay={0.15}>
          <div
            className="rounded-[10px] p-[34px] border"
            style={{ background: 'var(--bgc)', borderColor: 'var(--bd)' }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Name + Company */}
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className={labelClass} style={{ color: 'var(--wm)' }} htmlFor="name">
                    {ft('name')}
                  </label>
                  <input
                    id="name"
                    className={inputClass}
                    placeholder="John Doe"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className={errClass} style={{ color: 'var(--gold)' }}>{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass} style={{ color: 'var(--wm)' }} htmlFor="company">
                    {ft('company')}
                  </label>
                  <input
                    id="company"
                    className={inputClass}
                    placeholder="Acme Inc."
                    {...register('company')}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className={labelClass} style={{ color: 'var(--wm)' }} htmlFor="email">
                  {ft('email')}
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  placeholder="you@company.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className={errClass} style={{ color: 'var(--gold)' }}>{errors.email.message}</p>
                )}
              </div>

              {/* Project type */}
              <div className="mb-4">
                <label className={labelClass} style={{ color: 'var(--wm)' }} htmlFor="projectType">
                  {ft('projectType')}
                </label>
                <select id="projectType" className="form-select" {...register('projectType')}>
                  <option value="">{ft('projectTypePlaceholder')}</option>
                  {(
                    ['custom','outsourcing','mobile','saas','automation','mvp','ecommerce','ai','joint','other'] as const
                  ).map((v) => (
                    <option key={v} value={v}>{ft(`projectTypes.${v}`)}</option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className={errClass} style={{ color: 'var(--gold)' }}>Required</p>
                )}
              </div>

              {/* Budget */}
              <div className="mb-4">
                <label className={labelClass} style={{ color: 'var(--wm)' }} htmlFor="budget">
                  {ft('budget')}
                </label>
                <select id="budget" className="form-select" {...register('budget')}>
                  <option value="">{ft('budgetPlaceholder')}</option>
                  {(
                    ['u5k','5-15k','15-50k','50k+','nd'] as const
                  ).map((v) => (
                    <option key={v} value={v}>{ft(`budgets.${v}`)}</option>
                  ))}
                </select>
                {errors.budget && (
                  <p className={errClass} style={{ color: 'var(--gold)' }}>Required</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-4">
                <label className={labelClass} style={{ color: 'var(--wm)' }} htmlFor="message">
                  {ft('message')}
                </label>
                <textarea
                  id="message"
                  className="form-textarea"
                  placeholder={ft('messagePlaceholder')}
                  {...register('message')}
                />
                {errors.message && (
                  <p className={errClass} style={{ color: 'var(--gold)' }}>{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-md text-[15px] font-medium border-none cursor-pointer transition-all duration-200 mt-1"
                style={{
                  background: status === 'sending' ? 'var(--gold2)' : 'var(--gold)',
                  color: '#060200',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (status !== 'sending') {
                    e.currentTarget.style.background = '#ffc244'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,166,35,0.28)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = status === 'sending' ? 'var(--gold2)' : 'var(--gold)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {status === 'sending' ? ft('sending') : ft('submit')}
              </button>

              {status === 'success' && (
                <div
                  className="mt-4 text-center py-4 font-display text-[22px] font-bold"
                  style={{ color: 'var(--gold)' }}
                >
                  {ft('success')}
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 text-center py-2 text-[13px]" style={{ color: '#ff6b6b' }}>
                  {ft('error')}
                </div>
              )}
            </form>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
