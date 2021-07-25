import { Component, OnInit } from '@angular/core';
import { CefCustomObjectService } from 'src/app/core/cef-custom-object.service';

@Component({
  selector: 'app-dotnet-generater',
  templateUrl: './dotnet-generater.component.html',
  styleUrls: ['./dotnet-generater.component.scss'],
})
export class DotnetGeneraterComponent implements OnInit {
  /** 範本檔案路徑 */
  filePath = '';
  /** 輸出專案資料夾路徑 */
  projectFolderPath = '';
  /** EFCore 產出 資料夾名稱 */
  efGenerateFolerName ="";
  /** 範本namespace */
  efGenerateNameSpace = '';
  /** 專案namespace */
  projectNamespace = "";
  /** 範本物件名稱 */
  className = '';
  /** 執行進度 */
  progress = 0;
  /** 執行動作數 */
  actionCount = 0;
  /** 執行動做組 */
  generateOptions: { name: string; value: string }[] = [
    { name: 'Document', value: 'document' },
    { name: 'Entity', value: 'entity' },
    { name: 'Dto', value: 'dto' },
    { name: 'Extension', value: 'extension' },
    { name: 'IRepository', value: 'irepository' },
    { name: 'Repository', value: 'repository' },
  ];

  selectedOptions: string[] = [];
  constructor(private cefCustomObject: CefCustomObjectService) {}

  ngOnInit(): void {}

  /** 選擇檔案路徑 */
  async selectFile(e) {
    this.filePath = await this.cefCustomObject.selectedFilePath();
  }

  /** 選擇(輸出)資料夾路徑 */
  async selectFolder(e) {
    this.projectFolderPath = await this.cefCustomObject.selectedFolderPath();
  }

  /** 開始產生 class */
  async onAction() {
    this.progress = 0;
    this.actionCount = this.selectedOptions.length;
    let file = await this.cefCustomObject.readFileAsText(this.filePath);
    // console.log(file);

    for (var option of this.selectedOptions) {
      switch (option) {
        case 'document': {
          await this.createDocument(file);
          this.progress += 100 / this.actionCount;
          break;
        }
        case 'entity': {
          await this.createEntity(file);
          this.progress += 100 / this.actionCount;
          break;
        }
        case 'dto': {
          await this.createDto(file);
          this.progress += 100 / this.actionCount;
          break;
        }
        case 'extension': {
          await this.createExtension(file);
          this.progress += 100 / this.actionCount;
          break;
        }
        case 'irepository':{
          await this.createIrepository();
          this.progress += 100 / this.actionCount;
          break;
        }
        case 'repository':{
          await this.createRepository();
          this.progress += 100 / this.actionCount;
          break;
        }
      }
    }
  }

  /** 產生 Document */
  async createDocument(content: string) {
    content = content.replace(this.efGenerateFolerName, 'Documents');
    content = content.replace(this.className, this.className + 'Document');
    content = content.replace(this.efGenerateNameSpace,this.projectNamespace);
    await this.cefCustomObject.createDirectory(
      this.projectFolderPath + `/${this.projectNamespace}.Infrastructure/Documents`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath + `/${this.projectNamespace}.Infrastructure/Documents/${this.className}Document.cs`,
      content
    );
    return;
  }

  /** 產生 entity */
  async createEntity(content: string) {
    content = content.replace(this.efGenerateNameSpace,this.projectNamespace);
    content = content.replace(this.efGenerateFolerName, 'Entities');
    content = content.replace(/\[[^\]]+\]/g, '');
    let propertyJsons = this.getCSharpClassPropertyJson(content);
    content = content.replace(/{\s*get;\s*set;\s*}/g,'{get;private set;}');

    let constructorInput = propertyJsons
      .map((json) => {
        return `${json.type} ${json.camel}`;
      })
      .join(',');
    let constructorSet = propertyJsons
      .map((json) => {
        return `${json.name} = ${json.camel};`;
      })
      .join('\r\n');
    let constructorTemplate = `
    public ${this.className}(${constructorInput})
        {
            ${constructorSet}
        }`;
    var classStr = /(public|private|protected)?\s+class\s+[a-zA-Z_]*\s+{/g;
    let found = content.match(classStr)[0];
    function splice(content: string, idx: number, rem: number, str: string) {
      return content.slice(0, idx) + str + content.slice(idx + Math.abs(rem));
    }
    content = splice(
      content,
      content.indexOf(found) + found.length,
      0,
      constructorTemplate
    );

    await this.cefCustomObject.createDirectory(
      this.projectFolderPath + `/${this.projectNamespace}.Core/Entities`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath + `/${this.projectNamespace}.Core/Entities/${this.className}.cs`,
      content
    );
  }

