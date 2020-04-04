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
        axios.get("https://api.giphy.com/v1/gifs/search?api_key=Du0FuHD4rmob8q794e27oGs4H3ndA1Vu&q=congrats?limit=300")
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

        const removeChar = (start_index, type, index, array, count) => {
            // Stop criterias:
            const endOfArray = index === array.length
            const CURRENT_TYPE = getCharacterType(array[index])
            const typeChange = !('space' === CURRENT_TYPE || type === CURRENT_TYPE)
            const exit = endOfArray || typeChange
            if(exit)
            {
                if(count > 1) array.splice(start_index, count)
                return
            }
            else
            {
                removeChar(start_index, type, index+1, array, count+1)
            }
        }

        const beginingOfBlock = (index, type, array) =>
        {
            const currentType = getCharacterType(array[index])
            if(index === 0)
            {
                if(currentType === type) return 0
                return 1
            }
            if (currentType === type || currentType === 'space')
            {
                return beginingOfBlock(index-1, type, array)
            }
            return index+1
        }


        const clickHandler = (index) => {
            let textArray = this.state.text.split('')
            const TYPE = getCharacterType(textArray[index])
            if('space' === TYPE) return
            const START_INDEX = beginingOfBlock(index, TYPE, textArray)
            removeChar(START_INDEX, TYPE, START_INDEX, textArray, 0)
            this.setState({text : textArray.join('')})
        }

        const restartHandler = () => this.setState({text : this.state.original})
        
        return (
            <React.Fragment >
                <div className={classes.Destroyer}>
                    <div className={classes.GameArea}>


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
                    <div>
                        <Button variant="contained" color="primary" onClick={restartHandler}>Restart</Button>
                        <Button variant="contained" color="primary"  onClick={this.init}>Next game</Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
