import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
    // Suscripción al evento de cambio de estado de inicio de sesión del servicio de autenticación
    this.authService.loginStatusChanged.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        // Si se ha iniciado sesión, redireccionar al componente de lista de usuarios
        this.router.navigate(['/users']);
      } else {
        // Si no se ha iniciado sesión, redireccionar al componente de inicio de sesión
        this.router.navigate(['/login']);
      }
    });
  }
}
