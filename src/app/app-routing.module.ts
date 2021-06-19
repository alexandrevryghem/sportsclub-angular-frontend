import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddPlayerComponent} from './add-player/add.player.component';
import {PlayerOverviewComponent} from './player-overview/player.overview.component';
import {UpdatePlayerComponent} from './update-player/update.player.component';
import {DeleteConfirmationComponent} from './delete-confirmation/delete-confirmation.component';

// you can't use routerLink="/" for your navigation because otherwise the active tab css doesn't work
const routes: Routes = [
  {path: '', component: PlayerOverviewComponent},
  {path: 'players', component: PlayerOverviewComponent},
  {path: 'addPlayer', component: AddPlayerComponent},
  {path: 'updatePlayer/:id', component: UpdatePlayerComponent},
  {path: 'deletePlayer/:id', component: DeleteConfirmationComponent},
  // {path: '**', component: PlayerOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
