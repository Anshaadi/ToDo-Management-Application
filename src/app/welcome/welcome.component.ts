import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  welcomeMessageFromService
  name = ''

  constructor(
    private route: ActivatedRoute, 
    private service : WelcomeDataService
    ) { }

  ngOnInit(): void {

    //console.log(this.route.snapshot.params({'name'}))
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
      //console.log(this.service.executeHelloWorldBeanService());
      //Asynchronous call
      this.service.executeHelloWorldBeanService().subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorResponse(error)
      );
      //console.log('last line of getWelcomeMessage')
      //console.log("get welcome message");
  }

  getWelcomeMessageWithParameter() {
    //console.log(this.service.executeHelloWorldBeanService());
    //Asynchronous call
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    //console.log('last line of getWelcomeMessage')
    //console.log("get welcome message");
}

  handleSuccessfulResponse(response) {
      this.welcomeMessageFromService = response.message;
      //console.log(response);
      //console.log(response.message);
  }

  handleErrorResponse(error) {
    //console.log(error.error.message);
    this.welcomeMessageFromService = error.error.message;
  }

}
