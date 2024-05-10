import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  allPokemon: any
  imagen:string = ""
  pokemon:any
  listPokemon: Array<any> = []
  isHovered: boolean = false;
  hoveredIndex: number = -1;

  formPokemon: FormGroup = new FormGroup({
    pokemonName: new FormControl(null),
    imagenPokemon: new FormControl(null),
    numberPokemon: new FormControl(null)
  })

  get form() {
    return this.formPokemon.controls
  }
  get pokemonName() {
    return this.formPokemon.get('pokemonName') as FormControl
  }
  get imagenPokemon() {
    return this.formPokemon.get('imagenPokemon') as FormControl
  }

  constructor(private pokemonService: PokemonService){

  }
  ngOnInit() {
    this.form['numberPokemon'].setValue(10)
    this.getAllPokemon()
    // this.searchAllPokemon()
  }

  searchPokemon() {
    this.imagen = ""
    this.pokemonService.getPokemon(this.pokemonName.value).subscribe((data:any) => {
      this.pokemon = data
      this.imagen = this.pokemon.sprites.other.dream_world.front_default
      console.log(this.imagen)
    })
  }

  getAllPokemon() {
    this.imagen = ""
    this.listPokemon = []
    console.log(this.form['numberPokemon'].value)
    this.pokemonService.getPokemonAll(this.form['numberPokemon'].value).subscribe((data:any) => {
    this.allPokemon = data
    // this.imagen = allPokemon.sprites.other?.dream_world?.front_default
    console.log(this.allPokemon);
    this.searchAllPokemon()
    })
  }

  searchAllPokemon() {
    console.log(this.listPokemon)
    this.allPokemon?.results.forEach((element:any) => {
      this.pokemonService.getPokemon(element.name).subscribe((data:any) => {
        this.listPokemon.push(data);
        console.log(this.listPokemon)
      })
    })

    console.log(this.listPokemon)
  }

  onMouseEnter(index: number) {
    this.isHovered = true;
    this.hoveredIndex = index;
  }

  onMouseLeave() {
    this.isHovered = false;
    this.hoveredIndex = -1;
  }
}
