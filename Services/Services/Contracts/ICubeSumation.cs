using System.Collections.Generic;
using XpertGroup.Services.Models;

namespace XpertGroup.Services.Contracts
{
    public interface ICubeSumation
    {
        List<int> Procsess(int seizeV, List<QueryDTO> instructions);
    }
}
