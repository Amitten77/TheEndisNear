"use client"
import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js';
import { get } from 'http';
import { start } from 'repl';
import random from 'random'
import Constant from '../../../config.json'


const Game = () => {

let enemySpeed: any = 0.5
let cornSpeed: any = 0.5
let enemiesObjects: any[] = []
let cornObjects: any[] = []
let currentTime = 0
let score: any = 0
let hearts: any = 3
let enemiesMap: any = {}
let scoreIncreaseTimeTracker: any = 0
let minAmountOfCornUntilEthanolPowerup: any = 10

function rectsIntersect(a: any, b: any) {
  let aBox = a.getBounds();
  let bBox = b.getBounds();

  return aBox.x + aBox.width-10 > bBox.x && bBox.x + bBox.width-10 > aBox.x
        && aBox.y + aBox.height-10 > bBox.y && bBox.y + bBox.height-10 > aBox.y
}


let SPEED = 5;
const pixiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new PIXI.Application<HTMLCanvasElement>({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xAAAAAA,
      });
  
      // Append the Pixi.js canvas to the container element
      if (pixiContainerRef.current) {
        pixiContainerRef.current.appendChild(app.view);
      }

      const background = PIXI.Sprite.from('./players/background.png');

      background.anchor.set(0.5)


      background.x = app.screen.width / 2
      background.y =  app.screen.height / 2
      background.width = app.screen.width * 1;

      background.height = app.screen.height * 1;

      app.stage.addChild(background)




    const user = PIXI.Sprite.from('./players/combine-removebg-preview (1).png');



    const farmerStanding = PIXI.Sprite.from('./players/farmer.ico');
    const farmerWithoutLasso = PIXI.Sprite.from('./players/FILE_NAME_HERE')
    const lasso = PIXI.Sprite.from('./players/lasso')
    farmerStanding.anchor.set(0.5);
    farmerWithoutLasso.anchor.set(0.5);
    lasso.anchor.set(0.5)
    //Starting X and Y position here
    farmerStanding.x = app.screen.width/2
    farmerStanding.width = 100
    farmerStanding.height = 100
    farmerStanding.y = 230
    app.stage.addChild(farmerStanding)

    //Needs editting
    farmerWithoutLasso.y = 230
    lasso.height = 0
    

    // center the sprite's anchor point
    user.anchor.set(0.5);
      
      // move the sprite to the center of the screen
    user.x = app.screen.width / 2;
    user.y = app.screen.height / 2;
    user.width = 190;
    user.height = 100;
    
    app.stage.addChild(user);

    let scoreText: any = -1


    let hearts_list: any[] = []


    app.ticker.add((delta) =>  //GOATED FUNCTION
  {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      //setTime(time + 1);
      //console.log(time);
      //W
      if (scoreText != -1) {
        app.stage.removeChild(scoreText)
      }

      scoreText = new PIXI.Text('Corn Harvested: ' + score.toString(), {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x000000, // Color in hexadecimal format
      });
      
      // Position the score text on the canvas
      scoreText.x = 10;
      scoreText.y = 10;
      
      // Add the score text to the stage
      app.stage.addChild(scoreText);

      if (hearts_list.length > 0) {
        for (let i  = 0; i < hearts_list.length; i++) {
          app.stage.removeChild(hearts_list[i]);
        }
        hearts_list = []
      }

      for (let i = 0; i < hearts; i++) {
        const heart = PIXI.Sprite.from('./players/Heart.ico')
  
        heart.anchor.set(0.5)
  
        heart.x = app.screen.width - (40 * (i + 1));
        heart.y = 50;
        heart.width = 50;
        heart.height = 50;
        
  
        hearts_list.push(heart)
  
        app.stage.addChild(heart);
      }

      if (user.x < 75) {
        user.x = 75
      }
      if (user.y < 350) {
        user.y = 350
      }
      if (user.x > 1365) {
        user.x = 1365
      }
      if (user.y > 540) {
        user.y = 540
      }
      scoreIncreaseTimeTracker += 1

      if (scoreIncreaseTimeTracker <= 500) {
        currentTime += 1
      } else if (scoreIncreaseTimeTracker > 500 && scoreIncreaseTimeTracker <= 1000) {
        currentTime += 3
      } else if (scoreIncreaseTimeTracker > 1000 && scoreIncreaseTimeTracker <= 1500) {
        currentTime += 5
      } else {
        currentTime += 7
      }
      if (currentTime > 300) {
        let randomNum = 0
        if (scoreIncreaseTimeTracker <= 300) {
          randomNum = random.int(1,4)
        } else if (scoreIncreaseTimeTracker > 300 && scoreIncreaseTimeTracker <= 600) {
          randomNum = random.int(1,3)
          enemySpeed += 0.5
          cornSpeed += 0.5
        } else {
          randomNum = random.int(1,2)
          enemySpeed += 0.5
          cornSpeed += 0.5
        }
            if (randomNum==2 || randomNum==3 || randomNum==4) {
              const corn = PIXI.Sprite.from('./players/corn-removebg-preview.ico');
              corn.anchor.set(0.5)
              corn.width = 75
              corn.height = 75
              corn.x = app.screen.width - corn.width
              corn.y = random.int(350, 540)
              app.stage.addChild(corn)
              cornObjects.push(corn)
            } else if (randomNum==1) {
              let randomNum2 = random.int(0,1)
              let obstacle: any = -1
              if (randomNum2==1) {
                obstacle = PIXI.Sprite.from('./players/pig.ico');
              } else {
                obstacle = PIXI.Sprite.from('./players/cow-removebg-preview.ico')
              }
              obstacle.width = 75
              obstacle.height = 75
              obstacle.anchor.set(0.5);
              obstacle.x = app.screen.width - obstacle.width
              obstacle.y = random.int(350, 540)
              app.stage.addChild(obstacle)
              enemiesObjects.push(obstacle)
              enemiesMap[obstacle] = false
            }
        currentTime = 0
      }



      for (const i of enemiesObjects) {
        i.x -= enemySpeed
        if (rectsIntersect(user, i)) {
          console.log(user.x, user.y, i.x, i.y)
          if (!enemiesMap[i]) {
            hearts -= 1
            enemiesMap[i] = true
          }
          app.stage.removeChild(i)
          let elementToRemove: any = i
          enemiesObjects = enemiesObjects.filter(item => item !== elementToRemove)
          console.log(hearts)
          if (hearts <= 0) {
            window.location.replace(Constant.rootURL + '/endGame')
            localStorage.setItem('score', score.toString());
          }
          
        }
      }


      for (const j of cornObjects) {
        j.x -= cornSpeed
        if (rectsIntersect(user, j)) {
          score += 1
          app.stage.removeChild(j)
          let elementToRemove: any = j
          cornObjects = cornObjects.filter(item => item !== elementToRemove)
          console.log(score)
        }
        if (score >= minAmountOfCornUntilEthanolPowerup) {
          minAmountOfCornUntilEthanolPowerup += 10
        }
      }

      if (keys["87"]) {
        user.y -= SPEED
      }
      //A
      if (keys["65"]) {
        user.x -= SPEED
      }
      //S
      if (keys["83"]) {
        user.y += SPEED
      }
      //D
      if (keys["68"]) {
        user.x += SPEED
      }


      //Farmer Controls
      if (keys["37"]) {
        farmerStanding.x -= SPEED
      }
      if (keys["39"]) {
        farmerStanding.x += SPEED
      }
      if (keys["32"]) {
        farmerWithoutLasso.x = farmerStanding.x-10
        lasso.x = farmerStanding.x
        app.stage.removeChild(farmerStanding)
        app.stage.addChild(farmerWithoutLasso)
        app.stage.addChild(lasso)
        for (let i of enemiesObjects) {
          if (farmerStanding.x - i.x < 20) {
            lasso.height = Math.abs(farmerStanding.y - i.y)
            for (let j=1; j<app.screen.height-i.y; j+5) {
              i.y -= j
              if (lasso.height > 0) {
                lasso.height -= j
              }
            }
            let elementToRemove2 = i
            enemiesObjects.filter(item => item !== elementToRemove2)
            enemiesMap[i] = true
            app.stage.removeChild(farmerWithoutLasso)
            app.stage.removeChild(lasso)
            app.stage.addChild(farmerStanding)
          }
        }
      }


  });

  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);

  type tplotOptions = {
    [key: string]: boolean
}

  let keys: tplotOptions = {};

  function keysDown(e: any) {
    keys[e.keyCode] = true;
  }

  function keysUp(e: any) {
    keys[e.keyCode] = false;
  }




  }, [])
  return (
    <div ref={pixiContainerRef} id="gameDiv">
    </div>
  )
}

export default Game