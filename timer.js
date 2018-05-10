var Timer = {
    timerElement: document.querySelector('#timer'),
    seconds: 0,
    action: 'add',
    intervalId: null,

    init: function() {
      this.calculateTime();
      this.startIntervals();
      this.setupEvents();
      this.setupProgressBar();
    },
    
    calculateTime: function() {
      temp_secs = Math.abs(this.seconds);
      temp_hours = Math.floor(temp_secs / 3600);
      temp_minutes = Math.floor((temp_secs - (temp_hours * 3600)) / 60);
      temp_seconds = Math.floor(temp_secs - (temp_hours * 3600) - (temp_minutes * 60));
      this.timerElement.querySelector('#timer-counter').innerHTML = '<p>' + 
        `${temp_hours} hours, ` +
        `${temp_minutes} minutes, ` +
        `${temp_seconds} seconds` + 
        '</p>';
    },

    startIntervals: function() {
      this.stopIntervals();
      this.intervalId = setInterval(function() {
        if (Timer.action == 'add') { 
          Timer.seconds++;
        } else {
          Timer.seconds--;
        }
        Timer.calculateTime();
        Timer.setupProgressBar();
      }, 1000);
    },

    stopIntervals: function() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
    },

    setupEvents: function() {
      self = this;
      
      document.getElementById("timer-stop").addEventListener("click", function(e) {
        e.preventDefault();
        self.stopIntervals();
        document.getElementById("timer-start-add").disabled = false;
        document.getElementById("timer-start-sub").disabled = false;
      });
      
      document.getElementById("timer-start-add").addEventListener("click", function(e) {
        e.preventDefault();
        self.action = 'add';
        self.startIntervals();
        document.getElementById("timer-start-add").disabled = true;
        document.getElementById("timer-start-sub").disabled = false;
      });
      
      document.getElementById("timer-start-sub").addEventListener("click", function(e) {
        e.preventDefault();
        self.action = 'subtract';
        self.startIntervals();
        document.getElementById("timer-start-add").disabled = false;
        document.getElementById("timer-start-sub").disabled = true;
      });

      document.getElementById("timer-set").addEventListener("click", function(e) {
        e.preventDefault();
        temp_prompt = prompt("Please enter a time (in minutes)");

        if (temp_prompt.toLowerCase() != "") {
          self.seconds = parseInt(temp_prompt) * 60;
        }
      });
    },

    setupProgressBar: function() {
      abs_time = Math.abs(this.seconds);
      max_time = 3 * 60 * 60; /* 3 hours */
      element_to_target = (this.seconds < 0) ? '#progress-neg' : '#progress-pos';

      if (abs_time > max_time) {
        width = 100;
      } else {
        width = ((abs_time / max_time) * 100) / 2;
      }

      if (element_to_target == '#progress-pos') {
        // "hide" the negative bar
        document.querySelector('#progress-neg-left').style.width = '50%';
        document.querySelector('#progress-neg').style.width = '0%';
        document.querySelector('#progress-pos').style.width =  width + '%';
      }
      
      if (element_to_target == '#progress-neg') {
        // "hide" the positive bar
        document.querySelector('#progress-pos').style.width = '0%';
        
        if (width == 100) {
          document.querySelector('#progress-neg').style.width = '50%';
          document.querySelector('#progress-neg-left').style.width = '0%';
        } else {
          document.querySelector('#progress-neg').style.width = width + '%';
          document.querySelector('#progress-neg-left').style.width = (50 - width) + '%';
        }
      }
    },
  }
  
  Timer.init();