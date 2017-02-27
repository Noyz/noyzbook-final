$(document).ready(function(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////MENU PRESENTATION JEU/////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function startGame(){
    var addLeft = parseInt($('#masque').css("left")),isWalking, isWalkingLeft, isIdlingLeft, isIdling;
    document.addEventListener('load', idle());
    /*****************************************ANIMATION********************************************************************/
    function idle (){
      isidleLeft = 0;
      isWalking = 0;
      isWalkingLeft = 0;
      $('#monPerso').css({"top":"-6px","left":"-1px"});
      $('#masque').css({"width":"65px", "height": "88px","top":"71%"});
      var start;
      var anime = function(temps){
        start = (start) ? start : temps;
        var progress = temps - start;
        if(progress > 100){
          valeur = $('#monPerso').css("left");
            switch(valeur){
            case "-1px" :
            $('#masque').css('width','64px');
            $('#monPerso').css("left","-65px");
            break;

            case "-65px" :
            $('#monPerso').css("left","-130px");
            break;

            case "-130px" :
            $('#masque').css('width','63px');
            $('#monPerso').css("left","-195px");
            break;

           case "-195px" :
            $('#monPerso').css("left","-258px");
            break;

           case "-258px" :
           $('#masque').css('width','64px');
            $('#monPerso').css("left","-322px");
            break;

           case "-322px" :
            $('#monPerso').css("left","-387px");
            break;

           case "-387px" :
           $('#masque').css('width','63px');
            $('#monPerso').css("left","-452px");
            break;

           case "-452px" :
            $('#monPerso').css("left","-1px");
            break;
           }
           start = temps;
         }
         if(isIdling){
          requestAnimationFrame(anime);
        }
      };
      isIdling = 1;
      requestAnimationFrame(anime);
    };

    function idleLeft(){
      isIdling = 0;
      isWalking = 0;
      isWalkingLeft = 0;
      $('#monPerso').css({"top":"-189px","left":"-264px"});
      $('#masque').css({"width":"65px", "height": "88px","top":"71%"});
      var start;
      var anime = function(temps){
        start = (start) ? start : temps;
        var progress = temps - start;
        if(progress > 100){
          valeur = $('#monPerso').css("left");
            switch(valeur){
            case "-264px" :
            $('#monPerso').css("left","-329px");
            break;

            case "-329px" :
            $('#monPerso').css("left","-393px");
            break;

            case "-393px" :
            $('#monPerso').css("left","-457px");
            break;
           case "-457px" :
            $('#monPerso').css("left","-522px");
            break;

           case "-522px" :
            $('#monPerso').css("left","-586px");
            break;

           case "-586px" :
            $('#monPerso').css("left","-650px");
            break;

           case "-650px" :
            $('#monPerso').css("left","-715px");
            break;

           case "-715px" :
            $('#monPerso').css("left","-264px");
            break;
           }
           start = temps;
         }
         if(isIdlingLeft){
          requestAnimationFrame(anime);
        }
      };
      isIdlingLeft = 1;
      requestAnimationFrame(anime);
    };

    $('#startGame').animate(
      { left: '200px'},
      {duration: 2000,
      easing: 'easeOutBounce'
    });
    /*****************************************DEMARRAGE JEU********************************************************************/
    $('#playGame').click(function(){
      $('#cadreJeu ul').css("display","none");
      isIdling = 0;
      isIdlingLeft = 0;
      isWalking = 0;
      isWalkingLeft = 0;
      play();
    });
    
    $('#creditsGame').click(function(){
      $('#cadreJeu').append("<img src='imgJeu/creditPage.gif' id='creditsPage'/>");
      $('#presentation').fadeOut(1000);
      $("#creditsPage").fadeIn(1000);
      $("#retour").fadeIn(1000);
    });
    $('#controlesGame').click(function(){
      $('#cadreJeu').append("<img src='imgJeu/controlefull.png' id='controlesPage'/>");
      $('#presentation').fadeOut(1000);
      $("#controlesPage").fadeIn(1000);
      $("#retour").fadeIn(1000);
    });
    $("#retour").click(function(){
      $(this).fadeOut(1000);
      $('#presentation').fadeIn(1000);
      $("#creditsPage").fadeOut(1000);
      $("#controlesPage").fadeOut(1000);
    });
  }
  startGame();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////// JEU EN COURS/////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function play(){
    $("#toHide").css('display','block');
    $("#creditsPage").css('display','none');
    $("#controlesPage").css('display','none');
    $("#retour").css('display','none');
    var variable = true, variable2 = true,stopDie = true,interrupteurJump = true, addLeft =0, addUp = -370,isJumping,isSliding,glisse = true,saute = true, isDying,isIdling,isDashing, cadre = document.getElementById("cadreJeu");
    document.addEventListener('load', dash(), true);
    var monObjetAudio = {
      audioJump : new Audio('Audio/SFX_Jump_11.wav'),
      audioCoin : new Audio('Audio/coin.mp3'),
      audioSpikes : new Audio('Audio/zeldaGasp.wav'),
      audioHeart : new Audio('Audio/zeldaItemp.wav'),
      audioLaser : new Audio('Audio/Hit_00.mp3'),
      audioDie : new Audio('Audio/zeldaHurt.wav')
    };



    /*****************************************SCORE + PV + BACKGROUND + SOUND + COMPETENCES********************************************************/
    $("#masque").css('left',"150px");  //Replace le personnage à la position de début de jeu.

    var defile = setInterval(function(){
      if(monObjet.pv < 0 ){
        clearInterval(defile);
        clearInterval(afficheElements);
        clearInterval(decor);
        clearInterval(ennemie);
         die();
          $('#cadreJeu').append("<img src='imgJeu/dead.png' id='dead' alt='Vous êtes mort'/>");
          $('#cadreJeu').append("<img src='imgJeu/retry.png' id='retry' alt='Recommencer'/>");
        setTimeout(function(){
          $('#dead').fadeIn(1000);
          $('#retry').fadeIn(1000);
          $('#retry').click(function(){
            location.reload();
          })
        }, 1000);
      } 
      if(monObjet.score > 8){
        clearInterval(defile);
        clearInterval(afficheElements);
        clearInterval(decor);
        clearInterval(ennemie);
        $('#cadreJeu').append("<img src='imgJeu/unlocked.png' id='winner' alt='Vous avez gagnée'/>");
        setTimeout(function(){
          $('#winner').show(1000);
          $('#winner').click(function(){
          window.location = "CV.pdf";
        })
          
        }, 1000);
      }
      $('#score').text("Score Actuel : " + monObjet.score);
      $('#nextComp').text("PV actuel : " + monObjet.pv);

      addLeft+=10;
      $('#cadreJeu').css('background-position', -addLeft + 'px')
      if(addLeft > parseInt($('#cadreJeu').css('width')) + 65){
        addLeft = 0;
      }

    }, 20);

    $("#cadreJeu").append("<img src='../html.gif' class='lockScreen' id='htmlScreen'/>")
    $("#cadreJeu").append("<img src='../css.gif' class='lockScreen' id='cssScreen'/>")
    $("#cadreJeu").append("<img src='../javascript.gif' class='lockScreen' id='javascriptScreen'/>")
    $("#cadreJeu").append("<img src='../angular.gif' class='lockScreen' id='angularScreen'/>")
    $("#cadreJeu").append("<img src='../jquery.gif' class='lockScreen' id='jqueryScreen'/>")
     $("#cadreJeu").append("<img src='../mongo.gif' class='lockScreen' id='mongoScreen'/>")
    $("#cadreJeu").append("<img src='../bootstrap.gif' class='lockScreen' id='bootstrapScreen'/>")
    $("#cadreJeu").append("<img src='../node.gif' class='lockScreen' id='nodeScreen'/>")
    $("#cadreJeu").append("<img src='../meteor.gif' class='lockScreen' id='meteorScreen'/>")

    var debloqueComp = setInterval(function(){
      valeur = monObjet.score;
      switch(valeur){
        case 1 :
            $("#htmlScreen").css('display','block');
          break;
        case 2:
            $("#cssScreen").css('display','block');
        break;
        case 3:
            $("#javascriptScreen").css('display','block');
        break;
        case 4:
            $("#angularScreen").css('display','block');
        break;
        case 5:
            $("#jqueryScreen").css('display','block');
        break;
        case 6:
            $("#mongoScreen").css('display','block');
        break;
        case 7:
            $("#bootstrapScreen").css('display','block');
        break;
        case 8:
            $("#nodeScreen").css('display','block');
        break;
        case 9:
            $("#meteorScreen").css('display','block');
        break;
      };
    }, 1000);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////ANIMATION PERSONNAGE IN GAME/////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function die(){
      monObjetAudio.audioDie.play();
      isDizzing = 1;
      isJumping = 0;
      isDashing = 0;
      $('#monPerso').css({"top":"-376px","left":"0px"});
      $('#masque').css({"width":"68px","height":"90px", "top" : "71%"});
      var start;
      var anime = function(temps){
        start = (start) ? start : temps;
        var progress = temps - start;
        if(progress > 100){
          valeur = $('#monPerso').css("left");
          switch(valeur){
            case "0px" :
            $('#masque').css({"width":"79px","height":"90px"});
            $('#monPerso').css({"left":"-69px"});
            break;

            case "-69px" :
            $('#masque').css({"width":"83px"});
            $('#monPerso').css({"left":"-150px"});
            break;

            case "-150px" :
            $('#masque').css({"width":"89px"});
            $('#monPerso').css("left","-234px");
            break;

            case "-234px" :
            $('#monPerso').css({"left":"-323px"});
            break;

            case "-323px" :
            $('#monPerso').css("left","-418px");
            break;
           }
           start = temps;
          }  
          requestAnimationFrame(anime);
        };
        requestAnimationFrame(anime);  
      };

    function dash(){
      $('#masque').css({"width":"74px","height":"98px","top" : "69%"});
      $('#monPerso').css({"top":"-183px","left":"0px"});
      var start;
      var anime = function(temps){
        start = (start) ? start : temps;
        var progress = temps - start;
        if(progress > 100){
          valeur = $('#monPerso').css("left");
            switch(valeur){
              case "0px" :
              $('#masque').css({"width":"77px","height":"97px"});
              $('#monPerso').css({"left":"-80px","top":"-184px"});
              break;

              case "-80px" :
              $('#monPerso').css("left","-156px");
              break;

              case "-156px" :
              $('#monPerso').css("left","0px");
              $('#masque').css({"width":"74px"});
              break;
             }
            start = temps;
        }
        if (isDashing) {
          requestAnimationFrame(anime);
        }
      };
      isDashing = 1;
      requestAnimationFrame(anime);
    };

    function jump(){
      monObjetAudio.audioJump.play();
      isDashing = 0;
      isDying = 0;
      isSliding = 1;
      var start;
      var anime = function(temps){
        start = (start) ? start : temps;
        var progress = temps - start;
        if(progress > 10){
          if(addUp < -150 && interrupteurJump){
            addUp += 8;
            $('#monPerso').css({"top":"-580px","left":"0px"});
            $('#masque').css({"height":"90px","width":"66px"})
          } else {
            addUp -= 8;
            interrupteurJump = false;
           $('#monPerso').css({"left":"-86px","top":"-577px"});
           $('#masque').css({"width":"83px", "height":"90px"});
            if(addUp < -350 ){
              isJumping = 0;
              interrupteurJump = true;
              dash();
            }
          }
          $("#masque").css("top", -addUp + "px");
          start = temps;
        }
        if(isJumping){
          requestAnimationFrame(anime);
        } else {
          isSliding = 0;
          isDying = 1;
        }
      };
      if(!isJumping) {
        requestAnimationFrame(anime);
        isJumping = 1;
      }
    };

    function slide(){
      isDashing = 0;
      isJumping = 1;
      isDizzy = 1;
      var start;
      var anime = function(temps){
        start = (start) ? start : temps;
        var progress = temps - start;
        if(progress > 10){
          $('#monPerso').css({"top":"-589px","left":"-192px"});
          $('#masque').css({"height":"77px","width":"84px","top": "75%"});
          start = temps;
        }
        if(isSliding){
          requestAnimationFrame(anime);
        } else {
          isDashing = false;
          isJumping = false;
          dash();
        }
      };
      if(!isSliding){
        isSliding = true;
        requestAnimationFrame(anime);
        setTimeout(function() {
          isSliding = false;
        }, 1000)
      }
    };


    
    function hit(){
      var hurt = setInterval(function(){
        $('#masque').hide(40).show(40);
      }, 300);
      setTimeout(function(){
        clearInterval(hurt)
      },2000);
   };
    
    

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////EVENT KEYBOARD IN GAME//////////////////////////////////////////////////////////////////
     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    window.onkeydown = function(event){
      var code = event.keyCode;
      switch(code){
        case 90:
          jump();
        break;
        case 83 :
          slide();
        break;
      };
    };
     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////CREATION OBSTACLE ET OBJET IN GAME/////////////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var monObjet = {
      iSpikes : 0,
      iGold : 0,
      iHeart : 0,
      iBeam : 0,
      iWood :0,
      iTree1 : 0,
      iTree2 : 0,
      iTree3 : 0,
      iFlower1 : 0,
      iFlower2:0,
      iMushroom1:0,
      score : 0,
      pv : 1,
      stopDetectionWoodBench : true,
      stopDetectionHeart : true,
      stopDetectionSpikes : true,
      stopDetectionGold : true,
      stopDetectionBeam : true,
    };
    function createSpikes(){
      monObjet.iSpikes++;
      var spikes = function (){
          var _this = this;
          this.speed = 9;
          this.valeur = 960;
          this.monImage = document.createElement('img');
          this.Zindex = this.monImage.style.zIndex = '9';
          this.ID = this.monImage.id = "spikes" + monObjet.iSpikes;
          this.Position = this.monImage.style.position = "absolute";
          this.positionY = this.monImage.style.top = 82 + '%';
          this.positionX = this.monImage.style.left = 960 +'px';
          this.SRC = this.monImage.src = '../spikes.gif';
          cadre.appendChild(this.monImage);
          this.defilement = function repeatOften() {
            if(collisionSpikes()){
              monObjetAudio.audioSpikes.play();
              hit();
            }
            _this.valeur -= _this.speed;
            _this.monImage.style.left = _this.valeur + 'px';
            requestAnimationFrame(_this.defilement);
          }
          requestAnimationFrame(_this.defilement);
         };
        return new spikes();
       };

    function createGold(){
     monObjet.iGold++;
      var gold = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = Math.floor((Math.random()* 10 )+ 5);
        this.monImage = document.createElement('img');
        this.ID = this.monImage.id = "coin" + monObjet.iGold;
        this.Zindex = this.monImage.style.zIndex = '9';
        this.Position = this.monImage.style.position = "absolute";
        this.positionY =  Math.floor((Math.random()* 290 )+ 150) +'px';
        this.positionX = this.monImage.style.left = 960 +'px';
        this.monImage.style.top = this.positionY;
        this.SRC = this.monImage.src = '../piece.gif';
        cadre.appendChild(this.monImage);
        this.defilement = function repeatOften() {
          if(collisionGold()){
            monObjetAudio.audioCoin.play();
            $('#coin' + monObjet.iGold).remove();
          }
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new gold();
    };

    function createHeart(){
      monObjet.iHeart++;
      var heart = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = Math.floor((Math.random()* 10 )+ 5);
        this.monImage = document.createElement('img');
        this.Zindex = this.monImage.style.zIndex = '9';
        this.ID = this.monImage.id = "heart" + monObjet.iHeart;
        this.Position = this.monImage.style.position = "absolute";
        this.positionY =  Math.floor((Math.random()* 290 )+ 150) +'px';
        this.monImage.style.top = this.positionY;
        this.positionX = this.monImage.style.left = 960 + '%';
        this.SRC = this.monImage.src = '../heart.gif';
        cadre.appendChild(this.monImage);
        this.defilement = function repeatOften() {
          if(collisionHeart()){
            monObjetAudio.audioHeart.play();
            $('#heart' + monObjet.iHeart).remove();
          }
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new heart();
    };

    function createBeam(){
      monObjet.iBeam++;
      var beam = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = 8;
        this.monImage = document.createElement('img');
        this.ID = this.monImage.id = "beam" + monObjet.iBeam;
        this.Position = this.monImage.style.position = "absolute";
        this.positionY = this.monImage.style.top = 4 + '%';
        this.positionX = this.monImage.style.left = 960 + '%';
        this.SRC = this.monImage.src = 'imgJeu/beam.png';
        cadre.appendChild(this.monImage);
        this.suppr = function(){
          if(_this.valeur < 0){
            
            monObjetAudio.audioSpikes.play();
            $('#beam' + monObjet.iBeam).remove();
          }
        }
        this.defilement = function repeatOften() {
          if(collisionBeam()){
            monObjetAudio.audioSpikes.play();
          $('#beam' + monObjet.iBeam).remove();
          hit()
          }
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new beam();
    };

    function createWoodBench(){
      monObjet.iWood++;
      var woodBench = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = 9;
        this.monImage = document.createElement('img');
        this.ID = this.monImage.id = "woodBench" + monObjet.iWood;
        this.Position = this.monImage.style.position = "absolute";
        this.positionY = this.monImage.style.top = 76 + '%';
        this.positionX = this.monImage.style.left = 960 + '%';
        this.SRC = this.monImage.src = 'imgJeu/woodBench.png';
        cadre.appendChild(this.monImage);
        this.suppr = function(){
          if(_this.valeur < 0){
            $('#tree' + monObjet.iWood).remove();
          }
        }
        this.defilement = function repeatOften() {
          if(collisionWoodBench()){
            monObjetAudio.audioSpikes.play();
              hit();
            }
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new woodBench();
    };

    /*****************************************DEFILEMENT OBSACLE ET OBJET*********************************************************/


    function afficheElements(){
      var elemType = Math.floor(Math.random()*8);
        switch(elemType){
        case 0 :
          createGold();
          setTimeout(function(){
            monObjet.stopDetectionGold = true;
          }, 1000);
        break;

        case 1 :
          createSpikes();
            setTimeout(function(){
              monObjet.stopDetectionSpikes = true;
            }, 1000);
        break;

        case 2 :
          createHeart();
          setTimeout(function(){
            monObjet.stopDetectionHeart = true;
          }, 1000);
        break;

        case 3 :
          createBeam();
          setTimeout(function(){
            monObjet.stopDetectionBeam = true;
          }, 1000);
        break;

        case 4 :
          createWoodBench();
          setTimeout(function(){
            monObjet.stopDetectionWoodBench = true;
          }, 1000);
        break;

        case 5 :
          createSpikes();
          setTimeout(function(){
            monObjet.stopDetectionSpikes = true;
          }, 1000);
        break;

        case 6 :
          createBeam();
          setTimeout(function(){
            monObjet.stopDetectionBeam = true;
          }, 1000);
        break;
        case 7 :
          createGold();
          setTimeout(function(){
            monObjet.stopDetectionGold = true;
          }, 1000);
        break;
      };
    };
    var ennemie = setInterval(afficheElements, Math.floor((Math.random()* 4000 )+ 2000));
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////CREATION DECOR  IN GAME////////////////////////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function createTree1(){
      monObjet.iTree1++;
      var tree1 = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = 8.3;
        this.monImage = document.createElement('img');
        this.ID = this.monImage.id = "tree1" + monObjet.iTree1;
        this.Position = this.monImage.style.position = "absolute";
        this.positionY = this.monImage.style.top = 26 + '%';
        this.positionX = this.monImage.style.left = 960 + '%';
        this.SRC = this.monImage.src = '../tree2.png';
        cadre.appendChild(this.monImage);
        this.suppr = function(){
          if(_this.valeur < 0){
            $('#tree1' + monObjet.iTree1).remove();
          }
        }
        this.defilement = function repeatOften() {
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new tree1();
    };

    function createTree2(){
      monObjet.iTree2++;
      var tree2 = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = 15;
        this.monImage = document.createElement('img');
        this.Zindex = this.monImage.style.zIndex = '10';
        this.ID = this.monImage.id = "tree2" + monObjet.iTree2;
        this.Position = this.monImage.style.position = "absolute";
        this.positionY = this.monImage.style.top = 26 + '%';
        this.positionX = this.monImage.style.left = 960 + '%';
        this.SRC = this.monImage.src = '../tree3.png';
        cadre.appendChild(this.monImage);
        this.suppr = function(){
          if(_this.valeur < 0){
            $('#tree2' + monObjet.iTree2).remove();
          }
        }
        this.defilement = function repeatOften() {
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new tree2();
    };

    function createTree3(){
      monObjet.iTree3++;
      var tree3 = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = 15;
        this.monImage = document.createElement('img');
        this.Zindex = this.monImage.style.zIndex = '10';
        this.ID = this.monImage.id = "tree3" + monObjet.iTree3;
        this.Position = this.monImage.style.position = "absolute";
        this.positionY = this.monImage.style.top = 32 + '%';
        this.positionX = this.monImage.style.left = 960 + '%';
        this.SRC = this.monImage.src = '../tree4.png';
        cadre.appendChild(this.monImage);
        this.suppr = function(){
          if(_this.valeur < 0){
            $('#tree3' + monObjet.iTree3).remove();
          }
        }
        this.defilement = function repeatOften() {
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new tree3();
    };

    function createFlower1(){
      monObjet.iFlower1++;
      var flower1 = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = 8.7;
        this.monImage = document.createElement('img');
        this.ID = this.monImage.id = "flower1" + monObjet.iFlower1;
        this.Position = this.monImage.style.position = "absolute";
        this.positionY = this.monImage.style.top = 79 + '%';
        this.positionX = this.monImage.style.left = 960 + '%';
        this.SRC = this.monImage.src = '../flower1.png';
        cadre.appendChild(this.monImage);
        this.suppr = function(){
          if(_this.valeur < 0){
            $('#flower1' + monObjet.iFlower1).remove();
          }
        }
        this.defilement = function repeatOften() {
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new flower1();
    };

    function createFlower2(){
      monObjet.iFlower2++;
      var flower2 = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = 8.7;
        this.monImage = document.createElement('img');
        this.ID = this.monImage.id = "flower2" + monObjet.iFlower2;
        this.Position = this.monImage.style.position = "absolute";
        this.positionY = this.monImage.style.top = 79 + '%';
        this.positionX = this.monImage.style.left = 960 + '%';
        //this.BORDER = this.monImage.style.border = "1px solid black";
        this.SRC = this.monImage.src = '../flower2.gif';
        cadre.appendChild(this.monImage);
        this.suppr = function(){
          if(_this.valeur < 0){
            $('#flower2' + monObjet.iFlower2).remove();
          }
        }
        this.defilement = function repeatOften() {
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new flower2();
    };

    function createMushroom1(){
      monObjet.iMushroom1++;
      var mushroom1 = function (){
        var _this = this;
        this.valeur = 960;
        this.speed = 8.7;
        this.monImage = document.createElement('img');
        this.ID = this.monImage.id = "mushroom1" + monObjet.iMushroom1;
        this.Position = this.monImage.style.position = "absolute";
        this.positionY = this.monImage.style.top = 79 + '%';
        this.positionX = this.monImage.style.left = 960 + '%';
        this.Zindex = this.monImage.style.zIndex = '10';
        //this.BORDER = this.monImage.style.border = "1px solid black";
        this.SRC = this.monImage.src = '../mushroom1.png';
        cadre.appendChild(this.monImage);
        this.suppr = function(){
          if(_this.valeur < 0){
            $('#mushroom1' + monObjet.iMushroom1).remove();
          }
        }
        this.defilement = function repeatOften() {
          _this.valeur -= _this.speed;
          _this.monImage.style.left = _this.valeur + 'px';
          requestAnimationFrame(_this.defilement);
        }
        requestAnimationFrame(_this.defilement);
      };
      return new mushroom1();
    };
    /*****************************************DEFILEMENT dECOR*********************************************************/
    function afficheDecor(){
      var elemType = Math.floor(Math.random()*6);
        switch(elemType){
        case 0 :
        createTree1();
        break;

        case 1 :
        createTree2();
        break;

        case 2 :
        createTree3();
        break;

        case 3 :
        createFlower1();
        break;

        case 4 :
        createFlower2();
        break;

        case 5 :
        createMushroom1();
        break;
      };
    };
    var decor = setInterval(afficheDecor, Math.floor((Math.random()* 3000 )+ 1000));
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////GESTION COLLISIONS D'OBJETS////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function collisionSpikes (){
      if(parseInt($('#masque').css('left')) >= parseInt($('#spikes' + monObjet.iSpikes).css('left')) + parseInt($('#spikes' + monObjet.iSpikes).css('width'))
        || parseInt($('#masque').css('left')) + parseInt($('#masque').css('width')) <= parseInt($('#spikes' + monObjet.iSpikes).css('left'))
        || parseInt($('#masque').css('top')) >= parseInt($('#spikes' + monObjet.iSpikes).css('top')) + parseInt($('#spikes' + monObjet.iSpikes).css('height'))
        || parseInt($('#masque').css('top')) + parseInt($('#masque').css('height')) <= parseInt($('#spikes' + monObjet.iSpikes).css('top'))){
        return false;
      } else {
          if(monObjet.stopDetectionSpikes){
          monObjet.pv--;
          monObjet.stopDetectionSpikes = false;
          return true;
        }
      }
    };

    function collisionGold (){
      if(parseInt($('#masque').css('left')) >= parseInt($('#coin' + monObjet.iGold).css('left')) + parseInt($('#coin' + monObjet.iGold).css('width'))
        || parseInt($('#masque').css('left')) + parseInt($('#masque').css('width')) <= parseInt($('#coin' + monObjet.iGold).css('left'))
        || parseInt($('#masque').css('top')) >= parseInt($('#coin' + monObjet.iGold).css('top')) + parseInt($('#coin' + monObjet.iGold).css('height'))
        || parseInt($('#masque').css('top')) + parseInt($('#masque').css('height')) <= parseInt($('#coin' + monObjet.iGold).css('top'))){
        return false;
      } else {
        if(monObjet.stopDetectionGold){
          monObjet.score++;
          monObjet.stopDetectionGold = false;
          return true;
        }
      }
    };

    function collisionHeart (){
      if(parseInt($('#masque').css('left')) >= parseInt($('#heart' + monObjet.iHeart).css('left')) + parseInt($('#heart' + monObjet.iHeart).css('width'))
        || parseInt($('#masque').css('left')) + parseInt($('#masque').css('width')) <= parseInt($('#heart' + monObjet.iHeart).css('left'))
        || parseInt($('#masque').css('top')) >= parseInt($('#heart' + monObjet.iHeart).css('top')) + parseInt($('#heart' + monObjet.iHeart).css('height'))
        || parseInt($('#masque').css('top')) + parseInt($('#masque').css('height')) <= parseInt($('#heart' + monObjet.iHeart).css('top'))){
        return false;
      } else {
          if(monObjet.stopDetectionHeart){
          monObjet.pv++;
          monObjet.stopDetectionHeart = false;
          return true;
        }
      }
    };
    function collisionBeam (){
      if(parseInt($('#masque').css('left')) >= parseInt($('#beam' + monObjet.iBeam).css('left')) + parseInt($('#beam' + monObjet.iBeam).css('width'))
        || parseInt($('#masque').css('left')) + parseInt($('#masque').css('width')) <= parseInt($('#beam' + monObjet.iBeam).css('left'))
        || parseInt($('#masque').css('top')) >= parseInt($('#beam' + monObjet.iBeam).css('top')) + parseInt($('#beam' + monObjet.iBeam).css('height'))
        || parseInt($('#masque').css('top')) + parseInt($('#masque').css('height')) <= parseInt($('#beam' + monObjet.iBeam).css('top'))){
        return false;
      } else {
          if(monObjet.stopDetectionBeam){
            monObjet.pv -= 2;
            monObjet.stopDetectionBeam = false;
          return true;
        }
      }
    };

    function collisionWoodBench (){
      if(parseInt($('#masque').css('left')) >= parseInt($('#woodBench' + monObjet.iWood).css('left')) + parseInt($('#woodBench' + monObjet.iWood).css('width'))
        || parseInt($('#masque').css('left')) + parseInt($('#masque').css('width')) <= parseInt($('#woodBench' + monObjet.iWood).css('left'))
        || parseInt($('#masque').css('top')) >= parseInt($('#woodBench' + monObjet.iWood).css('top')) + parseInt($('#woodBench' + monObjet.iWood).css('height'))
        || parseInt($('#masque').css('top')) + parseInt($('#masque').css('height')) <= parseInt($('#woodBench' + monObjet.iWood).css('top'))){
        return false;
      } else {
          if(monObjet.stopDetectionWoodBench){
            monObjet.pv--;
            monObjet.stopDetectionWoodBench = false;
          return true;
        }
      }
    };
  };
  $("*").on("mouseover", function (e) {
  if ($(this).attr("tooltip") !== undefined && $(this).attr("tooltip") !== '') {
    var tooltip = $(this).attr("tooltip");
    $("body").prepend('<div id="tooltip" class="tooltip"><div id="tooltipCone"></div><!---><div id="tooltipZone"class="tooltip">'+tooltip+'</div></div>');
    $('#tooltipZone').css({backgroundColor: 'rgba(63, 62, 62, 0.8)', display: 'inline-block', position: 'relative', borderRadius: 5+'px', padding : 8+'px'});
    $('#tooltipCone').css({position: 'absolute', height: 0 + 'px', width: 0+'px', display: 'inline-block', borderStyle: 'solid', borderWidth: '0 8px 10px 8px', borderColor: 'transparent transparent rgba(63, 62, 62, 0.8) transparent', zIndex: 3});
    $("#tooltip").css({position: 'absolute', display: 'none', zIndex: 10, color: 'white', height: 42+'px', fontFamily:"Tropicana"});
    $('#tooltipZone').css({bottom : -10+'px'});
    $("#tooltipCone").css({left: $("#tooltip").outerWidth()/2 - 8+'px'});
    $("#tooltip").css({top: $(this).offset().top + $(this).height() + 20, left: $(this).offset().left - $("#tooltip").outerWidth()/2 + $(this).innerWidth()/2});
    $('#tooltip').fadeIn("slow");
  }
});
$('*').on("mouseout", function (e) {
  $('#tooltip').remove();
});
});
