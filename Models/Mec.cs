using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    public enum Rezultat
    {
        Pobednik_Igrac1=0,
        Nereseno,
        Pobednik_Igrac2
    }

    [Table("Mec")]
    public class Mec
    {
        
        [Key]
        public int Mec_ID { get; set; }

        [Required]
        public Turnir Turnir { get; set; }

        [Required]
        public int Kolo { get; set; }
        
        [Required]
        public Igrac Igrac1 { get; set; }
        
        [Required]
        public Igrac Igrac2{ get; set; }

        public Rezultat Rezultat_Ishod { get; set; }
    }
}