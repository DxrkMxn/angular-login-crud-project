import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = []; // Array que almacena los usuarios

  constructor() {
    this.loadUsers(); // Carga los usuarios almacenados en el almacenamiento local al inicializar el servicio
  }

  /**
   * Obtiene todos los usuarios.
   * @returns Array de usuarios
   */
  getUsers(): User[] {
    return this.users;
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id ID del usuario
   * @returns Usuario correspondiente al ID o undefined si no se encuentra
   */
  getUser(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  /**
   * Agrega un nuevo usuario.
   * @param user Usuario a agregar
   */
  addUser(user: User): void {
    this.users.push(user); // Agrega el usuario al array de usuarios
    this.saveUsers(); // Guarda los cambios en el almacenamiento local
  }

  /**
   * Elimina un usuario por su ID.
   * @param id ID del usuario a eliminar
   */
  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id); // Filtra los usuarios, excluyendo el usuario con el ID especificado
    this.saveUsers(); // Guarda los cambios en el almacenamiento local
  }

  /**
   * Guarda los usuarios en el almacenamiento local.
   */
  saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users)); // Convierte el array de usuarios a formato JSON y lo guarda en el almacenamiento local
  }

  /**
   * Carga los usuarios desde el almacenamiento local.
   */
  loadUsers(): void {
    const storedUsers = localStorage.getItem('users'); // Obtiene los usuarios almacenados en formato JSON desde el almacenamiento local
    if (storedUsers) {
      this.users = JSON.parse(storedUsers); // Convierte los usuarios desde JSON al formato de array y los asigna al array de usuarios del servicio
    }
  }

  /**
   * Elimina todos los usuarios y el almacenamiento local.
   */
  clearUsers(): void {
    this.users = []; // Elimina todos los usuarios del array
    localStorage.removeItem('users'); // Elimina el almacenamiento local de usuarios
  }

  /**
   * Actualiza un usuario existente.
   * @param user Usuario actualizado
   */
  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id); // Obtiene el índice del usuario a actualizar
    if (index !== -1) {
      this.users[index] = user; // Reemplaza el usuario existente con el usuario actualizado en el array de usuarios
      this.saveUsers(); // Guarda los cambios en el almacenamiento local
    }
  }
}
