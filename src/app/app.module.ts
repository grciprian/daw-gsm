import { EmployeeService } from './server-connection/services/employee.service';
import { EmployeeDashboardPageComponent, UpdateContractDialog } from './pages/employee/employee-dashboard-page/employee-dashboard-page.component';
import { AdminService } from './server-connection/services/admin.service';
import { ContractService } from './server-connection/services/contract.service';
import { GadgetService } from './server-connection/services/gadget.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './server-connection/request.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { AuthService } from './server-connection/services/auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { RoleGuardService } from './guards/role-guard.service';
import { RegisterPageComponent } from './pages/register/register-page/register-page.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { ContractsPageComponent, AddContractDialog } from './pages/main/contracts-page/contracts-page.component';
import { GadgetsPageComponent, AddGadgetDialog } from './pages/main/gadgets-page/gadgets-page.component';
import { AdminDashboardPageComponent, AddEmployeeDialog } from './pages/admin/dashboard/admin-dashboard-page/admin-dashboard-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    GadgetsPageComponent,
    RegisterPageComponent,
    MainPageComponent,
    ContractsPageComponent,
    AdminDashboardPageComponent,
    EmployeeDashboardPageComponent,
    AddGadgetDialog,
    AddContractDialog,
    AddEmployeeDialog,
    UpdateContractDialog,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    AuthService,
    AuthGuardService,
    RoleGuardService,
    GadgetService,
    ContractService,
    AdminService,
    EmployeeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddGadgetDialog,
    AddContractDialog,
    AddEmployeeDialog,
    UpdateContractDialog
  ]
})
export class AppModule { }
