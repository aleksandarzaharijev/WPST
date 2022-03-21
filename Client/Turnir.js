export class Turnir {

    constructor(turnir_ID,ime_Turnira,organizatorTurnira,datum_pocetka, mesto_Odrzavanja, nagrada, osvajac_Turnira, sudija) {
        this.turnir_ID=turnir_ID;
        this.ime_Turnira = ime_Turnira;
        this.organizatorTurnira=organizatorTurnira;
        this.datum_pocetka = new Date(datum_pocetka);
        this.datum_pocetka = this.datum_pocetka.toLocaleDateString('en-UK');

        this.mesto_Odrzavanja = mesto_Odrzavanja;
        this.nagrada = nagrada;
        this.osvajac_Turnira = osvajac_Turnira;
        this.sudija = sudija;

        this.KoloPoRedu = 1;

        this.prijavljeni_Igraci = [];
        this.Mecevi = [];
        this.ostali_Igraci = [];
    }

    crtaj(host) {
        var tr = document.createElement("tr");
        tr.className = "RedTurnir";
        host.appendChild(tr);

        var el = document.createElement("td");
        el.className = "ime_Turnira";
        el.innerHTML = this.ime_Turnira;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.datum_pocetka;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.mesto_Odrzavanja;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.nagrada;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.organizatorTurnira.imeKluba;
        tr.appendChild(el);

        var el = document.createElement("td");
        if (this.osvajac_Turnira != null) {
            el.innerHTML = this.osvajac_Turnira.ime + " " + this.osvajac_Turnira.prezime;
        } else
            el.innerHTML = "";
        tr.appendChild(el);

        var el = document.createElement("td");
        if (this.sudija != null) {
            el.innerHTML = this.sudija.ime + " " + this.sudija.prezime;
        } else
            el.innerHTML = "";
        tr.appendChild(el);
    }
}