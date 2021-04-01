import React from 'react'
import './FontSpecific.css'
import AppContext from '../../../../AppContext';
export default class  RelativeUnits extends React.Component {

    state = {
        active: 'medium',
        expl: '',
        poem: '',
        repeatedString: ''
    }
    poem  = `My candle burns at both ends; It will not last the night;But ah, my foes, and oh, my friends--It gives a lovely light.`;
    intervalObject = undefined;
    arrCounter = 0;
    arr = ['xx-small', 'x-small', 'small','medium', 'large', 'x-large', 'xx-large', 'xxx-large','larger', 'smaller'];
    explanations = [
        '',
        '', 
        '',
        '',
        '',
        ''
    ]
    componentDidMount = () => {
        this.poemArr = this.poem.split('')
        this.printPoem();
       // this.setState({repeatedString: this.poem}, () => this.testIfAsTall())
        window.addEventListener('resize', this.resizeHandler);
        this.fillUpBackground();
    }
    resizeHandler = () => {
        this.printPoem();
        this.setState({repeatedString: ''});
        this.fillUpBackground();
    }
    fillUpBackground = () => {
        let itemHeight = document.getElementById('font-specific-background').clientHeight;
         if (itemHeight < this.context.browserHeight) {
             this.setState({repeatedString: this.state.repeatedString + this.poem})
             setTimeout(this.fillUpBackground, 10)
         }
    }
    componentWillUnmount = () => {
        clearInterval(this.intervalObject)
        window.removeEventListener('resize', this.resizeHandler);
    }

    printPoem = () => {
        clearInterval(this.intervalObject)
        this.setState({poem: ''});
        this.arrCounter = 0;
        this.intervalObject = setInterval(this.addLetter, 70)
    }
    addLetter = () => {
        let poem = this.state.poem + this.poemArr[this.arrCounter] ;
        this.setState({poem});
        
        this.arrCounter ++;
        if (this.arrCounter === this.poemArr.length) {
           
            clearInterval(this.intervalObject);
            setTimeout(this.printPoem, 1000)
        }

    }

    changeUnit = (e) => {
        this.setState({
            active: e.target.innerHTML,
            expl: this.explanations[this.arr.indexOf(e.target.innerHTML)]
        })
    }
    recalculateSize = (e) => {
        this.setState({fontSize: `${this.state.active}`})
   }
    render () {
        let style = {fontSize: this.state.active}
        return (
        <div className="font-specific">
        <div id="font-specific-background">{this.state.repeatedString}</div>
        <ul>
        {
            this.arr.map( (item, index) => {
                return <li key={index} onClick={this.changeUnit} className={ this.state.active === item ? 'active-unit' : ''}>{item}</li>
            })
        }
        </ul>
        <div className="unit-explanation">{ this.state.expl }</div>

     
        <fieldset>
        <div id="poem-text" style={style}>{
        this.state.poem.split('').map( letter => {
        if (letter === ";" ) {
            return <span>{letter}<br /></span>
        }
        return <span>{letter}</span>})
        
        }</div>
        </fieldset>
    </div>
    )
    }
    
}
RelativeUnits.contextType = AppContext;