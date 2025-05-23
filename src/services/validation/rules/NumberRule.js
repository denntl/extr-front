export class NumberRule {
  constructor(min, max, allowFloat = false) {
    this.min = min
    this.max = max
    this.allowFloat = allowFloat
  }

  isValid(value) {
    if (value === undefined || value === null) {
      return true
    }

    const parsed = this.allowFloat ? parseFloat(value) : parseInt(value)
    if (isNaN(parsed)) {
      this.errorMessage = 'Неверное значение'
      return false
    }
    if (value < this.min || value > this.max) {
      this.errorMessage = `Значение должно быть между ${this.min} и ${this.max}`
      return false
    }
    return true
  }
}
