export class Mec {
  
    constructor(Igrac1, Igrac2, turnir, kolo, rezultat_Ishod) {
        this.Igrac1 = Igrac1;
        this.Igrac2 = Igrac2;
        this.turnir = turnir;
        this.kolo = kolo;
        this.rezultat_Ishod = rezultat_Ishod;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        console.log(this.Igrac1);
        el.innerHTML = this.Igrac1.prezime + " " + this.Igrac1.ime;
        tr.appendChild(el);

        var Rezultat = ["3 : 0","3 : 1","3 : 2", "0 : 3", "1 : 3","2 : 3"];

        var el = document.createElement("td");
        el.innerHTML = Rezultat[this.rezultat_Ishod];
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.Igrac2.prezime + " " + this.Igrac2.ime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.turnir.ime_Turnira;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.kolo;
        tr.appendChild(el);
    }

    crtaj_Turnir_Mec(host) {
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        console.log(this.Igrac1);
        
        el.innerHTML = this.Igrac1.prezime + " " + this.Igrac1.ime;
        tr.appendChild(el);

        var rezultat_Ishod = ["3 : 0", "3 : 1", "3 : 2", "0 : 3", "1 : 3","2 : 3"];

        var el = document.createElement("td");

        if (this.rezultat_Ishod != null) {

            el.innerHTML = rezultat_Ishod[this.rezultat_Ishod];
        } else {
            var Select = document.createElement("select");
            Select.className = "mecrezultat_Ishod";

            let Opcija;

            let j = 0;

            rezultat_Ishod.forEach(R => {

                Opcija = document.createElement("option");
                Opcija.innerHTML = R;
                Opcija.value = j++;
                Select.appendChild(Opcija);
            })

            el.appendChild(Select);
        }
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.Igrac2.prezime + " " + this.Igrac2.ime;
        tr.appendChild(el);
    }
  
}