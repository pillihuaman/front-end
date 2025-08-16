
export interface ClientAuditInfo {
  screenResolution: string;
  language: string;
  platform: string;
  timeZone: string;
  networkType?: string;
  connectionDownlink?: number;
  connectionRtt?: number;
  vpnDetected?: boolean; // Generalmente difícil de detectar con precisión
  deviceId: string;
  sessionId: string;
  lastVisitedPage?: string;
  clickPath?: string[];
  idleTime?: number;
}

// Esta interfaz debe coincidir EXACTAMENTE con tu DTO AuthenticationRequest.java
export interface AuthenticationRequest {
  email: string;
  password?: string;
  clientInfo: ClientAuditInfo;
}