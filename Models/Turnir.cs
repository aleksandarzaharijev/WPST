using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    [Table("Turnir")]
    public class Turnir
    {
     
        [Key]
        public int Turnir_ID { get; set; }

        [MaxLength(50)]
        [Required]
        public string Ime_Turnira { get; set; }

        [Required]
        public Klub OrganizatorTurnira { get; set; }

        [Required]
        public DateTime Datum_pocetka { get; set; }

        [MaxLength(40)]
        [Required]
        public string Mesto_Odrzavanja { get; set; }

        [MaxLength(50)]
        [Required]
        public int Nagrada { get; set; }

        [JsonIgnore]
        public List<Igrac> Prijavljeni_igraci { get; set; }

        [JsonIgnore]
        public List<Igrac> Ostali_igraci { get; set; }

        [JsonIgnore]
        public List<Mec> Mecevi { get; set; }
       
       //[JsonIgnore]
        public Igrac Osvajac_Turnira { get; set; }
        
        public Sudija Sudija { get; set; }

       // public int Trenutno_kolo {get; set;}
    }
}