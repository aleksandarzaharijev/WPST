import { Klub } from "./Klub.js";
import { Igrac } from "./Igrac.js";
import { Turnir } from "./Turnir.js";
import { Sudija } from "./Sudija.js";
import { Mec } from "./Mec.js";

export class Savez {  

    constructor(ImeKluba, listaIgraca, listaKlubova, listaTurnira, listaSudija, listaMeceva) {
        this.ImeKluba = ImeKluba;

        this.listaIgraca = listaIgraca;
        this.listaKlubova = listaKlubova;
        this.listaTurnira = listaTurnira;
        this.listaSudija = listaSudija;
        this.listaMeceva = listaMeceva;

        this.kontejner = null;
    }

    Crtaj_Naslovnu_Stranu(host){

     this.kontejner = document.createElement("div");
     this.kontejner.className = "GlavniKontejner";
     host.appendChild(this.kontejner);

     let Zaglavlje = document.createElement("div");
     Zaglavlje.className = "Zaglavlje";
     this.kontejner.appendChild(Zaglavlje);

    let NaslovForma = document.createElement("div")
    NaslovForma.className = "NaslovForma";
    Zaglavlje.appendChild(NaslovForma);
    this.CrtajNaslov(NaslovForma);
    
 /*   let GrbForma = document.createElement("div");
    GrbForma.className = "GrbForma";
    Zaglavlje.appendChild(GrbForma);
    this.CrtajGrb(GrbForma);*/

    let Dugmici = ["Igraci", "Klubovi", "Turniri", "Sudije", "Mecevi"];
    var Btns = [];
    let Meni = document.createElement("div");
    Meni.className = "Meni";
    this.kontejner.appendChild(Meni);

    Dugmici.forEach(D => {
            var btn = document.createElement("button");
            btn.innerHTML = D;
            btn.className = "DugmiciMeni";
            Btns.push(btn);
            Meni.appendChild(btn);

            
        });
        let GlavniForma = document.createElement("div");
        GlavniForma.className = "GlavnaForma";
        this.kontejner.appendChild(GlavniForma);

        
        Btns[0].onclick = (ev) => this.prikaziIgrace(GlavniForma);
        Btns[1].onclick = (ev) => this.prikaziKlubove(GlavniForma);
        Btns[2].onclick = (ev) => this.prikaziTurnire(GlavniForma);
        Btns[3].onclick = (ev) => this.prikaziSudije(GlavniForma);
        Btns[4].onclick = (ev) => this.prikaziMeceve(GlavniForma);
    }
    CrtajNaslov(host) {

      /*  let img = document.createElement("img");
        img.src = "stscs.png";
        img.onclick = (ev) => this.Crtaj_Naslovnu_Stranu(document.body);
        host.appendChild(img);*/

        let l = document.createElement("label");
        l.className = "NaslovLabel";
        l.innerHTML = this.ImeKluba;
        host.appendChild(l);
    }
  /*  CrtajGrb(host) {

        let img = document.createElement("img");
        img.src = "GrbNis.png"
        img.height = "120";
        img.width = "120";
        host.appendChild(img);
    }*/
    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    DodajHeader(host, tekst) {
        var H1 = document.createElement("h1");
        H1.className = "Header";
        H1.innerHTML = tekst;
        host.appendChild(H1);
    } 
    
    prikaziIgrace(host) {

        this.removeAllChildNodes(host);

        this.listaIgraca = [];

        fetch("https://localhost:5001/Igrac/Svi_igraci_kluba", {method:"GET"})
            .then(p => {
                p.json().then(Igraci => {
                    Igraci.forEach(I => {
                        console.log(I);
                        var player = new Igrac(I.broj_Legitimacije, I.ime, I.prezime, I.datumrodjenja, I.bodovi, I.klub);
                        this.listaIgraca.push(player);
                    });

                    let FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                  //Prikay tabele sa igracima 

                    this.DodajHeader(FormaPrikaz, "Lista igraca");

                    var IgraciTabela = document.createElement("table");
                    IgraciTabela.className = "TabelaIgraci";
                    FormaPrikaz.append(IgraciTabela);

                    var IgraciHead = document.createElement("thead");
                    IgraciTabela.appendChild(IgraciHead);

                    var tr = document.createElement("tr");
                    IgraciHead.appendChild(tr);

                    let th;
                    var Head = ["Broj Legitimacije", "Ime", "Prezime", "Datum rodjenja", "Bodovi", "Klub"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var IgraciBody = document.createElement("tbody");
                    IgraciBody.className = "IgraciPodaci";
                    IgraciTabela.appendChild(IgraciBody);

                    this.listaIgraca.forEach(I => {
                        I.crtaj(IgraciTabela);
                    })


                    //#region KontroleIgrac

                    let FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaKontrole, "Podaci o igracu");

                    this.IscrtajKontroleIgrac(FormaKontrole);
                })
            });

        //#endregion
    }
    
