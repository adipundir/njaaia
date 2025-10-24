import { env } from '../config/env';

// Function to check if the input requires blockchain data tools
export function requiresBlockchainData(input: string): boolean {
  const blockchainKeywords = [
    'block', 'transaction', 'ethereum', 'bitcoin', 'crypto', 'token', 'nft',
    'defi', 'uniswap', 'aave', 'compound', 'wallet', 'address', 'balance',
    'transfer', 'gas', 'mining', 'hash', 'blockchain', 'on-chain', 'off-chain',
    'liquidity', 'pool', 'swap', 'yield', 'farming', 'staking', 'protocol'
  ];

  const lowerInput = input.toLowerCase();
  return blockchainKeywords.some(keyword => lowerInput.includes(keyword));
}

// Function to process user input and get AI response
export async function processUserInput(input: string): Promise<{
  response: string;
  intermediateSteps?: any[];
  error?: string;
}> {
  try {
    if (!env.isConfigured()) {
      return {
        response: "I'm sorry, but I'm not properly configured yet. Please check that the OpenAI API key is set up correctly.",
        error: 'Configuration error'
      };
    }

    // Simple OpenAI API call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are njaaia, a sophisticated AI assistant specialized in blockchain and Web3 data analysis. 
            
            Your capabilities include:
            - Analyzing blockchain data and transactions
            - Explaining DeFi protocols and concepts
            - Providing insights about Web3 ecosystems
            - Answering questions about cryptocurrency and blockchain technology
            
            Be conversational, helpful, and focus on making complex blockchain concepts accessible to everyone.
            If you don't have specific real-time data, explain what you can help with instead.`
          },
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.1,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return {
      response: aiResponse,
      intermediateSteps: []
    };
  } catch (error) {
    console.error('Error processing user input:', error);
    return {
      response: "I encountered an error while processing your request. Please try again or rephrase your question.",
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Function to get a quick response without using tools (for simple queries)
export async function getQuickResponse(input: string): Promise<string> {
  try {
    if (!env.isConfigured()) {
      return "I'm sorry, but I'm not properly configured yet. Please check that the OpenAI API key is set up correctly.";
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Error getting quick response:', error);
    return "I encountered an error while processing your request. Please try again.";
  }
}

// Function to get a streaming response (for real-time updates)
export async function* getStreamingResponse(input: string): AsyncGenerator<string, void, unknown> {
  try {
    if (!env.isConfigured()) {
      yield "I'm sorry, but I'm not properly configured yet. Please check that the OpenAI API key is set up correctly.";
      return;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are njaaia, a sophisticated AI assistant specialized in blockchain and Web3 data analysis. 
            
            Your capabilities include:
            - Analyzing blockchain data and transactions
            - Explaining DeFi protocols and concepts
            - Providing insights about Web3 ecosystems
            - Answering questions about cryptocurrency and blockchain technology
            
            Be conversational, helpful, and focus on making complex blockchain concepts accessible to everyone.`
          },
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.1,
        max_tokens: 1000,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch (e) {
            // Ignore parsing errors for incomplete chunks
          }
        }
      }
    }
  } catch (error) {
    console.error('Error getting streaming response:', error);
    yield "I encountered an error while processing your request. Please try again.";
  }
}
