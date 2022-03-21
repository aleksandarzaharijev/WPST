using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;
using Models;

namespace WPST.Controllers
{
    [ApiController]
    [Route("[controller]")]
     public class TurnirController : ControllerBase
     {
         public Context Context { get; set; }

        public TurnirController(Context context)
        {
            Context = context;
        }

     //POST

     [Route("Unos_turnira/{Ime_turnira}/{Organizator_turnira}/{Pocetak}/{Mesto}/{Nagrada}/{SudijaIme}/{SudijaPrezime}")]
        [HttpPost]
        public async  Task<ActionResult> Dodaj_turnir(string Ime_turnira, string Organizator_turnira, DateTime Pocetak, string Mesto, int Nagrada,string SudijaIme,string SudijaPrezime)
        {
            if (Ime_turnira == "") return BadRequest("Morate uneti ime turnira");
            if (Ime_turnira.Length > 50) return BadRequest("Pogresna duzina Ime_Turnira!");

            var Turnir = Context.Turniri.Where(p => p.Ime_Turnira.CompareTo(Ime_turnira) == 0).FirstOrDefault();

            if (Turnir != null)
            {
                return BadRequest("Turnir sa ovim imenom vec postoji u bazi!");
            }

            var Klub = Context.Klubovi.Where(p => p.ImeKluba.CompareTo(Organizator_turnira) == 0).FirstOrDefault();

            if (Klub == null)
            {
                return BadRequest("Klub sa ovim imenom ne postoji!");
            }

            var sudija=Context.Sudije.Where(p=>p.Ime.CompareTo(SudijaIme)==0 && p.Prezime.CompareTo(SudijaPrezime)==0).FirstOrDefault();

            if (sudija == null)
            {
                return BadRequest("Sudija ne postoji!");
            }

            if (Mesto == "") return BadRequest("Morate uneti mesto");
            if (Mesto.Length > 50) return BadRequest("Pogresna duzina mesto!");

            Turnir turnir = new Turnir();

            turnir.Ime_Turnira = Ime_turnira;
            turnir.OrganizatorTurnira = Klub;
            turnir.Sudija=sudija;
            turnir.Mesto_Odrzavanja = Mesto;
            turnir.Datum_pocetka = Pocetak;
            turnir.Nagrada = Nagrada;
            turnir.Mecevi = new List<Mec>();
            turnir.Prijavljeni_igraci = new List<Igrac>();
            turnir.Osvajac_Turnira = null;

            try
            {
                Context.Turniri.Add(turnir);
                await Context.SaveChangesAsync();
                return Ok($"Turnir {Ime_turnira} je uspesno dodat u bazu!");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        //GET
        [Route("Pregledaj_turnir/{Ime_Turnira}")]
        [HttpGet]
        public ActionResult Vrati_turnir(string Ime_Turnira)
        {
            if (Ime_Turnira == "") return BadRequest("Morate uneti ime turnira!");
            if (Ime_Turnira.Length > 50) return BadRequest("Pogresna duzina imena!");

            var Turnir = Context.Turniri
            .Include(p=>p.OrganizatorTurnira)
            .Include(p=>p.Sudija)
            .Include(p=>p.Osvajac_Turnira)
            .Include(p=>p.Mecevi)
            .Where(p => p.Ime_Turnira.CompareTo(Ime_Turnira) == 0).FirstOrDefault();

            return Ok(Turnir);
        }

        [Route("Prijavljeni_igraci/{Ime_Turnira}")]
        [HttpGet]
        public ActionResult Prijavljeni_igraci(string Ime_Turnira)
        {
            if (Ime_Turnira == "") return BadRequest("Morate uneti ime turnira!");
            if (Ime_Turnira.Length > 50) return BadRequest("Pogresna duzina Ime_Turnira!");

            var Turnir=Context.Turniri
            .Include(p=>p.Prijavljeni_igraci)
            .ThenInclude(p=>p.Klub)
            .Where(p=>p.Ime_Turnira.CompareTo(Ime_Turnira)==0).FirstOrDefault();

            return Ok(Turnir.Prijavljeni_igraci.ToList());
        }

        [Route("Ostali_igraci/{Ime_Turnira}")]
        [HttpGet]
        public  ActionResult Ostali_igraci(string Ime_Turnira)
        {
            if (Ime_Turnira == "") return BadRequest("Morate uneti ime turnira!");
            if (Ime_Turnira.Length > 50) return BadRequest("Pogresna duzina Ime_Turnira!");

            var Turnir=Context.Turniri
            .Include(p=>p.Ostali_igraci)
            .ThenInclude(p=>p.Klub)
            .Where(p=>p.Ime_Turnira.CompareTo(Ime_Turnira)==0).FirstOrDefault();

            return Ok(Turnir.Ostali_igraci.ToList());
        }

        [Route("Pogledaj_kolo/{Ime_turnira}/{KoloPoRedu}")]
        [HttpGet]
        public ActionResult Vrati_kolo(string Ime_Turnira,int KoloPoRedu)
        {
            if (Ime_Turnira == "") return BadRequest("Morate uneti ime turnira!");
            if (Ime_Turnira.Length > 50) return BadRequest("Pogresna duzina Ime_Turnira!");

            var MeceviKola=Context.Mecevi
            .Include(p=>p.Igrac1)
            .ThenInclude(p=>p.Klub)
            .Include(p=>p.Igrac2)
            .ThenInclude(p=>p.Klub)
            .Include(p=>p.Turnir)
            .ThenInclude(p=>p.Sudija)
            .Where(p=>p.Kolo==KoloPoRedu && p.Turnir.Ime_Turnira.CompareTo(Ime_Turnira)==0);

            return Ok(MeceviKola);
        }
  
        [Route("Pogledaj_kolo_proba")]
        [HttpGet]
        public ActionResult Vrati_kolo_proba(int Turnir_ID, int KoloPoRedu)
        {   
             
            if (Turnir_ID < 1 ) return BadRequest("Mec ne postoji!");
            if(KoloPoRedu<1) return BadRequest("Nepostojece kolo");
           

            var MeceviKola=Context.Mecevi
            .Include(p=>p.Igrac1)
            .ThenInclude(p=>p.Klub)
            .Include(p=>p.Igrac2)
            .ThenInclude(p=>p.Klub)
            .Include(p=>p.Turnir)
            .ThenInclude(p=>p.Sudija)
            .Include(p=>p.Turnir.OrganizatorTurnira)
            .Where(p=>p.Turnir.Turnir_ID==Turnir_ID && p.Kolo==KoloPoRedu);

            return Ok(MeceviKola);
        }
        [Route("Svi_turniri")]
        [HttpGet]
        public ActionResult Svi_turniri()
        {
            var turniri = Context.Turniri
                        .Include(p => p.OrganizatorTurnira)
                        .Include(p=>p.Prijavljeni_igraci)
                        .Include(p=>p.Ostali_igraci)
                        .Include(p=>p.Sudija)
                        .Include(p=>p.Osvajac_Turnira);

            return Ok (turniri.ToList());
        }

        [Route("Svi_mecevi")]
        [HttpGet]
        public ActionResult Svi_mecevi()
        {
            var mecevi = Context.Mecevi
                        .Include(p => p.Igrac1)
                        .ThenInclude(p=>p.Klub)
                        .Include(p=>p.Igrac2)
                        .ThenInclude(p=>p.Klub)
                        .Include(p=>p.Turnir)
                        .ThenInclude(p=>p.OrganizatorTurnira);

            return Ok(mecevi.ToList());
        }

        [Route("Mecevi_igrac/{Broj_Legitimacije}")]
        [HttpGet]
        public ActionResult Svi_mecevi_igrac(int Broj_Legitimacije)
        {
            var mecevi = Context.Mecevi
                        .Include(p => p.Igrac1)
                        .ThenInclude(p=>p.Klub)
                        .Include(p=>p.Igrac2)
                        .ThenInclude(p=>p.Klub)
                        .Include(p=>p.Turnir)
                        .ThenInclude(p=>p.OrganizatorTurnira)
                        .Where(p=>p.Igrac1.Broj_Legitimacije==Broj_Legitimacije||p.Igrac2.Broj_Legitimacije==Broj_Legitimacije);

            return Ok(mecevi.ToList());
        }
      
    //DELETE

        [Route("Brisanje_turnira/{Ime_turnira}")]
        [HttpDelete]
        public async  Task<ActionResult> Izbrisi_turnir(string Ime_Turnira)
        {
            if (Ime_Turnira == "") return BadRequest("Morate uneti ime turnira");
            if (Ime_Turnira.Length > 50) return BadRequest("Pogresna duzina Ime_Turnira!");

            try
            {
                var Turnir = Context.Turniri.Where(p => p.Ime_Turnira.CompareTo(Ime_Turnira) == 0).FirstOrDefault();

                if (Turnir != null)
                {
                    Context.Turniri.Remove(Turnir);
                    await Context.SaveChangesAsync();
                    return Ok($"Klub {Ime_Turnira} je uspesno izbrisan!");
                }
                else
                {
                    return Ok("Takav turnir ne postoji!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //PUT

        [Route("Upisi_igraca/{Ime_Turnira}/{Broj_Legitimacije}")]
        [HttpPut]
         public async Task<ActionResult> Upisi_igraca(string Ime_Turnira, int Broj_Legitimacije)
        {
            if (Broj_Legitimacije < 0 || Broj_Legitimacije > 99999) return BadRequest("Pogresna vrednost za broj legitimacije!");
            if (Ime_Turnira == "") return BadRequest("Morate uneti ime turnira");
            if (Ime_Turnira.Length > 50) return BadRequest("Pogresna duzina Ime_Turnira!");

            try
            {
                var Igrac = Context.Igraci.Include(p => p.Klub).Where(p => p.Broj_Legitimacije== Broj_Legitimacije).FirstOrDefault();
                var Turnir = Context.Turniri.Include(p => p.Prijavljeni_igraci).Where(p => p.Ime_Turnira.CompareTo(Ime_Turnira) == 0).FirstOrDefault();
                //                                         
                if (Turnir != null)
                {
                    if (Igrac != null)
                    {
                        Turnir.Prijavljeni_igraci.Add(Igrac);   

                        Context.Turniri.Update(Turnir);
                        await Context.SaveChangesAsync();
                        return Ok($"Izmenjeni podaci o turniru, u listu prijavljenih igraca dodat je igrac {Igrac.Ime} {Igrac.Prezime}!");
                    }
                    else
                        return BadRequest("Igrac ne postoji u bazi!");
                }
                else
                    return BadRequest($"Turnir {Ime_Turnira} ne postoji u bazi!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       [Route("Dodaj_kolo/{Ime_turnira}/{KoloPoRedu}")]
       [HttpPut]
       public async Task<ActionResult> Dodaj_kolo (string Ime_Turnira, int KoloPoRedu)
       {
           
            if (Ime_Turnira == "") return BadRequest("Morate uneti ime turnira");
            if (Ime_Turnira.Length > 50) return BadRequest("Pogresna duzina Ime_Turnira!");

            try
            {
                var Turnir = Context.Turniri
                            .Include(p => p.Mecevi)
                            .Include(p => p.Prijavljeni_igraci)
                            .Include(p => p.Ostali_igraci)
                            .Include(p=>p.Mecevi)
                            .Where(p => p.Ime_Turnira.CompareTo(Ime_Turnira) == 0).FirstOrDefault();

                if (Turnir != null)
                {
                    if (KoloPoRedu == 1)
                    {
                        Turnir.Ostali_igraci = Turnir.Prijavljeni_igraci;
                    }

          

                    Turnir.Mecevi.Clear();      // Kada se kreira kolo, prethodni mecevi se brisu

                    int BrUcesnika = Turnir.Ostali_igraci.Count;

                    int i = 0;

                    for (int j = 0; j < BrUcesnika / 2; j++)
                    {
                        Mec Par = new Mec();

                        Par.Kolo = KoloPoRedu;
                        Par.Igrac1 = Turnir.Ostali_igraci[i++];
                        Par.Igrac2 = Turnir.Ostali_igraci[i++];

                        Turnir.Mecevi.Add(Par);
                        Context.Mecevi.Add(Par);
                    }
                }
                else
                    return BadRequest($"Turnir {Ime_Turnira} ne postoji u bazi!");

                Context.Turniri.Update(Turnir);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o turniru, dodati mecevi za Kolo {KoloPoRedu}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
       }
        [Route("Upisi_rezultate_kola")]
        [HttpPut]
        public async  Task<ActionResult> Rezultati_kolo(int Turnir_ID, int KoloPoRedu, [FromQuery] int[] rezultati)
        {
            if (Turnir_ID < 1) return BadRequest("Nepostojeci turnir");
            //if (Ime_Turnira.Length > 50) return BadRequest("Pogresna duzina imena!");

            try
            {
                var Turnir = Context.Turniri.Include(p => p.Mecevi).Include(p => p.Ostali_igraci).Where(p => p.Turnir_ID==Turnir_ID).FirstOrDefault();

                if (Turnir != null)
                {
                    
                   Rezultat rez;
                    if(rezultati[0]==3)
                         rez = Rezultat.Pobednik_Igrac1;
                        else
                           rez = Rezultat.Pobednik_Igrac2;

                    foreach (Mec M in Turnir.Mecevi)
                    {    
                        M.Rezultat_Ishod=rez;

                        if (M.Rezultat_Ishod == Rezultat.Pobednik_Igrac1)
                        {
                            var igrac = Context.Igraci.Where(p => p.Broj_Legitimacije == M.Igrac2.Broj_Legitimacije).FirstOrDefault();
                            Turnir.Ostali_igraci.Remove(igrac);
                        }
                        else
                        {
                            var igrac = Context.Igraci.Where(p => p.Broj_Legitimacije == M.Igrac1.Broj_Legitimacije).FirstOrDefault();
                            Turnir.Ostali_igraci.Remove(igrac);
                        }

                        Context.Mecevi.Update(M);
                    }
                }
                else
                    return BadRequest("Turnir  ne postoji u bazi!");

                Context.Turniri.Update(Turnir);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o turniru, dodati mecevi za Kolo {KoloPoRedu}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("Proglasi_pobednika/{Ime_Turnira}")]
        [HttpPut]        
        public async Task<ActionResult> Proglasi_pobednika(string Ime_Turnira)
        {
            if (Ime_Turnira == "") return BadRequest("Morate uneti ime turnira");
            if (Ime_Turnira.Length > 50) return BadRequest("Pogresna duzina Ime_Turnira!");

            try
            {
                var Turnir = Context.Turniri.Include(p => p.Ostali_igraci).Include(p=>p.Osvajac_Turnira).Where(p => p.Ime_Turnira.CompareTo(Ime_Turnira) == 0).FirstOrDefault();

                if (Turnir != null)
                {
                    if (Turnir.Ostali_igraci.Count == 1)
                    {
                        Turnir.Osvajac_Turnira = Turnir.Ostali_igraci[0];

                        var Igrac = Turnir.Ostali_igraci[0];
                        Igrac.Bodovi = Igrac.Bodovi + Turnir.Nagrada;

                        Context.Igraci.Update(Igrac);
                        await Context.SaveChangesAsync();
                        Context.Turniri.Update(Turnir);
                        await Context.SaveChangesAsync();

                        return Ok($"Izmenjeni podaci o turniru, pobednik turnira {Ime_Turnira} je {Igrac.Ime} {Igrac.Prezime}!");
                    }
                    else
                        return BadRequest("Nije vreme za proglasenje pobednika jos uvek, nije ostao samo jedan igrac!");
                }
                else
                    return BadRequest($"Turnir {Ime_Turnira} ne postoji u bazi!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
    }
}

