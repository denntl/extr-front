export class EqualRule {
  constructor(target, message) {
    this.target = target
    this.message = message ? message : 'Значения должны совпадать'
  }

  isValid(value, values) {
    if (typeof value === 'string' && value.length === 0) {
      return true
    }
    if (value !== values[this.target]) {
      this.errorMessage = this.message
      return false
    }
    return true
  }
}
