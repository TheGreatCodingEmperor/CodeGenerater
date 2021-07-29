import { Component, OnInit } from '@angular/core';
import { CefCustomObjectService } from 'src/app/core/cef-custom-object.service';

@Component({
  selector: 'app-angular-table',
  templateUrl: './angular-table.component.html',
  styleUrls: ['./angular-table.component.scss'],
})
export class AngularTableComponent implements OnInit {
  /** 範本檔案路徑 */
  filePath = '';
  /** 輸出專案資料夾路徑 */
  projectFolderPath = '';
  /** 範本物件名稱 */
  className = '';
  /** 執行進度 */
  progress = 0;
  /** 執行動作數 */
  actionCount = 0;
  /** 執行動做組 */
  generateOptions: { name: string; value: string }[] = [
    { name: 'Dto', value: 'dto' },
    { name: 'Html', value: 'html' },
    { name: 'Ts', value: 'ts' },
    { name: 'Scss', value: 'scss' },
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
        case 'dto': {
          await this.createDto(file);
          this.progress += 100 / this.actionCount;
          break;
        }
        case 'html': {
          await this.createHtml(file);
          this.progress += 100 / this.actionCount;
          break;
        }
        case 'ts': {
          await this.createTs(file);
          this.progress += 100 / this.actionCount;
          break;
        }
        case 'scss': {
          await this.createScss();
          this.progress += 100 / this.actionCount;
          break;
        }
      }
    }
  }

  // /** 產生 Document */
  // async createDocument(content: string) {
  //   content = content.replace(this.efGenerateFolerName, 'Documents');
  //   content = content.replace(this.className, this.className + 'Document');
  //   content = content.replace(this.efGenerateNameSpace,this.projectNamespace);
  //   await this.cefCustomObject.createDirectory(
  //     this.projectFolderPath + `/${this.projectNamespace}.Infrastructure/Documents`
  //   );
  //   await this.cefCustomObject.writeFileToPath(
  //     this.projectFolderPath + `/${this.projectNamespace}.Infrastructure/Documents/${this.className}Document.cs`,
  //     content
  //   );
  //   return;
  // }

  typescriptMapCSharpType(type: string) {
    return 'any';
  }

  async createDto(content: string) {
    let propertyJsonArray = this.getCSharpClassPropertyJson(content);
    let constructorSet = propertyJsonArray
      .map(
        (json) =>
          `public ${json.camel}:${this.typescriptMapCSharpType(json.type)}`
      )
      .join(';\r\n');

    let dtoTemplate = `export class ${this.className}Dto {
      ${constructorSet}
  }`;
    await this.cefCustomObject.createDirectory(
      this.projectFolderPath + `/angular/dtos`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath + `/angular/dtos/${this.dashCase(this.className)}.dto.ts`,
      dtoTemplate
    );
  }

  async createHtml(content: string) {
    let propertyJsonArray = this.getCSharpClassPropertyJson(content);
    let ths = propertyJsonArray
      .map((json) => {
        return `<th>${json.name}</th>`;
      })
      .join('\r\n');
    let tds = propertyJsonArray
      .map((json) => {
        return `<td>{{ item.${json.camel} }}</td>`;
      })
      .join('\r\n');
    let editInputs = propertyJsonArray
    .map((json) => {
      return `<div class="p-col-12"><label>${json.name}</label> <input type="text" pInputText [(ngModel)]="editClone.${json.camel}"/></div>`;
    })
    .join('\r\n');
    let dtoTemplate = `<p-card>
    <p-table
        [value]="datas"
        [paginator]="true"
        [rows]="6"
        [rowsPerPageOptions]="[6, 12, 50]"
    >
        <ng-template pTemplate="header">
            <tr>
                ${ths}
                <th>
                    <button
                        pButton
                        class="p-button-warn p-button-outlined"
                        label="{{ 'Button.Add' | translate }}"
                        (click)="onEdit()"
                    ></button>
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-item>
            <tr>
                ${tds}
                <td>
                    <button
                        pButton
                        class="p-button-info p-button-outlined"
                        label="{{ 'Button.Edit' | translate }}"
                        (click)="onEdit(item)"
                    ></button>
                    <button
                        pButton
                        class="p-button-danger p-button-outlined"
                        label="{{ 'Button.Delete' | translate }}"
                        (click)="confirm(item.deviceSn)"
                    ></button>
                    </div>
                </td>
            </tr>
        </ng-template>
    </p-table>
</p-card>

<p-dialog
    header="Edit ${this.className}"
    *ngIf="editClone"
    [(visible)]="editDialog"
    [style]="{ width: '700px' }"
>
    <div class="p-grid">
      ${editInputs}
    </div>
    <p-footer>
        <button
            pButton
            class="p-button-info p-button-outlined"
            label="{{ 'Button.Save' | translate }}"
            (click)="save()"
        ></button>
        <button
            pButton
            class="p-button-danger p-button-outlined"
            label="{{ 'Button.Cancel' | translate }}"
            (click)="cancel()"
        ></button>
    </p-footer>
</p-dialog>

<p-confirmDialog
    header="Confirmation"
    icon="pi pi-exclamation-triangle"
></p-confirmDialog>
`;
    await this.cefCustomObject.createDirectory(
      this.projectFolderPath +
        `/angular/${this.dashCase(this.className)}/`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath +
        `/angular/${this.dashCase(this.className)}/${this.camelCase(
          this.className
        )}.component.html`,
      dtoTemplate
    );
  }

  async createTs(content: string) {
    let dtoTemplate = `import { Component, OnDestroy, OnInit } from "@angular/core";
    import { ConfirmationService } from "primeng/api";
    import { map, switchMap } from "rxjs/operators";
    import { AlertService, MessageSeverity } from "src/app/core/alert.service";
    import { ConfigurationService } from "src/app/core/configuration.service";
    import { ${this.className}Dto } from "../../models/dtos/${this.dashCase(this.className)}.dto";

    @Component({
        selector: "app-${this.camelCase(this.className)}",
        templateUrl: "./${this.camelCase(this.className)}.component.html",
        styleUrls: ["./${this.camelCase(this.className)}.component.scss"],
    })
    export class ${this.className}Component implements OnInit, OnDestroy {
        /** 資料總清單 */
        datas: ${this.className}Dto[] = [];
        /** 編輯室窗開關 */
        editDialog: boolean = false;
        /** 編輯暫存 */
        editClone: ${this.className}Dto = null;
        /** 當前編輯紀錄 */
        onEditingItem: ${this.className}Dto = null;
        /** 新增中 */
        isAdd = false;

        constructor(
            private confirmationService: ConfirmationService,
            private ${this.camelCase(this.className)}Service: ${
      this.className
    }Service,
            private alertService: AlertService
        ) {}

        ngOnInit() {
            this.${this.camelCase(this.className)}Service.get${
      this.className
    }s()
                .pipe(
                    map((res) => {
                        this.datas = res;
                    })
                )
                .subscribe();
        }

        ngOnDestroy() {}

        /** 確認刪除視窗 */
        confirm(deviceSn: string) {
            this.confirmationService.confirm({
                message: "Are you sure that you want to perform this action?",
                accept: () => {
                    this.remove(deviceSn);
                },
            });
        }

        /** 開始編輯 */
        onEdit(item?: ${this.className}Dto) {
            this.isAdd = false;
            if (!item) {
                this.isAdd = true;
                this.editClone = new ${this.className}Dto();
            } else {
                this.editClone = JSON.parse(JSON.stringify(item));
            }
            this.editDialog = true;
            this.onEditingItem = item;
        }

        /** 儲存編輯 */
        save() {
            if (this.isAdd) {
                this.${this.camelCase(this.className)}Service.add${
      this.className
    }(this.editClone)
                    .pipe(
                        map((res) => {
                            this.editDialog = false;
                            this.alertService.showStickyMessage(
                                "Save ${this.className} Successed!",
                                null,
                                MessageSeverity.success
                            );
                        }),
                        switchMap(() =>
                            this.${this.camelCase(this.className)}Service.get${
      this.className
    }s().pipe(
                                map((res) => {
                                    this.datas = res;
                                })
                            )
                        )
                    )
                    .subscribe();
            } else {
                this.${this.camelCase(this.className)}Service.update${
      this.className
    }(this.editClone)
                    .pipe(
                        map((res) => {
                            this.editDialog = false;
                            this.alertService.showStickyMessage(
                                "Save ${this.className} Successed!",
                                null,
                                MessageSeverity.success
                            );
                        }),
                        switchMap(() =>
                            this.${this.camelCase(this.className)}Service.get${
      this.className
    }s().pipe(
                                map((res) => {
                                    this.datas = res;
                                })
                            )
                        )
                    )
                    .subscribe();
            }
        }

        /** 取消編輯 */
        cancel() {
            this.onEditingItem = null;
            this.editDialog = false;
            this.editClone = null;
        }

        /** 刪除紀錄 */
        remove(id: string) {
            this.${this.camelCase(this.className)}Service.delete${this.className}(id)
                .pipe(
                    map(() => {
                        this.alertService.showStickyMessage(
                            "Remove ${this.className} Successed!",
                            null,
                            MessageSeverity.success
                        );
                    })
                )
                .subscribe();
        }
    }

`;
    await this.cefCustomObject.createDirectory(
      this.projectFolderPath +
        `/angular/${this.dashCase(this.className)}/`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath +
        `/angular/${this.dashCase(this.className)}/${this.dashCase(this.className)}.component.ts`,
      dtoTemplate
    );
  }

  async createScss() {
    await this.cefCustomObject.createDirectory(
      this.projectFolderPath +
        `/angular/${this.dashCase(this.className)}/`
    );
    await this.cefCustomObject.writeFileToPath(
      this.projectFolderPath +
        `/angular/${this.dashCase(this.className)}/${this.dashCase(this.className)}.component.scss`,
      ''
    );
  }

  /**
   * @summary parser 出 C# Class property
   * @param content C# Class
   * @returns propertyName propertyName(camel_Case) propertyType
   */
  getCSharpClassPropertyJson(
    content: string
  ): { name: string; camel: string; type: string }[] {
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

  dashCase(str) {
    str = this.camelCase(str);
    let founds = str.match(/[A-Z]/g);
    if(founds){
      for (let item of founds) {
        str = str.replace(item, '-' + item.toLowerCase());
      }
    }
    return str;
  }

  /** 開啟輸出路徑資料夾 */
  view() {
    this.cefCustomObject.openFolder(this.projectFolderPath);
  }
}
