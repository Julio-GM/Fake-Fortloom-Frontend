import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { PublicationService } from 'src/app/services/publication/publication.service';
import {MatPaginator} from "@angular/material/paginator";
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  isHidden=true
  studentData!: any;
  dataSource: MatTableDataSource<any>;
  haveInfo = false;
  secondButtonText = "Create Post"

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private postService: PublicationService) {
    this.studentData = {}
    this.dataSource = new MatTableDataSource<any>();
    this.haveInfo = false;
  }

  ngOnInit(): void {
  }

  activateCreatePostScreen(): void{
    this.isHidden = !this.isHidden;
    this.secondButtonText = this.secondButtonText == "Create Post" ? "Cancel creating post" : "Create Post"
  }

  getPosts(): void {
    console.log("See post button clicked")
    this.postService.getAll().subscribe((response: any) => {
      console.log(response);
      this.dataSource.data = response.data;
      this.dataSource.paginator=this.paginator;
      this.studentData = response;
      this.haveInfo = true;
      console.log(this.dataSource.data);
      console.log(this.studentData);
    });
  }

}
