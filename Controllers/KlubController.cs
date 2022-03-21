using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using Models;
using System.Collections.Generic;

namespace WP.Controllers
{
    [ApiController]
    [Route ("[controller]")]
    public class KlubController:ControllerBase
    {
        public Context Context {get; set;}
        public KlubController(Context context)
        {
            Context=context;
        }

        //POST
         [Route("Unos_kluba/{ImeKluba}/{MestoKluba}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_klub(string ImeKluba, string MestoKluba)
        {
            if (ImeKluba == "") return BadRequest("Morate uneti ime kluba");
            if (ImeKluba.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Klub = Context.Klubovi.Where(p => p.ImeKluba.CompareTo(ImeKluba) == 0).FirstOrDefault();

            if (Klub != null)
            {
                return BadRequest("Klub sa ovim imenom je vec osnovan!");
            }

            // Da bi mogli da izvrismo kasnije brisanje ime kluba mora da bude jedinstveno

            if (MestoKluba == "") return BadRequest("Morate uneti mesto");
            if (MestoKluba.Length > 20) return BadRequest("Pogresna duzina mesto!");

  

            Klub Club = new Klub();

            Club.ImeKluba = ImeKluba;
            Club.MestoKluba = MestoKluba;
           
            Club.Igraci=new List<Igrac>();
            Club.BrojIgraca = Club.Igraci.Count;

            try
            {
                Context.Klubovi.Add(Club);
                await Context.SaveChangesAsync();
                return Ok($"Klub {ImeKluba} je uspešno dodat u bazu!");

            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        //DELETE

    /*   [Route("Brisanje_kluba/{ImeKluba}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisiklub(string ImeKluba)
        {
            if (ImeKluba == "") return BadRequest("Morate uneti ime kluba");
            if (ImeKluba.Length > 50) return BadRequest("Pogrešna dužina imena kluba!");

            try
            {
                var Klub = Context.Klubovi
                .Where(p => p.ImeKluba.CompareTo(ImeKluba) == 0).FirstOrDefault();
                var pom = Context.Turniri.Where(p=>p.OrganizatorTurnira==Klub).FirstOrDefault();
                var pom2 = Context.Mecevi.Where(p=>p.Turnir==pom);
                var pom3 = Context.Igraci.Where(p=>p.Klub==Klub);
                
                for(int i =0;i<pom3.Count();i++)
                {   
        
                }
        

                if(pom3!=null)
                 Context.Igraci.RemoveRange(pom3);
                if(pom2!=null)
                Context.Mecevi.RemoveRange(pom2);
                
                if(pom!=null)
                Context.Turniri.Remove(pom);
              
                if (Klub != null)
                {
                    Context.Klubovi.Remove(Klub);
                    await Context.SaveChangesAsync();

                    return Ok($"Klub {ImeKluba} je uspešno izbrisan!");
                }
                else
                {
                    return Ok("Takav klub ne postoji!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/
        
        [Route("Izbrisi_igraca_iz_kluba/{ImeKluba}/{Broj_Legitimacije}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi_igraca(string ImeKluba, int Broj_Legitimacije)
        {
            if (Broj_Legitimacije < 0 || Broj_Legitimacije > 99999) return BadRequest("Pogresna vrednost za broj legitimacije!");
            if (ImeKluba == "") return BadRequest("Morate uneti ime kluba");
            if (ImeKluba.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Igrac = Context.Igraci.Where(p => p.Broj_Legitimacije == Broj_Legitimacije).FirstOrDefault();
                var klub = Context.Klubovi.Where(p => p.ImeKluba.CompareTo(ImeKluba) == 0).FirstOrDefault();

                if(klub!=null)
                {
                    if(Igrac!=null)
                    {
                        klub.Igraci.Remove(Igrac); 
                        klub.BrojIgraca--;   
                    }
                    else
                        return BadRequest("Igrac ne postoji u bazi!");
                }
                else
                    return BadRequest($"Klub {ImeKluba} ne postoji u bazi!");
                
                Context.Klubovi.Update(klub);
                await Context.SaveChangesAsync();
                //klub.BrojIgraca--;
                return Ok($"Izmenjeni podaci o klubu, izbrisan je igrac {Igrac.Ime} {Igrac.Prezime} iz kluba {ImeKluba}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        //GET

         [Route("Pregledaj_klub/{ImeKluba}")]
        [HttpGet]
        public ActionResult Vrati_klub(string ImeKluba)
        {
            if (ImeKluba == "") return BadRequest("Morate uneti ime kluba");
            if (ImeKluba.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Klubovi = Context.Klubovi.Include(p=>p.Igraci);
            var Klub=Klubovi.Where(p => p.ImeKluba.CompareTo(ImeKluba) == 0).FirstOrDefault();

            return Ok(Klub);
        }

        [Route("Svi_klubovi")]
        [HttpGet]
        public ActionResult Sviklubovi()
        {
            var klubs = Context.Klubovi.Include(p => p.Igraci);

            return Ok(klubs.ToList());
        }

        [Route("Igraci_kluba/{ImeKluba}")]
        [HttpGet]
        public ActionResult VratiIgrace(string ImeKluba)
        {
            if (ImeKluba == "") return BadRequest("Morate uneti ime kluba");
            if (ImeKluba.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Klub = Context.Klubovi.Include(p=>p.Igraci).Where(p => p.ImeKluba.CompareTo(ImeKluba) == 0).FirstOrDefault();

            return Ok(Klub.Igraci.ToList());
        }

      //PUT
         [Route("Dodaj_igraca_u_klub/{ImeKluba}/{Broj_Legitimacije}")]
         [HttpPut]
        public async Task<ActionResult> Dodaj_igraca_u_klub(string ImeKluba, int Broj_Legitimacije)
        {
            if (Broj_Legitimacije < 0 || Broj_Legitimacije > 99999) return BadRequest("Pogresna vrednost za broj legitimacije!");
            if (ImeKluba == "") return BadRequest("Morate uneti ime kluba");
            if (ImeKluba.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Igrac = Context.Igraci.Include(p=>p.Klub).Where(p => p.Broj_Legitimacije == Broj_Legitimacije).FirstOrDefault();
                var pKlub = Context.Klubovi.Include(p=>p.Igraci).Where(p => p.ImeKluba.CompareTo(ImeKluba) == 0).FirstOrDefault();

                if(pKlub!=null)
                {
                    if(Igrac!=null)
                    {   Igrac.Klub.BrojIgraca--;
                        Igrac.Klub=pKlub;
                        pKlub.Igraci.Add(Igrac);
                        pKlub.BrojIgraca++;  
                    }
                    else
                        return BadRequest("Igrac ne postoji u bazi!");
                }
                else
                    return BadRequest($"Klub {ImeKluba} ne postoji u bazi!");
                
                Context.Igraci.Update(Igrac);
                Context.Klubovi.Update(pKlub);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o klubu, dodat je igrac {Igrac.Ime} {Igrac.Prezime}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}