import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api-service';
import { Observable } from 'rxjs';
import { AsyncPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, RouterLink, AsyncPipe,SlicePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  api = inject(ApiService)
  allRecipes$:Observable<any[]> = this.api.getAllRecipesAPI()
  allFeedbacks$:Observable<any[]> = this.api.getAllApprovedFeedbacksAPI()
}
