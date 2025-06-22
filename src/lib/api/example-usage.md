# API Usage Examples

## Your API Response Structure

### Success Response
```json
{
  "data": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "message": "User profile fetched successfully",
  "statusCode": 200
}
```

### Error Response (empty data)
```json
{
  "message": "Invalid credentials",
  "statusCode": 401
}
```

## Authentication Flow

### 1. Sign In
```typescript
// API Call: POST /auth/login
// Body: { email, password }
// Returns: { accessToken: "jwt-token" }

const { signInMutation } = useSignIn()
signInMutation.mutate({ email: "user@example.com", password: "password123" })
```

### 2. Sign Up
```typescript
// API Call: POST /auth/register  
// Body: { email, password, name: "First Last" }
// Returns: { accessToken: "jwt-token" }

const { signUpMutation } = useSignUp()
signUpMutation.mutate({ 
  firstName: "John", 
  lastName: "Doe", 
  email: "john@example.com", 
  password: "password123",
  confirmPassword: "password123"
})
```

### 3. Get Current User
```typescript
// API Call: GET /auth/me (with Bearer token)
// Returns: { id, name, email }

const { user, isLoading } = useAuth()
// user will be null if not authenticated
// user will contain { id, name, email } if authenticated
```

## Environment Setup

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Token Storage

- Tokens are automatically stored in `localStorage` as `auth_token`
- Automatically added to all API requests as `Authorization: Bearer <token>`
- Automatically cleared on 401 responses and redirected to sign-in 