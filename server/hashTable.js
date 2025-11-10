class HashTable {
  constructor(size = 10, method = 'chaining') {
    this.size = size;
    this.method = method;
    this.table = new Array(size);
    this.collisions = 0;
    this.insertedCount = 0;
    
    // Initialize based on method
    if (method === 'chaining') {
      this.table = this.table.fill(null).map(() => []);
    } else {
      this.table.fill(null);
    }
  }

  // Primary hash function
  hash1(key) {
    return key % this.size;
  }

  // Secondary hash function for double hashing
  hash2(key) {
    return 7 - (key % 7);
  }

  insert(value) {
    const steps = [];
    let collisionOccurred = false;

    switch (this.method) {
      case 'chaining':
        return this.insertChaining(value, steps);
      case 'linearProbing':
        return this.insertLinearProbing(value, steps);
      case 'quadraticProbing':
        return this.insertQuadraticProbing(value, steps);
      case 'doubleHashing':
        return this.insertDoubleHashing(value, steps);
      default:
        throw new Error('Invalid hashing method');
    }
  }

  insertChaining(value, steps) {
    const index = this.hash1(value);
    steps.push({ index, action: 'hash', value });

    if (this.table[index].length > 0) {
      this.collisions++;
      steps.push({ index, action: 'collision', message: 'Collision detected, adding to chain' });
    }

    this.table[index].push(value);
    this.insertedCount++;
    
    return {
      success: true,
      index,
      steps,
      collisions: this.collisions,
      loadFactor: this.getLoadFactor()
    };
  }

  insertLinearProbing(value, steps) {
    let index = this.hash1(value);
    const originalIndex = index;
    steps.push({ index, action: 'hash', value });

    while (this.table[index] !== null) {
      this.collisions++;
      steps.push({ index, action: 'collision', message: 'Slot occupied, probing next' });
      index = (index + 1) % this.size;
      
      if (index === originalIndex) {
        throw new Error('Hash table is full');
      }
    }

    this.table[index] = value;
    this.insertedCount++;
    steps.push({ index, action: 'insert', value });

    return {
      success: true,
      index,
      steps,
      collisions: this.collisions,
      loadFactor: this.getLoadFactor()
    };
  }

  insertQuadraticProbing(value, steps) {
    let index = this.hash1(value);
    const originalIndex = index;
    let i = 0;
    steps.push({ index, action: 'hash', value });

    while (this.table[index] !== null) {
      this.collisions++;
      steps.push({ index, action: 'collision', message: `Slot occupied, quadratic probe i=${i}` });
      i++;
      index = (originalIndex + i * i) % this.size;
      
      if (i >= this.size) {
        throw new Error('Hash table is full or no suitable slot found');
      }
    }

    this.table[index] = value;
    this.insertedCount++;
    steps.push({ index, action: 'insert', value });

    return {
      success: true,
      index,
      steps,
      collisions: this.collisions,
      loadFactor: this.getLoadFactor()
    };
  }

  insertDoubleHashing(value, steps) {
    let index = this.hash1(value);
    const step = this.hash2(value);
    const originalIndex = index;
    let i = 0;
    steps.push({ index, action: 'hash', value, step });

    while (this.table[index] !== null) {
      this.collisions++;
      steps.push({ index, action: 'collision', message: `Slot occupied, double hash step=${step}` });
      i++;
      index = (originalIndex + i * step) % this.size;
      
      if (i >= this.size) {
        throw new Error('Hash table is full');
      }
    }

    this.table[index] = value;
    this.insertedCount++;
    steps.push({ index, action: 'insert', value });

    return {
      success: true,
      index,
      steps,
      collisions: this.collisions,
      loadFactor: this.getLoadFactor()
    };
  }

  search(value) {
    const steps = [];

    switch (this.method) {
      case 'chaining':
        return this.searchChaining(value, steps);
      case 'linearProbing':
        return this.searchLinearProbing(value, steps);
      case 'quadraticProbing':
        return this.searchQuadraticProbing(value, steps);
      case 'doubleHashing':
        return this.searchDoubleHashing(value, steps);
      default:
        return { found: false, steps };
    }
  }

  searchChaining(value, steps) {
    const index = this.hash1(value);
    steps.push({ index, action: 'hash', value });

    const chain = this.table[index];
    const found = chain.includes(value);
    
    steps.push({ 
      index, 
      action: found ? 'found' : 'not_found', 
      message: found ? 'Value found in chain' : 'Value not in chain' 
    });

    return { found, index, steps };
  }

  searchLinearProbing(value, steps) {
    let index = this.hash1(value);
    const originalIndex = index;
    steps.push({ index, action: 'hash', value });

    while (this.table[index] !== null) {
      if (this.table[index] === value) {
        steps.push({ index, action: 'found', value });
        return { found: true, index, steps };
      }
      
      steps.push({ index, action: 'probe', message: 'Value not here, probing next' });
      index = (index + 1) % this.size;
      
      if (index === originalIndex) break;
    }

    steps.push({ index, action: 'not_found', message: 'Value not found' });
    return { found: false, steps };
  }

  searchQuadraticProbing(value, steps) {
    let index = this.hash1(value);
    const originalIndex = index;
    let i = 0;
    steps.push({ index, action: 'hash', value });

    while (this.table[index] !== null && i < this.size) {
      if (this.table[index] === value) {
        steps.push({ index, action: 'found', value });
        return { found: true, index, steps };
      }
      
      steps.push({ index, action: 'probe', message: `Value not here, quadratic probe i=${i}` });
      i++;
      index = (originalIndex + i * i) % this.size;
    }

    steps.push({ index, action: 'not_found', message: 'Value not found' });
    return { found: false, steps };
  }

  searchDoubleHashing(value, steps) {
    let index = this.hash1(value);
    const step = this.hash2(value);
    const originalIndex = index;
    let i = 0;
    steps.push({ index, action: 'hash', value, step });

    while (this.table[index] !== null && i < this.size) {
      if (this.table[index] === value) {
        steps.push({ index, action: 'found', value });
        return { found: true, index, steps };
      }
      
      steps.push({ index, action: 'probe', message: `Value not here, double hash step=${step}` });
      i++;
      index = (originalIndex + i * step) % this.size;
    }

    steps.push({ index, action: 'not_found', message: 'Value not found' });
    return { found: false, steps };
  }

  getLoadFactor() {
    return (this.insertedCount / this.size).toFixed(2);
  }

  getStats() {
    return {
      method: this.method,
      size: this.size,
      insertedCount: this.insertedCount,
      collisions: this.collisions,
      loadFactor: this.getLoadFactor()
    };
  }

  getState() {
    return {
      table: this.table,
      stats: this.getStats()
    };
  }
}

module.exports = HashTable;