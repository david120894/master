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

  formPokemon: FormGroup = new FormGroup({
    pokemonName: new FormControl(null),
    imagenPokemon: new FormControl(null)
  })

  get pokemonName() {
    return this.formPokemon.get('pokemonName') as FormControl
  }
  get imagenPokemon() {
    return this.formPokemon.get('imagenPokemon') as FormControl
  }

  imagen:string = ""
  pokemon:any
  constructor(private pokemonService: PokemonService){

  }
  ngOnInit() {
    // this.pokemonService.getPokemon('pikachu').subscribe((data:any) => {
    //   this.pokemon = data;
    // })
    // console.log(this.pokemon)
    // this.searchPokemon()
  }

  searchPokemon() {
    this.pokemonService.getPokemon(this.pokemonName.value).subscribe((data:any) => {
      this.pokemon = data
      this.imagen = this.pokemon.sprites.other.dream_world.front_default
    })
  }
}
