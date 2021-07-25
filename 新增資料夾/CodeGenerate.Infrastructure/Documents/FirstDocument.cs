using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace CodeGenerate.Documents
{
    [Table("FirstDocument")]
    public partial class First
    {
        [Key]
        [Column(TypeName = "integer")]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
