import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AddPlayerComponent} from './add-player/add.player.component';
import {PlayerOverviewComponent} from './player-overview/player.overview.component';
import {SportClubService} from './sport.club.service';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {UpdatePlayerComponent} from './update-player/update.player.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {DeleteConfirmationComponent} from './delete-confirmation/delete-confirmation.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    AddPlayerComponent,
    PlayerOverviewComponent,
    UpdatePlayerComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [SportClubService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
