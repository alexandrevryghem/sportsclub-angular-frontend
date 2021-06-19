import {Component, OnInit} from '@angular/core';
import {Player} from '../model/player';
import {SportClubService} from '../sport.club.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add.player.component.html'
})

export class AddPlayerComponent implements OnInit {
  player = new Player();
  error = '';
  firstNameError = '';
  lastNameError = '';
  playerNumberError = '';
  ageError = '';

  constructor(private sportClubService: SportClubService, private router: Router) {
  }

  addPlayer(): void {
    this.sportClubService.addPlayer(this.player).subscribe({
      next: () => this.router.navigate(['/players']),
      error: (response) => {
        document.getElementById('generalError').hidden = !response.error.hasOwnProperty('error');
        this.error = response.error.hasOwnProperty('error') ? response.error.error : '';
        this.firstNameError = response.error.hasOwnProperty('firstName') ? response.error.firstName : '';
        this.lastNameError = response.error.hasOwnProperty('lastName') ? response.error.lastName : '';
        this.playerNumberError = response.error.hasOwnProperty('playerNumber') ? response.error.playerNumber : '';
        this.ageError = response.error.hasOwnProperty('age') ? response.error.age : '';
      }
      });
  }

  ngOnInit(): void {
  }

}
