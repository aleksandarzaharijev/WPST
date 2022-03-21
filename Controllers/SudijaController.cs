using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using Models;
using System.Collections.Generic;

namespace WPST.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SudijaController : ControllerBase
    {
        public Context Context {get; set;}
        public SudijaController(Context context)
        {
            Context = context;
        }

        //POST

           [Route("Unos_sudije/{Ime}/{Prezime}/{Klasa}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_sudija(string Ime, string Prezime, Klasa Klasa)
        {
            if (Ime == "") return BadRequest("Morate uneti ime sudije");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti ime sudije");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            Sudija Arbitar = new Sudija();

            Arbitar.Ime = Ime;
            Arbitar.Prezime = Prezime;
            Arbitar.Klasa = Klasa;
            Arbitar.Sudjeni_turniri=new List<Turnir>();

            try
            {
                Context.Sudije.Add(Arbitar);
                await Context.SaveChangesAsync();
                return Ok($"Sudija {Ime} {Prezime} je dodat u bazu!");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        //GET

         [Route("Pregledaj_sudiju/{Ime}/{Prezime}")]
        [HttpGet]
        public ActionResult Vrati_sudiju(string Ime, string Prezime)
        {
            if (Ime == "") return BadRequest("Morate uneti ime sudije");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti prezime sudije");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            var Sudija = Context.Sudije
                        .Include(p=>p.Sudjeni_turniri)
                        .ThenInclude(p=>p.OrganizatorTurnira)
                        .Include(p=>p.Sudjeni_turniri)
                        .ThenInclude(p=>p.Osvajac_Turnira)
                        .Where(p => p.Ime.CompareTo(Ime) == 0 && p.Prezime.CompareTo(Prezime) == 0).FirstOrDefault();

            return Ok(Sudija);
        }

        [Route("Sve_sudije")]
        [HttpGet]
        public ActionResult Vrati_sve_sudije()
        {
            var sudije = Context.Sudije.Include(p=>p.Sudjeni_turniri);
                    
            return Ok(sudije.ToList());
        }

        [Route("Vrati_sudjene_turnire/{Ime}/{Prezime}")]
        [HttpGet]
        public ActionResult Sudjeni_turniri(string Ime, string Prezime)
        {
            if (Ime == "") return BadRequest("Morate uneti ime sudije");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti prezime sudije");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            var Sudija = Context.Sudije
                                .Include(p=>p.Sudjeni_turniri)
                                .ThenInclude(p=>p.OrganizatorTurnira)
                                .Include(p=>p.Sudjeni_turniri)
                                .ThenInclude(p=>p.Osvajac_Turnira)
                                .Where(p => p.Ime.CompareTo(Ime) == 0 && p.Prezime.CompareTo(Prezime) == 0).FirstOrDefault();

            return Ok(Sudija.Sudjeni_turniri.ToList());
        }   
        //DELETE

        [Route("Brisanje_sudije/{Ime}/{Prezime}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi_sudiju(string Ime, string Prezime)
        {
            if (Ime == "") return BadRequest("Morate uneti ime sudije");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti prezime sudije");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            try
            {
                var Sudija = Context.Sudije
                .Where(p => p.Ime.CompareTo(Ime) == 0 && p.Prezime.CompareTo(Prezime) == 0).FirstOrDefault();
                
                var pom = Context.Turniri.Where(p=>p.Sudija==Sudija);
                if (pom!=null)
                   Context.Turniri.RemoveRange(pom);

                if (Sudija != null)
                {
                    string ime = Sudija.Ime;
                    string prezime = Sudija.Prezime;

                    Context.Sudije.Remove(Sudija);
                    await Context.SaveChangesAsync();
                    return Ok($"Sudija {ime} {prezime} je uspesno izbrisan!");
                }
                else
                {
                    return Ok("Zadati sudija ne postoji!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}