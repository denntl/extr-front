export class MatchRule {
  constructor(rule, message) {
    this.rule = rule
    this.message = message
  }

  isValid(value) {
    if (!value) {
      return true
    }
    if (typeof value !== 'string') {
      this.errorMessage = 'Неверное значение'
      return false
    }
    if (value.length === 0) {
      return true
    }
    if (!value.match(this.rule)) {
      this.errorMessage = this.message
      return false
    }
    return true
  }
}
