class ApiError extends Error {
  public status
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = "ApiError"
  }
}

export { ApiError };
