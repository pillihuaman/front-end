export interface ReqStore {
  id: string;          // Unique store identifier (e.g., ST-001)
  name: string;        // Store name
  address: string;     // Store address
  country: string;     // Country where the store is located
  email: string;       // Contact email
  phone: string;       // Contact phone number
  status: string;      // Store status (active, inactive)
  ownerName: string;   // Store owner's name
  page?: number;       // Page number for pagination
  pagesize?: number;   // Page size for pagination
}
