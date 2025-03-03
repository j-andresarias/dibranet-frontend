import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isAdmin:string | undefined;
  constructor() { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') || undefined;
  }

}
