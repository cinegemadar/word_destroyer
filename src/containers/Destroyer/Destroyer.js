import React, { Component } from 'react'
import Text from '../../components/Destroyer/Text/Text'

import {getCharacterType} from '../../Utils/utils'

import axios from 'axios'

export default class Destroyer extends Component {
    
    constructor()
    {
        super()
        this.state = {text: ''}
    }

    
    componentDidMount() {
        axios.get("https://random-word-api.herokuapp.com/word?number=2")
        .then( res => {
            const TEXT = res.data.join(' ') 
            this.setState({text : TEXT})
        })
    }
    
    render() {

        const removeChar = (index, type, array) => {
            console.log(type)
            if(index === array.length) return
            if(!(type === 'space' || type === getCharacterType(array[index]))) return
            array.splice(index, 1)
            removeChar(index, type, array)
        }
        const clickHandler = (index) => {
            let textArray = this.state.text.split('')
            if('space' === getCharacterType(textArray[index])) return
            removeChar(index, getCharacterType(textArray[index]), textArray)
            this.setState({text : textArray.join('')})
        }
        
        return (
            <div>
                <Text 
                text={this.state.text}
                click={clickHandler}/>
            </div>
        )
    }
}
