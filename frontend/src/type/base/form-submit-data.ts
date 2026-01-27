export default interface FormSubmitData<T> {
  errors?: any,
  initValue?: T,
  serverError?: {
    success: boolean,
    message: string
  },
}