import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { map } from 'rxjs';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  selected = new Date()
  api = inject(ApiService)
  userCount$ = this.api.getAllUsersListAPI()
  recipeCount$ = this.api.getAllRecipesAPI()
  downloadCount$ = this.api.getAllDownloadListAPI()
  feedbackCount$ = this.api.getAllFeedbackListAPI().pipe(map((allFeedbacks: any) => allFeedbacks.filter((item: any) => item.status == "pending")))

  router = inject(Router)
  sidebarOpen: boolean = true

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        text: 'Analysis of Download Recipes Based on its Cuisine',
        display: true
      }
    }
  }
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Italian', 'Indian', 'Asian', 'Chinese', 'Pakistani'],
    datasets: [{
      label: 'Count',
      data: [3, 4, 5, 6, 9]
    }]
  }

  constructor() {
    if (localStorage.getItem("label") && localStorage.getItem("data")) {
      const labels = JSON.parse(localStorage.getItem("label") || "")
      const data = JSON.parse(localStorage.getItem("data") || "")
      this.barChartData = {
        labels,
        datasets: [{
          label: 'Count',
          data
        }

        ]
      }

    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
  }

  logout() {
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
