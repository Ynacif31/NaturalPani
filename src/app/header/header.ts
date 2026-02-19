import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil as rxTakeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy{
  mobileMenuOpen = false;
  private destroy$ = new Subject<void>();
  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit() {
      this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .pipe(rxTakeUntil(this.destroy$))
      .subscribe((result: { matches: any; }) => {
        if (result.matches && this.mobileMenuOpen) {
          this.mobileMenuOpen = false;
        }
      });
  }

  ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}

