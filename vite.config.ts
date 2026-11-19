import { createHash } from 'node:crypto'
import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Build-only CSP: the dev server needs inline scripts (React refresh preamble) that a strict policy would block.
// Hashes every inline <script> of the final HTML so no 'unsafe-inline' is needed for scripts.
const csp = (): Plugin => ({
  name: 'csp-meta',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      const hashes = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(
        (m) => `'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`,
      )
      const policy = [
        "default-src 'self'",
        `script-src 'self' ${hashes.join(' ')}`,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        'font-src https://fonts.gstatic.com',
        "img-src 'self' data:",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'none'",
        "object-src 'none'",
      ].join('; ')
      return html.replace('<head>', `<head>\n  <meta http-equiv="Content-Security-Policy" content="${policy}" />`)
    },
  },
})

export default defineConfig({
  plugins: [react(), csp()],
  base: '/fernando/',
  test: { environment: 'jsdom' },
})
