import { EmployeeDashboardPageComponent } from './pages/employee/employee-dashboard-page/employee-dashboard-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminDashboardPageComponent } from './pages/admin/dashboard/admin-dashboard-page/admin-dashboard-page.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register/register-page/register-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { RoleGuardService } from './guards/role-guard.service';

const routes: Routes = [
  { path: '', component: LoginPageComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminDashboardPageComponent, pathMatch: 'full', canActivate: [AuthGuardService, RoleGuardService], data: {role: "ADMIN"} },
  { path: 'employee', component: EmployeeDashboardPageComponent, pathMatch: 'full', canActivate: [AuthGuardService, RoleGuardService], data: {role: "EMPLOYEE"} },
  { path: 'customer', component: MainPageComponent, pathMatch: 'full', canActivate: [AuthGuardService, RoleGuardService], data: {role: "CUSTOMER"} },
  { path: 'register', component: RegisterPageComponent, pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
