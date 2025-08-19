/// <reference types="vite/client" />

interface ViteTypeOptions {
  // This makes the type of ImportMetaEnv strict to disallow unknown keys.
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
