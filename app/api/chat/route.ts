import { NextRequest, NextResponse } from 'next/server';
import { processUserInput, getQuickResponse, requiresBlockchainData } from '../../lib/ai-agent';

export async function POST(request: NextRequest) {
  try {
    const { message, useTools = true } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    let response;

    if (useTools && requiresBlockchainData(message)) {
      // Use the full agent with tools for blockchain queries
      response = await processUserInput(message);
    } else {
      // Use quick response for simple queries
      const quickResponse = await getQuickResponse(message);
      response = { response: quickResponse };
    }

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'njaaia AI Chat API',
    status: 'active',
    capabilities: [
      'Blockchain data analysis',
      'Token transfer tracking',
      'DeFi protocol insights',
      'Wallet analytics',
      'Real-time on-chain data'
    ]
  });
}
