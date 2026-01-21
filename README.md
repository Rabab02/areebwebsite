# Areeb Company Website

Modern company website built with React, TypeScript, and Express.

## Features

- Responsive design with mobile support
- Multi-language support (English/Arabic)
- Contact form with email notifications
- SEO optimized
- Fast and modern UI

## Requirements

- Node.js 20+
- Gmail account (for contact form emails)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AreebSite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=zeyad@areebb.com
SMTP_PASS=your-password-here
SMTP_FROM=zeyad@areebb.com
CONTACT_EMAIL=info@areebb.com
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
This starts both the Express server and Vite dev server on port 5000.

### Client Only (Development)
```bash
npm run dev:client
```

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run check
```

## 📁 Project Structure

```
AreebSite/
├── api/                 # Vercel serverless functions
├── client/             # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── lib/        # Utilities and configurations
│   │   └── hooks/      # Custom React hooks
│   └── public/         # Static assets
├── server/             # Express backend
│   ├── routes.ts       # API route handlers
│   ├── email.ts        # Email service
│   └── utils/          # Server utilities
├── shared/             # Shared types and schemas
└── script/             # Build and utility scripts
```

## 🔧 Configuration

### Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)
- `SMTP_HOST`: SMTP server hostname
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username/email
- `SMTP_PASS`: SMTP password or app password
- `SMTP_FROM`: From email address
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

### Gmail Setup

For Gmail SMTP, you need to:
1. Enable 2-Step Verification on your Google Account
2. Generate an App Password: Google Account → Security → 2-Step Verification → App passwords
3. Use the generated app password in `SMTP_PASS`

## 📝 API Endpoints

### `GET /api/test`
Health check endpoint to verify API is working.

### `POST /api/contact`
Submit contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message. We'll get back to you soon!"
}
```

## 🏗️ Build Process

The build process:
1. Compiles TypeScript
2. Bundles React application with Vite
3. Copies static assets
4. Generates production-ready files in `dist/`

## Security

- Environment variables for sensitive data
- Rate limiting on contact form
- Input validation
- Secure email connections

## 📦 Dependencies

### Core
- **React 19**: UI library
- **TypeScript**: Type safety
- **Express**: Backend framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling

### Key Libraries
- **Zod**: Schema validation
- **Nodemailer**: Email sending
- **Wouter**: Routing
- **TanStack Query**: Data fetching
- **Radix UI**: Accessible components

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure TypeScript checks pass: `npm run check`
4. Test your changes
5. Submit a pull request

## 📄 License

MIT

## 📧 Contact

For questions or support, contact: info@areebb.com
