// Environment configuration for njaaia
export const env = {
  // OpenAI Configuration
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  
  // Envio Configuration
  ENVIO_HYPERSYNC_URL: process.env.ENVIO_HYPERSYNC_URL || 'https://api.hypersync.xyz',
  ENVIO_HYPERINDEX_URL: process.env.ENVIO_HYPERINDEX_URL || 'https://api.hyperindex.xyz',
  
  // Blockchain-specific endpoints
  ETHEREUM_HYPERSYNC_URL: process.env.ETHEREUM_HYPERSYNC_URL || 'https://ethereum.hypersync.xyz',
  POLYGON_HYPERSYNC_URL: process.env.POLYGON_HYPERSYNC_URL || 'https://polygon.hypersync.xyz',
  ARBITRUM_HYPERSYNC_URL: process.env.ARBITRUM_HYPERSYNC_URL || 'https://arbitrum.hypersync.xyz',
  
  // Application Configuration
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'njaaia',
  APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Not Just Another AI Assistant',
  
  // Validation
  isConfigured: () => {
    return !!env.OPENAI_API_KEY;
  }
};

// Environment validation
if (typeof window === 'undefined' && !env.isConfigured()) {
  console.warn('⚠️  OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.');
}
