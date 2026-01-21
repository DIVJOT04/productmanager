# Full-Stack Product Manager

A modern full-stack web application built with Next.js, React, Express.js API routes, MongoDB, and JWT authentication.

## Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Product Management**: Create, read, update, and delete products
- **User-Scoped Data**: Each user can only access their own products
- **Responsive Design**: Mobile-friendly interface with dark theme
- **Protected Routes**: Dashboard and product management pages require authentication
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

### Frontend
- **Next.js 16** - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **Zustand** - State management
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - Serverless backend
- **MongoDB** - NoSQL database
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd fullstack-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Copy `.env.example` to `.env.local` and update with your values:

```bash
cp .env.example .env.local
```

Add your configuration:
```
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/fullstack-app
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fullstack-app

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-key-change-me
```

To generate a secure JWT secret:
```bash
openssl rand -base64 32
```

### Running the Application

Development mode:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

Production build:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  - Body: `{ email, password, name }`
  - Returns: `{ user, token }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ user, token }`

### Products
- `GET /api/products` - Get all products for authenticated user
  - Headers: `Authorization: Bearer <token>`
  - Returns: Array of products

- `POST /api/products` - Create a new product
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name, description, price }`
  - Returns: Created product object

- `GET /api/products/[id]` - Get a specific product
  - Headers: `Authorization: Bearer <token>`
  - Returns: Product object

- `PUT /api/products/[id]` - Update a product
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name, description, price }`
  - Returns: Updated product object

- `DELETE /api/products/[id]` - Delete a product
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ success: true }`

## Project Structure

```
fullstack-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   └── products/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── ProductForm.tsx
│   ├── ProductList.tsx
│   └── ProductModal.tsx
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── store.ts
│   └── utils.ts
└── package.json
```

## Features Breakdown

### Authentication
- User registration with email and password
- Secure password hashing with bcrypt
- JWT token generation and verification
- Token storage in browser (via Zustand with persistence)
- Automatic token refresh on page reload

### Product Management
- Create new products with name, description, and price
- View all user's products in a grid layout
- Edit product details in a modal
- Delete products with confirmation
- Real-time updates using Zustand store

### UI/UX
- Clean dark theme design
- Responsive mobile-first layout
- Loading states for async operations
- Error messages for user feedback
- Smooth transitions and hover effects

## Security Features

1. **Password Security**: Passwords are hashed using bcrypt with salt rounds
2. **JWT Authentication**: Tokens expire after 7 days
3. **User Data Isolation**: Users can only access their own products
4. **Protected API Routes**: All product endpoints require valid JWT token
5. **Input Validation**: Server-side validation of all inputs

## Error Handling

- Global error boundary for uncaught errors
- 404 page for non-existent routes
- API error responses with proper HTTP status codes
- User-friendly error messages
- Console logging for debugging

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with a single click

### Other Platforms
1. Build the application: `npm run build`
2. Set environment variables
3. Deploy the `.next` directory
4. Ensure MongoDB connection is accessible from your deployment region

## Development

### Adding New Features

1. Create API route in `app/api/`
2. Add store actions in `lib/store.ts`
3. Create components in `components/`
4. Build UI pages in `app/`

### Testing
You can test the API endpoints using:
- curl
- Postman
- VS Code REST Client

Example:
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or Atlas connection is accessible
- Check `MONGODB_URI` environment variable
- Verify network connectivity (especially for MongoDB Atlas)

### Authentication Errors
- Clear browser cookies and local storage
- Regenerate JWT secret if changed
- Check token expiration (7 days default)

### Product Operations Fail
- Ensure you're logged in (token is valid)
- Check that products belong to current user
- Verify MongoDB connection

## Future Enhancements

- [ ] User profile management
- [ ] Product search and filtering
- [ ] Bulk operations
- [ ] Product categories
- [ ] Image uploads
- [ ] Export to CSV/PDF
- [ ] Advanced analytics
- [ ] Team collaboration
- [ ] API documentation (Swagger)
- [ ] Rate limiting

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact support.
