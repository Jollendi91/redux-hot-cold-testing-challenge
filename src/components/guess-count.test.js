import React from 'react';
import {shallow, mount} from 'enzyme';

import {GuessCount} from './guess-count';

describe('<GuessCount />', () => {
    it('Should render without crashing', () => {
        shallow(<GuessCount />);
    });

    it('Should render feedback about guess count', () => {
        const value = 7;
        const wrapper = shallow(<GuessCount guessCount={value}/>);
        expect(wrapper.text()).toEqual(`You've made ${value} guesses!`);
    });
});