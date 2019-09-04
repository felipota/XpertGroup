using Newtonsoft.Json;
using System.Collections.Generic;
using XpertGroup.Services.Contracts;
using XpertGroup.Services.Models;

namespace XpertGroup.Services.Services
{
    public class CubeSumation : ICubeSumation
    {
        private int[,,] matrix;
        private int[,,] nums;
        private int seize = 0;
        private List<int> response;
        public CubeSumation()
        {
            response = new List<int>();
        }
        public List<int> Procsess(int seizeV, List<QueryDTO> instructions)
        {
            if (seizeV == 0) {
                return null; ;
            }
            seize = seizeV + 1;
            matrix = new int[seize +1 , seize +1 , seize +1 ];
            nums = new int[seize , seize , seize ];
            instructions.ForEach(o => {
                if(o.W != null)
                {
                    UpdateIntruction(o.x.Value, o.y.Value, o.z.Value, o.W.Value);
                }
                else
                {
                    int result = QueryInstruction(o.x1.Value  , o.y1.Value , o.z1.Value  , o.x2.Value  , o.y2.Value  , o.z2.Value  );
                    response.Add(result);
                }
            });
            return response;
        }
        private void UpdateIntruction(int x, int y, int z, int W)
        {
            int delta = W - nums[x,y,z];
            nums[x,y,z] = W;
            for (int i = x + 1; i <= seize; i += i & (-i))
            {
                for (int j = y + 1; j <= seize; j += j & (-j))
                {
                    for (int k = z + 1; k <= seize; k += k & (-k))
                    {
                        matrix[i,j,k] += delta;
                    }
                }
            }
        }
        private int QueryInstruction(int x1, int y1, int z1, int x2, int y2, int z2)
        {
            int result = Sum(x2 + 1, y2 + 1, z2 + 1) - Sum(x1, y1, z1) - Sum(x1, y2 + 1, z2 + 1) - Sum(x2 + 1, y1, z2 + 1) - Sum(x2 + 1, y2 + 1, z1) + Sum(x1, y1, z2 + 1) + Sum(x1, y2 + 1, z1) + Sum(x2 + 1, y1, z1);
            return result;
        }
        private int Sum(int x, int y, int z)
        {
            long sum = 01;
            for (int i = x; i > 0; i -= i & (-i))
            {
                for (int j = y; j > 0; j -= j & (-j))
                {
                    for (int k = z; k > 0; k -= k & (-k))
                    {
                        sum += matrix[i,j,k];
                    }
                }
            }
            return int.Parse(sum.ToString());
        }
    }
}
