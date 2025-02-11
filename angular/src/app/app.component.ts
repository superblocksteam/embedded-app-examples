import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TokenService } from './token-service';

// Assuming the library export is named and can be imported like this
import { createSuperblocksEmbed } from '@superblocksteam/embed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  token?: string;
  customerId = '';
  embed!: any;

  // Use ViewChild to get a reference to the container element
  @ViewChild('embedContainer', { static: false }) embedContainer!: ElementRef;

  constructor(private tokenService: TokenService) {}
  ngAfterViewInit(): void {
    //
  }

  ngOnInit(): void {
    this.tokenService.fetchToken().subscribe({
      next: (data: any) => {
        this.token = data.access_token;
        this.initializeSuperblocksEmbed();
      },
      error: (error: any) => console.error('Failed to fetch token:', error),
    });
  }


  setCustomerId() {
    this.updateSuperblocksEmbed();
  }

  private initializeSuperblocksEmbed() {
    // Ensure the container is available
    if (this.embedContainer && this.embedContainer.nativeElement) {
      this.embed = createSuperblocksEmbed({
        src: "YOUR_APP_EMBED_URL_HERE",
        properties: { customerId: this.customerId },
        token: this.token,
      });

      // Clear any existing content
      this.embedContainer.nativeElement.innerHTML = '';
      // Append the new Superblocks embed element
      this.embedContainer.nativeElement.appendChild(this.embed);
    }
  }

  private updateSuperblocksEmbed() {
    // Ensure the container is available
    if (this.embed) {
      this.embed.properties = {
        customerId: this.customerId,
      }
    }
  }
}
