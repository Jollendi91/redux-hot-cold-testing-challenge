import React from 'react';
import {shallow, mount} from 'enzyme';

import {TopNav} from './top-nav';
import { RESTART_GAME, GENERATE_AURAL_UPDATE } from '../actions';
import { wrap } from 'module';

describe('<TopNav />', () => {
    it('Should render without crashing', () => {
        shallow(<TopNav />);
    });

    it('Should dispatch restartGame on click', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<TopNav dispatch={dispatch} />);
        const link = wrapper.find('.new');
        link.simulate('click');
        expect(dispatch).toHaveBeenCalled();
        const action = dispatch.mock.calls[0][0];
        expect(action.type).toEqual(RESTART_GAME);
        expect(action.correctAnswer).toBeGreaterThanOrEqual(1);
        expect(action.correctAnswer).toBeLessThanOrEqual(100);
    });

    it('Should provide an Aural Update when on screen reader', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<TopNav dispatch={dispatch} />);
        const link = wrapper.find('.status-link');
        link.simulate('click');
        expect(dispatch).toHaveBeenCalled();
        const action = dispatch.mock.calls[0][0];
        expect(action.type).toEqual(GENERATE_AURAL_UPDATE);
    });
});