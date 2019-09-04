using Newtonsoft.Json;
using System.Collections.Generic;
using XpertGroup.Services.Contracts;
using XpertGroup.Services.Models;
using XpertGroup.Services.Services;
using Xunit;

namespace XpertGroup.Test
{
    public class TestApi 
    {

        private readonly ICubeSumation _cubeSumationservice;
        private string instructions = "[ { x: 2, y: 2, z: 2, W: 4 },{ x1: 1, y1: 1, z1: 1, x2: 3, y2: 3, z2: 3 },{ x: 1, y: 1, z: 1, W: 23 },{ x1: 2, y1: 2, z1: 2, x2: 4, y2: 4, z2: 4 },{ x1: 1, y1: 1, z1: 1, x2: 3, y2: 3, z2: 3 }]";
        private List<int> resp = new List<int>() { 4, 4, 27 };
        private int sieze = 4;
        public TestApi()
        {
            _cubeSumationservice = new CubeSumation();
        }
        [Fact]
        public  void CanCubeSumation()
        {
            List<QueryDTO> data = JsonConvert.DeserializeObject<List<QueryDTO>>(instructions);
            var Response = _cubeSumationservice.Procsess(sieze,data);
            Assert.Equal(Response, resp);
        }

    }
}
