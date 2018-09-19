import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { NgSimpleEditorComponent } from 'ng-simple-editor';
import { SimpleLibrary as _ } from 'ng-simple-library';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @ViewChild('editor') editor: NgSimpleEditorComponent;


  form: ApiPost = <any>{
    post_id: 'blog',
    gid: _.randomString(19, this.philgo.myIdx())
  };


  /**
   * Subject will be updated from content only if it is not touched by user.
   */
  subjectChanged = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.form.post_id = params.get('post_id');
    });

  }

  ngOnInit() {
  }

  onSubmit() {

    /**
     * Create
     */
    if (!this.form.post_id) {
      // this.a.toast({code: -1, message: `Please choose where to 'post on'`});
      // this.form.post_id = this.defaultPostId;
    }
    this.form.content = this.editor.content;
    this.philgo.postCreate(this.form).subscribe(res => {
      console.log('create res: ', res);
      // this.a.openHome();
      this.a.openForum( this.form.post_id );
    }, e => {
      this.a.toast(e);
    });
  }



  onChangeContent(event: Event) {
    if (!this.subjectChanged) {
      let str = this.a._.stripTags(this.editor.content);
      str = this.a._.htmlDecode(str).trim();
      this.form.subject = str.substr(0, 30);
    }
  }

  onSubjectKeyUp() {
    this.subjectChanged = true;
    console.log('working?');
  }



}