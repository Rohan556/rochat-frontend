import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UsersService } from './services/users.service';
import { ChattingComponent } from './chatting/chatting.component';
import { MessagesService } from './services/messages.service';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserCellComponent } from './user-cell/user-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ChatWindowComponent,
    UserListingComponent,
    ChattingComponent,
    SearchComponent,
    SearchResultComponent,
    UserCellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'chat', component: ChatWindowComponent },
      { path: '', component: LoginComponent },
    ]),
  ],
  providers: [AuthService, UsersService, MessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
