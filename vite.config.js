import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import fm from 'front-matter'

// Los posts (.md) se leen y se separan en encabezado y texto al construir el sitio,
// así el navegador no tiene que descargar el lector de YAML.
const markdownPosts = () => ({
  name: 'fortis-markdown-posts',
  load(id) {
    if (!id.endsWith('.md?post')) return null
    const file = id.slice(0, -'?post'.length)
    const { attributes, body } = fm(fs.readFileSync(file, 'utf8'))
    return `export default ${JSON.stringify({ attributes, body })};`
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), markdownPosts()],
})
