import React from 'react'
import classes from './Text.module.css'
import Character from './Character/Character'

export default function Text(props) {
    const characters = props.text.split('').map(
        (char, index) => <Character 
            value={char}
            key={index}
            click={() => props.click(index)}
        />
    )
    return (
        <div className={classes.Text}>
          {characters}  
        </div>
    )
}
