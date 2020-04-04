import React, { Component } from 'react'
import classes from './Destroyer.module.css'
import Text from '../../components/Destroyer/Text/Text'

import {getCharacterType, getRandomArbitrary} from '../../Utils/utils'

import {Button} from '@material-ui/core'

import axios from 'axios'

export default class Destroyer extends Component {
    
    constructor()
    {
        super()
        this.state = {
            text: '', 
            original: '',
            gifurl: ''
        }
        this.getWords = this.getWords.bind(this)
        this.getGif = this.getGif.bind(this)
        this.init = this.init.bind(this)
    }
    
    init()
    {
        this.getWords()
        this.getGif()
    }

    getWords() {
        axios.get("https://random-word-api.herokuapp.com/word?number=2")
        .then( res => {
            const TEXT = res.data.join(' ')
            this.setState({text : TEXT})
            this.setState({original : TEXT})
        })      
    }

    getGif() {
        axios.get("https://api.giphy.com/v1/gifs/search?api_key=Du0FuHD4rmob8q794e27oGs4H3ndA1Vu&q=you+won?limit=300")
        .then( res => {
            console.log(res)
            if(res.data.pagination.count > 0)
            {
                const id = getRandomArbitrary(0, res.data.pagination.count)
                console.log("id: ", id)
                this.setState({gifurl : res.data.data[id].embed_url}) 
            }
        })
    }
    componentDidMount() {
        this.init()
    }
    
    render() {

        /**
         * Find begining or end of adjacent elements in array. 
         * @param {*} index start point of search
         * @param {*} type type of elements
         * @param {*} array 
         * @param {*} limit function to decide if reached border
         * @param {*} step -1: find begining 1: find end
         */
        const findBorder = (index, type, array, limit, step) =>
        {
            /**
             * Returns true if should exit recursion.
             * @param {*} index 
             * @param {*} type 
             * @param {*} array 
             * @param {*} limit 
             */
            const shouldExit = (index, type, array, limit) => {
                return (index === limit ||
                    !('space' === getCharacterType(array[index]) || type === getCharacterType(array[index])))
            }

            if (shouldExit(index, type, array, limit(array)))
                {
                    return index - step
                }
                else
                {
                    return findBorder(index+step, type, array, limit, step)
                }
        }

        const clickHandler = (index) => {
            let textArray = this.state.text.split('')
            const TYPE = getCharacterType(textArray[index])
            if('space' === TYPE) return
            let start_index = findBorder(index, TYPE, textArray, (_) => -1, -1)
            let end_index = findBorder(index, TYPE, textArray, (a) => a.length,1)
            if(end_index - start_index > 0)
            {
                const COUNT = end_index - start_index + 1
                textArray.splice(start_index, COUNT)
            }
            this.setState({text : textArray.join('')})
        }

        const restartHandler = () => this.setState({text : this.state.original})
        
        return (
            <React.Fragment >
                <div className={classes.Destroyer}> 
                    <div>
                        <Text 
                            text="DORA" 
                            click={() => null}/>
                        <Text 
                            text="DESTROYES" 
                            click={() => null}/>
                        <Text 
                            text="THE WORD" 
                            click={() => null}/>
                    </div>
                    <div className={classes.GameArea}> {/*TODO: move to GamingArea.js*/}


                        {
                            this.state.text.length < 1 &&
                            <iframe src={this.state.gifurl} width="300" height="300" frameBorder="0" title="Congrats!"/>
                        }
                        {
                            <Text 
                            text={this.state.text}
                            click={clickHandler}/>
                        }
                    </div>
                    <div className={classes.ControlPanel}> {/*TODO: move to ControlPanel.js*/}
                        <Button variant="contained" color="primary" onClick={restartHandler}>Restart</Button>
                        <Button variant="contained" color="primary"  onClick={this.init}>Next game</Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
