export class DomainRule {
  isValid(value) {
    if (typeof value === 'string' && value.length === 0) {
      this.errorMessage = 'Неверный формат домена'
      return false
    }
    if (!value && typeof value !== 'number') {
      this.errorMessage = 'Неверный формат домена'
      return false
    }
    const domainPattern = /^(?!:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?![0-9]*$)[a-z0-9-]+\.?)$/i
    if (!domainPattern.test(value)) {
      this.errorMessage = 'Неверный формат домена'
      return false
    }
    return true
  }
}
