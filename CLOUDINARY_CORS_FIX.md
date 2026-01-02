# Cloudinary CORS Configuration Fix

## Problem

The audio files from Cloudinary are being blocked by the browser with this error:

```
MEDIA_ELEMENT_ERROR: Media load rejected by URL safety check
```

## Solution 1: Configure CORS on Cloudinary (Recommended)

1. Log in to your Cloudinary Dashboard: https://cloudinary.com/console
2. Go to **Settings** > **Security**
3. Find the **Allowed fetch domains** section
4. Add your frontend domain(s):

   - `http://localhost:5173` (development)
   - `http://localhost:3000` (if using different port)
   - Your production domain (e.g., `https://beatmarket.com`)

5. Go to **Settings** > **Upload** > **Upload presets**
6. Edit your upload preset and ensure these settings:
   - **Access mode**: `public`
   - **Delivery type**: `upload`

## Solution 2: Add CORS Headers in Symfony Backend

Add a proxy endpoint in your Symfony backend to serve the audio files:

```php
#[Route('/api/beats/{id}/stream', name: 'stream_beat', methods: ['GET'])]
public function streamBeat(int $id): Response
{
    $beat = $this->em->getRepository(Beat::class)->find($id);

    if (!$beat) {
        return $this->json(['error' => 'Beat not found'], Response::HTTP_NOT_FOUND);
    }

    // Get the Cloudinary URL
    $audioUrl = $beat->getAudioFile();

    // Fetch the file content
    $fileContent = file_get_contents($audioUrl);

    $response = new Response($fileContent);
    $response->headers->set('Content-Type', 'audio/mpeg');
    $response->headers->set('Accept-Ranges', 'bytes');
    $response->headers->set('Access-Control-Allow-Origin', '*');
    $response->headers->set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Range');

    return $response;
}
```

Then update the frontend to use this endpoint instead of direct Cloudinary URLs.

## Solution 3: Use Cloudinary's Signed URLs

If your beats should be protected, use signed URLs with temporary access tokens.

## Testing

After implementing one of the solutions, test by:

1. Opening the browser console
2. Clicking on a beat to play
3. Checking that the audio loads without CORS errors
4. Verifying playback works correctly

## Current Error Details

- Error Code: 4 (MEDIA_ERR_SRC_NOT_SUPPORTED)
- Message: "Media load rejected by URL safety check"
- Cloudinary URL format: `https://res.cloudinary.com/{cloud_name}/video/upload/{public_id}.mp3`
