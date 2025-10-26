import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption { id: string; title: string }

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="custom-select" tabindex="0" (blur)="onBlur()">
      <button type="button" class="cs-toggle" (click)="toggle()" [attr.aria-expanded]="open" aria-haspopup="listbox">
        <span class="cs-value">{{ getTitle(value) || 'Choose a service' }}</span>
        <span class="cs-arrow">▾</span>
      </button>

      <ul *ngIf="open" class="cs-options" role="listbox">
        <li *ngFor="let o of options; let i = index"
            role="option"
            [attr.aria-selected]="value === o.id"
            (click)="select(o.id)"
            (mouseenter)="hoverIndex = i"
            [class.focus]="hoverIndex === i">
          {{ o.title }}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
    .custom-select{position:relative;display:block}
    .cs-toggle{width:100%;text-align:left;padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:linear-gradient(180deg, rgba(9,6,16,0.95), rgba(22,16,35,0.96));color:#fff;display:flex;justify-content:space-between;align-items:center}
    .cs-arrow{opacity:0.85;margin-left:8px}
    .cs-options{position:absolute;left:0;right:0;top:calc(100% + 8px);max-height:260px;overflow:auto;border-radius:8px;background:linear-gradient(180deg, rgba(16,11,27,0.98), rgba(22,16,35,0.98));box-shadow:0 12px 40px rgba(0,0,0,0.6);z-index:1600;padding:6px;border:1px solid rgba(255,255,255,0.04)}
    .cs-options li{padding:10px 12px;cursor:pointer;color:#fff;border-radius:6px}
    .cs-options li:hover,.cs-options li.focus{background:rgba(255,255,255,0.02);transform:translateY(-1px)}
    .cs-options li[aria-selected="true"]{background:rgba(204,160,44,0.08);color:var(--accent-gold);font-weight:600}
    `
  ]
})
export class CustomSelectComponent {
  @Input() options: SelectOption[] = [];
  @Input() value: string | undefined;
  @Output() valueChange = new EventEmitter<string | undefined>();

  open = false;
  hoverIndex = -1;

  toggle() { this.open = !this.open; if (this.open) this.hoverIndex = this.options.findIndex(o => o.id === this.value); }
  close() { this.open = false; this.hoverIndex = -1 }
  onBlur() { setTimeout(()=> this.close(), 120) }
  select(id: string) { this.value = id; this.valueChange.emit(this.value); this.close(); }
  getTitle(id?: string){ return this.options.find(o=>o.id===id)?.title || '' }

  @HostListener('keydown', ['$event']) onKey(e: KeyboardEvent) {
    if (!this.open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); this.open = true; this.hoverIndex = 0; return; }
    if (this.open) {
      if (e.key === 'ArrowDown') { e.preventDefault(); this.hoverIndex = Math.min(this.hoverIndex + 1, this.options.length - 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); this.hoverIndex = Math.max(this.hoverIndex - 1, 0); }
      if (e.key === 'Enter') { e.preventDefault(); if (this.hoverIndex >=0) this.select(this.options[this.hoverIndex].id); }
      if (e.key === 'Escape') { e.preventDefault(); this.close(); }
    }
  }
}
