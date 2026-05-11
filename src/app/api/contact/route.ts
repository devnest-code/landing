import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { contactSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    await resend.emails.send({
      from: 'DevNest Contact <noreply@devnest.io>',
      to: ['hello@devnest.io'],
      replyTo: data.email,
      subject: `New lead: ${data.projectType} — ${data.company || data.name}`,
      html: `
        <h2>New contact from devnest.io</h2>
        <table cellpadding="6">
          <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Company:</strong></td><td>${data.company || '—'}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Project type:</strong></td><td>${data.projectType}</td></tr>
          <tr><td><strong>Budget:</strong></td><td>${data.budget}</td></tr>
          <tr><td><strong>Message:</strong></td><td>${data.message}</td></tr>
        </table>
      `,
    })

    await resend.emails.send({
      from: 'DevNest <hello@devnest.io>',
      to: [data.email],
      subject: 'We received your message — DevNest',
      html: `
        <p>Hi ${data.name},</p>
        <p>Thanks for reaching out to DevNest. We received your message and will get back to you within 24 hours.</p>
        <p>— The DevNest Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
