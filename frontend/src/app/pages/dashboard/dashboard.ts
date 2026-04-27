import { Component } from '@angular/core';
import { InventoryTable } from '../../core/components/inventory-table/inventory-table';

@Component({
  selector: 'app-dashboard',
  imports: [InventoryTable],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
}
