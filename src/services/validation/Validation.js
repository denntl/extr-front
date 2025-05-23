export class Validation {
  constructor(rules) {
    this.rules = rules
    this.errors = {}
  }

  validate(values) {
    let valid = true
    Object.keys(values).forEach((key) => {
      const value = values[key]
      if (!this.rules[key]) {
        return
      }
      this.rules[key].every((rule) => {
        if (!rule.isValid(value, values)) {
          this.errors[key] = rule.errorMessage
          valid = false
          return false
        }
        return true
      })
    })
    return valid
  }
}
