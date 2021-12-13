import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';

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
  UploadTaskSnapshot,
} from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent extends BaseComponent implements OnInit {
  constructor(private storage: Storage) {
    super();
  }

  ngOnInit(): void {
    console.log('trying to get a ref to museums');
    const museumsRef = ref(this.storage, 'museums');
    console.log(museumsRef);
    console.log('fullpath: ', museumsRef.fullPath);
    // console.log('deleting museums/2/hnm.jpeg.....')
    //       const ref2delete = ref(this.storage, 'museums/2/hnm.jpeg')
    //       deleteObject(ref2delete)
    //         .then(() => console.log('deleted'))
    //         .catch(console.log)
    listAll(museumsRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          console.log('itemRef: ', itemRef)
          console.log('itemRef.fullPath: ', itemRef.fullPath);
          // if (itemRef.fullPath === 'museums/amagi.jpeg') {
          //   deleteObject(itemRef)
          //     .then(() => console.log('file deleted'))
          //     .catch((err) => console.error(err));
          // }
          console.log('deleting museums/2/hnm.jpeg.....')
          const ref2delete = ref(this.storage, 'museums/2/hnm.jpeg')
          deleteObject(ref2delete)
            .then(() => console.log('deleted'))
            .catch(console.log)
        });
      })
      .catch((err) => console.error(err));
  }

  @ViewChild('fileInput') input!: ElementRef;

  @Input() folder = '';

  @Output() gotUrl = new EventEmitter<string>();

  description = '';

  uploadPercent$?: Observable<{
    progress: number;
    snapshot: UploadTaskSnapshot;
  }>;

  percentUploaded: number = 0;

  imgUrl = '';

  file: File | undefined;

  async upload(name: string, file: File | null): Promise<string | undefined> {
    const ext = file!.name.split('.').pop();
    const path = `${this.folder}/${name}.${ext}`;

    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        this.uploadPercent$ = percentage(task);
        this.uploadPercent$
          .pipe(takeUntil(this.destroy$))
          .subscribe((percent) => (this.percentUploaded = percent.progress));
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('upload a valid file');
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
      this.imgUrl = '';
    }
  }

  uploadFile(): void {
    if (this.file) {
      const name = this.file.name.split('.')[0];
      this.upload(name, this.file)
        .then((url) => {
          if (url) {
            console.log(url);
            this.imgUrl = url;
            this.gotUrl.emit(`${url}&&&${this.description}`);
            this.input.nativeElement.value = null;
            this.input.nativeElement.files = null;
            this.description = '';
            this.file = undefined;
          }
        })
        .catch((err) => console.error('ERROR:', err));
    } else {
      alert('Select a file to upload!');
    }
  }
}
