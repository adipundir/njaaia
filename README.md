# njaaia - Not Just Another AI Assistant

A sleek, futuristic voice-based AI assistant powered by LangChain and Envio's blockchain data tools. njaaia combines cutting-edge AI with real-time on-chain data analysis to provide intelligent responses about blockchain, DeFi, and Web3 ecosystems.

## ✨ Features

### 🎤 Voice Interface
- **Real-time Speech Recognition**: Convert voice to text using Web Speech API
- **Natural Language Processing**: Powered by OpenAI's GPT-4
- **Smooth Animations**: Framer Motion-powered UI with glassmorphism design
- **Responsive Design**: Works seamlessly on desktop and mobile

### 🔗 Blockchain Data Integration
- **HyperSync Integration**: Ultra-fast blockchain data access (up to 2000x faster than RPC)
- **Multi-chain Support**: Ethereum, Polygon, Arbitrum, and more
- **Real-time Analytics**: Live on-chain data and metrics
- **DeFi Protocol Insights**: Uniswap, Aave, Compound, Curve, Balancer

### 🤖 AI Capabilities
- **LangChain Integration**: Advanced AI agent with tool usage
- **Context-Aware Responses**: Maintains conversation context
- **Blockchain Expertise**: Specialized in Web3 and DeFi topics
- **Streaming Responses**: Real-time response generation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key (recommended) or OpenAI API key
- Modern browser with speech recognition support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adipundir/njaaia.git
   cd njaaia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   # Primary AI provider (recommended)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Alternative AI provider (fallback)
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Envio configuration
   ENVIO_HYPERSYNC_URL=https://api.hypersync.xyz
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Voice Interaction
1. **Click the microphone button** to start listening
2. **Speak your question** about blockchain, DeFi, or any topic
3. **Watch the AI process** your request with beautiful animations
4. **Listen to the response** as njaaia speaks back to you

### Example Queries
- "What's the current gas price on Ethereum?"
- "Show me the latest Uniswap V3 liquidity pools"
- "Analyze wallet 0x1234...5678 for me"
- "What are the top DeFi protocols by TVL?"
- "Explain how Aave lending works"

## 🛠️ Architecture

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **Three.js**: WebGL shader animations

### Backend
- **Google Gemini**: Primary AI model (gemini-1.5-flash)
- **OpenAI GPT-4**: Fallback AI model
- **Envio HyperSync**: Blockchain data access
- **Web Speech API**: Voice recognition

### AI Agent Tools
- **Ethereum Block Data**: Fetch block details and transactions
- **Token Transfers**: Track ERC-20 and ERC-721 transfers
- **DeFi Analytics**: Protocol-specific data and metrics
- **Wallet Analysis**: Comprehensive portfolio insights

## 📁 Project Structure

```
njaaia/
├── app/
│   ├── api/
│   │   └── chat/           # AI chat API endpoints
│   ├── components/         # React components
│   │   ├── AnimatedBackground.tsx
│   │   ├── MicrophoneButton.tsx
│   │   ├── StatusText.tsx
│   │   ├── WaveformAnimation.tsx
│   │   └── shader-animation.tsx
│   ├── config/
│   │   └── env.ts          # Environment configuration
│   ├── lib/
│   │   ├── ai-agent.ts     # LangChain AI agent
│   │   └── envio-tools.ts  # Blockchain data tools
│   ├── types/
│   │   └── speech-recognition.d.ts
│   └── page.tsx            # Main application page
├── public/                 # Static assets
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key (recommended) | Yes* |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 (fallback) | Yes* |
| `ENVIO_HYPERSYNC_URL` | Envio HyperSync endpoint | No (has default) |
| `ETHEREUM_HYPERSYNC_URL` | Ethereum-specific endpoint | No |
| `POLYGON_HYPERSYNC_URL` | Polygon-specific endpoint | No |
| `ARBITRUM_HYPERSYNC_URL` | Arbitrum-specific endpoint | No |

*At least one AI API key is required (Gemini preferred)

### Customization

#### Adding New Blockchain Tools
1. Create a new tool in `app/lib/envio-tools.ts`
2. Add it to the `envioTools` array
3. Update the AI agent prompt in `app/lib/ai-agent.ts`

#### Styling
- Modify `app/globals.css` for global styles
- Update component styles in individual `.tsx` files
- Customize animations in Framer Motion components

## 🎨 Design System

### Color Palette
- **Primary**: Black and white monochromatic theme
- **Accents**: Subtle white glows and transparency
- **Background**: Dark gradients with particle effects

### Typography
- **Primary Font**: Geist Sans (system fallback)
- **Mono Font**: Geist Mono

### Components
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design approach

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Other Platforms
- **Netlify**: Static site generation
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Envio**: For providing ultra-fast blockchain data access
- **LangChain**: For the powerful AI agent framework
- **OpenAI**: For the advanced language models
- **Framer Motion**: For smooth animations
- **Next.js**: For the excellent React framework

## 🏆 Envio Hackathon

This project is built for the Envio Hackathon and demonstrates:
- **Best Use of HyperSync**: Real-time blockchain data integration
- **Best AI + Envio Tooling**: AI-powered blockchain analytics
- **Best Live Web3 Dashboard**: Interactive data visualization

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/adipundir/njaaia/issues)
- **Discussions**: [GitHub Discussions](https://github.com/adipundir/njaaia/discussions)
- **Email**: [Your Email]

---

**Built with ❤️ for the Web3 community**