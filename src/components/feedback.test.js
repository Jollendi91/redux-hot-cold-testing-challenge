import React from 'react';
import {shallow, mount} from 'enzyme';

import {Feedback} from './feedback';

describe('<Feedback />', () => {
    it('Should render without crashing', () => {
        shallow(<Feedback />);
    });

    it('Should render some feedback', () => {
        const TEST_FEEDBACK = 'This is the test feedback';

        const wrapper = shallow(<Feedback feedback={TEST_FEEDBACK} />);
        expect(wrapper.contains(TEST_FEEDBACK)).toEqual(true);
    });

    it('Should render guess again with correct key', () => {
        const wrapper = shallow(<Feedback key={1} />);
        expect(wrapper.contains('Guess again!')).toEqual(true);
    });
});