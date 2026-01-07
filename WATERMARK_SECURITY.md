# Beat Watermark & Security Features

## Overview

This document explains the watermark and audio quality reduction features implemented to protect beats from unauthorized use.

## Features Implemented

### 1. Watermark Audio (Front-Loaded)

- A watermark audio plays **BEFORE** the beat starts playing
- Default message: "This beat is secure by BeatMarket"
- **Generated entirely in the frontend** - no external URL needed
- Uses Web Speech API for natural text-to-speech synthesis
- Fallback to Web Audio API tone if speech synthesis unavailable
- Watermark plays once per beat load
- User must hear the watermark before the beat plays

### 2. Reduced BPM (Tempo Reduction)

- Unpurchased beats play at **85% playback speed**
- This reduces the BPM by ~15% making the beat less usable
- Full speed (100%) is only available for purchased/owned beats
- Users can still hear the quality but cannot use it professionally

### 3. Visual Indicator Badge

- A "🔒 Preview" badge displays when playing unpurchased beats
- Message appears: "This is a preview. Purchase to unlock the full beat."
- Clear visual distinction between preview and full versions

## Backend Requirements

### Beat Data Structure

The beat API responses should include these properties:

```json
{
  "id": 123,
  "title": "Beat Title",
  "fileUrl": "https://cloudinary.com/beat-full.mp3",
  "userId": 456,
  "isPurchased": false,
  "createdBy": 789
}
```

### Required Properties:

- **fileUrl**: Audio beat URL (plays at 100% for owned/purchased, 85% for others)
- **userId**: ID of the beat creator
- **isPurchased**: Boolean indicating if current user has purchased

### Optional Properties:

- **createdBy**: Alternative to userId to identify beat owner

## Watermark Generation (Frontend)

The watermark is **generated entirely in the frontend** using:

1. **Primary Method**: Web Speech API (Browser's built-in text-to-speech)

   - Message: "This beat is secure by BeatMarket"
   - Uses default browser voice (usually natural sounding)
   - Professional male/Google voice preferred when available

2. **Fallback Method**: Web Audio API (if speech synthesis unavailable)
   - Generates a 2-second tone-based watermark
   - Series of musical beeps (A4 → A5 → A4)
   - Fade-out envelope for smooth transition

- Volume: 70%

To use a custom watermark, upload an MP3 file and provide the URL in the beat data.

## How It Works

### Playback Sequence for Unpurchased Beats:

1. User clicks play on an unpurchased beat
2. Watermark audio plays (e.g., "This beat is secure by BeatMarket")
3. After watermark completes, the beat starts playing
4. Beat plays at 85% speed (slower BPM)
5. "🔒 Preview" badge is visible

### Owned/Purchased Beats

- Beat plays immediately at full speed (100%)
- No watermark plays
- No "Preview" badge
- User can download or use the beat

### Unpurchased Beats

1. Watermark audio plays first
2. Beat plays at reduced speed (85% tempo)
3. "Preview" badge displays
4. Message prompts user to purchase

## Implementation Details

### MusicPlayer.vue

- `isWatermarked` ref: Tracks if current beat is watermarked
- `watermarkPlayed` ref: Prevents duplicate watermark playback
- `loadAndPlayBeat()`: Main function handling beat playback logic
- `playWatermarkFirst()`: Generates and plays watermark using Web Speech API
- `playToneWatermark()`: Fallback tone-based watermark using Web Audio API
- `loadBeatAudio()`: Loads and plays the beat with adjusted playback speed
- **Playback Speed Control**: `audioPlayer.value.playbackRate = 0.85` for previews

### How Watermark Works:

1. **playWatermarkFirst()** is called when beat needs watermarking
2. Attempts to use browser's **Web Speech API**:
   - Creates SpeechSynthesisUtterance with message
   - Selects professional voice (Google/Microsoft/Male voice if available)
   - Speaks "This beat is secure by BeatMarket"
   - On completion, calls callback to load beat
3. If speech synthesis fails, **playToneWatermark()** is called:
   - Uses Web Audio API to create oscillator
   - Generates 2-second tone sequence
   - Smooth volume fade-out
   - Calls callback after tone completes

### Home.vue & MyBeats.vue

- `handlePlayBeat()`: Sets beat data with purchase info
- Checks if beat is owned by current user
- Includes purchase status in beat object
- **No watermarkUrl needed** - watermark generated in frontend

## Configuration

### To customize the watermark message:

1. Replace the text in the ElevenLabs API URL in `MusicPlayer.vue`
2. Or upload a custom watermark audio file
3. Include `watermarkUrl` in beat data from backend

### To change BPM reduction:

1. Edit the playback rate in `loadBeatAudio()` function
2. Change from 0.85 to your desired value
3. Lower value = more reduction

## Playback Speed Configuration

The playback speed for unpurchased beats is controlled by:

```javascript
audioPlayer.value.playbackRate = 0.85; // 85% = ~15% slower
```

To adjust the BPM reduction:

- 0.90 = 10% slower
- 0.85 = 15% slower (default)
- 0.80 = 20% slower
- 0.75 = 25% slower

Lower values mean more BPM reduction. Find the value in `MusicPlayer.vue` `loadBeatAudio()` function.

## API Endpoints Required

The backend API should expose or return:

- Beat details with all required properties
- User purchase history
- Watermark audio URL (if custom)
- Beat ownership information

## User Experience

**For Unpurchased Beats:**

1. Click play → Hears watermark → Beat plays slower → Can decide to purchase
2. Gets a preview of the beat quality
3. Cannot use it professionally (wrong BPM)
4. Encouraged to purchase for full version

**For Purchased/Owned Beats:**

1. Click play → Beat plays immediately at full speed
2. No watermark
3. Can download and use commercially

## Future Enhancements

1. **Dynamic Watermark**: Personalize with username
2. **Time-Limited Preview**: First 30 seconds only
3. **Visual Watermark**: Overlay with logo
4. **Direct Purchase**: Buy button in player
5. **Analytics**: Track preview vs. purchased plays
6. **Adjustable BPM Reduction**: Admin panel to set reduction level
