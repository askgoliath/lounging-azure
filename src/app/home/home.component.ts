import { Component, OnInit } from '@angular/core';
import { XBridge , Lounger } from '../services/xbridge.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
  providers:[
    XBridge
],
})
export class HomeComponent implements OnInit {
  loungers : Lounger[];
  constructor (private xbridge : XBridge){
      
  }

  ngOnInit()
  {
      this.getLoungers();
  }

  getLoungers(){
      this.xbridge.Get<Lounger[]>("Loungers")
      .then(
      function(result: Lounger[]){
          console.info(result);
          this.loungers = result;
      }, 
      function(reason){
          alert(reason);
      })
      .catch(function(reason){
          alert(reason);
      })
  }

}
