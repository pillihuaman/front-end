import { Directive, OnInit } from '@angular/core';
import { Button } from './button';
import { Label } from './label';
@Directive()
export class BaseComponent implements OnInit {
  lstLabel?: Label[];
  lstButton?: Button[];
  ngOnInit(): void {}
}
