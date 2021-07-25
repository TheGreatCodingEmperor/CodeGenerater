using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace CodeGenerate.Entities
{
    
    public partial class First
    {
    public First(long id,string name,string value)
        {
            Id = id;
Name = name;
Value = value;
        }
        
        
        public long Id {get;private set;}
        public string Name {get;private set;}
        public string Value {get;private set;}
    }
}
