/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_TELRAAM_ENDPOINT: string;
	readonly VITE_FETCH_INTERVAL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
