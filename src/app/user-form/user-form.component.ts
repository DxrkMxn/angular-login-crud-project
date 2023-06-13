import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// Expresión regular para validar el correo electrónico
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  isEditing: boolean = false;
  user: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  public loading = false;

  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const userId = +params['id'];
        this.user = this.userService.getUser(userId)!;
        if (!this.user) {
          this.router.navigate(['/user-list']);
        } else {
          this.isEditing = true;
        }
      }
    });

    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.pattern(emailRegex)]),
      phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern('[0-9]{10}')]),
      address: new FormControl(this.user.address, Validators.required)
    });
  }

  saveUser() {
    this.loading = true;
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const userEmail = formData.email;

      // Verificar si el correo electrónico ya existe en la base de datos
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(
        (user: User) => user.email === userEmail && (this.isEditing ? user.id !== this.user.id : true)
      );

      if (existingUser) {
        // Mostrar una alerta de error si el correo electrónico ya existe
        setTimeout(() => {
          this.snackBar.open('El correo electrónico ya está registrado', 'Cerrar', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
          this.loading = false;
        }, 2000);
      } else {
        if (this.isEditing) {
          this.userService.updateUser({ ...this.user, ...formData });
        } else {
          const newUser: User = { ...formData, id: Date.now() };
          this.userService.addUser(newUser);
        }
        setTimeout(() => {
          this.snackBar.open(this.isEditing ? 'Se actualizó satisfactoriamente' : 'Se creó satisfactoriamente', 'Cerrar', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }, 2000);
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/user-list']);
        }, 7000);
      }
    }
  }

  cancelForm() {
    this.router.navigate(['/user-list']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
