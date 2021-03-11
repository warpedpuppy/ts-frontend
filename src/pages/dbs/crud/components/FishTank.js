import React from 'react';
import './FishTank.css';
import * as PIXI from 'pixi.js'
import Utils from '../../../../services/Utils';

export default class FishTank extends React.Component {
    state = {characters: []};
    canvasWidth = 600;
    canvasHeight = 200;
    // characters = [];
    stage = undefined;
    app = undefined;
    count = 0;
    characters = [];
    objectPool = [];
    characterQ = 5;
    componentDidMount = () => {
      this.app = new PIXI.Application({width: this.canvasWidth, height: this.canvasWidth, backgroundColor: 0x339DFF, backgroundAlpha: 0});
      document.getElementById("pixi-space").appendChild(this.app.view);
      this.stage = this.app.stage;
      this.app.ticker.add(this.moveCharacters);
      let texture = new PIXI.Texture.from('./bmps/waterSmall.png');
      this.water1 = new PIXI.Sprite(texture)
      this.water2 = new PIXI.Sprite(texture)
      this.water1.alpha = 0.25;
      this.water1.vx = -1;
      this.water1.vy = -1;
      this.water2.vx = 1;
      this.water2.vy = 1;
      this.water2.x = -(this.water2.width - this.canvasWidth);
      this.water2.y = -(this.water2.height - this.canvasHeight);
      this.water2.alpha = 0.25;

      this.createObjectPool();
    }
    createObjectPool = () => {
      for (let i = 0; i < this.characterQ; i ++ ) {
        let points = [];
        for (let i = 0; i < 6; i++) {
          points.push({ x: i * 60, y: 0 })
        }
        let texture = new PIXI.Texture.from('/bmps/transparentKoi.png')
        let newItem = new PIXI.SimpleRope(texture, points)
        newItem.points = points;
        newItem.scale.set(0.5)
        newItem.pivot.set(newItem.width / 2, newItem.height / 2)
        newItem.vx = Math.ceil(Math.random() * 2);
        newItem.vy =  Math.ceil(Math.random() * 2);
        if (Math.floor(Math.random() * 2) < 1) {
          newItem.vx *=-1;
        } 
        if (Math.floor(Math.random() * 2) < 1) {
          newItem.vy *=-1;
        }
        newItem.xVal =  Math.random() * this.canvasWidth;
        newItem.yVal = Math.random() * this.canvasHeight;
        newItem.rotation = 0;
        this.objectPool.push(newItem);
      }
    }
    componentWillUnmount = () => {
      this.characters = null;
      this.app.destroy();
    }
  
    moveCharacters = () => {
      this.state.characters.forEach( character => {
        character.x += character.vx;
        character.y += character.vy;

        character.xVal = character.x;
        character.yVal = character.y;


        character.rotation = Math.atan2(character.vy, character.vx)
        character.points[0].y = Utils.cosWave(0, 10, 0.01)
        character.points[2].y = Utils.cosWave(0, 15, 0.01)
        character.points[4].y = Utils.cosWave(0, -3, 0.01)
        let w = character.width / 2;
        if (
          (character.x > (this.canvasWidth + w) || character.x < -w) ||
          (character.y > (this.canvasHeight + w) || character.y < -w) ) { 
            character.vy *= -1;character.vx *= -1;
          }
      })
      this.water1.x += this.water1.vx;
     this.water1.y += this.water1.vy;
      if (this.water1.x < -(this.water1.width - this.canvasWidth) || this.water1.x > 0 ) this.water1.vx *= -1;
      if (this.water1.y < -(this.water1.height - this.canvasHeight) || this.water1.y > 0) this.water1.vy *= -1;

      this.water2.x += this.water2.vx;
      this.water2.y += this.water2.vy;
       if (this.water2.x < -(this.water2.width - this.canvasWidth) || this.water2.x > 0 ) this.water2.vx *= -1;
       if (this.water2.y < -(this.water2.height - this.canvasHeight) || this.water2.y > 0) this.water2.vy *= -1;
    }
    create = (c, i) => {
        if (!this.stage) return;
  
        let newItem = this.objectPool[i];
        newItem.tint = `0x${c.character_color.substring(1)}`
        newItem.character_name = c.character_name;
        newItem.x = newItem.xVal;
        newItem.y = newItem.yVal;
        this.stage.addChildAt(newItem, 0)

        let fish = this.state.characters.find( char => char.character_name === c.character_name)
        if (!fish) {
          this.setState({characters: [...this.state.characters, newItem]})
        }
        

        if (!this.water1.parent) {
          this.stage.addChild(this.water1)
        }
        if (!this.water2.parent) {
          this.stage.addChild(this.water2)
        }
    }
 

    render () {
      let tankStyle = { display: !this.props.characters.length ? 'none' : 'block' }
    
      if (this.stage){
        this.stage.removeChildren();
      }
      this.props.characters.forEach( (c, i) => this.create(c, i))
      return  <div style={tankStyle} id="pixi-space"></div>
    }
}
