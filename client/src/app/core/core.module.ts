import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SectionHeaderComponent } from './section-header/section-header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    BreadcrumbModule,
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent
  ],
  declarations: [NavBarComponent, NotFoundComponent, ServerErrorComponent, SectionHeaderComponent]
})
export class CoreModule { }
