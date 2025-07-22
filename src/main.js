import { Start } from './scenes/Start.js';

const config = {
    type: Phaser.AUTO,
    title: 'Super Snake',
    description: '',
    parent: 'game-container',
    width: WIDTH * BLOCK_SIZE,
    height: HEIGHT * BLOCK_SIZE,
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [
        Start
    ],
    scale: {
        mode: Phaser.Scale.FIT,
    }
    //zoom: 3
}

new Phaser.Game(config);
            