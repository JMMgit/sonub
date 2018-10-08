import { Component, OnInit } from '@angular/core';
import { StatService } from '../../../../services/stat.service';
import { AppService } from '../../../../services/app.service';
import { SimpleLibrary as _ } from 'ng-simple-library';

@Component({
  selector: 'app-blog-stat-visitor',
  templateUrl: './blog-stat-visitor.component.html',
  styleUrls: ['./blog-stat-visitor.component.scss']
})
export class BlogStatVisitorComponent implements OnInit {


  from_date = new Date((new Date()).getTime() - 15 * 24 * 60 * 60 * 1000);
  to_date = new Date();

  from_hour = 0;
  to_hour = 23;

  statsView = 'daily';

  data = {
    pageView: null,
    everyHourPageView: null,
    uniqueVisitor: null,
    everyHourUniqueVisitor: null
  };

  total = {
    pageView: null,
    everyHourPageView: null,
    uniqueVisitor: null,
    everyHourUniqueVisitor: null
  };

  /**
   * SimpleLibrary
   */
  _ = _;

  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


  constructor(public a: AppService,
       private stat: StatService
  ) {
    this.loadStat();
  }

  ngOnInit() {
  }

  request(method = '') {
    return {
      function: method,
      domain: this.a.philgo.myBlogDomain(),
      from_year: this.from_date.getFullYear(),
      from_month: this.from_date.getMonth() + 1,
      from_day: this.from_date.getDate(),
      from_hour: this.from_hour,
      to_year: this.to_date.getFullYear(),
      to_month: this.to_date.getMonth() + 1,
      to_day: this.to_date.getDate(),
      to_hour: this.to_hour
    };
  }

  loadStat() {

    const req = this.request('statistics');
    this.stat.getData(req).subscribe(res => {
      console.log('statistics: ', res);
      this.data = res['data'];
    }, e => {
      this.a.error(e);
    });

    // req.function = 'pageView';
    // this.stat.getData(req).subscribe(res => {
    //   console.log('page view stat: ', res);
    //   this.data['pageView'] = res['data'];
    // }, e => {
    //   this.a.error(e);
    // });
    //
    // req.function = 'uniqueVisitor';
    // this.stat.getData(req).subscribe(res => {
    //   console.log('unique visitor stat: ', res);
    //   this.data['uniqueVisitor'] = res['data'];
    // }, e => {
    //   this.a.error(e);
    // });


    // req.function = 'everyHourPageView';
    // this.stat.getData(req).subscribe(res => {
    //   console.log('everyHourPageView: ', res);
    //   this.data['everyHourPageView'] = res['data'];
    // }, e => {
    //   this.a.error(e);
    // });
    //
    // req.function = 'everyHourUniqueVisitor';
    // this.stat.getData(req).subscribe(res => {
    //   console.log('everyHourUniqueVisitor: ', res);
    //   this.data['everyHourUniqueVisitor'] = res['data'];
    //   console.log(this.data);
    // }, e => {
    //   this.a.error(e);
    // });

  }




  barHeight( no , max = null, div = 1 ) {
    // console.log(max);
    if ( !no || no === 0 ) {
      return '1';
    }
    if ( no < 0 ) {
      no = Math.abs(no);
    }
    if ( max ) {
      return Math.floor((no / max * 100) / div);
    }

    return Math.floor(no / div);
  }

  formatDate( Ymd ) {
    const year = Ymd.substring(0, 4);
    const month = Ymd.substring(4, 6) - 1;
    const day  = Ymd.substring(6, 8);

    const d = new Date(year, month, day);
    if ( this.statsView === 'daily' ) {
      return day + ' ' + this.monthNames[month];
    }
  }


}
