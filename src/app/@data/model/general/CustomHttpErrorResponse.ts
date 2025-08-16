export class CustomHttpErrorResponse {
    headers?: {
      normalizedNames?: {};
      lazyUpdate?: null;
    };
    status?: number;
    statusText?: string;
    url?: string;
    ok?: boolean;
    name?: string;
    message?: string;
    error?: {
      timestamp?: string;
      errors?: string[];
      status?: number;
      message?: string;
    };
  
    constructor() {
      this.headers = {
        normalizedNames: {},
        lazyUpdate: null,
      };
      this.status = 0;
      this.statusText = '';
      this.url = '';
      this.ok = false;
      this.name = 'HttpErrorResponse';
      this.message = '';
      this.error = {
        timestamp: '',
        errors: [],
        status: 0,
        message: '',
      };
    }
  }
  