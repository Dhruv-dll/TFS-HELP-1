# Data File Editing Guide

The website now reads data directly from JSON files in the `/data` folder. You can manage all content by editing these files directly in GitHub.

## File Structure Overview

### 1. **data/sponsors.json** - Sponsors Management

Edit to add/remove/update sponsors displayed on the website.

```json
{
  "sponsors": [
    {
      "id": "unique-sponsor-id",
      "name": "Sponsor Name",
      "logo": "https://your-image-url.com/logo.png",
      "industry": "Banking",
      "description": "Brief description of the sponsor",
      "website": "https://website.com",
      "isActive": true
    }
  ],
  "lastModified": 1757600810272
}
```

**Fields:**

- `id`: Unique identifier (use lowercase with hyphens, e.g., "icici-bank")
- `name`: Sponsor's full name
- `logo`: URL to sponsor logo image
- `industry`: Industry category (e.g., Banking, Finance, Education)
- `description`: Brief description of the sponsor
- `website`: Optional website URL
- `isActive`: Set to `true` to display sponsor, `false` to hide
- `lastModified`: Auto-update timestamp (leave as-is)

---

### 2. **data/sessions.json** - Conclave Sessions & Speakers

Edit to add/remove/update conference sessions and their speakers.

```json
{
  "sessions": [
    {
      "id": "session-unique-id",
      "name": "Session Title",
      "description": "Session description",
      "startTime": "10:00 AM",
      "endTime": "11:30 AM",
      "speakers": [
        {
          "id": "speaker-unique-id",
          "name": "Speaker Name",
          "linkedinId": "linkedin-username",
          "photo": "https://image-url.com/photo.jpg",
          "bio": "Speaker biography",
          "startTime": "10:00 AM",
          "endTime": "10:45 AM"
        }
      ],
      "createdAt": 1757600810272,
      "isActive": true
    }
  ],
  "lastModified": 1757600810272
}
```

**Session Fields:**

- `id`: Unique session identifier
- `name`: Session title
- `description`: Session description
- `startTime`: Session start time (e.g., "10:00 AM")
- `endTime`: Session end time (e.g., "11:30 AM")
- `speakers`: Array of speaker objects
- `createdAt`: Creation timestamp
- `isActive`: Set to `true` to display session, `false` to hide

**Speaker Fields:**

- `id`: Unique speaker identifier
- `name`: Speaker's full name
- `linkedinId`: LinkedIn profile username (without the URL)
- `photo`: URL to speaker's photo
- `bio`: Speaker biography
- `startTime`: Speaker's talk start time (within session)
- `endTime`: Speaker's talk end time (within session)

---

### 3. **data/magazines.json** - Finsight Magazine Editions

Edit to add/remove/update magazine editions and articles.

```json
{
  "magazines": [
    {
      "id": "magazine-unique-id",
      "title": "Magazine Title",
      "edition": "Edition Name",
      "description": "Magazine description",
      "cover": "https://image-url.com/cover.jpg",
      "articles": 12,
      "downloads": 450,
      "readTime": "25 mins",
      "categories": ["Category1", "Category2", "Category3"],
      "highlights": ["Article 1", "Article 2", "Article 3"],
      "link": "https://link-to-magazine.com",
      "isActive": true
    }
  ],
  "lastModified": 1757600810272
}
```

**Fields:**

- `id`: Unique magazine identifier
- `title`: Magazine title
- `edition`: Edition name/number
- `description`: Magazine description
- `cover`: URL to cover image
- `articles`: Number of articles in this edition
- `downloads`: Number of downloads (update manually)
- `readTime`: Average read time (e.g., "25 mins")
- `categories`: Array of category tags
- `highlights`: Array of main article titles
- `link`: URL to access the magazine
- `isActive`: Set to `true` to display, `false` to hide

---

### 4. **data/luminaries.json** - Faculty & Leadership

Edit to add/remove/update faculty members and leadership team members.

