# Queens Puzzle Backend

A simple backend service built with Node.js and Express for generating logic-based "Queens" puzzles. Designed to support a React Native front-end and optional daily challenge integration.

## 🧩 Features

- Generate puzzle boards with configurable grid sizes.
- Generate daily puzzle and save to firestore for history.

## 🔮 Future Plans

- **🗓️ Daily Puzzle Automation**  
  On every new day, auto-generate a puzzle and save to Firestore.  
  If today's puzzle already exists, skip generation. Served via `/daily-puzzle`.

- **☁️ Firestore Integration**  
  Store puzzles by date, grid size, and puzzle ID. Enables history, deduplication, and stats.

- **📥 Puzzle Validation Endpoint**  
  Accept client submissions, validate correctness, and optionally store attempt data.

- **📱 Firebase Functions Deployment**  
  Host backend as serverless functions in `asia-southeast1` for scalable, low-latency access.

- **👤 Firebase Auth Integration (Optional)**  
  Tie puzzle attempts to user accounts for personal stats, streaks, or access control.

- **📊 Admin Tool (Web)**  
  Manage puzzles, manually trigger new daily generations, and view usage analytics.

- **🧪 Generator Logic Testing**  
  Ensure all generated puzzles meet constraints, remain solvable, and test across edge cases.
