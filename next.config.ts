import type { NextConfig } from 'next'
import { lerHostsDoShell } from './lib/hosts-do-shell'

const config: NextConfig = {
  poweredByHeader: false,
  // Prefixo exclusivo de assets (limitação 5). O shell reencaminha /zona1-static/* para cá.
  assetPrefix: '/zona1-static',
  experimental: {
    // A Server Action chega pelo shell: a origem do navegador é a do shell, não a da zona.
    serverActions: { allowedOrigins: lerHostsDoShell() },
  },
}

export default config
