import { Component, computed, OnInit, signal, input, numberAttribute, output, model } from '@angular/core';

@Component({
  selector: 'app-pagination',

  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  readonly totalCount = input.required<number, string | number>({ transform: numberAttribute });
  readonly pageSize = input.required<number, string | number>({ transform: numberAttribute });
  readonly pageIndex = model.required<number>();

  readonly range = computed(() => {
    const length = Math.ceil(this.totalCount() / this.pageSize());
    return Array.from({ length }, (_, i) => i + 1);
  });
}
