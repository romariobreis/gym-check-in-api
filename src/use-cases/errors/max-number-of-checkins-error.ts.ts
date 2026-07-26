export class MaxNumberOfCheckInError extends Error {
  constructor() {
    super('Max number of checkins reached.')
  }
}