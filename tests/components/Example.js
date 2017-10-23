import React, { PureComponent } from 'react';

/**
 * @class Example
 * @extends {PureComponent}
 */
export default class Example extends PureComponent {
    
    /**
     * @method render
     * @return {XML}
     */
    render() {
        return this.props.name;
    }

}
