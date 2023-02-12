import { Position } from "src/position/position.entity";

export class Arret{
    
    public name: String;
  
    public position: Position;

    public Arret(name:String,position:Position){
        this.name = name;
        this.position  = position;
    }
  
} 