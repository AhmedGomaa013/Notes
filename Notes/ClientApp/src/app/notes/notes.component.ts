import { Component, OnInit } from "@angular/core";
import { INote } from "../shared/note";
import { DataService } from "../shared/data-service";
import { MatDialog } from "@angular/material/dialog";
import { OpenDialogComponent } from "../dialog/open-dialog.component";
import { AuthService } from "../shared/AuthService";
import { Router } from "@angular/router";





@Component({
  selector: 'notes-component',
  templateUrl:'./notes.component.html'
})

export class NotesComponent implements OnInit {
  constructor(private data: DataService, private router: Router,
    public dialog: MatDialog, private auth: AuthService) { }

  _searchValue: string = "";
  get searchValue(): string {
    return this._searchValue;
  }
  set searchValue(value: string) {
    this._searchValue = value;
    this.filteredNotesList = this.searchValue ? this.performFilter(this.searchValue) : this.notesList;
    //console.log(this._searchValue);
  }

  note: INote;

  errorMessage: string = "";
  tempNoteBody: string = "";
  tempNoteTitle: string = "";

  noteBodyShow: boolean = false;
  newNoteShow: boolean = false;
  isSorted: boolean = false;

  notesList: INote[] = [];
  filteredNotesList: INote[] = [];


  performFilter(filterBy: string): INote[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.notesList.filter((note: INote) =>
      note.noteTitle.toLocaleLowerCase().indexOf(filterBy) > -1);
  }

  onSort() {
    this.isSorted = true;
    this.notesList.sort((a, b) => {
      const first = a.noteTitle.toLowerCase();
      const second = b.noteTitle.toLowerCase();
      if (first > second) return 1;
      else if (first < second) return -1;
      return 0;
    });
  }

  onView(input: INote) {
    this.note = input;
    this.tempNoteBody = input.noteBody;
    this.noteBodyShow = true;
    this.newNoteShow = false;
  }

  onOpenDialog(num: number) {
    const dialogRef = this.dialog.open(OpenDialogComponent, {
      data: num
    });
    dialogRef.afterClosed().subscribe(result => {
      if ((result == 1) && (num == 0))//delete one note at num == 0 
        this.onDelete();
      else if ((result == 1) && (num > 0))//delete all notes at num > 1
        this.onDeleteAll();

    });
  }

  onDelete() {
    this.newNoteShow = false;
    var index: number = this.notesList.indexOf(this.note, 0);
    if (index > -1) {
      this.data.deleteNote(this.notesList[index])
        .subscribe();
      this.notesList.splice(index, 1);
      this.noteBodyShow = false;
    }
  }

  onDeleteAll() {
    this.newNoteShow = false;
    this.data.deleteAllNotes()
      .subscribe();
    this.notesList.splice(0, this.notesList.length);
    this.noteBodyShow = false;
  }

  onSave() {
    this.noteBodyShow = false;
    this.newNoteShow = false;
    this.note.noteBody = this.tempNoteBody;
    this.tempNoteBody = "";
    this.data.putNote(this.note)
      .subscribe();
  }

  onNew() { 
    this.noteBodyShow = false;
    this.newNoteShow = true;
    this.tempNoteBody = "";
    this.tempNoteTitle = "";
  }

  onAddNote() {
    this.noteBodyShow = false;
    this.newNoteShow = false;
    let tempNote: INote = {
      "noteId": 0,
      "noteTitle": this.tempNoteTitle,
      "noteBody": this.tempNoteBody,
      "noteTime": new Date()
    };
     
    this.data.postNote(tempNote)
      .subscribe(data => {
        this.notesList.push(data);
      });

    this.tempNoteTitle = "";
    this.tempNoteBody = "";

    if (this.isSorted)
      this.onSort();
  }

  onCancelAddNote() {
    this.newNoteShow = false;
    this.noteBodyShow = false;
  }

  ngOnInit() {
    if (this.auth.isLoggedIn() == null)
    {
      this.router.navigateByUrl('login');
    }
    this.data.getNotes()
      .subscribe({
        next: notes => {
          this.notesList = notes;
          this.filteredNotesList = this.notesList;
        }
      }
      );
  }
}

