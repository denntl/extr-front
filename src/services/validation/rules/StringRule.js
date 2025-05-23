export class StringRule {
  constructor(min, max) {
    this.min = min
    this.max = max
  }
  isValid(value) {
    if (!value) {
      return true
    }
    if (typeof value !== 'string') {
      this.errorMessage = 'Неверное значение'
      return false
    }
    const rule = new RegExp(`^.{${this.min},${this.max}}$`, 'i')
    if (!value.match(rule)) {
      this.errorMessage = `От ${this.min} до ${this.max} символов`
      return false
    }
    return true
  }
}