  /** 產生 dto */
  async createDto(content: string) {
    content = content.replace(this.efGenerateNameSpace,this.projectNamespace);
    content = content.replace(this.efGenerateFolerName, 'Dtos');
    content = content.replace(/\[[^\]]+\]/g, '');
    content = content.replace(this.className, this.className + 'Dto');
    await this.cefCustomObject.createDirectory(
      this.projectFolderPath + `/${this.projectNamespace}.Application/Dtos`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath + `/${this.projectNamespace}.Application/Dtos/${this.className}Dto.cs`,
      content
    );
  }

  /** 產生 extension */
  async createExtension(content: string) {
    let propertyJsons = this.getCSharpClassPropertyJson(content);
    let entitySettings = propertyJsons
      .map((json) => {
        return `${json.name} = entity.${json.name}`;
      })
      .join(',\r\n');

    let dtoSettings = propertyJsons
      .map((json) => {
        return `${json.name} = document.${json.name}`;
      })
      .join(',\r\n');
    let documentToEntity = propertyJsons
      .map((json) => {
        return `document.${json.name}`;
      })
      .join(',');
    let dtoToEntity = propertyJsons
      .map((json) => {
        return `dto.${json.name}`;
      })
      .join(',');

    let result = `public static ${this.className}Document AsDocument(this ${this.className} entity)
    => new ${this.className}Document
    {
      ${entitySettings}
    };
    public static ${this.className}Dto AsDto(this ${this.className}Document document)
        => new ${this.className}Dto
        {
          ${dtoSettings}
        };
    public static ${this.className} AsEntity(this ${this.className}Document document)
      => new ${this.className}(${documentToEntity});
    public static ${this.className} AsEntity(this ${this.className}Dto dto)
      => new ${this.className}(${dtoToEntity});
    `;
    await this.cefCustomObject.createDirectory(
      this.projectFolderPath + `/${this.projectNamespace}.Infrastructure/Documents`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath +
        `/${this.projectNamespace}.Infrastructure/Documents/${this.className}Extension.txt`,
      result
    );
  }

  async createIrepository(){
    let irepositoryTemplate = `using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using ${this.projectNamespace}.Core.Entities;
    using System.Linq;

    namespace ${this.projectNamespace}.Core.Repositories
    {
        public interface I${this.className}Repository : IBaseRepository
        {
            Task<IEnumerable<${this.className}>> GetAll();
            Task<${this.className}> GetAsync(long id);
            Task<${this.className}> AddAsync(${this.className} ${this.camelCase(this.className)});
            Task DeleteAsync(long id);
            Task<${this.className}> UpdateAsync(${this.className} ${this.camelCase(this.className)});
        }
    }`;
    await this.cefCustomObject.createDirectory(
      this.projectFolderPath + `/${this.projectNamespace}.Core/Repositories`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath +
        `/${this.projectNamespace}.Core/Repositories/I${this.className}Repository.cs`,
        irepositoryTemplate
    );
  }

  async createRepository(){
    let repositoryTemplate = `
    using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Convey.Persistence.EFCoreDB;
using ${this.projectNamespace}.Core.Entities;
using ${this.projectNamespace}.Core.Repositories;
using ${this.projectNamespace}.Infrastructure.EFCore.Documents;

namespace ${this.projectNamespace}.Infrastructure.EFCore.Repositories {
    public class ${this.className}EFCoreRepository : BaseRepository, I${this.className}Repository {
        private readonly IEFCoreRepository<${this.className}Document, long> _repository;
        private readonly IQueryable<${this.className}Document> _datas;

        public ${this.className}EFCoreRepository (IEFCoreRepository<${this.className}Document, long> repository, ApiContext dbContext) {
            _datas = dbContext.Set<${this.className}Document> ();
            _repository = repository;
        }
        public async Task<${this.className}> GetAsync (long id) => (await _repository.GetAsync (id))?.AsEntity ();
        public async Task<${this.className}> AddAsync (${this.className} ${this.className}) => (await _repository.AddAsync (${this.className}.AsDocument ()))?.AsEntity ();
        public async Task DeleteAsync (long id) => await _repository.RemoveAsync (await _repository.GetAsync (id));
        public async Task<${this.className}> UpdateAsync (${this.className} ${this.className}) => (await _repository.DeepcloneUpdateAsync (${this.className}.Id, ${this.className}.AsDocument ()))?.AsEntity ();
        public async Task<IEnumerable<${this.className}>> GetAll () => (await _repository.AsNoTracking ().ToList ().Select (${this.className}Doc => ${this.className}Doc?.AsEntity ()));
    }
}
    `;
    await this.cefCustomObject.createDirectory(
      this.projectFolderPath + `/${this.projectNamespace}.Infrastructure/Repositories`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath +
        `/${this.projectNamespace}.Infrastructure/Repositories/${this.className}Repository.cs`,
        repositoryTemplate
    );
  }

  /**
   * @summary parser 出 C# Class property
   * @param content C# Class
   * @returns propertyName propertyName(camel_Case) propertyType
   */
  getCSharpClassPropertyJson(content: string):{ name: string, camel: string, type: string }[] {
    var re =
      /(public|private|protected)?\s+[a-z]*\??\s+[a-zA-Z_]*\s+{\s*get;\s*set;\s*}/g;
    let properties = content.match(re);
    let propertyJsons: { name: string; camel: string; type: string }[] = [];
    for (var property of properties) {
      var scope_type = /(public|private|protected)?\s+[a-z]*\??/;
      var body = /[a-zA-Z_]*/;
      var bottom = /{\s*get;\s*set;\s*}/;
      let p = property
        .replace(/(public|private|protected)?\s+[a-z]*\??/, '')
        .replace(/{\s*get;\s*set;\s*}/, '')
        .trim();
      let type = property
        .replace(/(public|private|protected)?/, '')
        .replace(/[a-zA-Z_]*\s+{\s*get;\s*set;\s*}/, '')
        .trim();
      // console.log(type, p, camelCase(p));
      propertyJsons.push({ name: p, camel: this.camelCase(p), type: type });
    }
    return propertyJsons;
  }

  camelCase(str) {
    if (str) {
      return str[0].toLowerCase() + str.substring(1, str.length);
    } else {
      return '';
    }
  }

  /** 開啟輸出路徑資料夾 */
  view() {
    this.cefCustomObject.openFolder(this.projectFolderPath);
  }
}
