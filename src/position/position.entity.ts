export class Position{
    
    public longitude: number;
  
    public latitude: number;

    public Position(long:number,lat:number){
        this.longitude = long;
        this.latitude  = lat;
    }

    public SetPosition(long:number,lat:number): void{
        this.longitude = long;
        this.latitude  = lat;
    }

    public GetPosition() : any{
        return this;
    }

    public ToString(): any{
        return "Longitude : "+this.longitude+", latitude : "+this.latitude;
    }
  
} 