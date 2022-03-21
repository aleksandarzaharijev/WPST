using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public enum Klasa
    {
        NS = 0, //nacionalni sudija
        MS // medjunarodni sudija
    }
    [Table("Sudija")]
    public class Sudija{

    [Key]
    public int Sudija_ID {get;set;}

    [MaxLength(20)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(20)]
        [Required]
        public string Prezime { get; set; }

        public Klasa Klasa { get; set; }
        
        [JsonIgnore]
        public List<Turnir> Sudjeni_turniri { get; set; }
    
    
    
    
    
    }
}