import {Component, OnInit} from '@angular/core';
import {SportClubService} from '../sport.club.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Player} from '../model/player';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmationComponent implements OnInit {
  player = new Player();

  constructor(private sportClubService: SportClubService, private router: Router, private route: ActivatedRoute) {
  }

  deletePlayer(id: any): void {
    this.sportClubService.deletePlayer(id).subscribe(() => this.router.navigate(['/players']));
  }

  getPlayer(): void {
    this.sportClubService.getPlayer(this.player.id).subscribe({
      next: (data) => {
        if (data != null && !data.hasOwnProperty('error')) {
          this.player = data;
        } else {
          this.router.navigate(['/players']);
        }
      },
      error: () => this.router.navigate(['/players'])
    });
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
