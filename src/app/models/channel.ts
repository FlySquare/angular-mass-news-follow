export class Channel{
  id?: number;
  name: string;
  provider: string;
  fullUrl: string;
  embedUrl: string;
  isCustom: boolean;

  prepare(input?: any){
    Object.assign(this, input);
    this.id = Math.floor(Math.random() * 100000);
    if (input.provider === 'youtube'){
      this.embedUrl = `https://www.youtube.com/embed/${input.fullUrl.split('?v=').pop()}`;
    }
    if (input.provider === 'twitch'){
      this.embedUrl = `https://player.twitch.tv/?channel=${input.fullUrl.split('/').pop()}&parent=localhost`;
    }
    this.isCustom = input.isCustom || false;
    return this;
  }
}
