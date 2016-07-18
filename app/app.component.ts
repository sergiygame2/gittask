import { Component } from '@angular/core';
import { ItemComponent } from './item.component';
import { CartIconComponent } from './cart-icon.component';
import { ItemService } from './item.service';
import { CartService } from './cart-icon.service';


@Component({
  selector: 'my-app',
  templateUrl:'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ItemComponent,CartIconComponent],
  providers: [ItemService,CartService]
})

export class AppComponent {
  title = 'Shopping cart';
}
