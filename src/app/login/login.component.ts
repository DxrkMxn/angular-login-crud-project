import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  public loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user-list']);
    }
  }

  login(): void {
    this.loading = true;

    const randomTimeout = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    setTimeout(() => {
      if (this.authService.login(this.username, this.password)) {
        this.router.navigate(['/user-list']);
      } else {
        this.snackBar.open('Nombre de usuario o contraseña incorrecta', 'Cerrar', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
      this.loading = false;
    }, randomTimeout);
  }

}
