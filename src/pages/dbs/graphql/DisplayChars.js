import React from 'react';
import Mutations from './services/mutations';
import { Button, Form } from 'react-bootstrap';
import './DisplayChars.css';
import * as PIXI from 'pixi.js'
import Utils from '../../../services/Utils';
import { v4 as uuidv4 } from 'uuid';
export default class DisplayChars extends React.Component {
    state = {activeCharacter: undefined, instructions: '', mode: undefined, getAll: []};
    canvasWidth = 800;
    canvasHeight = 200;
    characters = [];
    stage = undefined;
    app = undefined;
    count = 0;
    componentDidMount = () => {
      Mutations.setUserID(uuidv4());
      Mutations.deleteAllCharacters();
      this.app = new PIXI.Application({width: this.canvasWidth, height: this.canvasWidth, backgroundColor: 0xFFFFFF, backgroundAlpha: 0});
      document.getElementById("pixi-space").appendChild(this.app.view);
      this.stage = this.app.stage;
      this.app.ticker.add(this.moveCharacters);
    }
    componentWillUnmount = () => {
      this.characters = null;
      this.app.destroy();
    }
  
    moveCharacters = () => {
      if (this.state.activeCharacter) return;
      this.characters.forEach( character => {
        if (this.state.mode !== 'update') {
             character.x += character.vx;
        character.y += character.vy;
        }
     
        character.rotation = Math.atan2(character.vy, character.vx)
        character.points[0].y = Utils.cosWave(0, 10, 0.01)
        character.points[2].y = Utils.cosWave(0, 15, 0.01)
        character.points[4].y = Utils.cosWave(0, -3, 0.01)
       
  
        if ((character.x > this.canvasWidth || character.x < 0) ||
       (character.y > this.canvasHeight || character.y < 0) ){character.vy *= -1;character.vx *= -1;}
      })
    }
    addCharacter = async () => {
      try {
        let character = await Mutations.addChar(); 
        let arr = [];
        for (let key in character) {
          arr.push(`<li>${key}} ${character[key]}</li>`)
        }
        this.setState({getAll: [character]})

        let points = [];
        for (let i = 0; i < 6; i++) {
          points.push({ x: i * 60, y: 0 })
        }
        let texture = new PIXI.Texture.from('/bmps/transparentKoi.png')
        let newItem = new PIXI.SimpleRope(texture, points)
        newItem.points = points;
        newItem.tint = `0x${character.color.substring(1)}`
        newItem.name = character.name;
        newItem.id = character.id;
        newItem.buttonMode = true;
        newItem.interactive = true;
        newItem.on('click', e => this.chooseCharacter(e))
        newItem.scale.set(0.5)
        newItem.pivot.set(0.5)
        let xVal =  Math.random() * this.canvasWidth;
        let yVal = Math.random() * this.canvasHeight;
        newItem.vx = 1;
        newItem.vy = 1;
        newItem.x = xVal;
        newItem.y = yVal;
        this.stage.addChild(newItem)
        this.characters.push(newItem)
      } catch(e) {
        console.error(e)
      } 
    }
    chooseCharacter = (e) => {


      if (this.state.activeCharacter) return;
     

      if (this.state.mode === 'delete') {
        this.setState({activeCharacter: e.target})
        //remote
        this.deleteCharacter(this.state.activeCharacter.id);
        //local
        let char = this.characters.find( c => c === this.state.activeCharacter);
        this.stage.removeChild(char);
        this.characters.splice(this.characters.indexOf(char), 1)
        this.setState({activeCharacter: undefined})
        return;
      }  else if (this.state.mode === 'update') {
        this.setState({activeCharacter: e.target, instructions: ''})
        let temp = this.state.activeCharacter;
        temp.rotation = 0;
        temp.scale.set(1);
        temp.x = (this.canvasWidth / 2) - (temp.width / 2);
        temp.y = this.canvasHeight / 2;
      }
    

    }
    deleteCharacter = async (id) => {
      try {
       let result = await Mutations.deleteChar(id); 
       this.setState({characters: result})
      } catch(e) {
        console.error(e)
      } 
    }
    getCharacters = async () => {
      let result = await Mutations.getChars();
      if (!result.data.characters.length) {
        this.setState({instructions: "db is empty!"})
      } else {
        this.setState({getAll: result.data.characters})
      }
      
    }
  
