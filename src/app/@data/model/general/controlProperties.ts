export interface ControlProperties {
    // Common Properties
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
  
    // Styling
    class?: string;
    style?: any;
  
    // Events
    onChange?: (event: any) => void;
    onBlur?: (event: any) => void;
    onFocus?: (event: any) => void;
  
    // Additional Properties Based on Control Type
    // For Input Text
    maxLength?: number;
    minLength?: number;
  
    // For Checkbox
    checked?: boolean;
  
    // For Select Dropdown
    options?: any[]; // Array of objects with 'value' and 'label' properties
  
    // For Date Picker
    dateFormat?: string;
  
    // For File Input
    accept?: string;
  
    // Add more properties based on specific control requirements...
  }
  