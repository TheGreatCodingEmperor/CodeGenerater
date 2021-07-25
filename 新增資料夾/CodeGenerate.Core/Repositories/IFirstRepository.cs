using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CodeGenerate.Core.Entities;
    using System.Linq;

    namespace CodeGenerate.Core.Repositories
    {
        public interface IFirstRepository : IBaseRepository
        {
            Task<IEnumerable<First>> GetAll();
            Task<First> GetAsync(long id);
            Task<First> AddAsync(First first);
            Task DeleteAsync(long id);
            Task<First> UpdateAsync(First first);
        }
    }