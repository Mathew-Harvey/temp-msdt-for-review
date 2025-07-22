# MarineStream™ - Integrated Biofouling & Asset Management

MarineStream™ provides a revolutionary integrated system for proactive biofouling management and underwater asset sustainment. We merge Australia's only regulatory-compliant in-water cleaning (IWC) technology with a state-of-the-art, blockchain-secured data platform.

## Features

### Core System Components
- **MarineStream™ Management Platform**: Blockchain-secured data platform with integrated workflows
- **Compliant In-Water Cleaning System**: Australian IWCS compliant cleaning technology
- **AI-Powered Analytics**: Real-time insights and predictive maintenance
- **Regulatory Compliance**: Built-in compliance with international maritime standards

### Website Features
- **Dynamic Email Collection**: Popup subscription modal with backend storage
- **Blog System**: Markdown-based blog with API-driven content
- **Privacy Policy**: Dynamic privacy policy page
- **Sales Tools**: Hull calculator and BFMP generator
- **Responsive Design**: Mobile-first, accessible design

## Quick Start

### Prerequisites
- Node.js 22.5.0+ (required for built-in SQLite support)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd temp-msdt-for-review
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

   **Note:** This project uses Node.js 22.5.0+ built-in SQLite module, which requires the `--experimental-sqlite` flag. No additional database dependencies are needed.

3. **Start the development server**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```
   
   The server will start with the `--experimental-sqlite` flag automatically.

4. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api

## Project Structure

```
MarineStream/
├── assets/                 # Images, videos, and static assets
├── blog/                   # Markdown blog posts
├── content/                # Static content (privacy policy)
├── server/                 # Backend server
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Server dependencies
│   └── data.db           # SQLite database (auto-created)
├── index.html             # Main landing page
├── blog.html              # Blog page
├── privacy.html           # Privacy policy page
├── sales.html             # Sales page
├── style.css              # Main stylesheet
├── script.js              # Main JavaScript
├── blog.js                # Blog functionality
├── privacy.js             # Privacy page functionality
└── README.md              # This file
```

## API Endpoints

### Email Subscription
- `POST /api/subscribe` - Subscribe to newsletter
- `GET /api/export` - Export leads (JSON/CSV)

### Content
- `GET /api/blog` - Get blog posts
- `GET /api/privacy` - Get privacy policy content
- `GET /api/health` - Health check

## Database Schema

### Leads Table
```sql
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  company TEXT,
  role TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Adding Blog Posts
1. Create a new `.md` file in the `blog/` directory
2. Use standard Markdown syntax
3. The first `#` heading becomes the post title
4. Posts are automatically sorted by creation date

### Customizing the Privacy Policy
1. Edit `content/privacy.md`
2. Changes are automatically reflected on the privacy page

### Styling
- Main styles: `style.css`
- Component-specific styles are included in the main stylesheet
- Uses CSS custom properties for theming

## Deployment

### Local Development
```bash
cd server
npm start
```

### Production Deployment
1. Set up a production server (VPS, cloud platform)
2. Install Node.js and dependencies
3. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name marinestream
   pm2 startup
   ```

### Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## CRM Integration

### Export Leads
```bash
# JSON format
curl http://localhost:3000/api/export

# CSV format
curl http://localhost:3000/api/export?format=csv
```

### Future CRM Integration
- Manual export and import to CRM systems
- Automated API integration with SuiteCRM/EspoCRM
- Scheduled data synchronization

## Security Features

- Email validation and spam prevention
- SQL injection protection
- CORS configuration
- Input sanitization
- Rate limiting (basic)

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2024 MarineStream Pty Ltd. All rights reserved.

## Support

For technical support or questions:
- Email: info@marinestream.com.au
- Website: https://www.marinestream.com.au