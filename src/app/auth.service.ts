import { Injectable, EventEmitter } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private correctUsername = 'admin'; // Nombre de usuario correcto
  private correctPassword = 'admin'; // Contraseña correcta

  private loggedIn = false; // Estado de inicio de sesión

  loginStatusChanged = new EventEmitter<boolean>(); // Evento para notificar cambios en el estado de inicio de sesión

  constructor(private userService: UserService) { }

  /**
   * Realiza el proceso de inicio de sesión para un usuario dado.
   * Comprueba si el nombre de usuario y la contraseña son correctos.
   * Si son correctos, establece el estado de inicio de sesión y emite el evento de cambio de estado.
   * @param username Nombre de usuario proporcionado
   * @param password Contraseña proporcionada
   * @returns Devuelve true si el inicio de sesión fue exitoso, de lo contrario devuelve false.
   */
  login(username: string, password: string): boolean {
    if (username === this.correctUsername && password === this.correctPassword) {
      this.loggedIn = true; // Establece el estado de inicio de sesión a verdadero
      localStorage.setItem('token', 'loggedIn'); // Almacena un token de inicio de sesión en el almacenamiento local
      this.loginStatusChanged.emit(true); // Emite el evento de cambio de estado de inicio de sesión
      return true; // Retorna true para indicar que el inicio de sesión fue exitoso
    } else {
      return false; // Retorna false para indicar que el inicio de sesión falló
    }
  }

  /**
   * Realiza el proceso de cierre de sesión.
   * Establece el estado de inicio de sesión a falso, remueve el token de inicio de sesión y emite el evento de cambio de estado.
   */
  logout() {
    this.loggedIn = false; // Establece el estado de inicio de sesión a falso
    localStorage.removeItem('token'); // Elimina el token de inicio de sesión del almacenamiento local
    // this.userService.clearUsers();  // Limpiar usuarios (comentario: este código está comentado, no se ejecuta actualmente)
    this.loginStatusChanged.emit(false); // Emite el evento de cambio de estado de inicio de sesión
  }

  /**
   * Verifica si el usuario ha iniciado sesión.
   * @returns Devuelve true si el usuario ha iniciado sesión, de lo contrario devuelve false.
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null; // Verifica si existe un token de inicio de sesión en el almacenamiento local
  }
}
