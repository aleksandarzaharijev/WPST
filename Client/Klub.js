export class Klub {

    constructor(klub_ID, imeKluba, mestoKluba,  brojIgraca) {
        this.klub_ID = klub_ID;
        this.imeKluba = imeKluba;
        this.mestoKluba = mestoKluba;
        this.brojIgraca = brojIgraca;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var Elementi = [this.imeKluba, this.mestoKluba, this.brojIgraca];

        Elementi.forEach(E => {
            var el = document.createElement("td");
            el.innerHTML = E;
            tr.appendChild(el);
        });
    }

}