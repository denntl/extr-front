export class EmailRule {
  isValid(value) {
    if (typeof value === 'string' && value.length === 0) {
      this.errorMessage = 'Неверный формат email'
      return false
    }
    if (!value && typeof value !== 'number') {
      this.errorMessage = 'Неверный формат email'
      return false
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(value)) {
      this.errorMessage = 'Неверный формат email'
      return false
    }
    return true
  }
}
