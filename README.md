# Hashing Techniques Comparison Project

A comprehensive web application that demonstrates and compares different hashing collision resolution techniques with visual representations.

## Features

- **Four Hashing Methods:**
  - Chaining (Separate Chaining)
  - Linear Probing
  - Quadratic Probing
  - Double Hashing

- **Interactive Operations:**
  - Insert numbers into hash tables
  - Search for values
  - Visual representation of hash tables
  - Real-time collision tracking
  - Load factor calculation

- **Comparison Tools:**
  - Side-by-side method comparison
  - Performance metrics
  - Collision statistics
  - Efficiency calculations

## Technology Stack

- **Frontend:** React.js with modern CSS
- **Backend:** Node.js with Express
- **Visualization:** Custom CSS grid layout
- **API:** RESTful endpoints

## Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - React frontend on http://localhost:3000

## Usage

1. **Select a hashing method** from the top buttons
2. **Set table size** (5-20 slots)
3. **Insert numbers** using the input field and Insert button
4. **Search for values** to see how each method handles lookups
5. **Use "Insert to All"** to compare how the same value is handled across all methods
6. **View the comparison panel** to see performance metrics

## Hash Table Methods Explained

### Chaining
- Uses linked lists at each table index
- Multiple values can exist at the same index
- No limit on number of elements (except memory)
- Best for high load factors

### Linear Probing
- Searches sequentially for next available slot
- Simple implementation
- Can cause clustering
- Good cache performance

### Quadratic Probing
- Uses quadratic function (i²) to find next slot
- Reduces clustering compared to linear probing
- May not find slot even if table isn't full
- Better distribution than linear probing

### Double Hashing
- Uses second hash function for step size
- Best distribution among open addressing methods
- More complex but efficient
- Avoids clustering effectively

## API Endpoints

- `POST /api/reset` - Reset all hash tables
- `POST /api/insert/:method` - Insert value into specific method
- `GET /api/search/:method/:value` - Search for value
- `GET /api/table/:method` - Get table state
- `GET /api/compare` - Get comparison statistics

## Project Structure

```
├── server/
│   ├── index.js          # Express server
│   └── hashTable.js      # Hash table implementations
├── client/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.js        # Main application
│   │   └── App.css       # Styling
│   └── public/           # Static files
└── package.json          # Project configuration
```

## Performance Metrics

The application tracks:
- **Collisions:** Number of times a slot was already occupied
- **Load Factor:** Ratio of inserted elements to table size
- **Efficiency:** Success rate of insertions without collisions

## Educational Value

This project helps understand:
- Hash function behavior
- Collision resolution strategies
- Performance trade-offs between methods
- Load factor impact on performance
- Real-world hashing applications# Hashing-Techniques
