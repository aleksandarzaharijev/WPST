using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using Models;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace WP.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IgracController: ControllerBase
    {
        public Context Context {get; set;}
        public IgracController(Context context)
        {
            Context = context;
        }
        //POST 
       [Route("UnosIgraca/{Broj_Legitimacije}/{Ime}/{Prezime}/{Datum_rodjenja}/{Bodovi}/{Ime_kluba}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_igraca(int Broj_Legitimacije, string Ime, string Prezime, DateTime Datum_rodjenja, int Bodovi,  string Ime_kluba)
        {
            if (Ime == "") return BadRequest("Neophodan unos imena");
            if (Ime.Length > 20) return BadRequest("Greska, unesite ime do 20 karaktera!");

            if (Prezime == "") return BadRequest("Neophodan unos prezimena");
            if (Prezime.Length > 20) return BadRequest("Greska, unesite prezime do 20 karaktera! ");

            if(Broj_Legitimacije<0||Broj_Legitimacije>99999) return BadRequest("Greska, unesite sifru igraca pravilno!!!");

            if (Datum_rodjenja.Year < 1950) return BadRequest("Greska, unesite ponovo datum rodjenja!");

            if (Bodovi < 1 || Bodovi > 200) return BadRequest("Greska, unesite ponovo bodove igraca!");

            if (Ime_kluba == "") return BadRequest("Morate uneti ime Kluba");

            Igrac igrac = new Igrac();

            
            igrac.Ime = Ime;
            igrac.Prezime = Prezime;
            igrac.Datumrodjenja = Datum_rodjenja;
            igrac.Bodovi = Bodovi;
            igrac.Broj_Legitimacije=Broj_Legitimacije;

            var klub = Context.Klubovi.Where(p => p.ImeKluba.CompareTo(Ime_kluba) == 0).FirstOrDefault();
            

            if (klub == null)
            {
                return BadRequest($"Uneti klub {Ime_kluba} ne postoji!");
            }

            igrac.Klub = klub;
            klub.BrojIgraca++;

            try
            {
                Context.Igraci.Add(igrac);
                Context.Klubovi.Update(klub);
                await Context.SaveChangesAsync();
                return Ok($"Igrac {Ime} {Prezime} je dodat u bazu!");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        //GET
        [Route("Pregledaj_igraca/{Broj_Legitimacije}")]
        [HttpGet]
        public ActionResult Vrati_igraca(int Broj_Legitimacije)
        {
            if (Broj_Legitimacije < 0 || Broj_Legitimacije > 99999) return BadRequest("Pogresna vrednost za broj legitimacije!!!");

            var Igrac = Context.Igraci.Include(p => p.Klub).Where(p => p.Broj_Legitimacije == Broj_Legitimacije).FirstOrDefault();

            
           
        
             return Ok(Igrac);
        }

        [Route("Svi_igraci_kluba")]
        [HttpGet]
        public ActionResult Svi_igraci()
        {

            var Igraci = Context.Igraci.Include(p => p.Klub);

            return Ok(Igraci.ToList());
        }

       //PUT

        
          
         
        [Route("Promeni_bodove/{Broj_Legitimacije}/{bodovi}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniBodove(int Broj_Legitimacije, int bodovi)
        {
            if (Broj_Legitimacije < 0 || Broj_Legitimacije > 99999) return BadRequest("Pogresna vrednost za broj legitimacije!");
            if (bodovi < -200 || bodovi > 200) return BadRequest("Pogresna vrednost za promenu bodova!");

            try
            {
                var Igrac = Context.Igraci.Where(p => p.Broj_Legitimacije == Broj_Legitimacije).FirstOrDefault();

                Igrac.Bodovi = Igrac.Bodovi + bodovi;

                Context.Igraci.Update(Igrac);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o igracu {Igrac.Ime} {Igrac.Prezime}, novi broj bodova igraca je {Igrac.Bodovi}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //DELETE

        [Route("BrisanjeIgraca/{Broj_Legitimacije}")]
        [HttpDelete]
             public async Task<ActionResult> Izbrisi_igraca(int Broj_Legitimacije)
        {
            if (Broj_Legitimacije < 0 || Broj_Legitimacije > 99999) return BadRequest("Pogresna vrednost za broj legitimacije!");

            try
            {
                var Igrac = Context.Igraci 
                .Include(p=>p.Klub)   
                .Where(p => p.Broj_Legitimacije == Broj_Legitimacije).FirstOrDefault();
                //Igrac.Klub.BrojIgraca--;
               var pom = Context.Mecevi.Where(p=>p.Igrac1==Igrac||p.Igrac2==Igrac);
               var pom2 = Context.Turniri.Where(p=>p.Osvajac_Turnira==Igrac);
               ;
               //var pom3 = Context.Turniri.Where(p=>p.==Igrac);
               if(pom!=null)
                Context.Mecevi.RemoveRange(pom);
                
               if(pom2!=null)
                Context.Turniri.RemoveRange(pom2);

                if (Igrac != null)
                {
                    string name = Igrac.Ime;
                    string surname = Igrac.Prezime;
                    Igrac.Klub.BrojIgraca--;
                    Context.Igraci.Remove(Igrac);
                    
                    await Context.SaveChangesAsync();
                    return Ok($"Igrac sa  brojem legitimacije {Broj_Legitimacije}, {name} {surname} je uspesno izbrisan!");
                    //return Ok(Igrac);
                }
                
                {
                    return Ok("Igrac sa unetim brojem legitimacije ne postoji!!!");
                }
               // Context.Klubovi.Update(Igrac);

            }
    
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}