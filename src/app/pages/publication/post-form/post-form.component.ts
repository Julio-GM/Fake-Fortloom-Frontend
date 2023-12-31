import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Multimedia} from 'src/app/models/multimedia';
import {Publication} from 'src/app/models/publication';
import {PublicationService} from 'src/app/services/publication/publication.service';
import {MultimediaService} from 'src/app/services/multimedia/multimedia.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  aux1:any;
  aux2:any;
  auxLinks:string[] = [];
  postData: Publication;
  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  multimediaDialog = false;
  multimedia!:Multimedia
  t!:number
  constructor(private postService: PublicationService,
              private multimediaService: MultimediaService,
              private $route: ActivatedRoute,private httpClient: HttpClient) {
                this.multimedia={}as Multimedia
    this.postData={}as Publication
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getAllStudents()


  }

  selectedFile!: File;
  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  postPost(txt: HTMLTextAreaElement): void {
    const tail=Math.random().toString(8).substr(2);
    console.log(tail.length)
    this.postData.publicationName=tail

    this.postData.publicationDescription = txt.value;

    this.postData.likes=0;

    this.postData.date = new Date().toLocaleDateString('en-GB');

    this.postData.artist = {
      artistfollowers: 1000,
      email: "john.doe@example.com",
      facebookLink: "https://www.facebook.com/johndoe",
      id: 1,
      instagramLink: "https://www.instagram.com/johndoe",
      lastname: "Doe",
      password: "password123",
      realname: "John Doe",
      twitterLink: "https://twitter.com/johndoe",
      username: "johndoe"
    };

    console.log(this.postData)

    this.postService.create(this.postData, +this.$route.snapshot.params['id']).subscribe((response: any) => {

      //this.dataSource2.data.push( {...response});
      console.log("Response id: ", response.id)
      var publication=response
      //console.log(this.dataSource2.data);
      //console.log(this.dataSource2.data.length);
      //this.t=this.dataSource2.data.length
      //this.dataSource2.data = this.dataSource.data.map((o: any) => { return o; });
      console.log("Auxlinks: ", this.auxLinks)
      //console.log(this.t)


      if(this.auxLinks.length > 0){

        console.log("bbbbbbbbbbbbb")
        for (let i of this.auxLinks){

          const newMultimedia: Multimedia = {
            content: i,
            publicationId: response.id,
            publication: response
          }

          this.postService.createImage(newMultimedia).subscribe((response: any) => {
            console.log(response);
          });

            //this.httpClient.post("http://localhost:3000/multimedias", newMultimedia, { observe: 'response' })
          //.subscribe((response) => {
          //  if (response.status === 200) {
          //    console.log('Image uploaded successfully');
          //  } else {
          //     console.log('Image not uploaded successfully')
          //  }
          //}
          //);




        }

      }


    },err=>{
      alert("escriba la publicacion")
    });


    txt.value = "";
  }

  getAllStudents() {
    this.postService.getAll().subscribe((response: any) => {
      this.dataSource2.data = response.content;



    });
}
  getLinkFromDialog(txt: string): void {
    this.auxLinks.push(txt);
    console.log("IMAGEN ENTRANTE: ", txt)
    console.log(this.auxLinks)
  }
probar(){
  console.log(this.selectedFile);

  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  const uploadImageData = new FormData();
  uploadImageData.append('file', this.selectedFile, this.selectedFile.name);

  //Make a call to the Spring Boot Application to save the image
  this.httpClient.post('http://localhost:3000/publications/2/multimedias', uploadImageData, { observe: 'response' })
    .subscribe((response) => {
      if (response.status === 200) {
       'Image uploaded successfully';
      } else {
         'Image not uploaded successfully';
      }
    }
    )
}











}
