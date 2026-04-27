import { Component } from '@angular/core';
import { AdminTable } from '../../core/components/admin-table/admin-table';

@Component({
  selector: 'app-admin-page',
  imports: [AdminTable],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
})
export class AdminPage {}
