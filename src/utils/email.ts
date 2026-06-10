const smtpHost = import.meta.env.VITE_SMTP_HOST
const smtpPort = Number(import.meta.env.VITE_SMTP_PORT || 587)
const smtpUser = import.meta.env.VITE_SMTP_USER
const smtpPass = import.meta.env.VITE_SMTP_PASS

export async function sendInviteEmail(to: string, subject: string, html: string) {
  // Only attempt to send email in a Node-like/server environment
  if (typeof window !== 'undefined') {
    // In the browser, fallback to console log for dev
    // eslint-disable-next-line no-console
    console.info('sendInviteEmail (mock):', { to, subject, html })
    return
  }

  if (!smtpHost || !smtpUser) {
    // Server environment but SMTP not configured
    // eslint-disable-next-line no-console
    console.warn('SMTP not configured; skipping sendInviteEmail')
    return
  }

  // Use a runtime-only dynamic import to avoid bundlers resolving this for the browser
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const nodemailer = await eval('import')('nodemailer')
  const transport = nodemailer.createTransport({ host: smtpHost, port: smtpPort, auth: { user: smtpUser, pass: smtpPass } })
  await transport.sendMail({ from: smtpUser, to, subject, html })
}

export default { sendInviteEmail }
