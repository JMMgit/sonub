import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { PhilGoApiService, ApiBlogSettings } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-blog-settings-basic',
  templateUrl: './blog-settings-basic.component.html',
  styleUrls: ['./blog-settings-basic.component.scss']
})
export class BlogSettingsBasicComponent implements OnInit {


  blog: ApiBlogSettings = <any>{};
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
    data.name = this.blog.name;
    data.description = this.blog.description;
    this.philgo.blogSaveSettings(data).subscribe(res => {
      console.log('blog saved: ', res);
      this.a.toast(this.a.t({ en: 'Blog settings have successfully updated.', ko: '블로그 설정이 저장되었습니다.' }));
      // this.philgo.profile().subscribe(r => {
      //   console.log('blog save => user local storage updated to restore blog domain: ', r);
      // });
    }, e => this.a.error(e));


    return false;
  }

}