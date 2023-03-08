export class Channel{
  id?: number;
  name: string;
  slug: string;
  embedUrl: string;
  provider: string;

  prepare(input?: any){
    Object.assign(this, input);
    this.id = Math.floor(Math.random() * 100000);
    return this;
  }
}
