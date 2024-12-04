# Claude Token Counter

This is a demonstration project that shows how to implement Claude's token counting functionality using the Anthropic API.

**Note**: This is for demonstration purposes only.

## Overview

This project provides a simple web interface to count tokens using Claude's token counting API. It allows you to:
- Input text and see the token count in real-time
- View token counting history
- Support for both text input and file upload

## Setup

1. Install dependencies using pnpm:
```bash
pnpm install
```

2. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Anthropic API key
```

3. Run the development server:
```bash
pnpm dev
```

## API Reference

This project utilizes Anthropic's beta Token Counting API, which is documented in their official [Token counting (beta)](https://docs.anthropic.com/en/docs/build-with-claude/token-counting) page. This beta API provides accurate token counting that matches Claude's internal tokenization process.
