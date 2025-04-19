// src/types/env.d.ts

interface ImportMetaEnv {
  readonly VITE_OPENWEATHERMAP_API_KEY: string;
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}