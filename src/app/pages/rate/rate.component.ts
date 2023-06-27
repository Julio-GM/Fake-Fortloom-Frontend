import { Component, OnInit,Input } from '@angular/core';
import { Rate } from 'src/app/models/rate';
import { RateService } from 'src/app/services/rate/rate.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  @Input() idcomment!:number
  idactualuser!:number
  constructor(private rateservice:RateService,private route:ActivatedRoute) {

    this.rate={}as Rate;

  }
  value!:number;
  val!: number
  rate!:Rate
  ngOnInit(): void {
    let pad=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id2= pad;
    this.idactualuser=id2;
    console.log(this.idactualuser)
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    this.val = value;
    return value;
  }
  new_rate( aId: number){
    console.log('rate:' + aId)
    this.rate.rates=aId;
    this.NewRate();


  }
  NewRate(){

    this.rateservice.create(this.idactualuser,this.idcomment,this.rate).subscribe((response: any) => {

      alert("Se ha calificado al artista")

    });


  }

}
