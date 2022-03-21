using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace Models{
  public class Klub
  { 
      [Key]
      public int Klub_ID {get; set;}

      [MaxLength(40)]
      [Required]
      public string ImeKluba {get; set;}

      [MaxLength(40)]
      [Required]
      public string MestoKluba {get; set;}
      
      
      public int BrojIgraca {get;set;}
      
      
      [JsonIgnore]
      public virtual List<Igrac> Igraci { get; set;}
}
}