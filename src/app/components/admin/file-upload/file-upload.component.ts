import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import {
  Storage,
  ref,
  listAll,
  deleteObject,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  percentage,
  getDownloadURL,
} from '@angular/fire/storage';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  
  constructor(private storage: Storage) { }

  ngOnInit(): void {
    console.log('trying to get a ref to museums')
    const museumsRef = ref(this.storage, 'museums')
    
    console.log(museumsRef);
    console.log('fullpath: ', museumsRef.fullPath);
    listAll(museumsRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          console.log(itemRef.fullPath);
          // if (itemRef.fullPath === 'museums/amagi.jpeg') {
          //   deleteObject(itemRef)
          //     .then(() => console.log('file deleted'))
          //     .catch(err => console.error(err))
          // }
          
        })
      })
      .catch((err) => console.error(err))
  }

  @ViewChild('fileInput') input!: ElementRef

  @Input() folder = '';

  uploadPercent?: Observable<number>;

  file: File | undefined;

  async upload(
    name: string,
    file: File | null
  ): Promise<string | undefined> {

    const ext = file!.name.split('.').pop();
    const path = `${this.folder}/${name}.${ext}`

    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef)
        return url;
      } catch (error) {
        console.error(error)
      }
    } else {
      alert('upload a valid file')
    }
    return undefined;
  }



  cancelUpload(): void {
    
    this.input.nativeElement.value = null;
    this.input.nativeElement.files = null;
    this.file = undefined;
  }



  submitFile(files: FileList | null): void {
   if (files) {
     this.file = files[0];
   }
  }

  uploadFile (): void {
    if (this.file) {
      const name = this.file.name.split('.')[0]
      this.upload(name, this.file)
        .then(url => {
          console.log(url);
          this.input.nativeElement.value = null;
          this.input.nativeElement.files = null;
          this.file = undefined;
        })
        .catch(err => console.error('ERROR:', err))

    } else {
      alert('Select a file to upload!')
    }
    
  }



}
