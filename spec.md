# ONE PIECE Guild Website

## Current State
New project with no existing application files.

## Requested Changes (Diff)

### Add
- Home page with animated dark gaming background, guild name "ONE PIECE", Guild UID 3049611812, motivational text, and a Join button
- Player Join Form page with fields: Player Name, UID, Game Level; stores to backend
- Chat system page: messages with username display, keyword bot auto-replies for "tournament" and "leader"
- Leader Section page: guild leader can post announcements visible to all members
- Tournament page: entry fee ₹50, prize details, registration form (no Stripe), payment instructions
- Complaint System page: form for complaints/support messages stored in backend
- Leaderboard page: registered players ranked by game level

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend (Motoko):
   - Store players (name, uid, gameLevel, timestamp)
   - Store chat messages (sender, text, timestamp)
   - Store announcements (title, body, timestamp)
   - Store tournament registrations (name, uid, gameLevel, paymentNote)
   - Store complaints (username, message, timestamp)
   - Leaderboard query: return players sorted by gameLevel descending
   - Chat bot logic in frontend (keyword detection)

2. Frontend:
   - Navigation bar with links to all pages
   - Dark red/black theme, glow effects, gaming fonts
   - Fully mobile responsive
   - Animated hero section on home
   - All forms wired to backend actors
   - Leaderboard pulls and ranks players by level
   - Chat polls for new messages
