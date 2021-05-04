import React from 'react'
import './About.css'
import AboutStar from '../svgs/AboutStar.svg'

export default class About extends React.Component {
  componentDidMount () {
    this.props.pageChange()
  }

  render () {
    return (
      <section className="aboutPage">

        <div className="starsCont">
          <div className="starCont">
            <img src={AboutStar} alt="s1" className="star1 counterClockwise" />
          </div>
          <div className="starCont">
            <img src={AboutStar} alt="s2" className="star2 clockwise" />
          </div>
          <div className="starCont">
            <img src={AboutStar} alt="s3" className="star3 counterClockwise2" />
          </div>
          <div className="starCont">
            <img src={AboutStar} alt="s4" className="star4 clockwise2" />
          </div>
        </div>
        <div className="starsCont starsCont2">
          <div className="starCont">
            <img src={AboutStar} alt="s1" className="star1 counterClockwise" />
          </div>
          <div className="starCont">
            <img src={AboutStar} alt="s2" className="star2 clockwise" />
          </div>
          <div className="starCont">
            <img src={AboutStar} alt="s3" className="star3 counterClockwise2" />
          </div>
          <div className="starCont">
            <img src={AboutStar} alt="s4" className="star4 clockwise2" />
          </div>
        </div>
        <div className="aboutPageTextOuter">
          <div className="aboutPageText">
            <p>Just me having fun.</p>
          </div>
        </div>
      </section>
    )
  }
}
About.propTypes = {
  pageChange: Function
}
