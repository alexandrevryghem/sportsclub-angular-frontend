import {Component, OnInit} from '@angular/core';
import {Player} from '../model/player';
import {SportClubService} from '../sport.club.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-player',
  templateUrl: './update.player.component.html'
})

export class UpdatePlayerComponent implements OnInit {
  player = new Player();
  error = '';
  firstNameError = '';
  lastNameError = '';
  playerNumberError = '';
  ageError = '';

  constructor(private sportClubService: SportClubService, private router: Router, private route: ActivatedRoute) {
  }

  updatePlayer(): void {
    this.sportClubService.updatePlayer(this.player).subscribe({
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

  getPlayer(): void {
    this.sportClubService.getPlayer(this.player.id).subscribe((data) => {
        if (data != null && !data.hasOwnProperty('error')) {
          this.player = data;
        } else {
          this.router.navigate(['/players']);
        }
      },
      () => this.router.navigate(['/players'])
    );
  }

  ngOnInit(): void {
    if (!isNaN(Number(this.route.snapshot.paramMap.get('id')))) {
      this.player.id = Number(this.route.snapshot.paramMap.get('id'));
      this.getPlayer();
    } else {
      this.router.navigate(['/players']);
    }
  }

}
