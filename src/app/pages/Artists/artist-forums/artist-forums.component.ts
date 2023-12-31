import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms'
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { Forum } from 'src/app/models/forum';
import { MatTableDataSource } from '@angular/material/table';
import {NgForm} from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from "@angular/material/paginator";
import { ForumService } from 'src/app/services/forum/forum.service';
@Component({
  selector: 'app-artist-forums',
  templateUrl: './artist-forums.component.html',
  styleUrls: ['./artist-forums.component.css']
})
export class ArtistForumsComponent implements OnInit {
  forumdata !:Forum;
  forumdatabyid !:Forum;
  forums:Forum[]=[];
  dataSource !:MatTableDataSource<any>;
  @ViewChild('ForumForm', {static: false})
  ForumForm!: NgForm;
  displayedColumns: string[] = ['id', 'ForumName', 'ForumDescription','actions'];
  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator !:MatPaginator;
  searchKey!:string;
  isEditMode = false;
  numerot:number=1
  form:FormGroup=new FormGroup({
  ForumName!:new FormControl('',Validators.required),
  ForumDescription!:new FormControl('',[Validators.required,Validators.maxLength(40)])
});
idnumber!:number;
  


constructor( private service:ForumService,private dialog:MatDialog,private cd:Router,private route:ActivatedRoute ) {
  this.forumdata = {} as Forum;
  this.dataSource = new MatTableDataSource<any>();
  this.forumdatabyid ={} as Forum;

}
ngOnInit(): void {
  let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
  let id= pod;
  this.idnumber=id;
  this.getAllForums()
  this.getAllStudents()
  console.log(this.forums);
  console.log(this.displayedColumns);
  console.log(this.isEditMode)
  this.getbyid(1)
}
getAllForums(){
  console.log("awda");
  
  this.service.getAll().subscribe((response:any) => {
    this.forumdata = response
    console.log(this.forumdata);
    
  })
}

getAllStudents() {
  this.service.getAll().subscribe((response: any) => {
    this.dataSource.data = response.content;
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;

    console.log( this.dataSource.data)
  });
}







getbyid(id: number){
this.service.getById(id).subscribe((response: any)=>{
this.forumdatabyid=response;


});


}

OnSearchClear(){
this.searchKey="";
this.applyfilter();


}

cancelEdit() {
this.isEditMode = false;
this.ForumForm.resetForm();
}
applyfilter(){

this.dataSource.filter=this.searchKey.trim().toLowerCase();


}

deleteItem(id: number) {
this.service.delete(id).subscribe((response: any) => {
  this.dataSource.data = this.dataSource.data.filter((o: Forum) => {
    return o.id !== id ? o : false;
  });
});
console.log(this.dataSource.data);
}

addStudent(id:number) {
this.service.create(this.forumdata,id).subscribe((response: any) => {
  this.dataSource.data.push( {...response});
  this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
});
}




onSubmit(){

if (this.ForumForm.form.valid) {
console.log(this.forumdata);
if (this.isEditMode) {
  console.log("se actualiza")
  this.updateStudent();
} else {

  this.addStudent(this.numerot);
}
}
else{
  console.log('Invalid data');
}

}


updateStudent() {
this.service.update(this.forumdata.id, this.forumdata).subscribe((response: any) => {
  this.dataSource.data = this.dataSource.data.map((o: Forum) => {
    if (o.id === response.id) {
      o = response;
    }
    return o;
  });
  this.cancelEdit();
});
}




insertforum(){


this.cd.navigate(['/HomeArtist',this.idnumber,'ArtistForum','CreateForum'])



}



enterforumpage(id:number){


this.cd.navigate(['/HomeArtist',this.idnumber,'ArtistForum','ForumPage',id])




}












}
