using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace CodeGenerate.Dtos
{
    
    public partial class FirstDto
    {
        
        
        public long Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