```json
{
  "faculty": [
    {
      "id": "faculty-unique-id",
      "name": "Dr. Name",
      "title": "Position Title",
      "bio": "Full biography",
      "image": "https://image-url.com/photo.jpg",
      "email": "email@example.com",
      "linkedin": "linkedin-username",
      "achievements": ["Achievement 1", "Achievement 2"],
      "expertise": ["Expertise 1", "Expertise 2"],
      "quote": "Inspirational quote"
    }
  ],
  "leadership": [
    {
      "id": "leader-unique-id",
      "name": "Name",
      "title": "Position Title",
      "bio": "Full biography",
      "image": "https://image-url.com/photo.jpg",
      "email": "email@example.com",
      "linkedin": "linkedin-username",
      "achievements": ["Achievement 1", "Achievement 2"],
      "expertise": ["Expertise 1", "Expertise 2"],
      "quote": "Inspirational quote",
      "isLeadership": true
    }
  ],
  "lastModified": 1757600810272
}
```

**Fields (same for both faculty and leadership):**

- `id`: Unique identifier
- `name`: Full name
- `title`: Position/title
- `bio`: Full biography
- `image`: URL to profile photo
- `email`: Email address
- `linkedin`: LinkedIn username (without URL)
- `achievements`: Array of achievements/certifications
- `expertise`: Array of areas of expertise
- `quote`: Inspirational or relevant quote
- `isLeadership`: (leadership only) Set to `true` for leadership members

---

### 5. **data/events.json** - Past & Upcoming Events

Edit to add/remove/update past events and upcoming events.

```json
{
  "pastEvents": {
    "saturday-sessions": {
      "events": [
        {
          "title": "Event Title",
          "description": "Event description"
        }
      ],
      "comingSoon": false
    },
    "networking-events": {
      "events": [],
      "comingSoon": true
    },
    "flagship-event": {
      "events": [],
      "comingSoon": true
    }
  },
  "upcomingEvents": [
    {
      "id": "event-unique-id",
      "title": "Event Title",
      "date": "2024-03-15",
      "time": "10:00 AM",
      "location": "Event Location",
      "description": "Event description",
      "registrationLink": "https://registration-link.com",
      "countdown": {
        "days": 45,
        "hours": 12,
        "minutes": 30
      }
    }
  ],
  "lastModified": 1757600810272
}
```

**Past Events Structure:**

- Under `pastEvents`, you have three categories: `saturday-sessions`, `networking-events`, `flagship-event`
- Each has `events` (array) and `comingSoon` (boolean)
- Event object: `title` and optional `description`

**Upcoming Events Fields:**

- `id`: Unique event identifier
- `title`: Event title
- `date`: Event date (YYYY-MM-DD format)
- `time`: Event time (e.g., "10:00 AM")
- `location`: Event location
- `description`: Event description
- `registrationLink`: URL to registration page
- `countdown`: Days, hours, minutes until event (update manually or leave as-is)

---

## How to Edit Files

1. Go to your GitHub repository
2. Navigate to the `data` folder
3. Click on the file you want to edit (e.g., `sponsors.json`)
4. Click the ✏️ **Edit** button
5. Make your changes using valid JSON syntax
6. Scroll down and click **Commit changes**
7. The website will automatically reflect your changes within seconds

## Important Notes

- ✅ Always use **valid JSON syntax** - use a JSON validator if unsure
- ✅ Use **proper quotes** - JSON requires double quotes `"`, not single quotes `'`
- ✅ **Image URLs** - Use full URLs starting with `https://`
- ✅ **IDs** - Keep them unique and consistent (use lowercase with hyphens)
- ✅ **Active flag** - Set `isActive: true` to show items, `false` to hide
- ✅ **Timestamps** - Leave `lastModified` as-is, it auto-updates
- ❌ Don't remove the `lastModified` field or change the main array names

## Example: Adding a New Sponsor

1. Edit `data/sponsors.json`
2. Find the `sponsors` array
3. Add a new sponsor object before the closing bracket `]`:

```json
{
  "id": "new-sponsor-bank",
  "name": "New Bank Ltd",
  "logo": "https://example.com/logo.png",
  "industry": "Banking",
  "description": "A leading financial institution",
  "website": "https://newbank.com",
  "isActive": true
}
```

4. Commit the changes
5. Done! The new sponsor will appear on the website

## Troubleshooting

- **JSON Syntax Error**: Make sure all strings are in double quotes and commas are properly placed
- **Image not showing**: Verify the image URL is correct and publicly accessible
- **Changes not appearing**: Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R) or wait a few seconds
- **Missing field**: Check that all required fields are present in your JSON object

---

**That's it!** You now have full control over your website content through simple JSON editing.
