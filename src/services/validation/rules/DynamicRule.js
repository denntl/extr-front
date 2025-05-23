export class DynamicRule {
  constructor(callback, message) {
    this.callback = callback
    this.message = message
  }

  isValid(value, values) {
    if (!value) {
      return true
    }
    if (!this.callback(value, values)) {
      this.errorMessage = this.message
      return false
    }
    return true
  }
}