    changeColorHandler = (e) => {
      e.preventDefault();
      this.setState({instructions: ''})
      let newColor =  Utils.randomHex();
       //change remote
       let obj = {
        name: this.state.activeCharacter.name,
        color: newColor,
        id: this.state.activeCharacter.id
      };
      this.updateCharacter(obj);

       //change local
       let temp = this.state.activeCharacter;
       temp.tint =  `0x${newColor.substring(1)}`;
       temp.scale.set(0.5);
       this.setState({activeCharacter: undefined})

    }
    updateCharacter = async (obj) => {
      try {
        let result = await Mutations.updateChar(obj.id, obj.name, obj.color);
        this.setState({characters: result});
        return result ? true : false;
      } catch (e) {
          console.error(e)
      }
    }
    cancelEdit = (e) => {
      if (e) e.preventDefault();
      if (this.state.activeCharacter) {
         this.state.activeCharacter.scale.set(0.5);
          this.setState({activeCharacter: undefined, mode: ''})
      }
     
    }
    crudButtonsHandler = (e) => {
      this.cancelEdit();
      let text = e.target.innerHTML;
      this.setState({instructions: '', mode: '', getAll: []})
      if (text === 'Create') {
         this.addCharacter()
      } else if (text === 'Update') {
        this.setState({mode: 'update'})
        if (this.characters.length) {
          this.setState({instructions: "click on one to update its name or color"})
        } else {
          this.setState({instructions: "there are none to update! click create first!"})
        }
      } else if (text === 'Delete') {
        this.setState({mode: 'delete'})
        if (this.characters.length) {
          this.setState({instructions: "click on one to delete it"})
        } else {
          this.setState({instructions: "there are none to delete! click create first!"})
        }
        
      } else if (text === "Read") {
        this.getCharacters();
      }
    }


   render () {
    const { activeCharacter, instructions, mode } = this.state;
    const name = activeCharacter ?  activeCharacter.name : '';
    const style = {width: `${this.canvasWidth}px`, height:  `${this.canvasHeight}px`, border: this.state.mode === 'delete' ? '3px solid red' : '3px solid black'}
    const formStyle = {display: activeCharacter && mode === 'update' ? 'inline-block' : 'none'}
    const getAll = this.state.getAll.map((item, index) => {
      let tempStyle={color: `item.color`}
      return (
        <li key={index}>
          <ul>
            <li>character: </li>
            <li>name: {item.name}</li>
            <li style={tempStyle}>color: {item.color}</li>
            <li style={tempStyle}>created at: {item.createdAt}</li>
            <li style={tempStyle}>updated at: {item.updatedAt}</li>
          </ul>
        </li>
      )
    })
    return (
        <>
          <div className="button-group">
            <Button onClick={this.crudButtonsHandler}>Create</Button>
            <Button variant="success" onClick={this.crudButtonsHandler}>Read</Button>
            <Button variant="warning" onClick={this.crudButtonsHandler}>Update</Button>
            <Button variant="danger" onClick={this.crudButtonsHandler}>Delete</Button>
          </div>
          <div id="pixi-space" style={style}></div>
          <div className="instructions">{ instructions }</div>
          <ol className="show-all">{getAll}</ol>
          <div className="edit-form" style={formStyle}>
            <div className="close-button" onClick={this.cancelEdit}>x</div>
            <Button size="sm" onClick={this.changeColorHandler}>choose random new color</Button>
          </div>
        </>
        )
    }
}
