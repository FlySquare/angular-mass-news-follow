export class Channel{
  id?: number;
  name: string;
  slug: string;
  embedUrl: string;
  provider: string;
  fullUrl: string;

  prepare(input?: any){
    Object.assign(this, input);
    this.id = Math.floor(Math.random() * 100000);
    if (input.embedUrl){
      this.fullUrl = input.embedUrl + input.slug;
    }
    return this;
  }
}
