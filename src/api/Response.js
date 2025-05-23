export default class Response {
  constructor(status, data) {
    this.status = status
    this.message = data.message ?? ''

    if (status !== 200) {
      this.errors = data.errors ?? []
    }
    this.data = data

    return new Proxy(this, {
      get(target, prop) {
        if (prop in target.data) {
          return target.data[prop]
        }
        return target[prop]
      },
    })
  }

  get(field) {
    return this.data[field] ?? null
  }

  isSuccess() {
    return this.status === 200
  }

  hasValidationErrors() {
    return this.status === 400 || this.status === 422
  }

  getValidationErrors() {
    return this.data
  }

  getErrors() {
    return this.errors
  }
}
