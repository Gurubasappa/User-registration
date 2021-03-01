import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './layout.html'
})
export class CommonLayoutComponent implements OnInit {
  showFiller = false;
  mode = new FormControl('over');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  ngOnInit(): void {
  }
  
}