    IscrtajKontroleIgrac(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o igracu");

        var Kontrole = ["Dodaj igraca", "Pregledaj igraca", "Promena bodova", "Obrisi igraca"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleIgrac_Dodaj(host);
        btnsKontrole[1].onclick = (ev) => this.IscrtajKontroleIgrac_Pregledaj(host);
        btnsKontrole[2].onclick = (ev) => this.IscrtajKontroleIgrac_Promena(host);
        btnsKontrole[3].onclick = (ev) => this.IscrtajKontroleIgrac_Brisanje(host);
    }
    IscrtajKontroleIgrac_Pregledaj(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o igracu");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);
      
        var Broj_Legitimacije = document.createElement("div");
        Broj_Legitimacije.className = "IgracKontrole";
        PoljeKontrole.appendChild(Broj_Legitimacije);

        var lblBroj_Legitimacije = document.createElement("label");
        lblBroj_Legitimacije.className = "LabeleKontrole";
        lblBroj_Legitimacije.innerHTML = "Broj_Legitimacije:";
        Broj_Legitimacije.appendChild(lblBroj_Legitimacije);

        var inputBroj_Legitimacije = document.createElement("input");
        inputBroj_Legitimacije.setAttribute("type", "text");
        inputBroj_Legitimacije.className = "InputKontrole";
        Broj_Legitimacije.appendChild(inputBroj_Legitimacije);

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Pretrazi, Odustani;
        var Dugmici = [Pretrazi, Odustani];
        var DugmiciLabele = ["Pretrazi", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            if (inputBroj_Legitimacije.value === "") {
                alert("Morate uneti podatke za broj legitimacije!");
                return;
            }
            this.PretraziIgraca(host, inputBroj_Legitimacije.value);
        }

        Dugmici[1].onclick = (ev) => this.IscrtajKontroleIgrac(host);

     }
 PretraziIgraca (host, broj_Legitimacije)
 {
     this.removeAllChildNodes(host);
     this.DodajHeader(host,"Igraci");

     //Funkcionalnost

     var PoljeKontrole = document.createElement("div");
     PoljeKontrole.className = "IgracKontrole";
     host.appendChild(PoljeKontrole);

    var i =0;

    var Polja = ["Broj_Legitimacije", "Ime", "Prezime", "Datum_Rodjenja", "Bodovi", "Ime kluba"];

    var brojLegitimacije, Ime, Prezime, datumrodjenja, Bodovi, Klub;
    var Divs = [brojLegitimacije, Ime, Prezime, datumrodjenja, Bodovi, Klub];

    var lblBroj_Legitimacije, lblIme,lblPrezime,lblDatRodjenja,lblBodovi,lblKlub;
    var LabeleTekst = ["Broj legitimacije:", "Ime:", "Prezime:","Datum rodjenja:","Bodovi:","Klub:"];
    var Labele = [lblBroj_Legitimacije, lblIme,lblPrezime,lblDatRodjenja,lblBodovi,lblKlub];

    var BrojLegitimacijePrikaz, ImePrikaz, PrezimePrikaz, Dat_rodjenjaPrikaz, BodoviPrikaz, KlubPrikaz;
    var Prikaz = [BrojLegitimacijePrikaz, ImePrikaz, PrezimePrikaz, Dat_rodjenjaPrikaz, BodoviPrikaz, KlubPrikaz];

    Polja.forEach(D => {

        Divs[i] = document.createElement("div");
        Divs[i].className = "IgracKontrolePrikaz";
        PoljeKontrole.appendChild(Divs[i]);

        Labele[i] = document.createElement("label");
        Labele[i].className = "LabeleKontrolePrikaziIgraca";
        Labele[i].innerHTML = LabeleTekst[i];
        Divs[i].appendChild(Labele[i]);

        Prikaz[i] = document.createElement("label");
        Prikaz[i].className = "LabeleKontrolePrikaziIgraca";
        Divs[i].appendChild(Prikaz[i]);

        i++;
    })

    fetch("https://localhost:5001/Igrac/Pregledaj_igraca/" + broj_Legitimacije, {
        method: 'GET'

        }).then(p => {
        p.json().then(I => {

            console.log(I);

            Prikaz[0].innerHTML = I.broj_Legitimacije;
            Prikaz[1].innerHTML = I.ime;
            Prikaz[2].innerHTML = I.prezime;
            var datumrodjenja = new Date(I.datumrodjenja);
            datumrodjenja = datumrodjenja.toLocaleDateString('en-UK');
            Prikaz[3].innerHTML = datumrodjenja;
            Prikaz[4].innerHTML = I.bodovi;
            Prikaz[5].innerHTML = I.klub.imeKluba;
      })
    })

    //Zatvori btn

    var Btns = document.createElement("div");
    Btns.className = "Meni";
    host.appendChild(Btns);

    var Odustani = document.createElement("button");
    Odustani.innerHTML = "Zatvori";
    Odustani.className = " Zatvori"
    Btns.appendChild(Odustani);

    Odustani.onclick = (ev) => this.IscrtajKontroleIgrac(host);
  }

  IscrtajKontroleIgrac_Dodaj(host){

    this.removeAllChildNodes(host);
   this.DodajHeader(host, "Podaci o igracu");
   var i = 0;
   var Polja = ["Broj_Legitimacije", "Ime", "Prezime", "Datum_Rodjenja", "Bodovi", "Klub"];

   var BrojLegitimacije, Ime, Prezime, DatumRodjenja, Bodovi, Klub;
   var Divs = [BrojLegitimacije, Ime, Prezime, DatumRodjenja, Bodovi, Klub];

   var lblBroj_Legitimacije, lblIme,lblPrezime,lblDatRodjenja,lblBodovi,lblKlub;
    var LabeleTekst = ["Broj legitimacije:", "Ime:", "Prezime:","Datum rodjenja:","Bodovi:","Klub:"];
    var Labele = [lblBroj_Legitimacije, lblIme,lblPrezime,lblDatRodjenja,lblBodovi,lblKlub];

    var inputBrojLegitimacije, inputIme, inputPrezime, inputDat_rodjenja, inputBodovi, inputKlub;
    var Ulaz = [inputBrojLegitimacije, inputIme, inputPrezime, inputDat_rodjenja, inputBodovi, inputKlub];

    var PoljeKontrole = document.createElement("div");
    PoljeKontrole.className = "IgracKontrole";
    host.appendChild(PoljeKontrole);

    Polja.forEach(D=> {
        Divs[i]=document.createElement("div");
        Divs[i].className = "IgracKontrole";
        PoljeKontrole.appendChild(Divs[i]);

        Labele[i] = document.createElement("label");
        Labele[i].className = "LabeleKontrole";
        Labele[i].innerHTML = LabeleTekst[i];
        Divs[i].appendChild(Labele[i]);

       /* Ulaz[0] = document.createElement("input");
        Ulaz[0].className = "InputKontrole";
        Divs[0].appendChild(Ulaz[0]);  */       
        if (i === 3) {
            Ulaz[i] = document.createElement("input");
            Ulaz[i].setAttribute("type", "date");
            Ulaz[i].className = "InputKontrole";
            Divs[i].appendChild(Ulaz[i]);
        } else {
            Ulaz[i] = document.createElement("input");
                Ulaz[i].setAttribute("type", "text");
                Ulaz[i].className = "InputKontrole";
                Divs[i].appendChild(Ulaz[i]);
        }
        i++;

        
    })

    var Btns = document.createElement("div");
    Btns.className = "Meni";
    host.appendChild(Btns);

    var s = this.kontejner.querySelector(".IgracKontrole");

    var Dodaj, Odustani;
    var Dugmici = [Dodaj, Odustani];
    var DugmiciLabele = ["Dodaj", "Odustani"];

    var i = 0 ;

    DugmiciLabele.forEach(D => {
        Dugmici[i] = document.createElement("button");
        Dugmici[i].innerHTML = D;
        Dugmici[i].className = D;
        s.appendChild(Dugmici[i]);

        i++;
    })
    Dugmici[0].onclick = (ev) => {
        if (Ulaz[0].value === "") {
            alert("Morate uneti broj legitimacije!");
            return;
        }
        if (Ulaz[1].value === "") {
            alert("Morate uneti ime!");
            return;
        }
        if (Ulaz[2].value === "") {
            alert("Morate uneti  prezime!");
            return;
        }
        if (Ulaz[5].value === "") {
            alert("Morate uneti ime kluba!");
            return;
        }

        this.DodajIgraca(Ulaz[0].value, Ulaz[1].value, Ulaz[2].value, Ulaz[3].value, Ulaz[4].value,  Ulaz[5].value);
    }

    Dugmici[1].onclick = (ev) => this.IscrtajKontroleIgrac(host);

  }
  DodajIgraca(Broj_Legitimacije, Ime, Prezime, Dat_Rodjenja, Bodovi, Klub) {

    fetch("https://localhost:5001/Igrac/UnosIgraca/" + Broj_Legitimacije + "/" + Ime + "/" + Prezime + "/" +Dat_Rodjenja+ "/" + Bodovi + "/"+ Klub , {
        method: 'POST',
        body: JSON.stringify({
            "Broj_LegitimacijeId": Broj_Legitimacije,
            "Ime": Ime,
            "Prezime": Prezime,
            "Datum_rodjenja": Dat_Rodjenja,
            "Bodovi": Bodovi,
            "ImeKluba_kluba": Klub
        })
    }).then(Response => {

        let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");

        this.prikaziIgrace(GlavnaForma);

    });

    }
    IscrtajKontroleIgrac_Promena(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Promena bodova:");

        var i = 0;

        var Polja = ["Broj legitimacije", "Bodovi"];

        var Broj_Legitimacije, bodovi;
        var Divs = [Broj_Legitimacije, bodovi];

        var lblBrojLegitimacije, lblBodovi;
        var LabeleTekst = ["Broj legitimacije:", "Bodovi:"];
        var Labele = [lblBrojLegitimacije, lblBodovi];

        var inputBrojLegitimacije, inputBodovi;
        var Inputs = [inputBrojLegitimacije, inputBodovi];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        // Polja za prikaz

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labele[i] = document.createElement("label");
            Labele[i].className = "LabeleKontrole";
            Labele[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labele[i]);

            Inputs[i] = document.createElement("input");
            Inputs[i].setAttribute("type", "text");
            Inputs[i].className = "InputKontrole";
            Divs[i].appendChild(Inputs[i]);

            i++;
        })

        //BTNS

