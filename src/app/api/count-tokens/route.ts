import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const VALID_MODELS = [
  'claude-3-haiku-20240307',
  'claude-3-opus-20240229',
  'claude-3-5-haiku-20241022',
  'claude-3-5-sonnet-20241022'
] as const;

type Model = typeof VALID_MODELS[number];

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: Request) {
  try {
    const { text, model } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (!model || !VALID_MODELS.includes(model)) {
      return NextResponse.json(
        { error: 'Invalid model specified' },
        { status: 400 }
      );
    }

    const result = await anthropic.beta.messages.countTokens({
      model: model as Model,
      messages: [{ role: "user", content: text }],
    });
    
    return NextResponse.json({ tokenCount: result.input_tokens });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to count tokens' },
      { status: 500 }
    );
  }
}
