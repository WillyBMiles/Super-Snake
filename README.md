# Super Snake
Crazy abilities and combinations on top of classic snake!
## How to run locally?
1. Clone this repository.
2. Open Command Prompt and navigate to this folder (`cd [..]/Super-Snake/`).
3. Run your choice of local server. This should open a browser to play directly! (For example: `npx live-server`)

## Play on Itch
Alternatively, visit:
https://buildsgames.itch.io/super-snake
to try it in your browser! 
Try it on your phone too!


## Concept and Game Loop
First of all, the controls:
On mobile, tap buttons to select them and swipe in the direction you want the snake to move.

On PC, you can also do this if you have a touchscreen or are adventurous with your mouse, but I recommend using WASD instead.

The basic gameloop is identical to snake: eat eggs to get an ever longer body until you eventually run into the wall or your own tail and lose. There's a score that goes up as you collect eggs.

The twist in this version comes from a set of random abilities! Every 5 eggs (increasing for each previous ability) you gain an upgrade, chosen from a set of three. These can affect how easy it is to play, how many points you get, how you can get upgrades , and more! Some upgrades combine particularly well to supercharge your score!

There are 19 upgrades to find and they can all be taken multiple times for stacking effect!

## Use of AI
In the modern day it's nearly impossible to not use AI, unless you put a lot of effort into avoiding it (thanks Google and every other tech company).

Suffice it to say, as much as a modern internet citizen can, I avoided using AI on this project. I'm a newcomer to Phaser and I wanted to use this project to learn and understand as much as I could. So, although I concede the game may have been objectively better had I let AI generate most of my code, I would be worse for it. 

For production releases I am ready and willing to use every tool available to me to help push our games to another level.

Sidenote: I also made all of the graphics, save for the font!



## Bugs and Future
Due to the short length of this project, the abilities were fairly tame, though I think I did a good job making them interesting given the limitations. Having bigger, more flashy and game changing upgrades would be a cool next step. The ability that grants new ones on egg pick up was an attempt at that concept that I think worked pretty well, but perhaps a tier system could help (game changing ones being more rare and having a higher tier).

The main problem I have with the game is the pace of play. It starts out somewhat sluggish which can be frustrating, but it does leave room for future upgrades.

Exactly once I ran into a bug where the stacking abilities got so extreme that eggs totally covered the screen and the game crashed. I added a protection for that by limiting players to 100 abilities; this also prevents run away infinite scoring.

## Sidenote on Phaser Use
My inexperience with Phaser led me to write code that, in a lot of cases, didn't use Phaser, even when that functionality definitely exists in Phaser. 

The most egregious examples of this are my class hierarchies and my physics engine.

I fell back on fundamentals of programming a lot while working on this project. I knew I wanted to precisely control the lifetime of my objects, so many objects (snake parts, buttons, eggs etc.) are actually plain JavaScript objects that compose images or other game objects, rather than being of class GameObject themselves. This let me control everything about them and update them as needed rather than relying on going through Phaser's interface that I was less familiar with. I realize now that Phaser provides many convenient functions that I could have built on more.

Regarding my physics engine, the game is completely grid based game with relatively few objects. It felt somewhat unnecessary to use a collider based physics engine when really the only thing that needs to collide with other things is the snake's head. So, I wrote a quick physics world that just compares positions for collisions. Writing my own physics also means I have precise control over how collisions occur and what triggers them. This meant I could more easily debug and add functionality.

As I have become more comfortable with Phaser I can see how it's a powerful tool. Once I've built trust with Phaser I will be able to leverage its strengths to make things more efficiently.
