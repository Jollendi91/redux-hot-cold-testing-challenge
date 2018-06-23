import React from 'react';
import {shallow, mount} from 'enzyme';

import {AuralStatus} from './aural-status';

describe('<AuralStatus />', () => {
    it('Should render without crashing', () => {
        shallow(<AuralStatus />);
    });

    it('Should render an aural update', () => {
        const TEST_AURAL_UPDATE = 'This is test data!';
        const wrapper = shallow(<AuralStatus auralStatus={TEST_AURAL_UPDATE} />);
        expect(wrapper.text()).toEqual(TEST_AURAL_UPDATE);
    });
});