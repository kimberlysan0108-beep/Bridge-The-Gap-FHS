# Franklin Resource Hub

## Overview
Franklin Resource Hub is a static web application designed to help Franklin High School students find college resources, scholarships, and opportunities. The site features a clean, modern interface with dynamic content loading from Google Sheets.

**Current Status**: Fully functional and ready to use in Replit environment.

## Recent Changes (October 20, 2025)
- Migrated from deprecated Tabletop.js to modern OpenSheet API for Google Sheets integration
- Made the data rendering flexible to work with various column header names
- Configured Node.js http-server for hosting on port 5000
- Set up deployment configuration for autoscale hosting
- Added project documentation

## Project Architecture

### Technology Stack
- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks)
- **Styling**: Custom CSS with Poppins font
- **Data Source**: Google Sheets via OpenSheet API (modern, no-auth solution)
- **Server**: http-server (Node.js package for static file serving)

### File Structure
```
.
├── index.html          # Main HTML page
├── style.css           # All styling
├── script.js           # JavaScript logic and Google Sheets integration
├── resources.json      # Fallback/example resource data
├── package.json        # Node.js dependencies
└── replit.md          # This documentation file
```

### Features
1. **College Help Tab**: Displays Franklin High School Newspaper link and college resources
2. **Opportunities Tab**: Dynamically loads opportunities from Google Sheets
3. **Scholarships Tab**: Dynamically loads scholarships from Google Sheets
4. **AI Assistant (beta)**: Placeholder feature for future AI-powered search

### Google Sheets Integration
The app uses the OpenSheet API to fetch data from two Google Sheets:
- **Scholarships Sheet**: ID `1sfVjLdfJOFRxypFi1rHpDDulk0525u0SQK89_-_b5OM`
  - URL: https://docs.google.com/spreadsheets/d/1sfVjLdfJOFRxypFi1rHpDDulk0525u0SQK89_-_b5OM/edit
- **Resources/Opportunities Sheet**: ID `1ZT0ZYqoTlE-NOYZVRPMtHxoubZm-1GrMUzj2w02CI0I`
  - URL: https://docs.google.com/spreadsheets/d/1ZT0ZYqoTlE-NOYZVRPMtHxoubZm-1GrMUzj2w02CI0I/edit

**Important Setup Requirements:**
1. Both Google Sheets MUST be set to "Anyone with the link can view" (Share button → Change to "Anyone with the link")
2. The first row of each sheet should contain column headers
3. The code flexibly handles various column names, supporting:
   - **Title/Name**: Task, Title, Name (for the scholarship/opportunity name)
   - **Description**: Desc, Description, Notes (for details)
   - **Link/URL**: Link, URL (for application/website links)
   - **Deadline**: Deadline, Due date, DueDate, Date (for application deadlines)
   - **Optional fields**: Status, Area, Category, Grade, Grade Level, Image, Emoji

**API Endpoints:**
- Scholarships: `https://opensheet.elk.sh/1sfVjLdfJOFRxypFi1rHpDDulk0525u0SQK89_-_b5OM/1`
- Opportunities: `https://opensheet.elk.sh/1ZT0ZYqoTlE-NOYZVRPMtHxoubZm-1GrMUzj2w02CI0I/1`

## Running the Project

### Development
The workflow is already configured. The server runs on port 5000 and serves all static files.

**Command**: `npx http-server -p 5000 -a 0.0.0.0 --cors`

### Deployment
The deployment is configured for autoscale hosting, which is ideal for static websites. When you publish the project, it will automatically use the same http-server setup.

## User Preferences
None documented yet.

## Notes
- The AI Assistant feature is currently a placeholder with mock responses
- OpenSheet API has a 30-second cache, so changes to Google Sheets may take up to 30 seconds to appear
- The site uses CORS-enabled serving to allow external resource loading
- Resources can be managed by editing the Google Sheets directly
- If sheets don't load, verify they are publicly accessible via "Anyone with the link can view"
