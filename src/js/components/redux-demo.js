import React from 'react';

import Reducers from './reducers';
import  {createStore} from 'redux';

export default  class ReduxDemo extends React.Component {
    inc() {
        return {type: 'ADD'};
    }

    dec() {
        return {type: 'SUB'};
    }

    componentWillMount() {
        var state = createStore(Reducers);
        console.log(state.getState());

        state.dispatch(this.inc());
        console.log(state.getState());

        state.dispatch(this.inc());
        console.log(state.getState());

        state.dispatch(this.dec());
        console.log(state.getState());
    }

    render() {
        return (<div>
            Redex
        </div>)
    }
}