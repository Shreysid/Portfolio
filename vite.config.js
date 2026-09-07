import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  const { VITE_CLOUDFLARE_ANALYTICS_TOKEN: rawToken = '' } = loadEnv(mode, process.cwd())
  const token = rawToken.trim()

  if (token && !/^[a-f0-9]{32}$/i.test(token)) {
    throw new Error('VITE_CLOUDFLARE_ANALYTICS_TOKEN must be the 32-character site token from Cloudflare Web Analytics.')
  }
  if (command === 'build' && mode === 'cloudflare' && !token) {
    throw new Error('Set VITE_CLOUDFLARE_ANALYTICS_TOKEN before deploying to Cloudflare.')
  }

  return {
    plugins: [{
      name: 'cloudflare-web-analytics',
      transformIndexHtml() {
        if (command !== 'build' || !token) return []
        return [{
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': JSON.stringify({ token }),
          },
          injectTo: 'body',
        }]
      },
    }],
  }
})
