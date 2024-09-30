export class CardAppSkeleton extends HTMLElement {
  constructor(){
    super(); 
    this.innerHTML =
      `
      <div class="app-skeleton">
        <div class="icon">  </div>
        <div class="title">
          <h3></h3>
        </div>
      </div>
      `
  }
}