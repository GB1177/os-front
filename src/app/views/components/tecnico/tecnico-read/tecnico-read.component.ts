import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';


@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrls: ['./tecnico-read.component.css']
})
export class TecnicoReadComponent implements AfterViewInit {

  tecnicos: Tecnico[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : TecnicoService,
    private router : Router) {

  }

  ngAfterViewInit() {
    this.findAll();
    
    
  }

  
  findAll() : void {
  this.service.findAll().subscribe((response) => {
    this.tecnicos = response;
    this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
    this.dataSource.paginator = this.paginator;
    console.log(this.tecnicos);
    }, (error) => {
    console.log('error:', error);
    });
 } 
  

  navigateToCreate():void {
    this.router.navigate(['tecnicos/create'])
  }

}


