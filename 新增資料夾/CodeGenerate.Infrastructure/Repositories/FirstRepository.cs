
    using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Convey.Persistence.EFCoreDB;
using CodeGenerate.Core.Entities;
using CodeGenerate.Core.Repositories;
using CodeGenerate.Infrastructure.EFCore.Documents;

namespace CodeGenerate.Infrastructure.EFCore.Repositories {
    public class FirstEFCoreRepository : BaseRepository, IFirstRepository {
        private readonly IEFCoreRepository<FirstDocument, long> _repository;
        private readonly IQueryable<FirstDocument> _datas;

        public FirstEFCoreRepository (IEFCoreRepository<FirstDocument, long> repository, ApiContext dbContext) {
            _datas = dbContext.Set<FirstDocument> ();
            _repository = repository;
        }
        public async Task<First> GetAsync (long id) => (await _repository.GetAsync (id))?.AsEntity ();
        public async Task<First> AddAsync (First First) => (await _repository.AddAsync (First.AsDocument ()))?.AsEntity ();
        public async Task DeleteAsync (long id) => await _repository.RemoveAsync (await _repository.GetAsync (id));
        public async Task<First> UpdateAsync (First First) => (await _repository.DeepcloneUpdateAsync (First.Id, First.AsDocument ()))?.AsEntity ();
        public async Task<IEnumerable<First>> GetAll () => (await _repository.AsNoTracking ().ToList ().Select (FirstDoc => FirstDoc?.AsEntity ()));
    }
}
    