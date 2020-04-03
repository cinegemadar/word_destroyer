import React from 'react'
import classes from './Character.module.css'
import {getCharacterType} from '../../../../Utils/utils'

const STYLES = {
    "space" :     [classes.Character, classes.Space].join(' '),
    "vowel" :     [classes.Character, classes.Vowel].join(' '),
    "consonant" : [classes.Character, classes.Consonant].join(' ')
}

export default function Character(props) {
    const type = getCharacterType(props.value)
    const style = STYLES[type]
    return (
        <div 
        className={style}
        onClick={props.click}>
            {props.value}
        </div>
    )
}
