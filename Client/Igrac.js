export class Igrac {

    constructor(broj_Legitimacije , ime, prezime, datumrodjenja, bodovi, klub) {
        this.Broj_Legitimacije= broj_Legitimacije;
        this.ime = ime;
        this.prezime = prezime;
        this.datum_rodj = new Date(datumrodjenja);
        this.datum_rodj = this.datum_rodj.toLocaleDateString('en-UK');
        this.Bodovi = bodovi;
        this.Klub = klub;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.Broj_Legitimacije;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.ime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.prezime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.datum_rodj;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.Bodovi;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.Klub.imeKluba;
        tr.appendChild(el);

    }


}