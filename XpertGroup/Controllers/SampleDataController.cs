using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using XpertGroup.Services.Contracts;
using XpertGroup.Services.Models;

namespace XpertGroup.Controllers
{

    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly ICubeSumation _cubeSumationservice;
        public SampleDataController(ICubeSumation cubeSumation)
        {
            _cubeSumationservice = cubeSumation;
        }



        [HttpPut("{id}")]
        public IEnumerable<int> Put(int id, [FromBody] List<QueryDTO> instructions)
        {
           
            List<int> respuesta = _cubeSumationservice.Procsess(id, instructions);
            return respuesta;
        }


    }
}
