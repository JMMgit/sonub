import { Component, OnInit } from '@angular/core';
import { ApiBlogSettings, PhilGoApiService, ApiThumbnailGenerate } from 'share/philgo-api/philgo-api.service';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-blog-app-icon',
  templateUrl: './blog-app-icon.component.html',
  styleUrls: ['./blog-app-icon.component.scss']
})
export class BlogAppIconComponent implements OnInit {

  blog: ApiBlogSettings = <any>{};
  percentage = 0;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {

    philgo.blogLoadSettings(philgo.myBlogDomain()).subscribe(res => {
      console.log('res: ', res);
      this.blog = Object.assign({}, res);
    }, e => this.a.error(e));
  }

  ngOnInit() {
  }


  onSubmit($event: Event) {
    $event.preventDefault();

    console.log('req: ', this.blog);
    const data: ApiBlogSettings = <any>{};
    data.app_name = this.blog.app_name;
    data.app_short_name = this.blog.app_short_name;
    data.app_theme_color = this.blog.app_theme_color;
    this.philgo.blogSaveSettings(data).subscribe(res => {
      console.log('blog saved: ', res);
      this.a.toast(this.a.t({ en: 'Blog settings have successfully updated.', ko: '블로그 설정이 저장되었습니다.' }));
      // this.philgo.profile().subscribe(r => {
      //   console.log('blog save => user local storage updated to restore blog domain: ', r);
      // });
    }, e => this.a.error(e));


    return false;
  }


  onChangeFile(event: Event, code: string) {
    const files = <any>event.target['files'];

    if (files === void 0 || !files.length || files[0] === void 0) {
      const e = { code: -1, content: this.philgo.t({ en: 'Please select a file', ko: '업로드 할 파일을 선택해주세요.' }) };
      return;
    }

    this.philgo.fileUpload(files, { gid: this.a.philgo.myIdx(), code: code }).subscribe(res => {
      if (typeof res === 'number') {
        console.log('percentage: ', res);
        this.percentage = res;
      } else {
        console.log('file success: ', res);
        this.blog.app_url_icons_src_512 = res.src;
        this.percentage = 0;
        this.generateAppIconThumbnails(res.path, 0);
      }
    }, e => {
      console.error(e);
      this.a.error(e);
      this.percentage = 0;
    });
  }

  /**
   * Generate thumbnails
   * @param path uploaded file's data path
   * @param count number to generate thumbnails
   */
  generateAppIconThumbnails(path: string, count: number) {
    const sizes = [
      { width: 72, height: 72},
      { width: 96, height: 96},
      { width: 128, height: 128},
      { width: 144, height: 144},
      { width: 152, height: 152},
      { width: 192, height: 192},
      { width: 384, height: 384},
      { width: 512, height: 512},
    ];
    const options: ApiThumbnailGenerate = {
      path: path,
      prefix: 'icons-' + this.philgo.myIdx(),
      width: sizes[count].width,
      height: sizes[count].height,
      mode: 'adaptive',
      ext: 'png',
    };
    this.philgo.generateThumbnail(options).subscribe(thumb64 => {
      console.log('thumbnail generate', thumb64);
      if ( count >= 7 ) {
        return;
      } else {
        count++;
        this.generateAppIconThumbnails( path, count);
      }
    }, e => this.a.error(e));
  }


}
