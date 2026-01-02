# Backend API Requirements for Complete Profile Feature

## New Endpoint Needed

### PUT /api/user/complete-profile

This endpoint should be created to handle the profile completion after user verification.

**Headers:**

```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "userRole": "ROLE_ARTIST" | "ROLE_BEATMAKER",
  "phone": "string (optional)"
}
```

**Response (200 OK):**

```json
{
  "message": "Profile completed successfully",
  "user": {
    "id": 123,
    "email": "user@example.com",
    "username": "username",
    "phone": "+1234567890",
    "profilePicture": "https://cloudinary.url/image.jpg",
    "userRole": "ROLE_ARTIST",
    "isVerified": true
  }
}
```

**Implementation Notes:**

1. **User Entity Update:**

   - The endpoint should update the `userRole` field in the User entity
   - The endpoint should update the `phone` field if provided
   - The endpoint should return the updated user object

2. **Symfony Controller Example:**

```php
#[Route('/api/user/complete-profile', name: 'complete_profile', methods: ['PUT'])]
public function completeProfile(Request $request, EntityManagerInterface $em): JsonResponse
{
    /** @var User $user */
    $user = $this->getUser();

    $data = json_decode($request->getContent(), true);

    // Validate role
    $allowedRoles = ['ROLE_ARTIST', 'ROLE_BEATMAKER'];
    if (isset($data['userRole']) && in_array($data['userRole'], $allowedRoles)) {
        $user->setRoles([$data['userRole']]);
    }

    // Update phone if provided
    if (isset($data['phone'])) {
        $user->setPhone($data['phone']);
    }

    $em->persist($user);
    $em->flush();

    return $this->json([
        'message' => 'Profile completed successfully',
        'user' => [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'phone' => $user->getPhone(),
            'profilePicture' => $user->getProfilePicture(),
            'userRole' => $user->getRoles()[0],
            'isVerified' => $user->isVerified()
        ]
    ]);
}
```

3. **User Discrimination:**

   - When the user selects "ROLE_ARTIST", the Doctrine discriminator should create/update an `Artist` entity
   - When the user selects "ROLE_BEATMAKER", the Doctrine discriminator should create/update a `Beatmaker` entity
   - The base `User` entity should be updated with the role and phone

4. **Existing Endpoints to Verify:**

   **POST /api/auth/verify** should return tokens after successful verification:

   ```json
   {
     "message": "Email verified successfully",
     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
     "refresh_token": "def50200..."
   }
   ```

## Frontend Flow

1. User signs up with email, username, password
2. User receives verification email
3. User enters verification code
4. Backend verifies email and returns access + refresh tokens
5. Frontend stores tokens and redirects to `/complete-profile`
6. User selects role (Artist/Beatmaker), adds phone, uploads profile picture
7. Frontend uploads profile picture to `POST /api/user/profile-picture` (if selected)
8. Frontend calls `PUT /api/user/complete-profile` with role and phone
9. User is redirected to home page with complete profile

## Profile Picture Flow

The profile picture is handled separately through the existing endpoint:

**POST /api/user/profile-picture**

- Content-Type: multipart/form-data
- Field name: "file"
- Returns: `{ "profilePicture": "https://cloudinary.url" }`

This is already implemented and working on the backend.
