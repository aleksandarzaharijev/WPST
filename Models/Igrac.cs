using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    [Table("Igrac")]
    public class Igrac
    {
        [Key]
        public int ID {get; set;}

        [MaxLength(5)]
        [Required]
        public int Broj_Legitimacije{get;set;} //Identifikacioni broj igraca u sistemu
        
        [MaxLength(20)]
        [Required]
        public string Ime {get;set;}
    
        [MaxLength(20)]
        [Required]
        public string Prezime { get; set; }
    
        [Required]
        public DateTime Datumrodjenja { get; set; }
   
         [Range (1,200)]
         [Required]
         public int Bodovi {get;set;}
    
    
    
        [Required]
        //[JsonIgnore]
        public virtual Klub Klub { get; set; }
    
    
    }
}