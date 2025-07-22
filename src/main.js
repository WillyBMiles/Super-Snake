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
    zoom: 3
}

new Phaser.Game(config);
            