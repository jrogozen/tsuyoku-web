const localStorage = function localStorage () {
  let storage = {}

  return {
    setItem: function(key, value) {
      storage[key] = value || ''
    },
    getItem: function(key) {
      return storage[key] || null
    },
    removeItem: function(key) {
      delete storage[key]
    },
    get length() {
      return Object.keys(storage).length
    },
    key: function(i) {
      const keys = Object.keys(storage)
      return keys[i] || null
    },
    reset: function() {
      storage = {}
    }
  }
}

export function mockLocalStorage() {
  window.localStorage = localStorage()
}