import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.page.html',
  styleUrls: ['./start-screen.page.scss'],
})
export class StartScreenPage implements OnInit {

  @ViewChild('toLoginButton') toLoginButtonViewChild: ElementRef;

  toLoginButtonAnimation: Animation;
  isPlaying = false;

  constructor(private router: Router, private animationController: AnimationController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.toLoginButtonAnimation = this.animationController.create()
    this.toLoginButtonAnimation
      .addElement(this.toLoginButtonViewChild.nativeElement)
      .duration(1000)
      .easing('ease-out')
      .iterations(1)
      .fromTo('transform', 'translateY(1200%)', 'translateY(1000%)')
      .fromTo('opacity', 0, 1)
      .delay(300)

    this.toggleAnimation()
  }

  toggleAnimation() {
    if (this.isPlaying) {
      this.toLoginButtonAnimation.pause()
    } else {
      this.toLoginButtonAnimation.play()
    }
  }

  redirectToLoginScreen() {
    this.router.navigate(['/login-screen']);
  }

}