        /*var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);*/
        var s = this.kontejner.querySelector(".IgracKontrole");

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Promeni, Odustani;
        var Dugmici = [Promeni, Odustani];
        var DugmiciLabele = ["Promeni", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            s.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            if (Inputs[0].value === "") {
                alert("Morate uneti broj legitimacije!");
                return;
            }

            if (Inputs[1].value === "") {
                alert("Morate uneti vrednost promene!");
                return;
            }

             this.PromeniBodovi(Inputs[0].value, Inputs[1].value);
        }
        Dugmici[1].onclick = (ev) => this.IscrtajKontroleIgrac(host);
    }
    PromeniBodovi(Broj_Legitimacije, bodovi) {
        fetch("https://localhost:5001/Igrac/Promeni_bodove/" + Broj_Legitimacije + "/" + bodovi, {
            method: 'PUT',
            /*body: JSON.stringify({
                "Broj_Legitimacije": Broj_Legitimacije,
                "bodovi": bodovi
            })*/
        }).then(p=> {
            if(p.ok){
                let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");

        this.prikaziIgrace(GlavnaForma);
            }
        }) 

      /*  let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");

        this.prikaziIgrace(GlavnaForma);*/
    }
    IscrtajKontroleIgrac_Brisanje(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Brisanje igraca:");

        var i = 0;

        var Polja = ["Broj legitimacije"];

        var Broj_Legitimacije;
        var Divs = [Broj_Legitimacije];

        var lblBrojLegitimacije;
        var LabeleTekst = ["Broj legitimacije:"];
        var Labele = [lblBrojLegitimacije];

        var inputBrojLegitimacije;
        var Inputs = [inputBrojLegitimacije];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        // Polja za prikaz

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labele[i] = document.createElement("label");
            Labele[i].className = "LabeleKontrole";
            Labele[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labele[i]);

            Inputs[i] = document.createElement("input");
            Inputs[i].setAttribute("type", "text");
            Inputs[i].className = "InputKontrole";
            Divs[i].appendChild(Inputs[i]);

            i++;
        })

        //BTNS

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);
        var s = this.kontejner.querySelector(".IgracKontrole");

        var Obrisi = document.createElement("button");
        Obrisi.innerHTML = "Obriši"
        s.className = "Obrisi";
        s.appendChild(Obrisi);

        Obrisi.onclick = (ev) => {
            if (Inputs[0].value === "") {
                alert ("Morate uneti broj legitimacije igrača kog želite da obrišete!!!");
                return;
            }
            this.ObrisiIgraca(host, Inputs[0].value);
        }

       var Odustani = document.createElement("button");
       Odustani.innerHTML="Odustani";
       Odustani.className = "Odustani";
       s.appendChild(Odustani);

       Odustani.onclick = (ev) => this.IscrtajKontroleIgrac(host);
    }
    ObrisiIgraca(host, Broj_Legitimacije) {
        this.removeAllChildNodes(host);

        var Head2 = document.createElement("h2");
        Head2.innerHTML = "Brisanje igrača";
        host.appendChild(Head2);

        fetch("https://localhost:5001/Igrac/BrisanjeIgraca/" + Broj_Legitimacije, {
            method: 'DELETE',
            body: JSON.stringify({
                "Broj_Legitimacije": Broj_Legitimacije
            })
        }).then(Response => {

            let Forma = document.createElement("div");
            host.appendChild(Forma);
            let Messg = document.createElement("h2");
            Messg.className = "LabeleKontrole";
            Messg.innerHTML = "Igrač je uspešno obrisan!";
            Forma.appendChild(Messg);

            var Btns = document.createElement("div");
            Btns.className = "Meni";
            host.appendChild(Btns);

            var Zatvori = document.createElement("button");
            Zatvori.innerHTML = "Zatvori";
            Zatvori.className = " Zatvori"
            Btns.appendChild(Zatvori);

            let GlavnaForma = document.querySelector(".GlavnaForma");

            Zatvori.onclick = (ev) => this.prikaziIgrace(GlavnaForma);
        });
    }
   //KLUB FUNKCIJE
    
   prikaziKlubove(host) {

    this.removeAllChildNodes(host);

    this.listaKlubova = [];

    fetch("https://localhost:5001/Klub/Svi_klubovi", {method:"GET"})
        .then(p => {
            p.json().then(Klubovi => {
                Klubovi.forEach(K => {
                    //console.log(K);
                    var club = new Klub(K.klub_ID, K.imeKluba, K.mestoKluba,  K.brojIgraca);
                    this.listaKlubova.push(club);
                    //console.log(K);
                });

                var FormaPrikaz = document.createElement("div");
                FormaPrikaz.className = "FormaPrikaz";
                host.appendChild(FormaPrikaz);

                var FormaKontrole = document.createElement("div");
                FormaKontrole.className = "FormaKontrole";
                host.appendChild(FormaKontrole);

                this.DodajHeader(FormaPrikaz, "Lista klubova");

                var KluboviTabela = document.createElement("table");
                KluboviTabela.className = "TabelaKlubovi";
                FormaPrikaz.append(KluboviTabela);

                var KluboviHead = document.createElement("thead");
                KluboviTabela.appendChild(KluboviHead);

                var tr = document.createElement("tr");
                KluboviHead.appendChild(tr);

                let th;
                var Head = ["Ime kluba", "Mesto kluba",  "Broj igrača"];
                Head.forEach(el => {
                    th = document.createElement("th");
                    th.innerHTML = el;
                    tr.appendChild(th);
                })

                var KluboviBody = document.createElement("tbody");
                KluboviBody.className = "KluboviPodaci";
                KluboviTabela.appendChild(KluboviBody);

                this.listaKlubova.forEach(K => {
                    K.crtaj(KluboviTabela);
                })

                // Kraj za deo koji prikazuje klubove

                // Deo koji prikazuje kontrole

                this.DodajHeader(FormaKontrole, "Podaci o klubu");

                this.CrtajKontroleKlub(FormaKontrole);
            })
        });

    }
    CrtajKontroleKlub(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Klub:");

        var Kontrole = ["Dodaj klub", "Igrači kluba"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleKlub_Dodaj(host);
        btnsKontrole[1].onclick = (ev) => this.IscrtajKontroleKlub_IgraciKluba(host);
       // btnsKontrole[2].onclick = (ev) => this.IscrtajKontroleKlub_Brisanje(host);
    }

    IscrtajKontroleKlub_Dodaj(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o igraču");

        var i = 0;

        var Polja = ["Ime kluba", "Mesto kluba"];

        var ImeKluba, MestoKluba;
        var Divs = [ImeKluba, MestoKluba];

        var lblImeKluba, lblMestoKluba;
        var LabeleTekst = ["Ime kluba:", "Mesto Kluba:"];
        var Labeble = [lblImeKluba, lblMestoKluba];

        var inputImeKluba, inputMestoKluba;
        var Inputs = [inputImeKluba, inputMestoKluba];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);

            Inputs[i] = document.createElement("input");
            Inputs[i].setAttribute("type", "text");
            Inputs[i].className = "InputKontrole";
            Divs[i].appendChild(Inputs[i]);

            i++;
        })

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            if (Inputs[0].value === "")
                alert("Morate uneti ime kluba!");

            this.DodajKlub(Inputs[0].value, Inputs[1].value);
        }

        Dugmici[1].onclick = (ev) => this.CrtajKontroleKlub(host);

    }
    DodajKlub(ImeKluba, MestoKluba) {
        fetch("https://localhost:5001/Klub/Unos_kluba/" + ImeKluba + "/" + MestoKluba , {
            method: 'POST',
            body: JSON.stringify({
                "ImeKluba": ImeKluba,
                "MestoKluba": MestoKluba
            })
        }).then(Response => {

            let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");

            this.prikaziKlubove(GlavnaForma);

        });
    }
    IscrtajKontroleKlub_IgraciKluba(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Igraci kluba:");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var ImeKluba = document.createElement("div");
        ImeKluba.className = "IgracKontrole";
        PoljeKontrole.appendChild(ImeKluba);

        var lblImeKluba = document.createElement("label");
        lblImeKluba.className = "LabeleKontrole";
        lblImeKluba.innerHTML = "ImeKluba";
        ImeKluba.appendChild(lblImeKluba);

        var inputImeKluba = document.createElement("input");
        inputImeKluba.setAttribute("type", "text");
        inputImeKluba.className = "InputKontrole";
        ImeKluba.appendChild(inputImeKluba);

        //Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Prikazi, Odustani;
        var Dugmici = [Prikazi, Odustani];
        var DugmiciLabele = ["Prikazi", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        
        Dugmici[0].onclick = (ev) => {
            if (inputImeKluba.value === "")
                alert("Morate uneti ime kluba!");
            
          
          
            this.PrikaziIgraceKluba(inputImeKluba.value);

        }
    
        let GlavnaForma = document.querySelector(".FormaPrikaz");
        Dugmici[1].onclick = (ev) => this.CrtajKontroleKlub(host);
        Dugmici[1].onClick = (ev) => this.prikaziKlubove(GlavnaForma);

    }
    PrikaziIgraceKluba(ImeKluba){

        var FormaPrikaz = document.querySelector(".FormaPrikaz");
        this.removeAllChildNodes(FormaPrikaz);

        this.listaIgraca = [];

        fetch("https://localhost:5001/Klub/Igraci_kluba/" + ImeKluba, {method:"GET"})
            .then(p => {
                p.json().then(Igraci => {
                    Igraci.forEach(I => {
                        console.log(I);
                        var player = new Igrac(I.broj_Legitimacije, I.ime, I.prezime, I.datumrodjenja, I.bodovi, I.klub);
                        this.listaIgraca.push(player);
                    });

                    //#region Prikaz tabele sa Igracim

                    this.DodajHeader(FormaPrikaz, "Lista igraca");

                    var IgraciTabela = document.createElement("table");
                    IgraciTabela.className = "TabelaIgraci";
                    FormaPrikaz.append(IgraciTabela);

                    var IgraciHead = document.createElement("thead");
                    IgraciTabela.appendChild(IgraciHead);

                    var tr = document.createElement("tr");
                    IgraciHead.appendChild(tr);

                    let th;
                    var Head = ["Broj legitimacije", "Ime", "Prezime", "Datum rodjenja", "Bodovi", "Klub"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var IgraciBody = document.createElement("tbody");
                    IgraciBody.className = "IgraciPodaci";
                    IgraciTabela.appendChild(IgraciBody);

                    this.listaIgraca.forEach(I => {
                        I.crtaj(IgraciTabela);
                    })

                    //#endregion 
                })

            });

    }

    //SUDIJE funkc

    prikaziSudije(host) {

        this.removeAllChildNodes(host);

        this.listaSudija = [];

        fetch("https://localhost:5001/Sudija/Sve_sudije")
            .then(p => {
                p.json().then(Sudije => {
                    Sudije.forEach(S => {
                        //console.log(K);
                        var Arbitar = new Sudija(S.ime, S.prezime, S.klasa);
                        this.listaSudija.push(Arbitar);
                        //console.log(K);
                    });

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    var FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaPrikaz, "Lista sudija");

                    var SudijeTabela = document.createElement("table");
                    SudijeTabela.className = "TabelaSudije";
                    FormaPrikaz.append(SudijeTabela);

                    var SudijeNaslov = document.createElement("thead");
                    SudijeTabela.appendChild(SudijeNaslov);

                    var tr = document.createElement("tr");
                    SudijeNaslov.appendChild(tr);

                    let th;
                    var Head = ["Ime", "Prezime", "Klasa"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var SudijeBody = document.createElement("tbody");
                    SudijeBody.className = "SudijePodaci";
                    SudijeTabela.appendChild(SudijeBody);

                    this.listaSudija.forEach(K => {
                        K.crtaj(SudijeTabela);
                    })

                    // Kraj za deo koji prikazuje klubove

                    // Deo koji prikazuje kontrole

                    this.DodajHeader(FormaKontrole, "Kontrole sudija:");

                    this.CrtajKontroleSudija(FormaKontrole);
                })
            });

    }
   
    CrtajKontroleSudija(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Sudija:");

        var Kontrole = ["Dodaj sudiju", "Suđeni turniri", "Obriši sudiju"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.CrtajKontroleSudija_Dodaj(host);
        btnsKontrole[1].onclick = (ev) => this.CrtajKontroleSudija_Turniri(host);
        btnsKontrole[2].onclick = (ev) => this.CrtajKontroleSudija_Brisanje(host);

    }
     
    CrtajKontroleSudija_Dodaj(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o igracu");

        var i = 0;

        var Polja = ["Ime", "Prezime", "Klasa"];

        var Ime, Prezime, Klasa;
        var Divs = [Ime, Prezime, Klasa];

        var lblIme, lblPrezime, lblKlasa;
        var LabeleTekst = ["Ime", "Prezime", "Klasa"];
        var Labele = [lblIme, lblPrezime, lblKlasa];

        var inputIme, inputPrezime, inputKlasa;
        var Inputs = [inputIme, inputPrezime, inputKlasa];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labele[i] = document.createElement("label");
            Labele[i].className = "LabeleKontrole";
            Labele[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labele[i]);

            if (i === 2) {
                Inputs[i] = document.createElement("select");
                Inputs[i].className = "LabeleKontrole";

                let Titule = ["NS", "MS"];

                let Title;

                let j = 0;

                Titule.forEach(T => {

                    Title = document.createElement("option");
                    Title.innerHTML = T;
                    Title.value = j++;
                    Inputs[i].appendChild(Title);
                })

                Divs[i].appendChild(Inputs[i]);
            } else {
                Inputs[i] = document.createElement("input");
                Inputs[i].setAttribute("type", "text");
                Inputs[i].className = "InputKontrole";
                Divs[i].appendChild(Inputs[i]);
            }

            i++;
        });

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {

            if (Inputs[0].value === "") {
                alert("Morate uneti ime sudije!");
                return;
            }
            if (Inputs[1].value === "") {
                alert("Morate uneti prezime sudije!");
                return;
            }
            this.DodajSudiju(Inputs[0].value, Inputs[1].value, Inputs[2].value);
        }

        Dugmici[1].onclick = (ev) => this.CrtajKontroleSudija(host);
    }
    DodajSudiju(Ime, Prezime, Klasa) {

        //console.log(Kategorija);

        fetch("https://localhost:5001/Sudija/Unos_sudije/" + Ime + "/" + Prezime + "/" + Klasa, {
            method: 'POST',
            body: JSON.stringify({
                "Ime": Ime,
                "Prezime": Prezime,
                "Kategorija": Klasa
            })
        }).then(Response => {

            let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");

            this.prikaziSudije(GlavnaForma);

        });
    }

    CrtajKontroleSudija_Turniri(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o sudiji");

        var i = 0;

        var Polja = ["Ime", "Prezime"];

        var Ime, Prezime;
        var Divs = [Ime, Prezime];

        var lblIme, lblPrezime;
        var LabeleTekst = ["Ime", "Prezime"];
        var Labeble = [lblIme, lblPrezime];

        var inputIme, inputPrezime;
        var Inputs = [inputIme, inputPrezime];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);


            Inputs[i] = document.createElement("input");
            Inputs[i].setAttribute("type", "text");
            Inputs[i].className = "InputKontrole";
            Divs[i].appendChild(Inputs[i]);

            i++;
        });

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Pretrazi", "Odustani"];

        i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            if (Inputs[0].value === "") {
                alert("Morate uneti ime sudije!");
                return;
            }
            if (Inputs[1].value === "") {
                alert("Morate uneti prezime sudije!");
                return;
            }
            let GlavnaForma = document.querySelector(".GlavnaForma");
            var Nazad = document.createElement("button");
            Nazad.innerHTML = "Nazad";
            Nazad.className = "Nazad";
            Btns.appendChild(Nazad);
            Nazad.onclick = (ev) => this.prikaziSudije(GlavnaForma);
            this.Sudjeni_Turniri(Inputs[0].value, Inputs[1].value);
            Btns.removeChild(Dugmici[0]);
            Btns.removeChild(Dugmici[1]);
        }
       
        Dugmici[1].onclick = (ev) => this.CrtajKontroleSudija(host);
        let GlavnaForma = document.querySelector(".GlavnaForma");
        Dugmici[1].onclick = (ev) => this.prikaziSudije(GlavnaForma);
    
    }
   
    Sudjeni_Turniri(Ime, Prezime) {

        let FormaPrikaz = this.kontejner.querySelector(".FormaPrikaz");
        this.removeAllChildNodes(FormaPrikaz);

        this.listaTurnira = [];
        fetch("https://localhost:5001/Sudija/Vrati_sudjene_turnire/" + Ime + "/" + Prezime, {method:"GET"})
            .then(p => {
                p.json().then(Turniri => {
                    Turniri.forEach(T => {
                        console.log(T);
                        var turnir = new Turnir(T.ime_Turnira,T.organizatorTurnira,T.datum_pocetka,T.mesto_Odrzavanja,T.nagrada,T.osvajac_Turnira,T.sudija);
                        this.listaTurnira.push(turnir);
                    });

                    this.DodajHeader(FormaPrikaz, "Lista turnira");

                    var TurniriTabela = document.createElement("table");
                    TurniriTabela.className = "TabelaTurniri";
                    FormaPrikaz.append(TurniriTabela);

                    var TurniriHead = document.createElement("thead");
                    TurniriTabela.appendChild(TurniriHead);

                    var tr = document.createElement("tr");
                    TurniriHead.appendChild(tr);

                    let th;
                    var Head = ["Ime_Turnira", "Datum početka","Mesto održavanja", "Nagrada","Organizator turnira", "Osvajač turnira", "Sudija"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var TurniriBody = document.createElement("tbody");
                    TurniriBody.className = "TurniriPodaci";
                    TurniriTabela.appendChild(TurniriBody);

                    this.listaTurnira.forEach(T => {
                        T.crtaj(TurniriTabela);
                    })
                })
            });
    }
    CrtajKontroleSudija_Brisanje(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Brisanje sudije");

        var i = 0;

        var Polja = ["Ime", "Prezime"];

        var Ime, Prezime;
        var Divs = [Ime, Prezime];

        var lblIme, lblPrezime;
        var LabeleTekst = ["Ime:", "Prezime:"];
        var Labeble = [lblIme, lblPrezime];

        var inputIme, inputPrezime;
        var Inputs = [inputIme, inputPrezime];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);


            Inputs[i] = document.createElement("input");
            Inputs[i].setAttribute("type", "text");
            Inputs[i].className = "InputKontrole";
            Divs[i].appendChild(Inputs[i]);

            i++;
        });

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Obrisi, Odustani;
        var Dugmici = [Obrisi, Odustani];
        var DugmiciLabele = ["Obrisi", "Odustani"];

        i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            if (Inputs[0].value === "") {
                alert("Morate uneti ime sudije!");
                return;
            }
            if (Inputs[1].value === "") {
                alert("Morate uneti prezime sudije!");
                return;
            }
            this.Obrisi_Sudiju(Inputs[0].value, Inputs[1].value);
        }

        Dugmici[1].onclick = (ev) => this.CrtajKontroleSudija(host);
    }
    Obrisi_Sudiju(Ime, Prezime) {

        let FormaKontrole = this.kontejner.querySelector('.FormaKontrole');
        this.removeAllChildNodes(FormaKontrole);

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Brisanje sudije";
        FormaKontrole.appendChild(H2K);

        fetch("https://localhost:5001/Sudija/Brisanje_sudije/" + Ime + "/" + Prezime, {
            method: "DELETE",
            body: JSON.stringify({
                "Ime": Ime,
                "Prezime": Prezime
            })
        }).then(Response => {

            let Forma = document.createElement("div");
            FormaKontrole.appendChild(Forma);
            let Poruka = document.createElement("h2");
            Poruka.className = "LabeleKontrole";
            Poruka.innerHTML = "Sudija " + Ime + " " + Prezime + " je uspesno obrisan!";
            Forma.appendChild(Poruka);

            var Btns = document.createElement("div");
            Btns.className = "Meni";
            FormaKontrole.appendChild(Btns);

            var Odustani = document.createElement("button");
            Odustani.innerHTML = "Zatvori";
            Odustani.className = " Zatvori"
            Btns.appendChild(Odustani);

            let GlavnaForma = document.querySelector(".GlavnaForma");
            this.prikaziSudije(GlavnaForma);

            Odustani.onclick = (ev) => this.CrtajKontroleSudija(FormaPrikaz);
            Odustani.onclick = (ev) => this.prikaziSudije(GlavnaForma);
        });

    }
    prikaziMeceve(host) {
        this.removeAllChildNodes(host);

        this.listaMeceva = [];

        fetch("https://localhost:5001/Turnir/Svi_mecevi", {method:"GET"})
            .then(p => {
                p.json().then(Mecevi => {
                    Mecevi.forEach(M => {
                        console.log(M);
                        var mec = new Mec(M.igrac1, M.igrac2, M.turnir, M.kolo, M.rezultat);
                        this.listaMeceva.push(mec);
                        //console.log(K);
                    });

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    var FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaPrikaz, "Lista meceva");

                    var MeceviTabela = document.createElement("table");
                    MeceviTabela.className = "TabelaMecevi";
                    FormaPrikaz.append(MeceviTabela);

                    var MeceviHead = document.createElement("thead");
                    MeceviTabela.appendChild(MeceviHead);

                    var tr = document.createElement("tr");
                    MeceviHead.appendChild(tr);

                    let th;
                    var Head = ["Igrac 1", "Rezultat", "Igrac 2", "Turnir", "Kolo"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var MeceviBody = document.createElement("tbody");
                    MeceviBody.className = "MeceviPodaci";
                    MeceviTabela.appendChild(MeceviBody);

                    this.listaMeceva.forEach(M => {
                        console.log(M);
                        M.crtaj(MeceviTabela);
                    })

                    // Kraj za deo koji prikazuje klubove

                    // Deo koji prikazuje kontrole

                    this.DodajHeader(FormaKontrole, "Mec:");

                    this.CrtajKontroleMecevi(FormaKontrole);
                })
            });

    }
    CrtajKontroleMecevi(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Mec:");

        var Kontrole = ["Mecevi igraca"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.KontroleMecevi_Trazi(host);
    }
  
    KontroleMecevi_Trazi(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Mecevi igraca");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        //  Broj_Legitimacije

        var Broj_Legitimacije = document.createElement("div");
        Broj_Legitimacije.className = "IgracKontrole";
        PoljeKontrole.appendChild(Broj_Legitimacije);

        var lblBroj_Legitimacije = document.createElement("label");
        lblBroj_Legitimacije.className = "LabeleKontrole";
        lblBroj_Legitimacije.innerHTML = "Broj legitimacije:";
        Broj_Legitimacije.appendChild(lblBroj_Legitimacije);

        var inputBroj_Legitimacije = document.createElement("input");
        inputBroj_Legitimacije.setAttribute("type", "text");
        inputBroj_Legitimacije.className = "InputKontrole";
        Broj_Legitimacije.appendChild(inputBroj_Legitimacije);

        //Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Pretrazi, Odustani;
        var Dugmici = [Pretrazi, Odustani];
        var DugmiciLabele = ["Pretrazi", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            if (inputBroj_Legitimacije.value === "") {
                alert("Morate uneti ime!");
                return;
            }

            this.PretraziMeceveIgraca(host, inputBroj_Legitimacije.value);
        }

        Dugmici[1].onclick = (ev) => this.CrtajKontroleMecevi(host);
    }
    PretraziMeceveIgraca(host, Broj_Legitimacije) {

        var FormaPrikaz = document.querySelector(".FormaPrikaz");
        this.removeAllChildNodes(FormaPrikaz);

        this.listaMeceva = [];

        fetch("https://localhost:5001/Turnir/Mecevi_igrac/" + Broj_Legitimacije)
            .then(p => {
                p.json().then(Mecevi => {
                    Mecevi.forEach(M => {
                        console.log(M);
                        var mec = new Mec(M.igrac1, M.igrac2, M.turnir, M.kolo, M.rezultat);
                        this.listaMeceva.push(mec);
                        //console.log(K);
                    });

                    this.DodajHeader(FormaPrikaz, "Mecevi igraca:");

                    var MeceviTabela = document.createElement("table");
                    MeceviTabela.className = "TabelaMecevi";
                    FormaPrikaz.append(MeceviTabela);

                    var MeceviHead = document.createElement("thead");
                    MeceviTabela.appendChild(MeceviHead);

                    var tr = document.createElement("tr");
                    MeceviHead.appendChild(tr);

                    let th;
                    var Head = ["Igrac 1", "Rezultat", "Igrac 2", "Turnir", "Kolo"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var MeceviBody = document.createElement("tbody");
                    MeceviBody.className = "MeceviPodaci";
                    MeceviTabela.appendChild(MeceviBody);

                    this.listaMeceva.forEach(M => {
                        console.log(M);
                        M.crtaj(MeceviTabela);
                    })

                    // Kraj za deo koji prikazuje klubove
                })
            });
    }


    //TURNIR
    prikaziTurnire(host) {
        this.removeAllChildNodes(host);

        this.listaTurnira = [];
        fetch("https://localhost:5001/Turnir/Svi_turniri", {method:'GET'})
            .then(p => {
                p.json().then(Turniri => {
                    Turniri.forEach(T => {
                        //console.log(T);
                        var turnir = new Turnir(T.turnir_ID,T.ime_Turnira, T.organizatorTurnira, T.datum_pocetka, T.mesto_Odrzavanja, T.nagrada, T.osvajac_Turnira, T.sudija);
                        this.listaTurnira.push(turnir);
                        console.log(turnir);
                    });

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikazTurniri";
                    host.appendChild(FormaPrikaz);

                    this.DodajHeader(FormaPrikaz, "Lista turnira");

                    var DodajTurnir = document.createElement("div");
                    DodajTurnir.className = "divDodajTurnir";
                    FormaPrikaz.appendChild(DodajTurnir);

                    var btnDodajTurnir = document.createElement("button");
                    btnDodajTurnir.innerHTML = "Dodaj turnir";
                    btnDodajTurnir.className = "btnDodajTurnir";
                    DodajTurnir.appendChild(btnDodajTurnir);

                    btnDodajTurnir.onclick = (ev) => this.CrtajKontroleTurnir_Dodaj(host);

                    var TurniriTabela = document.createElement("table");
                    TurniriTabela.className = "TabelaTurniri";
                    FormaPrikaz.append(TurniriTabela);

                    var TurniriHead = document.createElement("thead");
                    TurniriTabela.appendChild(TurniriHead);

                    var tr = document.createElement("tr");
                    TurniriHead.appendChild(tr);

                    let th;
                    var Head = ["Ime_Turnira", "Datum pocetka","Mesto", "Nagrada", "Klub organizator", "Pobednik", "Sudija", ""];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var TurniriBody = document.createElement("tbody");
                    TurniriBody.className = "TurniriPodaci";
                    TurniriTabela.appendChild(TurniriBody);

                    this.listaTurnira.forEach(T => {
                        T.crtaj(TurniriTabela);
                    })

                    this.kontejner.querySelectorAll(".RedTurnir").forEach(R => {

                        var tdPretrazi = document.createElement("td");
                        var btnPregledaj = document.createElement("button");


                        let Ime_Turnira = R.querySelector(".ime_Turnira");
                        btnPregledaj.innerHTML = "Pregledaj";
                        btnPregledaj.className = "DugmePregledaj";
                        var s = Ime_Turnira.innerHTML;
                        btnPregledaj.onclick = (ev) => this.prikaziTurnir(host, s);


                        tdPretrazi.appendChild(btnPregledaj);

                        R.appendChild(tdPretrazi);
                    })

                    // Kraj za deo koji prikazuje klubove


                })
            });
    }
    CrtajKontroleTurnir_Dodaj(host) {
        this.removeAllChildNodes(host);

        var FormaKontrole = document.createElement("div");
        FormaKontrole.className = "FormaKontrole";
        host.appendChild(FormaKontrole);

        this.DodajHeader(FormaKontrole, "Dodaj novi turnir");


        var i = 0;

        var Ime_turnira, Klub, Datum, Mesto, Nagrada, SudijaIme, SudijaPrezime;
        var Divs = [Ime_turnira, Klub, Datum, Mesto, Nagrada, SudijaIme, SudijaPrezime];

        var lblIme_turnira, lblKlub, lblDatum, lblMesto, lblNagrada, lblSudijaIme, lblSudijaPrezime;
        var LabeleTekst = ["Ime_turnira:", "Klub organizator:", "Datum pocetka:", "Mesto:", "Nagrada:", "Ime sudije:", "Prezime sudije:"];
        var Labeble = [lblIme_turnira, lblKlub, lblDatum, lblMesto, lblNagrada, lblSudijaIme, lblSudijaPrezime];

        var inputIme_turnira, inputKlub, inputDatum, inputMesto, inputNagrada, inputSudijaIme, inputSudijaPrezime;
        var Inputs = [inputIme_turnira, inputKlub, inputDatum, inputMesto, inputNagrada, inputSudijaIme, inputSudijaPrezime];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        FormaKontrole.appendChild(PoljeKontrole);

        LabeleTekst.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = D;
            Divs[i].appendChild(Labeble[i]);

            if (i === 2) {
                Inputs[i] = document.createElement("input");
                Inputs[i].setAttribute("type", "date");
                Inputs[i].className = "InputKontrole";
                Divs[i].appendChild(Inputs[i]);
            } else {
                Inputs[i] = document.createElement("input");
                Inputs[i].setAttribute("type", "text");
                Inputs[i].className = "InputKontrole";
                Divs[i].appendChild(Inputs[i]);
            }

            i++;
        })

        //Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        FormaKontrole.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            // if (Inputs[0].value === "" || Inputs[1].value === "" || Inp.value === "" || inputKlub.value === "")
            //   alert("Morate uneti podatke za Broj_Legitimacije, Ime, Prezime i Klub!");

            console.log(Inputs[0].value, Inputs[1].value, Inputs[2].value, Inputs[3].value, Inputs[4].value, Inputs[5].value, Inputs[6].value);

            this.DodajTurnir(Inputs[0].value, Inputs[1].value, Inputs[2].value, Inputs[3].value, Inputs[4].value, Inputs[5].value, Inputs[6].value);
        }

        Dugmici[1].onclick = (ev) => this.prikaziTurnire(host);
    }

    DodajTurnir(Ime_turnira, Organizator_turnira, Pocetak, Mesto, Nagrada, SudijaIme, SudijaPrezime) {
        fetch("https://localhost:5001/Turnir/Unos_turnira/" + Ime_turnira + "/" + Organizator_turnira + "/" + Pocetak + "/" + Mesto + "/" + Nagrada + "/" + SudijaIme + "/" + SudijaPrezime, {
            method: 'POST',
            body: JSON.stringify({
                "Ime_turnira": Ime_turnira,
                "Organizator_turnira": Organizator_turnira,
                "Pocetak": Pocetak,
                "Mesto": Mesto,
                "Nagrada": Nagrada,
                "SudijaIme": SudijaIme,
                "SudijaPrezime": SudijaPrezime
            })
        }).then(Response => {

            let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");

            this.prikaziTurnire(GlavnaForma);

        });
    }




    prikaziTurnir(host, Ime_Turnira) {
        this.removeAllChildNodes(host);

        let FormaPrikaz = document.createElement("div");
        FormaPrikaz.className = "FormaPrikaz";
        host.appendChild(FormaPrikaz);

        var FormaKontrole = document.createElement("div");
        FormaKontrole.className = "FormaKontrole";
        host.appendChild(FormaKontrole);


        this.DodajHeader(FormaPrikaz, "Turnir: " + Ime_Turnira);

        this.listaTurnira = [];


        var turnir;

        this.DodajHeader(FormaPrikaz, "Lista prijavljenih igraca:");

        fetch("https://localhost:5001/Turnir/Pregledaj_turnir/" + Ime_Turnira, {method:"GET"})
            .then(p => {
                p.json().then(T => {

                    var turnir = new Turnir(T.turnir_ID,T.ime_Turnira, T.organizatorTurnira, T.datum_pocetka, T.mesto_Odrzavanja, T.nagrada, T.osvajac_Turnira, T.sudija);
                    this.listaTurnira.push(turnir);
                })

                //#region Prikaz tabele sa Igracim

                fetch("https://localhost:5001/Turnir/Prijavljeni_igraci/" + Ime_Turnira
                ,{method:"GET"})
                    .then(p => {
                        p.json().then(Igraci => {

                            Igraci.forEach(I => {

                                var Igr = new Igrac(I.broj_Legitimacije , I.ime, I.prezime, I.datumrodjenja, I.bodovi, I.klub);
                                console.log(Igr);
                                this.listaTurnira[0].prijavljeni_Igraci.push(Igr);
                            })

                            var IgraciTabela = document.createElement("table");
                            IgraciTabela.className = "TabelaIgraci";
                            FormaPrikaz.append(IgraciTabela);

                            var IgraciHead = document.createElement("thead");
                            IgraciTabela.appendChild(IgraciHead);

                            var tr = document.createElement("tr");
                            IgraciHead.appendChild(tr);

                            let th;
                            var Head = ["Broj Legitimacije", "Ime", "Prezime", "Datum rodjenja", "Bodovi", "Klub"];
                            Head.forEach(el => {
                                th = document.createElement("th");
                                th.innerHTML = el;
                                tr.appendChild(th);
                            })

                            var IgraciBody = document.createElement("tbody");
                            IgraciBody.className = "IgraciPodaci";
                            IgraciTabela.appendChild(IgraciBody);

                            this.listaTurnira[0].prijavljeni_Igraci.forEach(I => {

                                console.log(I);
                                I.crtaj(IgraciTabela);
                            })
                        })


                    })
            });


        this.DodajHeader(FormaKontrole, "Turnir:");

        this.IscrtajKontrole_Izabrani_Turnir(FormaKontrole);

    }

    IscrtajKontrole_Izabrani_Turnir(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Mec:");

        var Kontrole = ["Upisi igraca", "Dodaj kolo", "Upisi rezultate kola", "Proglasi pobednika"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleTurnir_UpisiIgraca(host);
        btnsKontrole[1].onclick = (ev) => this.IscrtajKontroleTurnir_DodajKolo(host);

        let GlavnaForma = document.querySelector(".GlavnaForma");
        btnsKontrole[2].onclick = (ev) => this.Iscrtaj_Turnir_Upisi_Rezultate(GlavnaForma);
        btnsKontrole[3].onclick = (ev) => this.Proglasi_Pobednika(host);
    }

    IscrtajKontroleTurnir_UpisiIgraca(host) {
        this.removeAllChildNodes(host);
        this.DodajHeader(host, "Upisi igraca:");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        // Polja za prikaz

        var Broj_Legitimacije = document.createElement("div");
        Broj_Legitimacije.className = "IgracKontrole";
        PoljeKontrole.appendChild(Broj_Legitimacije);

        var lblBroj_Legitimacije = document.createElement("label");
        lblBroj_Legitimacije.className = "LabeleKontrole";
        lblBroj_Legitimacije.innerHTML = "Broj_Legitimacije";
        Broj_Legitimacije.appendChild(lblBroj_Legitimacije);

        var inputBroj_Legitimacije = document.createElement("input");
        inputBroj_Legitimacije.setAttribute("type", "text");
        inputBroj_Legitimacije.className = "InputKontrole";
        Broj_Legitimacije.appendChild(inputBroj_Legitimacije);


        // Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj = document.createElement("button");
        Dodaj.innerHTML = "Dodaj";
        Dodaj.className = "Dodaj";
        Btns.appendChild(Dodaj);

        Dodaj.onclick = (ev) => {
            if (inputBroj_Legitimacije.value === "") {
                alert("Morate uneti broj legitimacije igraca!");
                return;
            }

            console.log(this.listaTurnira[0].ime_Turnira);

            console.log(inputBroj_Legitimacije.value);

            this.Dodaj_Igraca_u_Listu(this.listaTurnira[0].ime_Turnira, inputBroj_Legitimacije.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = " Odustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.IscrtajKontrole_Izabrani_Turnir(host);
    }

    Dodaj_Igraca_u_Listu(Ime_Turnira, Broj_Legitimacije) {

       console.log(Ime_Turnira);

        console.log(Broj_Legitimacije);


        fetch("https://localhost:5001/Turnir/Upisi_igraca/" + Ime_Turnira + "/" + Broj_Legitimacije, {
            method: 'PUT',
            body: JSON.stringify({
                "Ime_Turnira": Ime_Turnira,
                "Broj_Legitimacije": Broj_Legitimacije
            })
        }).then(Response => {

            let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");
            console.log(this.listaTurnira[0]);
            this.prikaziTurnir(GlavnaForma, this.listaTurnira[0].ime_Turnira);

        });
    }


    IscrtajKontroleTurnir_DodajKolo(host) {
        this.removeAllChildNodes(host);
        this.DodajHeader(host, "Kreiraj kolo:");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var Kolo = document.createElement("div");
        Kolo.className = "IgracKontrole";
        PoljeKontrole.appendChild(Kolo);

        var labelKolo = document.createElement("label");
        labelKolo.className = "LabeleKontrole";
        labelKolo.innerHTML = "Redni broj kola:";
        Kolo.appendChild(labelKolo);

        var inputKolo = document.createElement("select");
        inputKolo.className = "LabeleKontrole";

        let Kola = ["1", "2", "3", "4", "5"];

        let Opcija;

        let j = 1;

        Kola.forEach(K => {

            Opcija = document.createElement("option");
            Opcija.innerHTML = K;
            Opcija.value = j++;
            inputKolo.appendChild(Opcija);
        })

        Kolo.appendChild(inputKolo);

        // Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = D;
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {

            console.log("Trenutno kolo je: " + this.listaTurnira[0].KoloPoRedu);

            console.log(inputKolo.value);

            if (inputKolo.value != this.listaTurnira[0].KoloPoRedu)
                alert("Mozete kreirati kolo broj " + this.listaTurnira[0].KoloPoRedu + "!");

            console.log(this.listaTurnira[0].ostali_Igraci);
            console.log(this.listaTurnira[0].ostali_Igraci.length);

            let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");

            this.Kreiraj_Kolo(GlavnaForma, inputKolo.value)
        }

        Dugmici[1].onclick = (ev) => this.IscrtajKontrole_Izabrani_Turnir(host);

        //Naoravi da kada se kreria kolo da mogu da se prikazu redom mecevi
    }

    Kreiraj_Kolo(host, KoloPoRedu) {
        // Ova metoda nam vraca meceve tog kola

        this.removeAllChildNodes(host);

        if (KoloPoRedu == 1) {
            this.listaTurnira[0].ostali_Igraci = this.listaTurnira[0].prijavljeni_Igraci;
        }

        if (this.listaTurnira[0].ostali_Igraci.length === 1)
            alert("Ostao je samo jedan igrac, vreme je da se proglasi pobednik!");

        this.listaTurnira[0].listaMeceva = [];

        fetch("https://localhost:5001/Turnir/Dodaj_kolo/" + this.listaTurnira[0].ime_Turnira + "/" + KoloPoRedu, {
            method: 'PUT',
            body: JSON.stringify({
                "Ime_turnira": this.listaTurnira[0].ime_Turnira,
                "KoloPoRedu": KoloPoRedu
            })
        }).then(Response => {
            var GlavnaForma = document.querySelector(".GlavnaForma");
            this.Prikazi_Ostale_Igrace(GlavnaForma);
        });
    }

    Iscrtaj_Turnir_Upisi_Rezultate(host,turnir) {
        this.removeAllChildNodes(host);

        // Deo za prikaz meceva
        var mecevi =[];

        this.listaTurnira[0].Mecevi = [];
        
        console.log(this.listaTurnira);

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    var FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    //this.DodajHeader(FormaPrikaz, "Turnir: " + this.listaTurnira[0].ime_Turnira +" "+" Kolo: " + this.listaTurnira[0].KoloPoRedu);

                    var MeceviTabela = document.createElement("table");
                    MeceviTabela.className = "TabelaMecevi";
                    FormaPrikaz.append(MeceviTabela);

                    var MeceviHead = document.createElement("thead");
                    MeceviTabela.appendChild(MeceviHead);

                    var tr = document.createElement("tr");
                    MeceviHead.appendChild(tr);

                    let th;
                    var Head = ["Igrac1", "Rezultat", "Igrac2"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var MeceviBody = document.createElement("tbody");
                    MeceviBody.className = "MeceviPodaci";
                    MeceviTabela.appendChild(MeceviBody);

        fetch("https://localhost:5001/Turnir/Pogledaj_kolo_proba?Turnir_ID="+this.listaTurnira[0].turnir_ID+"&KoloPoRedu="+this.listaTurnira[0].KoloPoRedu)
            .then(p => {
                p.json().then(Mecevi => {
                    Mecevi.forEach(M => {
                        console.log(M);
                        var mec = new Mec(M.igrac1, M.igrac2, M.turnir, M.kolo, null);
                        this.listaTurnira[0].Mecevi.push(mec);
                        mec.crtaj_Turnir_Mec(MeceviTabela);
                        //console.log(K);
                    });

                /*    console.log(this.listaTurnira[0].KoloPoRedu);

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    var FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaPrikaz, "Turnir: " + this.listaTurnira[0].ime_Turnira +" "+" Kolo: " + this.listaTurnira[0].KoloPoRedu);

                    var MeceviTabela = document.createElement("table");
                    MeceviTabela.className = "TabelaMecevi";
                    FormaPrikaz.append(MeceviTabela);

                    var MeceviHead = document.createElement("thead");
                    MeceviTabela.appendChild(MeceviHead);

                    var tr = document.createElement("tr");
                    MeceviHead.appendChild(tr);

                    let th;
                    var Head = ["Igrac1", "Rezultat", "Igrac2"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var MeceviBody = document.createElement("tbody");
                    MeceviBody.className = "MeceviPodaci";
                    MeceviTabela.appendChild(MeceviBody);*/

                
                    // Kraj za deo koji prikazuje klubove

                    // Deo koji prikazuje kontrole

                    this.DodajHeader(FormaKontrole, "Sacuvaj rezultate");

                    var Sacuvaj = document.createElement("div");
                    Sacuvaj.className = "IgracKontrole";
                    FormaKontrole.appendChild(Sacuvaj);

                    var btnSacuvaj = document.createElement("button");
                    btnSacuvaj.innerHTML = "Sacuvaj";
                    btnSacuvaj.className = "btnSacuvaj"
                    Sacuvaj.appendChild(btnSacuvaj);

                    btnSacuvaj.onclick = (ev) => this.Unesi_Rezultate_Kola();
                })
            });
    }

    Unesi_Rezultate_Kola() {

        var Rezultati = [];

        console.log(this.kontejner.querySelectorAll(".mecRezultat"));

        this.kontejner.querySelectorAll(".mecRezultat").forEach(R => {
            console.log(R);
            Rezultati.push(R.value);
            var StringF = "https://localhost:5001/Turnir/Upisi_rezultate_kola?Turnir_ID=" + this.listaTurnira[0].turnir_ID + "&KoloPoRedu=" + this.listaTurnira[0].KoloPoRedu+"&rezultati="+R.innerText.charAt(0)+"&rezultati="+R.innerText.charAt(4);
        
            //Turnir/Upisi_rezultate_kola?Turnir_ID=2&KoloPoRedu=1&rezultati=3&rezultati=1
        fetch(StringF,{
            method: 'PUT',
        }).then(Response => {

            this.listaTurnira[0].KoloPoRedu = this.listaTurnira[0].KoloPoRedu + 1;

            let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");
            this.Prikazi_Ostale_Igrace(GlavnaForma);
        });
        
        
        
        });

        //console.log(Rezultati);

        //console.log(Rezultati);
        //var StringF = "https://localhost:5001/Turnir/Upisi_rezultate_kola?Turnir_ID=" + this.listaTurnira[0].turnir_ID + "&KoloPoRedu=" + this.listaTurnira[0].KoloPoRedu+"&";
        
        //Turnir/Upisi_rezultate_kola?Turnir_ID=2&KoloPoRedu=1&rezultati=3&rezultati=1
       /* Rezultati.forEach(R => {
            console.log(R);
            StringF = StringF + R ;
        })*/

       /* var String_Fetch = StringF.substring(0, StringF.length - 1);
        console.log(String_Fetch);*/

        /*fetch(StringF,{
            method: 'PUT',
        }).then(Response => {

            this.listaTurnira[0].KoloPoRedu = this.listaTurnira[0].KoloPoRedu + 1;

            let GlavnaForma = this.kontejner.querySelector(".GlavnaForma");
            this.Prikazi_Ostale_Igrace(GlavnaForma);
        });*/
    }

    
    Prikazi_Ostale_Igrace(host) {

        this.removeAllChildNodes(host);
        this.listaTurnira[0].ostali_Igraci = [];

        let FormaPrikaz = document.createElement("div");
        FormaPrikaz.className = "FormaPrikaz";
        host.appendChild(FormaPrikaz);

        if (this.listaTurnira[0].kolo == 1) {
            this.DodajHeader(FormaPrikaz, "Prijavljeni igraci");
        } else {
            this.DodajHeader(FormaPrikaz, "Ostali igraci nakon " + this.listaTurnira[0].KoloPoRedu-1 + ". kola:");
        }
        var FormaKontrole = document.createElement("div");
        FormaKontrole.className = "FormaKontrole";
        host.appendChild(FormaKontrole);

        fetch("https://localhost:5001/Turnir/Ostali_igraci/" + this.listaTurnira[0].ime_Turnira)
            .then(p => {
                p.json().then(Igraci => {

                    Igraci.forEach(I => {

                        var player = new Igrac(I.broj_Legitimacije, I.ime, I.prezime, I.datumrodjenja, I.bodovi, I.klub);
                        //console.log(player);
                        this.listaTurnira[0].ostali_Igraci.push(player);
                    })

                    var IgraciTabela = document.createElement("table");
                    IgraciTabela.className = "TabelaIgraci";
                    FormaPrikaz.append(IgraciTabela);

                    var IgraciHead = document.createElement("thead");
                    IgraciTabela.appendChild(IgraciHead);

                    var tr = document.createElement("tr");
                    IgraciHead.appendChild(tr);

                    let th;
                    var Head = ["Broj_Legitimacije", "Ime", "Prezime", "Datum rodjenja", "Bodovi", "Klub"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var IgraciBody = document.createElement("tbody");
                    IgraciBody.className = "IgraciPodaci";
                    IgraciTabela.appendChild(IgraciBody);

                    this.listaTurnira[0].ostali_Igraci.forEach(I => {

                        //console.log(I);
                        I.crtaj(IgraciTabela);
                    })
                })


            })

        this.DodajHeader(FormaKontrole, "Turnir:");

        this.IscrtajKontrole_Rezultati(FormaKontrole);
    }
    
    IscrtajKontrole_Rezultati(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Tok turnira");

        var Kontrole = ["Dodaj kolo", "Upisi rezultate kola", "Proglasi pobednika"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })


        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleTurnir_DodajKolo(host);

        let GlavnaForma = document.querySelector(".GlavnaForma");
        btnsKontrole[1].onclick = (ev) => this.Iscrtaj_Turnir_Upisi_Rezultate(GlavnaForma);
        btnsKontrole[2].onclick = (ev) => this.Proglasi_Pobednika(host);
    }

    Proglasi_Pobednika(host) {
        this.removeAllChildNodes(host);

        fetch("https://localhost:5001/Turnir/Proglasi_pobednika/" + this.listaTurnira[0].ime_Turnira, {
            method: 'PUT',
            body: JSON.stringify({
                "ime_Turnira": this.listaTurnira[0].ime_Turnira,
            })
        }).then(Response => {

            var Ime_Turnira = this.listaTurnira[0].imeTurnira;
            this.listaTurnira = [];
            fetch("https://localhost:5001/Turnir/Pregledaj_turnir/" + Ime_Turnira, {method:'GET'})
                .then(p => {
                    p.json().then(T => {
                        var turnir = new Turnir(T.ime_Turnira, T.organizatorTurnira, T.datum_pocetka, T.mesto_Odrzavanja, T.nagrada, T.osvajac_Turnira, T.sudija);
                        this.listaTurnira.push(turnir);

                        this.DodajHeader(host, "Pobednik turnira " + this.listaTurnira[0].imeTurnira + " je:");
                        this.Prikazi_Pobednika(host, this.listaTurnira[0].osvajac_Turnira.Broj_Legitimacije);
                    })
                });
            
        });
    }
   
    Prikazi_Pobednika(host, Broj_Legitimacije) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Igrac:");

        // Kontrole

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var i = 0;

        var Polja = ["Broj legitimacije", "Ime", "Prezime", "Datum_Rodjenja", "Bodovi", "Klub"];

        var Broj_Legitimacije, Ime, Prezime, Dat_rodjenja, Bodovi, Klub;
        var Divs = [Broj_Legitimacije, Ime, Prezime, Dat_rodjenja, Bodovi, Klub];

        var lblBroj_Legitimacije, lblIme, lblPrezime, lblDatRodjenja, lblBodovi, lblKlub;
        var LabeleTekst = ["Broj_Legitimacije:", "Ime:", "Prezime:", "Datum rodjenja:", "Bodovi:", "Klub:"];
        var Labeble = [lblBroj_Legitimacije, lblIme, lblPrezime, lblDatRodjenja, lblBodovi, lblKlub];

        var Broj_LegitimacijePrikaz, ImePrikaz, PrezimePrikaz, Dat_rodjenjaPrikaz, BodoviPrikaz, KlubPrikaz;
        var Prikaz = [Broj_LegitimacijePrikaz, ImePrikaz, PrezimePrikaz, Dat_rodjenjaPrikaz, BodoviPrikaz, KlubPrikaz];

        //---------------------------------------------------------------------------------------------------------

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrolePrikaz";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrolePrikaziIgraca";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);

            Prikaz[i] = document.createElement("label");
            Prikaz[i].className = "LabeleKontrolePrikaziIgraca";
            Divs[i].appendChild(Prikaz[i]);

            i++;
        })

        // Fetch

        fetch("https://localhost:5001/Igrac/Pregledaj_igraca/" + Broj_Legitimacije)
            .then(p => {
                p.json().then(I => {

                    //console.log(I);

                    Prikaz[0].innerHTML = I.Broj_Legitimacije;
                    Prikaz[1].innerHTML = I.ime;
                    Prikaz[2].innerHTML = I.prezime;
                    var datum_rodj = new Date(I.datumrodjenja);
                    datum_rodj = datum_rodj.toLocaleDateString('en-UK');
                    Prikaz[3].innerHTML = datum_rodj;
                    Prikaz[4].innerHTML = I.Bodovi;
                    Prikaz[5].innerHTML = I.klub.imeKluba;
                })
            })

        // Dugme Zatvori

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        PoljeKontrole.appendChild(Btns);

        var Zatvori = document.createElement("button");
        Zatvori.innerHTML = "Zatvori";
        Zatvori.className = " Zatvori"
        Btns.appendChild(Zatvori);

        let GlavnaForma = document.querySelector(".GlavnaForma");
        Zatvori.onclick = (ev) => this.prikaziTurnire(GlavnaForma);
    }

}