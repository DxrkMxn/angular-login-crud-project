import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from '../modal-confirmation/modal-confirmation.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users: User[] = []; // Array que almacena los usuarios
  isLoggedIn = false; // Variable que indica si el usuario ha iniciado sesión

  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions'];
  dataSource: MatTableDataSource<User> | undefined;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(
    private userService: UserService, // Servicio para gestionar los usuarios
    private authService: AuthService, // Servicio de autenticación
    private router: Router, // Servicio para la navegación entre rutas
    private dialog: MatDialog,
  ) { }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.users = this.userService.getUsers();
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator; // Asignar el paginador a la fuente de datos
    } else {
      this.router.navigate(['/login']);
    }
  }


  /**
   * Método para eliminar un usuario.
   * @param id El ID del usuario a eliminar.
   */
  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent);

    dialogRef.afterClosed().subscribe((resultado: boolean) => {
      if (resultado) {
        // Se confirmó la eliminación
        // Código para eliminar el usuario
        this.userService.deleteUser(id); // Elimina el usuario del servicio
        this.users = this.userService.getUsers(); // Actualiza la lista de usuarios después de eliminar
        this.dataSource = new MatTableDataSource<User>(this.users);
      }
    });
  }

  /**
   * Método para cerrar sesión del usuario.
   */
  logout(): void {
    this.authService.logout(); // Cierra sesión a través del servicio de autenticación
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }

  /**
   * Método para cambiar de página en la paginación.
   * @param event El evento de cambio de página.
   */
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.pageSize = this.pageSize;
    }
  }
  
}
