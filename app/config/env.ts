// Environment configuration for njaaia
export const env = {
  // AI Model Configuration
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  
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
    return !!(env.OPENAI_API_KEY || env.GEMINI_API_KEY);
  },
  
  // Get preferred AI provider
  getAIProvider: () => {
    if (env.GEMINI_API_KEY) return 'gemini';
    if (env.OPENAI_API_KEY) return 'openai';
    return null;
  }
};

// Environment validation
if (typeof window === 'undefined' && !env.isConfigured()) {
  console.warn('⚠️  AI API key not configured. Please set GEMINI_API_KEY or OPENAI_API_KEY in your environment variables.');
}
