import {Component, OnInit, OnDestroy} from '@angular/core';
import {Player} from '../model/player';
import {SportClubService} from '../sport.club.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-player-overview',
  templateUrl: './player.overview.component.html',
  styleUrls: ['./player.overview.component.css']
})

export class PlayerOverviewComponent implements OnInit, OnDestroy {
  players?: Player[];
  search;
  age;
  firstName = '';
  lastName = '';
  subscription;

  constructor(private sportClubService: SportClubService) {
  }

  getPlayers(): void {
    this.subscription = timer(0, 2500).subscribe(() => {
      switch (this.search) {
        case undefined: {
          this.getAllPlayers();
          break;
        }
        case 'age': {
          this.searchAge();
          break;
        }
        case 'name': {
          this.searchName();
          break;
        }
      }
    });
  }

  getAllPlayers(): void {
    this.sportClubService.getPlayers().subscribe(data => this.players = data);
  }

  searchAge(): void {
    this.sportClubService.searchAge(this.age).subscribe((data) => this.players = data);
    this.search = 'age';
  }

  searchName(): void {
    this.sportClubService.searchName(this.firstName, this.lastName).subscribe((data) => this.players = data === null ? [] : [data]);
    this.search = 'name';
  }

  resetSearch(): void {
    this.search = undefined;
    this.age = '';
    this.firstName = '';
    this.lastName = '';
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
