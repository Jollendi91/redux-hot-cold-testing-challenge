import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';
import { trelloReducer } from '../../redux-trello-tested/src/reducers';

describe('reducer', () => {
    const guessesArray = [5, 10, 15, 20];
    const guessFeedback = "Test feedback!";
    const testCorrectAnswer = 50;

    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '_UNKOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    });

    it('Should return the current state of an unkown action', () => {
        let currentState = {};
        const state = trelloReducer(currentState, {type: '_UNKOWN'});
        expect(state).toBe(currentState);
    })

    describe('generateAuralStatus', () => {
        it('Should return an Aural Status Update', () => {
            let state = {
                guesses: [25, 32, 15],
                feedback: "You're warm!",
                auralStatus: ''
            };
            state = reducer(state, generateAuralUpdate());
            expect(state.auralStatus).toEqual("Here's the status of the game right now: You're warm! You've made 3 guesses. In order of most- to least-recent, they are: 15, 32, 25");
        });
    });

    describe('makeGuess', () => {
        it('Should make a guess', () => {
            let state = {
                guesses: [],
                feedback: '',
                correctAnswer: 95
            }

            state = reducer(state, makeGuess(1));
            expect(state.guesses).toEqual([1]);
            expect(state.feedback).toEqual("You're Ice Cold...");

            state = reducer(state, makeGuess(46));
            expect(state.guesses).toEqual([1, 46]);
            expect(state.feedback).toEqual("You're Cold...");
            
            state = reducer(state, makeGuess(84));
            expect(state.guesses).toEqual([1, 46, 84]);
            expect(state.feedback).toEqual("You're Warm.");

            state = reducer(state, makeGuess(90));
            expect(state.guesses).toEqual([1, 46, 84, 90]);
            expect(state.feedback).toEqual("You're Hot!");

            state = reducer(state, makeGuess(95));
            expect(state.guesses).toEqual([1, 46, 84, 90, 95]);
            expect(state.feedback).toEqual('You got it!');
        });
    });

    describe('restartGame', () => {
        it('Should reset the state', () => {
            let state = {
                guesses: [1, 15, 20, 30, 50],
                feedback: "You got it!",
                auralStatus: 'You won!',
                correctAnswer: 50
            }

            state = reducer(state, restartGame(100));
            expect(state.guesses).toEqual([]);
            expect(state.feedback).toEqual('Make your guess!');
            expect(state.auralStatus).toEqual('');
            expect(state.correctAnswer).toEqual(100);
        });
    })

});