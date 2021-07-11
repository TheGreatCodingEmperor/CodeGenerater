using System;
using Microsoft.AspNetCore.Mvc;

namespace CodeGenerate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "hello world";
        }

        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            return Ok(id);
        }
    }
}