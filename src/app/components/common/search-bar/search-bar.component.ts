import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
  ],
})
export class SearchBarComponent {
  @ViewChild('searchContainer') searchContainer!: ElementRef;

  protected isSearchOpen = signal(false);
  protected searchResults = signal(searchResultData);
  protected searchQuery = '';

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent | MouseEvent) {
    // Si el click fue fuera del contenedor, cerramos el dropdown
    if (this.isSearchOpen() && !this.searchContainer.nativeElement.contains(event.target)) {
      this.isSearchOpen.set(false);
    }
  }

  protected onSearchFocusEvent() {
    this.isSearchOpen.set(true);
  }
}

const searchResultData = [
  { name: 'LEGO Star Wars Millennium Falcon', category: 'Construcción', price: 159.99, img: '🚀' },
  { name: 'Oso de Peluche Gigante', category: 'Peluches', price: 45.00, img: '🧸' },
  { name: 'Coche de Control Remoto', category: 'Vehículos', price: 89.90, img: '🏎️' }
];
