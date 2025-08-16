export enum ModalType {
  WARNING = 'WARNING',
  INFO = 'INFO',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  CONFIRMATION = 'CONFIRMATION',
  QUESTION = 'QUESTION',
  CUSTOM1 = 'CUSTOM1', // Add custom types as needed
  CUSTOM2 = 'CUSTOM2',
  CUSTOM3 = 'CUSTOM3',
  CUSTOM4 = 'CUSTOM4',
  // Add more custom types as needed
}
function getIndexForModalType(modalType: ModalType): number {
  const keys = Object.keys(ModalType); // Get all keys of the enum
  const index = keys.indexOf(modalType); // Find the index of the provided modalType
  return index;
}