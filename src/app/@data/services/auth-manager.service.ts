import { Injectable } from "@angular/core";
import { mapToNbMenuItems } from "../../utils/general";
import { AuthenticationService } from "./authentication.service";
import { SystemService } from "./system.service";
import { NbMenuItem } from "@nebular/theme";

@Injectable({ providedIn: 'root' })
export class AuthManagerService {
  private isMenuLoaded = false;
  private tokenKey = 'token';
  private menuItems: NbMenuItem[] = [];

  constructor(
    private authService: AuthenticationService,
    private systemService: SystemService
  ) {}

  initSession(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      this.authService.getGuestToken().subscribe({
        next: (resp) => {
          localStorage.setItem(this.tokenKey, resp.payload.token);
          this.loadMenuOnce();
        },
        error: (err) => console.error('❌ Error generando token guest', err)
      });
    } else {
      this.loadMenuOnce();
    }
  }

  private loadMenuOnce(): void {
    if (this.isMenuLoaded || localStorage.getItem('menuLoaded')) return;

    this.systemService.findSystemMenuTree().subscribe({
      next: (resp) => {
        const menu = mapToNbMenuItems(resp.payload);
        this.menuItems = menu; // ⬅️ Guardamos el menú localmente
        this.systemService.setSystemMenu(menu); // ⬅️ También lo puedes mantener en SystemService si quieres
        this.isMenuLoaded = true;
        localStorage.setItem('menuLoaded', 'true');
      },
      error: (err) => console.error('❌ Error cargando menú', err)
    });
  }

  getMenu(): NbMenuItem[] {
    return this.menuItems;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('menuLoaded');
    this.menuItems = [];
    this.isMenuLoaded = false;
    window.location.reload();
  }
}
