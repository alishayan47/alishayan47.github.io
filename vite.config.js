import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Use '/' for username.github.io; use '/repo-name/' for a project repo.
  base: '/',
});
