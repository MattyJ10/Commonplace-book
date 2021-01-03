import './loadingSpinner.css'; 
import React from 'react'; 

export default class LoadingSpinner extends React.Component {
  
  render() {
    return (
      // <div className="loader"></div>
      <div className="loader-container">
        <div className="svg-container">
          <svg width="189" height="200" xmlns="http://www.w3.org/2000/svg">
            <g>
              <title>Layer 1</title>
              <g className="moveUpGroup1">
                <rect rx="2" className="book1" id="book1" height="131" width="29" y="27.5" x="48" strokeWidth="1.5" stroke="#000" fill="#fff"/>
                <line className="book1Accent" id="svg_14" y2="41.45313" x2="77.5" y1="41.45313" x1="48.5" strokeWidth="1.5" stroke="#000" fill="none"/>
                <line className="book1Accent" stroke="#000" id="svg_15" y2="48.45313" x2="77.5" y1="48.45313" x1="48.5" strokeWidth="1.5" fill="none"/>
                <line className="book1Accent" stroke="#000" id="svg_16" y2="138.45313" x2="77.5" y1="138.45313" x1="48.5" strokeWidth="1.5" fill="none"/>
                <line className="book1Accent" stroke="#000" id="svg_17" y2="146.45313" x2="77.5" y1="146.45313" x1="48.5" strokeWidth="1.5" fill="none"/>
                <rect className="book1Accent" id="svg_25" height="42" width="10" y="55.45313" x="53.5"   strokeWidth="1.5" stroke="#000" fill="none"/>
              </g>

              <g className="moveUpGroup2"> 
                <rect className="book2" stroke="#000" rx="6" id="svg_27" height="121" width="29" y="37.5" x="80.5" strokeWidth="1.5" fill="#fff"/>
                <line className="book2Accent" id="svg_28" y2="53.45313" x2="109.5" y1="53.45313" x1="80.5" strokeWidth="1.5" stroke="#000" fill="none"/>
                <line className="book2Accent" stroke="#000" id="svg_29" y2="58.45313" x2="109.5" y1="58.45313" x1="80.5" strokeWidth="1.5" fill="none"/>
                <line className="book2Accent"stroke="#000" id="svg_31" y2="148.45313" x2="109.5" y1="148.45313" x1="80.5" strokeWidth="1.5" fill="none"/>
                <ellipse className="book2Accent" ry="19.5" rx="5" id="svg_33" cy="100.95313" cx="94.5"   strokeWidth="1.5" stroke="#000" fill="none"/>
              </g>
              <g className="moveUpGroup3">
                <rect className="book3" rx="2" id="svg_51" height="140" width="29" y="20" x="113.5" strokeWidth="1.5" stroke="#000" fill="#fff"/>
                <line className="book3Accent" stroke="#000" id="svg_54" y2="138.45313" x2="143.5" y1="138.45313" x1="113.5" strokeWidth="1.5" fill="none"/>
                <line className="book3Accent" stroke="#000" id="svg_55" y2="146.45313" x2="143.5" y1="146.45313" x1="113.5" strokeWidth="1.5" fill="none"/>

                <line className="book3Accent" stroke="#000" id="svg_57" y2="37" x2="128.5" y1="51" x1="113.5" strokeWidth="1.5" fill="none"/>
                <line className="book3Accent" id="svg_60" y2="51" x2="143" y1="37" x1="128.5"   strokeWidth="1.5" stroke="#000" fill="none"/>
                
                <line className="book3Accent" stroke="#000" id="svg_63" y2="47" x2="128.5" y1="61" x1="113.5" strokeWidth="1.5" fill="none"/>
                <line className="book3Accent" id="svg_64" y2="61" x2="143" y1="47" x1="128.5" strokeWidth="1.5" stroke="#000" fill="none"/>

                <line className="book3Accent" stroke="#000"   id="svg_65" y2="126.45313" x2="121.5" y1="71.45313" x1="121.5" strokeWidth="1.5" fill="none"/>
                <line className="book3Accent" stroke="#000"   id="svg_66" y2="123.45313" x2="132.5" y1="81.45313" x1="132.5" strokeWidth="1.5" fill="none"/>
              </g>
            </g>
          </svg>
        </div>
      </div>
    )
  }
}