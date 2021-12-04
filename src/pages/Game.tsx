import React, {useEffect, useState} from 'react'
import Phaser from 'phaser'
import TestScene from '../game/scenes/TestScene';

const Game = () => {

    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 11 * 16, // Number of tiles * size of the tile
            height: 10 * 16,
            zoom: 4,
            pixelArt: true,
            parent: "game-container",
            scene: [TestScene]
        }
        const phaser = new Phaser.Game(config);
        console.log("Phaser initialized");
    }, [])


    return <div>
        <div id="game-container"></div>
    </div>
}

export default Game;