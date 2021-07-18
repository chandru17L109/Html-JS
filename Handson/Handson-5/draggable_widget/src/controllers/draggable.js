import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './draggable.css';

export default class DraggableWidget extends Component {
    render() {
        return (
          <div className="mainContainer">
            <h3 className="handson-title">Draggable Widget using React</h3>
            <div className = "align">
                <Draggable>
                    <div className = "outline">
                        I can be dragged anywhere
                    </div>
                </Draggable>
                <Draggable handle = ".DragTheButton1">
                <div className = "outline">
                    <p className = "DragTheButton1">Drag here</p>
                    <p className = "scrollContent">I have a long scrollable content with a handle
                             <pre>x</pre> <pre>x</pre>
                             <pre>x</pre> <pre>x</pre>
                             <pre>x</pre> <pre>x</pre>
                    </p>
                </div>
                </Draggable>
            </div>
            <div className = "align">
                <Draggable axis="x">
                    <div className = "outline">
                        I can only be dragged horizontally (x axis)
                    </div>
                </Draggable>
                <Draggable handle = ".DragContent">
                    <div className = "outline">
                        <p className = "DragTheButton2">Can't drag here</p>
                        <p className = "DragContent">Dragging hear works</p>
                    </div>
                </Draggable>
            </div>
          </div>
        )
    }
}
