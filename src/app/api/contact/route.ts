import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations'

const contactEmail = process.env.CONTACT_EMAIL || 'devnest.code@gmail.com'

const projectTypeLabels = {
  custom: 'Software a medida',
  outsourcing: 'Outsourcing / equipo dedicado',
  mobile: 'Aplicación móvil',
  saas: 'Plataforma SaaS',
  automation: 'Automatización',
  mvp: 'MVP / validación de idea',
  ecommerce: 'Comercio electrónico',
  ai: 'Inteligencia artificial',
  joint: 'Proyecto conjunto',
  other: 'Otro',
} as const

const budgetLabels = {
  u5k: 'Menos de USD 5.000',
  '5-15k': 'USD 5.000–15.000',
  '15-50k': 'USD 15.000–50.000',
  '50k+': 'Más de USD 50.000',
  nd: 'Por definir',
} as const

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const data = contactSchema.parse(body)

    await resend.emails.send({
      from: 'Contacto DevNest <noreply@devnest.io>',
      to: [contactEmail],
      replyTo: data.email,
      subject: `Nueva solicitud: ${projectTypeLabels[data.projectType]} — ${data.company || data.name}`,
      html: `
        <h2>Nueva solicitud desde devnest.io</h2>
        <table cellpadding="6">
          <tr><td><strong>Nombre:</strong></td><td>${escapeHtml(data.name)}</td></tr>
          <tr><td><strong>Empresa:</strong></td><td>${escapeHtml(data.company || '—')}</td></tr>
          <tr><td><strong>Correo electrónico:</strong></td><td>${escapeHtml(data.email)}</td></tr>
          <tr><td><strong>Tipo de proyecto:</strong></td><td>${projectTypeLabels[data.projectType]}</td></tr>
          <tr><td><strong>Presupuesto:</strong></td><td>${budgetLabels[data.budget]}</td></tr>
          <tr><td><strong>Mensaje:</strong></td><td>${escapeHtml(data.message).replaceAll('\n', '<br>')}</td></tr>
        </table>
      `,
    })

    await resend.emails.send({
      from: 'DevNest <hello@devnest.io>',
      to: [data.email],
      subject: 'Recibimos tu mensaje — DevNest',
      html: `
        <p>Hola ${escapeHtml(data.name)},</p>
        <p>Gracias por comunicarte con DevNest. Recibimos tu mensaje y te responderemos en un plazo máximo de 24 horas.</p>
        <p>— El equipo de DevNest</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error del formulario de contacto:', error)
    return NextResponse.json({ error: 'No se pudo enviar el mensaje' }, { status: 500 })
  }
}
