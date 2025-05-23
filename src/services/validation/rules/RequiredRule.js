export class RequiredRule {
  isValid(value) {
    if (typeof value === 'string' && value.length === 0) {
      this.errorMessage = 'Обязательно для заполнения'
      return false
    }
    if (Array.isArray(value) && value.length === 0) {
      this.errorMessage = 'Обязательно для заполнения'
      return false
    }
    if (!value && typeof value !== 'number') {
      this.errorMessage = 'Обязательно для заполнения'
      return false
    }
    return true
  }
}
