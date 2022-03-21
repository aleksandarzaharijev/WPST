export class Sudija {

    constructor(ime, prezime, klasa) {
        this.ime = ime;
        this.prezime = prezime;
        this.klasa = klasa;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.ime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.prezime;
        tr.appendChild(el);

        var el = document.createElement("td");
        if (this.klasa == 0) {
            el.innerHTML = "Nacionalni";
        } else
            el.innerHTML = "Međunarnodni";
        tr.appendChild(el);
    }
}