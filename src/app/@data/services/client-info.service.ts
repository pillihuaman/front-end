// src/app/@data/services/client-info.service.ts

import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ClientAuditInfo } from '../model/general/auth.models';

// Extend Navigator type to include connection property
interface NavigatorConnection {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NavigatorConnection;
  mozConnection?: NavigatorConnection;
  webkitConnection?: NavigatorConnection;
}


@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {
  constructor() { }


  public collectClientAuditInfo(): ClientAuditInfo {

    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem('deviceId', deviceId);
    }


    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

 
    return {

      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      platform: navigator.platform,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      // Información de Red (si está disponible)
      networkType: connection ? connection.effectiveType : 'unknown',
      connectionDownlink: connection ? connection.downlink : undefined,
      connectionRtt: connection ? connection.rtt : undefined,
      vpnDetected: false, 
      deviceId: deviceId,
      sessionId: uuidv4(),
      lastVisitedPage: document.referrer, 
      clickPath: [], // Placeholder
      idleTime: 0 // Placeholder
    };
  }
}