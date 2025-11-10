# Hashing Techniques Demo

## Quick Start Demo

1. **Start the application:**
   - Run `npm run dev` or double-click `start.bat`
   - Open http://localhost:3000

2. **Try these demo scenarios:**

### Scenario 1: Basic Insertion
- Set table size to 7
- Insert values: 15, 22, 8
- Notice how 15 and 22 collide (both hash to index 1)
- Compare how different methods handle this collision

### Scenario 2: Clustering Effect
- Reset tables (size 10)
- Insert: 10, 20, 30, 11, 21
- See how Linear Probing creates clusters
- Compare with Quadratic Probing's better distribution

### Scenario 3: Load Factor Impact
- Start with small table (size 5)
- Insert many values: 1, 6, 11, 16, 21, 26
- Watch collision counts increase
- See how different methods perform under high load

## Method Comparison Examples

### Example 1: Hash Table Size 7, Insert [15, 22, 8, 29]

**Values and their hash1 results:**
- 15 % 7 = 1
- 22 % 7 = 1 (collision with 15)
- 8 % 7 = 1 (collision with 15, 22)
- 29 % 7 = 1 (collision with all above)

**How each method handles this:**

**Chaining:**
```
Index 0: []
Index 1: [15, 22, 8, 29]  ← All values in chain
Index 2: []
...
```

**Linear Probing:**
```
Index 0: null
Index 1: 15     ← First value
Index 2: 22     ← 22 probes to next slot
Index 3: 8      ← 8 probes to next available
Index 4: 29     ← 29 probes to next available
...
```

**Quadratic Probing:**
```
Index 0: null
Index 1: 15     ← First value
Index 2: 22     ← 22 probes: (1+1²)%7 = 2
Index 5: 8      ← 8 probes: (1+2²)%7 = 5
Index 3: 29     ← 29 probes: (1+3²)%7 = 3
...
```

**Double Hashing:**
```
Index 0: null
Index 1: 15     ← First value
Index 4: 22     ← 22: step=7-(22%7)=6, (1+1*6)%7=0→7%7=0, try (1+2*6)%7=13%7=6, try (1+3*6)%7=19%7=5, try (1+4*6)%7=25%7=4
Index 6: 8      ← 8: step=7-(8%7)=6, (1+1*6)%7=0→7%7=0, occupied, try (1+2*6)%7=13%7=6
Index 2: 29     ← 29: step=6, finds slot at index 2
...
```

## Performance Observations

### Chaining
- ✅ Never fails to insert
- ✅ Simple to implement
- ❌ Extra memory for pointers
- ❌ Poor cache performance

### Linear Probing
- ✅ Good cache performance
- ✅ Simple implementation
- ❌ Creates clustering
- ❌ Performance degrades with high load

### Quadratic Probing
- ✅ Reduces clustering
- ✅ Better than linear probing
- ❌ May not find empty slots
- ❌ Complex deletion

### Double Hashing
- ✅ Best distribution
- ✅ Minimal clustering
- ❌ More complex
- ❌ Requires good second hash function

## Interactive Features to Try

1. **Insert to All Methods:** Use this to see how the same value is handled differently
2. **Search Functionality:** See how search performance varies by method
3. **Load Factor Monitoring:** Watch how performance changes as table fills up
4. **Collision Counting:** Compare collision rates between methods
5. **Table Size Adjustment:** See how table size affects collision patterns

## Educational Insights

- **Hash Functions:** All methods use the same primary hash function (key % size)
- **Collision Resolution:** The key difference is how collisions are handled
- **Performance Trade-offs:** Each method has different time/space trade-offs
- **Real-world Usage:** Different methods suit different applications