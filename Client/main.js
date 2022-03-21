import { Klub } from "./Klub.js";
import { Igrac } from "./Igrac.js";
import { Turnir } from "./Turnir.js";
import { Sudija } from "./Sudija.js";
import { Mec } from "./Mec.js";
import { Savez } from "./Savez.js";


var ListaIgraca = [];
var ListaKlubova = [];
var ListaTurnira = [];
var ListaSudija = [];
var ListaMeceva = [];


var SSIS = new Savez("Stonoteniski savez Centralne Srbije", ListaIgraca, ListaKlubova, ListaTurnira, ListaSudija, ListaMeceva);

SSIS.Crtaj_Naslovnu_Stranu(document.body);

var SSCS = new Savez("Stonoteniski savez Vojvodine", ListaIgraca, ListaKlubova, ListaTurnira, ListaSudija, ListaMeceva);

SSCS.Crtaj_Naslovnu_Stranu(document.body);

